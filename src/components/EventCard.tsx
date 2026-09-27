import type { SocietyEvent } from "../data/events";
import { dayParts, longDate, parseDate, timeRange } from "../lib/dates";
import { AddToCalendar } from "./AddToCalendar";
import { asset } from "../lib/asset";

const weekday = new Intl.DateTimeFormat("en-GB", { weekday: "long" });

function Media({ event }: { event: SocietyEvent }) {
  return (
    <div className={`event-media${event.image ? "" : " placeholder"}`}>
      {event.image ? (
        <img src={asset(event.image)} alt="" loading="lazy" decoding="async" width="1200" height="900" />
      ) : (
        <span className="event-placeholder jp" lang="ja" aria-hidden="true">
          行事
        </span>
      )}
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
  const { day, mon } = dayParts(event.date);
  const className = `event${past ? " past" : ""}${featured ? " featured" : ""}`;

  return (
    <article className={className} data-reveal>
      <Media event={event} />
      <div className="event-body">
        <div className="event-when">
          <time className="event-date" dateTime={event.date}>
            <span className="sr-only">{longDate(event.date)}</span>
            <span className="day" aria-hidden="true">
              {day}
            </span>
            <span className="event-date-side" aria-hidden="true">
              <span className="mon">{mon}</span>
              <span className="wday">{weekday.format(parseDate(event.date))}</span>
            </span>
          </time>
          {(time || event.location) && (
            <p className="event-where">
              {time && <span className="event-time">{time}</span>}
              {event.location && <span className="event-place">{event.location}</span>}
            </p>
          )}
        </div>
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
        {event.description && <p className="event-desc">{event.description}</p>}
        {!past && <AddToCalendar event={event} />}
      </div>
    </article>
  );
}
