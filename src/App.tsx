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

function Pages() {
  const { pathname } = useLocation();
  return (
    <main key={pathname} className="page">
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
      <ScrollToTop />
      <Reveal />
      <Header />
      <Pages />
      <Footer />
    </BrowserRouter>
  );
}
