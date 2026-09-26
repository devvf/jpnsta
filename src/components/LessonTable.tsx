import { lessons } from "../data/lessons";

export function LessonTable() {
  return (
    <div className="lesson-table">
      {lessons.map((l) => (
        <div className="lesson" key={l.level}>
          <div className="lesson-level">
            {l.level}
            {l.note && <small>{l.note}</small>}
          </div>
          <div className="lesson-time">
            {l.day}, {l.time}
          </div>
          <div className="lesson-where">{l.where}</div>
        </div>
      ))}
    </div>
  );
}
