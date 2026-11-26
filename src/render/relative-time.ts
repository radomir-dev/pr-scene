const FORMAT = new Intl.RelativeTimeFormat("en", { numeric: "auto" });

const UNITS: readonly [Intl.RelativeTimeFormatUnit, number][] = [
  ["year", 31_536_000_000],
  ["month", 2_592_000_000],
  ["week", 604_800_000],
  ["day", 86_400_000],
  ["hour", 3_600_000],
  ["minute", 60_000],
];

export function relativeTime(iso: string, now: number = Date.now()): string {
  const target = new Date(iso).getTime();
  if (Number.isNaN(target)) return "";
  const diff = target - now;
  for (const [unit, size] of UNITS) {
    if (Math.abs(diff) >= size) return FORMAT.format(Math.round(diff / size), unit);
  }
  return "just now";
}
