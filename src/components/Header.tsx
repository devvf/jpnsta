import { useEffect, useRef, useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { links, nav, site } from "../data/site";

export function Header() {
  const [open, setOpen] = useState(false);
  const toggleRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setOpen(false);
        toggleRef.current?.focus();
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  return (
    <header className="header">
      <div className="container header-inner">
        <Link to="/" className="brand" aria-label={`${site.fullName} home`}>
          <img className="brand-logo" src="/logo.svg" alt="" width="40" height="40" />
          <span>{site.name}</span>
          <span className="brand-sub">St Andrews</span>
        </Link>

        <nav className="nav" aria-label="Main">
          {nav.map((n) => (
            <NavLink key={n.to} to={n.to}>
              {n.label}
            </NavLink>
          ))}
          <a href={links.instagram} target="_blank" rel="noreferrer">
            Instagram<span className="sr-only"> (opens in new tab)</span>
          </a>
          <a className="btn primary" href={links.union} target="_blank" rel="noreferrer">
            Join<span className="sr-only"> on the Union site (opens in new tab)</span>
          </a>
        </nav>

        <button
          ref={toggleRef}
          className="menu-btn"
          aria-expanded={open}
          aria-controls="mobile-nav"
          onClick={() => setOpen((o) => !o)}
        >
          {open ? "Close" : "Menu"}
        </button>
      </div>

      <nav
        id="mobile-nav"
        className="container mobile-nav"
        aria-label="Mobile"
        hidden={!open}
        onClick={() => setOpen(false)}
      >
        {nav.map((n) => (
          <NavLink key={n.to} to={n.to}>
            {n.label}
          </NavLink>
        ))}
        <a href={links.instagram} target="_blank" rel="noreferrer">
          Instagram<span className="sr-only"> (opens in new tab)</span>
        </a>
        <a className="btn primary" href={links.union} target="_blank" rel="noreferrer">
          Join on the Union site<span className="sr-only"> (opens in new tab)</span>
        </a>
      </nav>
    </header>
  );
}
