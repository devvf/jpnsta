import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";

const reveal = (el: HTMLElement) => {
  el.dataset.revealed = "";
};

const pending = () =>
  Array.from(document.querySelectorAll<HTMLElement>("[data-reveal]:not([data-revealed])"));

// Marks [data-reveal] elements as revealed when they enter the viewport.
// Content is only hidden when the `js` class is on <html>, and a failsafe
// reveals everything if the observer never fires, so nothing can stay invisible.
export function Reveal() {
  const { pathname } = useLocation();
  const [tick, setTick] = useState(0);

  // New [data-reveal] nodes (e.g. after filtering events) trigger a re-scan.
  useEffect(() => {
    const mo = new MutationObserver((muts) => {
      if (muts.some((m) => m.addedNodes.length)) setTick((t) => t + 1);
    });
    mo.observe(document.body, { childList: true, subtree: true });
    const all = () => pending().forEach(reveal);
    window.addEventListener("beforeprint", all);
    return () => {
      mo.disconnect();
      window.removeEventListener("beforeprint", all);
    };
  }, []);

  useEffect(() => {
    const els = pending();
    if (!els.length) return;
    if (!("IntersectionObserver" in window)) {
      els.forEach(reveal);
      return;
    }

    let fired = false;
    const io = new IntersectionObserver(
      (entries) => {
        fired = true;
        let i = 0;
        for (const entry of entries) {
          if (!entry.isIntersecting) continue;
          const el = entry.target as HTMLElement;
          el.style.transitionDelay = `${Math.min(i, 6) * 60}ms`;
          reveal(el);
          io.unobserve(el);
          i++;
        }
      },
      // threshold 0 so elements taller than the screen still trigger.
      { rootMargin: "0px 0px -6% 0px", threshold: 0 },
    );
    els.forEach((el) => io.observe(el));

    // If the observer has not reported at all (throttled or broken), show everything.
    const failsafe = window.setTimeout(() => {
      if (!fired && !document.hidden) pending().forEach(reveal);
    }, 1500);

    return () => {
      io.disconnect();
      window.clearTimeout(failsafe);
    };
  }, [pathname, tick]);

  return null;
}
