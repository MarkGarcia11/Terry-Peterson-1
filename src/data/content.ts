export const SITE = {
  name: "Terry Petterson Coatings Consultant",
  person: "Terry Petterson",
  email: "tepowder@msn.com",
  phone: "(815) 545-7709",
  tel: "+18155457709",
  sms: "+18155457709",
  address: "21635 Nadia Dr., Shorewood, IL 60404",
  street: "21635 Nadia Dr.",
  city: "Shorewood",
  region: "IL",
  postalCode: "60404",
  country: "US",
  experience: "12 years",
};

export type Photo = {
  src: string;
  alt: string;
  position?: string;
};

// Replace these image sources with Terry's own shop photography when available.
export const photos = {
  hero: {
    src: "https://images.pexels.com/photos/36215202/pexels-photo-36215202.jpeg?auto=compress&cs=tinysrgb",
    alt: "A technician applying powder coating to metal parts in a working shop.",
    position: "center 48%",
  },
  booth: {
    src: "https://images.pexels.com/photos/36184235/pexels-photo-36184235.jpeg?auto=compress&cs=tinysrgb",
    alt: "Industrial powder coating work in progress inside a production workshop.",
    position: "center 54%",
  },
  hangingParts: {
    src: "https://images.pexels.com/photos/15016527/pexels-photo-15016527.jpeg?auto=compress&cs=tinysrgb",
    alt: "Metal parts hanging in a production setting, ready for finishing.",
  },
  inspection: {
    src: "https://images.pexels.com/photos/33559565/pexels-photo-33559565.jpeg?auto=compress&cs=tinysrgb",
    alt: "A technician's hands carefully inspecting a precision metal component.",
  },
  spray: {
    src: "https://images.pexels.com/photos/36215204/pexels-photo-36215204.jpeg?auto=compress&cs=tinysrgb",
    alt: "A worker applying a coating to a large metal structure in a factory.",
    position: "center 42%",
  },
  parts: {
    src: "https://images.pexels.com/photos/5336994/pexels-photo-5336994.jpeg?auto=compress&cs=tinysrgb",
    alt: "A close view of metal pipes and their surface details.",
  },
  detail: {
    src: "https://images.pexels.com/photos/14615263/pexels-photo-14615263.jpeg?auto=compress&cs=tinysrgb",
    alt: "Close-up finishing work on a metal surface in a workshop.",
  },
} satisfies Record<string, Photo>;

export type FAQ = { question: string; answer: string };

export type Problem = {
  slug: string;
  title: string;
  shortTitle: string;
  path: string;
  eyebrow: string;
  headline: string;
  intro: string;
  image: Photo;
  symptoms: string[];
  causes: string[];
  approach: string[];
  outcome: string;
  faqs: FAQ[];
};

export const problems: Problem[] = [
  {
    slug: "grounding",
    title: "Grounding problems",
    shortTitle: "Grounding",
    path: "/problems/grounding",
    eyebrow: "POWDER COATING GROUNDING PROBLEMS",
    headline: "Poor grounding can make a good setup feel unpredictable.",
    intro:
      "If coverage changes from part to part, or powder will not wrap into a recess, I look at the path between the part and ground before changing everything else.",
    image: photos.hangingParts,
    symptoms: [
      "The near side coats well, but the back side or recesses stay thin.",
      "Transfer changes as parts move down the conveyor.",
      "Rough, cratered areas appear where the electric field is strongest.",
      "Operators keep increasing powder or changing gun settings to compensate.",
    ],
    causes: [
      "Painted-over hooks, dirty contact points, or a weak path through the rack.",
      "Part spacing, shape, or hang angle that changes how the field reaches the surface.",
      "Gun settings that are fighting the part geometry rather than helping it.",
    ],
    approach: [
      "Trace the ground path from the part through its contact point, hook, rack, and conveyor.",
      "Watch the same part being coated and note where coverage changes.",
      "Make controlled adjustments so the team can see which change actually helped.",
    ],
    outcome:
      "The goal is steadier transfer and a repeatable way for operators to check the ground path, not another setting that only works for one run.",
    faqs: [
      {
        question: "How can I tell if grounding is behind poor wrap?",
        answer:
          "Look for coverage that changes with part contact, hook condition, or rack position. Those clues do not prove a ground issue, but they tell us where to inspect first.",
      },
      {
        question: "Should I change the gun settings first?",
        answer:
          "Usually I check the part-to-ground path and the way the part is presented first. Changing settings before that can hide the real cause and create another variable.",
      },
    ],
  },
  {
    slug: "cleaning",
    title: "Part cleaning and pretreatment",
    shortTitle: "Part cleaning",
    path: "/problems/cleaning",
    eyebrow: "POWDER COATING CLEANING AND PRETREATMENT",
    headline: "A clean-looking part can still carry a coating problem.",
    intro:
      "Fisheyes, adhesion failures, residue, or a finish that varies by shift can start well before the powder gun. I follow the part from incoming condition through wash, rinse, dry, and cure.",
    image: photos.parts,
    symptoms: [
      "Small craters or fisheyes appear even when the powder looks right.",
      "Adhesion varies between parts, batches, or production shifts.",
      "Water marks, cleaner residue, or inconsistent drying show up after the wash.",
      "A new material, lubricant, or upstream process changes the result.",
    ],
    causes: [
      "Oil, silicone, or process residue that survives the current cleaning sequence.",
      "Wash chemistry, temperature, spray coverage, or rinse quality that has drifted.",
      "Parts that do not drain or dry consistently before coating.",
    ],
    approach: [
      "Map each stage the part passes through, including handling between stages.",
      "Compare a good part with a problem part and look for differences before coating.",
      "Check the wash and dry conditions in context, then change one part of the process at a time.",
    ],
    outcome:
      "The team gets a clearer cleaning standard and a practical way to recognize when the surface is ready for powder.",
    faqs: [
      {
        question: "Why do fisheyes appear in a powder-coated finish?",
        answer:
          "Fisheyes often point to contamination or a surface that the coating cannot wet evenly. Oil, silicone, residue, and handling are possible sources, so I trace the part's path instead of assuming one cause.",
      },
      {
        question: "Can poor pretreatment cause adhesion failure?",
        answer:
          "Yes. Cleaning, rinse quality, surface condition, and drying all affect what the powder is applied to. The right check depends on the material and the pretreatment line.",
      },
    ],
  },
  {
    slug: "powder-use",
    title: "Excessive powder consumption",
    shortTitle: "Powder consumption",
    path: "/problems/powder-use",
    eyebrow: "REDUCE POWDER CONSUMPTION",
    headline: "When powder use keeps climbing, look beyond the gun.",
    intro:
      "High usage can come from overspray, poor recovery, unnecessary film build, or the way parts are spaced and presented. I help find where good powder is leaving the process without adding value.",
    image: photos.spray,
    symptoms: [
      "The booth consumes more powder than the finished parts seem to justify.",
      "Overspray or reclaim is high, and too much material ends up as waste.",
      "Film build varies, so some areas are over-coated while others need touch-up.",
      "Powder cost per part is hard to explain or keeps changing.",
    ],
    causes: [
      "Application settings, part spacing, or gun position that send powder past the part.",
      "Recovery practices or housekeeping that make reusable powder difficult to manage.",
      "Film thickness targets or touch-up habits that have grown without a clear reason.",
    ],
    approach: [
      "Observe a normal run and follow powder from feed to application, recovery, and waste.",
      "Look at part presentation, gun movement, and the finish the part actually needs.",
      "Identify practical adjustments the team can monitor without slowing production unnecessarily.",
    ],
    outcome:
      "A clearer picture of where powder goes, with process changes aimed at reducing waste and rework while protecting finish quality.",
    faqs: [
      {
        question: "Can powder consumption improve without changing powder?",
        answer:
          "Often there are process factors to check first, such as application, part spacing, recovery, and film build. Whether a change is suitable depends on the line and the finish specification.",
      },
      {
        question: "Do you promise a specific powder saving?",
        answer:
          "No. I do not promise a number before seeing the process. I help identify what is happening and what changes are reasonable to test.",
      },
    ],
  },
  {
    slug: "unusual",
    title: "Industry-specific and unusual problems",
    shortTitle: "Something unusual",
    path: "/problems/unusual",
    eyebrow: "INDUSTRY-SPECIFIC COATING PROBLEMS",
    headline: "Some coating problems do not fit a standard checklist.",
    intro:
      "A new material, a difficult-to-clean component, or a problem that only appears under a particular set of conditions needs patient observation. I start with what is different about your parts and process.",
    image: photos.inspection,
    symptoms: [
      "The issue affects one part family, material, or customer requirement.",
      "A problem appears only after a process change or under a specific run condition.",
      "The usual adjustments have not explained why the finish changes.",
      "The cleaning or coating challenge has requirements beyond a typical job-shop part.",
    ],
    causes: [
      "A part-specific feature or residue that changes how it cleans or coats.",
      "Several small process differences combining to create one visible defect.",
      "A standard operating assumption that does not fit this product or requirement.",
    ],
    approach: [
      "Listen to the people who see the issue and establish when it does and does not happen.",
      "Compare the affected part with a known-good part, including its cleaning and handling path.",
      "Build a focused test around the actual requirement, then document what the team learns.",
    ],
    outcome:
      "A grounded explanation of the issue and a process your team can repeat, even when the problem is specific to one product or industry.",
    faqs: [
      {
        question: "Can you help with a problem that is not listed here?",
        answer:
          "Yes. The examples on this site are common starting points, not a limit. Tell me what is happening, what you have already tried, and what the part needs to meet.",
      },
      {
        question: "Do you work with aerospace coating operations?",
        answer:
          "I have worked through a difficult cleaning challenge for an aerospace client. Each operation and requirement is different, so I would want to understand your process before suggesting a next step.",
      },
    ],
  },
];

export type Service = {
  slug: string;
  title: string;
  path: string;
  eyebrow: string;
  headline: string;
  short: string;
  intro: string;
  image: Photo;
  who: string[];
  expect: string[];
  process: string[];
};

export const services: Service[] = [
  {
    slug: "troubleshooting",
    title: "Coating troubleshooting",
    path: "/services/troubleshooting",
    eyebrow: "SERVICE 01 / TROUBLESHOOTING",
    headline: "Find the cause before changing the whole line.",
    short: "A clear look at the defect, the process, and what to try next.",
    intro:
      "When a finish goes wrong, I work alongside your team to trace the symptom back through the process. The aim is a plain explanation and a sensible next step, not a list of guesses.",
    image: photos.booth,
    who: [
      "Plant managers and supervisors dealing with recurring quality issues.",
      "Quality teams trying to separate a one-off defect from a process pattern.",
      "Owners who need a second set of experienced eyes on their coating line.",
    ],
    expect: [
      "A focused conversation about the symptom, recent changes, and what has already been tried.",
      "A practical review of the part, its process path, and the coating conditions involved.",
      "Clear findings and next steps that your operators can understand and use.",
    ],
    process: [
      "Describe what you are seeing and share photos or process details if available.",
      "We agree what to examine first and whether an on-site or remote review makes sense.",
      "I work through the evidence with your team and explain the next useful test or correction.",
    ],
  },
  {
    slug: "training",
    title: "Team training",
    path: "/services/training",
    eyebrow: "SERVICE 02 / TEAM TRAINING",
    headline: "Give operators a reason behind every adjustment.",
    short: "Training that connects the settings to what operators see on the part.",
    intro:
      "Good coating work depends on people noticing small changes and knowing what they mean. I help operators and supervisors build practical understanding around your equipment, parts, and day-to-day process.",
    image: photos.inspection,
    who: [
      "Operators who are new to powder coating or ready to build stronger fundamentals.",
      "Supervisors who need a consistent way to coach coating decisions.",
      "Teams working through repeat defects, setup changes, or process updates.",
    ],
    expect: [
      "Training shaped around the work your team actually runs.",
      "Plain explanations of grounding, application, cleaning, and finish checks.",
      "Time for questions and examples from your parts and production conditions.",
    ],
    process: [
      "We talk through who needs training and what they need to do with it.",
      "Format is agreed together: on-site or remote, depending on the operation and topic.",
      "I explain the why as well as the how, so the knowledge stays with your team.",
    ],
  },
  {
    slug: "process-improvement",
    title: "Efficiency and process improvement",
    path: "/services/process-improvement",
    eyebrow: "SERVICE 03 / PROCESS IMPROVEMENT",
    headline: "Make a good finish easier to repeat.",
    short: "Practical changes to reduce waste, rework, and avoidable variation.",
    intro:
      "A coating line is a chain of connected decisions. I look at the whole path, from part preparation to application and cure, to find where small improvements can make the work more consistent.",
    image: photos.spray,
    who: [
      "Operations seeing unnecessary powder use, touch-up, or rework.",
      "Teams who want a process that holds up across operators and shifts.",
      "Shops preparing for a change in product mix, equipment, or workflow.",
    ],
    expect: [
      "A grounded review of the current workflow and the finish it needs to produce.",
      "A short list of practical opportunities, ordered by what can be tested first.",
      "Changes your team can observe and maintain without adding unnecessary complexity.",
    ],
    process: [
      "We define what needs to work better and how the team will recognize progress.",
      "I observe the process and trace the opportunities across its connected stages.",
      "We agree what to test, make the change, and capture the learning for the team.",
    ],
  },
];

// CMS-ready question records. New articles can use the same id, category, and answer shape.
export const resources: Array<FAQ & { id: string; category: string }> = [
  {
    id: "poor-wrap",
    category: "Grounding",
    question: "Why does my powder wrap poorly?",
    answer:
      "Poor wrap can come from a weak or inconsistent ground path, part spacing, part shape, or settings that do not suit the geometry. I usually start by checking how the part contacts its hook and rack, then watch the same part being coated before adjusting the gun.",
  },
  {
    id: "fisheyes",
    category: "Cleaning",
    question: "What causes fisheyes in a powder-coated finish?",
    answer:
      "Fisheyes are small areas where the coating pulls away rather than flowing evenly. Surface contamination is a common place to investigate, including oil, silicone, residue, and handling. The useful question is where that contamination could enter the part's process path.",
  },
  {
    id: "adhesion",
    category: "Cleaning",
    question: "Can pretreatment affect powder-coating adhesion?",
    answer:
      "Yes. The condition of the surface, cleaning and rinse stages, and drying all affect what the powder is applied to. The right checks depend on the substrate and the pretreatment system in use.",
  },
  {
    id: "powder-use",
    category: "Powder use",
    question: "How can I reduce powder consumption?",
    answer:
      "First understand where the powder goes. Application technique, part presentation, overspray recovery, film build, and touch-up can all matter. A useful improvement protects the required finish rather than reducing material blindly.",
  },
  {
    id: "orange-peel",
    category: "Finish quality",
    question: "Why does powder coating look like orange peel?",
    answer:
      "A textured finish can relate to film build, powder flow, cure conditions, substrate, or application. Compare a good part and a problem part, then check the process conditions that differ before changing multiple settings at once.",
  },
  {
    id: "remote-help",
    category: "Working together",
    question: "Can you help before visiting our plant?",
    answer:
      "We can start with a call, photos, and a description of the part and process. That first conversation helps us decide whether a remote review is useful or an on-site look would be better.",
  },
];

export const navigation = [
  { label: "Problems", path: "/problems" },
  { label: "Services", path: "/services" },
  { label: "Case notes", path: "/case-notes" },
  { label: "About Terry", path: "/about" },
  { label: "Resources", path: "/resources" },
];