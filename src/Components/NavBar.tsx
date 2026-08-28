import { useState } from "react";
import appIcon from "../assets/mr-ducky-app-icon-rounded.png";
import { useConfetti } from "../hooks/useConfetti";
import { useScrolled } from "../hooks/useScrolled";

const NAV_LINKS = [
  { label: "About", href: "#about" },
  { label: "Games", href: "#games" },
  { label: "Team", href: "#team" },
  { label: "Story", href: "#story" },
  { label: "FAQ", href: "#faq" },
  { label: "Join", href: "#join" },
];

export function NavBar({
  playHref,
  theme,
  toggleTheme,
}: {
  playHref: string;
  theme: "light" | "dark";
  toggleTheme: () => void;
}) {
  const scrolled = useScrolled(24);
  const onConfetti = useConfetti();
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <nav
      className="sticky top-0 z-[100] flex items-center gap-2.5 bg-[#FFFF0D] border-b-4 border-[#0B1D3F] px-4 py-[10px] transition-shadow duration-[250ms] sm:gap-[18px] sm:px-[22px]"
      style={{
        boxShadow: scrolled ? "0 10px 26px rgba(11,29,63,.28)" : "none",
      }}
    >
      <a href="#top" className="flex flex-none items-center gap-2">
        <img
          src={appIcon}
          alt="Mr.Ducky Studio"
          className="h-10 w-10 rounded-[10px] border-2 border-[#0B1D3F] object-cover sm:h-[52px] sm:w-[52px] sm:rounded-[12px] sm:border-[3px]"
        />
        <span className="boldFont text-[15px] tracking-[-0.4px] text-[#0B1D3F] sm:text-[19px]">
          Mr.Ducky Studio
        </span>
      </a>

      <div className="ml-auto flex items-center gap-1.5">
        <div className="hidden items-center gap-1.5 lg:flex">
          {NAV_LINKS.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="boldFont800 rounded-full px-[14px] py-[9px] text-sm text-[#0B1D3F] transition-all duration-150 hover:-translate-y-0.5 hover:bg-[#0B1D3F] hover:text-[#FFFF0D]"
            >
              {link.label}
            </a>
          ))}
        </div>
        <a
          href={playHref}
          target="_blank"
          rel="noopener noreferrer"
          onClick={onConfetti}
          className="boldFont flex items-center gap-1.5 rounded-full border-2 border-[#0B1D3F] bg-[#009DFF] px-3.5 py-2 text-xs text-white shadow-[0_3px_0_#0B1D3F] transition-all duration-150 hover:translate-y-0.5 hover:bg-[#0A66E0] hover:shadow-[0_1px_0_#0B1D3F] active:translate-y-1 active:shadow-[0_0_0_#0B1D3F] sm:ml-2 sm:gap-2 sm:border-[3px] sm:px-5 sm:py-[11px] sm:text-sm sm:shadow-[0_4px_0_#0B1D3F] sm:hover:shadow-[0_2px_0_#0B1D3F]"
        >
          <span className="block h-0 w-0 border-y-[5px] border-l-[8px] border-y-transparent border-l-current sm:border-y-[6px] sm:border-l-[9px]" />
          Play Now
        </a>
        <button
          type="button"
          onClick={toggleTheme}
          aria-label={
            theme === "dark" ? "Switch to light mode" : "Switch to dark mode"
          }
          className="flex h-9 w-9 flex-none items-center justify-center rounded-full border-2 border-[#0B1D3F] bg-white text-[#0B1D3F] shadow-[0_3px_0_#0B1D3F] transition-all duration-150 hover:translate-y-0.5 hover:bg-[#FFFF0D] hover:shadow-[0_1px_0_#0B1D3F] active:translate-y-1 active:shadow-[0_0_0_#0B1D3F] sm:h-10 sm:w-10 sm:border-[3px] sm:shadow-[0_4px_0_#0B1D3F] sm:hover:shadow-[0_2px_0_#0B1D3F]"
        >
          {theme === "dark" ? (
            <svg
              viewBox="0 0 24 24"
              className="h-[18px] w-[18px]"
              fill="currentColor"
            >
              <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79Z" />
            </svg>
          ) : (
            <svg
              viewBox="0 0 24 24"
              className="h-[18px] w-[18px]"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
            >
              <circle cx="12" cy="12" r="4" />
              <path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M4.93 19.07l1.41-1.41M17.66 6.34l1.41-1.41" />
            </svg>
          )}
        </button>
        <button
          type="button"
          onClick={() => setMenuOpen((open) => !open)}
          aria-label={menuOpen ? "Close menu" : "Open menu"}
          aria-expanded={menuOpen}
          className="flex h-9 w-9 flex-none items-center justify-center rounded-full border-2 border-[#0B1D3F] bg-white lg:hidden"
        >
          <svg viewBox="0 0 24 24" className="h-[18px] w-[18px]" fill="none">
            {menuOpen ? (
              <path
                d="M5 5l14 14M19 5L5 19"
                stroke="#0B1D3F"
                strokeWidth="2.4"
                strokeLinecap="round"
              />
            ) : (
              <>
                <path
                  d="M4 6h16M4 12h16M4 18h16"
                  stroke="#0B1D3F"
                  strokeWidth="2.4"
                  strokeLinecap="round"
                />
              </>
            )}
          </svg>
        </button>
      </div>

      {menuOpen && (
        <div className="absolute inset-x-0 top-full flex flex-col gap-1 border-b-4 border-[#0B1D3F] bg-[#FFFF0D] px-4 py-3 shadow-[0_10px_26px_rgba(11,29,63,.28)] lg:hidden">
          {NAV_LINKS.map((link) => (
            <a
              key={link.href}
              href={link.href}
              onClick={() => setMenuOpen(false)}
              className="boldFont800 rounded-xl px-4 py-3 text-base text-[#0B1D3F] transition-colors duration-150 hover:bg-[#0B1D3F] hover:text-[#FFFF0D]"
            >
              {link.label}
            </a>
          ))}
        </div>
      )}
    </nav>
  );
}
