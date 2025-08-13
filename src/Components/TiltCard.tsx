import { useRef } from "react";

interface TiltCardProps {
  children: React.ReactNode;
  className?: string;
  rotateMax?: number; // Max rotation in degrees
  scale?: number; // Scale on hover
  onMouseEnter?: () => void;
  onMouseLeave?: () => void;
}

export function TiltCard({
  children,
  className = "",
  rotateMax = 5,
  scale = 1.05,
  onMouseEnter,
  onMouseLeave,
}: TiltCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);

  function handleMouseMove(e: React.MouseEvent) {
    const card = cardRef.current;
    if (!card) return;

    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    const rotateX = ((y - centerY) / centerY) * rotateMax;
    const rotateY = ((x - centerX) / centerX) * rotateMax;

    card.style.transform = `
      perspective(800px)
      rotateX(${-rotateX}deg)
      rotateY(${rotateY}deg)
      scale(${scale})
    `;
  }

  function handleMouseLeave() {
    if (onMouseLeave) onMouseLeave();
    const card = cardRef.current;
    if (!card) return;
    card.style.transform = `
      perspective(800px)
      rotateX(0deg)
      rotateY(0deg)
      scale(1)
    `;
  }

  return (
    <div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      onMouseEnter={onMouseEnter}
      className={`transition-transform duration-300 ease-out${className}`}
    >
      {children}
    </div>
  );
}
