import { useEffect, useRef } from "react";

const VERTICAL_ANCHOR_PX = 320;

function prefersReducedMotion() {
  return (
    typeof window !== "undefined" &&
    window.matchMedia("(prefers-reduced-motion: reduce)").matches
  );
}

/** Cursor-follow parallax: translates the ref'd element by up to `distance`px, imperatively. */
export function useParallax<T extends HTMLElement = HTMLDivElement>(distance = 5) {
  const ref = useRef<T>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el || prefersReducedMotion()) return;

    const onMove = (e: globalThis.MouseEvent) => {
      const cx = window.innerWidth / 2;
      const dx = ((e.clientX - cx) / cx) * distance;
      const dy = ((e.clientY - VERTICAL_ANCHOR_PX) / VERTICAL_ANCHOR_PX) * (distance * 0.6);
      el.style.transform = `translate3d(${dx}px, ${dy}px, 0)`;
    };

    window.addEventListener("mousemove", onMove, { passive: true });
    return () => window.removeEventListener("mousemove", onMove);
  }, [distance]);

  return ref;
}
