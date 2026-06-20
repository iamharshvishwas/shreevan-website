export type FaqLink = {
  href: string;
  label: string;
  external?: boolean;
};

export type FaqItem = {
  question: string;
  answer: string[];
  links?: FaqLink[];
};

export type FaqCategory = {
  id: string;
  label: string;
  intent: string;
  faqs: FaqItem[];
};

export const faqCategories: FaqCategory[] = [
  {
    id: "program-fit",
    label: "Program Fit",
    intent: "For visitors comparing 3, 7, 14, 28 and 60-day retreat depth.",
    faqs: [
      {
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
        question: "Do I need to know the exact program before booking a consultation?",
        answer: [
          "No. Many serious guests arrive with only a broad sense that they need a reset, deeper practice or a life transition container. You can choose “not sure yet” in the consultation form and explain what you are hoping to change.",
          "The team can then recommend a suitable direction, or advise you to wait if the retreat is not the right step right now.",
        ],
        links: [{ href: "/book-consultation", label: "Start with consultation" }],
      },
      {
        question: "Is the 60-day residency just a longer version of the retreat?",
        answer: [
          "No. The 60-day Rishi Tantra Lifestyle Transformation Residency should be treated as an advanced commitment, not a long holiday. It is for people who want structured practice, mentoring, lifestyle redesign and integration outputs that can continue after they return home.",
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
    faqs: [
      {
        question: "Is the suitability consultation free?",
        answer: [
          "Yes. The suitability conversation is positioned as a free fit check before you choose a program, finalize travel dates or move to payment.",
          "It is not designed to pressure you into booking. It should clarify your context, comfort, expectations and the safest next step.",
        ],
        links: [{ href: "/book-consultation", label: "Request the free call" }],
      },
      {
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
    faqs: [
      {
        question: "What accommodation and meals are included?",
        answer: [
          "Program inclusions should cover the retreat stay, daily vegetarian sattvic meals and the daily practice rhythm relevant to the selected program. Exact room category, check-in details and included support should be confirmed before payment.",
          "If you are travelling from the US, Canada or the UK, ask your room, climate, power, Wi-Fi and laundry questions early so the team can set realistic expectations.",
        ],
        links: [{ href: "/accommodation-inclusions", label: "View stay and food" }],
      },
      {
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
    faqs: [
      {
        question: "Where is Shreevan Wellness located?",
        answer: [
          "Shreevan Wellness is positioned in Rishikesh, Uttarakhand, India, near the sacred Ganga landscape. The exact stay address should be shared with confirmed guests after suitability and booking steps are complete.",
          "This protects guest privacy while still giving international visitors enough location clarity to evaluate travel effort and comfort before they commit.",
        ],
        links: [{ href: "/contact", label: "View contact and location" }],
      },
      {
        question: "Which airport should international guests consider?",
        answer: [
          "Many international guests plan around Delhi arrival and then a domestic connection or transfer toward Dehradun/Rishikesh. Exact airport, transfer and arrival-window guidance should be confirmed with the team because schedules and route comfort can change.",
          "The FAQ should guide planning, not replace live travel coordination. Use the consultation or contact page for your preferred arrival date and country.",
        ],
        links: [{ href: "/contact", label: "Ask travel questions" }],
      },
      {
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
    faqs: [
      {
        question: "Is Shreevan Wellness a medical or mental-health treatment centre?",
        answer: [
          "No. Shreevan Wellness is a structured wellness retreat platform, not a hospital, clinic, emergency service, psychiatric facility or substitute for medical care.",
          "Yoga, meditation, sattvic living, Panchkarma education and spiritual practices are presented as wellness and lifestyle support. They should not be interpreted as diagnosis, cure, medical treatment or mental-health therapy.",
        ],
        links: [{ href: "/wellness-disclaimer", label: "Read wellness disclaimer" }],
      },
      {
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
    faqs: [
      {
        question: "What outcomes can I realistically expect?",
        answer: [
          "Realistic outcomes are usually practical: clearer daily rhythm, better self-observation, a calmer food and sleep routine, guided practice familiarity and a more grounded plan for life after the retreat.",
          "The website should not promise permanent transformation from one stay. Longer programs create more structure, but the guest's readiness and after-retreat follow-through matter deeply.",
        ],
        links: [{ href: "/programs/14-day-transformation", label: "See transformation program" }],
      },
      {
        question: "What support do I get after the retreat?",
        answer: [
          "Each program should clarify its post-retreat outputs, such as a rhythm plan, personal practice direction or integration roadmap. Longer programs may include deeper planning, but the exact aftercare path should be confirmed before booking.",
          "If ongoing support is important to you, ask about it during the consultation instead of assuming it is included.",
        ],
        links: [{ href: "/programs/28-day-inner-awakening", label: "Explore flagship path" }],
      },
      {
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
];

export const faqResearchSignals = [
  "Which program duration fits my life stage?",
  "Can I trust the payment and booking path before international travel?",
  "What is included in stay, food and daily rhythm?",
  "Is this safe and responsible if I have health boundaries?",
  "How do I plan Rishikesh travel without guessing?",
];

export function faqPageSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqCategories.flatMap((category) =>
      category.faqs.map((faq) => ({
        "@type": "Question",
        name: faq.question,
        acceptedAnswer: {
          "@type": "Answer",
          text: faq.answer.join(" "),
        },
      })),
    ),
  };
}
