import { Link } from "react-router-dom";

export function NotFound() {
  return (
    <section className="page-head">
      <div className="container">
        <span className="eyebrow" data-reveal>404</span>
        <h1 data-reveal>That page isn't here.</h1>
        <p className="lead" data-reveal style={{ marginTop: "1rem" }}>
          The link may be old. Everything current is on the home page.
        </p>
        <Link to="/" className="btn" style={{ marginTop: "1.5rem" }}>
          Back to home
        </Link>
      </div>
    </section>
  );
}
