import { JoinBanner } from "../components/JoinBanner";
import { links, site } from "../data/site";

// TODO: fill in the current committee.
const committee: { role: string; name: string }[] = [
  { role: "President", name: "TBC" },
  { role: "Vice President", name: "TBC" },
  { role: "Secretary", name: "TBC" },
  { role: "Treasurer", name: "TBC" },
  { role: "Events", name: "TBC" },
  { role: "Language", name: "TBC" },
];

export function About() {
  return (
    <>
      <section className="page-head">
        <div className="container">
          <span className="eyebrow jp">{site.nameJa}</span>
          <h1>About the society</h1>
          <p className="lead" style={{ marginTop: "1rem" }}>
            {site.blurb}
          </p>
        </div>
      </section>

      <section className="section">
        <div className="container split">
          <div>
            <span className="eyebrow">What we do</span>
            <h2>A bit of everything</h2>
          </div>
          <div className="prose">
            <p>
              Karaoke nights, Japanese food nights, film screenings, pub
              quizzes, origami afternoons, language cafés, and weekly language
              lessons. We also run a careers account for anyone thinking about
              working or studying in Japan.
            </p>
            <p>
              You don't need to speak Japanese, have been to Japan, or be
              studying anything related. Curiosity is enough.
            </p>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container split">
          <div>
            <span className="eyebrow">Committee</span>
            <h2>Who runs it</h2>
          </div>
          <div className="link-grid">
            {committee.map((c) => (
              <div className="link-card" key={c.role}>
                <div>
                  <strong>{c.name}</strong>
                  <span>{c.role}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container split">
          <div>
            <span className="eyebrow">Documents & contact</span>
            <h2>The paperwork</h2>
          </div>
          <div className="link-grid">
            <a className="link-card" href={links.constitution} target="_blank" rel="noreferrer">
              <div>
                <strong>Constitution</strong>
                <span>How the society is run (SharePoint)</span>
              </div>
              <span aria-hidden="true">↗</span>
            </a>
            <a className="link-card" href={links.union} target="_blank" rel="noreferrer">
              <div>
                <strong>Union page</strong>
                <span>Membership, {site.membershipPrice} a year</span>
              </div>
              <span aria-hidden="true">↗</span>
            </a>
            <a className="link-card" href={`mailto:${site.email}`}>
              <div>
                <strong>Email us</strong>
                <span>{site.email}</span>
              </div>
              <span aria-hidden="true">→</span>
            </a>
            <a className="link-card" href={links.linktree} target="_blank" rel="noreferrer">
              <div>
                <strong>Linktree</strong>
                <span>Everything in one place</span>
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
