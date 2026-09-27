import { Link } from "react-router-dom";
import { Kanji } from "../components/Kanji";

export function NotFound() {
  return (
    <section className="page-head">
      <div className="container">
        <Kanji className="page-kanji">迷子</Kanji>
        <h1 data-reveal>That page isn't here.</h1>
        <p className="lead" data-reveal>
          The link may be old. Everything current is on the home page.
        </p>
        <Link to="/" className="btn" style={{ marginTop: "1.5rem" }}>
          Back to home
        </Link>
      </div>
    </section>
  );
}
