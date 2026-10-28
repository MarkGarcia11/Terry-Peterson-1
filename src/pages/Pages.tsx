import {
  ArrowDown,
  ArrowRight,
  ArrowUpRight,
  MapPin,
  MoveDownRight,
  Search,
} from "lucide-react";
import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import { useMemo, useRef, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { ContactForm } from "../components/ContactForm";
import {
  ContactLinks,
  CTABand,
  FAQList,
  GlassPanel,
  MagneticLink,
  MaskReveal,
  PageSEO,
  PhotoFigure,
  ResponsiveImage,
  Reveal,
  SectionHeading,
  SplitReveal,
  SymptomCauseFix,
  TextLink,
  makeFAQSchema,
  makeServiceSchema,
} from "../components/Site";
import {
  photos,
  problems,
  resources,
  services,
  SITE,
  type FAQ,
  type Photo,
} from "../data/content";

function PageHero({
  eyebrow,
  title,
  body,
  photo = photos.hero,
  compact = false,
}: {
  eyebrow: string;
  title: React.ReactNode;
  body: string;
  photo?: Photo;
  compact?: boolean;
}) {
  return (
    <section className={`page-hero ${compact ? "page-hero--compact" : ""}`}>
      {/* Image slot: swap with a real coating-line image from Terry's shop. */}
      <ResponsiveImage photo={photo} priority className="page-hero-image" />
      <div className="page-hero-shade" />
      <div className="container page-hero-content">
        <p className="eyebrow"><span className="eyebrow-mark" />{eyebrow}</p>
        <h1><MaskReveal>{title}</MaskReveal></h1>
        <p className="page-hero-body">{body}</p>
      </div>
    </section>
  );
}

function ProblemRow({
  number,
  title,
  body,
  path,
}: {
  number: string;
  title: string;
  body: string;
  path: string;
}) {
  return (
    <Link to={path} className="problem-row">
      <span className="row-number">{number}</span>
      <span className="problem-row-text">
        <span className="technical-label">SYMPTOM / WHAT'S HAPPENING</span>
        <span className="problem-row-title">{title}</span>
        <span className="problem-row-body">{body}</span>
      </span>
      <ArrowUpRight aria-hidden="true" className="row-arrow" size={19} />
    </Link>
  );
}

function HomePage() {
  const reducedMotion = useReducedMotion();
  const heroRef = useRef<HTMLElement | null>(null);
  const { scrollYProgress: heroScrollProgress } = useScroll({ target: heroRef, offset: ["start start", "end start"] });
  const heroImageOffset = useTransform(heroScrollProgress, [0, 1], [0, 68]);

  return (
    <>
      <PageSEO
        title="Powder Coating Consultant in Illinois | Terry Petterson"
        description="Independent powder-coating troubleshooting, training, and process improvement. Tell Terry what you are seeing and get a plain, practical next step."
      />
      <section className="home-hero" id="top" ref={heroRef}>
        {/* Image slot: replace with a wide photo of Terry's powder-coating line. */}
        <motion.div className="home-hero-image-wrap" style={reducedMotion ? undefined : { y: heroImageOffset }}>
          <ResponsiveImage photo={photos.hero} priority className="home-hero-image" />
        </motion.div>
        <div className="home-hero-shade" />
        <motion.div
          className="hero-ember-glow"
          aria-hidden="true"
          animate={reducedMotion ? undefined : { opacity: [0.08, 0.12, 0.08], scale: [1, 1.04, 1] }}
          transition={reducedMotion ? undefined : { duration: 9, repeat: Infinity, ease: "easeInOut" }}
        />
        <div className="container home-hero-content">
          <div className="hero-copy">
            <p className="hero-brand-name">Terry Petterson</p>
            <p className="eyebrow hero-eyebrow"><span className="eyebrow-mark" />INDEPENDENT COATINGS CONSULTANT</p>
            <h1>
              <SplitReveal
                lines={[
                  <>When your powder coating</>,
                  <>isn’t right, <em>I find out why.</em></>,
                ]}
              />
            </h1>
            <p className="hero-lede">Independent troubleshooting, training, and process improvement for powder-coating operations of every size, with 12 years of hands-on experience.</p>
            <div className="hero-actions">
              <MagneticLink to="/contact">Tell me what you're seeing</MagneticLink>
              <a className="hero-phone-link" href={`tel:${SITE.tel}`}>
                Call <span>{SITE.phone}</span><ArrowUpRight size={15} aria-hidden="true" />
              </a>
              <a className="hero-phone-link" href={`sms:${SITE.sms}`}>
                Text Terry<ArrowUpRight size={15} aria-hidden="true" />
              </a>
            </div>
            <p className="hero-reassurance"><span className="reassurance-rule" />You'll speak directly with Terry.</p>
          </div>
          <a className="hero-scroll" href="#what-you-see" onClick={(event) => { event.preventDefault(); document.getElementById("what-you-see")?.scrollIntoView({ behavior: "smooth" }); }}>
            <span>SCROLL TO EXPLORE</span><ArrowDown size={14} aria-hidden="true" />
          </a>
        </div>
      </section>

      <section className="home-problems section-pad" id="what-you-see">
        <div className="container">
          <div className="home-problems-layout">
            <div className="problem-list-column">
              <SectionHeading
                number="01"
                label="START WITH WHAT YOU SEE"
                title={<>What are you <em>running into?</em></>}
                body="The finish tells you something. Let's start with the symptom and trace it back to the process."
              />
              <div className="problem-rows">
                <ProblemRow number="01" title="Poor wrap or inconsistent transfer" body="Grounding that changes from part to part." path="/problems/grounding" />
                <ProblemRow number="02" title="Fisheyes, residue, or adhesion trouble" body="Cleaning and pretreatment that need a closer look." path="/problems/cleaning" />
                <ProblemRow number="03" title="More powder going out than should" body="Waste, overspray, recovery, and cost per part." path="/problems/powder-use" />
                <ProblemRow number="04" title="A problem that does not fit the usual list" body="Industry-specific parts and one-of-a-kind issues." path="/problems/unusual" />
              </div>
              <TextLink to="/problems">See all problems I solve</TextLink>
            </div>
            <Reveal className="problem-image-column" delay={0.15}>
              <PhotoFigure photo={photos.booth} className="problem-feature-image" caption="The detail in the process is usually where the answer starts." />
              <span className="vertical-note">OBSERVE THE LINE / UNDERSTAND THE PART</span>
            </Reveal>
          </div>
        </div>
      </section>

      <FinishInspector />

      <section className="how-section section-pad">
        <div className="container">
          <div className="how-heading-grid">
            <SectionHeading
              number="03"
              label="A STEADY, PRACTICAL PROCESS"
              title={<>No guesswork. <em>Just the next right step.</em></>}
              body="I keep the work focused on the line, the part, and what your team can use."
            />
            <Reveal className="how-aside" delay={0.1}>
              <p>We do not have to know the answer before we start. We only need to be clear about what we can see, what changed, and what to test next.</p>
            </Reveal>
          </div>
          <div className="steps-grid">
            {[
              ["01", "You describe the problem", "Tell me what the finish is doing, when it happens, and what you've already tried."],
              ["02", "We find the root cause", "I look at the part and the process around it, not just the defect in isolation."],
              ["03", "I help you fix it", "We test a practical change and make sure your team understands how to repeat it."],
            ].map(([number, title, body], index) => (
              <Reveal className="step-item" delay={index * 0.1} key={number}>
                <span className="step-number">{number}</span>
                <h3>{title}</h3>
                <p>{body}</p>
                <span className="step-rule" />
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="home-services section-pad">
        <div className="container services-editorial">
          <div className="services-editorial-copy">
            <SectionHeading
              number="04"
              label="WAYS I CAN HELP"
              title={<>Good coating work takes <em>the whole process.</em></>}
              body="The right support might be one careful diagnosis, a stronger team, or a more consistent way of working."
            />
            <div className="service-list">
              {services.map((service, index) => (
                <Link to={service.path} className="service-row" key={service.slug}>
                  <span className="row-number">0{index + 1}</span>
                  <span><strong>{service.title}</strong><small>{service.short}</small></span>
                  <ArrowUpRight size={18} aria-hidden="true" />
                </Link>
              ))}
            </div>
            <TextLink to="/services">Explore my services</TextLink>
          </div>
          <Reveal className="services-editorial-image">
            <PhotoFigure photo={photos.spray} className="services-large-photo" caption="A process improvement only matters if it works on your line." />
            <span className="image-index">03 / 03</span>
          </Reveal>
        </div>
      </section>

      <section className="case-teaser">
        <div className="case-teaser-image">
          {/* Image slot: replace with a close-up of a difficult-to-clean component. */}
          <ResponsiveImage photo={photos.inspection} className="photo-image" />
        </div>
        <div className="container case-teaser-content">
          <Reveal className="case-teaser-copy">
            <p className="eyebrow"><span className="section-number">05</span><span>CASE NOTE / ANONYMIZED</span></p>
            <p className="case-teaser-kicker">A difficult cleaning challenge</p>
            <h2>When a part looked clean, but wasn't ready to coat.</h2>
            <p>An aerospace client was dealing with stubborn residue and inconsistent results. We followed the part through its cleaning path and worked toward a process the team could trust.</p>
            <TextLink to="/case-notes">Read the case note</TextLink>
          </Reveal>
        </div>
      </section>

      <section className="experience-band">
        <div className="container experience-grid">
          <Reveal className="experience-years">
            <span className="experience-big">12</span>
            <span className="experience-small">YEARS<br />HANDS-ON</span>
          </Reveal>
          <Reveal className="experience-copy" delay={0.1}>
            <p className="eyebrow">EXPERIENCE THAT STAYS PRACTICAL</p>
            <h2>I've spent 12 years learning what a coating line is trying to tell you.</h2>
            <p>From small job shops to demanding production environments, I bring patient observation, plain answers, and respect for the people running the line.</p>
            <TextLink to="/about">Get to know Terry</TextLink>
          </Reveal>
          <div className="experience-line" aria-hidden="true" />
        </div>
      </section>

      <section className="home-contact section-pad" id="contact">
        <div className="container home-contact-layout">
          <div className="home-contact-copy">
            <SectionHeading
              number="06"
              label="START A CONVERSATION"
              title={<>Tell me what you're <em>seeing.</em></>}
              body="A few clear details are enough to start. I read every message myself and will reply as soon as I can."
            />
            <ContactLinks />
            <p className="contact-address-note">Based in Shorewood, Illinois. Support for coating operations of every size.</p>
          </div>
          <Reveal className="home-contact-form-wrap">
            <div className="form-section-heading">
              <span className="technical-label">A SHORT NOTE IS FINE</span>
              <p>What does the finish look like?</p>
            </div>
            <ContactForm compact />
          </Reveal>
        </div>
      </section>
    </>
  );
}

function FinishInspector() {
  const [position, setPosition] = useState(52);
  const [activeHotspot, setActiveHotspot] = useState<string | null>(null);
  const reducedMotion = useReducedMotion();

  return (
    <section className="inspector-section section-pad-dark">
      <div className="container">
        <div className="inspector-layout">
          <div className="inspector-copy">
            <SectionHeading
              number="02"
              label="FINISH INSPECTOR"
              title={<>The surface is a <em>clue.</em></>}
              body="Move the line to compare a rough finish with an even one. The pattern points toward questions worth asking, not a diagnosis on its own."
            />
            <p className="inspector-note"><span className="note-star">*</span> One visible defect can have more than one cause. The process tells the full story.</p>
          </div>
          <Reveal className="inspector-visual" delay={0.12}>
            <div className="finish-comparison" style={{ "--compare-position": `${position}%` } as React.CSSProperties}>
              {/* These matched generated images are temporary visual examples; replace with Terry's approved defect and finish photos. */}
              <picture className="finish-smooth-picture">
                <source srcSet="/images/finish-smooth.webp" type="image/webp" />
                <img className="finish-smooth" src="/images/finish-smooth.jpg" width="1200" height="800" loading="lazy" alt="Even satin graphite powder-coated surface under a raking inspection light." />
              </picture>
              <div className="finish-defect-window" style={{ clipPath: `inset(0 ${100 - position}% 0 0)` }}>
                <picture>
                  <source srcSet="/images/finish-defect.webp" type="image/webp" />
                  <img className="finish-defect" src="/images/finish-defect.jpg" width="1200" height="800" loading="lazy" alt="Orange-peel texture and small pinholes in a graphite powder-coated surface." />
                </picture>
              </div>
              <div className="finish-before-label">TEXTURE / PINHOLES</div>
              <div className="finish-after-label">EVEN SATIN FINISH</div>
              <div className="compare-divider" aria-hidden="true"><span><MoveDownRight size={15} /></span></div>
              <button
                type="button"
                className={`hotspot hotspot--one ${activeHotspot === "film" ? "is-open" : ""}`}
                aria-label="Possible cause: film build or application conditions"
                aria-expanded={activeHotspot === "film"}
                onClick={() => setActiveHotspot(activeHotspot === "film" ? null : "film")}
                onMouseEnter={() => !reducedMotion && setActiveHotspot("film")}
                onMouseLeave={() => setActiveHotspot(null)}
                onFocus={() => setActiveHotspot("film")}
                onBlur={() => setActiveHotspot(null)}
              >
                <span className="hotspot-dot" />
                {activeHotspot === "film" && <span className="hotspot-tip">Film build or flow may be worth checking.</span>}
              </button>
              <button
                type="button"
                className={`hotspot hotspot--two ${activeHotspot === "surface" ? "is-open" : ""}`}
                aria-label="Possible cause: surface preparation or contamination"
                aria-expanded={activeHotspot === "surface"}
                onClick={() => setActiveHotspot(activeHotspot === "surface" ? null : "surface")}
                onMouseEnter={() => !reducedMotion && setActiveHotspot("surface")}
                onMouseLeave={() => setActiveHotspot(null)}
                onFocus={() => setActiveHotspot("surface")}
                onBlur={() => setActiveHotspot(null)}
              >
                <span className="hotspot-dot" />
                {activeHotspot === "surface" && <span className="hotspot-tip">Surface condition can change how powder flows.</span>}
              </button>
              <label className="compare-range-label" htmlFor="finish-range">Drag to compare finishes</label>
              <input
                id="finish-range"
                className="compare-range"
                type="range"
                min="0"
                max="100"
                value={position}
                onChange={(event) => setPosition(Number(event.target.value))}
                aria-label="Compare defective and smooth powder-coated finishes"
              />
            </div>
            <p className="inspector-caption"><span>01 / SURFACE OBSERVATION</span><span>Move the control to inspect both sides</span></p>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

function ProblemsPage() {
  return (
    <>
      <PageSEO title="Powder Coating Problems I Solve | Terry Petterson" description="Poor grounding, cleaning and pretreatment failures, excessive powder consumption, and unusual coating problems. Start with the symptom." />
      <PageHero eyebrow="PROBLEMS I SOLVE" title={<>Start with the <em>symptom.</em></>} body="A coating defect is a useful clue. I help trace it to the process behind it, in plain language your team can act on." photo={photos.booth} />
      <section className="section-pad problem-hub-section">
        <div className="container">
          <div className="hub-intro-grid">
            <SectionHeading
              number="01"
              label="COMMON STARTING POINTS"
              title={<>What is the line <em>telling you?</em></>}
              body="These are common symptoms, but no two parts or production lines are exactly alike."
            />
            <Reveal className="hub-aside"><p>I start with what you can see, then look at the part's path through grounding, cleaning, application, recovery, and cure.</p><Link to="/contact" className="subtle-text-link">Not sure which one fits? Tell me about it <ArrowRight size={15} /></Link></Reveal>
          </div>
          <div className="hub-problem-layout">
            <div className="hub-rows">
              {problems.map((problem, index) => (
                <ProblemRow
                  key={problem.slug}
                  number={`0${index + 1}`}
                  title={problem.title}
                  body={problem.intro}
                  path={problem.path}
                />
              ))}
            </div>
            <Reveal className="hub-image">
              <PhotoFigure photo={photos.inspection} className="hub-feature-photo" caption="Start by looking closely at the part and the process around it." />
            </Reveal>
          </div>
          <div className="symptom-strip-wrap">
            <p className="technical-label">A PRACTICAL WAY TO THINK IT THROUGH</p>
            <SymptomCauseFix symptom="What is changing on the part?" cause="What in the process could explain it?" fix="What is the smallest useful test?" />
          </div>
        </div>
      </section>
      <CTABand />
    </>
  );
}

function ProblemDetailPage() {
  const { slug } = useParams();
  const problem = problems.find((item) => item.slug === slug);
  if (!problem) return <NotFoundPage />;
  const faqSchema = makeFAQSchema(problem.faqs);

  return (
    <>
      <PageSEO
        title={`${problem.title} | Powder Coating Consultant | Terry Petterson`}
        description={problem.intro}
        schema={[faqSchema]}
      />
      <PageHero eyebrow={problem.eyebrow} title={<>{problem.headline}</>} body={problem.intro} photo={problem.image} />
      <section className="section-pad detail-section">
        <div className="container">
          <div className="detail-first-grid">
            <SectionHeading
              number="01"
              label="SYMPTOM"
              title={<>What you may be <em>seeing.</em></>}
              body="These clues can help us narrow down where to look. They are a starting point, not a conclusion."
            />
            <Reveal className="detail-list-wrap">
              <ul className="detail-list">
                {problem.symptoms.map((item) => <li key={item}><span className="list-dot" />{item}</li>)}
              </ul>
            </Reveal>
          </div>
          <div className="detail-photo-grid">
            <PhotoFigure photo={problem.image} className="detail-photo" caption="The part gives us clues. The full process gives us context." />
            <div className="detail-cause-copy">
              <p className="eyebrow"><span className="section-number">02</span><span>CAUSE / WHAT MAY BE BEHIND IT</span></p>
              <h2>Several small things can lead to the same <em>symptom.</em></h2>
              <ul className="detail-list detail-list--compact">
                {problem.causes.map((item) => <li key={item}><span className="list-dot" />{item}</li>)}
              </ul>
            </div>
          </div>
          <div className="detail-fix-grid">
            <div className="detail-fix-heading">
              <p className="eyebrow"><span className="section-number">03</span><span>FIX / HOW I APPROACH IT</span></p>
              <h2>Understand first. <em>Adjust with purpose.</em></h2>
              <p>I do not start with a pre-written answer. I start with your parts, people, and process.</p>
            </div>
            <div className="numbered-list">
              {problem.approach.map((item, index) => <div className="numbered-list-row" key={item}><span>0{index + 1}</span><p>{item}</p></div>)}
            </div>
          </div>
          <div className="detail-outcome">
            <span className="technical-label">WHAT CHANGES AFTERWARD</span>
            <p>{problem.outcome}</p>
          </div>
          <div className="detail-faq-grid">
            <SectionHeading number="04" label="COMMON QUESTIONS" title={<>A few things you may <em>wonder.</em></>} />
            <FAQList items={problem.faqs} />
          </div>
        </div>
      </section>
      <CTABand title="Tell me what you're seeing." body="Share the part, the symptom, and what you have tried so far. We'll work out a sensible place to start." />
    </>
  );
}

function ServicesPage() {
  return (
    <>
      <PageSEO title="Powder Coating Consulting Services | Terry Petterson" description="Independent powder coating troubleshooting, team training, and process improvement for job shops, OEMs, and larger operations." />
      <PageHero eyebrow="HOW I CAN HELP" title={<>Support that starts with <em>your line.</em></>} body="A direct, experienced pair of eyes on the problem you have, the team you work with, and the finish you need." photo={photos.spray} />
      <section className="section-pad service-hub-section">
        <div className="container">
          <div className="hub-intro-grid">
            <SectionHeading number="01" label="THREE PRACTICAL WAYS TO WORK TOGETHER" title={<>The right help depends on <em>what needs to change.</em></>} body="Some operations need a clear diagnosis. Others need steadier fundamentals or a more efficient process." />
            <Reveal className="hub-aside"><p>We will talk through the situation first. I will be honest about whether I am the right person to help and what a useful next step could look like.</p></Reveal>
          </div>
          <div className="service-hub-grid">
            <div className="service-hub-list">
              {services.map((service, index) => (
                <Link to={service.path} className="service-hub-item" key={service.slug}>
                  <span className="service-hub-index">0{index + 1}</span>
                  <span className="service-hub-text"><strong>{service.title}</strong><small>{service.short}</small><span className="service-learn">Explore this service <ArrowRight size={14} /></span></span>
                  <ArrowUpRight className="service-hub-arrow" size={19} aria-hidden="true" />
                </Link>
              ))}
            </div>
            <PhotoFigure photo={photos.booth} className="service-hub-photo" caption="The best advice fits the people, parts, and equipment you have." />
          </div>
        </div>
      </section>
      <CTABand title="Not sure which kind of help fits?" body="Tell me what is happening. We can decide together whether troubleshooting, training, or process improvement is the right place to start." />
    </>
  );
}

function ServiceDetailPage() {
  const { slug } = useParams();
  const service = services.find((item) => item.slug === slug);
  if (!service) return <NotFoundPage />;
  const faqItems: FAQ[] = [
    { question: "Can we talk before deciding on an engagement?", answer: "Yes. A first conversation is a low-pressure way to describe the need and decide what a useful next step could be." },
    { question: "Is the work on-site or remote?", answer: "It depends on the problem, the operation, and what we need to observe. We will discuss a practical format before making a plan." },
  ];

  return (
    <>
      <PageSEO title={`${service.title} | Terry Petterson Coatings Consultant`} description={service.intro} schema={[makeServiceSchema(service), makeFAQSchema(faqItems)]} />
      <PageHero eyebrow={service.eyebrow} title={<>{service.headline}</>} body={service.intro} photo={service.image} />
      <section className="section-pad service-detail-section">
        <div className="container">
          <div className="service-detail-intro">
            <p className="eyebrow"><span className="section-number">01</span><span>WHO IT'S FOR</span></p>
            <h2>For people responsible for the <em>finish.</em></h2>
            <ul className="detail-list">
              {service.who.map((item) => <li key={item}><span className="list-dot" />{item}</li>)}
            </ul>
          </div>
          <div className="service-detail-visual-row">
            <PhotoFigure photo={service.image} className="service-detail-photo" caption="A good review starts with the way the work actually happens." />
            <div className="service-expect">
              <p className="eyebrow"><span className="section-number">02</span><span>WHAT TO EXPECT</span></p>
              <h2>Plain answers, built around <em>your operation.</em></h2>
              <ul className="detail-list detail-list--compact">
                {service.expect.map((item) => <li key={item}><span className="list-dot" />{item}</li>)}
              </ul>
            </div>
          </div>
          <div className="service-process">
            <div>
              <p className="eyebrow"><span className="section-number">03</span><span>HOW IT WORKS</span></p>
              <h2>One step at a <em>time.</em></h2>
            </div>
            <div className="numbered-list">
              {service.process.map((item, index) => <div className="numbered-list-row" key={item}><span>0{index + 1}</span><p>{item}</p></div>)}
            </div>
          </div>
          <div className="service-faq-grid">
            <SectionHeading label="A FEW DETAILS" title={<>Before we <em>begin.</em></>} />
            <FAQList items={faqItems} />
          </div>
        </div>
      </section>
      <CTABand title="Let's talk about what your line needs." body="You will speak directly with me. A clear description is enough to get the conversation started." />
    </>
  );
}

function CaseNotesPage() {
  return (
    <>
      <PageSEO title="Powder Coating Case Notes | Terry Petterson" description="Anonymized examples of powder-coating troubleshooting and process work, including a difficult aerospace cleaning challenge." />
      <PageHero eyebrow="CASE NOTES" title={<>Real process questions. <em>Plain answers.</em></>} body="A few anonymized examples of the kind of problems I help work through. Each line and part is different, so these are illustrations, not promises." photo={photos.inspection} />
      <section className="section-pad case-notes-section">
        <div className="container">
          <div className="case-story-label"><span>CASE NOTE 01</span><span>ANONYMIZED / AEROSPACE</span></div>
          <article className="case-story">
            <div className="case-story-main">
              <p className="technical-label">THE SITUATION</p>
              <h2>A stubborn residue stood between the part and a reliable finish.</h2>
              <p>An aerospace client was dealing with a difficult cleaning challenge on parts headed for coating. The parts could look ready at a glance, but the cleaning sequence was not consistently removing what was left on the surface.</p>
              <PhotoFigure photo={photos.inspection} className="case-story-photo" caption="The client and specific component remain unnamed." />
            </div>
            <div className="case-story-side">
              <div className="case-story-block">
                <p className="technical-label">WHAT WE FOUND</p>
                <p>We followed the part through its cleaning, rinse, dry, and handling steps. Looking at the sequence as a whole helped narrow down where the residue was getting through and what needed a closer check.</p>
              </div>
              <div className="case-story-block">
                <p className="technical-label">WHAT CHANGED</p>
                <p>The cleaning approach was refined around the part and its requirements. The team had a clearer process to repeat and a better understanding of what to watch before the part went to coating.</p>
              </div>
              <p className="case-story-caveat">This summary is intentionally anonymized. No client name, specification, or production result is disclosed.</p>
            </div>
          </article>
          <div className="placeholder-case-grid">
            <article className="placeholder-case">
              <p className="technical-label">PLACEHOLDER / FOR TERRY TO COMPLETE</p>
              <h2>Another process story, when you are ready.</h2>
              <p>Add a verified situation, the root cause, and what changed for the team.</p>
            </article>
            <article className="placeholder-case">
              <p className="technical-label">PLACEHOLDER / FOR TERRY TO COMPLETE</p>
              <h2>A second example, with the details that matter.</h2>
              <p>Use this space for a real problem and a practical, honest outcome.</p>
            </article>
          </div>
          {/* Testimonials are intentionally omitted until Terry supplies approved, real content. */}
        </div>
      </section>
      <CTABand title="Is a similar problem showing up on your line?" body="Tell me what you have noticed. We can start with the part, its process, and what you have already tried." />
    </>
  );
}

function AboutPage() {
  return (
    <>
      <PageSEO title="About Terry Petterson | Powder Coating Consultant Illinois" description="Meet Terry Petterson, an independent powder-coating consultant with 12 years of hands-on experience and a plain-spoken, one-to-one approach." />
      <PageHero eyebrow="ABOUT TERRY" title={<>A coating problem deserves a <em>plain answer.</em></>} body="I am an independent consultant, and I stay close to the work. When we talk, you are talking with the person who will help you think it through." photo={photos.hero} />
      <section className="section-pad about-section">
        <div className="container about-grid">
          <Reveal className="about-photo-wrap">
            {/* Portrait slot: replace with an authentic, natural-light photo of Terry in the shop. */}
            <PhotoFigure photo={{ ...photos.inspection, alt: "A coating professional carefully inspecting a metal part in a workshop; replace this image with Terry's portrait." }} className="about-photo" caption="Replace with a candid portrait of Terry in the shop." />
            <span className="about-photo-note">THE PERSON YOU WILL WORK WITH</span>
          </Reveal>
          <div className="about-copy">
            <SectionHeading number="01" label="A LITTLE ABOUT ME" title={<>Twelve years of learning by <em>looking closely.</em></>} body="Powder coating rewards attention. You notice the way a part hangs, how it cleans, where the powder goes, and what the finish looks like after cure. Those details are where I have spent my working life." />
            <Reveal className="about-story" delay={0.1}>
              <p>Over 12 years, I have worked with coating operations of different sizes, from small job shops to demanding industrial environments. I have seen how a small change in grounding, cleaning, or application can show up as a very visible problem at the end of the line.</p>
              <p>I started this independent practice because I believe good advice should be direct and useful. I am not sending a junior consultant to gather notes. You talk with me, and I work through the problem with your team.</p>
              <p>My role is not to make the process sound complicated. It is to help you understand what is happening and what is worth trying next.</p>
            </Reveal>
          </div>
        </div>
        <div className="container values-section">
          <p className="eyebrow"><span className="section-number">02</span><span>HOW I WORK</span></p>
          <div className="values-grid">
            {[
              ["01", "Plain language", "Clear explanations your operators can use."],
              ["02", "Root causes, not guesses", "Look at the evidence before changing the process."],
              ["03", "Your team should understand it too", "The learning stays with the people running the line."],
            ].map(([number, title, body]) => <Reveal className="value-item" key={number}><span>{number}</span><h3>{title}</h3><p>{body}</p></Reveal>)}
          </div>
        </div>
        <div className="container one-person-note">
          <Reveal className="one-person-copy">
            <p className="eyebrow"><span className="section-number">03</span><span>WHAT A ONE-PERSON FIRM MEANS</span></p>
            <h2>Direct access. <em>No handoffs.</em></h2>
          </Reveal>
          <Reveal className="one-person-details" delay={0.1}>
            <p>You work with me from the first conversation through the next step. I can tell you what I think, where I am unsure, and when I do not believe a change is worth making.</p>
            <TextLink to="/contact">Talk with Terry</TextLink>
          </Reveal>
        </div>
      </section>
      <CTABand title="Let's talk through what is happening." body="No pitch and no handoff. Just a direct conversation about your coating process." />
    </>
  );
}

function ResourcesPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const visibleResources = useMemo(() => {
    const query = searchTerm.trim().toLowerCase();
    if (!query) return resources;
    return resources.filter((item) => `${item.question} ${item.answer} ${item.category}`.toLowerCase().includes(query));
  }, [searchTerm]);
  const faqSchema = makeFAQSchema(resources);

  return (
    <>
      <PageSEO title="Powder Coating Questions & Resources | Terry Petterson" description="Plain answers to common powder-coating questions about grounding, pretreatment, fisheyes, orange peel, powder use, and getting help." schema={[faqSchema]} />
      <PageHero eyebrow="RESOURCES / FAQ" title={<>Useful answers for the <em>next question.</em></>} body="A small, growing reference for the things coating teams ask about most. Short answers, grounded in the process." photo={photos.parts} compact />
      <section className="section-pad resources-section">
        <div className="container">
          <div className="resources-intro-grid">
            <SectionHeading number="01" label="COMMON QUESTIONS" title={<>Start with the <em>thing you noticed.</em></>} body="Search by symptom, process, or the question you are trying to answer. If your issue is not here, you can still ask me directly." />
            <div className="resource-search-wrap">
              <label htmlFor="resource-search" className="technical-label">SEARCH THE NOTES</label>
              <div className="resource-search"><Search size={18} aria-hidden="true" /><input id="resource-search" type="search" value={searchTerm} onChange={(event) => setSearchTerm(event.target.value)} placeholder="Try grounding or fisheyes" /></div>
              <p>Questions and answers are kept in a simple, editable content list.</p>
            </div>
          </div>
          <div className="resource-results-count" aria-live="polite">{visibleResources.length} {visibleResources.length === 1 ? "answer" : "answers"}</div>
          {visibleResources.length > 0 ? (
            <div className="resources-accordion">
              {visibleResources.map((item) => (
                <details className="resource-item" key={item.id}>
                  <summary><span className="resource-category">{item.category}</span><span className="resource-question">{item.question}</span><span className="resource-expand" aria-hidden="true"><ArrowDown size={17} /></span></summary>
                  <p>{item.answer}</p>
                </details>
              ))}
            </div>
          ) : (
            <div className="resource-empty"><p>No matching answer yet.</p><Link to="/contact">Tell Terry what you are seeing <ArrowRight size={15} /></Link></div>
          )}
          <div className="resource-topics">
            <span className="technical-label">TOPICS TO EXPLORE</span>
            <div>{["Grounding", "Cleaning", "Powder use", "Finish quality", "Training"].map((topic) => <button type="button" key={topic} onClick={() => setSearchTerm(topic)}>{topic}</button>)}</div>
          </div>
        </div>
      </section>
      <CTABand title="Not seeing your question here?" body="Tell me what you are dealing with. A particular part, defect, or line condition is a good place to start." />
    </>
  );
}

function MapPlaceholder() {
  const mapLink = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(SITE.address)}`;
  return (
    <div className="map-location">
      <div className="map-art" aria-label={`Map placeholder showing Shorewood, Illinois near ${SITE.address}`}>
        <svg viewBox="0 0 600 370" role="img" aria-labelledby="map-title" preserveAspectRatio="xMidYMid slice">
          <title id="map-title">Illustrated map of Shorewood, Illinois</title>
          <rect width="600" height="370" fill="#e8e3da" />
          <path d="M-20 260 C100 205 132 305 231 241 S392 185 620 216" fill="none" stroke="#fffdf9" strokeWidth="32" />
          <path d="M140 -25 C172 82 95 116 155 205 S215 294 192 395" fill="none" stroke="#fffdf9" strokeWidth="25" />
          <path d="M402 -20 C352 76 432 139 370 212 S345 308 400 390" fill="none" stroke="#fffdf9" strokeWidth="20" />
          <path d="M14 94 L209 90 M278 64 L573 86 M26 328 L146 306 M470 302 L604 280" stroke="#d9d3c9" strokeWidth="2" />
          <path d="M267 112 C283 157 266 195 300 235" fill="none" stroke="#b8905a" strokeWidth="2" strokeDasharray="4 7" />
          <circle cx="300" cy="174" r="26" fill="#b8905a" fillOpacity=".15" />
          <circle cx="300" cy="174" r="8" fill="#b8905a" />
          <text x="24" y="34" fill="#68645c" fontSize="13" letterSpacing="2">SHOREWOOD / ILLINOIS</text>
          <text x="327" y="170" fill="#423e37" fontSize="13">Terry Petterson</text>
          <text x="327" y="190" fill="#777269" fontSize="11">Coatings Consultant</text>
        </svg>
        <a href={mapLink} target="_blank" rel="noreferrer" aria-label="Open directions to Terry Petterson in Google Maps"><MapPin size={20} /></a>
      </div>
      <div className="map-address">
        <span className="technical-label">BASED IN SHOREWOOD, ILLINOIS</span>
        <p>{SITE.address}</p>
        <a href={mapLink} target="_blank" rel="noreferrer">Open directions <ArrowUpRight size={15} /></a>
      </div>
    </div>
  );
}

function ContactPage() {
  return (
    <>
      <PageSEO title="Contact Terry Petterson | Powder Coating Consultant Illinois" description="Call, text, or email Terry Petterson about a powder-coating issue. Share what you are seeing through a detailed contact form." />
      <PageHero eyebrow="CONTACT / SHOREWOOD, ILLINOIS" title={<>Tell me what your line is <em>showing you.</em></>} body="A clear description is enough to start. Call, text, email, or send a few details here. I read every message myself." photo={photos.booth} compact />
      <section className="contact-options-section">
        <div className="container contact-options-layout">
          <div>
            <p className="eyebrow"><span className="section-number">01</span><span>CHOOSE WHAT'S EASIEST</span></p>
            <h2>Get in touch <em>directly.</em></h2>
          </div>
          <ContactLinks />
        </div>
      </section>
      <section className="contact-main section-pad">
        <div className="container contact-main-grid">
          <div className="contact-form-column">
            <p className="eyebrow"><span className="section-number">02</span><span>DESCRIBE THE PROBLEM</span></p>
            <h2>A little detail helps me <em>get oriented.</em></h2>
            <p className="contact-form-intro">What does the finish look like? When does the issue show up? What have you tried so far? Share as much or as little as you like.</p>
            <ContactForm />
          </div>
          <div className="contact-aside">
            <Reveal className="contact-aside-note">
              <GlassPanel className="contact-aside-glass">
                <span className="aside-mark">TP</span>
                <p>You'll speak directly with me. I will read your note and reply as soon as I can.</p>
                <a href={`mailto:${SITE.email}`}>{SITE.email}<ArrowUpRight size={15} /></a>
              </GlassPanel>
            </Reveal>
            <MapPlaceholder />
          </div>
        </div>
      </section>
      <CTABand title="Prefer to talk it through?" body={`Call or text Terry at ${SITE.phone}. A conversation is a good place to decide what to do next.`} />
    </>
  );
}

function PolicyPage({ kind }: { kind: "privacy" | "terms" }) {
  const isPrivacy = kind === "privacy";
  const title = isPrivacy ? "Privacy policy" : "Terms of use";
  return (
    <>
      <PageSEO title={`${title} | Terry Petterson Coatings Consultant`} description={`${title} for Terry Petterson Coatings Consultant.`} />
      <PageHero eyebrow={`UTILITY / ${isPrivacy ? "PRIVACY" : "TERMS"}`} title={<>{isPrivacy ? <>A straightforward <em>privacy policy.</em></> : <>A few clear <em>terms.</em></>}</>} body="Plain-language information about this website and getting in touch." photo={photos.parts} compact />
      <section className="section-pad legal-section">
        <div className="container legal-content">
          <p className="technical-label">LAST REVIEWED: ADD DATE BEFORE LAUNCH</p>
          {isPrivacy ? (
            <>
              <h2>Information you choose to share</h2>
              <p>If you call, text, email, or use the inquiry form, Terry receives the details you choose to provide. This may include your name, company, contact details, a description of a coating issue, and an optional photo.</p>
              <p>The form on this site uses your email application as a fallback unless a form service has been configured by the site owner. If a form endpoint is enabled, the information is sent to that service for delivery to Terry. The service, retention period, and any applicable privacy terms should be reviewed and added here before the form is connected.</p>
              <h2>Cookies and analytics</h2>
              <p>This starter site does not add advertising cookies or analytics by default. If analytics, embedded services, or additional form providers are added, this policy should be updated to describe them.</p>
              <h2>Questions</h2>
              <p>For a privacy question, email <a href={`mailto:${SITE.email}`}>{SITE.email}</a> or call <a href={`tel:${SITE.tel}`}>{SITE.phone}</a>.</p>
            </>
          ) : (
            <>
              <h2>Website information</h2>
              <p>The material on this website is general information about independent powder-coating consulting. It is not a substitute for evaluating your equipment, materials, process requirements, or safety procedures.</p>
              <h2>Working together</h2>
              <p>Contacting Terry through this website does not create a consulting engagement. Any scope, schedule, fees, confidentiality terms, and responsibilities should be agreed directly before work begins.</p>
              <h2>Accuracy and updates</h2>
              <p>Information is provided in good faith and may be updated. Every coating line and part is different; examples on this site are not guarantees of a particular outcome.</p>
              <h2>Contact</h2>
              <p>Questions about these terms can be sent to <a href={`mailto:${SITE.email}`}>{SITE.email}</a>.</p>
            </>
          )}
        </div>
      </section>
      <CTABand title="Questions about the work?" body="If you are here because of a coating problem, tell me what you are seeing." />
    </>
  );
}

export function NotFoundPage() {
  return (
    <>
      <PageSEO title="Page not found | Terry Petterson Coatings Consultant" description="This page is not here. Find help with powder-coating problems or contact Terry directly." />
      <section className="not-found-page">
        {/* Image slot: replace with a moody detail from the coating line. */}
        <ResponsiveImage photo={photos.hero} className="not-found-image" priority />
        <div className="not-found-shade" />
        <div className="container not-found-content">
          <p className="eyebrow"><span className="eyebrow-mark" />404 / PAGE NOT FOUND</p>
          <h1><MaskReveal>That part of the line <em>isn’t here.</em></MaskReveal></h1>
          <p>The page may have moved. The coating help has not.</p>
          <div className="not-found-actions"><MagneticLink to="/">Back to the home page</MagneticLink><Link to="/contact">Contact Terry <ArrowUpRight size={15} /></Link></div>
        </div>
      </section>
    </>
  );
}

export const Pages = {
  HomePage,
  ProblemsPage,
  ProblemDetailPage,
  ServicesPage,
  ServiceDetailPage,
  CaseNotesPage,
  AboutPage,
  ResourcesPage,
  ContactPage,
  PolicyPage,
  NotFoundPage,
};