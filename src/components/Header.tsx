import { useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { links, nav, site } from "../data/site";


export function Header() {
  const [open, setOpen] = useState(false);

  return (
    <header className="header">
      <div className="container header-inner">
        <Link to="/" className="brand" aria-label={`${site.fullName} home`}>
          <span className="brand-dot" aria-hidden="true" />
          <span>{site.name}</span>
          <span className="brand-sub">St Andrews</span>
        </Link>

        <nav className="nav" aria-label="Main">
          {nav.map((n) => (
            <NavLink key={n.to} to={n.to}>
              {n.label}
            </NavLink>
          ))}
          <a className="btn primary" href={links.union} target="_blank" rel="noreferrer">
            Join
          </a>
        </nav>

        <button
          className="menu-btn"
          aria-expanded={open}
          aria-controls="mobile-nav"
          onClick={() => setOpen((o) => !o)}
        >
          {open ? "Close" : "Menu"}
        </button>
      </div>

      {open && (
        <div id="mobile-nav" className="container mobile-nav" onClick={() => setOpen(false)}>
          {nav.map((n) => (
            <NavLink key={n.to} to={n.to}>
              {n.label}
            </NavLink>
          ))}
          <a className="btn primary" href={links.union} target="_blank" rel="noreferrer">
            Join on the Union site
          </a>
        </div>
      )}
    </header>
  );
}
