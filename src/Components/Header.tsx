import { useState, useEffect } from "react";
import duckyLogo from "../assets/ducky-masked.png";

export function Header() {
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Shrinks from 1 → 0.7 scale over the first 300px of scroll
  const scale = Math.max(0.5, 1 - scrollY / 400);
  const transition = "0.35s ease";

  return (
    <div className="relative overflow-hidden w-full from-[#009dff] to-[#00c6ff] bg-gradient-to-r">
      <img
        src="https://img.freepik.com/premium-vector/hud-grid-pattern-background-04_758394-54.jpg?semt=ais_hybrid&w=740&q=80"
        alt="Background"
        className="absolute inset-0 z-0 w-full h-full object-cover opacity-20 mix-blend-multiply"
      />
      <div
        className="z-10"
        style={{
          paddingTop: `${40 * scale ** 2}px`,
          paddingBottom: `${40 * scale ** 2}px`,
          paddingLeft: "20px",
          paddingRight: "20px",
          transition: `padding ${transition}`,
        }}
      >
        <img
          src={duckyLogo}
          alt="ducky logo"
          style={{
            height: `${200 * scale}px`,
            marginTop: `${0 * scale ** 2}px`, // change 0 to your top margin value if needed
            marginBottom: `${15 * scale ** 2}px`,
            transition: `height ${transition}, margin ${transition}`,
          }}
          className="rounded-[7px] mx-auto"
        />
        <h1
          className="mx-auto w-full text-center text-white boldFont"
          style={{
            fontSize: `${48 * scale}px`,
            marginTop: `${15 * scale ** 2}px`,
            transition: `font-size ${transition}, margin-top ${transition}, margin-bottom ${transition}`,
          }}
        >
          Mr.Ducky Studio
        </h1>
        <p
          className="text-white w-full text-center opacity-90"
          style={{
            fontSize: `${19 * scale}px`,
            marginBottom: `${8 * scale ** 2}px`,
            transition: `font-size ${transition}, margin-top ${transition}, margin-bottom ${transition}`,
          }}
        >
          Fun, Creative, and Playful Roblox Game Development!
        </p>
      </div>
    </div>
  );
}
