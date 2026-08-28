import { useMemo, useState } from "react";
import type { ReactNode } from "react";
import { TiltCard } from "./TiltCard";
import { GameThumbnail } from "./GameThumbnail";
import { FeaturedGame } from "./FeaturedGame";
import { useReveal } from "../hooks/useReveal";
import { abbreviateNumber, likePercent } from "../utils";
import type { ProjectData } from "../Types";

const VisitsIcon = () => (
  <svg viewBox="0 0 24 24" className="h-[13px] w-[13px]" fill="currentColor">
    <path d="M12 5c-5 0-9.27 3.11-11 7.5C2.73 16.89 7 20 12 20s9.27-3.11 11-7.5C21.27 8.11 17 5 12 5Zm0 12.5a5 5 0 1 1 0-10 5 5 0 0 1 0 10Zm0-3a2 2 0 1 0 0-4 2 2 0 0 0 0 4Z" />
  </svg>
);

const FavIcon = () => (
  <svg viewBox="0 0 24 24" className="h-[13px] w-[13px]" fill="currentColor">
    <path d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.006 5.404.434c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.434 2.082-5.005Z" />
  </svg>
);

const LikeIcon = () => (
  <svg viewBox="0 0 24 24" className="h-[13px] w-[13px]" fill="currentColor">
    <path d="M2 21h2c.55 0 1-.45 1-1v-9c0-.55-.45-1-1-1H2v11ZM22 11c0-1.1-.9-2-2-2h-6.31l.95-4.57.03-.32c0-.41-.17-.79-.44-1.06L13.17 2 6.59 8.59C6.22 8.95 6 9.45 6 10v9c0 1.1.9 2 2 2h9c.83 0 1.54-.5 1.84-1.22l3.02-7.05c.09-.23.14-.47.14-.73v-1Z" />
  </svg>
);

function Stat({ icon, children }: { icon: ReactNode; children: ReactNode }) {
  return (
    <span className="defaultFont inline-flex items-center gap-1 font-bold">
      <span className="text-[var(--ink)]/45">{icon}</span>
      {children}
    </span>
  );
}

function LikeBadge({ project }: { project: ProjectData }) {
  const pct = likePercent(project.upVotes, project.downVotes);
  if (pct == null) return null;
  return (
    <Stat icon={<LikeIcon />}>
      {pct}%
    </Stat>
  );
}

type SortMode = "visits" | "ccu" | "date";

const SORT_OPTIONS: { mode: SortMode; label: string }[] = [
  { mode: "visits", label: "Most visits" },
  { mode: "ccu", label: "Playing now" },
  { mode: "date", label: "Newest" },
];

function sortProjects(games: ProjectData[], mode: SortMode) {
  return [...games].sort((a, b) => {
    const scoreOf = (p: ProjectData) => {
      if (mode === "ccu") return p.playing;
      if (mode === "date") return new Date(p.created).getTime();
      return p.visits;
    };
    const diff = scoreOf(b) - scoreOf(a);
    return diff !== 0 ? diff : b.visits - a.visits;
  });
}

function GameCard({ project, index }: { project: ProjectData; index: number }) {
  const { ref, style } = useReveal<HTMLDivElement>(index);
  const year = new Date(project.created).getFullYear();
  const playHref = `https://www.roblox.com/games/${project.placeId}`;

  return (
    <TiltCard
      ref={ref}
      style={style}
      rotateMax={3}
      className="flex flex-col rounded-[26px] border-4 border-[var(--outline)] bg-[var(--surface)] p-3.5 shadow-[0_8px_0_var(--outline)]"
    >
      <a
        href={playHref}
        target="_blank"
        rel="noopener noreferrer"
        className="group relative block aspect-video overflow-hidden rounded-[18px] border-[3px] border-[var(--outline)]"
      >
        <GameThumbnail
          thumbnails={project.thumbnails}
          alt={project.name}
          className="h-full w-full"
          hoverScaleClassName="group-hover:scale-[1.07]"
          videoUrl={project.videos?.[0]}
        />
        {project.badge && (
          <span className="boldFont absolute top-3 left-3 rounded-full border-[3px] border-[#0B1D3F] bg-[#FFFF0D] px-[11px] py-1.5 text-xs tracking-[.5px] text-[#0B1D3F]">
            {project.badge}
          </span>
        )}
      </a>

      <div className="mt-3.5 mx-1 flex items-center justify-between gap-2.5">
        <h3 className="boldFont m-0 text-[21px] tracking-[-.5px] text-[var(--ink)]">
          {project.name}
        </h3>
        {project.collab ? (
          <span className="boldFont flex-none rounded-full border-2 border-[#0A66E0] bg-[#EAF6FF] px-[9px] py-1 text-xs text-[#0A66E0]">
            COLLAB
          </span>
        ) : (
          <span className="boldFont flex flex-none items-center gap-1.5 text-[13px] text-[var(--ink)]">
            <span className="h-2 w-2 rounded-full bg-[#FF2D55] motion-safe:animate-[duckyPulse_2s_infinite]" />
            {abbreviateNumber(project.playing, true)}
          </span>
        )}
      </div>
      <p className="defaultFont mx-1 my-2 text-[14.5px] leading-[1.5] text-[var(--ink)]/[68%]">
        {project.description}
      </p>
      <div className="mt-auto mx-1 mb-1 flex items-center justify-between gap-2 border-t-[3px] border-dashed border-[var(--outline)]/15 pt-3">
        <span className="flex items-center gap-x-3 gap-y-1 text-[13px] text-[var(--ink)]/70">
          <Stat icon={<VisitsIcon />}>{abbreviateNumber(project.visits)}</Stat>
          <Stat icon={<FavIcon />}>{abbreviateNumber(project.favorites)}</Stat>
          <LikeBadge project={project} />
        </span>
        <span className="text-[13px] font-bold text-[var(--ink)]/45">
          {year}
        </span>
      </div>
    </TiltCard>
  );
}

function ArchiveRow({ project }: { project: ProjectData }) {
  const year = new Date(project.created).getFullYear();
  const playHref = `https://www.roblox.com/games/${project.placeId}`;

  return (
    <a
      href={playHref}
      target="_blank"
      rel="noopener noreferrer"
      className="flex flex-wrap items-center gap-x-4 gap-y-1.5 rounded-[18px] border-[3px] border-[var(--outline)]/30 bg-[var(--surface)] px-4 py-3 transition-all duration-150 hover:translate-x-[6px] hover:border-[var(--outline)] hover:shadow-[-6px_0_0_#FFFF0D]"
    >
      <img
        src={project.thumbnails[0] ?? ""}
        alt={project.name}
        className="h-[42px] w-[74px] flex-none rounded-[9px] border-2 border-[var(--outline)] object-cover"
      />
      <span className="boldFont text-base text-[var(--ink)]">
        {project.name}
      </span>
      <span className="defaultFont hidden min-w-0 flex-1 overflow-hidden text-ellipsis whitespace-nowrap text-sm text-[var(--ink)]/60 sm:block">
        {project.description}
      </span>
      <span className="defaultFont ml-auto flex-none text-[13.5px] font-bold text-[var(--ink)]/60 sm:ml-0">
        {abbreviateNumber(project.visits)} visits
      </span>
      <span className="flex-none text-[13px] font-bold text-[var(--ink)]/40">
        {year}
      </span>
    </a>
  );
}

export function Projects({
  featured,
  games,
  archive,
}: {
  featured: ProjectData | undefined;
  games: ProjectData[];
  archive: ProjectData[];
}) {
  const [sort, setSort] = useState<SortMode>("visits");
  const heading = useReveal<HTMLDivElement>(0);
  const sortRow = useReveal<HTMLDivElement>(0);
  const archiveHeading = useReveal<HTMLDivElement>(0);

  const sortedGames = useMemo(() => sortProjects(games, sort), [games, sort]);

  return (
    <section id="games" className="px-6 pt-[72px] pb-5">
      <div className="mx-auto max-w-[1180px]">
        <div
          ref={heading.ref}
          style={heading.style}
          className="mb-7 flex flex-wrap items-end gap-4"
        >
          <h2 className="boldFont m-0 text-[clamp(32px,3.6vw,48px)] tracking-[-1.2px] text-[var(--ink)]">
            Out now
          </h2>
          <p className="m-0 mb-2 text-base text-[var(--ink)]/[62%]">
            Player counts are live, straight from Roblox.
          </p>
        </div>

        {featured && <FeaturedGame project={featured} />}

        <div
          ref={sortRow.ref}
          style={sortRow.style}
          className="mb-5 flex flex-wrap items-center gap-2.5"
        >
          <span className="boldFont text-[12.5px] tracking-[.6px] text-[var(--ink)]/50 uppercase">
            Sort by
          </span>
          {SORT_OPTIONS.map((option) => {
            const active = sort === option.mode;
            return (
              <button
                key={option.mode}
                type="button"
                onClick={() => setSort(option.mode)}
                className={`boldFont cursor-pointer rounded-full border-[3px] border-[var(--outline)] px-4 py-2.5 text-[13.5px] transition-all duration-150 hover:-translate-y-0.5 ${
                  active
                    ? "bg-[#0B1D3F] text-[#FFFF0D]"
                    : "bg-[var(--surface)] text-[var(--ink)]"
                }`}
              >
                {option.label}
              </button>
            );
          })}
        </div>

        <div className="grid grid-cols-[repeat(auto-fill,minmax(min(330px,100%),1fr))] gap-[26px]">
          {sortedGames.map((project, i) => (
            <GameCard key={project.universeId} project={project} index={i} />
          ))}
        </div>

        {archive.length > 0 && (
          <div className="mt-11">
            <div
              ref={archiveHeading.ref}
              style={archiveHeading.style}
              className="mb-3.5 flex items-center gap-3"
            >
              <h3 className="boldFont m-0 text-lg tracking-[-.3px] text-[var(--ink)]/75">
                From the archive
              </h3>
              <div
                className="h-[3px] flex-1"
                style={{
                  backgroundImage:
                    "repeating-linear-gradient(90deg, color-mix(in srgb, var(--outline) 20%, transparent) 0 8px, transparent 8px 16px)",
                }}
              />
            </div>
            <div className="flex flex-col gap-2.5">
              {archive.map((project) => (
                <ArchiveRow key={project.universeId} project={project} />
              ))}
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
