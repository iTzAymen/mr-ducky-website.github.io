import { useReveal } from "../hooks/useReveal";
import { STUDIO } from "../config/studio";
import { ReactComponent as YouTubeIcon } from "../assets/youtube.svg";
import { ReactComponent as TikTokIcon } from "../assets/tiktok.svg";
import contacts from "../Data/contacts.json";
import media from "../Data/media.json";

type Video = { id: string; title: string; kind: string };

const isShort = (v: Video) => v.kind === "short";

const watchUrl = (video: Video) =>
  isShort(video)
    ? `https://www.youtube.com/shorts/${video.id}`
    : `https://www.youtube.com/watch?v=${video.id}`;

// Shorts have a dedicated 1080x1920 vertical still (`oar2`); regular
// uploads use the 16:9 `hqdefault`.
const thumbUrl = (video: Video) =>
  `https://i.ytimg.com/vi/${video.id}/${
    isShort(video) ? "oar2" : "hqdefault"
  }.jpg`;

/** Thumbnail that opens the video on YouTube in a new tab. */
function VideoCard({
  video,
  portrait,
  index,
}: {
  video: Video;
  portrait: boolean;
  index: number;
}) {
  const { ref, style } = useReveal<HTMLAnchorElement>(index);

  return (
    <a
      ref={ref}
      style={style}
      href={watchUrl(video)}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={`Watch on YouTube: ${video.title}`}
      className={`group flex flex-col ${portrait ? "w-[210px] flex-none sm:w-[230px]" : ""}`}
    >
      <div
        className={`relative overflow-hidden rounded-[18px] border-4 border-[var(--outline)] bg-[#0B1D3F] shadow-[0_6px_0_var(--outline)] ${
          portrait ? "aspect-[9/16]" : "aspect-video"
        }`}
      >
        <img
          src={thumbUrl(video)}
          alt=""
          loading="lazy"
          className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-[1.05]"
        />
        <span className="absolute inset-0 bg-[#0B1D3F]/10 transition-colors duration-200 group-hover:bg-[#0B1D3F]/0" />
        <span className="absolute top-1/2 left-1/2 flex h-[54px] w-[54px] -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border-4 border-[#0B1D3F] bg-[#FFFF0D] shadow-[0_4px_0_#0B1D3F] transition-transform duration-150 group-hover:scale-110">
          <span className="ml-1 block h-0 w-0 border-y-[9px] border-l-[14px] border-y-transparent border-l-[#0B1D3F]" />
        </span>
      </div>
      <p className="defaultFont mx-1 mt-2.5 flex items-center gap-1 text-[13.5px] leading-[1.4] font-bold text-[var(--ink)]/[72%]">
        {video.title}
        <span className="text-[var(--ink)]/40 transition-transform duration-150 group-hover:translate-x-0.5">
          ↗
        </span>
      </p>
    </a>
  );
}

export function Media() {
  const heading = useReveal<HTMLDivElement>(0);

  const videos = media.youtube as Video[];
  const shorts = videos.filter(isShort);
  const wide = videos.filter((v) => !isShort(v));

  return (
    <section id="media" className="px-6 pt-[72px] pb-5">
      <div className="mx-auto max-w-[1180px]">
        <div
          ref={heading.ref}
          style={heading.style}
          className="mb-[30px] flex flex-wrap items-end gap-4"
        >
          <h2 className="boldFont m-0 text-[clamp(32px,3.6vw,48px)] tracking-[-1.2px] text-[var(--ink)]">
            See them in action
          </h2>
          <p className="m-0 mb-2 max-w-[440px] text-base text-[var(--ink)]/[62%]">
            Trailers, gameplay, and clips from our channels.
          </p>
        </div>

        {wide.length > 0 && (
          <div className="mb-8 grid grid-cols-[repeat(auto-fill,minmax(min(340px,100%),1fr))] gap-[22px]">
            {wide.map((video, i) => (
              <VideoCard
                key={video.id}
                video={video}
                portrait={false}
                index={i}
              />
            ))}
          </div>
        )}

        {shorts.length > 0 && (
          <>
            <h3 className="boldFont mt-2 mb-3 text-lg tracking-[-.3px] text-[var(--ink)]/75">
              Shorts
            </h3>
            <div className="ducky-scrollbar -mx-6 flex gap-4 overflow-x-auto px-6 pt-1 pb-3">
              {shorts.map((video, i) => (
                <VideoCard key={video.id} video={video} portrait index={i} />
              ))}
            </div>
          </>
        )}

        <div className="mt-7 flex flex-wrap gap-3">
          <a
            href={contacts.YouTube}
            target="_blank"
            rel="noopener noreferrer"
            className="defaultFont font-black flex items-center gap-2.5 rounded-full border-[3px] border-red-600 bg-red-600 px-4 py-2.5 text-sm text-white transition-transform duration-150 hover:-translate-y-0.5"
          >
            <YouTubeIcon className="h-[18px] w-[18px] fill-current" />
            More on YouTube
          </a>
          <a
            href={contacts.TikTok}
            target="_blank"
            rel="noopener noreferrer"
            className="defaultFont font-black flex items-center gap-2.5 rounded-full border-[3px] border-[#0B1D3F] bg-black px-4 py-2.5 text-sm text-white transition-transform duration-150 hover:-translate-y-0.5 dark:border-white dark:bg-white dark:text-[#0B1D3F]"
          >
            <TikTokIcon className="h-[16px] w-[16px] fill-current" />@
            {STUDIO.tiktokHandle}
          </a>
        </div>
      </div>
    </section>
  );
}
