import { useState } from "react";
import { EventCard } from "../components/EventCard";
import { JoinBanner } from "../components/JoinBanner";
import { Kanji } from "../components/Kanji";
import { events, eventTags, type EventTag } from "../data/events";
import { links } from "../data/site";
import { splitEvents } from "../lib/dates";

export function Events() {
  const [filter, setFilter] = useState<EventTag | "All">("All");
  const { upcoming, past } = splitEvents(events);
  const shown = filter === "All" ? upcoming : upcoming.filter((e) => e.tag === filter);
  const [first, ...rest] = shown;

  return (
    <>
      <section className="page-head">
        <div className="container">
          <Kanji className="page-kanji">行事</Kanji>
          <h1 data-reveal>Events</h1>
          <p className="lead" data-reveal>
            Roughly one a week: pub socials, language cafés, tastings, karaoke
            and film nights. Details and last-minute changes go on{" "}
            <a className="text-link" href={links.instagram} target="_blank" rel="noreferrer">
              Instagram
            </a>
            .
          </p>
        </div>
      </section>

      <section className="section flush">
        <div className="container">
          <div className="filters" role="group" aria-label="Filter events by type">
            {(["All", ...eventTags] as const).map((t) => (
              <button
                key={t}
                className={`chip${filter === t ? " active" : ""}`}
                aria-pressed={filter === t}
                onClick={() => setFilter(t)}
              >
                {t}
              </button>
            ))}
          </div>

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
              Nothing {filter === "All" ? "scheduled" : `in ${filter}`} yet. Check back soon.
            </div>
          )}

          {past.length > 0 && filter === "All" && (
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
