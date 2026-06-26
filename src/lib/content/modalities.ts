export type ModalityContent = {
  slug: string;
  title: string;
  shortTitle: string;
  path: string;
  category: string;
  description: string;
  seoTitle: string;
  seoDescription: string;
  keywords: string[];
  summary: string;
  whatItSupports: string[];
  boundaries: string[];
  relatedPrograms: Array<{
    name: string;
    href: string;
    note: string;
  }>;
};

export const modalities: ModalityContent[] = [
  {
    slug: "yoga-therapy",
    title: "Yoga Therapy & Medicine",
    shortTitle: "Yoga Therapy",
    path: "/modalities/yoga-therapy",
    category: "Movement, breath and embodied awareness",
    description:
      "Educational yoga-based practice within Shreevan Wellness retreats, used to support rhythm, mobility, self-awareness and daily lifestyle structure.",
    seoTitle: "Yoga Therapy & Medicine | Shreevan Wellness",
    seoDescription:
      "Understand how yoga therapy is used responsibly inside Shreevan Wellness retreats for breath, mobility, awareness and daily rhythm without medical treatment claims.",
    keywords: ["yoga therapy Rishikesh", "retreat yoga practice", "responsible wellness", "breath and movement"],
    summary:
      "Yoga therapy at Shreevan is positioned as guided wellness education, not diagnosis or treatment. The practice helps guests reconnect with breath, posture, rhythm and body awareness inside a structured retreat day.",
    whatItSupports: [
      "Gentle movement literacy and breath-led practice.",
      "Awareness of daily posture, energy and rest patterns.",
      "A realistic home-practice rhythm after departure.",
    ],
    boundaries: [
      "Not a substitute for physiotherapy, medical care or injury treatment.",
      "Guests with injury, surgery history or pain should consult a qualified professional before travel.",
      "Intensity should be adapted after suitability review.",
    ],
    relatedPrograms: [
      { name: "3-Day Ganga Sattva Reset", href: "/programs/3-day-ganga-reset", note: "gentle first reset" },
      { name: "7-Day Ganga Sattva Foundation", href: "/programs/7-day-foundation", note: "foundational rhythm" },
      { name: "14-Day Ganga Sattva Transformation", href: "/programs/14-day-transformation", note: "deeper reset" },
      { name: "28-Day Sattva Ganga Inner Awakening", href: "/programs/28-day-inner-awakening", note: "signature immersion" },
      { name: "60-Day Rishi Tantra Conscious Living Residency", href: "/programs/60-day-rishi-residency", note: "advanced residency" },
    ],
  },
  {
    slug: "guided-meditation",
    title: "Guided Meditation & Mind Mastery",
    shortTitle: "Guided Meditation",
    path: "/modalities/guided-meditation",
    category: "Attention, reflection and inner steadiness",
    description:
      "Guided meditation and reflective practice for guests who need structure, steadiness and a responsible entry into stillness.",
    seoTitle: "Guided Meditation & Mind Mastery | Shreevan Wellness",
    seoDescription:
      "Learn how guided meditation supports Shreevan Wellness retreat guests with structure, attention, reflection and non-hyped inner practice.",
    keywords: ["guided meditation retreat", "mind mastery", "Rishikesh meditation", "first time meditation"],
    summary:
      "Guided meditation gives the mind a container rather than demanding instant silence. It supports self-observation, emotional pacing and practice continuity across the retreat rhythm.",
    whatItSupports: [
      "A safer entry point for first-time meditators.",
      "Reflection and attention training without performance pressure.",
      "A repeatable practice guests can continue after returning home.",
    ],
    boundaries: [
      "Not psychotherapy, psychiatric care or crisis support.",
      "Guests with active mental-health concerns should consult a qualified professional before booking.",
      "Deep practice should be paced carefully, especially during longer programs.",
    ],
    relatedPrograms: [
      { name: "7-Day Ganga Sattva Foundation", href: "/programs/7-day-foundation", note: "beginner continuity" },
      { name: "14-Day Ganga Sattva Transformation", href: "/programs/14-day-transformation", note: "deeper reflection" },
      { name: "28-Day Sattva Ganga Inner Awakening", href: "/programs/28-day-inner-awakening", note: "immersive practice" },
      { name: "60-Day Rishi Tantra Conscious Living Residency", href: "/programs/60-day-rishi-residency", note: "advanced integration" },
    ],
  },
  {
    slug: "sound-healing",
    title: "Sound Healing & Vibrational Therapy",
    shortTitle: "Sound Healing",
    path: "/modalities/sound-healing",
    category: "Rest, stillness and sensory decompression",
    description:
      "Sound-supported wellness practice used as a gentle rest and reflection modality within Shreevan retreat rhythm.",
    seoTitle: "Sound Healing & Vibrational Therapy | Shreevan Wellness",
    seoDescription:
      "Understand Shreevan Wellness sound healing as a supportive retreat modality for rest, stillness and reflection without medical cure claims.",
    keywords: ["sound healing retreat", "vibrational therapy", "Rishikesh wellness", "guided rest"],
    summary:
      "Sound work is framed as supportive wellness education. It can help guests slow down, listen, rest and transition between active practice and quiet reflection.",
    whatItSupports: [
      "Gentle decompression after travel or intense work seasons.",
      "Stillness, listening and low-pressure rest.",
      "A softer practice layer for guests who need less physical intensity.",
    ],
    boundaries: [
      "Not a medical intervention or guaranteed nervous-system treatment.",
      "Guests with sound sensitivity, trauma triggers or medical concerns should discuss suitability.",
      "The experience should be optional and paced responsibly.",
    ],
    relatedPrograms: [
      { name: "7-Day Ganga Sattva Foundation", href: "/programs/7-day-foundation", note: "gentle support" },
      { name: "14-Day Ganga Sattva Transformation", href: "/programs/14-day-transformation", note: "rest and reflection" },
      { name: "28-Day Sattva Ganga Inner Awakening", href: "/programs/28-day-inner-awakening", note: "deep immersion" },
    ],
  },
  {
    slug: "panchkarma-detox",
    title: "Panchkarma & Deep Detox",
    shortTitle: "Panchkarma Detox",
    path: "/modalities/panchkarma-detox",
    category: "Ayurveda-informed cleansing education",
    description:
      "Responsible Panchkarma and detox education within suitability-led retreat planning, without disease cure or guaranteed detox claims.",
    seoTitle: "Panchkarma & Deep Detox | Shreevan Wellness",
    seoDescription:
      "Learn how Shreevan Wellness speaks about Panchkarma and detox responsibly, with suitability checks and no medical cure claims.",
    keywords: ["Panchkarma retreat", "detox retreat India", "Ayurveda wellness", "responsible detox"],
    summary:
      "Panchkarma and detox language must stay careful. Shreevan treats this as suitability-led wellness education and retreat support, not a promise to cure, treat or medically cleanse disease.",
    whatItSupports: [
      "Clearer expectations before deeper cleansing practices.",
      "Food, rest and routine awareness within retreat rhythm.",
      "A responsible conversation about readiness and comfort.",
    ],
    boundaries: [
      "Not a disease treatment, guaranteed detox, or replacement for medical advice.",
      "Pregnancy, medication, medical conditions, eating-disorder history and recent procedures require professional guidance.",
      "Final suitability must be reviewed before recommending deeper detox practices.",
    ],
    relatedPrograms: [
      { name: "14-Day Ganga Sattva Transformation", href: "/programs/14-day-transformation", note: "deeper suitability review" },
      { name: "28-Day Sattva Ganga Inner Awakening", href: "/programs/28-day-inner-awakening", note: "longer integration" },
      { name: "60-Day Rishi Tantra Conscious Living Residency", href: "/programs/60-day-rishi-residency", note: "advanced pathway" },
    ],
  },
  {
    slug: "chakra-opening",
    title: "Chakra Opening & Energy Balancing",
    shortTitle: "Chakra Opening",
    path: "/modalities/chakra-opening",
    category: "Symbolic self-inquiry and energetic awareness",
    description:
      "A reflective, non-clinical modality for guests exploring yogic symbolism, attention, breath and inner awareness.",
    seoTitle: "Chakra Opening & Energy Balancing | Shreevan Wellness",
    seoDescription:
      "Understand chakra opening at Shreevan Wellness as symbolic self-inquiry and reflective yogic practice, not a medical or guaranteed healing claim.",
    keywords: ["chakra opening retreat", "energy balancing", "yogic philosophy", "spiritual retreat India"],
    summary:
      "Chakra work is handled as reflective yogic language, not a diagnostic system. It supports self-inquiry, intention setting and personal meaning inside a wider retreat rhythm.",
    whatItSupports: [
      "Personal reflection through yogic symbolism.",
      "Conversation around values, intention and inner alignment.",
      "A non-hyped bridge between spiritual curiosity and daily practice.",
    ],
    boundaries: [
      "Not a medical, psychological or guaranteed healing system.",
      "Avoid claims that chakras diagnose illness or remove trauma.",
      "Use grounded language and invite suitability review for deeper work.",
    ],
    relatedPrograms: [
      { name: "14-Day Ganga Sattva Transformation", href: "/programs/14-day-transformation", note: "reflection arc" },
      { name: "28-Day Sattva Ganga Inner Awakening", href: "/programs/28-day-inner-awakening", note: "signature immersion" },
      { name: "60-Day Rishi Tantra Conscious Living Residency", href: "/programs/60-day-rishi-residency", note: "advanced integration" },
    ],
  },
  {
    slug: "spiritual-sadhanas",
    title: "Spiritual Sadhanas & Yogic Philosophy",
    shortTitle: "Spiritual Sadhanas",
    path: "/modalities/spiritual-sadhanas",
    category: "Practice discipline, meaning and integration",
    description:
      "Yogic philosophy and sadhana practice for guests who want grounded spiritual depth without pressure, performance or inflated claims.",
    seoTitle: "Spiritual Sadhanas & Yogic Philosophy | Shreevan Wellness",
    seoDescription:
      "Explore how Shreevan Wellness uses spiritual sadhanas and yogic philosophy for grounded practice, reflection and integration.",
    keywords: ["spiritual sadhana retreat", "yogic philosophy", "Rishikesh spiritual retreat", "conscious living"],
    summary:
      "Sadhana at Shreevan means steady practice, not spiritual performance. The goal is disciplined rhythm, humility, reflection and integration into daily life.",
    whatItSupports: [
      "A deeper relationship with practice beyond retreat aesthetics.",
      "Integration of reflection, silence, service and daily rhythm.",
      "A grounded framework for post-retreat conscious living.",
    ],
    boundaries: [
      "No guru-style pressure, superiority or spiritual bypassing.",
      "Guests should not be pushed into practices beyond readiness.",
      "Spiritual content must stay consent-led and culturally respectful.",
    ],
    relatedPrograms: [
      { name: "3-Day Ganga Sattva Reset", href: "/programs/3-day-ganga-reset", note: "gentle entry" },
      { name: "7-Day Ganga Sattva Foundation", href: "/programs/7-day-foundation", note: "foundation" },
      { name: "14-Day Ganga Sattva Transformation", href: "/programs/14-day-transformation", note: "deeper inquiry" },
      { name: "28-Day Sattva Ganga Inner Awakening", href: "/programs/28-day-inner-awakening", note: "signature immersion" },
      { name: "60-Day Rishi Tantra Conscious Living Residency", href: "/programs/60-day-rishi-residency", note: "advanced sadhana" },
    ],
  },
];

export function getModalityBySlug(slug: string) {
  return modalities.find((modality) => modality.slug === slug);
}
