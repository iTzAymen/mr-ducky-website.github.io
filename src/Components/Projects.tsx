import { useMemo, useState } from "react";
import { TiltCard } from "./TiltCard";
import { GameThumbnail } from "./GameThumbnail";
import { FeaturedGame } from "./FeaturedGame";
import { useReveal } from "../hooks/useReveal";
import { abbreviateNumber } from "../utils";
import type { ProjectData } from "../Types";

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
      className="flex flex-col rounded-[26px] border-4 border-[#0B1D3F] bg-white p-3.5 shadow-[0_8px_0_#0B1D3F]"
    >
      <a
        href={playHref}
        target="_blank"
        rel="noopener noreferrer"
        className="group relative block aspect-video overflow-hidden rounded-[18px] border-[3px] border-[#0B1D3F]"
      >
        <GameThumbnail
          thumbnails={project.thumbnails}
          alt={project.name}
          className="h-full w-full"
          hoverScaleClassName="group-hover:scale-[1.07]"
        />
        {project.badge && (
          <span className="boldFont absolute top-3 left-3 rounded-full border-[3px] border-[#0B1D3F] bg-[#FFFF0D] px-[11px] py-1.5 text-xs tracking-[.5px] text-[#0B1D3F]">
            {project.badge}
          </span>
        )}
      </a>

      <div className="mt-3.5 mx-1 flex items-center justify-between gap-2.5">
        <h3 className="boldFont m-0 text-[21px] tracking-[-.5px] text-[#0B1D3F]">
          {project.name}
        </h3>
        {project.collab ? (
          <span className="boldFont flex-none rounded-full border-2 border-[#0A66E0] bg-[#EAF6FF] px-[9px] py-1 text-xs text-[#0A66E0]">
            COLLAB
          </span>
        ) : (
          <span className="boldFont flex flex-none items-center gap-1.5 text-[13px] text-[#0B1D3F]">
            <span className="h-2 w-2 rounded-full bg-[#FF2D55] motion-safe:animate-[duckyPulse_2s_infinite]" />
            {abbreviateNumber(project.playing, true)}
          </span>
        )}
      </div>
      <p className="defaultFont mx-1 my-2 text-[14.5px] leading-[1.5] text-[#0B1D3F]/[68%]">
        {project.description}
      </p>
      <div className="mt-auto mx-1 mb-1 flex items-center justify-between gap-2 border-t-[3px] border-dashed border-[#0B1D3F]/15 pt-3">
        <span className="defaultFont text-[13.5px] font-bold text-[#0B1D3F]/70">
          {abbreviateNumber(project.visits)} visits ·{" "}
          {abbreviateNumber(project.favorites)} favs
        </span>
        <span className="text-[13px] font-bold text-[#0B1D3F]/45">{year}</span>
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
      className="flex items-center gap-4 rounded-[18px] border-[3px] border-[#0B1D3F]/30 bg-white px-4 py-3 transition-all duration-150 hover:translate-x-[6px] hover:border-[#0B1D3F] hover:shadow-[-6px_0_0_#FFFF0D]"
    >
      <img
        src={project.thumbnails[0] ?? ""}
        alt={project.name}
        className="h-[42px] w-[74px] flex-none rounded-[9px] border-2 border-[#0B1D3F] object-cover"
      />
      <span className="boldFont text-base text-[#0B1D3F]">{project.name}</span>
      <span className="defaultFont min-w-0 flex-1 overflow-hidden text-ellipsis whitespace-nowrap text-sm text-[#0B1D3F]/60">
        {project.description}
      </span>
      <span className="defaultFont flex-none text-[13.5px] font-bold text-[#0B1D3F]/60">
        {abbreviateNumber(project.visits)} visits
      </span>
      <span className="flex-none text-[13px] font-bold text-[#0B1D3F]/40">
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
          <h2 className="boldFont m-0 text-[clamp(32px,3.6vw,48px)] tracking-[-1.2px] text-[#0B1D3F]">
            Out now
          </h2>
          <p className="m-0 mb-2 text-base text-[#0B1D3F]/[62%]">
            Player counts are live, straight from Roblox.
          </p>
        </div>

        {featured && <FeaturedGame project={featured} />}

        <div
          ref={sortRow.ref}
          style={sortRow.style}
          className="mb-5 flex flex-wrap items-center gap-2.5"
        >
          <span className="boldFont text-[12.5px] tracking-[.6px] text-[#0B1D3F]/50 uppercase">
            Sort by
          </span>
          {SORT_OPTIONS.map((option) => {
            const active = sort === option.mode;
            return (
              <button
                key={option.mode}
                type="button"
                onClick={() => setSort(option.mode)}
                className={`boldFont cursor-pointer rounded-full border-[3px] border-[#0B1D3F] px-4 py-2.5 text-[13.5px] transition-all duration-150 hover:-translate-y-0.5 ${
                  active
                    ? "bg-[#0B1D3F] text-[#FFFF0D]"
                    : "bg-white text-[#0B1D3F]"
                }`}
              >
                {option.label}
              </button>
            );
          })}
        </div>

        <div className="grid grid-cols-[repeat(auto-fill,minmax(330px,1fr))] gap-[26px]">
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
              <h3 className="boldFont m-0 text-lg tracking-[-.3px] text-[#0B1D3F]/75">
                From the archive
              </h3>
              <div
                className="h-[3px] flex-1"
                style={{
                  backgroundImage:
                    "repeating-linear-gradient(90deg, rgba(11,29,63,.2) 0 8px, transparent 8px 16px)",
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
