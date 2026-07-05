import { randomUUID } from "node:crypto";
import { mkdir, readFile, writeFile } from "node:fs/promises";
import { tmpdir } from "node:os";
import { dirname, extname, join } from "node:path";

export type AdminContentStatus = "draft" | "published" | "scheduled" | "archived";
export type AdminBlogIndexStatus = "index" | "noindex";
export type AdminBlogRedirectStatusCode = 301 | 302;
export type AdminBlogBlockType = "paragraph" | "heading" | "image" | "quote" | "button" | "divider" | "embed";

export type AdminBlogBlock = {
  id: string;
  type: AdminBlogBlockType;
  content: string;
  level?: 2 | 3;
  url?: string;
  alt?: string;
  caption?: string;
  label?: string;
  href?: string;
};

export type AdminFaqLink = {
  href: string;
  label: string;
  external?: boolean;
};

export type AdminFaqItem = {
  question: string;
  answer: string[];
  links?: AdminFaqLink[];
  enabled: boolean;
};

export type AdminFaqCategory = {
  id: string;
  label: string;
  intent: string;
  status: AdminContentStatus;
  faqs: AdminFaqItem[];
};

export type AdminTrustStandard = {
  id: string;
  title: string;
  copy: string;
  status: AdminContentStatus;
};

export type AdminStorySlot = {
  id: string;
  label: string;
  title: string;
  context: string;
  proof: string;
  status: AdminContentStatus;
};

export type AdminVideoSlot = {
  id: string;
  title: string;
  copy: string;
  status: AdminContentStatus;
};

export type AdminArticleFaq = {
  id: string;
  question: string;
  answer: string;
};

export type AdminJournalArticle = {
  id: string;
  slug?: string;
  category: string;
  categoryId?: string;
  title: string;
  excerpt: string;
  date: string;
  readTime: string;
  audience: string;
  tags: string[];
  keyPoints: string[];
  focusKeyword?: string;
  faqs?: AdminArticleFaq[];
  tocEnabled?: boolean;
  content?: string;
  contentHtml?: string;
  body?: string[];
  blocks?: AdminBlogBlock[];
  coverMedia?: {
    kind: "" | "image";
    src: string;
    alt: string;
    caption: string;
    description?: string;
  };
  seoTitle?: string;
  seoDescription?: string;
  canonicalPath?: string;
  canonicalUrl?: string;
  publishedAt?: string;
  scheduledAt?: string;
  indexStatus?: AdminBlogIndexStatus;
  authorId?: string;
  author?: string;
  redirectEnabled?: boolean;
  redirectUrl?: string;
  redirectStatusCode?: AdminBlogRedirectStatusCode;
  schemaJson?: string;
  createdAt?: string;
  updatedAt?: string;
  relatedHref: string;
  relatedLabel: string;
  contactLabel: string;
  status: AdminContentStatus;
  featured: boolean;
};

export type AdminMediaItem = {
  id: string;
  title: string;
  type: "image" | "video" | "document" | "embed";
  placement: string;
  assetHint: string;
  status: AdminContentStatus;
  notes: string;
};

export type AdminContentTrustStore = {
  faqCategories: AdminFaqCategory[];
  faqResearchSignals: string[];
  responsibleStandards: AdminTrustStandard[];
  storyTrustMarkers: AdminTrustStandard[];
  storySlots: AdminStorySlot[];
  videoSlots: AdminVideoSlot[];
  outcomeRows: AdminTrustStandard[];
  consentStandards: string[];
  journalCategories: string[];
  journalArticles: AdminJournalArticle[];
  mediaItems: AdminMediaItem[];
  updatedAt: string;
};

const CONTENT_TRUST_PATH = join(process.cwd(), "data", "admin", "content-trust.json");
// On Vercel the deployed bundle (including CONTENT_TRUST_PATH) is read-only, so
// writes there throw EROFS. /tmp is writable but ephemeral and not shared across
// serverless instances or across deploys — this is a stopgap for Blog only,
// not a substitute for real persistent storage (Supabase, Vercel Blob/KV, etc).
const CONTENT_TRUST_EPHEMERAL_PATH = join(tmpdir(), "shreevan-admin-content-trust.ephemeral.json");

export function isContentTrustStorageEphemeral() {
  return process.env.VERCEL === "1";
}
const BLOG_UPLOAD_DIR = join(process.cwd(), "public", "uploads", "blog");
const BLOG_UPLOAD_URL_BASE = "/uploads/blog";
const MAX_BLOG_UPLOAD_BYTES = 12 * 1024 * 1024;

const allowedBlogUploadTypes = new Map([
  ["image/jpeg", ".jpg"],
  ["image/png", ".png"],
  ["image/webp", ".webp"],
  ["image/gif", ".gif"],
]);

export const defaultAdminContentTrust: AdminContentTrustStore = {
  updatedAt: "2026-06-21T00:00:00.000Z",
  faqResearchSignals: [
    "Which program duration fits my life stage?",
    "Can I trust the payment and booking path before international travel?",
    "What is included in stay, food and daily rhythm?",
    "Is this safe and responsible if I have health boundaries?",
    "How do I plan Rishikesh travel without guessing?",
  ],
  responsibleStandards: [
    {
      id: "no-cure-claims",
      title: "No cure claims",
      copy: "The retreat can support lifestyle rhythm, awareness and guided practice, but it is not framed as a medical cure.",
      status: "published",
    },
    {
      id: "no-payment-before-clarity",
      title: "No payment before clarity",
      copy: "Serious guests should understand program fit, stay, food, terms and travel practicalities before checkout.",
      status: "published",
    },
    {
      id: "no-hidden-travel-advice",
      title: "No hidden travel advice",
      copy: "Visa, immigration and changing travel rules should be checked through official government sources.",
      status: "published",
    },
  ],
  faqCategories: [
    {
      id: "program-fit",
      label: "Program Fit",
      intent: "For visitors comparing 3, 7, 14, 28 and 60-day retreat depth.",
      status: "published",
      faqs: [
        {
          enabled: true,
          question: "Which Shreevan Wellness program is right for me?",
          answer: [
            "The right program depends on your current life season, travel effort, emotional bandwidth and how much structure you can genuinely hold. A 3-day reset is best for a short pause, 7 days builds foundation, 14 days creates deeper transformation rhythm, 28 days is the flagship immersive path, and 60 days is a serious lifestyle residency.",
            "If you are unsure, do not force the decision alone. The suitability consultation exists to match your context with the right duration before payment or travel planning.",
          ],
          links: [
            { href: "/programs/3-day-ganga-reset", label: "View 3-day reset" },
            { href: "/programs/60-day-rishi-residency", label: "View 60-day residency" },
          ],
        },
        {
          enabled: true,
          question: "Do I need to know the exact program before booking a consultation?",
          answer: [
            "No. Many serious guests arrive with only a broad sense that they need a reset, deeper practice or a life transition container. You can choose \"not sure yet\" in the consultation form and explain what you are hoping to change.",
            "The team can then recommend a suitable direction, or advise you to wait if the retreat is not the right step right now.",
          ],
          links: [{ href: "/book-consultation", label: "Start with consultation" }],
        },
        {
          enabled: true,
          question: "Is the 60-day residency just a longer version of the retreat?",
          answer: [
            "No. The 60-day Rishi Tantra Conscious Living Residency should be treated as an advanced commitment, not a long holiday. It is for people who want structured practice, mentoring, lifestyle redesign and integration outputs that can continue after they return home.",
            "Because the commitment is high, suitability matters more than enthusiasm. A call should confirm readiness, schedule, accommodation needs and support boundaries before any payment step.",
          ],
          links: [{ href: "/programs/60-day-rishi-residency", label: "Understand the residency" }],
        },
      ],
    },
    {
      id: "booking-payment",
      label: "Booking & Payment",
      intent: "For guests who need clarity before sharing details or paying internationally.",
      status: "published",
      faqs: [
        {
          enabled: true,
          question: "Is the suitability consultation free?",
          answer: [
            "Yes. The suitability conversation is positioned as a free fit check before you choose a program, finalize travel dates or move to payment.",
            "It is not designed to pressure you into booking. It should clarify your context, comfort, expectations and the safest next step.",
          ],
          links: [{ href: "/book-consultation", label: "Request the free call" }],
        },
        {
          enabled: true,
          question: "Do I have to pay before speaking with the team?",
          answer: [
            "No. For an international wellness retreat, payment should come after program fit, room expectations, food comfort, travel timing, refund terms and health boundaries are clear.",
            "The payment page is intended for confirmed guests who have already received the correct booking context, not for cold visitors landing on the website for the first time.",
          ],
          links: [
            { href: "/payment", label: "Payment readiness page" },
            { href: "/refund-policy", label: "Read refund policy" },
          ],
        },
        {
          enabled: true,
          question: "What happens after I submit the consultation form?",
          answer: [
            "Your enquiry should be reviewed by the Shreevan team, then routed toward a call time or a written response if more context is needed first.",
            "A good next step includes understanding your country, preferred dates, program interest, travel comfort, food needs and any non-sensitive wellness boundaries that affect suitability.",
          ],
          links: [{ href: "/book-consultation", label: "Go to consultation form" }],
        },
      ],
    },
    {
      id: "stay-food",
      label: "Stay & Food",
      intent: "For international visitors checking comfort, meals and daily living standards.",
      status: "published",
      faqs: [
        {
          enabled: true,
          question: "What accommodation and meals are included?",
          answer: [
            "Program inclusions should cover the retreat stay, daily vegetarian sattvic meals and the daily practice rhythm relevant to the selected program. Exact room category, check-in details and included support should be confirmed before payment.",
            "If you are travelling from the US, Canada or the UK, ask your room, climate, power, Wi-Fi and laundry questions early so the team can set realistic expectations.",
          ],
          links: [{ href: "/accommodation-inclusions", label: "View stay and food" }],
        },
        {
          enabled: true,
          question: "Can Shreevan support vegan, Jain, gluten-aware or low-spice food?",
          answer: [
            "Food preferences and dietary restrictions should be discussed during consultation before booking. Some needs may be easy to support, while allergies or strict medical diets need careful confirmation rather than casual promises.",
            "For trust, the website should never say every diet can be handled automatically. The right answer is to disclose needs early and let the team confirm what is practical.",
          ],
          links: [
            { href: "/book-consultation", label: "Mention food needs" },
            { href: "/contact", label: "Ask a logistics question" },
          ],
        },
        {
          enabled: true,
          question: "Will I have a private room?",
          answer: [
            "Private-room expectations should be discussed before booking because comfort standards matter, especially for international guests on longer programs.",
            "If a specific room category, view, accessibility need or quietness level is important to you, ask for written confirmation before moving to payment.",
          ],
          links: [{ href: "/accommodation-inclusions", label: "See accommodation details" }],
        },
      ],
    },
    {
      id: "travel-arrival",
      label: "Travel & Arrival",
      intent: "For visitors searching Rishikesh travel, visas, safety and arrival planning.",
      status: "published",
      faqs: [
        {
          enabled: true,
          question: "Where is Shreevan Wellness located?",
          answer: [
            "Shreevan Wellness is positioned in Rishikesh, Uttarakhand, India, near the sacred Ganga landscape. The exact stay address should be shared with confirmed guests after suitability and booking steps are complete.",
            "This protects guest privacy while still giving international visitors enough location clarity to evaluate travel effort and comfort before they commit.",
          ],
          links: [{ href: "/contact", label: "View contact and location" }],
        },
        {
          enabled: true,
          question: "Which airport should international guests consider?",
          answer: [
            "Many international guests plan around Delhi arrival and then a domestic connection or transfer toward Dehradun/Rishikesh. Exact airport, transfer and arrival-window guidance should be confirmed with the team because schedules and route comfort can change.",
            "The FAQ should guide planning, not replace live travel coordination. Use the consultation or contact page for your preferred arrival date and country.",
          ],
          links: [{ href: "/contact", label: "Ask travel questions" }],
        },
        {
          enabled: true,
          question: "Do you arrange visas or provide immigration advice?",
          answer: [
            "No. Shreevan can clarify retreat logistics, stay details and dates, but visa eligibility and immigration decisions must be checked through official government sources or qualified travel advisers.",
            "International guests should verify requirements before booking flights or paying for a retreat. This is especially important because visa rules and travel advisories can change.",
          ],
          links: [
            {
              href: "https://indianvisaonline.gov.in/evisa/tvoa.html",
              label: "India e-Visa official site",
              external: true,
            },
          ],
        },
      ],
    },
    {
      id: "health-boundaries",
      label: "Health Boundaries",
      intent: "For users checking wellness, safety, detox and medical claims.",
      status: "published",
      faqs: [
        {
          enabled: true,
          question: "Is Shreevan Wellness a medical or mental-health treatment centre?",
          answer: [
            "No. Shreevan Wellness is a structured wellness retreat platform, not a hospital, clinic, emergency service, psychiatric facility or substitute for medical care.",
            "Yoga, meditation, sattvic living, Panchkarma education and spiritual practices are presented as wellness and lifestyle support. They should not be interpreted as diagnosis, cure, medical treatment or mental-health therapy.",
          ],
          links: [{ href: "/wellness-disclaimer", label: "Read wellness disclaimer" }],
        },
        {
          enabled: true,
          question: "Can I attend if I have anxiety, depression, pregnancy, medication use or a medical condition?",
          answer: [
            "You should speak with a qualified medical professional before attending if you have a current medical condition, pregnancy, active mental-health concern, medication changes or any history that could affect retreat safety.",
            "During consultation, share only the relevant suitability context needed for safe planning. If the retreat is not appropriate, the responsible answer may be to delay or decline participation.",
          ],
          links: [
            { href: "/book-consultation", label: "Check suitability" },
            { href: "/privacy-policy", label: "Understand privacy" },
          ],
        },
        {
          enabled: true,
          question: "Are detox, Panchkarma or energy practices guaranteed to heal or cure?",
          answer: [
            "No. Responsible wellness should avoid guaranteed cure claims. Detox and Panchkarma-related practices require suitability, proper expectations and clear boundaries.",
            "The goal is to support rhythm, awareness, rest and lifestyle change. Outcomes differ by person, duration, participation, travel stress, existing health and follow-through after the retreat.",
          ],
          links: [{ href: "/modalities/panchkarma-detox", label: "Read Panchkarma modality" }],
        },
      ],
    },
    {
      id: "outcomes-aftercare",
      label: "Outcomes & Aftercare",
      intent: "For guests asking what they can realistically expect after the retreat.",
      status: "published",
      faqs: [
        {
          enabled: true,
          question: "What outcomes can I realistically expect?",
          answer: [
            "Realistic outcomes are usually practical: clearer daily rhythm, better self-observation, a calmer food and sleep routine, guided practice familiarity and a more grounded plan for life after the retreat.",
            "The website should not promise permanent transformation from one stay. Longer programs create more structure, but the guest's readiness and after-retreat follow-through matter deeply.",
          ],
          links: [{ href: "/programs/14-day-transformation", label: "See transformation program" }],
        },
        {
          enabled: true,
          question: "What support do I get after the retreat?",
          answer: [
            "Each program should clarify its post-retreat outputs, such as a rhythm plan, personal practice direction or integration roadmap. Longer programs may include deeper planning, but the exact aftercare path should be confirmed before booking.",
            "If ongoing support is important to you, ask about it during the consultation instead of assuming it is included.",
          ],
          links: [{ href: "/programs/28-day-inner-awakening", label: "Explore flagship path" }],
        },
        {
          enabled: true,
          question: "Is Shreevan suitable if I am travelling alone?",
          answer: [
            "Many wellness travellers explore retreats alone, but suitability depends on comfort, travel confidence, room needs, communication preferences and health boundaries.",
            "A solo traveller should use the consultation to understand arrival support, daily schedule, food, room expectations and what help is available on site before deciding.",
          ],
          links: [
            { href: "/book-consultation", label: "Discuss solo travel fit" },
            { href: "/contact", label: "Ask logistics" },
          ],
        },
      ],
    },
  ],
  storyTrustMarkers: [
    {
      id: "consent-led",
      title: "Consent-led",
      copy: "Every story should be approved by the guest before publishing.",
      status: "published",
    },
    {
      id: "context-rich",
      title: "Context-rich",
      copy: "Show program, duration, travel context and why the guest came.",
      status: "published",
    },
    {
      id: "no-cure-claims",
      title: "No cure claims",
      copy: "Stories should reflect individual experience, not guaranteed results.",
      status: "published",
    },
    {
      id: "international-clarity",
      title: "International clarity",
      copy: "Include details that help US, Canada and UK guests feel informed.",
      status: "published",
    },
  ],
  storySlots: [
    {
      id: "professional-pause",
      label: "Story slot 01",
      title: "A professional pause that became a steadier daily rhythm",
      context: "Ideal for a 7 or 14-day guest reflection once consent-approved.",
      proof: "Capture what changed in routine, clarity, sleep rhythm, practice consistency or decision-making.",
      status: "published",
    },
    {
      id: "founder-structure",
      label: "Story slot 02",
      title: "A founder stepping away from pressure without losing structure",
      context: "Ideal for an entrepreneur, executive or high-responsibility guest.",
      proof: "Capture what made the retreat feel safe, organised, well-held and worth international travel.",
      status: "published",
    },
    {
      id: "life-transition",
      label: "Story slot 03",
      title: "A life-transition guest finding space to listen again",
      context: "Ideal for a transition, grief, burnout-adjacent or self-reconnection story.",
      proof: "Keep language responsible: reflection, support, space, routine and perspective instead of cure claims.",
      status: "published",
    },
  ],
  videoSlots: [
    {
      id: "short-reflection",
      title: "Short reflection",
      copy: "A 45-90 second guest video with consent-approved name, country and program.",
      status: "published",
    },
    {
      id: "retreat-atmosphere",
      title: "Retreat atmosphere",
      copy: "A quiet montage slot for practice space, meals, room, surroundings and arrival clarity.",
      status: "published",
    },
  ],
  outcomeRows: [
    {
      id: "before",
      title: "What brought them here",
      copy: "Work pressure, routine fatigue, life transition, spiritual seeking or the need for a structured reset.",
      status: "published",
    },
    {
      id: "during",
      title: "What supported them",
      copy: "Daily rhythm, facilitator guidance, sattvic meals, nature, reflection, breathwork and intentional rest.",
      status: "published",
    },
    {
      id: "after",
      title: "What they carried home",
      copy: "A clearer routine, practical practices, perspective and a more grounded relationship with daily life.",
      status: "published",
    },
  ],
  consentStandards: [
    "Use real guest words only after written testimonial/media consent.",
    "Add country, program duration and travel context when the guest agrees.",
    "Avoid before-after medical framing, diagnosis, cure language or guaranteed outcomes.",
    "Separate guest reflection from clinical, therapeutic or emergency-care claims.",
  ],
  journalCategories: [
    "All",
    "Program Fit",
    "Burnout & Rhythm",
    "Meditation",
    "Sattvic Living",
    "Rishikesh Travel",
    "Detox",
    "Founder Notes",
  ],
  journalArticles: [
    {
      id: "choose-retreat-duration",
      category: "Program Fit",
      title: "How to choose between a 3, 7, 14, 28 or 60-day retreat",
      excerpt:
        "A clear decision guide for matching your current life season with the right level of reset, transformation or residency.",
      date: "June 20, 2026",
      readTime: "8 min read",
      audience: "Executives, founders and international guests comparing program depth.",
      tags: ["Program selection", "Retreat planning", "Duration"],
      keyPoints: [
        "Short resets work best when the goal is recovery, quiet and a clean re-entry into daily rhythm.",
        "Longer retreats are better when the guest needs practice consistency, deeper mentoring and structured integration.",
        "The right duration should be chosen after readiness, travel effort and emotional bandwidth are discussed.",
      ],
      relatedHref: "/programs/28-day-inner-awakening",
      relatedLabel: "Compare flagship program",
      contactLabel: "Ask which duration fits",
      status: "published",
      featured: true,
    },
    {
      id: "vacation-vs-retreat",
      category: "Burnout & Rhythm",
      title: "Why a retreat can reset rhythm in a way a vacation rarely can",
      excerpt:
        "A grounded look at why structure, practice, food, rest and environment matter when someone is truly depleted.",
      date: "June 18, 2026",
      readTime: "7 min read",
      audience: "Busy professionals who keep resting but do not feel restored.",
      tags: ["Burnout", "Daily rhythm", "Reset"],
      keyPoints: [
        "A vacation can give distance, but a retreat gives a repeatable rhythm.",
        "Daily practice reduces decision fatigue because the guest is held by a clear schedule.",
        "The strongest outcome is not escape. It is a steadier way to return.",
      ],
      relatedHref: "/programs/7-day-foundation",
      relatedLabel: "Explore 7-day foundation",
      contactLabel: "Discuss reset timing",
      status: "published",
      featured: true,
    },
    {
      id: "sattvic-living-guide",
      category: "Sattvic Living",
      title: "A beginner's guide to sattvic food, sleep and daily rhythm",
      excerpt:
        "What sattvic living means inside a retreat, and why food, rest and routine are part of the transformation process.",
      date: "June 15, 2026",
      readTime: "6 min read",
      audience: "Guests who want to understand stay, food and lifestyle before arrival.",
      tags: ["Food", "Lifestyle", "Sattvic"],
      keyPoints: [
        "Sattvic living is not only a diet. It is a calmer relationship with input, pace and daily choices.",
        "Simple meals, sleep rhythm and quiet mornings support the work done in practice sessions.",
        "Guests should understand food boundaries before booking, especially when travelling internationally.",
      ],
      relatedHref: "/accommodation-inclusions",
      relatedLabel: "See stay and food",
      contactLabel: "Ask about food comfort",
      status: "published",
      featured: false,
    },
    {
      id: "guided-meditation-first-time",
      category: "Meditation",
      title: "What guided meditation feels like for first-time seekers",
      excerpt:
        "A calm explanation of what to expect when meditation is new, uncomfortable or difficult to maintain alone.",
      date: "June 12, 2026",
      readTime: "5 min read",
      audience: "Beginners and thoughtful skeptics who want meditation without pressure.",
      tags: ["Meditation", "Mind mastery", "Beginners"],
      keyPoints: [
        "Guided meditation gives the mind a safe structure instead of demanding instant silence.",
        "Discomfort is not failure. It is often the first honest point of awareness.",
        "The aim is practice continuity, not a dramatic spiritual experience.",
      ],
      relatedHref: "/modalities/guided-meditation",
      relatedLabel: "Understand meditation",
      contactLabel: "Check practice readiness",
      status: "published",
      featured: false,
    },
    {
      id: "rishikesh-preparation",
      category: "Rishikesh Travel",
      title: "Preparing for a Ganga-side wellness stay in Rishikesh",
      excerpt:
        "What international visitors should know about arrival mindset, location questions, practical comfort and retreat boundaries.",
      date: "June 10, 2026",
      readTime: "9 min read",
      audience: "US, Canada and UK guests planning India travel for wellness.",
      tags: ["Rishikesh", "Travel", "Safety"],
      keyPoints: [
        "A premium retreat page should make the setting, food, communication and safety expectations easy to understand.",
        "Travel readiness matters because the transformation begins before the guest arrives.",
        "The right questions should be asked before payment, not after booking pressure.",
      ],
      relatedHref: "/contact",
      relatedLabel: "View contact and location",
      contactLabel: "Ask travel questions",
      status: "published",
      featured: true,
    },
    {
      id: "panchkarma-responsible-detox",
      category: "Detox",
      title: "The role of Panchkarma in a responsible detox retreat",
      excerpt:
        "How to speak about detox clearly, traditionally and responsibly without drifting into cure claims.",
      date: "June 08, 2026",
      readTime: "7 min read",
      audience: "Guests considering deeper cleansing or Ayurveda-supported programs.",
      tags: ["Panchkarma", "Detox", "Responsible wellness"],
      keyPoints: [
        "Detox language should be careful, specific and free from guaranteed medical promises.",
        "Panchkarma education needs clear suitability checks and boundaries.",
        "Guests should disclose relevant health context during consultation before deeper practices are recommended.",
      ],
      relatedHref: "/modalities/panchkarma-detox",
      relatedLabel: "Read Panchkarma modality",
      contactLabel: "Check detox suitability",
      status: "published",
      featured: false,
    },
    {
      id: "structure-not-pressure",
      category: "Founder Notes",
      title: "Why serious seekers need structure, not pressure",
      excerpt:
        "A founder-led reflection on why Shreevan Wellness prioritises rhythm, consent and discernment over intensity.",
      date: "June 05, 2026",
      readTime: "6 min read",
      audience: "Seekers who want depth without hype, urgency or spiritual performance.",
      tags: ["Founder", "Retreat ethics", "Trust"],
      keyPoints: [
        "Transformation is better supported by steady rhythm than emotional overwhelm.",
        "A good retreat should make people feel held, not pushed.",
        "Trust grows when boundaries, expectations and the guide's role are visible.",
      ],
      relatedHref: "/about-founder",
      relatedLabel: "Read our story",
      contactLabel: "Speak with the team",
      status: "published",
      featured: false,
    },
    {
      id: "long-residency-fit",
      category: "Program Fit",
      title: "When a longer residency makes more sense than a short reset",
      excerpt:
        "How to know when the 60-day path is appropriate for integration, identity work and a serious lifestyle redesign.",
      date: "June 02, 2026",
      readTime: "10 min read",
      audience: "High-commitment guests considering the deepest Shreevan pathway.",
      tags: ["60-day residency", "Lifestyle redesign", "Integration"],
      keyPoints: [
        "A long residency should be chosen for defined outputs, not simply because it sounds more powerful.",
        "The guest needs enough life space to practise, reflect and integrate without rushing.",
        "Completion should create a practical blueprint for the next 12 months.",
      ],
      relatedHref: "/programs/60-day-rishi-residency",
      relatedLabel: "Explore 60-day residency",
      contactLabel: "Discuss residency fit",
      status: "published",
      featured: false,
    },
    {
      id: "sound-healing-silence",
      category: "Meditation",
      title: "Sound healing, silence and nervous-system rest",
      excerpt:
        "A practical introduction to why sound, silence and stillness are used in retreat spaces for deep rest.",
      date: "May 29, 2026",
      readTime: "5 min read",
      audience: "Guests curious about gentle support practices beyond physical yoga.",
      tags: ["Sound healing", "Rest", "Stillness"],
      keyPoints: [
        "Sound work should be positioned as supportive wellness education, not a medical intervention.",
        "Silence gives the body and mind fewer demands to process.",
        "The value is often felt in the combination of environment, rhythm and guided rest.",
      ],
      relatedHref: "/modalities/sound-healing",
      relatedLabel: "Explore sound healing",
      contactLabel: "Ask about gentle practices",
      status: "published",
      featured: false,
    },
  ],
  mediaItems: [
    {
      id: "stories-hero-media",
      title: "Healing stories hero",
      type: "video",
      placement: "/testimonials hero",
      assetHint: "Hero guest reflection, retreat atmosphere, Maa Ganga setting or quiet practice moment.",
      status: "draft",
      notes: "Replace placeholder after written media consent.",
    },
    {
      id: "featured-story-media",
      title: "Featured guest story",
      type: "image",
      placement: "/testimonials featured story",
      assetHint: "Primary guest story portrait, calm interview still or retreat setting.",
      status: "draft",
      notes: "Use only consent-approved real guest media.",
    },
    {
      id: "journal-article-media",
      title: "Journal article cover system",
      type: "image",
      placement: "/journal article cards",
      assetHint: "Editorial retreat, practice, meal, river or travel imagery for journal categories.",
      status: "draft",
      notes: "Future phase should support upload URLs and alt text per article.",
    },
  ],
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

function statusValue(value: unknown, fallback: AdminContentStatus): AdminContentStatus {
  return value === "draft" || value === "published" || value === "scheduled" || value === "archived"
    ? value
    : fallback;
}

function mediaTypeValue(value: unknown, fallback: AdminMediaItem["type"]) {
  return value === "image" || value === "video" || value === "document" || value === "embed" ? value : fallback;
}

function indexStatusValue(value: unknown, fallback: AdminBlogIndexStatus): AdminBlogIndexStatus {
  return value === "noindex" ? "noindex" : fallback;
}

function redirectStatusCodeValue(value: unknown, fallback: AdminBlogRedirectStatusCode): AdminBlogRedirectStatusCode {
  return value === 302 ? 302 : fallback;
}

function blogBlockTypeValue(value: unknown, fallback: AdminBlogBlockType): AdminBlogBlockType {
  return value === "paragraph" ||
    value === "heading" ||
    value === "image" ||
    value === "quote" ||
    value === "button" ||
    value === "divider" ||
    value === "embed"
    ? value
    : fallback;
}

function stringArrayValue(value: unknown, fallback: string[]) {
  if (!Array.isArray(value)) {
    return fallback;
  }

  return value.filter((item): item is string => typeof item === "string").map((item) => item.trim()).filter(Boolean);
}

function slugify(value: string) {
  return value
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 70);
}

function safeBaseName(value: string) {
  return slugify(value.replace(extname(value), "")).slice(0, 42);
}

function normalizeJournalMedia(
  value: unknown,
  fallback: NonNullable<AdminJournalArticle["coverMedia"]> = {
    kind: "",
    src: "",
    alt: "",
    caption: "",
    description: "",
  },
): NonNullable<AdminJournalArticle["coverMedia"]> {
  const input = isRecord(value) ? value : {};
  const src = stringValue(input.src, fallback.src);

  return {
    kind: src ? "image" : "",
    src,
    alt: stringValue(input.alt, fallback.alt),
    caption: stringValue(input.caption, fallback.caption),
    description: stringValue(input.description, fallback.description ?? ""),
  };
}

function blogCanonicalPath(id: string, value?: unknown) {
  const path = typeof value === "string" ? value.trim() : "";

  return path || `/journal/${id}`;
}

function categoryIdValue(value: string) {
  return slugify(value) || "program-fit";
}

function normalizeBlogBlock(value: unknown, index: number): AdminBlogBlock {
  const input = isRecord(value) ? value : {};
  const type = blogBlockTypeValue(input.type, "paragraph");

  return {
    id: stringValue(input.id, `block-${index + 1}`),
    type,
    content: stringValue(input.content, ""),
    level: input.level === 3 ? 3 : 2,
    url: stringValue(input.url, ""),
    alt: stringValue(input.alt, ""),
    caption: stringValue(input.caption, ""),
    label: stringValue(input.label, ""),
    href: stringValue(input.href, ""),
  };
}

function defaultBlogBlocks(article: Pick<AdminJournalArticle, "title" | "excerpt" | "keyPoints" | "body">) {
  const bodyBlocks = article.body?.length ? article.body : [article.excerpt, ...article.keyPoints];

  return [
    {
      id: "intro-heading",
      type: "heading" as const,
      level: 2 as const,
      content: article.title,
    },
    ...bodyBlocks
      .filter(Boolean)
      .map((content, index) => ({
        id: `paragraph-${index + 1}`,
        type: "paragraph" as const,
        content,
      })),
  ];
}

function normalizeBlogBlocks(value: unknown, fallback: AdminBlogBlock[]) {
  const blocks = Array.isArray(value) ? value.map(normalizeBlogBlock) : [];

  return blocks.length ? blocks : fallback;
}

function makeJournalArticleFallback(value: unknown, index: number): AdminJournalArticle {
  const input = isRecord(value) ? value : {};
  const title = stringValue(input.title, "New blog draft");
  const id = stringValue(input.id, slugify(title) || `blog-draft-${index + 1}`);
  const now = new Date().toISOString();

  return {
    id,
    slug: id,
    category: "Program Fit",
    categoryId: "program-fit",
    title,
    excerpt: "",
    date: new Date().toLocaleDateString("en-US", {
      month: "long",
      day: "2-digit",
      year: "numeric",
    }),
    readTime: "5 min read",
    audience: "",
    tags: [],
    keyPoints: [],
    content: "",
    body: [],
    blocks: [],
    coverMedia: {
      kind: "",
      src: "",
      alt: "",
      caption: "",
      description: "",
    },
    seoTitle: "",
    seoDescription: "",
    canonicalPath: `/journal/${id}`,
    canonicalUrl: `/journal/${id}`,
    publishedAt: "",
    scheduledAt: "",
    indexStatus: "index",
    authorId: "admin",
    author: "Shreevan Wellness",
    redirectEnabled: false,
    redirectUrl: "",
    redirectStatusCode: 301,
    schemaJson: "",
    createdAt: now,
    updatedAt: now,
    relatedHref: "/book-consultation",
    relatedLabel: "Book consultation",
    contactLabel: "Ask a question",
    status: "draft",
    featured: false,
  };
}

function normalizeLinks(value: unknown, fallback: AdminFaqLink[] = []) {
  const links = Array.isArray(value) ? value : fallback;

  return links.filter(isRecord).map((link, index) => ({
    href: stringValue(link.href, fallback[index]?.href ?? ""),
    label: stringValue(link.label, fallback[index]?.label ?? ""),
    external: booleanValue(link.external, fallback[index]?.external ?? false),
  }));
}

function normalizeFaq(value: unknown, fallback: AdminFaqItem): AdminFaqItem {
  const input = isRecord(value) ? value : {};

  return {
    enabled: booleanValue(input.enabled, fallback.enabled),
    question: stringValue(input.question, fallback.question),
    answer: stringArrayValue(input.answer, fallback.answer),
    links: normalizeLinks(input.links, fallback.links ?? []),
  };
}

function normalizeFaqCategory(value: unknown, fallback: AdminFaqCategory): AdminFaqCategory {
  const input = isRecord(value) ? value : {};
  const incomingFaqs = Array.isArray(input.faqs) ? input.faqs : [];

  return {
    id: stringValue(input.id, fallback.id),
    label: stringValue(input.label, fallback.label),
    intent: stringValue(input.intent, fallback.intent),
    status: statusValue(input.status, fallback.status),
    faqs: fallback.faqs.map((faq, index) => normalizeFaq(incomingFaqs[index], faq)),
  };
}

function normalizeTrustStandard(value: unknown, fallback: AdminTrustStandard): AdminTrustStandard {
  const input = isRecord(value) ? value : {};

  return {
    id: stringValue(input.id, fallback.id),
    title: stringValue(input.title, fallback.title),
    copy: stringValue(input.copy, fallback.copy),
    status: statusValue(input.status, fallback.status),
  };
}

function normalizeStorySlot(value: unknown, fallback: AdminStorySlot): AdminStorySlot {
  const input = isRecord(value) ? value : {};

  return {
    id: stringValue(input.id, fallback.id),
    label: stringValue(input.label, fallback.label),
    title: stringValue(input.title, fallback.title),
    context: stringValue(input.context, fallback.context),
    proof: stringValue(input.proof, fallback.proof),
    status: statusValue(input.status, fallback.status),
  };
}

function normalizeVideoSlot(value: unknown, fallback: AdminVideoSlot): AdminVideoSlot {
  const input = isRecord(value) ? value : {};

  return {
    id: stringValue(input.id, fallback.id),
    title: stringValue(input.title, fallback.title),
    copy: stringValue(input.copy, fallback.copy),
    status: statusValue(input.status, fallback.status),
  };
}

function normalizeArticleFaqs(value: unknown, fallback: AdminArticleFaq[]): AdminArticleFaq[] {
  if (!Array.isArray(value)) {
    return fallback;
  }

  return value
    .filter(isRecord)
    .map((item, index) => ({
      id: stringValue(item.id, `faq-${index + 1}`),
      question: stringValue(item.question, ""),
      answer: stringValue(item.answer, ""),
    }))
    .filter((item) => item.question.trim() || item.answer.trim());
}

function normalizeJournalArticle(value: unknown, fallback: AdminJournalArticle): AdminJournalArticle {
  const input = isRecord(value) ? value : {};
  const fallbackSlug = fallback.slug || fallback.id;
  const slug = slugify(stringValue(input.slug, stringValue(input.id, fallbackSlug))) || fallbackSlug;
  const id = slugify(stringValue(input.id, slug)) || slug;
  const title = stringValue(input.title, fallback.title);
  const excerpt = stringValue(input.excerpt, fallback.excerpt);
  const category = stringValue(input.category, fallback.category);
  const body = stringArrayValue(input.body, fallback.body ?? []);
  const keyPoints = stringArrayValue(input.keyPoints, fallback.keyPoints);
  const fallbackBlocks = defaultBlogBlocks({
    title,
    excerpt,
    keyPoints,
    body,
  });
  const now = new Date().toISOString();

  return {
    id,
    slug,
    category,
    categoryId: stringValue(input.categoryId, fallback.categoryId ?? categoryIdValue(category)),
    title,
    excerpt,
    date: stringValue(input.date, fallback.date),
    readTime: stringValue(input.readTime, fallback.readTime),
    audience: stringValue(input.audience, fallback.audience),
    tags: stringArrayValue(input.tags, fallback.tags),
    keyPoints,
    focusKeyword: stringValue(input.focusKeyword, fallback.focusKeyword ?? ""),
    faqs: normalizeArticleFaqs(input.faqs, fallback.faqs ?? []),
    tocEnabled: booleanValue(input.tocEnabled, fallback.tocEnabled ?? true),
    content: stringValue(input.content, fallback.content ?? body.join("\n\n")),
    contentHtml: stringValue(input.contentHtml, fallback.contentHtml ?? ""),
    body,
    blocks: normalizeBlogBlocks(input.blocks, fallback.blocks ?? fallbackBlocks),
    coverMedia: normalizeJournalMedia(input.coverMedia, fallback.coverMedia),
    seoTitle: stringValue(input.seoTitle, fallback.seoTitle ?? title),
    seoDescription: stringValue(input.seoDescription, fallback.seoDescription ?? excerpt),
    canonicalPath: blogCanonicalPath(id, input.canonicalPath ?? fallback.canonicalPath),
    canonicalUrl: stringValue(input.canonicalUrl, fallback.canonicalUrl ?? blogCanonicalPath(id, input.canonicalPath ?? fallback.canonicalPath)),
    publishedAt: stringValue(input.publishedAt, fallback.publishedAt ?? ""),
    scheduledAt: stringValue(input.scheduledAt, fallback.scheduledAt ?? ""),
    indexStatus: indexStatusValue(input.indexStatus, fallback.indexStatus ?? "index"),
    authorId: stringValue(input.authorId, fallback.authorId ?? "admin"),
    author: stringValue(input.author, fallback.author ?? "Shreevan Wellness"),
    redirectEnabled: booleanValue(input.redirectEnabled, fallback.redirectEnabled ?? false),
    redirectUrl: stringValue(input.redirectUrl, fallback.redirectUrl ?? ""),
    redirectStatusCode: redirectStatusCodeValue(input.redirectStatusCode, fallback.redirectStatusCode ?? 301),
    schemaJson: stringValue(input.schemaJson, fallback.schemaJson ?? ""),
    createdAt: stringValue(input.createdAt, fallback.createdAt ?? now),
    updatedAt: stringValue(input.updatedAt, fallback.updatedAt ?? now),
    relatedHref: stringValue(input.relatedHref, fallback.relatedHref),
    relatedLabel: stringValue(input.relatedLabel, fallback.relatedLabel),
    contactLabel: stringValue(input.contactLabel, fallback.contactLabel),
    status: statusValue(input.status, fallback.status),
    featured: booleanValue(input.featured, fallback.featured),
  };
}

function normalizeMediaItem(value: unknown, fallback: AdminMediaItem): AdminMediaItem {
  const input = isRecord(value) ? value : {};

  return {
    id: stringValue(input.id, fallback.id),
    title: stringValue(input.title, fallback.title),
    type: mediaTypeValue(input.type, fallback.type),
    placement: stringValue(input.placement, fallback.placement),
    assetHint: stringValue(input.assetHint, fallback.assetHint),
    status: statusValue(input.status, fallback.status),
    notes: stringValue(input.notes, fallback.notes),
  };
}

function normalizeById<T extends { id: string }>(
  incoming: unknown,
  defaults: T[],
  normalizeItem: (value: unknown, fallback: T) => T,
) {
  const incomingItems = Array.isArray(incoming) ? incoming : [];
  const incomingById = new Map(
    incomingItems.filter(isRecord).map((item) => [typeof item.id === "string" ? item.id : "", item] as const),
  );

  return defaults.map((fallback) => normalizeItem(incomingById.get(fallback.id), fallback));
}

function normalizeJournalArticles(incoming: unknown, defaults: AdminJournalArticle[]) {
  const incomingItems = Array.isArray(incoming) ? incoming.filter(isRecord) : [];
  const incomingById = new Map(
    incomingItems.map((item) => [typeof item.id === "string" ? item.id : "", item] as const),
  );
  const defaultIds = new Set(defaults.map((item) => item.id));
  const defaultArticles = defaults.map((fallback) => normalizeJournalArticle(incomingById.get(fallback.id), fallback));
  const customArticles = incomingItems
    .filter((item) => typeof item.id === "string" && item.id && !defaultIds.has(item.id))
    .map((item, index) => normalizeJournalArticle(item, makeJournalArticleFallback(item, index)));

  return [...defaultArticles, ...customArticles];
}

export function normalizeAdminContentTrust(value: unknown): AdminContentTrustStore {
  const input = isRecord(value) ? value : {};

  return {
    faqCategories: normalizeById(input.faqCategories, defaultAdminContentTrust.faqCategories, normalizeFaqCategory),
    faqResearchSignals: stringArrayValue(input.faqResearchSignals, defaultAdminContentTrust.faqResearchSignals),
    responsibleStandards: normalizeById(
      input.responsibleStandards,
      defaultAdminContentTrust.responsibleStandards,
      normalizeTrustStandard,
    ),
    storyTrustMarkers: normalizeById(
      input.storyTrustMarkers,
      defaultAdminContentTrust.storyTrustMarkers,
      normalizeTrustStandard,
    ),
    storySlots: normalizeById(input.storySlots, defaultAdminContentTrust.storySlots, normalizeStorySlot),
    videoSlots: normalizeById(input.videoSlots, defaultAdminContentTrust.videoSlots, normalizeVideoSlot),
    outcomeRows: normalizeById(input.outcomeRows, defaultAdminContentTrust.outcomeRows, normalizeTrustStandard),
    consentStandards: stringArrayValue(input.consentStandards, defaultAdminContentTrust.consentStandards),
    journalCategories: stringArrayValue(input.journalCategories, defaultAdminContentTrust.journalCategories),
    journalArticles: normalizeJournalArticles(input.journalArticles, defaultAdminContentTrust.journalArticles),
    mediaItems: normalizeById(input.mediaItems, defaultAdminContentTrust.mediaItems, normalizeMediaItem),
    updatedAt: stringValue(input.updatedAt, defaultAdminContentTrust.updatedAt),
  };
}

export async function readAdminContentTrust() {
  if (isContentTrustStorageEphemeral()) {
    try {
      const overlay = await readFile(CONTENT_TRUST_EPHEMERAL_PATH, "utf8");

      return normalizeAdminContentTrust(JSON.parse(overlay));
    } catch (error) {
      if (!(isRecord(error) && error.code === "ENOENT")) {
        throw error;
      }
      // No overlay saved yet in this instance — fall through to the bundled file.
    }
  }

  try {
    const file = await readFile(CONTENT_TRUST_PATH, "utf8");

    return normalizeAdminContentTrust(JSON.parse(file));
  } catch (error) {
    if (isRecord(error) && error.code === "ENOENT") {
      return defaultAdminContentTrust;
    }

    throw error;
  }
}

export async function writeAdminContentTrust(value: unknown) {
  const contentTrust = {
    ...normalizeAdminContentTrust(value),
    updatedAt: new Date().toISOString(),
  };

  const targetPath = isContentTrustStorageEphemeral() ? CONTENT_TRUST_EPHEMERAL_PATH : CONTENT_TRUST_PATH;

  await mkdir(dirname(targetPath), { recursive: true });
  await writeFile(targetPath, `${JSON.stringify(contentTrust, null, 2)}\n`, "utf8");

  return contentTrust;
}

export async function saveAdminBlogCoverUpload(file: {
  arrayBuffer: () => Promise<ArrayBuffer>;
  name: string;
  size: number;
  type: string;
}) {
  const extension = allowedBlogUploadTypes.get(file.type);

  if (!extension) {
    throw new Error("Only JPG, PNG, WEBP and GIF image files are supported for blog covers.");
  }

  if (file.size <= 0) {
    throw new Error("The uploaded file is empty.");
  }

  if (file.size > MAX_BLOG_UPLOAD_BYTES) {
    throw new Error("Blog cover image must be 12MB or smaller.");
  }

  const originalBytes = Buffer.from(await file.arrayBuffer());
  let bytes = originalBytes;
  let finalExtension = extension;

  // Compress on upload: resize to a 1920px ceiling and re-encode as WebP q80.
  // GIFs are kept as-is (animation); if compression fails or doesn't help,
  // the original bytes are stored unchanged.
  if (extension !== ".gif") {
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
      }
    } catch {
      // sharp unavailable or unsupported input — store the original upload.
    }
  }

  const fileName = `${safeBaseName(file.name) || "blog-cover"}-${randomUUID()}${finalExtension}`;

  await mkdir(BLOG_UPLOAD_DIR, { recursive: true });
  await writeFile(join(BLOG_UPLOAD_DIR, fileName), bytes);

  return {
    kind: "image" as const,
    src: `${BLOG_UPLOAD_URL_BASE}/${fileName}`,
  };
}
