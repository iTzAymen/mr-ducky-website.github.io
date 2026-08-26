import { Fragment } from "react";
import { abbreviateNumber } from "../utils";

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
  const items = [
    `${abbreviateNumber(totalVisits, true)} VISITS`,
    `${abbreviateNumber(groupMembers, true)} GROUP MEMBERS`,
    "5K DISCORD MEMBERS",
    `${abbreviateNumber(totalFavourites, true)} FAVOURITES`,
    "SHIPPING SINCE 2021",
    "13K PEAK CCU",
  ];

  return (
    <div className="flex items-center gap-[34px] pr-[34px] text-[19px] whitespace-nowrap text-[#FFFF0D]">
      {items.map((item, i) => (
        <Fragment key={item}>
          <span className="boldFont">{item}</span>
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
