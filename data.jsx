// data.jsx — content + constants for The Optimized Human

// Stock photos: Unsplash IDs (men's health / performance / clinical)
const IMG = {
  hero:        "https://images.unsplash.com/photo-1581009146145-b5ef050c2e1e?auto=format&fit=crop&w=1400&q=80",  // fit man 40s
  heroAlt:     "https://images.unsplash.com/photo-1517836357463-d25dfeac3438?auto=format&fit=crop&w=1400&q=80",
  trt:         "https://images.unsplash.com/photo-1532187863486-abf9dbad1b69?auto=format&fit=crop&w=900&q=80",   // lab vials
  peptides:    "https://images.unsplash.com/photo-1559757175-5700dde675bc?auto=format&fit=crop&w=900&q=80",      // active man
  peptidesAlt: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?auto=format&fit=crop&w=900&q=80",
  metabolic:   "https://images.unsplash.com/photo-1534438327276-14e5300c3a48?auto=format&fit=crop&w=900&q=80",   // training
  recovery:    "https://images.unsplash.com/photo-1599058917212-d750089bc07e?auto=format&fit=crop&w=900&q=80",   // recovery
  consult:     "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?auto=format&fit=crop&w=1200&q=80",  // telehealth consult
  consultAlt:  "https://images.unsplash.com/photo-1612531386530-97286d97c2d2?auto=format&fit=crop&w=1200&q=80",
  exec:        "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=900&q=80",   // professional man
  nature:      "https://images.unsplash.com/photo-1465146344425-f00d5f5c8f07?auto=format&fit=crop&w=1600&q=80",
  portrait1:   "https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?auto=format&fit=crop&w=600&q=80",
  portrait2:   "https://images.unsplash.com/photo-1582750433449-648ed127bb54?auto=format&fit=crop&w=600&q=80",
  portrait3:   "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?auto=format&fit=crop&w=600&q=80",
  jay:         "https://images.unsplash.com/photo-1568602471122-7832951cc4c5?auto=format&fit=crop&w=600&q=80",
  blog1:       "https://images.unsplash.com/photo-1505751172876-fa1923c5c528?auto=format&fit=crop&w=800&q=80",
  blog2:       "https://images.unsplash.com/photo-1532187863486-abf9dbad1b69?auto=format&fit=crop&w=800&q=80",
  blog3:       "https://images.unsplash.com/photo-1517836357463-d25dfeac3438?auto=format&fit=crop&w=800&q=80",
  blog4:       "https://images.unsplash.com/photo-1559757148-5c350d0d3c56?auto=format&fit=crop&w=800&q=80",
};

const SERVICES = [
  {
    id: "trt",
    no: "01",
    title: "Testosterone optimization",
    blurb: "TRT done right — full panels, real protocols, ongoing titration.",
    detail: "Comprehensive hormone panels (Total + Free T, E2, SHBG, DHEA, LH, FSH, thyroid). Physician-supervised TRT protocols when clinically indicated, monitored and adjusted to your labs.",
    image: IMG.exec,
    treats: ["Low energy & drive", "Strength & recovery", "Focus & motivation", "Sexual health"],
    href: "services.html#trt",
  },
  {
    id: "peptides",
    no: "02",
    title: "Peptide therapy",
    blurb: "Targeted signaling for recovery, recomposition, and longevity.",
    detail: "Sermorelin, BPC-157, Ipamorelin, NAD+, MOTS-c, TB-500. Prescribed in research-backed dosing windows, paired with your hormone protocol.",
    image: IMG.peptides,
    treats: ["Recovery & sleep", "Body composition", "Cognitive function", "Joint & tissue repair"],
    href: "services.html#peptides",
  },
  {
    id: "metabolic",
    no: "03",
    title: "Metabolic & weight",
    blurb: "GLP-1 protocols with the labs and follow-up they require.",
    detail: "Tirzepatide, Semaglutide, and emerging Retatrutide programs for the man whose metabolism stopped cooperating. Paired with nutrition and metabolic monitoring.",
    image: IMG.metabolic,
    treats: ["Visceral fat reduction", "Insulin sensitivity", "Appetite regulation", "Sustained loss"],
    href: "services.html#metabolic",
  },
  {
    id: "thyroid",
    no: "04",
    title: "Thyroid & metabolic panel",
    blurb: "Full panel — not just TSH. Find the signal others miss.",
    detail: "TSH, Free T3, Free T4, Reverse T3, antibodies. The thyroid axis is where 'I eat clean and train and still feel like garbage' usually hides.",
    image: IMG.trt,
    treats: ["Persistent fatigue", "Stubborn weight", "Brain fog", "Cold intolerance"],
    href: "services.html#thyroid",
  },
  {
    id: "longevity",
    no: "05",
    title: "Longevity & performance",
    blurb: "The full optimization stack for the man playing the long game.",
    detail: "NAD+, methylene blue, mitochondrial support, advanced biomarkers, and quarterly re-testing. For the man who wants to perform at 50 like he did at 30.",
    image: IMG.recovery,
    treats: ["Cellular energy", "Cognitive longevity", "Cardiovascular markers", "Healthspan"],
    href: "services.html#longevity",
  },
];

const SYMPTOMS = [
  { id: "fatigue",  label: "I'm exhausted",            maps: ["trt", "thyroid", "longevity"] },
  { id: "weight",   label: "Stubborn weight",          maps: ["metabolic", "thyroid", "trt"] },
  { id: "drive",    label: "Lost my drive",            maps: ["trt", "longevity"] },
  { id: "sleep",    label: "Sleep is broken",          maps: ["peptides", "trt", "thyroid"] },
  { id: "libido",   label: "Low libido",               maps: ["trt"] },
  { id: "focus",    label: "Brain fog",                maps: ["thyroid", "trt", "peptides"] },
  { id: "recovery", label: "Slow recovery",            maps: ["peptides", "trt"] },
  { id: "compose",  label: "Can't recomp",             maps: ["trt", "peptides", "metabolic"] },
];

const PEPTIDES = [
  { name: "Sermorelin",     use: "GH secretagogue — recovery, sleep architecture", tone: "green" },
  { name: "BPC-157",        use: "Tissue repair, gut lining, joint integrity",      tone: "accent" },
  { name: "Ipamorelin",     use: "GH pulse support, lean recomposition",            tone: "ink"   },
  { name: "NAD+",           use: "Cellular energy, cognitive longevity",            tone: "green" },
  { name: "MOTS-c",         use: "Mitochondrial signaling, metabolic flexibility",  tone: "accent" },
  { name: "TB-500",         use: "Systemic repair, recovery from injury",           tone: "ink"   },
];

const QUIZ = [
  {
    id: "energy",
    q: "By 3pm most days, how do you feel?",
    a: [
      { v: 0, label: "Sharp and steady" },
      { v: 1, label: "Slight dip, manageable" },
      { v: 2, label: "Need caffeine or a nap" },
      { v: 3, label: "Wiped — running on fumes" },
    ],
  },
  {
    id: "drive",
    q: "Your drive and motivation lately?",
    a: [
      { v: 0, label: "Fired up, locked in" },
      { v: 1, label: "Mostly there" },
      { v: 2, label: "Flatter than it used to be" },
      { v: 3, label: "Gone — and I notice it" },
    ],
  },
  {
    id: "body",
    q: "Your body composition over the last 12 months:",
    a: [
      { v: 0, label: "Holding or improving" },
      { v: 1, label: "Subtle drift" },
      { v: 2, label: "Softer despite the work" },
      { v: 3, label: "Significant change, frustrating" },
    ],
  },
  {
    id: "sleep",
    q: "When did you last wake up actually rested?",
    a: [
      { v: 0, label: "This week" },
      { v: 1, label: "Within the month" },
      { v: 2, label: "Months ago" },
      { v: 3, label: "I genuinely can't remember" },
    ],
  },
];

const QUIZ_FULL = [
  ...QUIZ,
  {
    id: "libido",
    q: "Sexual health & libido over the last 6 months?",
    a: [
      { v: 0, label: "No concerns" },
      { v: 1, label: "Mild drift" },
      { v: 2, label: "Noticeable change" },
      { v: 3, label: "Significant change" },
    ],
  },
  {
    id: "recovery",
    q: "Recovery from training or a hard week:",
    a: [
      { v: 0, label: "Bounces back fast" },
      { v: 1, label: "Takes a bit longer" },
      { v: 2, label: "Lingers for days" },
      { v: 3, label: "Feels permanent" },
    ],
  },
  {
    id: "focus",
    q: "Focus and mental sharpness at work?",
    a: [
      { v: 0, label: "Dialed in" },
      { v: 1, label: "Some off days" },
      { v: 2, label: "More fog than I'd like" },
      { v: 3, label: "I don't feel like myself" },
    ],
  },
];

const RESULTS = {
  low:  { band: "Baseline",    copy: "Your symptoms are mild. A baseline panel and a few targeted inputs will catch anything early and keep you ahead of it." },
  mid:  { band: "Drifting",    copy: "Several markers point to hormonal drift. A full panel will pinpoint which axis is involved before it compounds." },
  high: { band: "Significant", copy: "Your symptoms map closely to hormonal imbalance. We'd recommend a comprehensive panel and a one-on-one consult to build your protocol." },
};

const PROCESS = [
  { n: "01", t: "Consult",       d: "A real intake with a provider. No fifteen-minute insurance visit — flat self-pay pricing and time to actually talk." },
  { n: "02", t: "Panel",         d: "Comprehensive labs (hormonal, metabolic, thyroid, inflammation). Drawn locally or shipped to your door." },
  { n: "03", t: "Protocol",      d: "A written plan: therapies, dosing windows, lifestyle inputs, and the timeline for when you'll feel it." },
  { n: "04", t: "Recalibration", d: "We measure, adjust, and re-test. Ongoing optimization, not a one-and-done prescription." },
];

const STATS = [
  { k: "Men only", v: "Built for one patient, not everyone" },
  { k: "48hr",     v: "Median time to first appointment" },
  { k: "Self-pay", v: "Transparent pricing, no insurance" },
  { k: "Telehealth", v: "Care from anywhere in-state" },
];

const PROVIDERS = [
  {
    name: "Jay Soileau",
    role: "Founder · The Optimized Human",
    bio: "Built TOH after living the exact problem it solves: high-performing, gassed out, and tired of clinics that hand you a script and rush you out. Runs the brand, the standard, and the experience. Not your prescriber — that's by design.",
    image: IMG.jay,
    creds: ["Founder", "Men's optimization", "The standard"],
  },
  {
    name: "Medical Director, DO",
    role: "Medical Director · Hormone & Longevity",
    bio: "Board-certified, leads the clinical protocols and prescribing oversight. Years building hormone and peptide protocols for men who want to perform, not just pass a physical.",
    image: IMG.portrait1,
    creds: ["DO", "Board-certified", "BHRT clinical"],
  },
  {
    name: "Nurse Practitioner, NP-C",
    role: "Provider · Men's Health & TRT",
    bio: "Specialist in testosterone optimization and metabolic protocols. Reads a lab panel like a coach reads game tape and builds the plan around where you're actually trying to go.",
    image: IMG.portrait2,
    creds: ["MSN", "AANP Certified", "TRT protocols"],
  },
];

const POSTS = [
  {
    cat: "Hormones",
    title: "Why your 'normal' testosterone result might still be the problem",
    excerpt: "A lab flagging you 'in range' isn't the same as optimal. Here's the panel we run, what Free T and SHBG actually tell us, and why the reference range is a floor, not a target.",
    date: "May 18, 2026",
    read: "7 min",
    image: IMG.blog1,
  },
  {
    cat: "Peptides",
    title: "Sermorelin vs. injectable GH: what the research actually says",
    excerpt: "Sermorelin is a growth-hormone secretagogue, not GH itself. The mechanism matters — for safety, for tapering, and for who's even a candidate.",
    date: "May 04, 2026",
    read: "9 min",
    image: IMG.blog2,
  },
  {
    cat: "Metabolic",
    title: "Tirzepatide, plateaus, and the protocol most clinics get wrong",
    excerpt: "GLP-1 plateaus aren't failure — they're a signal. We walk through the dose-titration framework and the labs we re-run at each transition.",
    date: "Apr 22, 2026",
    read: "6 min",
    image: IMG.blog3,
  },
  {
    cat: "Longevity",
    title: "NAD+, methylene blue, and the mitochondrial stack — sorted",
    excerpt: "Two of the most-asked-about longevity therapies, plus what we're seeing in patient panels after 90 days on protocol.",
    date: "Apr 09, 2026",
    read: "11 min",
    image: IMG.blog4,
  },
];

Object.assign(window, {
  IMG, SERVICES, SYMPTOMS, PEPTIDES, QUIZ, QUIZ_FULL, RESULTS, PROCESS, STATS, PROVIDERS, POSTS,
});
