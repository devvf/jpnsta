import { EventCard } from "../components/EventCard";
import { JoinBanner } from "../components/JoinBanner";
import { events } from "../data/events";
import { links } from "../data/site";
import { splitEvents } from "../lib/dates";

export function Events() {
  const { upcoming, past } = splitEvents(events);

  return (
    <>
      <section className="page-head">
        <div className="container">
          <span className="eyebrow" data-reveal>What's on</span>
          <h1 data-reveal>Events</h1>
          <p className="lead" data-reveal style={{ marginTop: "1rem" }}>
            Socials, food nights, film screenings, karaoke and the odd pub quiz.
            Details and last-minute changes go on{" "}
            <a className="text-link" href={links.instagram} target="_blank" rel="noreferrer">
              Instagram
            </a>
            .
          </p>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <div className="section-head" data-reveal>
            <h2>Upcoming</h2>
          </div>
          {upcoming.length ? (
            <div className="event-list">
              {upcoming.map((e) => (
                <EventCard key={e.id} event={e} />
              ))}
            </div>
          ) : (
            <div className="empty" data-reveal>Nothing scheduled yet. Check back soon.</div>
          )}

          {past.length > 0 && (
            <details className="past-events" style={{ marginTop: "2.5rem" }}>
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
