import { links, site } from "../data/site";

export function JoinBanner() {
  return (
    <section className="section">
      <div className="container">
        <div className="banner">
          <div>
            <h2>Join for {site.membershipPrice} a year.</h2>
            <p className="muted" style={{ margin: "0.75rem 0 0" }}>
              Membership is through the Students' Association. It gets you into
              every event and the weekly language lessons.
            </p>
          </div>
          <a className="btn" href={links.union} target="_blank" rel="noreferrer">
            Join on the Union site ↗
          </a>
        </div>
      </div>
    </section>
  );
}
