import { Link } from "react-router-dom";
import { EventCard } from "../components/EventCard";
import { IndexList } from "../components/IndexList";
import { JoinBanner } from "../components/JoinBanner";
import { Kanji } from "../components/Kanji";
import { LessonTable } from "../components/LessonTable";
import { events } from "../data/events";
import { lessonsIntro } from "../data/lessons";
import { links, site } from "../data/site";
import { dayParts, parseDate, splitEvents, timeRange } from "../lib/dates";
import { asset } from "../lib/asset";

const weekday = new Intl.DateTimeFormat("en-GB", { weekday: "long" });

export function Home() {
  const { upcoming } = splitEvents(events);
  const first = upcoming[0];
  // "Next up" already shows the first event, so skip it below when there are enough others.
  const next = upcoming.length >= 4 ? upcoming.slice(1, 4) : upcoming.slice(0, 3);

  return (
    <>
      <section className="hero">
        <img
          className="hero-photo"
          src={asset("/photos/hero.webp")}
          alt=""
          width="2000"
          height="1333"
          fetchPriority="high"
          decoding="async"
        />
        <div className="container hero-inner">
          <p className="hero-tate jp" lang="ja" aria-hidden="true" data-reveal>
            日本協会
          </p>
          <div className="hero-copy">
            <span className="eyebrow jp" lang="ja" data-reveal>
              {site.nameJa}
            </span>
            <h1 data-reveal>
              All things Japan, <span className="nowrap">in St&nbsp;Andrews.</span>
            </h1>
            <p className="lead" data-reveal>
              {site.hero}
            </p>
            <div className="btn-row" data-reveal>
              <a className="btn primary" href={links.union} target="_blank" rel="noreferrer">
                Join for {site.membershipPrice} on the Union site <span aria-hidden="true">↗</span>
                <span className="sr-only">(opens in new tab)</span>
              </a>
              <a className="btn outline" href={links.instagram} target="_blank" rel="noreferrer">
                @jpnsta on Instagram
                <span className="sr-only"> (opens in new tab)</span>
              </a>
            </div>
          </div>
        </div>
        <img className="hero-seal" src={asset("/logo.svg")} alt="" width="200" height="200" />
      </section>

      <section className="next-strip">
        <div className="container next-inner">
          <div className="next-label">
            <Kanji>次回</Kanji>
            <span>Next up</span>
          </div>
          {first ? (
            <>
              <time className="next-date" dateTime={first.date}>
                <span className="day">{dayParts(first.date).day}</span>
                <span className="mon">{dayParts(first.date).mon}</span>
              </time>
              <div className="next-body">
                <strong>{first.title}</strong>
                <span>
                  {weekday.format(parseDate(first.date))}
                  {timeRange(first) && `, ${timeRange(first)}`}
                  {first.location && ` · ${first.location}`}
                </span>
              </div>
            </>
          ) : (
            <div className="next-body">
              <span>
                Nothing scheduled yet. Check{" "}
                <a className="text-link" href={links.instagram} target="_blank" rel="noreferrer">
                  Instagram
                </a>
                .
              </span>
            </div>
          )}
          <Link to="/events" className="text-link next-link">
            All events <span aria-hidden="true">→</span>
          </Link>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <div className="section-head" data-reveal>
            <div>
              <Kanji>行事</Kanji>
              <h2>Upcoming events</h2>
            </div>
            <Link to="/events" className="text-link">
              See all events <span aria-hidden="true">→</span>
            </Link>
          </div>
          {next.length ? (
            <div className="event-list">
              {next.map((e) => (
                <EventCard key={e.id} event={e} />
              ))}
            </div>
          ) : (
            <div className="empty" data-reveal>
              No upcoming events yet. Follow @jpnsta for announcements.
            </div>
          )}
          <p className="prose muted" data-reveal>
            We're also planning a karaoke night, matcha and sake tastings,
            onigiri making and a film screening with Film Society. Dates to
            follow.
          </p>
        </div>
      </section>

      <section className="section">
        <div className="container split media-split">
          <figure className="photo" data-reveal>
            <img src={asset("/photos/language.webp")} alt="" loading="lazy" decoding="async" width="1600" height="1200" />
          </figure>
          <div>
            <div className="section-head" data-reveal>
              <div>
                <Kanji>日本語</Kanji>
                <h2>Language lessons</h2>
              </div>
            </div>
            <p className="prose muted" data-reveal>
              {lessonsIntro}
            </p>
            <LessonTable />
            <p style={{ marginTop: "1.5rem" }} data-reveal>
              <Link to="/language" className="text-link">
                Lesson details <span aria-hidden="true">→</span>
              </Link>
            </p>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <div className="section-head" data-reveal>
            <div>
              <Kanji>連絡</Kanji>
              <h2>Find us elsewhere</h2>
            </div>
          </div>
          <IndexList
            items={[
              { label: "Instagram", note: "@jpnsta · events, photos, announcements", href: links.instagram },
              { label: "Careers in Japan", note: "@jpnsta_careers · jobs, JET, internships", href: links.instagramCareers },
              { label: "Weekly email", note: "Join the society and you're added automatically", href: links.mailingList },
              { label: "Facebook", note: "Group and event pages", href: links.facebook },
            ]}
          />
        </div>
      </section>

      <JoinBanner />
    </>
  );
}
