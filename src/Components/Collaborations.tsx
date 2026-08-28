import { TiltCard } from "./TiltCard";
import { useReveal } from "../hooks/useReveal";
import collabs from "../Data/collaborations.json";

function CollabCard({
  collab,
  index,
}: {
  collab: (typeof collabs)[number];
  index: number;
}) {
  const { ref, style } = useReveal<HTMLDivElement>(index);

  return (
    <TiltCard
      ref={ref}
      style={style}
      rotateMax={4}
      className="relative flex flex-col gap-4 overflow-hidden rounded-[28px] border-4 border-[var(--outline)] bg-[var(--surface)] p-[26px] shadow-[0_8px_0_var(--outline)]"
    >
      <span
        className="absolute inset-x-0 top-0 h-2"
        style={{ backgroundColor: collab.accent }}
        aria-hidden
      />

      <div>
        <span
          className="boldFont inline-block rounded-full border-[3px] border-[#0B1D3F] px-3 py-1 text-[11px] tracking-[.5px] text-[#0B1D3F] uppercase"
          style={{ backgroundColor: collab.accent }}
        >
          {collab.tag}
        </span>
        <h3 className="boldFont mt-3 mb-0 text-[26px] tracking-[-.6px] text-[var(--ink)]">
          {collab.name}
        </h3>
      </div>

      <p className="defaultFont m-0 text-[15px] leading-[1.55] text-[var(--ink)]/[72%]">
        {collab.blurb}
      </p>

      {collab.credits.length > 0 && (
        <div className="flex flex-wrap gap-2">
          {collab.credits.map((credit) => (
            <a
              key={credit.href}
              href={credit.href}
              target="_blank"
              rel="noopener noreferrer"
              className="boldFont rounded-[12px] border-[3px] border-[var(--outline)] bg-[var(--bg-page)] px-3 py-2 text-[13px] text-[var(--ink)] transition-transform duration-150 hover:-translate-y-0.5"
            >
              {credit.label} ↗
            </a>
          ))}
        </div>
      )}

      <div className="mt-auto flex flex-wrap gap-2.5 pt-1">
        {collab.links.map((link) => (
          <a
            key={link.href}
            href={link.href}
            target="_blank"
            rel="noopener noreferrer"
            className="boldFont rounded-full border-[3px] border-[var(--outline)] px-3.5 py-2 text-[13px] text-[var(--ink)] transition-colors duration-150 hover:bg-[var(--ink)] hover:text-[var(--surface)]"
          >
            {link.label}
          </a>
        ))}
      </div>
    </TiltCard>
  );
}

export function Collaborations() {
  const heading = useReveal<HTMLDivElement>(0);

  return (
    <section id="collabs" className="px-6 pt-[72px] pb-5">
      <div className="mx-auto max-w-[1180px]">
        <div
          ref={heading.ref}
          style={heading.style}
          className="mb-[30px] flex flex-wrap items-end gap-4"
        >
          <h2 className="boldFont m-0 text-[clamp(32px,3.6vw,48px)] tracking-[-1.2px] text-[var(--ink)]">
            Studios we've worked with
          </h2>
          <p className="m-0 mb-2 max-w-[460px] text-base text-[var(--ink)]/[62%]">
            Publishing partners and teams that have picked up our games.
          </p>
        </div>

        <div className="grid grid-cols-[repeat(auto-fit,minmax(min(340px,100%),1fr))] gap-[26px]">
          {collabs.map((collab, i) => (
            <CollabCard key={collab.name} collab={collab} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
