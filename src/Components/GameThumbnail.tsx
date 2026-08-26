import { useEffect, useRef, useState } from "react";

const SLIDE_INTERVAL_MS = 3000;
const CROSSFADE_MS = 240;

export function GameThumbnail({
  thumbnails,
  alt,
  className = "",
  hoverScaleClassName = "group-hover:scale-[1.06]",
}: {
  thumbnails: string[];
  alt: string;
  className?: string;
  hoverScaleClassName?: string;
}) {
  const [index, setIndex] = useState(0);
  const [hovered, setHovered] = useState(false);
  const [fading, setFading] = useState(false);
  const intervalRef = useRef<number>(0);
  const fadeTimeoutRef = useRef<number>(0);
  const canSlideshow = thumbnails.length > 1;

  useEffect(() => {
    if (!hovered || !canSlideshow) return;
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
      {canSlideshow && (
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
