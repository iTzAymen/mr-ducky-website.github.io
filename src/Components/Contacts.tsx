import { TiltCard } from "./TiltCard";
import { useReveal } from "../hooks/useReveal";
import { abbreviateNumber } from "../utils";
import contacts from "../Data/contacts.json";

import { ReactComponent as DiscordIcon } from "../assets/discord.svg";
import { ReactComponent as TikTokIcon } from "../assets/tiktok.svg";
import { ReactComponent as RobloxIcon } from "../assets/roblox.svg";

function DotGridOverlay({ opacity }: { opacity: number }) {
  return (
    <div
      className="pointer-events-none absolute inset-0"
      style={{
        backgroundImage: `radial-gradient(rgba(255,255,255,${opacity}) 1.5px, transparent 1.5px)`,
        backgroundSize: "18px 18px",
      }}
      aria-hidden
    />
  );
}

export function Contacts({ groupMembers }: { groupMembers: number }) {
  const heading = useReveal<HTMLDivElement>(0);
  const discord = useReveal<HTMLAnchorElement>(0);
  const tiktok = useReveal<HTMLAnchorElement>(1);
  const roblox = useReveal<HTMLAnchorElement>(2);

  return (
    <section id="join" className="px-6 pt-[72px] pb-[90px]">
      <div className="mx-auto max-w-[1180px]">
        <div
          ref={heading.ref}
          style={heading.style}
          className="mb-[30px] flex flex-wrap items-end gap-4"
        >
          <h2 className="boldFont m-0 text-[clamp(32px,3.6vw,48px)] tracking-[-1.2px] text-[var(--ink)]">
            Come hang out
          </h2>
          <p className="m-0 mb-2 text-base text-[var(--ink)]/[62%]">
            Playtests, sneak peeks, and questions answered.
          </p>
        </div>

        <div className="grid grid-cols-[repeat(auto-fit,minmax(min(300px,100%),1fr))] gap-6">
          <TiltCard
            as="a"
            ref={discord.ref}
            style={discord.style}
            href={contacts.Discord}
            target="_blank"
            rel="noopener noreferrer"
            rotateMax={5}
            className="relative flex flex-col gap-4 overflow-hidden rounded-[28px] border-4 border-[#0B1D3F] bg-[#5C68EE] p-[26px] text-white shadow-[0_8px_0_#0B1D3F]"
          >
            <DotGridOverlay opacity={0.18} />
            <div className="relative flex h-[60px] w-[60px] items-center justify-center rounded-2xl border-[3px] border-[#0B1D3F] bg-white">
              <DiscordIcon className="h-7 w-7" />
            </div>
            <div className="relative">
              <div className="boldFont mb-1 text-[26px] tracking-[-.6px]">
                Discord
              </div>
              <div className="defaultFont text-[15px] font-bold text-white/90">
                5K members · daily chat
              </div>
            </div>
            <div className="boldFont relative mt-auto w-fit self-start rounded-full border-[3px] border-[#0B1D3F] bg-[#0B1D3F]/85 px-4 py-2.5 text-sm">
              Join the server →
            </div>
          </TiltCard>

          <TiltCard
            as="a"
            ref={tiktok.ref}
            style={tiktok.style}
            href={contacts.TikTok}
            target="_blank"
            rel="noopener noreferrer"
            rotateMax={5}
            className="relative flex flex-col gap-4 overflow-hidden rounded-[28px] border-4 border-[#0B1D3F] bg-[#0B1D3F] p-[26px] text-white shadow-[0_8px_0_#0A66E0]"
          >
            <DotGridOverlay opacity={0.14} />
            <div className="relative flex h-[60px] w-[60px] items-center justify-center rounded-2xl border-[3px] border-[#0B1D3F] bg-white">
              <TikTokIcon className="h-7 w-7" />
            </div>
            <div className="relative">
              <div className="boldFont mb-1 text-[26px] tracking-[-.6px]">
                TikTok
              </div>
              <div className="defaultFont text-[15px] font-bold text-white/[82%]">
                @mr.ducky.studio · clips &amp; devlogs
              </div>
            </div>
            <div className="boldFont relative mt-auto w-fit self-start rounded-full border-[3px] border-[#0B1D3F] bg-[#FFFF0D] px-4 py-2.5 text-sm text-[#0B1D3F]">
              Follow us →
            </div>
          </TiltCard>

          <TiltCard
            as="a"
            ref={roblox.ref}
            style={roblox.style}
            href={contacts.RobloxGroup}
            target="_blank"
            rel="noopener noreferrer"
            rotateMax={5}
            className="relative flex flex-col gap-4 overflow-hidden rounded-[28px] border-4 border-[#0B1D3F] bg-[#FF7A18] p-[26px] text-white shadow-[0_8px_0_#0B1D3F]"
          >
            <DotGridOverlay opacity={0.2} />
            <div className="relative flex h-[60px] w-[60px] items-center justify-center rounded-2xl border-[3px] border-[#0B1D3F] bg-white">
              <RobloxIcon className="h-[30px] w-[30px] fill-[#0B1D3F]" />
            </div>
            <div className="relative">
              <div className="boldFont mb-1 text-[26px] tracking-[-.6px]">
                Roblox group
              </div>
              <div className="defaultFont text-[15px] font-bold text-white/[92%]">
                {abbreviateNumber(groupMembers, true)} members · free items
              </div>
            </div>
            <div className="boldFont relative mt-auto w-fit self-start rounded-full border-[3px] border-[#0B1D3F] bg-[#0B1D3F]/85 px-4 py-2.5 text-sm">
              Join the group →
            </div>
          </TiltCard>
        </div>
      </div>
    </section>
  );
}
