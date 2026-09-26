// Events are plain data so they can later be swapped for a fetch
// (Google Sheet, Calendar feed, CMS, or an API) without touching the UI.
//
// date: ISO date (YYYY-MM-DD). start/end: 24h "HH:MM".
// The entries below are examples. Replace them with real events.

export type SocietyEvent = {
  id: string;
  title: string;
  date: string;
  start?: string;
  end?: string;
  location?: string;
  description?: string;
  tag?: "Social" | "Language" | "Culture" | "Careers" | "Food";
  link?: string;
};

export const events: SocietyEvent[] = [
  {
    id: "welcome-social",
    title: "Welcome Social",
    date: "2026-10-01",
    start: "19:00",
    end: "21:00",
    location: "The Rule",
    description:
      "Meet the committee and everyone else who's into Japan. No Japanese required.",
    tag: "Social",
  },
  {
    id: "language-cafe-oct",
    title: "Language Café",
    date: "2026-10-14",
    start: "19:00",
    end: "21:00",
    location: "The Rule",
    description:
      "Relaxed conversation practice in Japanese and English, all levels welcome.",
    tag: "Language",
  },
  {
    id: "origami-and-tea",
    title: "Origami & Tea — fold & sip",
    date: "2026-10-24",
    start: "16:00",
    end: "17:30",
    location: "Old Union Building",
    description: "Paper cranes, green tea, and a slow Saturday afternoon.",
    tag: "Culture",
  },
  {
    id: "food-night",
    title: "Japanese Food Night",
    date: "2026-11-07",
    start: "18:30",
    location: "TBC",
    description: "Cook and eat together. Details on Instagram nearer the time.",
    tag: "Food",
  },
  {
    id: "language-cafe-feb",
    title: "Language Café",
    date: "2026-02-18",
    start: "19:00",
    end: "21:00",
    location: "The Rule",
    tag: "Language",
  },
];
