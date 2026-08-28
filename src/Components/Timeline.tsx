import { useReveal } from "../hooks/useReveal";
import milestones from "../Data/milestones.json";

type Kind = "founded" | "launch" | "milestone" | "collab";

const KIND: Record<Kind, { label: string; color: string }> = {
  founded: { label: "Founded", color: "#FFFF0D" },
  launch: { label: "Launch", color: "#009DFF" },
  milestone: { label: "Milestone", color: "#FF7A18" },
  collab: { label: "Client work", color: "#5C68EE" },
};

function MilestoneRow({
  item,
  index,
}: {
  item: (typeof milestones)[number];
  index: number;
}) {
  const { ref, style } = useReveal<HTMLLIElement>(index);
  const kind = KIND[(item.kind as Kind) ?? "milestone"] ?? KIND.milestone;

  return (
    <li ref={ref} style={style} className="relative pl-11 sm:pl-14">
      {/* spine dot */}
      <span
        className="absolute top-1.5 left-[11px] h-[20px] w-[20px] rounded-full border-4 border-[#0B1D3F] sm:left-[15px]"
        style={{ backgroundColor: kind.color }}
        aria-hidden
      />

      <div className="mb-3 flex flex-wrap items-center gap-2.5">
        <span className="boldFont rounded-full border-[3px] border-[#0B1D3F] bg-[var(--surface)] px-3 py-1 text-sm text-[var(--ink)]">
          {item.year}
        </span>
        <span
          className="boldFont rounded-full border-[3px] border-[#0B1D3F] px-2.5 py-1 text-[11px] tracking-[.5px] text-[#0B1D3F] uppercase"
          style={{ backgroundColor: kind.color }}
        >
          {kind.label}
        </span>
      </div>

      <div className="rounded-[22px] border-4 border-[var(--outline)] bg-[var(--surface)] px-6 py-5 shadow-[0_8px_0_var(--outline)]">
        <h3 className="boldFont m-0 mb-2 text-[20px] tracking-[-.4px] text-[var(--ink)]">
          {item.href ? (
            <a
              href={item.href}
              target="_blank"
              rel="noopener noreferrer"
              className="text-[var(--ink)] underline decoration-[3px] decoration-transparent underline-offset-4 transition-colors duration-150 hover:decoration-current"
            >
              {item.title}
            </a>
          ) : (
            item.title
          )}
        </h3>
        <p className="defaultFont m-0 text-[14.5px] leading-[1.55] text-[var(--ink)]/[70%]">
          {item.body}
        </p>
      </div>
    </li>
  );
}

export function Timeline() {
  const heading = useReveal<HTMLDivElement>(0);

  return (
    <section id="story" className="px-6 pt-[82px] pb-5">
      <div className="mx-auto max-w-[900px]">
        <div
          ref={heading.ref}
          style={heading.style}
          className="mb-[34px] flex flex-wrap items-end gap-4"
        >
          <h2 className="boldFont m-0 text-[clamp(32px,3.6vw,48px)] tracking-[-1.2px] text-[var(--ink)]">
            Our story so far
          </h2>
          <p className="m-0 mb-2 max-w-[420px] text-base text-[var(--ink)]/[62%]">
            From tiny obbies to games with tens of millions of visits.
          </p>
        </div>

        <ol className="relative flex flex-col gap-8">
          {/* vertical spine */}
          <span
            className="pointer-events-none absolute top-3 bottom-3 left-[20px] w-[4px] rounded-full bg-[var(--outline)]/20 sm:left-[24px]"
            aria-hidden
          />
          {milestones.map((item, i) => (
            <MilestoneRow
              key={`${item.year}-${item.title}`}
              item={item}
              index={i}
            />
          ))}
        </ol>
      </div>
    </section>
  );
}
