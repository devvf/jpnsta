import { Link } from "react-router-dom";
import { links, nav, site } from "../data/site";

export function Footer() {
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-grid">
          <div>
            <p className="footer-title">{site.fullName}</p>
            <p className="jp muted" style={{ fontSize: "0.9rem" }}>
              {site.nameJa}
            </p>
            <p>
              <a href={`mailto:${site.email}`}>{site.email}</a>
            </p>
          </div>
          <div>
            <p className="footer-title">Site</p>
            <ul>
              <li>
                <Link to="/">Home</Link>
              </li>
              {nav.map((n) => (
                <li key={n.to}>
                  <Link to={n.to}>{n.label}</Link>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <p className="footer-title">Elsewhere</p>
            <ul>
              <li>
                <a href={links.union} target="_blank" rel="noreferrer">
                  Union page & membership
                  <span className="sr-only"> (opens in new tab)</span>
                </a>
              </li>
              <li>
                <a href={links.instagram} target="_blank" rel="noreferrer">
                  Instagram @jpnsta
                  <span className="sr-only"> (opens in new tab)</span>
                </a>
              </li>
              <li>
                <a href={links.instagramCareers} target="_blank" rel="noreferrer">
                  Careers Instagram
                  <span className="sr-only"> (opens in new tab)</span>
                </a>
              </li>
              <li>
                <a href={links.facebook} target="_blank" rel="noreferrer">
                  Facebook
                  <span className="sr-only"> (opens in new tab)</span>
                </a>
              </li>
              <li>
                <a href={links.constitution} target="_blank" rel="noreferrer">
                  Constitution
                  <span className="sr-only"> (opens in new tab)</span>
                </a>
              </li>
            </ul>
          </div>
        </div>
        <div className="footer-bottom">
          © {new Date().getFullYear()} {site.fullName}. Affiliated with the
          Students' Association.
        </div>
      </div>
    </footer>
  );
}
