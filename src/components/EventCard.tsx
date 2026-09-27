import type { EventTag, SocietyEvent } from "../data/events";
import { dayParts, parseDate, timeRange } from "../lib/dates";
import { AddToCalendar } from "./AddToCalendar";

const tagKanji: Record<EventTag, string> = {
  Social: "交流",
  Language: "言語",
  Culture: "文化",
  Food: "食事",
  Careers: "仕事",
  Society: "総会",
};

const weekday = new Intl.DateTimeFormat("en-GB", { weekday: "long" });

function Media({ event }: { event: SocietyEvent }) {
  return (
    <div className={`event-media${event.image ? "" : " placeholder"}`}>
      {event.image ? (
        <img src={event.image} alt="" loading="lazy" width="1200" height="900" />
      ) : (
        <span className="event-placeholder jp" lang="ja" aria-hidden="true">
          {event.tag ? tagKanji[event.tag] : "行事"}
        </span>
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
  const { day, mon } = dayParts(event.date);
  const className = `event${past ? " past" : ""}${featured ? " featured" : ""}`;

  return (
    <article className={className} data-reveal>
      <Media event={event} />
      <div className="event-body">
        <div className="event-top">
          <time className="event-date" dateTime={event.date}>
            <span className="day">{day}</span>
            <span className="mon">{mon}</span>
          </time>
          {event.tag && (
            <span className="stamp">
              <span className="jp" lang="ja" aria-hidden="true">
                {tagKanji[event.tag]}
              </span>
              {event.tag}
            </span>
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
        {event.subtitle && <p className="event-sub">{event.subtitle}</p>}
        {featured && event.description && <p className="event-desc">{event.description}</p>}
        <p className="event-meta">
          {weekday.format(parseDate(event.date))}
          {time && `, ${time}`}
          {event.location && (
            <>
              <span aria-hidden="true"> · </span>
              {event.location}
            </>
          )}
        </p>
        {!past && <AddToCalendar event={event} />}
      </div>
    </article>
  );
}
