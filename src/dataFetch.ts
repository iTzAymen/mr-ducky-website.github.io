const API_BASE_URL = `roproxy.com/v1/`;

function fetchProjectThumbnail(universeId: string) {
  return fetch(
    `https://thumbnails.${API_BASE_URL}games/multiget/thumbnails?universeIds=${universeId}&size=768x432&format=Png&isCircular=false`
  )
    .then((response) => response.json())
    .then((data) => data.data[0]?.thumbnails[0]?.imageUrl);
}

function abbreviateNumber(num: number): string {
  if (num >= 1_000_000_000) {
    return (num / 1_000_000_000).toFixed(1).replace(/\.0$/, "") + "B+";
  }
  if (num >= 1_000_000) {
    return (num / 1_000_000).toFixed(1).replace(/\.0$/, "") + "M+";
  }
  if (num >= 1_000) {
    return (num / 1_000).toFixed(1).replace(/\.0$/, "") + "K+";
  }
  return num.toString();
}

function fetchProjectData(universeId: string) {
  return fetch(`https://games.${API_BASE_URL}/games?universeIds=${universeId}`)
    .then((response) => response.json())
    .then((data) => {
      const game = data.data[0];
      return {
        placeId: game.rootPlaceId,
        playing: abbreviateNumber(game.playing),
        visits: abbreviateNumber(game.visits),
        favorites: abbreviateNumber(game.favoritedCount),
        created: new Date(game.created).toLocaleDateString(),
      };
    })
    .catch((error) => {
      console.error("Error fetching project data:", error);
      return null;
    });
}

function fetchGroupData(groupId: string) {
  return fetch(`https://groups.${API_BASE_URL}/groups/${groupId}`)
    .then((response) => response.json())
    .then((data) => ({
      memberCount: abbreviateNumber(data.memberCount),
      created: new Date(data.created).toLocaleDateString(),
    }))
    .catch((error) => {
      console.error("Error fetching group data:", error);
      return null;
    });
}

export { fetchProjectThumbnail, fetchProjectData, fetchGroupData };
