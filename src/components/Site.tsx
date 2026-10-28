import {
  ArrowDown,
  ArrowRight,
  ArrowUpRight,
  ChevronDown,
  Menu,
  MoveRight,
  Phone,
  X,
} from "lucide-react";
import { AnimatePresence, motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import {
  type PointerEvent,
  type ReactNode,
  useEffect,
  useRef,
  useState,
} from "react";
import { Link, NavLink, useLocation } from "react-router-dom";
import { navigation, photos, problems, services, SITE, type Photo } from "../data/content";

const ease = [0.22, 1, 0.36, 1] as const;

export function ResponsiveImage({
  photo,
  className = "",
  priority = false,
}: {
  photo: Photo;
  className?: string;
  priority?: boolean;
}) {
  const source = photo.src;
  const isRemote = source.startsWith("http");
  const srcSet = isRemote
    ? [640, 960, 1280, 1920]
        .map((width) => {
          const url = new URL(source);
          url.searchParams.set("fit", "crop");
          url.searchParams.set("w", String(width));
          url.searchParams.set("q", "82");
          return `${url.toString()} ${width}w`;
        })
        .join(", ")
    : undefined;

  return (
    <img
      src={source}
      srcSet={srcSet}
      sizes={priority ? "100vw" : "(max-width: 760px) 100vw, 70vw"}
      alt={photo.alt}
      className={className}
      style={{ objectPosition: photo.position ?? "center" }}
      width={1600}
      height={1000}
      loading={priority ? "eager" : "lazy"}
      fetchPriority={priority ? "high" : "auto"}
      decoding="async"
    />
  );
}

export function Reveal({
  children,
  className = "",
  delay = 0,
  as: Element = "div",
}: {
  children: ReactNode;
  className?: string;
  delay?: number;
  as?: "div" | "section" | "article" | "li";
}) {
  const reducedMotion = useReducedMotion();
  const MotionElement = motion[Element];

  return (
    <MotionElement
      className={className}
      initial={reducedMotion ? false : { opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.15 }}
      transition={{ duration: reducedMotion ? 0.2 : 0.8, delay, ease }}
    >
      {children}
    </MotionElement>
  );
}

export function MaskReveal({
  children,
  className = "",
  delay = 0,
}: {
  children: ReactNode;
  className?: string;
  delay?: number;
}) {
  const reducedMotion = useReducedMotion();
  return (
    <span className={`text-reveal ${className}`}>
      <motion.span
        className="text-reveal-inner"
        initial={reducedMotion ? false : { y: "118%" }}
        whileInView={{ y: 0 }}
        viewport={{ once: true, amount: 0.45 }}
        transition={{ duration: reducedMotion ? 0.2 : 0.92, delay, ease }}
      >
        {children}
      </motion.span>
    </span>
  );
}

export function SplitReveal({
  lines,
  className = "",
  baseDelay = 0,
}: {
  lines: ReactNode[];
  className?: string;
  baseDelay?: number;
}) {
  const reducedMotion = useReducedMotion();
  return (
    <span className={`split-reveal ${className}`}>
      {lines.map((line, index) => (
        <span className="text-reveal" key={index}>
          <motion.span
            className="text-reveal-inner"
            initial={reducedMotion ? false : { y: "118%" }}
            whileInView={{ y: 0 }}
            viewport={{ once: true, amount: 0.45 }}
            transition={{ duration: reducedMotion ? 0.2 : 0.92, delay: baseDelay + index * 0.14, ease }}
          >
            {line}
          </motion.span>
        </span>
      ))}
    </span>
  );
}

export function SectionHeading({
  label,
  title,
  body,
  number,
  className = "",
}: {
  label: string;
  title: ReactNode;
  body?: ReactNode;
  number?: string;
  className?: string;
}) {
  return (
    <Reveal className={`section-heading ${className}`}>
      <p className="eyebrow">
        {number && <span className="section-number">{number}</span>}
        <span>{label}</span>
      </p>
      <h2><MaskReveal>{title}</MaskReveal></h2>
      {body && <p className="section-intro">{body}</p>}
    </Reveal>
  );
}

export function GlassPanel({
  children,
  className = "",
}: {
  children: ReactNode;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const shineAtPointer = (event: PointerEvent<HTMLDivElement>) => {
    if (event.pointerType !== "mouse" || !ref.current) return;
    const bounds = ref.current.getBoundingClientRect();
    ref.current.style.setProperty("--shine-x", `${event.clientX - bounds.left}px`);
    ref.current.style.setProperty("--shine-y", `${event.clientY - bounds.top}px`);
  };
  return <div ref={ref} className={`glass-panel ${className}`} onPointerMove={shineAtPointer}>{children}</div>;
}

export function MagneticLink({
  to,
  children,
  className = "",
  onClick,
}: {
  to: string;
  children: ReactNode;
  className?: string;
  onClick?: () => void;
}) {
  const ref = useRef<HTMLAnchorElement>(null);
  const reducedMotion = useReducedMotion();

  const handleMove = (event: PointerEvent<HTMLAnchorElement>) => {
    if (reducedMotion || event.pointerType !== "mouse" || !ref.current) return;
    const bounds = ref.current.getBoundingClientRect();
    const x = (event.clientX - bounds.left - bounds.width / 2) * 0.06;
    const y = (event.clientY - bounds.top - bounds.height / 2) * 0.08;
    ref.current.style.transform = `translate3d(${x}px, ${y}px, 0)`;
  };

  const handleLeave = () => {
    if (ref.current) ref.current.style.transform = "translate3d(0, 0, 0)";
  };

  return (
    <Link
      ref={ref}
      to={to}
      className={`button button--brass ${className}`}
      onPointerMove={handleMove}
      onPointerLeave={handleLeave}
      onClick={onClick}
    >
      <span>{children}</span>
      <ArrowRight aria-hidden="true" size={16} strokeWidth={1.7} />
    </Link>
  );
}

export function TextLink({
  to,
  href,
  children,
  className = "",
}: {
  to?: string;
  href?: string;
  children: ReactNode;
  className?: string;
}) {
  const content = (
    <>
      <span>{children}</span>
      <ArrowUpRight aria-hidden="true" size={15} strokeWidth={1.7} />
    </>
  );

  return to ? (
    <Link className={`text-link ${className}`} to={to}>
      {content}
    </Link>
  ) : (
    <a className={`text-link ${className}`} href={href}>
      {content}
    </a>
  );
}

export function PhotoFigure({
  photo,
  caption,
  className = "",
  priority = false,
}: {
  photo: Photo;
  caption?: string;
  className?: string;
  priority?: boolean;
}) {
  return (
    <figure className={`photo-figure ${className}`}>
      {/* Image slot: replace with Terry's own production photography when available. */}
      <div className="photo-clip">
        <ResponsiveImage photo={photo} priority={priority} className="photo-image" />
      </div>
      {caption && <figcaption>{caption}</figcaption>}
    </figure>
  );
}

export function SymptomCauseFix({
  symptom,
  cause,
  fix,
}: {
  symptom: string;
  cause: string;
  fix: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start 0.86", "end 0.3"] });
  const progress = useTransform(scrollYProgress, [0, 1], [0, 1]);

  return (
    <div ref={ref} className="symptom-cause-fix" aria-label="Symptom, cause, and fix">
      <motion.span className="symptom-progress-line" style={{ scaleX: progress }} aria-hidden="true" />
      <div>
        <span className="technical-label">Symptom</span>
        <p>{symptom}</p>
      </div>
      <MoveRight aria-hidden="true" className="scf-arrow" size={18} />
      <div>
        <span className="technical-label">Cause</span>
        <p>{cause}</p>
      </div>
      <MoveRight aria-hidden="true" className="scf-arrow" size={18} />
      <div>
        <span className="technical-label">Fix</span>
        <p>{fix}</p>
      </div>
    </div>
  );
}

export function FAQList({
  items,
  className = "",
}: {
  items: Array<{ question: string; answer: string }>;
  className?: string;
}) {
  return (
    <div className={`faq-list ${className}`}>
      {items.map((item) => (
        <details className="faq-item" key={item.question}>
          <summary>
            <span>{item.question}</span>
            <ChevronDown aria-hidden="true" size={18} />
          </summary>
          <div className="faq-answer">
            <p>{item.answer}</p>
          </div>
        </details>
      ))}
    </div>
  );
}

export function ContactLinks({
  compact = false,
}: {
  compact?: boolean;
}) {
  return (
    <div className={`contact-links ${compact ? "contact-links--compact" : ""}`}>
      <a href={`tel:${SITE.tel}`}>
        <span className="contact-icon"><Phone size={17} strokeWidth={1.6} /></span>
        <span><small>Call</small>{SITE.phone}</span>
        <ArrowUpRight aria-hidden="true" size={15} />
      </a>
      <a href={`sms:${SITE.sms}`}>
        <span className="contact-icon"><span className="sms-mark">SMS</span></span>
        <span><small>Text</small>Send Terry a text</span>
        <ArrowUpRight aria-hidden="true" size={15} />
      </a>
      <a href={`mailto:${SITE.email}`}>
        <span className="contact-icon"><span className="email-mark">@</span></span>
        <span><small>Email</small>{SITE.email}</span>
        <ArrowUpRight aria-hidden="true" size={15} />
      </a>
    </div>
  );
}

export function CTABand({
  title = "Tell me what you're seeing.",
  body = "A short conversation is a good place to start. You'll speak directly with Terry, with no sales pitch and no handoff.",
  dark = true,
}: {
  title?: string;
  body?: string;
  dark?: boolean;
}) {
  return (
    <section className={`cta-band ${dark ? "cta-band--dark" : "cta-band--light"}`}>
      <div className="container cta-band-inner">
        <Reveal className="cta-copy">
          <p className="eyebrow"><span className="section-number">06</span><span>START WITH THE SYMPTOM</span></p>
          <h2><MaskReveal>{title}</MaskReveal></h2>
          <p>{body}</p>
        </Reveal>
        <Reveal className="cta-actions" delay={0.12}>
          <MagneticLink to="/contact">Describe the problem</MagneticLink>
          <div className="cta-direct-links">
            <a href={`tel:${SITE.tel}`}>Call Terry <span>{SITE.phone}</span></a>
            <a href={`sms:${SITE.sms}`}>Text Terry</a>
            <a href={`mailto:${SITE.email}`}>Email Terry</a>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

function ScrollProgress() {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    let frame = 0;
    const update = () => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(() => {
        const scrollable = document.documentElement.scrollHeight - window.innerHeight;
        setProgress(scrollable > 0 ? (window.scrollY / scrollable) * 100 : 0);
      });
    };
    update();
    window.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update);
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("scroll", update);
      window.removeEventListener("resize", update);
    };
  }, []);

  return <div className="scroll-progress" style={{ width: `${progress}%` }} aria-hidden="true" />;
}

export function SiteHeader() {
  const location = useLocation();
  const [scrolled, setScrolled] = useState(location.pathname !== "/");
  const [menuOpen, setMenuOpen] = useState(false);
  const reducedMotion = useReducedMotion();
  const menuToggleRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 30 || location.pathname !== "/");
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [location.pathname]);

  useEffect(() => {
    setMenuOpen(false);
  }, [location.pathname]);

  useEffect(() => {
    if (!menuOpen) return;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = previousOverflow;
    };
  }, [menuOpen]);

  useEffect(() => {
    if (!menuOpen) return;
    const dialog = document.getElementById("mobile-navigation");
    const focusable = () => Array.from(dialog?.querySelectorAll<HTMLElement>('a[href], button:not([disabled])') ?? []);
    focusable()[0]?.focus();
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setMenuOpen(false);
        menuToggleRef.current?.focus();
        return;
      }
      if (event.key !== "Tab") return;
      const items = focusable();
      if (!items.length) return;
      const first = items[0];
      const last = items[items.length - 1];
      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    };
    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, [menuOpen]);

  return (
    <>
      <ScrollProgress />
      <header className={`site-header ${scrolled ? "is-scrolled" : ""}`}>
        <div className="header-inner container">
          <Link className="brand-mark" to="/" aria-label="Terry Petterson Coatings Consultant, home">
            <span className="brand-initial">TP</span>
            <span className="brand-name">Terry Petterson<small>Coatings Consultant</small></span>
          </Link>

          <nav className="desktop-nav" aria-label="Main navigation">
            {navigation.map((item) => (
              <NavLink key={item.path} to={item.path} className={({ isActive }) => isActive ? "nav-link is-active" : "nav-link"}>
                {item.label}
              </NavLink>
            ))}
          </nav>

          <a className="header-call" href={`tel:${SITE.tel}`}>
            <Phone aria-hidden="true" size={15} />
            <span>Call / Text Terry</span>
          </a>

          <button
            ref={menuToggleRef}
            className="menu-toggle"
            type="button"
            aria-label={menuOpen ? "Close navigation menu" : "Open navigation menu"}
            aria-expanded={menuOpen}
            aria-controls="mobile-navigation"
            onClick={() => setMenuOpen((open) => !open)}
          >
            {menuOpen ? <X size={23} /> : <Menu size={23} />}
          </button>
        </div>
      </header>

      <AnimatePresence>
        {menuOpen && (
          <motion.div
            id="mobile-navigation"
            className="mobile-menu"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: reducedMotion ? 0.15 : 0.45, ease }}
            role="dialog"
            aria-modal="true"
            aria-label="Main navigation"
          >
            <div className="mobile-menu-top container">
              <Link className="brand-mark" to="/" onClick={() => setMenuOpen(false)}>
                <span className="brand-initial">TP</span>
                <span className="brand-name">Terry Petterson<small>Coatings Consultant</small></span>
              </Link>
              <button className="menu-toggle" type="button" aria-label="Close navigation menu" onClick={() => setMenuOpen(false)}>
                <X size={23} />
              </button>
            </div>
            <nav className="mobile-nav container">
              {navigation.map((item, index) => (
                <motion.div
                  key={item.path}
                  initial={reducedMotion ? false : { opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: reducedMotion ? 0.15 : 0.5, delay: reducedMotion ? 0 : index * 0.07, ease }}
                >
                  <NavLink to={item.path} onClick={() => setMenuOpen(false)}>
                    <span className="mobile-nav-index">0{index + 1}</span>{item.label}<ArrowUpRight size={19} />
                  </NavLink>
                </motion.div>
              ))}
            </nav>
            <div className="mobile-menu-bottom container">
              <p>You will speak directly with Terry.</p>
              <a href={`tel:${SITE.tel}`}>{SITE.phone}</a>
              <a href={`mailto:${SITE.email}`}>{SITE.email}</a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

export function MobileContactBar() {
  return (
    <nav className="mobile-contact-bar" aria-label="Quick contact options">
      <a href={`tel:${SITE.tel}`}><Phone size={15} aria-hidden="true" />Call</a>
      <a href={`sms:${SITE.sms}`}><span className="sms-mark">SMS</span>Text</a>
      <a href={`mailto:${SITE.email}`}><span className="email-mark">@</span>Email</a>
    </nav>
  );
}

export function SiteFooter() {
  return (
    <footer className="site-footer">
      <div className="container footer-main">
        <div className="footer-brand-column">
          <Link className="brand-mark brand-mark--footer" to="/">
            <span className="brand-initial">TP</span>
            <span className="brand-name">Terry Petterson<small>Coatings Consultant</small></span>
          </Link>
          <p>Independent powder-coating guidance, from the first question to a process your team can repeat.</p>
          <address>
            <a href={`tel:${SITE.tel}`}>{SITE.phone}</a>
            <a href={`mailto:${SITE.email}`}>{SITE.email}</a>
            <span>{SITE.address}</span>
          </address>
        </div>

        <div className="footer-column">
          <h2>Problems I solve</h2>
          {problems.map((item) => <Link key={item.slug} to={item.path}>{item.shortTitle}</Link>)}
        </div>

        <div className="footer-column">
          <h2>Services</h2>
          {services.map((item) => <Link key={item.slug} to={item.path}>{item.title}</Link>)}
        </div>

        <div className="footer-column">
          <h2>Company & resources</h2>
          <Link to="/about">About Terry</Link>
          <Link to="/case-notes">Case notes</Link>
          <Link to="/resources">Resources & FAQ</Link>
          <Link to="/contact">Contact</Link>
          <Link to="/privacy">Privacy policy</Link>
          <Link to="/terms">Terms</Link>
        </div>

        <div className="footer-prompt">
          <p className="eyebrow">A GOOD PLACE TO START</p>
          <h2>Tell me what you're seeing.</h2>
          <Link className="footer-arrow-link" to="/contact">Start a conversation <ArrowRight size={15} /></Link>
          <a className="footer-prompt-phone" href={`tel:${SITE.tel}`}>Or call {SITE.phone}</a>
        </div>
      </div>
      <div className="footer-bottom container">
        <span>© {new Date().getFullYear()} {SITE.name}</span>
        <span>Shorewood, Illinois</span>
        <a href="#top" onClick={(event) => { event.preventDefault(); window.scrollTo({ top: 0, behavior: "smooth" }); }}>
          Back to top <ArrowDown size={13} className="back-to-top-icon" />
        </a>
      </div>
    </footer>
  );
}

export function PageSEO({
  title,
  description,
  schema = [],
  image = photos.hero.src,
}: {
  title: string;
  description: string;
  schema?: Record<string, unknown>[];
  image?: string;
}) {
  useEffect(() => {
    const root = (import.meta.env.VITE_SITE_URL as string | undefined)?.replace(/\/$/, "") || window.location.origin;
    const path = window.location.pathname;
    const canonical = `${root}${path === "/" ? "/" : path}`;
    const setMeta = (selector: string, attr: string, value: string) => {
      let element = document.head.querySelector<HTMLMetaElement>(selector);
      if (!element) {
        element = document.createElement("meta");
        document.head.appendChild(element);
      }
      element.setAttribute(attr, value);
    };

    document.title = title;
    setMeta('meta[name="description"]', "content", description);
    setMeta('meta[property="og:title"]', "content", title);
    setMeta('meta[property="og:description"]', "content", description);
    setMeta('meta[property="og:type"]', "content", "website");
    setMeta('meta[property="og:url"]', "content", canonical);
    setMeta('meta[property="og:image"]', "content", image.startsWith("http") ? image : `${root}${image}`);
    setMeta('meta[name="twitter:card"]', "content", "summary_large_image");
    setMeta('meta[name="twitter:title"]', "content", title);
    setMeta('meta[name="twitter:description"]', "content", description);
    setMeta('meta[name="twitter:image"]', "content", image.startsWith("http") ? image : `${root}${image}`);
    let canonicalLink = document.head.querySelector<HTMLLinkElement>('link[rel="canonical"]');
    if (!canonicalLink) {
      canonicalLink = document.createElement("link");
      canonicalLink.rel = "canonical";
      document.head.appendChild(canonicalLink);
    }
    canonicalLink.href = canonical;

    const professionalService = {
      "@context": "https://schema.org",
      "@type": "ProfessionalService",
      name: SITE.name,
      email: SITE.email,
      telephone: SITE.phone,
      url: root,
      description: "Independent powder-coating troubleshooting, team training, and process improvement.",
      address: {
        "@type": "PostalAddress",
        streetAddress: SITE.street,
        addressLocality: SITE.city,
        addressRegion: SITE.region,
        postalCode: SITE.postalCode,
        addressCountry: SITE.country,
      },
      areaServed: { "@type": "AdministrativeArea", name: "Illinois" },
    };
    let script = document.head.querySelector<HTMLScriptElement>('#page-jsonld');
    if (!script) {
      script = document.createElement("script");
      script.id = "page-jsonld";
      script.type = "application/ld+json";
      document.head.appendChild(script);
    }
    script.textContent = JSON.stringify([professionalService, ...schema]);
  }, [title, description, schema, image]);

  return null;
}

export function makeFAQSchema(items: Array<{ question: string; answer: string }>) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: items.map((item) => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: { "@type": "Answer", text: item.answer },
    })),
  };
}

export function makeServiceSchema(service: { title: string; short: string; path: string }) {
  const root = (import.meta.env.VITE_SITE_URL as string | undefined)?.replace(/\/$/, "") || (typeof window !== "undefined" ? window.location.origin : "");
  return {
    "@context": "https://schema.org",
    "@type": "Service",
    name: service.title,
    serviceType: service.title,
    description: service.short,
    url: `${root}${service.path}`,
    provider: { "@type": "ProfessionalService", name: SITE.name, email: SITE.email, telephone: SITE.phone },
    areaServed: { "@type": "AdministrativeArea", name: "Illinois" },
  };
}

export const motionEase = ease;