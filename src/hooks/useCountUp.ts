import { useEffect, useRef, useState } from "react";

const DURATION_MS = 1400;

function easeOutCubic(p: number) {
  return 1 - Math.pow(1 - p, 3);
}

function prefersReducedMotion() {
  return (
    typeof window !== "undefined" &&
    window.matchMedia("(prefers-reduced-motion: reduce)").matches
  );
}

/**
 * Counts 0 -> target once `trigger` becomes true. Stays in sync with later
 * changes to `target` (e.g. live data arriving) once the animation is done.
 */
export function useCountUp(target: number, trigger: boolean) {
  const [value, setValue] = useState(0);
  const startedRef = useRef(false);
  const doneRef = useRef(false);
  const rafRef = useRef(0);

  useEffect(() => {
    if (doneRef.current) setValue(target);
  }, [target]);

  useEffect(() => {
    if (!trigger || startedRef.current) return;
    startedRef.current = true;

    if (prefersReducedMotion()) {
      setValue(target);
      doneRef.current = true;
      return;
    }

    const start = performance.now();
    const tick = (now: number) => {
      const p = Math.min(1, (now - start) / DURATION_MS);
      setValue(Math.round(target * easeOutCubic(p)));
      if (p < 1) {
        rafRef.current = requestAnimationFrame(tick);
      } else {
        doneRef.current = true;
      }
    };
    rafRef.current = requestAnimationFrame(tick);

    return () => cancelAnimationFrame(rafRef.current);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [trigger]);

  return value;
}
