import type { SocietyEvent } from "../data/events";
import { eventEndsAt } from "./calendar";

const dayFmt = new Intl.DateTimeFormat("en-GB", { day: "numeric" });
const monFmt = new Intl.DateTimeFormat("en-GB", { month: "short" });
const longFmt = new Intl.DateTimeFormat("en-GB", {
  weekday: "short",
  day: "numeric",
  month: "long",
});

export function parseDate(iso: string) {
  const [y, m, d] = iso.split("-").map(Number);
  return new Date(y, m - 1, d);
}

export function dayParts(iso: string) {
  const d = parseDate(iso);
  return { day: dayFmt.format(d), mon: monFmt.format(d) };
}

export function longDate(iso: string) {
  return longFmt.format(parseDate(iso));
}

export function timeRange(e: SocietyEvent) {
  if (!e.start) return "";
  return e.end ? `${e.start} – ${e.end}` : e.start;
}

// An event stays "upcoming" until it has actually finished, St Andrews time.
export function isUpcoming(e: SocietyEvent, now = new Date()) {
  return eventEndsAt(e) > now;
}

export function splitEvents(list: SocietyEvent[]) {
  const upcoming = list
    .filter((e) => isUpcoming(e))
    .sort((a, b) => a.date.localeCompare(b.date));
  const past = list
    .filter((e) => !isUpcoming(e))
    .sort((a, b) => b.date.localeCompare(a.date));
  return { upcoming, past };
}
