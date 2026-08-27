export function getYouTubeVideoId(url: string): string | null {
  try {
    const parsed = new URL(url);
    if (parsed.hostname.includes("youtu.be")) {
      return parsed.pathname.slice(1) || null;
    }
    if (parsed.pathname.startsWith("/embed/")) {
      return parsed.pathname.slice("/embed/".length) || null;
    }
    return parsed.searchParams.get("v");
  } catch {
    return null;
  }
}

export function getYouTubeEmbedUrl(url: string): string | null {
  const id = getYouTubeVideoId(url);
  if (!id) return null;
  const params = new URLSearchParams({
    autoplay: "1",
    // Start muted so the browser's autoplay policy allows it to start on
    // hover (a mouseenter isn't a "user gesture"); GameThumbnail unmutes
    // it a moment later via the player's postMessage API once it's playing.
    mute: "1",
    controls: "0",
    modestbranding: "1",
    rel: "0",
    playsinline: "1",
    enablejsapi: "1",
  });
  if (typeof window !== "undefined") {
    params.set("origin", window.location.origin);
  }
  return `https://www.youtube.com/embed/${id}?${params.toString()}`;
}

export function abbreviateNumber(num: number, hidePlus?: boolean): string {
  if (num >= 1_000_000_000) {
    return (
      (num / 1_000_000_000).toFixed(1).replace(/\.0$/, "") +
      "B" +
      (hidePlus ? "" : "+")
    );
  }
  if (num >= 1_000_000) {
    return (
      (num / 1_000_000).toFixed(1).replace(/\.0$/, "") +
      "M" +
      (hidePlus ? "" : "+")
    );
  }
  if (num >= 1_000) {
    return (
      (num / 1_000).toFixed(1).replace(/\.0$/, "") + "K" + (hidePlus ? "" : "+")
    );
  }
  return num.toString();
}
