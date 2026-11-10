import { TiltCard } from "./TiltCard";
import { useReveal } from "../hooks/useReveal";
import { useCountUp } from "../hooks/useCountUp";
import { abbreviateNumber } from "../utils";
import type { ProjectData } from "../Types";

const CHIPS = ["MULTIPLAYER", "CO-OP", "PARTY GAMES", "OBBY"];

const HomeIcon = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" className="h-[17px] w-[17px]">
    <path d="M11.47 3.841a.75.75 0 0 1 1.06 0l8.69 8.69a.75.75 0 1 0 1.06-1.061l-8.689-8.69a2.25 2.25 0 0 0-3.182 0l-8.69 8.69a.75.75 0 1 0 1.061 1.06l8.69-8.689Z" />
    <path d="m12 5.432 8.159 8.159c.03.03.06.058.091.086v6.198c0 1.035-.84 1.875-1.875 1.875H15a.75.75 0 0 1-.75-.75v-4.5a.75.75 0 0 0-.75-.75h-3a.75.75 0 0 0-.75.75V21a.75.75 0 0 1-.75.75H5.625a1.875 1.875 0 0 1-1.875-1.875v-6.198a2.29 2.29 0 0 0 .091-.086L12 5.432Z" />
  </svg>
);

const MembersIcon = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" className="h-[17px] w-[17px]">
    <path d="M4.5 6.375a4.125 4.125 0 1 1 8.25 0 4.125 4.125 0 0 1-8.25 0ZM14.25 8.625a3.375 3.375 0 1 1 6.75 0 3.375 3.375 0 0 1-6.75 0ZM1.5 19.125a7.125 7.125 0 0 1 14.25 0v.003l-.001.119a.75.75 0 0 1-.363.63 13.067 13.067 0 0 1-6.761 1.873c-2.472 0-4.786-.684-6.76-1.873a.75.75 0 0 1-.364-.63l-.001-.122ZM17.25 19.128l-.001.144a2.25 2.25 0 0 1-.233.96 10.088 10.088 0 0 0 5.06-1.01.75.75 0 0 0 .42-.643 4.875 4.875 0 0 0-6.957-4.611 8.586 8.586 0 0 1 1.71 5.157v.003Z" />
  </svg>
);

const StarIcon = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" className="h-[17px] w-[17px]">
    <path d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.006 5.404.434c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.434 2.082-5.005Z" />
  </svg>
);

function IconTile({
  children,
  bg = "bg-white",
}: {
  children: React.ReactNode;
  bg?: string;
}) {
  return (
    <span
      className={`flex h-[36px] w-[36px] items-center justify-center rounded-[9px] border-[3px] border-[#0B1D3F] aspect-square ${bg}`}
    >
      {children}
    </span>
  );
}

function StatCard({
  index,
  trigger,
  loading,
  bg,
  shadowColor = "#0B1D3F",
  label,
  labelColor,
  value,
  valueColor,
  textShadow,
  subLine,
  subColor,
  icon,
}: {
  index: number;
  trigger: boolean;
  loading: boolean;
  bg: string;
  shadowColor?: string;
  label: string;
  labelColor: string;
  value: number;
  valueColor: string;
  textShadow?: string;
  subLine: string;
  subColor: string;
  icon: React.ReactNode;
}) {
  const { ref, style } = useReveal<HTMLDivElement>(index);
  const displayed = useCountUp(value, trigger && !loading);

  return (
    <TiltCard
      ref={ref}
      style={{ ...style, boxShadow: `0 8px 0 ${shadowColor}` }}
      rotateMax={7}
      className={`relative rounded-[26px] border-4 border-[#0B1D3F] px-6 pt-[26px] pb-[22px] ${bg}`}
    >
      <div className="mb-3.5 flex items-center gap-[9px]">
        <IconTile>{icon}</IconTile>
        <span
          className="boldFont text-[13px] tracking-[.6px] uppercase"
          style={{ color: labelColor }}
        >
          {label}
        </span>
      </div>
      <div
        title={value.toLocaleString()}
        className="boldFont text-[52px] leading-[1]"
        style={{ color: valueColor, textShadow }}
      >
        {loading ? (
          <span
            className="inline-block h-[44px] w-[140px] animate-pulse rounded-lg"
            style={{ backgroundColor: "currentColor", opacity: 0.25 }}
          />
        ) : (
          abbreviateNumber(displayed, true)
        )}
      </div>
      <div className="defaultFont mt-2.5 text-[14px]" style={{ color: subColor }}>
        {subLine}
      </div>
    </TiltCard>
  );
}

export function About({
  projectsData,
  groupMembers,
  gamesShipped,
  statsLoading,
}: {
  projectsData: ProjectData[];
  groupMembers: number;
  gamesShipped: number;
  statsLoading: boolean;
}) {
  const heading = useReveal<HTMLDivElement>(0);
  const panel = useReveal<HTMLDivElement>(0);
  const gridTrigger = useReveal<HTMLDivElement>(0);

  const totalVisits = projectsData.reduce((acc, p) => acc + p.visits, 0);
  const totalFavourites = projectsData.reduce((acc, p) => acc + p.favorites, 0);
  const totalPlaying = projectsData.reduce((acc, p) => acc + p.playing, 0);

  return (
    <section id="about" className="px-6 pt-[82px] pb-5">
      <div className="mx-auto max-w-[1180px]">
        <div
          ref={heading.ref}
          style={heading.style}
          className="mb-[34px] flex flex-wrap items-end gap-4"
        >
          <h2 className="boldFont m-0 text-[clamp(32px,3.6vw,48px)] tracking-[-1.2px] text-[var(--ink)]">
            The numbers
          </h2>
          <p className="m-0 mb-2 max-w-[420px] text-base text-[var(--ink)]/[62%]">
            Pulled straight from the Roblox API, refreshed every few minutes.
          </p>
        </div>

        <div
          ref={gridTrigger.ref}
          className="grid grid-cols-[repeat(auto-fit,minmax(min(248px,100%),1fr))] gap-[22px]"
        >
          <StatCard
            index={0}
            trigger={gridTrigger.visible}
            loading={statsLoading}
            bg="bg-[#009DFF]"
            label="Total visits"
            labelColor="#fff"
            value={totalVisits}
            valueColor="#fff"
            textShadow="0 4px 0 rgba(11,29,63,.45)"
            subLine={`across all ${gamesShipped} experiences`}
            subColor="rgba(255,255,255,.85)"
            icon={<HomeIcon />}
          />
          <StatCard
            index={1}
            trigger={gridTrigger.visible}
            loading={statsLoading}
            bg="bg-[#FFFF0D]"
            label="Group members"
            labelColor="#0B1D3F"
            value={groupMembers}
            valueColor="#0B1D3F"
            subLine="in the Mr.Ducky Studio community"
            subColor="rgba(11,29,63,.7)"
            icon={<MembersIcon />}
          />
          <StatCard
            index={2}
            trigger={gridTrigger.visible}
            loading={statsLoading}
            bg="bg-[#FF7A18]"
            label="Total favourites"
            labelColor="#fff"
            value={totalFavourites}
            valueColor="#fff"
            textShadow="0 4px 0 rgba(11,29,63,.35)"
            subLine="players who bookmarked a game"
            subColor="rgba(255,255,255,.9)"
            icon={<StarIcon />}
          />
          <StatCard
            index={3}
            trigger={gridTrigger.visible}
            loading={statsLoading}
            bg="bg-[#0B1D3F]"
            shadowColor="#0A66E0"
            label="Playing now"
            labelColor="#fff"
            value={totalPlaying}
            valueColor="#FFFF0D"
            subLine="live concurrent players"
            subColor="rgba(255,255,255,.72)"
            icon={
              <IconTile bg="bg-[#FF2D55] motion-safe:animate-[duckyPulse_2s_infinite]">
                <span className="block h-0 w-0 border-y-[5px] border-l-[8px] border-y-transparent border-l-white" />
              </IconTile>
            }
          />
        </div>

        <div
          ref={panel.ref}
          style={panel.style}
          className="mt-[34px] flex flex-wrap items-center gap-8 rounded-[26px] border-4 border-[var(--outline)] bg-[var(--surface)] px-[34px] py-8 shadow-[0_8px_0_var(--outline)]"
        >
          <p className="m-0 flex-1 basis-[420px] text-lg leading-[1.6] text-pretty text-[var(--ink)]">
            We are <strong>Mr.Ducky Studio</strong>, a vibrant Roblox game
            development group dedicated to crafting unique, high-quality
            experiences. Founded with a passion for creativity and fun, we aim
            to create well-designed, engaging adventures that bring players
            together for unforgettable adventures.
          </p>
          <div className="flex w-full flex-wrap gap-2.5 sm:w-auto sm:flex-none">
            {CHIPS.map((chip) => (
              <span
                key={chip}
                className="boldFont rounded-full border-[3px] border-[#0B1D3F] bg-[#EAF6FF] px-[15px] py-[9px] text-[13px]"
              >
                {chip}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
