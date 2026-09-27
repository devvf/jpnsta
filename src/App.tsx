import { useEffect, useRef } from "react";
import { BrowserRouter, Route, Routes, useLocation } from "react-router-dom";
import { Footer } from "./components/Footer";
import { Header } from "./components/Header";
import { Reveal } from "./components/Reveal";
import { ScrollToTop } from "./components/ScrollToTop";
import { About } from "./pages/About";
import { Events } from "./pages/Events";
import { Home } from "./pages/Home";
import { Language } from "./pages/Language";
import { NotFound } from "./pages/NotFound";

const titles: Record<string, string> = {
  "/": "Japan Society · University of St Andrews",
  "/events": "Events · Japan Society St Andrews",
  "/language": "Japanese lessons · Japan Society St Andrews",
  "/about": "About · Japan Society St Andrews",
};

function Pages() {
  const location = useLocation();
  // Static hosts may add a trailing slash (/events/), so normalise it.
  const pathname = location.pathname.replace(/(.)\/+$/, "$1");
  const first = useRef(true);

  useEffect(() => {
    document.title = titles[pathname] ?? "Page not found · Japan Society St Andrews";
    // Skip the first render so the page does not steal focus on load.
    if (first.current) {
      first.current = false;
      return;
    }
    document.getElementById("main")?.focus({ preventScroll: true });
  }, [pathname]);

  return (
    <main id="main" tabIndex={-1} key={pathname} className="page">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/events" element={<Events />} />
        <Route path="/language" element={<Language />} />
        <Route path="/about" element={<About />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </main>
  );
}

export default function App() {
  return (
    <BrowserRouter basename={import.meta.env.BASE_URL}>
      <a className="skip-link" href="#main">
        Skip to content
      </a>
      <ScrollToTop />
      <Reveal />
      <Header />
      <Pages />
      <Footer />
    </BrowserRouter>
  );
}
