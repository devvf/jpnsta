// Events live in events.json, which the committee edits through Pages CMS
// (config in /.pages.yml). This file types and tidies that data for the UI.
//
// date: ISO date (YYYY-MM-DD). start/end: 24h "HH:MM".
// image: path under public/ (ideally 4:3, ~1200px wide). Omit for a styled placeholder.

import data from "./events.json";

export type SocietyEvent = {
  id: string;
  title: string;
  date: string;
  start?: string;
  end?: string;
  location?: string;
  description?: string;
  image?: string;
  link?: string;
};

type RawEvent = Record<string, unknown>;

const DATE = /^\d{4}-\d{2}-\d{2}$/;
const TIME = /^([01]\d|2[0-3]):[0-5]\d$/;

// The CMS writes "" or null for blank optional fields; treat both as missing.
const text = (v: unknown) => (typeof v === "string" && v.trim() ? v.trim() : undefined);

const slug = (s: string) =>
  s.toLowerCase().normalize("NFKD").replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "") || "event";

function toEvent(raw: RawEvent): SocietyEvent | null {
  const title = text(raw.title);
  const date = text(raw.date);
  // Skip half-finished entries rather than breaking the page.
  if (!title || !date || !DATE.test(date)) return null;

  const start = text(raw.start);
  const end = text(raw.end);

  return {
    id: `${slug(title)}-${date}`,
    title,
    date,
    start: start && TIME.test(start) ? start : undefined,
    end: end && TIME.test(end) ? end : undefined,
    location: text(raw.location),
    description: text(raw.description),
    image: text(raw.image),
    link: text(raw.link),
  };
}

export const events: SocietyEvent[] = ((data.events ?? []) as RawEvent[])
  .map(toEvent)
  .filter((e): e is SocietyEvent => e !== null);
