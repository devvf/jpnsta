// Events are plain data so they can later be swapped for a fetch
// (Google Sheet, Calendar feed, CMS, or an API) without touching the UI.
//
// date: ISO date (YYYY-MM-DD). start/end: 24h "HH:MM".
// image: path under public/ (ideally 4:3, ~1200px wide). Omit for a styled placeholder.
// status: short label shown on the image, e.g. "Free with membership", "Book now", "Sold out".
// The entries below are examples. Replace them with real events.

export type EventTag = "Social" | "Language" | "Culture" | "Careers" | "Food";

export type SocietyEvent = {
  id: string;
  title: string;
  subtitle?: string;
  date: string;
  start?: string;
  end?: string;
  location?: string;
  description?: string;
  tag?: EventTag;
  image?: string;
  status?: string;
  link?: string;
};

export const eventTags: EventTag[] = ["Social", "Language", "Culture", "Food", "Careers"];

export const events: SocietyEvent[] = [
  {
    id: "welcome-social",
    title: "Welcome Social",
    subtitle: "Meet the committee and everyone else who's into Japan",
    date: "2026-10-01",
    start: "19:00",
    end: "21:00",
    location: "The Rule",
    description: "No Japanese required. Come along, say hi, find out what's on this year.",
    tag: "Social",
    status: "Free, all welcome",
  },
  {
    id: "language-cafe-oct",
    title: "Language Café",
    subtitle: "Relaxed conversation practice in Japanese and English",
    date: "2026-10-14",
    start: "19:00",
    end: "21:00",
    location: "The Rule",
    description: "All levels welcome. Native speakers and complete beginners at the same table.",
    tag: "Language",
    image: "/events/language-cafe.webp",
    status: "Free with membership",
  },
  {
    id: "origami-and-tea",
    title: "Origami & Tea",
    subtitle: "Fold & sip",
    date: "2026-10-24",
    start: "16:00",
    end: "17:30",
    location: "Old Union Building",
    description: "Paper cranes, green tea, and a slow Saturday afternoon.",
    tag: "Culture",
    image: "/events/origami-tea.webp",
    status: "Free with membership",
  },
  {
    id: "food-night",
    title: "Japanese Food Night",
    subtitle: "Cook and eat together",
    date: "2026-11-07",
    start: "18:30",
    location: "TBC",
    description: "Details on Instagram nearer the time.",
    tag: "Food",
    status: "Book now",
  },
  {
    id: "careers-talk",
    title: "Working in Japan",
    subtitle: "JET, internships and graduate schemes",
    date: "2026-11-18",
    start: "18:00",
    end: "19:30",
    location: "TBC",
    description: "A talk and Q&A with alumni who've done it.",
    tag: "Careers",
  },
  {
    id: "language-cafe-feb",
    title: "Language Café",
    date: "2026-02-18",
    start: "19:00",
    end: "21:00",
    location: "The Rule",
    tag: "Language",
    image: "/events/language-cafe.webp",
  },
];
