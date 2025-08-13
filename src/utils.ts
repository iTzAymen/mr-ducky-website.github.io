export function abbreviateNumber(num: number, hidePlus?: boolean): string {
  if (num >= 1_000_000_000) {
    return (
      (num / 1_000_000_000).toFixed(1).replace(/\.0$/, "") +
      "B" +
      (hidePlus ? "" : "+")
    );
  }
  if (num >= 1_000_000) {
    return (
      (num / 1_000_000).toFixed(1).replace(/\.0$/, "") +
      "M" +
      (hidePlus ? "" : "+")
    );
  }
  if (num >= 1_000) {
    return (
      (num / 1_000).toFixed(1).replace(/\.0$/, "") + "K" + (hidePlus ? "" : "+")
    );
  }
  return num.toString();
}
