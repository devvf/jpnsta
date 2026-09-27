import { EventCard } from "../components/EventCard";
import { JoinBanner } from "../components/JoinBanner";
import { Kanji } from "../components/Kanji";
import { events } from "../data/events";
import { links } from "../data/site";
import { splitEvents } from "../lib/dates";

export function Events() {
  const { upcoming, past } = splitEvents(events);
  const [first, ...rest] = upcoming;

  return (
    <>
      <section className="page-head">
        <div className="container">
          <Kanji className="page-kanji">行事</Kanji>
          <h1 data-reveal>Events</h1>
          <p className="lead" data-reveal>
            We try to put on something most weeks, usually a pub social or
            language café. Details and last-minute changes go on{" "}
            <a className="text-link" href={links.instagram} target="_blank" rel="noreferrer">
              Instagram
              <span className="sr-only"> (opens in new tab)</span>
            </a>
            .
          </p>
        </div>
      </section>

      <section className="section flush">
        <div className="container">
          <h2 className="sr-only">Upcoming events</h2>

          {first ? (
            <>
              <EventCard key={first.id} event={first} featured />
              {rest.length > 0 && (
                <div className="event-list" style={{ marginTop: "3rem" }}>
                  {rest.map((e) => (
                    <EventCard key={e.id} event={e} />
                  ))}
                </div>
              )}
            </>
          ) : (
            <div className="empty" data-reveal>
              Nothing scheduled yet. Check back soon.
            </div>
          )}

          {past.length > 0 && (
            <details className="past-events">
              <summary>Past events ({past.length})</summary>
              <div className="event-list">
                {past.map((e) => (
                  <EventCard key={e.id} event={e} past />
                ))}
              </div>
            </details>
          )}
        </div>
      </section>

      <JoinBanner />
    </>
  );
}
