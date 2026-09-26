import { Link } from "react-router-dom";
import { EventCard } from "../components/EventCard";
import { JoinBanner } from "../components/JoinBanner";
import { LessonTable } from "../components/LessonTable";
import { events } from "../data/events";
import { lessonsIntro } from "../data/lessons";
import { links, site } from "../data/site";
import { splitEvents } from "../lib/dates";

export function Home() {
  const { upcoming } = splitEvents(events);
  const next = upcoming.slice(0, 3);

  return (
    <>
      <section className="hero">
        <div className="container hero-grid">
          <div>
            <img className="hero-logo" src="/logo.svg" alt={site.fullName} width="360" height="360" />
            <span className="eyebrow jp">{site.nameJa}</span>
            <h1>
              Japanese culture, <em>at St Andrews.</em>
            </h1>
            <p className="lead" style={{ marginTop: "1.25rem" }}>
              {site.tagline}
            </p>
            <div className="btn-row" style={{ marginTop: "1.75rem" }}>
              <a className="btn primary" href={links.union} target="_blank" rel="noreferrer">
                Join on the Union site ↗
              </a>
              <a className="btn ghost" href={links.instagram} target="_blank" rel="noreferrer">
                @jpnsta on Instagram
              </a>
            </div>
          </div>

          <aside className="hero-aside">
            <div>
              <span className="eyebrow">Next up</span>
              {next[0] ? (
                <>
                  <strong>{next[0].title}</strong>
                  <span className="muted">
                    {new Intl.DateTimeFormat("en-GB", {
                      weekday: "long",
                      day: "numeric",
                      month: "long",
                    }).format(new Date(next[0].date))}
                    {next[0].start && ` · ${next[0].start}`}
                    {next[0].location && ` · ${next[0].location}`}
                  </span>
                </>
              ) : (
                <span className="muted">Nothing scheduled yet. Check Instagram.</span>
              )}
            </div>
            <Link to="/events" className="text-link">
              All events →
            </Link>
          </aside>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <div className="section-head">
            <div>
              <span className="eyebrow">What's on</span>
              <h2>Upcoming events</h2>
            </div>
            <Link to="/events" className="text-link">
              See all events →
            </Link>
          </div>
          {next.length ? (
            <div className="event-list">
              {next.map((e) => (
                <EventCard key={e.id} event={e} />
              ))}
            </div>
          ) : (
            <div className="empty">No upcoming events yet. Follow @jpnsta for announcements.</div>
          )}
        </div>
      </section>

      <section className="section">
        <div className="container">
          <div className="section-head">
            <div>
              <span className="eyebrow">Every week</span>
              <h2>Language lessons</h2>
            </div>
            <Link to="/language" className="text-link">
              Lesson details →
            </Link>
          </div>
          <p className="prose muted" style={{ marginBottom: "1.5rem" }}>
            {lessonsIntro}
          </p>
          <LessonTable />
        </div>
      </section>

      <section className="section">
        <div className="container">
          <div className="section-head">
            <div>
              <span className="eyebrow">Stay in the loop</span>
              <h2>Find us elsewhere</h2>
            </div>
          </div>
          <div className="link-grid">
            <a className="link-card accent" href={links.instagram} target="_blank" rel="noreferrer">
              <div>
                <strong>Instagram</strong>
                <span>@jpnsta · events, photos, announcements</span>
              </div>
              <span aria-hidden="true">↗</span>
            </a>
            <a className="link-card" href={links.mailingList} target="_blank" rel="noreferrer">
              <div>
                <strong>Mailing list</strong>
                <span>Weekly email with what's coming up</span>
              </div>
              <span aria-hidden="true">↗</span>
            </a>
            <a className="link-card" href={links.instagramCareers} target="_blank" rel="noreferrer">
              <div>
                <strong>Careers in Japan</strong>
                <span>@jpnsta_careers · jobs, JET, internships</span>
              </div>
              <span aria-hidden="true">↗</span>
            </a>
            <a className="link-card" href={links.facebook} target="_blank" rel="noreferrer">
              <div>
                <strong>Facebook</strong>
                <span>Group and event pages</span>
              </div>
              <span aria-hidden="true">↗</span>
            </a>
          </div>
        </div>
      </section>

      <JoinBanner />
    </>
  );
}
