import { Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";

import { nav, site } from "@/content/portfolio";

export function Nav() {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (typeof document === "undefined") return;
    if (open) {
      const prev = document.body.style.overflow;
      document.body.style.overflow = "hidden";
      return () => {
        document.body.style.overflow = prev;
      };
    }
  }, [open]);

  useEffect(() => {
    if (typeof window === "undefined") return;
    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") setOpen(false);
    }
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  return (
    <header className="flap flap-top">
      <div className="mini-grain" />
      <nav className="nav" aria-label="Primary">
        <Link to="/" className="brand" onClick={() => setOpen(false)}>
          {site.shortName}
        </Link>
        <div className="nav-links">
          {nav.map((item) => (
            <a key={item.href} href={item.href}>
              {item.label}
            </a>
          ))}
        </div>
        <button
          type="button"
          className="nav-toggle"
          aria-label={open ? "Close menu" : "Open menu"}
          aria-expanded={open}
          aria-controls="mobile-drawer"
          onClick={() => setOpen((v) => !v)}
        >
          <span className={`bars ${open ? "is-open" : ""}`} aria-hidden="true">
            <span />
            <span />
            <span />
          </span>
        </button>
      </nav>
      <div className="crease" />
      <div className="crease-shadow" />

      <div
        className={`nav-backdrop ${open ? "is-open" : ""}`}
        onClick={() => setOpen(false)}
        aria-hidden={!open}
      />
      <aside
        id="mobile-drawer"
        className={`nav-drawer ${open ? "is-open" : ""}`}
        // `inert` removes the subtree from tab order, click & a11y trees
        // when the drawer is closed — replaces aria-hidden which left the
        // close button and nav links focusable while visually hidden.
        inert={!open}
      >
        <div className="nav-drawer-inner">
          <div className="nav-drawer-head">
            <span className="brand">{site.shortName}</span>
            <button
              type="button"
              className="nav-close"
              aria-label="Close menu"
              onClick={() => setOpen(false)}
            >
              ×
            </button>
          </div>
          <ul className="nav-drawer-list">
            {nav.map((item) => (
              <li key={item.href}>
                <a href={item.href} onClick={() => setOpen(false)}>
                  {item.label}
                </a>
              </li>
            ))}
          </ul>
          <p className="nav-drawer-foot">— close the book to dismiss —</p>
        </div>
      </aside>
    </header>
  );
}
