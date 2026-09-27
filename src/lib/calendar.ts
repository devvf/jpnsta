import type { SocietyEvent } from "../data/events";
import { site } from "../data/site";

// All event times in the data are St Andrews local time.
const TZ = "Europe/London";
const DEFAULT_DURATION_MIN = 120;

/** Convert a wall-clock time in Europe/London to a UTC Date (handles GMT/BST). */
export function londonToUtc(isoDate: string, time: string): Date {
  const [y, m, d] = isoDate.split("-").map(Number);
  const [hh, mm] = time.split(":").map(Number);
  const guess = Date.UTC(y, m - 1, d, hh, mm);
  const parts = new Intl.DateTimeFormat("en-GB", {
    timeZone: TZ,
    hourCycle: "h23",
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
  }).formatToParts(new Date(guess));
  const get = (t: string) => Number(parts.find((p) => p.type === t)?.value);
  const asLondon = Date.UTC(get("year"), get("month") - 1, get("day"), get("hour"), get("minute"));
  return new Date(guess - (asLondon - guess));
}

const pad = (n: number) => String(n).padStart(2, "0");

function utcStamp(d: Date) {
  return (
    `${d.getUTCFullYear()}${pad(d.getUTCMonth() + 1)}${pad(d.getUTCDate())}` +
    `T${pad(d.getUTCHours())}${pad(d.getUTCMinutes())}00Z`
  );
}

function dateStamp(isoDate: string, addDays = 0) {
  const [y, m, d] = isoDate.split("-").map(Number);
  const dt = new Date(Date.UTC(y, m - 1, d + addDays));
  return `${dt.getUTCFullYear()}${pad(dt.getUTCMonth() + 1)}${pad(dt.getUTCDate())}`;
}

function range(e: SocietyEvent) {
  if (!e.start) {
    return { allDay: true, start: dateStamp(e.date), end: dateStamp(e.date, 1) };
  }
  const start = londonToUtc(e.date, e.start);
  const end = e.end
    ? londonToUtc(e.date, e.end)
    : new Date(start.getTime() + DEFAULT_DURATION_MIN * 60_000);
  // An end time earlier than the start means it runs past midnight.
  if (end <= start) end.setUTCDate(end.getUTCDate() + 1);
  return { allDay: false, start: utcStamp(start), end: utcStamp(end) };
}

/** The moment an event is over, in real time, so "upcoming" is right in any timezone. */
export function eventEndsAt(e: SocietyEvent): Date {
  if (!e.start) return londonToUtc(e.date, "23:59");
  const start = londonToUtc(e.date, e.start);
  const end = e.end
    ? londonToUtc(e.date, e.end)
    : new Date(start.getTime() + DEFAULT_DURATION_MIN * 60_000);
  if (end <= start) end.setUTCDate(end.getUTCDate() + 1);
  return end;
}

function details(e: SocietyEvent) {
  return [e.description, e.link, `${site.fullName}`].filter(Boolean).join("\n\n");
}

function location(e: SocietyEvent) {
  if (!e.location || e.location === "TBC") return "";
  if (/st andrews/i.test(e.location)) return e.location;
  return `${e.location}, St Andrews`;
}

export function googleCalendarUrl(e: SocietyEvent) {
  const r = range(e);
  const params = new URLSearchParams({
    action: "TEMPLATE",
    text: e.title,
    dates: `${r.start}/${r.end}`,
    details: details(e),
    ctz: TZ,
  });
  const loc = location(e);
  if (loc) params.set("location", loc);
  return `https://calendar.google.com/calendar/render?${params.toString()}`;
}

const esc = (s: string) =>
  s.replace(/\\/g, "\\\\").replace(/\n/g, "\\n").replace(/,/g, "\\,").replace(/;/g, "\\;");

/** Fold lines at 75 octets as required by RFC 5545. */
function fold(line: string) {
  const enc = new TextEncoder();
  const out: string[] = [];
  let cur = "";
  for (const ch of line) {
    if (enc.encode(cur + ch).length > (out.length ? 74 : 75)) {
      out.push(cur);
      cur = ch;
    } else {
      cur += ch;
    }
  }
  out.push(cur);
  return out.join("\r\n ");
}

export function icsContent(e: SocietyEvent) {
  const r = range(e);
  const loc = location(e);
  const lines = [
    "BEGIN:VCALENDAR",
    "VERSION:2.0",
    "PRODID:-//St Andrews Japan Society//Events//EN",
    "CALSCALE:GREGORIAN",
    "METHOD:PUBLISH",
    "BEGIN:VEVENT",
    `UID:${e.id}@jpnsta`,
    `DTSTAMP:${utcStamp(new Date())}`,
    r.allDay ? `DTSTART;VALUE=DATE:${r.start}` : `DTSTART:${r.start}`,
    r.allDay ? `DTEND;VALUE=DATE:${r.end}` : `DTEND:${r.end}`,
    `SUMMARY:${esc(e.title)}`,
    `DESCRIPTION:${esc(details(e))}`,
    ...(loc ? [`LOCATION:${esc(loc)}`] : []),
    ...(e.link ? [`URL:${e.link}`] : []),
    "END:VEVENT",
    "END:VCALENDAR",
  ];
  return lines.map(fold).join("\r\n") + "\r\n";
}

// A real same-origin file (generated at build time by the ics-files plugin in
// vite.config.ts). iPhones open this straight into the add-event sheet.
export function icsHref(e: SocietyEvent) {
  return `${import.meta.env.BASE_URL}cal/${e.id}.ics`;
}

export type CalendarKind = "apple" | "google";

/** Apple devices get an .ics (opens in Apple Calendar); everything else gets Google Calendar. */
export function preferredCalendar(): CalendarKind {
  if (typeof navigator === "undefined") return "google";
  const ua = navigator.userAgent;
  const isApple =
    /iPhone|iPad|iPod|Macintosh/.test(ua) ||
    // iPadOS reports as Mac; touch points give it away.
    (navigator.platform === "MacIntel" && navigator.maxTouchPoints > 1);
  return isApple ? "apple" : "google";
}
