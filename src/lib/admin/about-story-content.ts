export type AdminStoryMedia = {
  src: string;
  alt: string;
  caption: string;
};

export type AdminStoryTextItem = {
  id: string;
  text: string;
};

export type AdminStoryCard = {
  id: string;
  title: string;
  copy: string;
};

export type AdminAboutStoryContent = {
  hero: {
    eyebrow: string;
    title: string;
    lede: string;
    primaryCtaLabel: string;
    primaryCtaHref: string;
    secondaryCtaLabel: string;
    secondaryCtaHref: string;
    media: AdminStoryMedia;
  };
  pillars: AdminStoryCard[];
  positioning: { eyebrow: string; heading: string; rows: AdminStoryCard[] };
  founder: { sectionNumber: string; heading: string; paragraphs: AdminStoryTextItem[]; media: AdminStoryMedia };
  principles: { eyebrow: string; heading: string; body: string; media: AdminStoryMedia; items: AdminStoryCard[] };
  roots: { eyebrow: string; heading: string; paragraphs: AdminStoryTextItem[]; media: AdminStoryMedia };
  guestCare: { eyebrow: string; heading: string; media: AdminStoryMedia; steps: AdminStoryCard[] };
  standards: { eyebrow: string; heading: string; body: string; media: AdminStoryMedia; items: AdminStoryTextItem[] };
  closingCta: { eyebrow: string; heading: string; body: string; label: string; href: string };
};

export const defaultAdminAboutStoryContent: AdminAboutStoryContent = {
  hero: {
    eyebrow: "Our story",
    title: "A retreat brand built around trust, rhythm and inner return",
    lede: "Shreevan Wellness was created by Isha Dutta for people who need more than a beautiful escape. It is a structured space for reconnection on the sacred banks of Maa Ganga in Rishikesh, India.",
    primaryCtaLabel: "Book consultation",
    primaryCtaHref: "/book-consultation",
    secondaryCtaLabel: "Explore programs",
    secondaryCtaHref: "/programs/28-day-inner-awakening",
    media: { src: "/images/home/founder.jpg", alt: "Founder Isha Dutta", caption: "Founder portrait, Ganga-side moment or calm retreat welcome image" },
  },
  pillars: [
    { id: "story-pillar-roots", title: "Rooted in Rishikesh", copy: "The retreat experience is shaped by the sacred rhythm of Maa Ganga, yogic practice and quiet daily structure." },
    { id: "story-pillar-seekers", title: "Built for serious seekers", copy: "Shreevan is for guests who want meaningful lifestyle recalibration, not a rushed wellness holiday." },
    { id: "story-pillar-care", title: "Held responsibly", copy: "The brand keeps wellness education separate from medical advice, cure claims or pressure-based selling." },
  ],
  positioning: {
    eyebrow: "Clear positioning",
    heading: "Calm, credible and specific by design",
    rows: [
      { id: "positioning-is", title: "What Shreevan Wellness is", copy: "A professionally managed, premium Indian wellness-retreat brand for professionals, founders, serious practitioners and life-transition seekers who want structure, practice and space to return with greater clarity." },
      { id: "positioning-not", title: "What Shreevan Wellness is not", copy: "It is not a medical centre, religious ashram, luxury spa vacation, budget yoga holiday or a brand built on fear, shame, fake urgency or guaranteed-healing claims." },
    ],
  },
  founder: {
    sectionNumber: "01 Founder intention",
    heading: "The work begins with making the space feel safe",
    paragraphs: [
      { id: "founder-1", text: "For a guest travelling from the US, Canada or the UK, trust is not created by big spiritual claims. It is created by clarity: who is guiding the experience, what the rhythm looks like, what is included, what is not promised and how questions are handled." },
      { id: "founder-2", text: "Isha's role is to shape Shreevan as a grounded wellness platform where traditional practices are presented with respect, boundaries and practical guest care." },
    ],
    media: { src: "/images/about/founder-intention-journal.jpeg", alt: "Founder intention notes and retreat planning materials on a wooden table", caption: "Founder intention" },
  },
  principles: {
    eyebrow: "What guides the brand",
    heading: "A premium retreat should feel calm before the guest arrives",
    body: "The story is not only about the founder. It is about the standard of care that every program, modality and consultation should follow.",
    media: { src: "/images/about/founder-principles-practice-cues.jpeg", alt: "Practice cues for awareness, breath, stillness and integration displayed in a retreat practice space", caption: "Practice cues" },
    items: [
      { id: "principle-structure", title: "Structure over intensity", copy: "Depth is created through rhythm, consistency and guided reflection, not by overwhelming the guest." },
      { id: "principle-fit", title: "Human fit before payment", copy: "Every serious enquiry should move through a suitability conversation before travel or commitment." },
      { id: "principle-care", title: "Traditional practice, modern care", copy: "Yoga, meditation, sattvic living and reflection are supported by clear communication and guest-care standards." },
      { id: "principle-international", title: "International clarity", copy: "US, Canada and UK guests should understand stay, food, travel, boundaries and support before arriving." },
    ],
  },
  roots: {
    eyebrow: "Rishikesh roots",
    heading: "The location is part of the experience, not a background detail",
    paragraphs: [
      { id: "roots-1", text: "Shreevan Wellness belongs to the spiritual landscape of Rishikesh. The setting supports slower mornings, reflective practice, sattvic food and a sense of distance from ordinary pressure." },
      { id: "roots-2", text: "The page should eventually be supported with real photographs of the stay, practice spaces, meals, approach road and surrounding nature, so international guests can judge comfort and safety without guessing." },
    ],
    media: { src: "/images/about/rishikesh-roots-origin.jpeg", alt: "Open retreat practice corridor in Rishikesh with mats facing the mountain and river landscape", caption: "Rishikesh roots" },
  },
  guestCare: {
    eyebrow: "Guest care pathway",
    heading: "A serious retreat needs a clear support rhythm",
    media: { src: "/images/about/guest-care-pathway.jpeg", alt: "International retreat guests in a calm guest-care conversation with a Shreevan facilitator", caption: "Guest-care pathway" },
    steps: [
      { id: "care-arrival", title: "Before arrival", copy: "The team clarifies goals, travel plans, dietary comfort, room expectations, program suitability and practical questions." },
      { id: "care-during", title: "During the retreat", copy: "Guests follow a paced daily rhythm with practice, meals, rest, reflection and facilitator-led check-ins where appropriate." },
      { id: "care-after", title: "After completion", copy: "The intention is not dependency. Guests leave with routines and reflections they can carry back into everyday life." },
    ],
  },
  standards: {
    eyebrow: "Responsible wellness",
    heading: "Trust grows when boundaries are visible",
    body: "Shreevan Wellness should never need exaggerated promises to convert the right guest. The page should communicate discernment, care and professionalism from the first read.",
    media: { src: "/images/about/responsible-wellness-standards.jpeg", alt: "Responsible wellness documents and guest-care materials arranged on a wooden retreat table", caption: "Responsible wellness standards" },
    items: [
      { id: "standard-credentials", text: "Founder and facilitator credentials should be shown clearly before launch." },
      { id: "standard-fit", text: "Program recommendations are based on readiness, not only duration or price." },
      { id: "standard-boundaries", text: "Health boundaries, disclaimers and emergency processes are communicated plainly." },
      { id: "standard-proof", text: "Real accommodation, food and location photography should support every claim." },
    ],
  },
  closingCta: {
    eyebrow: "Begin with a fit conversation",
    heading: "If the story resonates, the next step is a calm consultation",
    body: "The call should help both sides understand whether Shreevan is the right environment, duration and rhythm for the guest's current season of life.",
    label: "Book a consultation",
    href: "/book-consultation",
  },
};

function isRecord(value: unknown): value is Record<string, unknown> { return Boolean(value && typeof value === "object" && !Array.isArray(value)); }
function stringValue(value: unknown, fallback: string) { return typeof value === "string" ? value : fallback; }
function media(value: unknown, fallback: AdminStoryMedia): AdminStoryMedia { const input = isRecord(value) ? value : {}; return { src: typeof input.src === "string" && input.src.trim() !== "" ? input.src : fallback.src, alt: stringValue(input.alt, fallback.alt), caption: stringValue(input.caption, fallback.caption) }; }
function cards(value: unknown, fallback: AdminStoryCard[], prefix: string): AdminStoryCard[] { if (!Array.isArray(value)) return fallback; return value.map((item, index) => { const input = isRecord(item) ? item : {}; const itemFallback = fallback[index] ?? { id: `${prefix}-${index + 1}`, title: "New item", copy: "" }; return { id: stringValue(input.id, itemFallback.id), title: stringValue(input.title, itemFallback.title), copy: stringValue(input.copy, itemFallback.copy) }; }); }
function textItems(value: unknown, fallback: AdminStoryTextItem[], prefix: string): AdminStoryTextItem[] { if (!Array.isArray(value)) return fallback; return value.map((item, index) => { const input = isRecord(item) ? item : {}; const itemFallback = fallback[index] ?? { id: `${prefix}-${index + 1}`, text: "" }; return { id: stringValue(input.id, itemFallback.id), text: stringValue(input.text, itemFallback.text) }; }); }

export function normalizeAdminAboutStoryContent(value: unknown): AdminAboutStoryContent {
  const input = isRecord(value) ? value : {};
  const hero = isRecord(input.hero) ? input.hero : {};
  const positioning = isRecord(input.positioning) ? input.positioning : {};
  const founder = isRecord(input.founder) ? input.founder : {};
  const principles = isRecord(input.principles) ? input.principles : {};
  const roots = isRecord(input.roots) ? input.roots : {};
  const guestCare = isRecord(input.guestCare) ? input.guestCare : {};
  const standards = isRecord(input.standards) ? input.standards : {};
  const closingCta = isRecord(input.closingCta) ? input.closingCta : {};
  const fallback = defaultAdminAboutStoryContent;
  return {
    hero: { eyebrow: stringValue(hero.eyebrow, fallback.hero.eyebrow), title: stringValue(hero.title, fallback.hero.title), lede: stringValue(hero.lede, fallback.hero.lede), primaryCtaLabel: stringValue(hero.primaryCtaLabel, fallback.hero.primaryCtaLabel), primaryCtaHref: stringValue(hero.primaryCtaHref, fallback.hero.primaryCtaHref), secondaryCtaLabel: stringValue(hero.secondaryCtaLabel, fallback.hero.secondaryCtaLabel), secondaryCtaHref: stringValue(hero.secondaryCtaHref, fallback.hero.secondaryCtaHref), media: media(hero.media, fallback.hero.media) },
    pillars: cards(input.pillars, fallback.pillars, "story-pillar"),
    positioning: { eyebrow: stringValue(positioning.eyebrow, fallback.positioning.eyebrow), heading: stringValue(positioning.heading, fallback.positioning.heading), rows: cards(positioning.rows, fallback.positioning.rows, "positioning") },
    founder: { sectionNumber: stringValue(founder.sectionNumber, fallback.founder.sectionNumber), heading: stringValue(founder.heading, fallback.founder.heading), paragraphs: textItems(founder.paragraphs, fallback.founder.paragraphs, "founder"), media: media(founder.media, fallback.founder.media) },
    principles: { eyebrow: stringValue(principles.eyebrow, fallback.principles.eyebrow), heading: stringValue(principles.heading, fallback.principles.heading), body: stringValue(principles.body, fallback.principles.body), media: media(principles.media, fallback.principles.media), items: cards(principles.items, fallback.principles.items, "principle") },
    roots: { eyebrow: stringValue(roots.eyebrow, fallback.roots.eyebrow), heading: stringValue(roots.heading, fallback.roots.heading), paragraphs: textItems(roots.paragraphs, fallback.roots.paragraphs, "roots"), media: media(roots.media, fallback.roots.media) },
    guestCare: { eyebrow: stringValue(guestCare.eyebrow, fallback.guestCare.eyebrow), heading: stringValue(guestCare.heading, fallback.guestCare.heading), media: media(guestCare.media, fallback.guestCare.media), steps: cards(guestCare.steps, fallback.guestCare.steps, "guest-care") },
    standards: { eyebrow: stringValue(standards.eyebrow, fallback.standards.eyebrow), heading: stringValue(standards.heading, fallback.standards.heading), body: stringValue(standards.body, fallback.standards.body), media: media(standards.media, fallback.standards.media), items: textItems(standards.items, fallback.standards.items, "standard") },
    closingCta: { eyebrow: stringValue(closingCta.eyebrow, fallback.closingCta.eyebrow), heading: stringValue(closingCta.heading, fallback.closingCta.heading), body: stringValue(closingCta.body, fallback.closingCta.body), label: stringValue(closingCta.label, fallback.closingCta.label), href: stringValue(closingCta.href, fallback.closingCta.href) },
  };
}
