import appIcon from "../assets/mr-ducky-app-icon-rounded.png";
import contacts from "../Data/contacts.json";
import { STUDIO } from "../config/studio";

const LINKS = [
  { label: "Discord", href: contacts.Discord, variant: "solid" as const },
  {
    label: "Roblox group",
    href: contacts.RobloxGroup,
    variant: "outline" as const,
  },
  { label: "TikTok", href: contacts.TikTok, variant: "outline" as const },
];

export function Footer() {
  return (
    <footer className="relative overflow-hidden border-t-[5px] border-[#0B1D3F] bg-[#0B1D3F] px-6 pt-11 pb-9">
      <div
        className="pointer-events-none absolute -top-35 left-[14%] h-90 w-90 rounded-full blur-[26px] motion-safe:animate-[duckyBlob_17s_ease-in-out_infinite_alternate]"
        style={{
          background:
            "radial-gradient(circle, rgba(0,157,255,.5), rgba(0,157,255,0) 65%)",
        }}
        aria-hidden
      />
      <div className="relative mx-auto flex max-w-[1180px] flex-wrap items-center justify-between gap-[26px]">
        <div className="flex items-center gap-3.5">
          <img
            src={appIcon}
            alt="Mr.Ducky Studio"
            className="h-[62px] w-[62px] rounded-[14px] border-[3px] border-[#FFFF0D] object-cover"
          />
          <div>
            <div className="boldFont text-[19px] text-white">
              Mr.Ducky Studio
            </div>
            <div className="defaultFont text-sm text-white/60">
              © {new Date().getFullYear()} · Making Roblox games since{" "}
              {STUDIO.foundedYear}
            </div>
          </div>
        </div>
        <div className="flex flex-wrap gap-2.5">
          {LINKS.map((link) => (
            <a
              key={link.label}
              href={link.href}
              target="_blank"
              rel="noopener noreferrer"
              className={
                link.variant === "solid"
                  ? "boldFont rounded-full border-[3px] border-[#FFFF0D] bg-[#FFFF0D] px-4 py-2.5 text-[13.5px] text-[#0B1D3F] transition-all duration-150 hover:bg-transparent hover:text-[#FFFF0D]"
                  : "boldFont rounded-full border-[3px] border-white/35 bg-transparent px-4 py-2.5 text-[13.5px] text-white transition-all duration-150 hover:border-white hover:bg-white/[12%]"
              }
            >
              {link.label}
            </a>
          ))}
        </div>
      </div>
    </footer>
  );
}
