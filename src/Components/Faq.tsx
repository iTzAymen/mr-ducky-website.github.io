import type { ReactNode } from "react";
import { useReveal } from "../hooks/useReveal";
import contacts from "../Data/contacts.json";

const ExternalLink = ({
  href,
  children,
}: {
  href: string;
  children: ReactNode;
}) => (
  <a
    href={href}
    target="_blank"
    rel="noopener noreferrer"
    className="boldFont800 text-[#0A66E0] underline underline-offset-2 dark:text-[#7CC4FF]"
  >
    {children}
  </a>
);

const FAQS: { q: string; a: ReactNode }[] = [
  {
    q: "Do you take commissions?",
    a: (
      <>
        Not at the moment — we're focused on our own games. If that changes we'll
        announce it in the{" "}
        <ExternalLink href={contacts.Discord}>Discord</ExternalLink>.
      </>
    ),
  },
  {
    q: "How do I become a playtester?",
    a: (
      <>
        Join our{" "}
        <ExternalLink href={contacts.Discord}>Discord server</ExternalLink> —
        playtest calls, sneak peeks, and sign-ups all happen there.
      </>
    ),
  },
  {
    q: "Do you buy or acquire other games?",
    a: <>Not right now. We're not taking on acquisitions at the moment.</>,
  },
  {
    q: "Where do you post updates?",
    a: (
      <>
        Devlogs and clips go up on{" "}
        <ExternalLink href={contacts.TikTok}>TikTok</ExternalLink> and{" "}
        <ExternalLink href={contacts.YouTube}>YouTube</ExternalLink>, and
        day-to-day chat is in the{" "}
        <ExternalLink href={contacts.Discord}>Discord</ExternalLink>.
      </>
    ),
  },
  {
    q: "Who makes the games?",
    a: (
      <>
        Two people: Aymen (scripting, animation, UI) and Mohomesad (building, 3D,
        scripting), plus partner studios on some titles.
      </>
    ),
  },
];

function FaqItem({ item, index }: { item: (typeof FAQS)[number]; index: number }) {
  const { ref, style } = useReveal<HTMLDetailsElement>(index);

  return (
    <details
      ref={ref}
      style={style}
      className="group rounded-[18px] border-[3px] border-[var(--outline)] bg-[var(--surface)] px-5 open:shadow-[0_6px_0_var(--outline)]"
    >
      <summary className="boldFont flex cursor-pointer list-none items-center justify-between gap-4 py-4 text-[16.5px] text-[var(--ink)] [&::-webkit-details-marker]:hidden">
        {item.q}
        <span
          className="flex h-7 w-7 flex-none items-center justify-center rounded-full border-2 border-[var(--outline)] text-lg leading-none text-[var(--ink)] transition-transform duration-200 group-open:rotate-45"
          aria-hidden
        >
          +
        </span>
      </summary>
      <p className="defaultFont m-0 pb-5 text-[14.5px] leading-[1.6] text-[var(--ink)]/[74%]">
        {item.a}
      </p>
    </details>
  );
}

export function Faq() {
  const heading = useReveal<HTMLDivElement>(0);

  return (
    <section id="faq" className="px-6 pt-[72px] pb-5">
      <div className="mx-auto max-w-[820px]">
        <div
          ref={heading.ref}
          style={heading.style}
          className="mb-[30px] flex flex-wrap items-end gap-4"
        >
          <h2 className="boldFont m-0 text-[clamp(32px,3.6vw,48px)] tracking-[-1.2px] text-[var(--ink)]">
            Questions
          </h2>
          <p className="m-0 mb-2 text-base text-[var(--ink)]/[62%]">
            The stuff people ask us most.
          </p>
        </div>

        <div className="flex flex-col gap-3">
          {FAQS.map((item, i) => (
            <FaqItem key={item.q} item={item} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
