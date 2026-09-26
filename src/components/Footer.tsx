import { Link } from "react-router-dom";
import { links, nav, site } from "../data/site";

export function Footer() {
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-grid">
          <div>
            <h4>{site.fullName}</h4>
            <p className="jp muted" style={{ fontSize: "0.9rem" }}>
              {site.nameJa}
            </p>
            <p>
              <a href={`mailto:${site.email}`}>{site.email}</a>
            </p>
          </div>
          <div>
            <h4>Site</h4>
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
            <h4>Elsewhere</h4>
            <ul>
              <li>
                <a href={links.union} target="_blank" rel="noreferrer">
                  Union page & membership
                </a>
              </li>
              <li>
                <a href={links.instagram} target="_blank" rel="noreferrer">
                  Instagram @jpnsta
                </a>
              </li>
              <li>
                <a href={links.instagramCareers} target="_blank" rel="noreferrer">
                  Careers Instagram
                </a>
              </li>
              <li>
                <a href={links.facebook} target="_blank" rel="noreferrer">
                  Facebook
                </a>
              </li>
              <li>
                <a href={links.constitution} target="_blank" rel="noreferrer">
                  Constitution
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
