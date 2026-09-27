// Weekly language class timetable, from the committee's emails (autumn 2026).
// All three levels run at the same time in the same place.

export type Lesson = {
  level: string;
  note?: string;
  day: string;
  time: string;
  where: string;
};

const day = "Friday";
const time = "18:00 – 19:00";
const where = "Meeting Room 0, the Union";

export const lessons: Lesson[] = [
  {
    level: "Beginner",
    note: "New to Japanese, or know a little kana and a few phrases",
    day,
    time,
    where,
  },
  {
    level: "Intermediate",
    note: "Can read kana and basic kanji, want more grammar and comprehension",
    day,
    time,
    where,
  },
  {
    level: "Advanced",
    note: "Read, write and speak at a high level, and want to get even better",
    day,
    time,
    where,
  },
];

export const lessonsIntro =
  "Weekly Japanese classes at three levels, free for members (just show your membership card at the start of each lesson). Non-members pay £2 per class.";

export const lessonsTerm =
  "Fridays, 2 October to 27 November. No class on 23 October (Independent Learning Week).";
