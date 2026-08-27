import { useEffect, useRef, useState } from "react";
import { getYouTubeEmbedUrl } from "../utils";

const SLIDE_INTERVAL_MS = 3000;
const CROSSFADE_MS = 240;
const VIDEO_HOVER_DELAY_MS = 350;

export function GameThumbnail({
  thumbnails,
  alt,
  className = "",
  hoverScaleClassName = "group-hover:scale-[1.06]",
  videoUrl,
}: {
  thumbnails: string[];
  alt: string;
  className?: string;
  hoverScaleClassName?: string;
  videoUrl?: string;
}) {
  const [index, setIndex] = useState(0);
  const [hovered, setHovered] = useState(false);
  const [fading, setFading] = useState(false);
  const [videoActive, setVideoActive] = useState(false);
  const [videoEnding, setVideoEnding] = useState(false);
  const intervalRef = useRef<number>(0);
  const fadeTimeoutRef = useRef<number>(0);
  const videoTimeoutRef = useRef<number>(0);
  const videoEndTimeoutRef = useRef<number>(0);
  const iframeRef = useRef<HTMLIFrameElement>(null);
  const canSlideshow = thumbnails.length > 1;
  const embedUrl = videoUrl ? getYouTubeEmbedUrl(videoUrl) : null;

  useEffect(() => {
    if (!hovered || !embedUrl) {
      window.clearTimeout(videoTimeoutRef.current);
      window.clearTimeout(videoEndTimeoutRef.current);
      setVideoActive(false);
      setVideoEnding(false);
      return;
    }
    videoTimeoutRef.current = window.setTimeout(() => {
      setVideoActive(true);
    }, VIDEO_HOVER_DELAY_MS);
    return () => window.clearTimeout(videoTimeoutRef.current);
  }, [hovered, embedUrl]);

  // Listens for the YouTube player's postMessage state updates so we can
  // fade back to the (now next) thumbnail once the preview finishes playing.
  useEffect(() => {
    if (!embedUrl || !videoActive) return;

    let unmuted = false;

    const sendCommand = (func: string, args: unknown[] = []) => {
      iframeRef.current?.contentWindow?.postMessage(
        JSON.stringify({ event: "command", func, args }),
        "*"
      );
    };

    const sendListening = () => {
      iframeRef.current?.contentWindow?.postMessage(
        JSON.stringify({ event: "listening", id: embedUrl }),
        "*"
      );
    };

    // The embed starts muted so autoplay is allowed on hover; once the
    // player actually starts playing we unmute it in-place, which browsers
    // permit even without a click since playback was already underway.
    const unmute = () => {
      if (unmuted) return;
      unmuted = true;
      sendCommand("unMute");
      sendCommand("setVolume", [100]);
    };

    function onMessage(e: MessageEvent) {
      if (e.source !== iframeRef.current?.contentWindow) return;
      if (typeof e.data !== "string") return;
      let data: { info?: { playerState?: number } };
      try {
        data = JSON.parse(e.data);
      } catch {
        return;
      }
      const state = data?.info?.playerState;
      if (state === 1) unmute();
      if (state === 0) {
        setIndex((i) => (i + 1) % thumbnails.length);
        setVideoEnding(true);
        videoEndTimeoutRef.current = window.setTimeout(() => {
          setVideoActive(false);
          setVideoEnding(false);
        }, 420);
      }
    }

    window.addEventListener("message", onMessage);
    const handshake1 = window.setTimeout(sendListening, 200);
    const handshake2 = window.setTimeout(() => {
      sendListening();
      unmute();
    }, 700);
    const handshake3 = window.setTimeout(unmute, 1400);

    return () => {
      window.removeEventListener("message", onMessage);
      window.clearTimeout(handshake1);
      window.clearTimeout(handshake2);
      window.clearTimeout(handshake3);
    };
  }, [embedUrl, videoActive, thumbnails.length]);

  useEffect(() => {
    if (!hovered || !canSlideshow || embedUrl) return;
    intervalRef.current = window.setInterval(() => {
      setFading(true);
      fadeTimeoutRef.current = window.setTimeout(() => {
        setIndex((i) => (i + 1) % thumbnails.length);
        setFading(false);
      }, CROSSFADE_MS);
    }, SLIDE_INTERVAL_MS);
    return () => {
      clearInterval(intervalRef.current);
      clearTimeout(fadeTimeoutRef.current);
    };
  }, [hovered, canSlideshow, thumbnails.length]);

  useEffect(() => {
    if (!hovered) setIndex(0);
  }, [hovered]);

  useEffect(() => {
    if (!canSlideshow) return;
    const preloaded = thumbnails.map((url) => {
      const img = new Image();
      img.src = url;
      return img;
    });
    return () => {
      preloaded.forEach((img) => {
        img.src = "";
      });
    };
  }, [canSlideshow, thumbnails]);

  return (
    <div
      className={`relative bg-[#0B1D3F] ${className}`}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <img
        src={thumbnails[index] ?? ""}
        alt={alt}
        className={`block h-full w-full object-cover ${hoverScaleClassName}`}
        style={{
          opacity: fading ? 0 : 1,
          transition: "opacity .3s ease, scale .5s ease",
        }}
      />
      {embedUrl && videoActive && (
        <iframe
          ref={iframeRef}
          key={embedUrl}
          src={embedUrl}
          title={`${alt} video preview`}
          className="pointer-events-none absolute inset-0 h-full w-full"
          style={{
            opacity: videoEnding ? 0 : 1,
            transition: "opacity .4s ease",
          }}
          allow="autoplay; encrypted-media"
          frameBorder={0}
        />
      )}
      {canSlideshow && !embedUrl && (
        <div
          className={`absolute bottom-2.5 left-1/2 flex -translate-x-1/2 gap-1.5 transition-opacity duration-200 ${
            hovered ? "opacity-100" : "opacity-0"
          }`}
        >
          {thumbnails.map((url, i) => (
            <div
              key={url}
              className={`h-[7px] w-[7px] rounded-full border-[1.5px] border-[#0B1D3F] bg-white transition-transform duration-200 ${
                i === index ? "scale-125" : "opacity-45"
              }`}
            />
          ))}
        </div>
      )}
    </div>
  );
}
