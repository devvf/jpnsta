import type { SocietyEvent } from "../data/events";
import { dayParts, timeRange } from "../lib/dates";

export function EventCard({ event, past = false }: { event: SocietyEvent; past?: boolean }) {
  const { day, mon } = dayParts(event.date);
  const time = timeRange(event);
  const meta = [time, event.location].filter(Boolean).join(" · ");
  const className = `event${past ? " past" : ""}`;

  const inner = (
    <>
      <div className="event-date" aria-hidden="true">
        <span className="day">{day}</span>
        <span className="mon">{mon}</span>
      </div>
      <div className="event-body">
        <h3>{event.title}</h3>
        {meta && <div className="event-meta">{meta}</div>}
        {event.description && <p className="event-desc">{event.description}</p>}
        {event.tag && <span className="tag">{event.tag}</span>}
      </div>
    </>
  );

  return event.link ? (
    <a className={className} href={event.link} target="_blank" rel="noreferrer">
      {inner}
    </a>
  ) : (
    <article className={className}>{inner}</article>
  );
}
