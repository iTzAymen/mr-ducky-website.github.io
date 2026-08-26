import appIcon from "../assets/mr-ducky-app-icon-rounded.png";
import { useConfetti } from "../hooks/useConfetti";
import { useScrolled } from "../hooks/useScrolled";

const NAV_LINKS = [
  { label: "About", href: "#about" },
  { label: "Games", href: "#games" },
  { label: "Team", href: "#team" },
  { label: "Join", href: "#join" },
];

export function NavBar({ playHref }: { playHref: string }) {
  const scrolled = useScrolled(24);
  const onConfetti = useConfetti();

  return (
    <nav
      className="sticky top-0 z-[100] flex items-center gap-[18px] bg-[#FFFF0D] border-b-4 border-[#0B1D3F] px-[22px] py-[10px] transition-shadow duration-[250ms]"
      style={{
        boxShadow: scrolled ? "0 10px 26px rgba(11,29,63,.28)" : "none",
      }}
    >
      <a href="#top" className="flex flex-none items-center gap-2.5">
        <img
          src={appIcon}
          alt="Mr.Ducky Studio"
          className="h-[52px] w-[52px] rounded-[12px] border-[3px] border-[#0B1D3F] object-cover"
        />
        <span className="boldFont text-[19px] tracking-[-0.4px] text-[#0B1D3F]">
          Mr.Ducky Studio
        </span>
      </a>

      <div className="ml-auto flex items-center gap-1.5">
        <div className="hidden items-center gap-1.5 sm:flex">
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
          className="boldFont ml-2 flex items-center gap-2 rounded-full border-[3px] border-[#0B1D3F] bg-[#009DFF] px-5 py-[11px] text-sm text-white shadow-[0_4px_0_#0B1D3F] transition-all duration-150 hover:translate-y-0.5 hover:bg-[#0A66E0] hover:shadow-[0_2px_0_#0B1D3F] active:translate-y-1 active:shadow-[0_0_0_#0B1D3F]"
        >
          <span className="block h-0 w-0 border-y-[6px] border-l-[9px] border-y-transparent border-l-current" />
          Play Now
        </a>
      </div>
    </nav>
  );
}
