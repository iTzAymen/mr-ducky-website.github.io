import { useCallback, useRef } from "react";
import type {
  ComponentPropsWithRef,
  ElementType,
  MouseEvent as ReactMouseEvent,
  ReactNode,
  Ref,
} from "react";

type TiltCardOwnProps<T extends ElementType> = {
  as?: T;
  children: ReactNode;
  className?: string;
  rotateMax?: number; // Max rotation in degrees
  scale?: number; // Scale on hover
  lift?: number; // translateY(-lift px) on hover
  onMouseEnter?: () => void;
  onMouseLeave?: () => void;
};

type TiltCardProps<T extends ElementType> = TiltCardOwnProps<T> &
  Omit<ComponentPropsWithRef<T>, keyof TiltCardOwnProps<T>>;

export function TiltCard<T extends ElementType = "div">({
  as,
  children,
  className = "",
  rotateMax = 5,
  scale = 1.015,
  lift = 6,
  onMouseEnter,
  onMouseLeave,
  ref,
  ...rest
}: TiltCardProps<T>) {
  const Component = (as ?? "div") as ElementType;
  const cardRef = useRef<HTMLElement>(null);

  // Stable across re-renders: an inline `(node) => {...}` here would give
  // React a new ref identity on every render, causing it to detach and
  // reattach the ref each time — very noticeable on cards that re-render
  // often (e.g. a stat card ticking through its count-up animation).
  const setRefs = useCallback(
    (node: HTMLElement | null) => {
      cardRef.current = node;
      const externalRef = ref as Ref<HTMLElement> | undefined;
      if (!externalRef) return;
      if (typeof externalRef === "function") externalRef(node);
      else (externalRef as { current: HTMLElement | null }).current = node;
    },
    [ref]
  );

  function handleMouseMove(e: ReactMouseEvent) {
    const card = cardRef.current;
    if (!card) return;

    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    const rotateX = ((y - centerY) / centerY) * rotateMax;
    const rotateY = ((x - centerX) / centerX) * rotateMax;

    card.style.transform = `perspective(900px) rotateX(${-rotateX}deg) rotateY(${rotateY}deg) translateY(-${lift}px) scale(${scale})`;
  }

  function handleMouseLeave() {
    onMouseLeave?.();
    const card = cardRef.current;
    if (!card) return;
    card.style.transform = "";
  }

  return (
    <Component
      ref={setRefs}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      onMouseEnter={onMouseEnter}
      className={`transition-transform duration-300 ease-out ${className}`}
      {...rest}
    >
      {children}
    </Component>
  );
}
