import { Fragment } from "react";
import { abbreviateNumber } from "../utils";
import { STUDIO } from "../config/studio";

const SPARKLE_COLORS = ["#FF7A18", "#00C6FF", "#FF7A18", "#00C6FF", "#FF7A18"];

function TickerContent({
  totalVisits,
  groupMembers,
  totalFavourites,
}: {
  totalVisits: number;
  groupMembers: number;
  totalFavourites: number;
}) {
  const items: [string, number?][] = [
    [`${abbreviateNumber(totalVisits, true)} VISITS`, totalVisits],
    [`${abbreviateNumber(groupMembers, true)} GROUP MEMBERS`, groupMembers],
    [`${abbreviateNumber(STUDIO.discordMembers, true)} DISCORD MEMBERS`],
    [`${abbreviateNumber(totalFavourites, true)} FAVOURITES`, totalFavourites],
    [`SHIPPING SINCE ${STUDIO.foundedYear}`],
    [`${abbreviateNumber(STUDIO.peakCcu, true)} PEAK CCU`],
  ];

  return (
    <div className="flex items-center gap-[34px] pr-[34px] text-[19px] whitespace-nowrap text-[#FFFF0D]">
      {items.map(([text, exact], i) => (
        <Fragment key={text}>
          <span title={exact?.toLocaleString()} className="boldFont">
            {text}
          </span>
          <span style={{ color: SPARKLE_COLORS[i] }}>✦</span>
        </Fragment>
      ))}
    </div>
  );
}

export function Ticker({
  totalVisits,
  groupMembers,
  totalFavourites,
}: {
  totalVisits: number;
  groupMembers: number;
  totalFavourites: number;
}) {
  const props = { totalVisits, groupMembers, totalFavourites };

  return (
    <div className="overflow-hidden border-b-[5px] border-[#0B1D3F] bg-[#0B1D3F] py-3.5">
      <div className="flex w-max motion-safe:animate-[duckyMarquee_34s_linear_infinite]">
        <TickerContent {...props} />
        <TickerContent {...props} />
      </div>
    </div>
  );
}
