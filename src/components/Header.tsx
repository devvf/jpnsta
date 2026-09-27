import { useEffect, useRef, useState } from "react";
import { Link, NavLink, useLocation } from "react-router-dom";
import { links, nav, site } from "../data/site";
import { asset } from "../lib/asset";
import { ExternalArrow } from "./ExternalArrow";

export function Header() {
  const { pathname } = useLocation();
  // The menu remembers which page it was opened on, so any navigation
  // (link, logo, browser back) closes it without needing an effect.
  const [openAt, setOpenAt] = useState<string | null>(null);
  const open = openAt === pathname;
  const setOpen = (next: boolean | ((o: boolean) => boolean)) =>
    setOpenAt((cur) => {
      const was = cur === pathname;
      const now = typeof next === "function" ? next(was) : next;
      return now ? pathname : null;
    });
  const toggleRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setOpenAt(null);
        toggleRef.current?.focus();
      }
    };
    // Tapping outside the header closes the menu; the page behind does not scroll.
    const onDown = (e: PointerEvent) => {
      if (!(e.target as Element).closest(".header")) setOpenAt(null);
    };
    const root = document.documentElement;
    const prev = root.style.overflow;
    root.style.overflow = "hidden";
    window.addEventListener("keydown", onKey);
    document.addEventListener("pointerdown", onDown);
    return () => {
      root.style.overflow = prev;
      window.removeEventListener("keydown", onKey);
      document.removeEventListener("pointerdown", onDown);
    };
  }, [open]);

  return (
    <header className="header">
      <div className="container header-inner">
        <Link to="/" className="brand" aria-label={`${site.fullName} home`}>
          <img className="brand-logo" src={asset("/logo.svg")} alt="" width="40" height="40" />
          <span className="brand-name">{site.name}</span>
          <span className="brand-sub">St Andrews</span>
        </Link>

        <nav className="nav nav-pages" aria-label="Main">
          {nav.map((n) => (
            <NavLink key={n.to} to={n.to}>
              {n.label}
            </NavLink>
          ))}
        </nav>

        <div className="nav nav-actions">
          <a href={links.instagram} target="_blank" rel="noreferrer">
            Instagram<span className="sr-only"> (opens in new tab)</span>
          </a>
          <a className="btn primary" href={links.union} target="_blank" rel="noreferrer">
            Join <ExternalArrow />
            <span className="sr-only"> on the Union site (opens in new tab)</span>
          </a>
        </div>

        <a className="btn primary header-join" href={links.union} target="_blank" rel="noreferrer">
          Join <ExternalArrow />
          <span className="sr-only"> on the Union site, {site.membershipPrice} a year (opens in new tab)</span>
        </a>

        <button
          ref={toggleRef}
          className="menu-btn"
          aria-expanded={open}
          aria-controls="mobile-nav"
          onClick={() => setOpen((o) => !o)}
        >
          <span className="sr-only">{open ? "Close menu" : "Menu"}</span>
          <span className="menu-icon" aria-hidden="true" />
        </button>
      </div>

      <nav
        id="mobile-nav"
        className="container mobile-nav"
        aria-label="Main"
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
          Join on the Union site <ExternalArrow />
          <span className="sr-only"> (opens in new tab)</span>
        </a>
      </nav>
    </header>
  );
}
