import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { useEffect } from "react";
import { BrowserRouter, Route, Routes, useLocation } from "react-router-dom";
import { MobileContactBar, SiteFooter, SiteHeader } from "./components/Site";
import { Pages } from "./pages/Pages";

function ScrollReset() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "auto" });
    const frame = requestAnimationFrame(() => document.getElementById("main-content")?.focus({ preventScroll: true }));
    return () => cancelAnimationFrame(frame);
  }, [pathname]);

  return null;
}

function RouteView() {
  const location = useLocation();
  const reducedMotion = useReducedMotion();

  return (
    <main id="main-content" className="route-main" tabIndex={-1}>
      <AnimatePresence mode="wait" initial={false}>
        <motion.div
          className="route-transition"
          key={location.pathname}
          initial={reducedMotion ? false : { opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -5 }}
          transition={{ duration: reducedMotion ? 0.15 : 0.46, ease: [0.22, 1, 0.36, 1] }}
        >
          <Routes location={location}>
            <Route path="/" element={<Pages.HomePage />} />
            <Route path="/problems" element={<Pages.ProblemsPage />} />
            <Route path="/problems/:slug" element={<Pages.ProblemDetailPage />} />
            <Route path="/services" element={<Pages.ServicesPage />} />
            <Route path="/services/:slug" element={<Pages.ServiceDetailPage />} />
            <Route path="/case-notes" element={<Pages.CaseNotesPage />} />
            <Route path="/about" element={<Pages.AboutPage />} />
            <Route path="/resources" element={<Pages.ResourcesPage />} />
            <Route path="/contact" element={<Pages.ContactPage />} />
            <Route path="/privacy" element={<Pages.PolicyPage kind="privacy" />} />
            <Route path="/terms" element={<Pages.PolicyPage kind="terms" />} />
            <Route path="*" element={<Pages.NotFoundPage />} />
          </Routes>
        </motion.div>
      </AnimatePresence>
    </main>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <div className="app-shell">
        <a className="skip-link" href="#main-content">Skip to content</a>
        <ScrollReset />
        <SiteHeader />
        <RouteView />
        <SiteFooter />
        <MobileContactBar />
      </div>
    </BrowserRouter>
  );
}