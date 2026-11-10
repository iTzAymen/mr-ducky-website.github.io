const API_BASE_URL = `roproxy.com/v1/`;

/**
 * Small localStorage-backed cache so we don't hammer the Roblox API on every
 * page load / refresh. Values are served instantly from cache when fresh, and
 * a stale cache is still returned as a fallback if the network call fails.
 */
const CACHE_PREFIX = "ducky-cache:";
const CACHE_TTL_MS = 10 * 60 * 1000; // 10 minutes
const LIVE_TTL_MS = 30 * 1000; // player counts / visits: polled every minute

type CacheEntry<T> = { at: number; data: T };

function readCache<T>(
  key: string,
  ttl: number,
): { data: T; fresh: boolean } | null {
  try {
    const raw = window.localStorage.getItem(CACHE_PREFIX + key);
    if (!raw) return null;
    const entry = JSON.parse(raw) as CacheEntry<T>;
    return { data: entry.data, fresh: Date.now() - entry.at < ttl };
  } catch {
    return null;
  }
}

function writeCache<T>(key: string, data: T) {
  try {
    const entry: CacheEntry<T> = { at: Date.now(), data };
    window.localStorage.setItem(CACHE_PREFIX + key, JSON.stringify(entry));
  } catch {
    /* quota / private mode — cache is best-effort */
  }
}

/**
 * Returns cached data when it's still fresh; otherwise fetches, caches, and
 * returns the new value. On network failure, falls back to stale cache if
 * present, else `fallback`.
 */
async function cached<T>(
  key: string,
  fetcher: () => Promise<T>,
  fallback: T,
  ttl = CACHE_TTL_MS,
): Promise<T> {
  const hit = readCache<T>(key, ttl);
  if (hit?.fresh) return hit.data;

  try {
    const data = await fetcher();
    writeCache(key, data);
    return data;
  } catch (error) {
    console.error(`Error fetching "${key}":`, error);
    return hit ? hit.data : fallback;
  }
}

function fetchProjectThumbnails(universeId: string): Promise<string[]> {
  return cached(
    `thumbnails:${universeId}`,
    () =>
      fetch(
        `https://thumbnails.${API_BASE_URL}games/multiget/thumbnails?countPerUniverse=999&format=Png&isCircular=false&size=768x432&universeIds=${universeId}`,
      )
        .then((response) => {
          if (!response.ok) throw new Error(`HTTP ${response.status}`);
          return response.json();
        })
        .then((data): string[] => {
          const thumbs: { imageUrl: string }[] =
            data?.data?.[0]?.thumbnails ?? [];
          return thumbs.map((thumb) => thumb.imageUrl).filter(Boolean);
        }),
    [],
  );
}

interface FetchedProjectData {
  placeId: string;
  playing: number;
  visits: number;
  favorites: number;
  created: string;
}

function fetchProjectData(
  universeId: string,
): Promise<FetchedProjectData | null> {
  return cached<FetchedProjectData | null>(
    `game:${universeId}`,
    () =>
      fetch(`https://games.${API_BASE_URL}/games?universeIds=${universeId}`)
        .then((response) => {
          if (!response.ok) throw new Error(`HTTP ${response.status}`);
          return response.json();
        })
        .then((data) => {
          const game = data.data[0];
          return {
            placeId: game.rootPlaceId,
            playing: game.playing,
            visits: game.visits,
            favorites: game.favoritedCount,
            created: new Date(game.created).toLocaleDateString(),
          };
        }),
    null,
    LIVE_TTL_MS,
  );
}

interface FetchedVotes {
  upVotes: number;
  downVotes: number;
}

function fetchProjectVotes(universeId: string): Promise<FetchedVotes | null> {
  return cached<FetchedVotes | null>(
    `votes:${universeId}`,
    () =>
      fetch(`https://games.${API_BASE_URL}games/${universeId}/votes`)
        .then((response) => {
          if (!response.ok) throw new Error(`HTTP ${response.status}`);
          return response.json();
        })
        .then((data) => ({
          upVotes: data.upVotes ?? 0,
          downVotes: data.downVotes ?? 0,
        })),
    null,
  );
}

function fetchGroupData(
  groupId: string,
): Promise<{ memberCount: number } | null> {
  return cached<{ memberCount: number } | null>(
    `group:${groupId}`,
    () =>
      fetch(`https://groups.${API_BASE_URL}/groups/${groupId}`)
        .then((response) => {
          if (!response.ok) throw new Error(`HTTP ${response.status}`);
          return response.json();
        })
        .then((data) => ({ memberCount: data.memberCount })),
    null,
    LIVE_TTL_MS,
  );
}

function fetchAvatars(userIds: string[]): Promise<Record<string, string>> {
  const ids = userIds.join(",");
  return cached<Record<string, string>>(
    `avatars:${ids}`,
    () =>
      fetch(
        `https://thumbnails.${API_BASE_URL}users/avatar-headshot?userIds=${ids}&size=150x150&format=Png&isCircular=false`,
      )
        .then((response) => {
          if (!response.ok) throw new Error(`HTTP ${response.status}`);
          return response.json();
        })
        .then((data) =>
          Object.fromEntries(
            (data.data as { targetId: number; imageUrl?: string }[])
              .filter((d) => d.imageUrl)
              .map((d) => [String(d.targetId), d.imageUrl as string]),
          ),
        ),
    {},
  );
}

interface LiveStats {
  playing: number;
  visits: number;
  favorites: number;
}

/** One uncached multiget for every game's live counters; null on any failure. */
function fetchLiveGames(
  universeIds: string[],
): Promise<Record<string, LiveStats> | null> {
  return fetch(`https://games.${API_BASE_URL}/games?universeIds=${universeIds.join(",")}`)
    .then((response) => {
      if (!response.ok) throw new Error(`HTTP ${response.status}`);
      return response.json();
    })
    .then((data) =>
      Object.fromEntries(
        (data.data as { id: number; playing: number; visits: number; favoritedCount: number }[]).map(
          (g) => [
            String(g.id),
            { playing: g.playing, visits: g.visits, favorites: g.favoritedCount },
          ],
        ),
      ),
    )
    .catch(() => null);
}

export {
  fetchLiveGames,
  fetchAvatars,
  fetchProjectThumbnails,
  fetchProjectData,
  fetchProjectVotes,
  fetchGroupData,
};
