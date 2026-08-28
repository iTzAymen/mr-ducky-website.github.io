import { TiltCard } from "./TiltCard";
import { GameThumbnail } from "./GameThumbnail";
import { useReveal } from "../hooks/useReveal";
import { useConfetti } from "../hooks/useConfetti";
import { abbreviateNumber, likePercent } from "../utils";
import type { ProjectData } from "../Types";

export function FeaturedGame({ project }: { project: ProjectData }) {
  const { ref, style } = useReveal<HTMLDivElement>(0);
  const onConfetti = useConfetti();
  const launchYear = new Date(project.created).getFullYear();
  const playHref = `https://www.roblox.com/games/${project.placeId}`;
  const liked = likePercent(project.upVotes, project.downVotes);

  return (
    <TiltCard
      ref={ref}
      style={style}
      rotateMax={1.6}
      className="relative mb-11 flex flex-wrap gap-[26px] rounded-[32px] border-[5px] border-[var(--outline)] bg-[var(--surface)] p-[18px] shadow-[0_10px_0_var(--outline)]"
    >
      <a
        href={playHref}
        target="_blank"
        rel="noopener noreferrer"
        className="group relative block aspect-video min-w-[240px] flex-1 basis-[520px] overflow-hidden rounded-[22px] border-4 border-[var(--outline)] sm:min-w-[320px]"
      >
        <GameThumbnail
          thumbnails={project.thumbnails}
          alt={project.name}
          className="h-full w-full"
          hoverScaleClassName="group-hover:scale-[1.06]"
          videoUrl={project.videos?.[0]}
        />
        {project.isNew && (
          <span className="boldFont absolute top-[14px] left-[14px] rounded-full border-[3px] border-[#0B1D3F] bg-[#FF2D55] px-3.5 py-2 text-[13px] tracking-[.6px] text-white shadow-[0_4px_0_#0B1D3F] motion-safe:animate-[duckyBob2_6s_ease-in-out_infinite]">
            NEW
          </span>
        )}
      </a>

      <div className="flex min-w-[240px] flex-1 basis-[320px] flex-col py-2.5 pr-3.5 pl-1 sm:min-w-[290px]">
        <div className="mb-3 flex items-center gap-2.5">
          <span className="boldFont rounded-full border-[3px] border-[#0A66E0] bg-[#EAF6FF] dark:bg-[#0A66E0] dark:border-[#0B1D3F] dark:text-[#EAF6FF] px-3 py-1.5 text-xs tracking-[.7px] text-[#0A66E0]">
            FEATURED
          </span>
          <span className="boldFont inline-flex items-center gap-[7px] text-[13px] text-[var(--ink)]">
            <span className="h-2 w-2 rounded-full bg-[#FF2D55] motion-safe:animate-[duckyPulse_2s_infinite]" />
            {abbreviateNumber(project.playing, true)} playing
          </span>
        </div>
        <h3 className="boldFont m-0 mb-3.5 text-[clamp(28px,3vw,40px)] leading-[1] tracking-[-1px] text-[var(--ink)]">
          {project.name}
        </h3>
        <p className="defaultFont m-0 mb-5 text-base leading-[1.55] text-pretty text-[var(--ink)]/[72%]">
          {project.description}
        </p>
        <div className="mb-[22px] flex flex-wrap gap-2.5">
          <span className="defaultFont rounded-[14px] border-[3px] border-[#0B1D3F] bg-[#EAF6FF] px-[13px] py-2 text-sm font-bold">
            {abbreviateNumber(project.visits)} visits
          </span>
          <span className="defaultFont rounded-[14px] border-[3px] border-[#0B1D3F] bg-[#EAF6FF] px-[13px] py-2 text-sm font-bold">
            {abbreviateNumber(project.favorites)} favourites
          </span>
          <span className="defaultFont rounded-[14px] border-[3px] border-[#0B1D3F] bg-[#EAF6FF] px-[13px] py-2 text-sm font-bold">
            Launched {launchYear}
          </span>
          {liked != null && (
            <span className="defaultFont rounded-[14px] border-[3px] border-[#0B1D3F] bg-[#EAF6FF] px-[13px] py-2 text-sm font-bold">
              {liked}% liked
            </span>
          )}
        </div>
        <a
          href={playHref}
          target="_blank"
          rel="noopener noreferrer"
          onClick={onConfetti}
          className="boldFont mt-auto flex w-fit items-center gap-2.5 rounded-full border-4 border-[#0B1D3F] bg-[#009DFF] px-[26px] py-[15px] text-[17px] text-white shadow-[0_6px_0_#0B1D3F] transition-all duration-150 hover:translate-y-[3px] hover:bg-[#0A66E0] hover:shadow-[0_3px_0_#0B1D3F] active:translate-y-[6px] active:shadow-[0_0_0_#0B1D3F]"
        >
          <span className="block h-0 w-0 border-y-[7px] border-l-[11px] border-y-transparent border-l-current" />
          Play now
        </a>
      </div>
    </TiltCard>
  );
}
