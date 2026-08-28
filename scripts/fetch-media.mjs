/**
 * Lists recent uploads from the channel's public RSS feed so you can pick which
 * ones belong in the media gallery.
 *
 *   npm run media           # just list new videos (nothing is written)
 *   npm run media -- --write # also append new videos to media.json as "short"
 *
 * The gallery in src/Data/media.json is meant to stay hand-curated (clean
 * titles, correct kind), so --write is a convenience, not the default.
 *
 * Channel id is mirrored from src/config/studio.ts (youtubeChannelId).
 */
import { readFileSync, writeFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { dirname, resolve } from "node:path";

const __dirname = dirname(fileURLToPath(import.meta.url));
const root = resolve(__dirname, "..");
const mediaPath = resolve(root, "src/Data/media.json");
const write = process.argv.includes("--write");

const studioSrc = readFileSync(resolve(root, "src/config/studio.ts"), "utf8");
const channelId = studioSrc.match(/youtubeChannelId:\s*"([^"]+)"/)?.[1];
if (!channelId) {
  console.error("Could not read youtubeChannelId from src/config/studio.ts");
  process.exit(1);
}

const feedUrl = `https://www.youtube.com/feeds/videos.xml?channel_id=${channelId}`;
const xml = await fetch(feedUrl).then((r) => {
  if (!r.ok) throw new Error(`RSS fetch failed: HTTP ${r.status}`);
  return r.text();
});

const decode = (s = "") =>
  s
    .replace(/&amp;/g, "&")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'");

// Drop hashtag soup and collapse whitespace for a readable default title.
const cleanTitle = (t) =>
  decode(t)
    .replace(/#[^\s#]+/g, "")
    .replace(/\s+/g, " ")
    .trim();

const entries = [...xml.matchAll(/<entry>([\s\S]*?)<\/entry>/g)].map((m) => ({
  id: m[1].match(/<yt:videoId>([^<]+)<\/yt:videoId>/)?.[1],
  title: cleanTitle(m[1].match(/<title>([^<]*)<\/title>/)?.[1] ?? ""),
  published: m[1].match(/<published>([^<]+)<\/published>/)?.[1]?.slice(0, 10),
}));

const media = JSON.parse(readFileSync(mediaPath, "utf8"));
const known = new Set(media.youtube.map((v) => v.id));
const fresh = entries.filter((e) => e.id && !known.has(e.id));

if (!fresh.length) {
  console.log("Nothing new — media.json already has every video in the feed.");
  process.exit(0);
}

console.log(`${fresh.length} video(s) in the feed not yet in media.json:\n`);
for (const e of fresh) {
  console.log(`  ${e.published}  ${e.id}  ${e.title}`);
}

if (!write) {
  console.log(
    `\nAdd the ones you want to src/Data/media.json, or re-run with --write to append them all as "short".`,
  );
  process.exit(0);
}

for (const e of fresh) {
  media.youtube.push({ id: e.id, title: e.title, kind: "short" });
}
writeFileSync(mediaPath, JSON.stringify(media, null, 2) + "\n");
console.log(`\n✓ appended ${fresh.length} — review titles / kinds in media.json`);
