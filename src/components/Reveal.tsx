import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";

// Adds .is-visible to every [data-reveal] element as it enters the viewport.
// Elements that appear in the same frame get a small stagger.
export function Reveal() {
  const { pathname } = useLocation();
  const [tick, setTick] = useState(0);

  // New [data-reveal] nodes (e.g. after filtering events) trigger a re-scan.
  useEffect(() => {
    const mo = new MutationObserver((muts) => {
      if (muts.some((m) => m.addedNodes.length)) setTick((t) => t + 1);
    });
    mo.observe(document.body, { childList: true, subtree: true });
    return () => mo.disconnect();
  }, []);

  useEffect(() => {
    const els = Array.from(
      document.querySelectorAll<HTMLElement>("[data-reveal]:not(.is-visible)"),
    );
    if (!("IntersectionObserver" in window)) {
      els.forEach((el) => el.classList.add("is-visible"));
      return;
    }
    const io = new IntersectionObserver(
      (entries) => {
        let i = 0;
        for (const entry of entries) {
          if (!entry.isIntersecting) continue;
          const el = entry.target as HTMLElement;
          el.style.transitionDelay = `${Math.min(i, 6) * 60}ms`;
          el.classList.add("is-visible");
          io.unobserve(el);
          i++;
        }
      },
      { rootMargin: "0px 0px -8% 0px", threshold: 0.05 },
    );
    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, [pathname, tick]);

  return null;
}
