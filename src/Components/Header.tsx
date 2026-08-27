import duckyLogo from "../assets/mr-ducky-logo-primary.png";
import { abbreviateNumber } from "../utils";
import { useConfetti } from "../hooks/useConfetti";
import { useParallax } from "../hooks/useParallax";

export function Header({
  totalPlaying,
  playHref,
}: {
  totalPlaying: number;
  playHref: string;
}) {
  const onConfetti = useConfetti();
  const parallaxRef = useParallax<HTMLDivElement>(5);

  return (
    <header
      id="top"
      className="relative overflow-hidden border-b-[5px] border-[#0B1D3F] px-6 pt-16 pb-[76px]"
      style={{
        background:
          "linear-gradient(160deg, #00C6FF 0%, #009DFF 46%, #0A66E0 100%)",
      }}
    >
      {/* <div
        className="pointer-events-none absolute -top-30 -left-20 h-130 w-130 rounded-full bg-[#FFFF0D]/[32%] blur-[28px] motion-safe:animate-[duckyBlob_15s_ease-in-out_infinite_alternate]"
        aria-hidden
      /> */}
      {/* <div
        className="pointer-events-none absolute -right-25 -bottom-45 h-150 w-150 rounded-full bg-[#FF7A18]/[42%] blur-[34px] motion-safe:animate-[duckyBlob_19s_ease-in-out_infinite_alternate-reverse]"
        aria-hidden
      /> */}
      <div
        className="pointer-events-none absolute top-[14%] right-[22%] h-[403px] w-[503px] rounded-[430%] bg-white/15 blur-[26px] motion-safe:animate-[duckyBlob_12s_ease-in-out_infinite_alternate]"
        aria-hidden
      />
      <div
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(rgba(11,29,63,.16)_1.6px,transparent_1.6px)] bg-[length:22px_22px]"
        aria-hidden
      />
      <div
        className="pointer-events-none absolute inset-0 opacity-55 bg-[repeating-linear-gradient(135deg,rgba(255,255,255,.09)_0_14px,rgba(255,255,255,0)_14px_28px)]"
        aria-hidden
      />

      <div className="relative mx-auto flex max-w-[1180px] flex-wrap items-center justify-center gap-10 sm:gap-16 lg:gap-20">
        <div ref={parallaxRef} className="relative flex-none">
          <img
            src={duckyLogo}
            alt="Mr.Ducky Studio logo"
            className="block w-[clamp(280px,34vw,480px)] object-contain drop-shadow-[0_18px_0_rgba(11,29,63,0.1)]"
          />
          <div className="boldFont absolute -top-1.5 -right-4 rounded-2xl border-4 border-[#0B1D3F] bg-[#FFFF0D] px-[14px] py-[9px] text-[13px] tracking-[.4px] shadow-[0_5px_0_#0B1D3F] motion-safe:animate-[duckyBob_6s_ease-in-out_infinite]">
            SINCE 2021
          </div>
          <div className="boldFont absolute top-[30px] -left-2 rounded-2xl border-4 border-[#0B1D3F] bg-white px-[14px] py-[9px] text-[13px] shadow-[0_5px_0_#0B1D3F] motion-safe:animate-[duckyBob2_7.5s_ease-in-out_infinite]">
            8 GAMES SHIPPED
          </div>
        </div>

        <div className="min-w-[260px] max-w-[560px] flex-1 basis-[440px] sm:min-w-[340px]">
          <div className="mb-5 inline-flex items-center gap-[9px] rounded-full border-[3px] border-[#0B1D3F] bg-[#0B1D3F]/90 py-[7px] pr-[15px] pl-3">
            <span className="h-[9px] w-[9px] rounded-full bg-[#FF2D55] motion-safe:animate-[duckyPulse_2s_infinite]" />
            <span className="boldFont text-[13px] tracking-[.3px] text-white">
              {abbreviateNumber(totalPlaying, true)} PLAYING RIGHT NOW
            </span>
          </div>
          <h1
            className="boldFont mb-[18px] text-[clamp(38px,4.6vw,62px)] leading-[.97] tracking-[-1.6px] text-balance text-white"
            style={{ textShadow: "0 6px 0 rgba(11,29,63,.55)" }}
          >
            Fun, Creative, and Playful Roblox Game Development!
          </h1>
          <p className="mb-7 max-w-[460px] text-lg leading-normal text-pretty text-white/[.94]">
            We build unique, high-quality Roblox experiences that bring players
            together. Eight games, one duck in a fedora.
          </p>
          <div className="flex flex-wrap gap-3.5">
            <a
              href={playHref}
              target="_blank"
              rel="noopener noreferrer"
              onClick={onConfetti}
              className="boldFont flex items-center gap-2.5 rounded-full border-4 border-[#0B1D3F] bg-[#FFFF0D] px-[26px] py-4 text-[17px] text-[#0B1D3F] shadow-[0_6px_0_#0B1D3F] transition-all duration-150 hover:translate-y-[3px] hover:bg-[#FFD524] hover:shadow-[0_3px_0_#0B1D3F] active:translate-y-[6px] active:shadow-[0_0_0_#0B1D3F]"
            >
              <span className="block h-0 w-0 border-y-[7px] border-l-[11px] border-y-transparent border-l-current" />
              Play our newest game
            </a>
            <a
              href="#games"
              className="boldFont flex items-center gap-2.5 rounded-full border-4 border-white bg-white/[.16] px-[26px] py-4 text-[17px] text-white transition-all duration-150 hover:bg-white hover:text-[#0A66E0]"
            >
              See all games
            </a>
          </div>
        </div>
      </div>
    </header>
  );
}
