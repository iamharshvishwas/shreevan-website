import { mkdir, readFile, writeFile } from "node:fs/promises";
import { dirname, extname, join } from "node:path";
import { randomUUID } from "node:crypto";

export type AdminHomeMediaKind = "" | "image" | "video";

export type AdminHomeMedia = {
  kind: AdminHomeMediaKind;
  src: string;
  alt: string;
  caption: string;
  placeholder: string;
};

export type AdminHomeTextItem = {
  id: string;
  text: string;
};

export type AdminHomeTitleCopyItem = {
  id: string;
  title: string;
  copy: string;
};

export type AdminHomeTaggedCard = AdminHomeTitleCopyItem & {
  tag: string;
};

export type AdminHomeProgramItem = AdminHomeTitleCopyItem & {
  href: string;
  duration: string;
  summary: string;
  outcome: string;
  label: string;
};

export type AdminHomeDifferentiationCard = AdminHomeTitleCopyItem & {
  highlighted: boolean;
};

export type AdminHomeTestimonial = {
  id: string;
  quote: string;
  attribution: string;
};

export type AdminHomeContentStore = {
  updatedAt: string;
  hero: {
    eyebrow: string;
    title: string;
    lede: string;
    primaryCtaLabel: string;
    primaryCtaHref: string;
    secondaryCtaLabel: string;
    secondaryCtaHref: string;
    trustItems: AdminHomeTextItem[];
  };
  mediaBand: {
    media: AdminHomeMedia;
  };
  proofStrip: {
    items: AdminHomeTitleCopyItem[];
  };
  intro: {
    sectionNumber: string;
    heading: string;
    paragraphs: AdminHomeTextItem[];
  };
  programPathways: {
    eyebrow: string;
    heading: string;
    copy: string;
    items: AdminHomeProgramItem[];
  };
  differentiation: {
    eyebrow: string;
    heading: string;
    cards: AdminHomeDifferentiationCard[];
  };
  rhythm: {
    eyebrow: string;
    heading: string;
    body: string;
    items: AdminHomeTextItem[];
  };
  team: {
    eyebrow: string;
    heading: string;
    body: string;
    media: AdminHomeMedia;
    bullets: AdminHomeTextItem[];
  };
  travel: {
    eyebrow: string;
    heading: string;
    body: string;
    cards: AdminHomeTaggedCard[];
  };
  location: {
    eyebrow: string;
    heading: string;
    body: string;
    media: AdminHomeMedia;
    cards: AdminHomeTitleCopyItem[];
  };
  testimonials: {
    eyebrow: string;
    heading: string;
    items: AdminHomeTestimonial[];
  };
  consultation: {
    eyebrow: string;
    heading: string;
    body: string;
    ctaLabel: string;
    ctaHref: string;
    steps: AdminHomeTitleCopyItem[];
  };
  leadForm: {
    eyebrow: string;
    heading: string;
    body: string;
  };
};

const HOME_CONTENT_PATH = join(process.cwd(), "data", "admin", "home-content.json");
const HOME_UPLOAD_DIR = join(process.cwd(), "public", "uploads", "home");
const HOME_UPLOAD_URL_BASE = "/uploads/home";
const MAX_UPLOAD_BYTES = 20 * 1024 * 1024;

const allowedUploadTypes = new Map<string, { extension: string; kind: Exclude<AdminHomeMediaKind, ""> }>([
  ["image/jpeg", { extension: ".jpg", kind: "image" }],
  ["image/png", { extension: ".png", kind: "image" }],
  ["image/webp", { extension: ".webp", kind: "image" }],
  ["image/gif", { extension: ".gif", kind: "image" }],
  ["video/mp4", { extension: ".mp4", kind: "video" }],
  ["video/webm", { extension: ".webm", kind: "video" }],
  ["video/quicktime", { extension: ".mov", kind: "video" }],
]);

export const defaultAdminHomeContent: AdminHomeContentStore = {
  updatedAt: "2026-06-21T00:00:00.000Z",
  hero: {
    eyebrow: "Premium wellness retreats in India",
    title: "Return to Your True Self",
    lede:
      "Structured retreat experiences for professionals, founders, serious practitioners and life-transition seekers who want space, rhythm and guided reconnection.",
    primaryCtaLabel: "Book a consultation",
    primaryCtaHref: "#consultation",
    secondaryCtaLabel: "Explore programs",
    secondaryCtaHref: "#programs",
    trustItems: [
      { id: "hero-trust-1", text: "Consultation-first enrolment" },
      { id: "hero-trust-2", text: "International guest ready" },
      { id: "hero-trust-3", text: "Responsible wellness boundaries" },
    ],
  },
  mediaBand: {
    media: {
      kind: "",
      src: "",
      alt: "",
      caption: "Real retreat setting, accommodation, practice space, meals or soft morning nature.",
      placeholder: "Image slot",
    },
  },
  proofStrip: {
    items: [
      {
        id: "proof-1",
        title: "Clear programs",
        copy: "3, 7, 14, 28 and future 60-day pathways",
      },
      {
        id: "proof-2",
        title: "Human-led fit check",
        copy: "Consultation before commitment",
      },
      {
        id: "proof-3",
        title: "International reassurance",
        copy: "Travel, stay, food and safety clarity",
      },
      {
        id: "proof-4",
        title: "Responsible wellness",
        copy: "No cure or guaranteed transformation claims",
      },
    ],
  },
  intro: {
    sectionNumber: "01 The intent",
    heading: "A calmer way to begin again",
    paragraphs: [
      {
        id: "intro-1",
        text:
          "Shreevan Wellness is for people who do not need more noise, pressure or quick fixes. They need space, structure, guidance and a clear rhythm that supports reconnection.",
      },
      {
        id: "intro-2",
        text:
          "The experience is grounded in yoga, meditation, sattvic living, reflection and nature, while clearly distinguishing wellness education from medical advice.",
      },
    ],
  },
  programPathways: {
    eyebrow: "Program pathways",
    heading: "Choose the depth of your reset",
    copy:
      "All programs matter. The 28-day immersive reset is the signature offer, but shorter pathways help guests enter at the right level of readiness.",
    items: [
      {
        id: "program-3-day",
        title: "3-Day Ganga Sattva Reset",
        href: "/programs/3-day-ganga-reset",
        duration: "3 days",
        summary: "Best for a short pause and reconnection.",
        outcome: "A gentle return to breath, rhythm and perspective.",
        label: "",
        copy: "",
      },
      {
        id: "program-7-day",
        title: "7-Day Ganga Sattva Foundation",
        href: "/programs/7-day-foundation",
        duration: "7 days",
        summary: "Best for beginners who want structure and clarity.",
        outcome: "A practical base for everyday wellness practices.",
        label: "",
        copy: "",
      },
      {
        id: "program-14-day",
        title: "14-Day Ganga Sattva Transformation",
        href: "/programs/14-day-transformation",
        duration: "14 days",
        summary: "Best for a deeper mind-body-emotional reset.",
        outcome: "More time for practice, reflection and integration.",
        label: "",
        copy: "",
      },
      {
        id: "program-28-day",
        title: "28-Day Sattva Ganga Inner Awakening",
        href: "/programs/28-day-inner-awakening",
        duration: "28 days",
        summary: "Best for a complete structured retreat experience.",
        outcome: "A sustained reset with daily rhythm, guided practice and reflection.",
        label: "Signature",
        copy: "",
      },
      {
        id: "program-60-day",
        title: "60-Day Rishi Tantra Conscious Living Residency",
        href: "/programs/60-day-rishi-residency",
        duration: "60 days",
        summary: "Advanced residency for serious lifestyle reinvention.",
        outcome: "A conscious living residency with mentoring, service and integration.",
        label: "Advanced",
        copy: "",
      },
    ],
  },
  differentiation: {
    eyebrow: "What guests should understand",
    heading: "Make the retreat feel real before the call",
    cards: [
      {
        id: "diff-1",
        title: "Daily guided practice",
        copy: "Yoga, pranayama, meditation, Yoga Nidra and reflective practices.",
        highlighted: false,
      },
      {
        id: "diff-2",
        title: "Structured daily rhythm",
        copy: "Practice, workshops, meals, rest, journaling and sharing circles.",
        highlighted: false,
      },
      {
        id: "diff-3",
        title: "Sattvic meals",
        copy: "Simple vegetarian food with clear dietary guidance before arrival.",
        highlighted: false,
      },
      {
        id: "diff-4",
        title: "Accommodation clarity",
        copy: "Room photos, privacy level, amenities and stay expectations should be shown.",
        highlighted: false,
      },
      {
        id: "diff-5",
        title: "Integration support",
        copy: "Practical routines and tools that participants may continue after returning home.",
        highlighted: false,
      },
      {
        id: "diff-6",
        title: "Responsible boundary",
        copy: "No cure claim, therapy substitute or guaranteed transformation promise.",
        highlighted: true,
      },
    ],
  },
  rhythm: {
    eyebrow: "Retreat experience",
    heading: "A daily rhythm designed for clarity",
    body:
      "The day is intentionally paced between practice, learning, meals, rest and reflection. The experience should feel structured, not crowded.",
    items: [
      { id: "rhythm-1", text: "Morning yoga and pranayama" },
      { id: "rhythm-2", text: "Intention circle" },
      { id: "rhythm-3", text: "Workshop or learning session" },
      { id: "rhythm-4", text: "Sattvic meals" },
      { id: "rhythm-5", text: "Reflection and journaling" },
      { id: "rhythm-6", text: "Meditation or Yoga Nidra" },
      { id: "rhythm-7", text: "Evening sharing circle" },
    ],
  },
  team: {
    eyebrow: "Founder, team and responsible wellness",
    heading: "Trust starts with knowing who is holding the space",
    body:
      'Add founder credentials, facilitator experience, training, guest-care standards and how suitability concerns are handled. This keeps trust personal without turning the page into a heavy "why us" block.',
    media: {
      kind: "",
      src: "",
      alt: "",
      caption: "Founder, lead facilitator or retreat team portrait",
      placeholder: "Image slot",
    },
    bullets: [
      { id: "team-1", text: "Years of practice and relevant training" },
      { id: "team-2", text: "Professional retreat management standards" },
      { id: "team-3", text: "Clear wellness boundaries and guest-care process" },
      { id: "team-4", text: "Health disclaimer and suitability screening" },
    ],
  },
  travel: {
    eyebrow: "International visitor reassurance",
    heading: "A guest travelling from abroad needs practical confidence",
    body: "The page should answer the questions a US, Canada or UK visitor will silently ask before booking a consultation.",
    cards: [
      {
        id: "travel-1",
        tag: "Arrival",
        title: "Airport and transfer guidance",
        copy: "Nearest airport, travel time, arrival window and transfer support.",
      },
      {
        id: "travel-2",
        tag: "Stay",
        title: "Accommodation and daily life",
        copy: "Rooms, bathrooms, climate, laundry, quiet hours, internet policy and packing.",
      },
      {
        id: "travel-3",
        tag: "Food",
        title: "Sattvic meals explained plainly",
        copy: "Vegetarian food, caffeine, alcohol, spice level and dietary suitability.",
      },
      {
        id: "travel-4",
        tag: "Fit",
        title: "Suitability before payment",
        copy: "Goals, expectations, health context and whether the retreat is responsible for them.",
      },
    ],
  },
  location: {
    eyebrow: "Location and safety clarity",
    heading: "Trust increases when the place feels real",
    body:
      "Replace placeholder content with verified location details, guest support flow, policies and real photography before launch.",
    media: {
      kind: "image",
      src: "/images/home/location-safety-courtyard.webp",
      alt: "Quiet retreat courtyard with guest-care staff walking through the stay area",
      caption: "Retreat courtyard and stay setting",
      placeholder: "Image slot",
    },
    cards: [
      {
        id: "location-1",
        title: "Where guests stay",
        copy: "Room options, privacy, cleaning and basic amenities.",
      },
      {
        id: "location-2",
        title: "Who is available",
        copy: "On-site support and emergency contact process.",
      },
      {
        id: "location-3",
        title: "What policies apply",
        copy: "Health disclaimer, refund policy and code of conduct.",
      },
    ],
  },
  testimonials: {
    eyebrow: "Social proof placeholders",
    heading: "Use specific proof, not generic praise",
    items: [
      {
        id: "testimonial-1",
        quote: "The structure gave me space to slow down without feeling lost.",
        attribution: "Guest reflection placeholder",
      },
      {
        id: "testimonial-2",
        quote: "Add an international guest note about travel comfort, safety and support.",
        attribution: "International guest placeholder",
      },
      {
        id: "testimonial-3",
        quote: "Add operational proof that the retreat is professionally managed.",
        attribution: "Operational proof placeholder",
      },
    ],
  },
  consultation: {
    eyebrow: "Free suitability call",
    heading: "The consultation is the conversion point. Make it feel safe.",
    body:
      "Visitors should understand that the call is not a sales trap. It is a responsible fit conversation before travel, payment or commitment.",
    ctaLabel: "Book a free suitability call",
    ctaHref: "#suitability-form",
    steps: [
      {
        id: "consultation-1",
        title: "Understand your context",
        copy: "Goals, work pressure, travel plans, prior practice and current lifestyle.",
      },
      {
        id: "consultation-2",
        title: "Check suitability",
        copy: "Health boundaries, retreat expectations, food, schedule and comfort with the rhythm.",
      },
      {
        id: "consultation-3",
        title: "Recommend the next step",
        copy: "Program depth, booking path and what information you need before deciding.",
      },
    ],
  },
  leadForm: {
    eyebrow: "Request the call",
    heading: "Share a little context before we speak",
    body:
      "Keep this short. The goal is to route serious enquiries, understand country and program fit, and avoid asking for sensitive health details on the homepage.",
  },
};

function isRecord(value: unknown): value is Record<string, unknown> {
  return Boolean(value && typeof value === "object" && !Array.isArray(value));
}

function stringValue(value: unknown, fallback: string) {
  return typeof value === "string" ? value : fallback;
}

function booleanValue(value: unknown, fallback: boolean) {
  return typeof value === "boolean" ? value : fallback;
}

function mediaKindValue(value: unknown, fallback: AdminHomeMediaKind): AdminHomeMediaKind {
  return value === "image" || value === "video" || value === "" ? value : fallback;
}

function normalizeMedia(value: unknown, fallback: AdminHomeMedia): AdminHomeMedia {
  const input = isRecord(value) ? value : {};

  return {
    kind: mediaKindValue(input.kind, fallback.kind),
    src: stringValue(input.src, fallback.src),
    alt: stringValue(input.alt, fallback.alt),
    caption: stringValue(input.caption, fallback.caption),
    placeholder: stringValue(input.placeholder, fallback.placeholder),
  };
}

function normalizeTextItem(value: unknown, fallback: AdminHomeTextItem, index: number, prefix: string): AdminHomeTextItem {
  const input = isRecord(value) ? value : {};

  return {
    id: stringValue(input.id, fallback.id || `${prefix}-${index + 1}`),
    text: stringValue(input.text, fallback.text),
  };
}

function normalizeTitleCopyItem(
  value: unknown,
  fallback: AdminHomeTitleCopyItem,
  index: number,
  prefix: string,
): AdminHomeTitleCopyItem {
  const input = isRecord(value) ? value : {};

  return {
    id: stringValue(input.id, fallback.id || `${prefix}-${index + 1}`),
    title: stringValue(input.title, fallback.title),
    copy: stringValue(input.copy, fallback.copy),
  };
}

function normalizeProgramItem(
  value: unknown,
  fallback: AdminHomeProgramItem,
  index: number,
): AdminHomeProgramItem {
  const base = normalizeTitleCopyItem(value, fallback, index, "home-program");
  const input = isRecord(value) ? value : {};

  return {
    ...base,
    href: stringValue(input.href, fallback.href),
    duration: stringValue(input.duration, fallback.duration),
    summary: stringValue(input.summary, fallback.summary),
    outcome: stringValue(input.outcome, fallback.outcome),
    label: stringValue(input.label, fallback.label),
  };
}

function normalizeDifferentiationCard(
  value: unknown,
  fallback: AdminHomeDifferentiationCard,
  index: number,
): AdminHomeDifferentiationCard {
  const base = normalizeTitleCopyItem(value, fallback, index, "home-differentiation");
  const input = isRecord(value) ? value : {};

  return {
    ...base,
    highlighted: booleanValue(input.highlighted, fallback.highlighted),
  };
}

function normalizeTaggedCard(value: unknown, fallback: AdminHomeTaggedCard, index: number): AdminHomeTaggedCard {
  const base = normalizeTitleCopyItem(value, fallback, index, "home-travel");
  const input = isRecord(value) ? value : {};

  return {
    ...base,
    tag: stringValue(input.tag, fallback.tag),
  };
}

function normalizeTestimonial(value: unknown, fallback: AdminHomeTestimonial, index: number): AdminHomeTestimonial {
  const input = isRecord(value) ? value : {};

  return {
    id: stringValue(input.id, fallback.id || `home-testimonial-${index + 1}`),
    quote: stringValue(input.quote, fallback.quote),
    attribution: stringValue(input.attribution, fallback.attribution),
  };
}

function normalizeArray<T>(
  value: unknown,
  fallback: T[],
  normalize: (item: unknown, fallbackItem: T, index: number) => T,
  emptyFallback: T,
) {
  if (!Array.isArray(value)) {
    return fallback;
  }

  return value.map((item, index) => normalize(item, fallback[index] ?? emptyFallback, index));
}

export function normalizeAdminHomeContent(value: unknown): AdminHomeContentStore {
  const input = isRecord(value) ? value : {};
  const hero = isRecord(input.hero) ? input.hero : {};
  const mediaBand = isRecord(input.mediaBand) ? input.mediaBand : {};
  const proofStrip = isRecord(input.proofStrip) ? input.proofStrip : {};
  const intro = isRecord(input.intro) ? input.intro : {};
  const programPathways = isRecord(input.programPathways) ? input.programPathways : {};
  const differentiation = isRecord(input.differentiation) ? input.differentiation : {};
  const rhythm = isRecord(input.rhythm) ? input.rhythm : {};
  const team = isRecord(input.team) ? input.team : {};
  const travel = isRecord(input.travel) ? input.travel : {};
  const location = isRecord(input.location) ? input.location : {};
  const testimonials = isRecord(input.testimonials) ? input.testimonials : {};
  const consultation = isRecord(input.consultation) ? input.consultation : {};
  const leadForm = isRecord(input.leadForm) ? input.leadForm : {};

  return {
    updatedAt: stringValue(input.updatedAt, defaultAdminHomeContent.updatedAt),
    hero: {
      eyebrow: stringValue(hero.eyebrow, defaultAdminHomeContent.hero.eyebrow),
      title: stringValue(hero.title, defaultAdminHomeContent.hero.title),
      lede: stringValue(hero.lede, defaultAdminHomeContent.hero.lede),
      primaryCtaLabel: stringValue(hero.primaryCtaLabel, defaultAdminHomeContent.hero.primaryCtaLabel),
      primaryCtaHref: stringValue(hero.primaryCtaHref, defaultAdminHomeContent.hero.primaryCtaHref),
      secondaryCtaLabel: stringValue(hero.secondaryCtaLabel, defaultAdminHomeContent.hero.secondaryCtaLabel),
      secondaryCtaHref: stringValue(hero.secondaryCtaHref, defaultAdminHomeContent.hero.secondaryCtaHref),
      trustItems: normalizeArray(
        hero.trustItems,
        defaultAdminHomeContent.hero.trustItems,
        (item, fallback, index) => normalizeTextItem(item, fallback, index, "hero-trust"),
        { id: "", text: "" },
      ),
    },
    mediaBand: {
      media: normalizeMedia(mediaBand.media, defaultAdminHomeContent.mediaBand.media),
    },
    proofStrip: {
      items: normalizeArray(
        proofStrip.items,
        defaultAdminHomeContent.proofStrip.items,
        (item, fallback, index) => normalizeTitleCopyItem(item, fallback, index, "proof"),
        { id: "", title: "", copy: "" },
      ),
    },
    intro: {
      sectionNumber: stringValue(intro.sectionNumber, defaultAdminHomeContent.intro.sectionNumber),
      heading: stringValue(intro.heading, defaultAdminHomeContent.intro.heading),
      paragraphs: normalizeArray(
        intro.paragraphs,
        defaultAdminHomeContent.intro.paragraphs,
        (item, fallback, index) => normalizeTextItem(item, fallback, index, "intro"),
        { id: "", text: "" },
      ),
    },
    programPathways: {
      eyebrow: stringValue(programPathways.eyebrow, defaultAdminHomeContent.programPathways.eyebrow),
      heading: stringValue(programPathways.heading, defaultAdminHomeContent.programPathways.heading),
      copy: stringValue(programPathways.copy, defaultAdminHomeContent.programPathways.copy),
      items: normalizeArray(
        programPathways.items,
        defaultAdminHomeContent.programPathways.items,
        normalizeProgramItem,
        {
          id: "",
          title: "New program",
          href: "/programs",
          duration: "",
          summary: "",
          outcome: "",
          label: "",
          copy: "",
        },
      ),
    },
    differentiation: {
      eyebrow: stringValue(differentiation.eyebrow, defaultAdminHomeContent.differentiation.eyebrow),
      heading: stringValue(differentiation.heading, defaultAdminHomeContent.differentiation.heading),
      cards: normalizeArray(
        differentiation.cards,
        defaultAdminHomeContent.differentiation.cards,
        normalizeDifferentiationCard,
        { id: "", title: "New card", copy: "", highlighted: false },
      ),
    },
    rhythm: {
      eyebrow: stringValue(rhythm.eyebrow, defaultAdminHomeContent.rhythm.eyebrow),
      heading: stringValue(rhythm.heading, defaultAdminHomeContent.rhythm.heading),
      body: stringValue(rhythm.body, defaultAdminHomeContent.rhythm.body),
      items: normalizeArray(
        rhythm.items,
        defaultAdminHomeContent.rhythm.items,
        (item, fallback, index) => normalizeTextItem(item, fallback, index, "rhythm"),
        { id: "", text: "" },
      ),
    },
    team: {
      eyebrow: stringValue(team.eyebrow, defaultAdminHomeContent.team.eyebrow),
      heading: stringValue(team.heading, defaultAdminHomeContent.team.heading),
      body: stringValue(team.body, defaultAdminHomeContent.team.body),
      media: normalizeMedia(team.media, defaultAdminHomeContent.team.media),
      bullets: normalizeArray(
        team.bullets,
        defaultAdminHomeContent.team.bullets,
        (item, fallback, index) => normalizeTextItem(item, fallback, index, "team"),
        { id: "", text: "" },
      ),
    },
    travel: {
      eyebrow: stringValue(travel.eyebrow, defaultAdminHomeContent.travel.eyebrow),
      heading: stringValue(travel.heading, defaultAdminHomeContent.travel.heading),
      body: stringValue(travel.body, defaultAdminHomeContent.travel.body),
      cards: normalizeArray(
        travel.cards,
        defaultAdminHomeContent.travel.cards,
        normalizeTaggedCard,
        { id: "", title: "New card", copy: "", tag: "" },
      ),
    },
    location: {
      eyebrow: stringValue(location.eyebrow, defaultAdminHomeContent.location.eyebrow),
      heading: stringValue(location.heading, defaultAdminHomeContent.location.heading),
      body: stringValue(location.body, defaultAdminHomeContent.location.body),
      media: normalizeMedia(location.media, defaultAdminHomeContent.location.media),
      cards: normalizeArray(
        location.cards,
        defaultAdminHomeContent.location.cards,
        (item, fallback, index) => normalizeTitleCopyItem(item, fallback, index, "location"),
        { id: "", title: "New location note", copy: "" },
      ),
    },
    testimonials: {
      eyebrow: stringValue(testimonials.eyebrow, defaultAdminHomeContent.testimonials.eyebrow),
      heading: stringValue(testimonials.heading, defaultAdminHomeContent.testimonials.heading),
      items: normalizeArray(
        testimonials.items,
        defaultAdminHomeContent.testimonials.items,
        normalizeTestimonial,
        { id: "", quote: "", attribution: "" },
      ),
    },
    consultation: {
      eyebrow: stringValue(consultation.eyebrow, defaultAdminHomeContent.consultation.eyebrow),
      heading: stringValue(consultation.heading, defaultAdminHomeContent.consultation.heading),
      body: stringValue(consultation.body, defaultAdminHomeContent.consultation.body),
      ctaLabel: stringValue(consultation.ctaLabel, defaultAdminHomeContent.consultation.ctaLabel),
      ctaHref: stringValue(consultation.ctaHref, defaultAdminHomeContent.consultation.ctaHref),
      steps: normalizeArray(
        consultation.steps,
        defaultAdminHomeContent.consultation.steps,
        (item, fallback, index) => normalizeTitleCopyItem(item, fallback, index, "consultation"),
        { id: "", title: "New step", copy: "" },
      ),
    },
    leadForm: {
      eyebrow: stringValue(leadForm.eyebrow, defaultAdminHomeContent.leadForm.eyebrow),
      heading: stringValue(leadForm.heading, defaultAdminHomeContent.leadForm.heading),
      body: stringValue(leadForm.body, defaultAdminHomeContent.leadForm.body),
    },
  };
}

export async function readAdminHomeContent() {
  try {
    const file = await readFile(HOME_CONTENT_PATH, "utf8");

    return normalizeAdminHomeContent(JSON.parse(file));
  } catch (error) {
    if (isRecord(error) && error.code === "ENOENT") {
      return defaultAdminHomeContent;
    }

    throw error;
  }
}

export async function writeAdminHomeContent(value: unknown) {
  const homeContent = {
    ...normalizeAdminHomeContent(value),
    updatedAt: new Date().toISOString(),
  };

  await mkdir(dirname(HOME_CONTENT_PATH), { recursive: true });
  await writeFile(HOME_CONTENT_PATH, `${JSON.stringify(homeContent, null, 2)}\n`, "utf8");

  return homeContent;
}

function safeBaseName(value: string) {
  return value
    .replace(extname(value), "")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 42);
}

export async function saveAdminHomeMediaUpload(file: {
  arrayBuffer: () => Promise<ArrayBuffer>;
  name: string;
  size: number;
  type: string;
}) {
  const uploadType = allowedUploadTypes.get(file.type);

  if (!uploadType) {
    throw new Error("Only JPG, PNG, WEBP, GIF, MP4, WEBM and MOV files are supported.");
  }

  if (file.size <= 0) {
    throw new Error("The uploaded file is empty.");
  }

  if (file.size > MAX_UPLOAD_BYTES) {
    throw new Error("Upload must be 20MB or smaller.");
  }

  const bytes = Buffer.from(await file.arrayBuffer());
  const fileName = `${safeBaseName(file.name) || "home-media"}-${randomUUID()}${uploadType.extension}`;

  await mkdir(HOME_UPLOAD_DIR, { recursive: true });
  await writeFile(join(HOME_UPLOAD_DIR, fileName), bytes);

  return {
    kind: uploadType.kind,
    src: `${HOME_UPLOAD_URL_BASE}/${fileName}`,
  };
}
