import { useCallback, type MouseEvent } from "react";

const CONFETTI_COLORS = ["#FFFF0D", "#009DFF", "#FF7A18", "#FF2D55", "#0A66E0", "#fff"];
const BIT_COUNT = 26;
const HOST_LIFETIME_MS = 1700;

function prefersReducedMotion() {
  return (
    typeof window !== "undefined" &&
    window.matchMedia("(prefers-reduced-motion: reduce)").matches
  );
}

function burst(x: number, y: number) {
  const host = document.createElement("div");
  host.style.cssText =
    "position:fixed;left:0;top:0;width:0;height:0;z-index:9999;pointer-events:none";
  document.body.appendChild(host);

  for (let i = 0; i < BIT_COUNT; i++) {
    const bit = document.createElement("div");
    const size = 6 + Math.random() * 8;
    const isRound = Math.random() > 0.5;
    bit.style.cssText = `position:fixed;left:${x}px;top:${y}px;width:${size}px;height:${
      size * (isRound ? 1 : 0.45)
    }px;background:${CONFETTI_COLORS[i % CONFETTI_COLORS.length]};border:1.5px solid #0B1D3F;border-radius:${
      isRound ? "50%" : "2px"
    };will-change:transform,opacity`;
    host.appendChild(bit);

    const angle = Math.random() * Math.PI * 2;
    const dist = 60 + Math.random() * 170;
    bit.animate(
      [
        { transform: "translate(-50%,-50%) rotate(0deg)", opacity: 1 },
        {
          transform: `translate(${Math.cos(angle) * dist - 50}%,${
            Math.sin(angle) * dist + 120
          }%) rotate(${(Math.random() * 720 - 360) | 0}deg)`,
          opacity: 0,
        },
      ],
      { duration: 900 + Math.random() * 500, easing: "cubic-bezier(.15,.8,.3,1)", fill: "forwards" }
    );
  }

  setTimeout(() => host.remove(), HOST_LIFETIME_MS);
}

/** Click handler for `data-confetti`-style CTAs: spawns a silent confetti burst at the cursor. */
export function useConfetti() {
  return useCallback((e: MouseEvent) => {
    if (prefersReducedMotion()) return;
    burst(e.clientX, e.clientY);
  }, []);
}
