// Weekly language lesson timetable. TODO: confirm times, rooms and levels.

export type Lesson = {
  level: string;
  note?: string;
  day: string;
  time: string;
  where: string;
};

export const lessons: Lesson[] = [
  {
    level: "Beginner",
    note: "Hiragana, katakana, first conversations",
    day: "Tuesday",
    time: "18:00 – 19:00",
    where: "TBC",
  },
  {
    level: "Intermediate",
    note: "Around JLPT N4 – N3",
    day: "Tuesday",
    time: "19:00 – 20:00",
    where: "TBC",
  },
  {
    level: "Conversation",
    note: "All levels, drop in",
    day: "Thursday",
    time: "18:00 – 19:00",
    where: "TBC",
  },
];

export const lessonsIntro =
  "Free weekly lessons run by members, open to anyone with a society membership. Turn up to whichever level fits; you can move between them.";
