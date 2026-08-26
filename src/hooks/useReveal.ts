import { useEffect, useRef, useState, type CSSProperties } from "react";

const SAFETY_TIMEOUT_MS = 2600;

function prefersReducedMotion() {
  return (
    typeof window !== "undefined" &&
    window.matchMedia("(prefers-reduced-motion: reduce)").matches
  );
}

/**
 * Scroll-triggered reveal, staggered in groups of 4 (70ms apart), with a
 * safety timer so content is never stranded invisible if IntersectionObserver
 * never fires.
 */
export function useReveal<T extends HTMLElement = HTMLDivElement>(
  index = 0
) {
  const ref = useRef<T>(null);
  const [visible, setVisible] = useState(false);
  const [settled, setSettled] = useState(false);
  const delayMs = (index % 4) * 70;

  useEffect(() => {
    const el = ref.current;
    if (!el || prefersReducedMotion()) {
      setVisible(true);
      setSettled(true);
      return;
    }

    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setVisible(true);
            io.unobserve(entry.target);
          }
        });
      },
      { rootMargin: "0px 0px -8% 0px", threshold: 0.08 }
    );
    io.observe(el);

    const safety = setTimeout(() => setVisible(true), SAFETY_TIMEOUT_MS);

    return () => {
      io.disconnect();
      clearTimeout(safety);
    };
  }, []);

  // Once the reveal transition has finished, drop `transition` from the
  // returned style entirely — otherwise this inline style permanently wins
  // over any transition class the consumer applies (e.g. TiltCard's hover
  // tilt), baking this one-time reveal's slower easing and stagger delay
  // into every future interaction with the element.
  useEffect(() => {
    if (!visible) return;
    const timer = setTimeout(() => setSettled(true), 600 + delayMs + 50);
    return () => clearTimeout(timer);
  }, [visible, delayMs]);

  const style: CSSProperties = settled
    ? { opacity: 1, transform: "none" }
    : {
        opacity: visible ? 1 : 0,
        transform: visible ? "none" : "translateY(26px)",
        transition: `opacity .6s cubic-bezier(.2,.8,.25,1) ${delayMs}ms, transform .6s cubic-bezier(.2,.8,.25,1) ${delayMs}ms`,
      };

  return { ref, visible, style };
}
