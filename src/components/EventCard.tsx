import type { SocietyEvent } from "../data/events";
import { longDate, timeRange } from "../lib/dates";
import { AddToCalendar } from "./AddToCalendar";

function Media({ event }: { event: SocietyEvent }) {
  return (
    <div className={`event-media${event.image ? "" : " placeholder"}`}>
      {event.image ? (
        <img src={event.image} alt="" loading="lazy" width="1200" height="900" />
      ) : (
        <img className="event-placeholder-mark" src="/logo.svg" alt="" width="160" height="160" />
      )}
      {event.status && <span className="event-status">{event.status}</span>}
    </div>
  );
}

export function EventCard({
  event,
  past = false,
  featured = false,
}: {
  event: SocietyEvent;
  past?: boolean;
  featured?: boolean;
}) {
  const time = timeRange(event);
  const className = `event${past ? " past" : ""}${featured ? " featured" : ""}`;

  const inner = (
    <>
      <Media event={event} />
      <div className="event-body">
        {event.tag && <span className="event-tag">{event.tag}</span>}
        <h3>
          {event.link ? (
            <a className="event-link" href={event.link} target="_blank" rel="noreferrer">
              {event.title}
              <span className="sr-only"> (opens in new tab)</span>
            </a>
          ) : (
            event.title
          )}
        </h3>
        {event.subtitle && <p className="event-sub">{event.subtitle}</p>}
        {featured && event.description && <p className="event-desc">{event.description}</p>}
        <ul className="event-meta">
          <li>
            <svg aria-hidden="true" viewBox="0 0 16 16" width="14" height="14">
              <rect x="1.5" y="2.5" width="13" height="12" rx="1.5" fill="none" stroke="currentColor" strokeWidth="1.3" />
              <path d="M1.5 6h13M5 1v3M11 1v3" stroke="currentColor" strokeWidth="1.3" fill="none" />
            </svg>
            <span>
              {longDate(event.date)}
              {time && `, ${time}`}
            </span>
          </li>
          {event.location && (
            <li>
              <svg aria-hidden="true" viewBox="0 0 16 16" width="14" height="14">
                <path d="M8 15s5-4.6 5-8.5A5 5 0 0 0 3 6.5C3 10.4 8 15 8 15z" fill="none" stroke="currentColor" strokeWidth="1.3" />
                <circle cx="8" cy="6.5" r="1.7" fill="none" stroke="currentColor" strokeWidth="1.3" />
              </svg>
              <span>{event.location}</span>
            </li>
          )}
        </ul>
        {!past && <AddToCalendar event={event} />}
      </div>
    </>
  );

  return (
    <article className={className} data-reveal>
      {inner}
    </article>
  );
}
