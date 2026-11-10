import { useEffect, useState, type CSSProperties } from "react";
import { TiltCard } from "./TiltCard";
import { useReveal } from "../hooks/useReveal";
import devs from "../Data/devs.json";
import { fetchAvatars } from "../dataFetch";

import { ReactComponent as DiscordIcon } from "../assets/discord.svg";
import { ReactComponent as YouTubeIcon } from "../assets/youtube.svg";
import { ReactComponent as TwitterIcon } from "../assets/twitter.svg";

const THEME = [
  {
    bg: "bg-[#009DFF]",
    nameColor: "text-white",
    roleColor: "text-white/95",
    avatarBg: "bg-[#FFFF0D]",
    ctaShadow: "rgba(11,29,63,.45)",
  },
  {
    bg: "bg-[#FFFF0D]",
    nameColor: "text-[#0B1D3F]",
    roleColor: "text-[#0B1D3F]/80",
    avatarBg: "bg-[#009DFF]",
    ctaShadow: "rgba(11,29,63,.3)",
  },
];

function DevCard({
  dev,
  index,
  icon,
}: {
  dev: (typeof devs)[number];
  index: number;
  icon: string;
}) {
  const { ref, style } = useReveal<HTMLDivElement>(index);
  const theme = THEME[index % THEME.length];

  const socials = [
    dev.youtubeUsername && {
      key: "youtube",
      href: `https://www.youtube.com/@${dev.youtubeUsername}`,
      Icon: YouTubeIcon,
    },
    dev.twitterUsername && {
      key: "twitter",
      href: `https://x.com/${dev.twitterUsername}`,
      Icon: TwitterIcon,
    },
    dev.discordUserId && {
      key: "discord",
      href: `https://discord.com/users/${dev.discordUserId}`,
      Icon: DiscordIcon,
    },
  ].filter((s): s is { key: string; href: string; Icon: typeof DiscordIcon } =>
    Boolean(s),
  );

  return (
    <TiltCard
      ref={ref}
      style={style}
      rotateMax={5}
      className={`relative flex items-start gap-5 rounded-[28px] border-4 border-[#0B1D3F] p-[22px] shadow-[0_8px_0_#0B1D3F] ${theme.bg}`}
    >
      <img
        src={icon}
        alt={dev.name}
        className={`h-[112px] w-[112px] flex-none rounded-[20px] border-4 border-[#0B1D3F] object-cover ${theme.avatarBg}`}
      />
      <div className="min-w-0 flex-1">
        <h3
          className={`boldFont m-0 mb-1.5 text-[26px] tracking-[-.6px] ${theme.nameColor}`}
        >
          {dev.name}
        </h3>
        <p
          className={`m-0 mb-4 text-[15.5px] leading-[1.45] font-bold ${theme.roleColor}`}
        >
          {dev.description}
        </p>
        <div className="mb-4 flex gap-2">
          {socials.map(({ key, href, Icon }, i) => (
            <a
              key={key}
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              className="flex h-[44px] w-[44px] items-center justify-center rounded-xl border-[3px] border-[#0B1D3F] bg-white transition-transform duration-150"
              onMouseEnter={(e) =>
                (e.currentTarget.style.transform = `translateY(-3px) rotate(${
                  i % 2 === 0 ? "-6deg" : "6deg"
                })`)
              }
              onMouseLeave={(e) => (e.currentTarget.style.transform = "")}
            >
              <Icon className="h-[19px] w-[19px]" />
            </a>
          ))}
        </div>
        <a
          href={`https://www.roblox.com/users/${dev.userId}/profile`}
          target="_blank"
          rel="noopener noreferrer"
          className="boldFont inline-flex items-center gap-2 rounded-full border-[3px] border-[#0B1D3F] bg-[#0B1D3F] px-[18px] py-[11px] text-sm text-[#FFFF0D] shadow-[0_4px_0_var(--cta-shadow)] transition-all duration-150 hover:translate-y-0.5 hover:bg-white hover:text-[#0B1D3F] hover:shadow-[0_2px_0_var(--cta-shadow)] active:translate-y-1 active:shadow-[0_0_0_var(--cta-shadow)]"
          style={{ "--cta-shadow": theme.ctaShadow } as CSSProperties}
        >
          View profile →
        </a>
      </div>
    </TiltCard>
  );
}

export function Team({ gamesShipped }: { gamesShipped: number }) {
  const heading = useReveal<HTMLDivElement>(0);
  const [avatars, setAvatars] = useState<Record<string, string>>({});

  // Live headshots from Roblox; devs.json `icon` is the fallback.
  useEffect(() => {
    fetchAvatars(devs.map((d) => d.userId)).then(setAvatars);
  }, []);

  return (
    <section id="team" className="px-6 pt-[72px] pb-5">
      <div className="mx-auto max-w-[1180px]">
        <div
          ref={heading.ref}
          style={heading.style}
          className="mb-[30px] flex flex-wrap items-end gap-4"
        >
          <h2 className="boldFont m-0 text-[clamp(32px,3.6vw,48px)] tracking-[-1.2px] text-[var(--ink)]">
            The ducks behind it
          </h2>
          <p className="m-0 mb-2 text-base text-[var(--ink)]/[62%]">
            {devs.length} people, {gamesShipped} games.
          </p>
        </div>
        <div className="grid grid-cols-[repeat(auto-fit,minmax(min(340px,100%),1fr))] gap-[26px]">
          {devs.map((dev, i) => (
            <DevCard
              key={dev.userId}
              dev={dev}
              index={i}
              icon={avatars[dev.userId] ?? dev.icon}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
