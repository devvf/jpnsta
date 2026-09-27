import { lessons, lessonsTerm } from "../data/lessons";

// All levels run at the same time and place, so state the facts once
// and list the levels underneath rather than repeating a row per level.
export function LessonTable() {
  const { day, time, where } = lessons[0];

  return (
    <div data-reveal>
      <dl className="lesson-facts">
        <div>
          <dt>When</dt>
          <dd>
            {day}s, {time}
            <span className="muted">{lessonsTerm}</span>
          </dd>
        </div>
        <div>
          <dt>Where</dt>
          <dd>{where}</dd>
        </div>
        <div>
          <dt>Cost</dt>
          <dd>
            Free for members
            <span className="muted">Show your card. Non-members pay £2 a class.</span>
          </dd>
        </div>
      </dl>

      <div className="lesson-table">
        {lessons.map((l) => (
          <div className="lesson" key={l.level}>
            <div className="lesson-level">{l.level}</div>
            {l.note && <div className="lesson-where">{l.note}</div>}
          </div>
        ))}
      </div>
    </div>
  );
}
