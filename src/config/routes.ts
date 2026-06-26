export type RouteIntent = "core" | "educational" | "commercial" | "transactional" | "legal";

export type SiteRoute = {
  href: string;
  label: string;
  intent: RouteIntent;
  noindex?: boolean;
};

export const coreRoutes: SiteRoute[] = [
  { href: "/", label: "Home", intent: "core" },
  { href: "/about-founder", label: "About Founder", intent: "core" },
  { href: "/accommodation-inclusions", label: "Accommodation & Inclusions", intent: "core" },
  { href: "/testimonials", label: "Healing Stories", intent: "core" },
  { href: "/journal", label: "Journal", intent: "core" },
  { href: "/faqs", label: "FAQs", intent: "core" },
  { href: "/contact", label: "Contact", intent: "core" },
];

export const modalityRoutes: SiteRoute[] = [
  { href: "/modalities", label: "Core Modalities", intent: "educational" },
  { href: "/modalities/yoga-therapy", label: "Yoga Therapy & Medicine", intent: "educational" },
  { href: "/modalities/guided-meditation", label: "Guided Meditation & Mind Mastery", intent: "educational" },
  { href: "/modalities/sound-healing", label: "Sound Healing & Vibrational Therapy", intent: "educational" },
  { href: "/modalities/panchkarma-detox", label: "Panchkarma & Deep Detox", intent: "educational" },
  { href: "/modalities/chakra-opening", label: "Chakra Opening & Energy Balancing", intent: "educational" },
  { href: "/modalities/spiritual-sadhanas", label: "Spiritual Sadhanas & Yogic Philosophy", intent: "educational" },
];

export const programRoutes: SiteRoute[] = [
  { href: "/programs", label: "Immersive Programs", intent: "commercial" },
  { href: "/programs/3-day-ganga-reset", label: "3-Day Ganga Sattva Reset", intent: "commercial" },
  { href: "/programs/7-day-foundation", label: "7-Day Ganga Sattva Foundation", intent: "commercial" },
  { href: "/programs/14-day-transformation", label: "14-Day Ganga Sattva Transformation", intent: "commercial" },
  { href: "/programs/28-day-inner-awakening", label: "28-Day Sattva Ganga Flagship Inner Awakening", intent: "commercial" },
  { href: "/programs/60-day-rishi-residency", label: "60-Day Rishi Tantra Lifestyle Transformation Residency", intent: "commercial" },
];

export const utilityRoutes: SiteRoute[] = [
  { href: "/book-consultation", label: "Book Consultation", intent: "transactional" },
  { href: "/payment", label: "Payment", intent: "transactional", noindex: true },
  { href: "/privacy-policy", label: "Privacy Policy", intent: "legal" },
  { href: "/terms-conditions", label: "Terms & Conditions", intent: "legal" },
  { href: "/refund-policy", label: "Refund Policy", intent: "legal" },
  { href: "/wellness-disclaimer", label: "Wellness Disclaimer", intent: "legal" },
];

export const siteRoutes = [...coreRoutes, ...modalityRoutes, ...programRoutes, ...utilityRoutes];
