import { randomUUID } from "node:crypto";
import { extname } from "node:path";
import { getSupabaseAdminClient } from "@/lib/supabase/client";
import { uploadAdminMedia } from "@/lib/supabase/storage";
import { CACHE_TAGS, revalidatePublicContent } from "@/lib/site/content-cache";

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

export type AdminHomeRhythmItem = {
  id: string;
  time?: string;
  title?: string;
  copy?: string;
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
    items: AdminHomeRhythmItem[];
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
    eyebrow: "Premium wellness retreat in Rishikesh",
    title: "Best Wellness Retreat in Rishikesh",
    lede:
      "A calm place for yoga, meditation, sattvic food, rest and guided daily practice in Rishikesh. If you are looking for the best wellness retreat in Rishikesh, Shreevan gives you space, structure and a responsible way to reset.",
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
        title: "Clear retreat programs",
        copy: "3, 7, 14, 28 and 60-day pathways",
      },
      {
        id: "proof-2",
        title: "Human-led fit check",
        copy: "Consultation before commitment",
      },
      {
        id: "proof-3",
        title: "International visitor ready",
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
    heading: "A wellness retreat in Rishikesh for real rest and daily practice",
    paragraphs: [
      {
        id: "intro-1",
        text:
          "Shreevan Wellness is for people who need a real pause. This wellness retreat in Rishikesh gives you quiet space, simple routines and guided practices that help you slow down and reconnect with yourself.",
      },
      {
        id: "intro-2",
        text:
          "The experience is based on yoga, meditation, sattvic living, reflection and nature. It is built as a premium wellness retreat in Rishikesh, with responsible wellness language that does not replace medical advice or care.",
      },
    ],
  },
  programPathways: {
    eyebrow: "Program pathways",
    heading: "Choose the right Rishikesh retreat package",
    copy:
      "Start with the Rishikesh retreat package that matches your time, goals and readiness. The 28-day retreat is the signature wellness retreat in Rishikesh, and shorter programs help you begin at the right pace.",
    items: [
      {
        id: "program-3-day",
        title: "3-Day Ganga Sattva Reset",
        href: "/programs/3-day-ganga-reset",
        duration: "3 days",
        summary: "Best for a short yoga retreat in Rishikesh and first retreat experience.",
        outcome: "A gentle return to breath, rhythm and perspective.",
        label: "",
        copy: "Explore the 3 days yoga retreat in Rishikesh",
      },
      {
        id: "program-7-day",
        title: "7-Day Ganga Sattva Foundation",
        href: "/programs/7-day-foundation",
        duration: "7 days",
        summary: "Best for beginners who want a yoga retreat in Rishikesh with structure and daily practice.",
        outcome: "A practical base for everyday wellness practices.",
        label: "",
        copy: "View the 7 days yoga retreat in Rishikesh",
      },
      {
        id: "program-14-day",
        title: "14-Day Ganga Sattva Transformation",
        href: "/programs/14-day-transformation",
        duration: "14 days",
        summary: "Best for a deeper yoga retreat in Rishikesh with more time for reflection.",
        outcome: "More time for practice, reflection and integration.",
        label: "",
        copy: "Explore the 14 days yoga retreat in Rishikesh",
      },
      {
        id: "program-28-day",
        title: "28-Day Sattva Ganga Inner Awakening",
        href: "/programs/28-day-inner-awakening",
        duration: "28 days",
        summary: "Best for a complete premium wellness retreat in Rishikesh.",
        outcome: "A sustained reset with daily rhythm, guided practice and reflection.",
        label: "Signature",
        copy: "View the 28 day wellness retreat in Rishikesh",
      },
      {
        id: "program-60-day",
        title: "60-Day Rishi Tantra Conscious Living Residency",
        href: "/programs/60-day-rishi-residency",
        duration: "60 days",
        summary: "Advanced residency for serious lifestyle reinvention.",
        outcome: "A conscious living residency with mentoring, service and integration.",
        label: "Advanced",
        copy: "Explore the 60-day residency",
      },
    ],
  },
  differentiation: {
    eyebrow: "What is included",
    heading: "Simple practices, clear stay and honest boundaries",
    cards: [
      {
        id: "diff-1",
        title: "Yoga practice",
        copy: "Daily yoga, breathwork and gentle movement help the body settle into a yoga retreat in Rishikesh rhythm.",
        highlighted: false,
      },
      {
        id: "diff-2",
        title: "Meditation sessions",
        copy: "Guided meditation and Yoga Nidra create quiet time for rest, awareness and reflection.",
        highlighted: false,
      },
      {
        id: "diff-3",
        title: "Sattvic meals",
        copy: "Simple vegetarian food supports a lighter routine during the retreat.",
        highlighted: false,
      },
      {
        id: "diff-4",
        title: "Sound healing",
        copy: "Sound sessions may be included to support calm, rest and inner focus.",
        highlighted: false,
      },
      {
        id: "diff-5",
        title: "Stay clarity",
        copy: "Guests should know the room type, privacy level, food plan, daily schedule and support process before choosing a Rishikesh retreat package.",
        highlighted: false,
      },
      {
        id: "diff-6",
        title: "Responsible boundary",
        copy: "The retreat does not claim to cure, treat, diagnose or guarantee transformation.",
        highlighted: true,
      },
    ],
  },
  rhythm: {
    eyebrow: "05 A day at Shreevan",
    heading: "A calm daily rhythm you can understand before you arrive",
    body:
      "A clear rhythm helps guests feel safe and prepared. The exact schedule can change by program, season and facilitator availability, but the day stays simple.",
    items: [
      {
        id: "rhythm-1",
        time: "06:00",
        title: "Wake & stillness",
        copy: "A quiet start before the first guided practice.",
        text: "Wake & stillness",
      },
      {
        id: "rhythm-2",
        time: "06:30",
        title: "Yoga & breathwork",
        copy: "Gentle movement and breathwork to begin the day.",
        text: "Yoga & breathwork",
      },
      {
        id: "rhythm-3",
        time: "08:00",
        title: "Sattvic breakfast",
        copy: "A simple vegetarian meal, served without rush.",
        text: "Sattvic breakfast",
      },
      {
        id: "rhythm-4",
        time: "10:00",
        title: "Guided session",
        copy: "Reflection, journaling, meditation or a group session.",
        text: "Guided session",
      },
      {
        id: "rhythm-5",
        time: "13:30",
        title: "Sattvic lunch & rest",
        copy: "Nourishing food followed by personal rest.",
        text: "Sattvic lunch & rest",
      },
      {
        id: "rhythm-6",
        time: "16:30",
        title: "Yoga Nidra & nature",
        copy: "Deep relaxation, nature time or a quiet walk.",
        text: "Yoga Nidra & nature",
      },
      {
        id: "rhythm-7",
        time: "19:30",
        title: "Evening reflection",
        copy: "A simple close with sharing, silence or guided meditation.",
        text: "Evening reflection",
      },
    ],
  },
  team: {
    eyebrow: "Founder, team and responsible wellness",
    heading: "Founded by a Genetics Researcher who believes lasting well-being begins with self-awareness and balance",
    body:
      "Shreevan keeps its wellness language clear. Guests are guided with care, but the retreat is not presented as medical treatment, therapy or a guaranteed result.",
    media: {
      kind: "image",
      src: "/images/home/founder.jpg",
      alt: "Dr. Isha Dutta - Founder",
      caption: "Founder & Lead Facilitator",
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
    heading: "Planning a wellness retreat in Rishikesh should feel clear",
    body: "International guests often need practical answers before they book a wellness retreat in Rishikesh. Shreevan should make travel, stay, food and safety details easy to understand.",
    cards: [
      {
        id: "travel-1",
        tag: "Getting here",
        title: "Getting here",
        copy: "Guests should confirm flights, India visa or e-Visa rules, airport transfer plans and arrival time before booking.",
      },
      {
        id: "travel-2",
        tag: "Where you'll stay",
        title: "Where you'll stay",
        copy: "Room type, privacy, amenities and cleaning details should be shared clearly before arrival.",
      },
      {
        id: "travel-3",
        tag: "What you'll eat",
        title: "What you'll eat",
        copy: "Meals are sattvic, vegetarian and designed to support a calm retreat routine.",
      },
      {
        id: "travel-4",
        tag: "What to pack",
        title: "What to pack",
        copy: "Comfortable modest clothing, simple layers, personal medicines and travel documents are usually enough.",
      },
    ],
  },
  location: {
    eyebrow: "Location and safety clarity",
    heading: "Rishikesh, nature and responsible guest support",
    body:
      "Rishikesh is known for yoga, the Ganga and spiritual practice. A premium wellness retreat in Rishikesh should still give clear information about stay, support, policies and travel needs.",
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
        title: "Stay details",
        copy: "Room options, privacy, cleaning and basic amenities should be clear before booking.",
      },
      {
        id: "location-2",
        title: "Guest support",
        copy: "Guests should know who is available on site and how urgent situations are handled.",
      },
      {
        id: "location-3",
        title: "Clear policies",
        copy: "Health disclaimer, refund terms and code of conduct should be easy to review.",
      },
    ],
  },
  testimonials: {
    eyebrow: "Social proof",
    heading: "Real proof matters",
    items: [
      {
        id: "testimonial-1",
        quote: "Verified guest stories will be added here after review consent is confirmed.",
        attribution: "Review consent pending",
      },
      {
        id: "testimonial-2",
        quote: "Until then, Shreevan builds trust through clear programs, founder credibility and transparent wellness retreat in Rishikesh policies.",
        attribution: "Trust note",
      },
      {
        id: "testimonial-3",
        quote: "Third-party review links should be added only when they are active and verified.",
        attribution: "Review policy",
      },
    ],
  },
  consultation: {
    eyebrow: "Free suitability call",
    heading: "Start with a free suitability call",
    body:
      "The call helps both sides check fit before travel, payment or commitment. It is the first step before choosing the best wellness retreat in Rishikesh for your needs.",
    ctaLabel: "Book a free suitability call",
    ctaHref: "#suitability-form",
    steps: [
      {
        id: "consultation-1",
        title: "Share your context",
        copy: "Tell us your goals, travel plans, retreat duration and prior practice.",
      },
      {
        id: "consultation-2",
        title: "Check suitability",
        copy: "Discuss expectations, daily rhythm, food, stay and important boundaries.",
      },
      {
        id: "consultation-3",
        title: "Recommend the next step",
        copy: "Get a clear Rishikesh retreat package suggestion and the information you need before deciding.",
      },
    ],
  },
  leadForm: {
    eyebrow: "Request the call",
    heading: "Share a little context before we speak",
    body:
      "Use this form to share your travel window, country, Rishikesh retreat package interest and main reason for the retreat. Keep medical details for the suitability conversation.",
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
    src: typeof input.src === "string" && input.src.trim() !== "" ? input.src : fallback.src,
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

function normalizeRhythmItem(
  value: unknown,
  fallback: AdminHomeRhythmItem,
  index: number,
): AdminHomeRhythmItem {
  const input = isRecord(value) ? value : {};
  const title = stringValue(input.title, fallback.title ?? "");

  return {
    id: stringValue(input.id, fallback.id || `rhythm-${index + 1}`),
    time: stringValue(input.time, fallback.time ?? ""),
    title,
    copy: stringValue(input.copy, fallback.copy ?? ""),
    text: stringValue(input.text, fallback.text || title || fallback.id),
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
        normalizeRhythmItem,
        { id: "", time: "", title: "", copy: "", text: "" },
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
  const client = getSupabaseAdminClient();
  const { data, error } = await client.from("home_content").select("*").eq("id", "singleton").maybeSingle();

  if (error) {
    throw new Error(`readAdminHomeContent: ${error.message}`);
  }

  if (!data) {
    return defaultAdminHomeContent;
  }

  return normalizeAdminHomeContent({
    hero: data.hero,
    mediaBand: data.media_band,
    proofStrip: data.proof_strip,
    intro: data.intro,
    programPathways: data.program_pathways,
    differentiation: data.differentiation,
    rhythm: data.rhythm,
    team: data.team,
    travel: data.travel,
    location: data.location,
    testimonials: data.testimonials,
    consultation: data.consultation,
    leadForm: data.lead_form,
    updatedAt: data.updated_at,
  });
}

export async function writeAdminHomeContent(value: unknown) {
  const homeContent = {
    ...normalizeAdminHomeContent(value),
    updatedAt: new Date().toISOString(),
  };

  const client = getSupabaseAdminClient();
  const { error } = await client.from("home_content").upsert(
    {
      id: "singleton",
      hero: homeContent.hero,
      media_band: homeContent.mediaBand,
      proof_strip: homeContent.proofStrip,
      intro: homeContent.intro,
      program_pathways: homeContent.programPathways,
      differentiation: homeContent.differentiation,
      rhythm: homeContent.rhythm,
      team: homeContent.team,
      travel: homeContent.travel,
      location: homeContent.location,
      testimonials: homeContent.testimonials,
      consultation: homeContent.consultation,
      lead_form: homeContent.leadForm,
      updated_at: homeContent.updatedAt,
    },
    { onConflict: "id" },
  );

  if (error) {
    throw new Error(`writeAdminHomeContent: ${error.message}`);
  }

  await revalidatePublicContent(CACHE_TAGS.home);

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

export async function saveAdminMediaUpload(origin: "home" | "page", file: {
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

  const originalBytes = Buffer.from(await file.arrayBuffer());
  let bytes = originalBytes;
  let finalExtension = uploadType.extension;
  let finalContentType = file.type;

  // Images get the same compression treatment as blog covers (1920px ceiling,
  // WebP q80); GIFs keep animation and videos pass through untouched.
  if (uploadType.kind === "image" && file.type !== "image/gif") {
    try {
      const { default: sharp } = await import("sharp");
      const compressed = await sharp(originalBytes)
        .rotate()
        .resize({ width: 1920, height: 1920, fit: "inside", withoutEnlargement: true })
        .webp({ quality: 80 })
        .toBuffer();

      if (compressed.length < originalBytes.length) {
        bytes = compressed;
        finalExtension = ".webp";
        finalContentType = "image/webp";
      }
    } catch {
      // sharp unavailable or unsupported input — store the original upload.
    }
  }

  const fileName = `${safeBaseName(file.name) || `${origin}-media`}-${randomUUID()}${finalExtension}`;
  const { path: storagePath, publicUrl } = await uploadAdminMedia({
    origin,
    bytes,
    filename: fileName,
    contentType: finalContentType,
  });

  const client = getSupabaseAdminClient();
  const { error: mediaItemError } = await client.from("media_items").insert({
    id: `${origin}-upload-${randomUUID()}`,
    title: file.name,
    type: uploadType.kind,
    placement: `${origin} builder`,
    asset_hint: "",
    status: "published",
    notes: "",
    storage_bucket: "admin-media",
    storage_path: storagePath,
    public_url: publicUrl,
    mime_type: finalContentType,
    size_bytes: bytes.length,
  });

  if (mediaItemError) {
    // The upload itself succeeded — don't fail the request over the
    // library-registry insert; the asset just won't show in the picker.
    console.error(`media_items insert failed for ${origin} upload:`, mediaItemError.message);
  }

  return {
    kind: uploadType.kind,
    src: publicUrl,
  };
}

export async function saveAdminHomeMediaUpload(file: {
  arrayBuffer: () => Promise<ArrayBuffer>;
  name: string;
  size: number;
  type: string;
}) {
  return saveAdminMediaUpload("home", file);
}
