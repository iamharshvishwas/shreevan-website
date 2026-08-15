export type ModalityLink = {
  name: string;
  href: string;
  note: string;
};

export type ModalityFaq = {
  question: string;
  answer: string;
};

export type ModalityImage = {
  src: string;
  alt: string;
  caption?: string;
};

export type ModalityArticleSection = {
  title: string;
  body: string[];
};

export type ModalityQuickAnswer = {
  simpleTerms: string;
  bestFor: string[];
  whatToExpect: string[];
  whatItIsNot: string[];
};

export type ModalityRetreatStep = {
  stage: string;
  title: string;
  copy: string;
};

export type ModalityComparison = {
  title: string;
  intro: string[];
  image?: ModalityImage;
  columns: [string, string];
  rows: Array<{
    aspect: string;
    primary: string;
    comparison: string;
  }>;
};

export type ModalitySuitability = {
  maySuitYouIf: string[];
  beCarefulIf: string[];
  consultProfessionalIf: string[];
};

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
  hero: {
    eyebrow: string;
    tagline?: string;
    answer: string;
    boundaryNote: string;
  };
  heroImage?: ModalityImage;
  quickAnswer: ModalityQuickAnswer;
  articleSections: ModalityArticleSection[];
  comparison?: ModalityComparison;
  retreatImage?: ModalityImage;
  retreatExperience: ModalityRetreatStep[];
  suitability: ModalitySuitability;
  relatedModalities: ModalityLink[];
  relatedPrograms: ModalityLink[];
  futureBlogTopics: string[];
  faqs: ModalityFaq[];
  finalCta: {
    title: string;
    copy: string;
  };
};

export type ModalitiesHubContent = {
  hero: {
    eyebrow: string;
    title: string;
    answer: string;
    boundaryNote: string;
  };
  quickAnswer: ModalityQuickAnswer;
  articleSections: ModalityArticleSection[];
  decisionCards: Array<{
    title: string;
    copy: string;
    href: string;
  }>;
  responsibleStandards: Array<{
    title: string;
    copy: string;
  }>;
  faqs: ModalityFaq[];
  finalCta: {
    title: string;
    copy: string;
  };
};

const programs = {
  threeDay: {
    name: "3-Day Ganga Sattva Reset",
    href: "/programs/3-day-ganga-reset",
    note: "gentle entry and arrival reset",
  },
  sevenDay: {
    name: "7-Day Ganga Sattva Foundation",
    href: "/programs/7-day-foundation",
    note: "foundation for daily practice",
  },
  fourteenDay: {
    name: "14-Day Ganga Sattva Transformation",
    href: "/programs/14-day-transformation",
    note: "deeper routine and reflection arc",
  },
  twentyEightDay: {
    name: "28-Day Sattva Ganga Flagship Inner Awakening",
    href: "/programs/28-day-inner-awakening",
    note: "signature immersive pathway",
  },
  sixtyDay: {
    name: "60-Day Rishi Tantra Conscious Living Residency",
    href: "/programs/60-day-rishi-residency",
    note: "advanced lifestyle residency",
  },
} satisfies Record<string, ModalityLink>;

const modalityLinks = {
  yoga: {
    name: "Yoga Therapy & Medicine",
    href: "/modalities/yoga-therapy",
    note: "movement, posture, breath and embodied awareness",
  },
  meditation: {
    name: "Guided Meditation & Mind Mastery",
    href: "/modalities/guided-meditation",
    note: "attention, reflection and steady inner practice",
  },
  sound: {
    name: "Sound Healing & Vibrational Therapy",
    href: "/modalities/sound-healing",
    note: "listening, rest and sensory decompression",
  },
  panchkarma: {
    name: "Panchkarma & Deep Detox",
    href: "/modalities/panchkarma-detox",
    note: "Ayurveda-informed cleansing education and suitability review",
  },
  chakra: {
    name: "Chakra Opening & Energy Balancing",
    href: "/modalities/chakra-opening",
    note: "symbolic yogic self-inquiry and values reflection",
  },
  sadhana: {
    name: "Spiritual Sadhanas & Yogic Philosophy",
    href: "/modalities/spiritual-sadhanas",
    note: "discipline, meaning, silence and daily integration",
  },
} satisfies Record<string, ModalityLink>;

export const modalitiesHubContent: ModalitiesHubContent = {
  hero: {
    eyebrow: "Core wellness modalities",
    title: "Understand the practices before choosing a retreat program",
    answer:
      "Shreevan Wellness modalities are the educational practice layers behind the retreat programs. This hub explains what each practice means, how it is used inside a Rishikesh retreat rhythm, who it may suit, and where responsible boundaries sit.",
    boundaryNote:
      "These pages are educational and suitability-led. They do not replace medical care, mental-health care, medication, diagnosis, treatment, crisis support or emergency help.",
  },
  quickAnswer: {
    simpleTerms:
      "A modality is a practice method. A program is the duration-based retreat experience where selected modalities are combined into a daily rhythm.",
    bestFor: [
      "International guests comparing yoga, meditation, sound, Ayurveda and spiritual practice before travel.",
      "Professionals and founders who want structure instead of a vague wellness holiday.",
      "Beginners who need clear expectations before joining a retreat in India.",
    ],
    whatToExpect: [
      "Plain-language explanations of each practice.",
      "Suitability notes, safety boundaries and links to relevant programs.",
      "A clear path from learning to consultation without pressure.",
    ],
    whatItIsNot: [
      "Not a medical recommendation engine.",
      "Not a promise of instant healing, detox, awakening or transformation.",
      "Not a replacement for reading the program pages or speaking with the team.",
    ],
  },
  articleSections: [
    {
      title: "Why Shreevan separates modalities from programs",
      body: [
        "A serious retreat website should not force a visitor to choose a package before they understand the methods being used. The modality pages answer educational search intent: what yoga therapy means, how guided meditation is approached, why sound may be included, where Ayurveda-informed detox language needs caution, and how spiritual practice is held responsibly.",
        "The program pages answer a different intent. They explain duration, inclusions, travel readiness, rhythm, investment context and next steps. Keeping those two layers separate protects the search architecture, prevents keyword cannibalization, and gives international visitors a calmer decision path.",
      ],
    },
    {
      title: "How modalities work together inside a retreat",
      body: [
        "A retreat is not stronger because it lists more practices. It is stronger when the practices support a clear rhythm. Gentle movement can prepare the body for sitting. Guided meditation can create a reflective container. Sound can offer a quieter transition into rest. Sattvic meals and Ayurveda-informed routines can make the day feel coherent rather than random.",
        "At Shreevan, the purpose is not to overload the guest. The purpose is to help guests understand how body, attention, rest, food, place and daily structure interact. A shorter reset uses fewer layers. A longer residency can include deeper repetition, reflection and integration.",
      ],
    },
    {
      title: "How to choose the right modality page first",
      body: [
        "If you are physically restless, start with yoga therapy. If you are mentally overloaded, start with guided meditation. If you need a softer entry into stillness, sound healing may be the easiest page to read first. If you are asking about cleansing, food rhythm or Ayurveda, Panchkarma and deep detox should be read with the strongest safety boundary.",
        "If you are spiritually curious, chakra work and sadhana pages explain the symbolic and philosophical language used in some programs. The responsible path is to learn the practice, understand the boundary, then compare programs by duration and readiness.",
      ],
    },
    {
      title: "Responsible wellness is part of the offer",
      body: [
        "Premium wellness does not need exaggerated promises. Shreevan can be serious, traditional and spiritually rooted while still being clear that retreat practices are not medical care. This matters for guests traveling from the United States, Canada and the United Kingdom, where expectations around safety, informed consent and professional boundaries are high.",
        "The suitability call exists because not every practice is right for every person at every stage. Some guests need a gentle reset. Some need a longer container. Some need to speak with a qualified health professional before deciding. This clarity builds trust.",
      ],
    },
    {
      title: "How these pages support AEO, GEO and AI search",
      body: [
        "Answer engines and AI summaries reward pages that give clear definitions, direct answers, boundaries and contextual next steps. Each modality page is written to answer beginner questions quickly, then expand into deeper sections for visitors who want detail.",
        "The internal link structure is intentional. Modalities link to programs where they are applied. Program pages link back to modalities that explain the method. This gives search systems and human visitors a clean map of the Shreevan retreat system.",
      ],
    },
  ],
  decisionCards: [
    {
      title: "Start with Yoga Therapy",
      copy: "Best when the visitor wants movement, breath, posture awareness and a gentle way into routine.",
      href: "/modalities/yoga-therapy",
    },
    {
      title: "Start with Guided Meditation",
      copy: "Best when the visitor is mentally overloaded and wants a structured entry into stillness.",
      href: "/modalities/guided-meditation",
    },
    {
      title: "Start with Sound Healing",
      copy: "Best when the visitor needs a low-pressure rest practice and sensory decompression.",
      href: "/modalities/sound-healing",
    },
    {
      title: "Start with Panchkarma",
      copy: "Best when the visitor is asking about Ayurveda-informed cleansing, food rhythm and suitability.",
      href: "/modalities/panchkarma-detox",
    },
    {
      title: "Start with Chakra Work",
      copy: "Best when the visitor wants symbolic self-inquiry without medical or magical claims.",
      href: "/modalities/chakra-opening",
    },
    {
      title: "Start with Sadhana",
      copy: "Best when the visitor wants spiritual discipline, philosophy and integration into daily life.",
      href: "/modalities/spiritual-sadhanas",
    },
  ],
  responsibleStandards: [
    {
      title: "Suitability before intensity",
      copy: "The right practice depends on age, health context, travel readiness, prior experience and emotional capacity.",
    },
    {
      title: "Education before claims",
      copy: "Pages explain method, rhythm and boundaries instead of promising cures, guaranteed outcomes or instant awakening.",
    },
    {
      title: "Integration before performance",
      copy: "A premium retreat should help guests carry a realistic rhythm home, not perform an ideal version of wellness for a few days.",
    },
  ],
  faqs: [
    {
      question: "What is a wellness modality?",
      answer:
        "A wellness modality is a practice method used inside a retreat, such as yoga therapy, guided meditation, sound work, Ayurveda-informed routine or spiritual sadhana. It is different from a program. The program is the full retreat package with a duration, schedule, inclusions and consultation flow. The modality page explains the practice itself so you can understand what you may experience before choosing a package.",
    },
    {
      question: "Which modality should I read first if I am new to retreats?",
      answer:
        "Most first-time guests should begin with yoga therapy and guided meditation because they explain the two core foundations: body awareness and attention training. If you feel intimidated by physical practice, read guided meditation first. If stillness feels difficult, read yoga therapy first. After that, compare the 3-day and 7-day programs because they are easier entry points than the longer immersions.",
    },
    {
      question: "Are the modality pages medical advice?",
      answer:
        "No. The modality pages are educational content for wellness retreat decision-making. They do not diagnose, treat, cure or replace professional medical or mental-health care. If you have a medical condition, active mental-health concern, pregnancy, recent surgery, medication changes or significant symptoms, speak with a qualified professional before travel and discuss suitability with Shreevan before booking.",
    },
    {
      question: "How do modalities connect to the retreat programs?",
      answer:
        "Each program uses selected modalities according to duration and readiness. A 3-day reset may focus on gentle arrival, breath, routine and reflection. A 7-day foundation can add more continuity. Longer programs may include deeper practice repetition, integration, Ayurveda-informed education and structured personal rhythm. The modality pages link to the programs where each practice is most relevant.",
    },
    {
      question: "Why not put all modality content on one program page?",
      answer:
        "Putting every explanation on every program page creates a confusing user experience and weak search architecture. A modality page should answer educational questions like what guided meditation is. A program page should answer commercial and logistical questions like how many days, what is included and what the booking path looks like. Separating the two makes the site clearer for users and search systems.",
    },
    {
      question: "Can I choose a program without knowing the modality I want?",
      answer:
        "Yes. Many guests arrive with a life context rather than a modality preference. You may simply know that you need space, routine, rest, reflection or a more structured reset. In that case, compare the programs first, then use the suitability call to clarify which practices should be emphasized and which should be adapted or avoided.",
    },
    {
      question: "How does Shreevan keep spiritual wellness grounded?",
      answer:
        "The site avoids exaggerated promises and explains practices in plain language. Spiritual language is used as reflection, discipline and meaning-making, not as a substitute for health care or professional support. The focus is on consent-aware practice, daily rhythm, responsible facilitation and integration after the retreat. That keeps the experience serious without making unsafe claims.",
    },
  ],
  finalCta: {
    title: "Learn the method, then choose the container.",
    copy:
      "If you are unsure which practice or duration fits your current season, start with a suitability conversation. The goal is to route you toward the right level of support, not to push you into the longest program.",
  },
};

export const modalities: ModalityContent[] = [
  {
    slug: "yoga-therapy",
    title: "Yoga Therapy Retreat in Rishikesh",
    shortTitle: "Yoga Therapy",
    path: "/modalities/yoga-therapy",
    category: "Movement, breath and embodied awareness",
    description:
      "Gentle yoga-based wellness learning within Shreevan Wellness retreats, used for breath, posture awareness, rest and daily rhythm.",
    seoTitle: "Yoga Therapy Retreat in Rishikesh | Gentle & Guided | Shreevan",
    seoDescription:
      "Explore gentle yoga therapy in Rishikesh at Shreevan Wellness. Learn breath-led movement, posture awareness and daily rhythm in a non-medical retreat setting.",
    keywords: [
      "yoga therapy retreat in Rishikesh",
      "yoga therapy in Rishikesh",
      "yoga therapy retreat",
      "yoga therapy for beginners",
      "yoga therapy vs yoga",
      "gentle yoga retreat in Rishikesh",
      "yoga wellness retreat practice",
    ],
    summary:
      "Yoga therapy at Shreevan is gentle yoga-based wellness learning, not diagnosis or treatment. It helps guests explore breath, posture awareness, rest and daily rhythm inside a structured Rishikesh retreat.",
    hero: {
      eyebrow: "Core Modality · Shreevan Wellness Rishikesh",
      tagline: "Gentle Yoga for Breath, Posture and Daily Rhythm",
      answer:
        "Yoga therapy at Shreevan Wellness is a gentle, breath-led practice. This yoga therapy retreat in Rishikesh is paced for comfort, not performance. You learn simple movement, posture awareness and rest that can continue after the retreat.",
      boundaryNote:
        "This page is educational. Yoga therapy at Shreevan is a wellness practice, not medical care, physio care or pain care. If you have an injury, health condition, recent surgery or pregnancy, speak with a doctor or trained care provider before travel.",
    },
    heroImage: {
      src: "/images/modalities/yoga-therapy/yoga-therapy-retreat-rishikesh-hero.webp",
      alt: "Facilitator guiding a gentle yoga therapy retreat session in Rishikesh",
      caption: "Gentle, supported practice in a calm Rishikesh retreat setting.",
    },
    quickAnswer: {
      simpleTerms:
        "Yoga therapy in Rishikesh at Shreevan means gentle yoga-based wellness learning. It uses slow movement, breath cues, posture cues and rest. The aim is to help you notice your body and build a daily rhythm. It does not push advanced yoga shapes.",
      bestFor: [
        "Beginners who want a gentle yoga therapy retreat in Rishikesh.",
        "Guests who feel stiff, tired or disconnected from the body after long work seasons.",
        "Travelers who want breath, movement and rest in one clear practice.",
      ],
      whatToExpect: [
        "Slow breath-led movement and simple posture awareness.",
        "Options to pause, rest or modify the practice.",
        "A short daily rhythm you can continue at home.",
      ],
      whatItIsNot: [
        "Not physio care or medical treatment.",
        "Not a promise to remove pain or cure a condition.",
        "Not a hard fitness class or advanced asana class.",
      ],
    },
    articleSections: [
      {
        title: "What is yoga therapy at Shreevan?",
        body: [
          "Yoga therapy at Shreevan is yoga-based wellness learning. It uses gentle movement, breath, posture awareness and guided rest. The practice is simple, slow and suitable for many beginners.",
          "The goal is body awareness. You learn how you stand, sit, breathe, move and rest. You also learn when to soften effort and when to stop.",
          "This is not health treatment. It does not diagnose, treat or cure health conditions. It gives you a safe retreat setting to understand your body better.",
        ],
      },
      {
        title: "Why choose a yoga therapy retreat in Rishikesh?",
        body: [
          "A yoga therapy retreat in Rishikesh gives you time to slow down. You are not rushing from one class to another. You have space for movement, breath, meals, rest, silence and reflection.",
          "Many guests arrive after screen-heavy work, travel fatigue or high stress. They may not need a hard workout. They need a gentle way to return to the body.",
          "At Shreevan, the practice is held inside a full retreat rhythm. This makes the learning easier to carry into daily life.",
        ],
      },
      {
        title: "How the practice works inside the retreat day",
        body: [
          "A session may begin with simple arrival cues. You may notice the breath, the floor, the spine and areas that feel tense.",
          "The practice can include gentle joint work, standing balance, supported postures, slow shifts and rest. The guide offers options. You do not have to force a shape.",
          "Morning practice may prepare the body for meditation. Evening practice may help the body settle before sleep. Small repeats help the practice feel familiar.",
        ],
      },
      {
        title: "Key benefits of a yoga wellness retreat practice",
        body: [
          "The benefit is not only stretching. The real value is learning how your body responds to daily pressure.",
          "Breath awareness helps you notice shallow, fast or held breath. Posture awareness gives you simple cues for sitting, standing and moving.",
          "Slower shifts help you move with attention instead of rushing. Rest practice teaches that rest is part of training, not a failure. Daily rhythm gives you a simple routine that can fit normal life.",
        ],
      },
      {
        title: "What beginners should know",
        body: [
          "You do not need to be flexible. You also do not need a long yoga background. This page is designed for people who want yoga therapy for beginners in a clear retreat setting.",
          "The most useful skill is honesty. Tell the guide when something feels too strong. Stop if you feel sharp pain, dizziness, numbness or unsafe pressure.",
          "Gentle effort is normal. Pain is not the goal. A responsible practice respects the difference.",
        ],
      },
      {
        title: "What to be careful about",
        body: [
          "Do not choose a retreat only because it sounds intense. The better question is whether the practice fits your current body.",
          "Be careful with forceful breathing, headstands, deep twists, long holds or hot yoga if your body is not ready. These practices may not suit everyone.",
          "If you have recent surgery, pregnancy, spine concerns, blood pressure concerns, eye-pressure concerns, balance issues or chronic pain, speak with a doctor or trained care provider first.",
        ],
      },
    ],
    comparison: {
      title: "Yoga therapy vs a regular yoga class",
      intro: [
        "The main difference is the goal. A regular yoga class often focuses on a sequence. Yoga therapy at Shreevan focuses on body awareness, breath and daily rhythm.",
        "It is also slower. You can pause, use support or choose a softer option. The practice is not about proving flexibility. It is about learning what your body needs now.",
      ],
      image: {
        src: "/images/modalities/yoga-therapy/yoga-therapy-props-practice-clarity.webp",
        alt: "Yoga therapy props used for slow movement and posture awareness",
        caption: "Props help keep the practice slower, steadier and easier to adapt.",
      },
      columns: ["Yoga therapy at Shreevan", "Regular yoga class"],
      rows: [
        {
          aspect: "Goal",
          primary: "Breath, posture awareness and daily rhythm.",
          comparison: "One class or sequence.",
        },
        {
          aspect: "Pace",
          primary: "Slow, with changes when needed.",
          comparison: "Usually group-paced.",
        },
        {
          aspect: "Beginner fit",
          primary: "Built for beginners and people returning to yoga.",
          comparison: "Depends on class level.",
        },
        {
          aspect: "Focus",
          primary: "How the practice supports the full day.",
          comparison: "What happens on the mat.",
        },
        {
          aspect: "Boundary",
          primary: "Wellness learning, not treatment.",
          comparison: "General yoga or fitness practice.",
        },
      ],
    },
    retreatImage: {
      src: "/images/modalities/yoga-therapy/retreat-guest-journaling-after-yoga-therapy-rishikesh.webp",
      alt: "Guest journaling after yoga therapy practice at a Rishikesh retreat",
      caption: "Reflection helps guests connect the practice to daily rhythm.",
    },
    retreatExperience: [
      {
        stage: "Before session",
        title: "Readiness and pacing",
        copy:
          "Share comfort notes during the suitability process. Arrive in loose clothing, hydrated and ready to modify.",
      },
      {
        stage: "During session",
        title: "Movement with options",
        copy:
          "Practice may include breath, gentle joint work, supported postures and rest. Advanced shapes are not expected.",
      },
      {
        stage: "After session",
        title: "Reflection, not judgment",
        copy:
          "The useful question is simple: what did you notice about breath, effort, tension and rest?",
      },
      {
        stage: "Daily rhythm",
        title: "Small continuity",
        copy:
          "Longer stays repeat the practice so it feels familiar enough to continue at home.",
      },
    ],
    suitability: {
      maySuitYouIf: [
        "You want a gentle yoga retreat in Rishikesh with breath and movement.",
        "You are a beginner or returning after a long break.",
        "You feel stiff, tired or disconnected from your body.",
        "You prefer a practice that allows rest and modification.",
      ],
      beCarefulIf: [
        "You want intense postures before building basic awareness.",
        "You often ignore pain signals during practice.",
        "You expect yoga to fix a medical or injury-related issue by itself.",
      ],
      consultProfessionalIf: [
        "You have recent surgery, chronic pain or spine concerns.",
        "You are pregnant or have blood pressure, balance or eye-pressure concerns.",
        "You are under medical supervision and unsure which movements are safe.",
      ],
    },
    relatedModalities: [
      {
        ...modalityLinks.meditation,
        note: "guided meditation retreat practice",
      },
      {
        ...modalityLinks.sound,
        note: "sound healing retreat practice",
      },
      {
        ...modalityLinks.sadhana,
        note: "spiritual sadhana practice",
      },
    ],
    relatedPrograms: [
      {
        ...programs.threeDay,
        note: "3 days yoga retreat in Rishikesh",
      },
      {
        ...programs.sevenDay,
        note: "7 days yoga retreat in Rishikesh",
      },
      {
        ...programs.fourteenDay,
        note: "14 days yoga retreat in Rishikesh",
      },
      {
        ...programs.twentyEightDay,
        note: "28 day wellness retreat in Rishikesh",
      },
      {
        ...programs.sixtyDay,
        note: "60-day Rishi Tantra residency",
      },
    ],
    futureBlogTopics: [
      "Yoga therapy vs regular yoga class: what retreat guests should know",
      "How to prepare your body for a Rishikesh wellness retreat",
      "Gentle morning yoga rhythm for founders and executives",
    ],
    faqs: [
      {
        question: "What is yoga therapy?",
        answer:
          "Yoga therapy is a gentle yoga-based wellness practice. It uses movement, breath, posture awareness and rest to help you understand your body better. At Shreevan, it is educational and non-medical.",
      },
      {
        question: "Is yoga therapy at Shreevan a medical treatment?",
        answer:
          "No. Shreevan offers yoga-based wellness learning, not medical care or physio care. It may support general well-being and daily routine building, but it does not diagnose, treat or cure health conditions.",
      },
      {
        question: "Do I need previous yoga experience?",
        answer:
          "No. You do not need previous yoga experience for the gentler entry programs. The practice can be slowed down and modified. What matters is honest communication, not flexibility.",
      },
      {
        question: "How is this different from a normal yoga class?",
        answer:
          "A normal class often focuses on one session or sequence. Yoga therapy at Shreevan connects the practice to the wider retreat day, including breath, meals, rest, meditation, sleep and reflection.",
      },
      {
        question: "Can yoga therapy support stress or burnout-related fatigue?",
        answer:
          "It may support stress awareness and rest for some guests. It can help you notice breath, effort and tension patterns. It should not replace mental-health care, medical care or work changes when deeper support is needed.",
      },
      {
        question: "What if I have an injury or limited mobility?",
        answer:
          "Share this before booking. Some guests can practice with modifications, while others may need professional advice first. A responsible yoga therapy retreat should never push you through sharp pain or unsafe strain.",
      },
      {
        question: "Which Shreevan program uses yoga therapy the most?",
        answer:
          "Yoga therapy appears across the retreat pathway. The 3-day program uses it gently. The 7-day program builds continuity. The 14-day, 28-day and 60-day programs allow more repetition and reflection.",
      },
    ],
    finalCta: {
      title: "Choose a yoga therapy retreat in Rishikesh that fits your body",
      copy:
        "If you are unsure whether a gentle reset or a longer immersion fits your body, start with a suitability call. The goal is to choose a practice rhythm that feels clear, safe and realistic.",
    },
  },
  {
    slug: "guided-meditation",
    title: "Guided Meditation Retreat in Rishikesh",
    shortTitle: "Guided Meditation",
    path: "/modalities/guided-meditation",
    category: "Attention, reflection and inner steadiness",
    description:
      "Guided meditation and reflective practice for guests who need a calm, structured and responsible entry into stillness.",
    seoTitle: "Guided Meditation Retreat in Rishikesh | Shreevan Wellness",
    seoDescription:
      "Explore guided meditation in Rishikesh at Shreevan Wellness. Learn breath awareness, attention practice and simple stillness habits in a non-clinical retreat setting.",
    keywords: [
      "guided meditation retreat in Rishikesh",
      "guided meditation retreat",
      "guided meditation in Rishikesh",
      "meditation retreat in Rishikesh",
      "Rishikesh meditation retreat",
      "guided meditation for beginners",
      "meditation for beginners",
      "mind mastery retreat",
      "wellness meditation India",
    ],
    summary:
      "Guided meditation at Shreevan gives busy minds a clear place to begin. The practice uses breath awareness, simple attention cues and reflection without forcing silence.",
    hero: {
      eyebrow: "Core Modality · Shreevan Wellness Rishikesh",
      tagline: "Quiet Mental Noise, Practice Stillness and Build Attention Habits",
      answer:
        "Guided meditation at Shreevan Wellness gives busy minds a clear place to begin. This guided meditation retreat in Rishikesh uses breath awareness, simple attention cues and quiet reflection. The practice is gradual, beginner-friendly and free from forced silence. You learn a daily rhythm that can continue after the retreat.",
      boundaryNote:
        "This page is educational. Guided meditation at Shreevan is a wellness practice. It is not psychotherapy, psychiatric care, crisis care or a replacement for prescribed care. If you have active mental-health concerns, speak with a qualified professional before booking.",
    },
    heroImage: {
      src: "/images/modalities/guided-meditation/guided-meditation-retreat-rishikesh-hero.webp",
      alt: "Guided meditation retreat in Rishikesh with facilitator-led seated practice",
      caption: "A calm practice setting helps beginners enter stillness without pressure.",
    },
    quickAnswer: {
      simpleTerms:
        "Guided meditation in Rishikesh at Shreevan means a facilitator leads you through breath, sound, body awareness and reflection. You do not have to stop every thought. The aim is to notice the mind, soften pressure and build a simple meditation habit.",
      bestFor: [
        "Beginners who want a guided meditation retreat in Rishikesh.",
        "Guests who feel mentally busy, distracted or screen-tired.",
        "Professionals who want a calm routine they can continue at home.",
      ],
      whatToExpect: [
        "Clear breath cues and short periods of silence.",
        "Simple attention anchors, body awareness and reflection.",
        "Journaling or quiet integration after some sessions.",
      ],
      whatItIsNot: [
        "Not psychotherapy or psychiatric treatment.",
        "Not a promise to stop thoughts forever.",
        "Not a strict silent retreat or endurance test.",
      ],
    },
    articleSections: [
      {
        title: "What guided meditation means at Shreevan",
        body: [
          "Guided meditation is a supported attention practice. A facilitator gives simple cues so you are not left alone with a restless mind. The cue may be breath, sound, body sensation, a short phrase or a reflective question.",
          "This matters because many people feel more mental noise when life becomes quiet. Guidance helps you stay with the practice without forcing silence.",
          "At Shreevan, guided meditation is taught as wellness education. It is not therapy, diagnosis or treatment. It is a practical way to notice attention and build a calmer rhythm.",
        ],
      },
      {
        title: "Why guided meditation in Rishikesh helps beginners",
        body: [
          "A guided meditation retreat in Rishikesh gives you time away from screens, rushed meals and constant decisions. The setting supports slower breath, quieter mornings and steady practice.",
          "Many guests have tried meditation apps at home. They may still struggle with routine. A retreat gives them a clean container: guidance, food rhythm, movement, rest and reflection.",
          "This does not make meditation a quick fix. It simply gives the mind fewer distractions and a better place to learn.",
        ],
      },
      {
        title: "How the practice works inside the retreat day",
        body: [
          "A session may begin with arrival cues. You notice the seat, the breath and the body. The facilitator then gives a simple anchor for attention.",
          "Some sessions may include breath awareness. Some may include body scanning, sound focus, journaling or short silence. You can use a chair, cushion or soft gaze if needed.",
          "Morning guided meditation can help the day begin slowly. Evening practice can support reflection before rest. Repetition makes the practice easier to remember at home.",
        ],
      },
      {
        title: "Core practices used in guided meditation",
        body: [
          "Guided meditation at Shreevan uses simple practices instead of complicated theory. The goal is to make stillness understandable.",
          "Breath awareness helps you notice natural breathing without forcing it. Anchor practice gives attention one clear place to return. Body awareness helps you notice posture, tension and comfort.",
          "Sound awareness teaches listening without chasing every thought. Reflective journaling gives you a few clear notes after practice. These practices support guided meditation for beginners because they give the mind something clear to do.",
        ],
      },
      {
        title: "What beginners should know",
        body: [
          "You do not need prior meditation experience. You do not need to sit perfectly. You also do not need to stop every thought.",
          "Meditation for beginners works best when the practice is short, clear and kind. If the mind wanders, you return to the cue. That return is part of the practice.",
          "Some guests prefer eyes open. Some need a chair. Some need movement before sitting. A responsible retreat allows practical options.",
        ],
      },
      {
        title: "What to be careful about",
        body: [
          "Meditation can feel gentle, but it is not right for every person at every time. Long silence and deep inward focus can feel difficult for some guests.",
          "Be careful if you have active panic, severe depression, recent trauma, severe insomnia or crisis-level distress. In those situations, speak with a qualified mental-health professional before choosing a meditation-heavy retreat.",
          "The question is not whether meditation is good in general. The question is whether this form, duration and timing are suitable for you now.",
        ],
      },
    ],
    comparison: {
      title: "How a guided meditation retreat compares to apps and silent retreats",
      intro: [
        "A meditation app can help you start, but it cannot always adjust to your state. A silent retreat can be deep, but it may feel too intense for some beginners.",
        "A guided meditation retreat in Rishikesh sits between those options. It gives you human guidance, a retreat rhythm and enough softness to build trust with the practice.",
      ],
      image: {
        src: "/images/modalities/guided-meditation/guided-meditation-practice-clarity-rishikesh.webp",
        alt: "Guided meditation practice setup with cushion and journal in Rishikesh",
        caption: "Simple anchors make meditation easier to understand and repeat.",
      },
      columns: ["Guided meditation retreat at Shreevan", "Apps or strict silent retreats"],
      rows: [
        {
          aspect: "Guidance",
          primary: "Human guidance with clear cues.",
          comparison: "Pre-recorded audio or limited verbal guidance.",
        },
        {
          aspect: "Setting",
          primary: "Quiet Rishikesh retreat rhythm.",
          comparison: "Home, work setting or dedicated silence setting.",
        },
        {
          aspect: "Pace",
          primary: "Gentle and adjustable.",
          comparison: "Self-paced or often more intensive.",
        },
        {
          aspect: "Beginner fit",
          primary: "Built for gradual entry.",
          comparison: "Easy to start or better after readiness.",
        },
        {
          aspect: "Goal",
          primary: "Daily attention habits and reflection.",
          comparison: "Short practice support or deep silence discipline.",
        },
      ],
    },
    retreatImage: {
      src: "/images/modalities/guided-meditation/meditation-reflection-daily-rhythm-rishikesh.webp",
      alt: "Guest journaling after guided meditation at a Rishikesh retreat",
      caption: "Reflection helps guests carry the practice into daily life.",
    },
    retreatExperience: [
      {
        stage: "Before session",
        title: "Clear entry",
        copy:
          "The facilitator explains the practice, time and options before you begin.",
      },
      {
        stage: "During session",
        title: "Guided attention",
        copy:
          "You may notice breath, body, sound, silence or a simple reflective question.",
      },
      {
        stage: "After session",
        title: "Gentle grounding",
        copy:
          "You may journal, sit quietly or move slowly before returning to the day.",
      },
      {
        stage: "Daily rhythm",
        title: "Repeatable practice",
        copy:
          "The goal is a meditation habit you can continue, even if it is short.",
      },
    ],
    suitability: {
      maySuitYouIf: [
        "You want guided meditation for beginners in a calm retreat setting.",
        "You feel mentally busy and want a slower daily rhythm.",
        "You value reflection, journaling and self-observation.",
        "You want a guided meditation retreat that is not rigid or dogmatic.",
      ],
      beCarefulIf: [
        "You expect meditation to remove every thought.",
        "You are using retreat practice to avoid professional support.",
        "You want a very intense silent practice without prior experience.",
      ],
      consultProfessionalIf: [
        "You have active panic, severe depression or crisis-level distress.",
        "You are changing psychiatric medication or currently under clinical care.",
        "You have a trauma history and inward attention can feel destabilizing.",
      ],
    },
    relatedModalities: [
      {
        ...modalityLinks.yoga,
        note: "movement, breath and posture awareness",
      },
      {
        ...modalityLinks.sound,
        note: "guided rest and listening practice",
      },
      {
        ...modalityLinks.sadhana,
        note: "discipline, meaning and daily integration",
      },
      {
        ...modalityLinks.chakra,
        note: "symbolic self-inquiry and reflection",
      },
    ],
    relatedPrograms: [
      {
        ...programs.threeDay,
        note: "3 days yoga retreat in Rishikesh",
      },
      {
        ...programs.sevenDay,
        note: "7 days yoga retreat in Rishikesh",
      },
      {
        ...programs.fourteenDay,
        note: "14 days yoga retreat in Rishikesh",
      },
      {
        ...programs.twentyEightDay,
        note: "28 day wellness retreat in Rishikesh",
      },
      {
        ...programs.sixtyDay,
        note: "advanced lifestyle residency",
      },
    ],
    futureBlogTopics: [
      "Guided meditation vs silent meditation for first-time retreat guests",
      "How to prepare for a meditation retreat without forcing the mind",
      "What to do when meditation feels restless instead of calm",
    ],
    faqs: [
      {
        question: "What is guided meditation?",
        answer:
          "Guided meditation is a practice where a facilitator leads your attention with simple cues. The cue may be breath, sound, body awareness, silence or reflection. At Shreevan, it is a wellness practice, not therapy or medical care.",
      },
      {
        question: "Is guided meditation suitable for beginners?",
        answer:
          "Yes. Guided meditation for beginners is often easier than sitting alone in silence. The facilitator gives clear steps, short pauses and simple anchors. You do not need previous experience.",
      },
      {
        question: "What happens during a guided meditation session?",
        answer:
          "A session usually begins with arrival cues. You may notice breath, body, sound or a reflective question. The facilitator may include short silence, then guide you back gently.",
      },
      {
        question: "Will meditation stop my thoughts?",
        answer:
          "No. Meditation does not require a blank mind. Thoughts may continue. The practice is about noticing thoughts without automatically following each one.",
      },
      {
        question: "Can guided meditation help with stress?",
        answer:
          "Guided meditation may support stress awareness and general calm for some guests. It can give you space to notice breath, thought patterns and pressure. It is not a replacement for professional care when symptoms are significant.",
      },
      {
        question: "Is guided meditation the same as therapy?",
        answer:
          "No. Guided meditation at Shreevan is a non-clinical wellness and self-observation practice. It is not psychotherapy, psychiatric care, trauma treatment or crisis support.",
      },
      {
        question: "Which Shreevan programs include guided meditation?",
        answer:
          "Guided meditation appears across the Shreevan retreat pathway. The 3-day program uses it gently. The 7-day program builds rhythm. The 14-day, 28-day and 60-day programs allow more repetition and reflection.",
      },
    ],
    finalCta: {
      title: "Let stillness feel held, not forced.",
      copy:
        "If you are unsure how much guided meditation is right for you, use the suitability call. We will help you choose a guided meditation retreat in Rishikesh that fits your current capacity.",
    },
  },
  {
    slug: "sound-healing",
    title: "Sound Healing Retreat in Rishikesh",
    shortTitle: "Sound Healing",
    path: "/modalities/sound-healing",
    category: "Rest, stillness and sensory decompression",
    description:
      "Guided sound bath and sound-supported rest practice for guests who want a calmer entry into stillness.",
    seoTitle: "Sound Healing Retreat in Rishikesh | Sound Bath at Shreevan",
    seoDescription:
      "Experience a gentle sound healing retreat in Rishikesh with guided sound bath sessions, Tibetan singing bowls and quiet rest at Shreevan Wellness.",
    keywords: [
      "sound healing retreat in Rishikesh",
      "sound healing retreat",
      "sound healing in Rishikesh",
      "sound bath",
      "sound bath in Rishikesh",
      "sound therapy",
      "sound healing therapy",
      "Tibetan singing bowls",
      "sound bowls",
      "sound bath meditation",
    ],
    summary:
      "Sound healing at Shreevan is a guided listening and rest practice. It uses acoustic sound, silence and a calm retreat rhythm without medical or guaranteed-healing claims.",
    hero: {
      eyebrow: "Sound-Supported Rest Modality · Shreevan Wellness Rishikesh",
      tagline: "Sound Bath, Tibetan Singing Bowls and Gentle Sensory Rest",
      answer:
        "Sound healing at Shreevan Wellness is a guided listening and rest practice. This sound healing retreat in Rishikesh uses Tibetan singing bowls, chimes, silence and gentle pauses to help guests slow down. The session is calm, optional and held as part of the wider retreat rhythm. It is not a medical treatment or a dramatic spiritual performance.",
      boundaryNote:
        "Sound sessions are optional wellness practices. They are not medical treatment, trauma therapy, guaranteed nervous-system repair or a replacement for professional clinical care. If you have sound sensitivity, tinnitus, migraines, seizure history or recent trauma, speak with a qualified professional before joining.",
    },
    heroImage: {
      src: "/images/modalities/sound-healing/sound-healing-retreat-rishikesh.webp",
      alt: "Guided sound healing retreat in Rishikesh with Tibetan singing bowls",
      caption: "A gentle listening practice gives the mind a simple place to rest.",
    },
    quickAnswer: {
      simpleTerms:
        "Sound healing is a guided rest practice where you listen to steady acoustic tones. A sound bath usually means lying down or sitting while a facilitator plays Tibetan singing bowls, bells, chimes or soft rhythm. At Shreevan, sound healing in Rishikesh is used as a calm retreat layer. It may support rest and attention, but it is not presented as a cure.",
      bestFor: [
        "Guests who want a sound healing retreat in Rishikesh but prefer a gentle, non-clinical setting.",
        "People who find silent meditation difficult and need a soft sound anchor.",
        "Travelers who want quiet sensory rest after movement, conversation or screen time.",
      ],
      whatToExpect: [
        "A calm room, simple setup and clear guidance before the session begins.",
        "Supported lying down or seated rest with blankets, cushions or distance options.",
        "Periods of Tibetan singing bowls, chimes, silence and slow return.",
      ],
      whatItIsNot: [
        "Not clinical sound therapy or medical treatment.",
        "Not a promise of emotional release, sleep repair or guaranteed healing.",
        "Not a loud performance, spectacle or endurance practice.",
      ],
    },
    articleSections: [
      {
        title: "What sound healing means at Shreevan",
        body: [
          "Sound healing is a common wellness phrase, so Shreevan uses it carefully. Here, it means a guided listening and rest session. A facilitator may use Tibetan singing bowls, bells, chimes, voice, rhythm or silence to create a calm sound field.",
          "The aim is simple. You listen, rest and notice how your body responds. You do not have to perform, visualize or believe in a fixed outcome. The sound gives your attention something gentle to meet.",
          "This sound healing retreat in Rishikesh keeps the boundary clear. Sound can feel calming or meaningful for some guests, but it is not a medical protocol or guaranteed result.",
        ],
      },
      {
        title: "Why people explore sound bath sessions",
        body: [
          "Many people arrive at retreat with a busy mind. Even when the body is tired, the mind may still analyze, plan and repeat old thoughts. Sitting in silence can feel hard at first.",
          "A guided acoustic session gives the mind a softer entry point. Instead of trying to force silence, you listen to tone, rhythm and quiet pauses. This can make rest feel easier for beginners.",
          "This practice also fits the Rishikesh setting. The slower pace, river air, food rhythm and retreat schedule can help guests move from doing into listening.",
        ],
      },
      {
        title: "How a sound bath works inside a retreat",
        body: [
          "A session usually begins with a short explanation. The facilitator tells you what sounds may be used, how long the session will last and how to adjust your position.",
          "You may lie down, sit on a chair, keep your eyes open or close them. You can ask for more distance from the instruments if sound feels too strong. A responsible sound healing session should never make you feel trapped.",
          "During the session, the facilitator may use sound bowls, chimes, bells and periods of silence. The closing should be slow. You may sit quietly, drink water, stretch gently or journal.",
        ],
      },
      {
        title: "How Shreevan keeps sound therapy grounded",
        body: [
          "The phrase sound therapy can mean different things online. Some pages use strong claims about frequencies, chakras, trauma release or body repair. Shreevan does not use sound in that way on this page.",
          "At Shreevan, sound therapy language means a wellness practice that supports rest, listening and reflection. The facilitator holds a calm environment. Guests keep choice over posture, distance and participation.",
          "This is important for trust. The practice should feel quiet, respectful and consent-aware. It should not ask guests to believe that a specific result must happen.",
        ],
      },
      {
        title: "What beginners should know",
        body: [
          "You do not need experience with sound healing, sound bath meditation or Tibetan singing bowls. You only need to be willing to rest and listen.",
          "Some guests feel relaxed. Some feel emotional. Some feel neutral. All of these responses can be normal. Nothing dramatic needs to happen for the session to be useful.",
          "If you are new to this practice, choose comfort first. Use a cushion, sit instead of lie down, keep eyes open or ask to stay farther from the sound bowls.",
        ],
      },
      {
        title: "When to be careful",
        body: [
          "Sound can be intense for some people. Be careful if you have tinnitus, sound-triggered migraines, seizure history, acute anxiety, recent trauma or strong sensitivity to group-room sound.",
          "If you are unsure, speak with a qualified professional before booking. Also tell the Shreevan team before the session so the setup can be adjusted.",
          "A good sound healing retreat in Rishikesh should respect limits. Safety, consent and comfort matter more than intensity.",
        ],
      },
    ],
    comparison: {
      title: "Sound bath vs meditation vs music listening",
      intro: [
        "A guided sound session is not the same as casual music listening. It is also not the same as silent seated meditation. Each practice has a different role inside a retreat.",
        "At Shreevan, these sessions give the mind a gentle sound anchor. They can bridge movement, guided meditation and quiet evening rest.",
      ],
      image: {
        src: "/images/modalities/sound-healing/tibetan-singing-bowls-sound-bath-rishikesh.webp",
        alt: "Tibetan singing bowls and sound bath instruments for sound healing in Rishikesh",
        caption: "Simple instruments and clear guidance keep the practice grounded.",
      },
      columns: ["Shreevan guided sound session", "Silent meditation or casual music"],
      rows: [
        {
          aspect: "Main method",
          primary: "Guided acoustic listening and rest.",
          comparison: "Attention training or personal audio choice.",
        },
        {
          aspect: "Mental effort",
          primary: "Low to moderate, with sound as an anchor.",
          comparison: "Moderate for meditation, low for casual music.",
        },
        {
          aspect: "Body position",
          primary: "Lying down, seated or supported.",
          comparison: "Usually seated for meditation, any position for music.",
        },
        {
          aspect: "Retreat role",
          primary: "Bridge between movement, stillness and rest.",
          comparison: "Builds attention habits or offers informal downtime.",
        },
        {
          aspect: "Best for",
          primary: "Guests who need sensory support and quiet pacing.",
          comparison: "Guests ready for silence or simple personal relaxation.",
        },
      ],
    },
    retreatImage: {
      src: "/images/modalities/sound-healing/sound-bath-reflection-rishikesh-retreat.webp",
      alt: "Guest reflecting after a sound bath during a wellness retreat in Rishikesh",
      caption: "Quiet reflection helps the session become part of the retreat rhythm.",
    },
    retreatExperience: [
      {
        stage: "Before session",
        title: "Comfort setup",
        copy:
          "The facilitator explains the session length, sound level and posture choices. You can choose a mat, cushion, chair or more distance from the instruments.",
      },
      {
        stage: "During session",
        title: "Guided sound bath",
        copy:
          "The session may include Tibetan singing bowls, chimes, bells, soft rhythm and silence. Your only task is to stay comfortable and listen.",
      },
      {
        stage: "After session",
        title: "Slow return",
        copy:
          "The closing gives you time to sit up slowly, drink water, stretch gently or notice how you feel. There is no pressure to explain the experience.",
      },
      {
        stage: "Daily rhythm",
        title: "Reflection and integration",
        copy:
          "Longer programs may pair these sessions with journaling, meditation or evening rest. This helps the practice connect with daily life.",
      },
    ],
    suitability: {
      maySuitYouIf: [
        "You want a sound healing retreat in Rishikesh with clear guidance and a calm setting.",
        "You find silent meditation difficult and prefer a sound anchor.",
        "You enjoy gentle sensory practices, music, rhythm or quiet atmosphere.",
        "You want a softer modality inside a structured wellness retreat.",
      ],
      beCarefulIf: [
        "You are sensitive to sound, vibration or group-room intensity.",
        "You expect sound healing therapy to guarantee a specific result.",
        "You feel uncomfortable lying still and need a seated option.",
        "You prefer complete silence during rest practices.",
      ],
      consultProfessionalIf: [
        "You have tinnitus, seizure history, sound-triggered migraines or neurological symptoms.",
        "You have recent trauma or strong triggers around enclosed acoustic environments.",
        "You are pregnant, recovering from surgery or unsure about sensory practices.",
        "You currently need clinical mental-health or medical support.",
      ],
    },
    relatedModalities: [
      {
        ...modalityLinks.meditation,
        note: "attention, reflection and steady practice",
      },
      {
        ...modalityLinks.yoga,
        note: "movement, breath and posture awareness",
      },
      {
        ...modalityLinks.sadhana,
        note: "discipline, meaning and daily integration",
      },
      {
        ...modalityLinks.chakra,
        note: "symbolic self-inquiry and reflection",
      },
    ],
    relatedPrograms: [
      {
        ...programs.threeDay,
        note: "arrival reset and gentle sound-supported rest",
      },
      {
        ...programs.sevenDay,
        note: "foundation rhythm with sound-supported rest",
      },
      {
        ...programs.fourteenDay,
        note: "deeper sensory calm and reflection arc",
      },
      {
        ...programs.twentyEightDay,
        note: "longer integration through rest and practice",
      },
    ],
    futureBlogTopics: [
      "What to expect in a guided sound session at a wellness retreat",
      "Sound healing vs meditation: which is easier for beginners?",
      "How to evaluate sound healing claims responsibly",
    ],
    faqs: [
      {
        question: "What is sound healing in a retreat context?",
        answer:
          "Sound healing in a retreat context is a guided rest practice where guests listen to resonant acoustic instruments such as Tibetan singing bowls, chimes, bells and soft rhythm. At Shreevan, it is used as a calm wellness modality. It supports listening, rest and reflection, but it is not presented as medical treatment.",
      },
      {
        question: "What is the difference between sound healing and a sound bath?",
        answer:
          "Sound healing is the broader wellness phrase. A sound bath is one session format where guests usually sit or lie down while sound moves through the room. At Shreevan, the terms are used carefully. The focus is guided acoustic rest, not a guaranteed healing outcome.",
      },
      {
        question: "Is sound healing scientifically proven?",
        answer:
          "Research around sound baths and singing bowls is still developing, and many online claims are too strong. Listening to calm acoustic tones may help some people relax, but Shreevan does not promise clinical results, sleep repair, trauma release or permanent change. The practice is offered as one supportive retreat layer.",
      },
      {
        question: "What if I am sensitive to sound?",
        answer:
          "Tell the team before booking and before the session starts. You may need lower volume, more distance from the instruments, a chair, ear coverage or the option to step out. If you have tinnitus, migraines, seizure history or sound-triggered symptoms, consult a qualified professional first.",
      },
      {
        question: "Do I need to believe in vibration or energy for it to work?",
        answer:
          "No. You can approach the session as simple listening and rest. Some guests connect sound with spiritual language. Others experience it as atmosphere, rhythm or quiet time. Shreevan keeps the practice open, grounded and respectful of different backgrounds.",
      },
      {
        question: "Can sound bath sessions replace meditation?",
        answer:
          "These sessions can make stillness easier for some beginners, but they do not fully replace meditation training. Meditation builds attention through repeated practice. Guided sound gives the mind a gentle anchor and can support the transition into quieter practice.",
      },
      {
        question: "Which Shreevan programs include sound healing?",
        answer:
          "Sound healing may be included in the 7-day, 14-day and 28-day retreat pathways when it fits the group, schedule and suitability needs. Shorter programs may use it lightly for arrival or rest. The exact rhythm depends on the retreat plan and guest readiness.",
      },
    ],
    finalCta: {
      title: "Use sound as support, not spectacle.",
      copy:
        "If you want a softer way into rest and meditation, ask during the suitability call whether a sound healing retreat in Rishikesh fits your goals, sensitivity and program length.",
    },
  },
  {
    slug: "panchkarma-detox",
    title: "Panchkarma & Deep Detox",
    shortTitle: "Panchkarma Detox",
    path: "/modalities/panchkarma-detox",
    category: "Ayurveda-informed cleansing education",
    description:
      "Responsible Panchkarma and detox education within suitability-led retreat planning, without disease cure or guaranteed detox claims.",
    seoTitle: "Panchkarma and Detox Retreat Education | Shreevan Wellness",
    seoDescription:
      "Learn how Shreevan Wellness discusses Panchkarma and detox responsibly, with suitability checks, Ayurveda-informed education and no cure claims.",
    keywords: [
      "Panchkarma retreat India",
      "detox retreat Rishikesh",
      "Ayurveda wellness retreat",
      "responsible detox retreat",
      "Panchkarma education",
    ],
    summary:
      "Panchkarma and detox language must stay careful. Shreevan treats this as suitability-led wellness education and retreat support, not a promise to cure, treat or medically cleanse disease.",
    hero: {
      eyebrow: "Ayurveda-informed retreat education",
      answer:
        "Panchkarma and deep detox at Shreevan are discussed through readiness, food rhythm, rest, routine and responsible expectation-setting. This page explains the wellness context before any deeper recommendation is considered.",
      boundaryNote:
        "This is not medical cleansing, treatment, diagnosis, cure or a replacement for professional medical advice. Suitability review is essential.",
    },
    quickAnswer: {
      simpleTerms:
        "Panchkarma is a traditional Ayurvedic cleansing framework. On this site, it is explained carefully as Ayurveda-informed education and readiness conversation within a retreat context.",
      bestFor: [
        "Guests curious about Ayurveda, food rhythm and deeper lifestyle reset.",
        "Visitors considering longer programs where routine and rest can be held properly.",
        "People who want careful expectation-setting before using detox language.",
      ],
      whatToExpect: [
        "Discussion of readiness, food, rest, routine and comfort.",
        "Clear boundaries around health claims and professional guidance.",
        "More relevance in longer programs than short resets.",
      ],
      whatItIsNot: [
        "Not a disease cleanse or guaranteed detox.",
        "Not medical treatment or a substitute for your doctor.",
        "Not something to rush into because it sounds advanced.",
      ],
    },
    articleSections: [
      {
        title: "What Panchkarma means in this context",
        body: [
          "Panchkarma belongs to the Ayurvedic tradition, and many guests search for it when they are interested in cleansing, reset, food discipline and deeper routine. Shreevan treats this topic with extra care because detox language online is often exaggerated.",
          "On this website, Panchkarma and deep detox are framed as Ayurveda-informed education and suitability-led planning. The retreat can discuss rhythm, meals, rest, preparation and readiness. It should not promise to remove disease, cleanse organs, reverse conditions or replace professional care.",
        ],
      },
      {
        title: "Why people explore it",
        body: [
          "Guests often explore detox when they feel heavy, depleted, overstimulated or disconnected from healthy routine. They may want a clean environment, simpler food, reduced digital load, better sleep rhythm and guidance around how to stop living in constant excess.",
          "Those goals can be valid without turning the page into a medical claim. For many retreat guests, the practical value may be in structure: eating at regular times, resting properly, observing cravings, simplifying inputs and understanding how lifestyle patterns affect daily energy.",
        ],
      },
      {
        title: "How it works inside a retreat",
        body: [
          "Panchkarma-informed retreat planning begins before the guest arrives. The team needs to understand basic context, comfort level, medical boundaries and expectations. A short stay is not the same as a longer residency. Deeper practices require more time, more supervision and more careful screening.",
          "Inside the retreat, the focus may include sattvic meals, rest windows, gentle movement, hydration, reflection, reduced stimulation and conversations around daily rhythm. Any deeper Ayurvedic recommendation should be handled by appropriately qualified professionals and only when suitable.",
        ],
      },
      {
        title: "How Shreevan approaches it",
        body: [
          "Shreevan's approach is conservative. The site does not use detox as a fear-based selling tool. It does not tell visitors that they are toxic, broken or in need of dramatic cleansing. It invites a responsible conversation about readiness and the level of support that is appropriate.",
          "This is especially important for international guests. A visitor flying from the US, Canada or the UK needs to understand what is included, what is not included, what requires professional review and what should not be attempted casually while traveling.",
        ],
      },
      {
        title: "What beginners should know",
        body: [
          "Beginners should not choose the most intense option first because it sounds more powerful. In wellness, intensity without readiness can create discomfort, confusion or risk. A simple foundation of food rhythm, sleep, movement and reflection may be more useful than trying to do too much too quickly.",
          "If you are new to Ayurveda, begin by learning the language: digestion, routine, rest, constitution, season, food quality and habit. Then use the suitability call to understand whether a Panchkarma-informed pathway belongs in your retreat plan.",
        ],
      },
      {
        title: "What to be careful about",
        body: [
          "Be careful with any detox promise that sounds guaranteed, medical or urgent. Be especially careful if you are pregnant, breastfeeding, underweight, managing an eating-disorder history, taking medication, managing a chronic condition, recovering from surgery or dealing with significant symptoms.",
          "A responsible retreat should never pressure you to stop medication, ignore medical advice, fast aggressively or treat discomfort as proof that the process is working. Professional guidance and suitability boundaries come first.",
        ],
      },
    ],
    retreatExperience: [
      {
        stage: "Before session",
        title: "Suitability conversation",
        copy:
          "The team clarifies health context, expectations, food comfort, travel timing and whether professional input is needed.",
      },
      {
        stage: "During retreat",
        title: "Rhythm and simplicity",
        copy:
          "Practice may emphasize meals, rest, light movement, hydration, reflection and reduced stimulation instead of dramatic claims.",
      },
      {
        stage: "After deeper work",
        title: "Careful integration",
        copy:
          "The guest should transition gradually, observe energy and continue only what is realistic and appropriate.",
      },
      {
        stage: "Daily rhythm",
        title: "Lifestyle context",
        copy:
          "The deeper value is often in understanding daily choices, not chasing an extreme cleanse.",
      },
    ],
    suitability: {
      maySuitYouIf: [
        "You want Ayurveda-informed education, food rhythm and lifestyle simplification.",
        "You are considering a longer retreat where rest and routine can be held.",
        "You are comfortable with a careful suitability-first process.",
      ],
      beCarefulIf: [
        "You are looking for a guaranteed cleanse or fast result.",
        "You want to use detox language to override medical advice.",
        "You have a history of extreme dieting or body-focused anxiety.",
      ],
      consultProfessionalIf: [
        "You are pregnant, breastfeeding, underweight or recovering from surgery.",
        "You take medication or manage diabetes, heart conditions, kidney concerns or chronic illness.",
        "You have an eating-disorder history or active symptoms that require clinical care.",
      ],
    },
    relatedModalities: [modalityLinks.yoga, modalityLinks.meditation, modalityLinks.sadhana],
    relatedPrograms: [programs.fourteenDay, programs.twentyEightDay, programs.sixtyDay],
    futureBlogTopics: [
      "Responsible detox retreat expectations for international guests",
      "Panchkarma retreat questions to ask before booking",
      "Sattvic food rhythm vs extreme detox claims",
    ],
    faqs: [
      {
        question: "Is Panchkarma the same as a detox retreat?",
        answer:
          "Panchkarma is a traditional Ayurvedic cleansing framework, while detox retreat is a broad modern phrase that is often used loosely. Shreevan treats the topic carefully. The page explains Ayurveda-informed education, food rhythm, rest and suitability rather than promising a medical cleanse. Any deeper recommendation should depend on readiness, context and qualified guidance.",
      },
      {
        question: "Does Shreevan promise detox results?",
        answer:
          "No. Shreevan does not promise organ cleansing, weight loss, cure or guaranteed results. The responsible value is in structured routine, simpler meals, rest, reduced stimulation and guided reflection. Some guests may feel lighter or clearer, but the site does not turn that possibility into a claim. Suitability and safety come first.",
      },
      {
        question: "Who should be careful with Panchkarma or detox language?",
        answer:
          "Anyone pregnant, breastfeeding, taking medication, managing chronic illness, recovering from surgery, underweight, diabetic, medically unstable or dealing with an eating-disorder history should be careful. This does not mean every retreat is impossible. It means professional advice and transparent suitability review are essential before choosing a deeper cleansing-oriented path.",
      },
      {
        question: "Can I do Panchkarma in a 3-day retreat?",
        answer:
          "A 3-day retreat is better for arrival, rest, simple routine and gentle reset. It is usually too short for deeper Panchkarma-style expectations. If you are seriously interested in Ayurveda-informed cleansing, review the 14-day, 28-day or 60-day pathways and discuss what is realistic during the suitability call. Duration and readiness matter.",
      },
      {
        question: "Will I have to fast or follow a strict diet?",
        answer:
          "Do not assume that. Shreevan's content emphasizes sattvic meals, routine and suitability rather than aggressive restriction. Any food plan should consider comfort, health context, travel demands and professional guidance when needed. A premium retreat should never use fear or shame around food. The goal is a supportive rhythm, not punishment.",
      },
      {
        question: "How does Panchkarma connect with yoga and meditation?",
        answer:
          "In a retreat, Ayurveda-informed routine can support the wider day. Simple meals, rest and regular timing can make yoga and meditation feel more coherent. Yoga brings body awareness, meditation supports attention, and Ayurveda-informed education helps guests notice lifestyle patterns. The practices should support each other gently, not overwhelm the guest.",
      },
    ],
    finalCta: {
      title: "Treat detox language with care.",
      copy:
        "If Ayurveda-informed cleansing is part of your interest, use the suitability call to clarify what is appropriate, what requires professional input and which program length can hold it responsibly.",
    },
  },
  {
    slug: "chakra-opening",
    title: "Chakra Opening & Energy Balancing",
    shortTitle: "Chakra Opening",
    path: "/modalities/chakra-opening",
    category: "Symbolic self-inquiry and energetic awareness",
    description:
      "A reflective, non-clinical modality for guests exploring yogic symbolism, attention, breath and inner awareness.",
    seoTitle: "Chakra Opening Retreat Education | Shreevan Wellness",
    seoDescription:
      "Understand chakra opening at Shreevan Wellness as symbolic self-inquiry and reflective yogic practice without medical or guaranteed outcome claims.",
    keywords: [
      "chakra opening retreat",
      "energy balancing retreat",
      "chakra meditation India",
      "spiritual retreat Rishikesh",
      "yogic self inquiry",
    ],
    summary:
      "Chakra work is handled as reflective yogic language, not a diagnostic system. It supports self-inquiry, intention setting and personal meaning inside a wider retreat rhythm.",
    hero: {
      eyebrow: "Yogic symbolism and self-inquiry",
      answer:
        "Chakra opening at Shreevan is a symbolic and reflective practice layer. It helps guests explore themes such as grounding, expression, compassion and clarity through breath, meditation and journaling.",
      boundaryNote:
        "This page does not claim that chakras diagnose illness, cure conditions, remove trauma or guarantee spiritual awakening.",
    },
    quickAnswer: {
      simpleTerms:
        "Chakra work uses traditional yogic symbolism as a map for reflection. At Shreevan, it is treated as meaning-making and practice inquiry, not as medical diagnosis.",
      bestFor: [
        "Guests who are spiritually curious but want grounded language.",
        "Seekers exploring values, intention, expression and inner alignment.",
        "Longer-program guests ready for reflective work beyond routine.",
      ],
      whatToExpect: [
        "Meditation, breath, journaling and guided reflection.",
        "Symbolic themes rather than medical interpretation.",
        "Connection with yoga, sound and sadhana practices.",
      ],
      whatItIsNot: [
        "Not a clinical energy diagnosis.",
        "Not guaranteed chakra clearing or instant healing.",
        "Not a way to bypass therapy, medical care or practical life decisions.",
      ],
    },
    articleSections: [
      {
        title: "What chakra opening means here",
        body: [
          "Chakra language can be powerful, but it can also be misused. Shreevan treats chakra opening as a symbolic yogic map for self-inquiry. The themes may include grounding, creative flow, discipline, compassion, expression, insight and connection. These themes can help a guest reflect on life patterns without turning the page into a diagnostic system.",
          "This means the practice is not used to tell a guest that a specific chakra is the reason for a medical condition. It is not used to claim trauma has been cleared. It is not used to create fear. It is a reflective language that can sit alongside meditation, breath, journaling and sadhana.",
        ],
      },
      {
        title: "Why people explore it",
        body: [
          "People often come to chakra work when ordinary productivity language no longer explains what they are feeling. They may be asking questions about identity, voice, trust, purpose, grief, transitions or spiritual direction. Chakra symbolism can provide a structured way to explore those questions.",
          "For international guests, this page must make the language accessible without flattening its Indian spiritual context. The tone should be respectful, clear and non-sensational. The visitor should understand that they are entering a reflective tradition, not buying a guaranteed energetic repair.",
        ],
      },
      {
        title: "How it works inside a retreat",
        body: [
          "A chakra-themed session may include breath, gentle movement, visualization, mantra, journaling or guided inquiry around a theme. For example, a grounding session may focus on stability and routine. A heart-centered reflection may explore compassion and boundaries. A throat-centered reflection may examine truth and expression.",
          "The practice becomes more meaningful when connected to daily rhythm. What does grounding mean at breakfast? What does expression mean in a group circle? What does clarity mean when choosing the next step after the retreat? This turns symbolism into lived reflection.",
        ],
      },
      {
        title: "How Shreevan approaches it",
        body: [
          "Shreevan's approach is spiritually literate and cautious. It allows guests to explore subtle language without being pressured into belief. Some guests may experience chakra work as spiritual practice. Others may experience it as guided reflection. Both can be respected.",
          "The facilitator's role is to hold the map lightly. The guest remains the authority on their own experience. No one should be told that they are blocked, broken or spiritually behind. A premium retreat should deepen reflection without creating dependency.",
        ],
      },
      {
        title: "What beginners should know",
        body: [
          "You do not need to memorize the chakra system before arriving. A good session explains the theme in simple language and gives you a way to reflect. You can participate through breath, journaling and quiet attention even if you do not share every belief associated with the tradition.",
          "Beginners should also avoid chasing dramatic experiences. Some sessions may feel subtle. Some may bring insight. Some may simply feel like a quiet practice. The integration question is more important: what did you notice, and how does that inform your next daily choice?",
        ],
      },
      {
        title: "What to be careful about",
        body: [
          "Be careful with any practitioner or page that claims to diagnose illness, remove trauma, open all chakras instantly or guarantee awakening. These claims are not appropriate for a responsible wellness retreat.",
          "If reflection brings up intense distress, it may be a sign that professional support is needed. Spiritual practice should not be used to bypass therapy, medical care, relational repair or practical decisions. It should help you become more honest, not less grounded.",
        ],
      },
    ],
    retreatExperience: [
      {
        stage: "Before session",
        title: "Theme setting",
        copy:
          "The facilitator explains the symbolic theme and gives guests a grounded way to enter without needing prior knowledge.",
      },
      {
        stage: "During session",
        title: "Reflection and practice",
        copy:
          "The session may include breath, meditation, journaling, mantra, visualization or gentle movement.",
      },
      {
        stage: "After session",
        title: "Meaning into action",
        copy:
          "Guests reflect on how the theme relates to routine, relationships, choices and post-retreat integration.",
      },
      {
        stage: "Daily rhythm",
        title: "Symbolism becomes practical",
        copy:
          "A theme such as grounding or expression is explored through simple choices, not only through session language.",
      },
    ],
    suitability: {
      maySuitYouIf: [
        "You are spiritually curious and want grounded reflective language.",
        "You want to explore values, voice, compassion, purpose or transition.",
        "You are choosing a longer program with enough space for integration.",
      ],
      beCarefulIf: [
        "You want someone to diagnose your life through chakra language.",
        "You are chasing a dramatic spiritual experience.",
        "You use spiritual explanations to avoid practical or professional support.",
      ],
      consultProfessionalIf: [
        "You are in acute emotional distress or crisis.",
        "You have trauma history and deep introspection can destabilize you.",
        "You need medical or mental-health support for symptoms or safety.",
      ],
    },
    relatedModalities: [modalityLinks.meditation, modalityLinks.sound, modalityLinks.sadhana, modalityLinks.yoga],
    relatedPrograms: [programs.fourteenDay, programs.twentyEightDay, programs.sixtyDay],
    futureBlogTopics: [
      "Chakra work without overclaims: a beginner guide",
      "Energy balancing vs emotional awareness in retreat practice",
      "How to use chakra symbolism for journaling and integration",
    ],
    faqs: [
      {
        question: "What does chakra opening mean at Shreevan?",
        answer:
          "At Shreevan, chakra opening means symbolic self-inquiry through yogic themes, breath, meditation and reflection. It does not mean a practitioner diagnoses your health or guarantees an energetic result. The practice may help guests explore grounding, expression, compassion, clarity and intention in a structured way. It is held as reflection, not medical or psychological treatment.",
      },
      {
        question: "Do I need to believe in chakras?",
        answer:
          "No. You can approach the practice as a symbolic map for reflection. Some guests connect deeply with the traditional language, while others use the themes as prompts for journaling and self-awareness. Shreevan should not pressure belief. The goal is honest inquiry, respectful practice and integration into daily life, not forced agreement.",
      },
      {
        question: "Can chakra work heal trauma?",
        answer:
          "Shreevan does not make that claim. Trauma requires appropriate professional support, and spiritual practice should not be used as a substitute. Chakra-themed reflection may bring awareness to themes like safety, voice or boundaries, but it should be paced carefully. If you know introspection can destabilize you, consult a qualified professional and discuss suitability before booking.",
      },
      {
        question: "What happens in a chakra session?",
        answer:
          "A session may begin with a theme, such as grounding or expression. The facilitator may then guide breath, meditation, visualization, journaling or gentle movement. The practice should include a grounded close, so guests can connect the theme to daily choices. It should not feel like a mysterious performance or a forced emotional release.",
      },
      {
        question: "Which programs include chakra opening?",
        answer:
          "Chakra work is most relevant in the 14-day, 28-day and 60-day programs because those durations allow more reflection and integration. It may not be central to every guest's plan. The suitability call helps decide whether this language feels useful, neutral or unnecessary for your retreat goals.",
      },
      {
        question: "How is chakra work different from spiritual sadhana?",
        answer:
          "Chakra work uses symbolic themes as a reflection map. Sadhana is broader daily discipline: practice, silence, study, mantra, service and integration. Chakra work may appear inside sadhana, but it is not the whole path. If you want a grounded daily spiritual rhythm, read the spiritual sadhanas page next.",
      },
    ],
    finalCta: {
      title: "Explore subtle language without losing the ground.",
      copy:
        "If chakra work is part of your curiosity, discuss it during the suitability call so the practice can be held with clarity, consent and appropriate pacing.",
    },
  },
  {
    slug: "spiritual-sadhanas",
    title: "Spiritual Sadhanas & Yogic Philosophy",
    shortTitle: "Spiritual Sadhanas",
    path: "/modalities/spiritual-sadhanas",
    category: "Practice discipline, meaning and integration",
    description:
      "Yogic philosophy and sadhana practice for guests who want grounded spiritual depth without pressure, performance or inflated claims.",
    seoTitle: "Spiritual Sadhana Retreat Practice | Shreevan Wellness",
    seoDescription:
      "Explore how Shreevan Wellness uses spiritual sadhanas and yogic philosophy for grounded practice, reflection and integration.",
    keywords: [
      "spiritual sadhana retreat",
      "yogic philosophy retreat",
      "Rishikesh spiritual retreat",
      "conscious living retreat",
      "daily sadhana practice",
    ],
    summary:
      "Sadhana at Shreevan means steady practice, not spiritual performance. The goal is disciplined rhythm, humility, reflection and integration into daily life.",
    hero: {
      eyebrow: "Yogic discipline and conscious living",
      answer:
        "Spiritual sadhana at Shreevan is a grounded daily practice path that may include silence, meditation, mantra, study, reflection, service and integration into ordinary life.",
      boundaryNote:
        "Sadhana is not spiritual pressure, guru dependency, superiority, guaranteed awakening or a replacement for professional support when needed.",
    },
    quickAnswer: {
      simpleTerms:
        "Sadhana means steady practice. It is the discipline of returning to a chosen rhythm again and again so insight can become part of daily life.",
      bestFor: [
        "Guests who want depth beyond a wellness holiday.",
        "Seekers who value philosophy, silence and daily discipline.",
        "Longer-stay guests ready to integrate practice into life decisions.",
      ],
      whatToExpect: [
        "Meditation, reflection, silence, mantra, study or service depending on program design.",
        "Simple daily rhythm rather than dramatic spiritual theater.",
        "Questions about how practice continues after departure.",
      ],
      whatItIsNot: [
        "Not a promise of enlightenment.",
        "Not forced belief, conversion or guru pressure.",
        "Not an escape from practical responsibilities.",
      ],
    },
    articleSections: [
      {
        title: "What sadhana means",
        body: [
          "Sadhana is disciplined spiritual practice. In a retreat context, it means returning to a rhythm that can include meditation, breath, mantra, silence, study, reflection, service, ethical inquiry and conscious daily choices. The emphasis is steady repetition, not dramatic performance.",
          "For Shreevan, sadhana gives the retreat a deeper spine. Without sadhana, a retreat can become a collection of pleasant sessions. With sadhana, the day begins to ask a stronger question: how will this practice change the way I live when I return home?",
        ],
      },
      {
        title: "Why people explore it",
        body: [
          "Many guests come to Rishikesh because they are not only tired. They are questioning direction, identity, success, grief, devotion, service or meaning. Sadhana offers a way to engage those questions through practice rather than endless analysis.",
          "This does not mean every guest needs the same spiritual intensity. A founder may need humility and silence. A life-transition seeker may need steadier prayer or reflection. A long-term practitioner may need structure and accountability. The practice should meet the person, not force a template.",
        ],
      },
      {
        title: "How it works inside a retreat",
        body: [
          "Sadhana can appear in small daily rituals: morning silence, guided meditation, mantra, contemplation, journaling, mindful meals, service, evening reflection or philosophical discussion. The point is not how exotic the practice looks. The point is whether the guest can return to it with sincerity.",
          "Longer programs allow sadhana to deepen because repetition reveals patterns. The first days may be about arrival. The middle may expose resistance. The later stage may ask what needs to change after the retreat. This is where integration becomes serious.",
        ],
      },
      {
        title: "How Shreevan approaches it",
        body: [
          "Shreevan's approach should be reverent without being coercive. Spiritual practice is offered with context, choice and respect. Guests should never feel pushed into belief, devotion, disclosure or practices that conflict with their conscience.",
          "A responsible spiritual retreat also avoids spiritual bypassing. Practice should not be used to deny emotion, avoid repair, ignore health needs or pretend that ordinary responsibilities do not matter. The deeper the practice, the more grounded the integration should become.",
        ],
      },
      {
        title: "What beginners should know",
        body: [
          "Beginners often imagine sadhana as something extreme. In reality, it can begin with a simple daily commitment: sit, breathe, read, reflect, serve, eat consciously or close the day with honesty. The power is in returning.",
          "You do not need to arrive as a spiritual expert. You do need openness, respect for the place and willingness to practice without turning the retreat into self-display. Silence and simplicity may be more transformative than adding more techniques.",
        ],
      },
      {
        title: "What to be careful about",
        body: [
          "Be careful with any retreat that uses spiritual hierarchy, fear, shame or dependency as a selling tool. A guest should be invited into practice, not pressured into obedience. Transparency around schedule, boundaries and facilitation matters.",
          "Also be careful if you are using spiritual retreat as a way to avoid clinical support, family conversations, financial decisions or work boundaries. Sadhana should strengthen your capacity to meet life honestly. It should not become a refined escape.",
        ],
      },
    ],
    retreatExperience: [
      {
        stage: "Before practice",
        title: "Intention",
        copy:
          "Guests clarify why they are practicing and what kind of daily rhythm would be honest rather than performative.",
      },
      {
        stage: "During practice",
        title: "Steady discipline",
        copy:
          "The retreat may include meditation, silence, mantra, study, reflection, seva or mindful daily routines.",
      },
      {
        stage: "After practice",
        title: "Integration",
        copy:
          "Journaling and conversation help translate insight into daily choices, boundaries and post-retreat commitments.",
      },
      {
        stage: "Daily rhythm",
        title: "Return",
        copy:
          "The measure is not intensity. The measure is whether the guest can return to a clear practice after leaving.",
      },
    ],
    suitability: {
      maySuitYouIf: [
        "You want spiritual depth with structure and humility.",
        "You are ready to examine daily life, values and choices.",
        "You prefer grounded practice over decorative wellness experiences.",
      ],
      beCarefulIf: [
        "You are looking for guaranteed awakening or spiritual status.",
        "You feel pressured by spiritual authority or group disclosure.",
        "You want retreat practice to avoid needed professional or practical support.",
      ],
      consultProfessionalIf: [
        "You are in active crisis or severe distress.",
        "You have a mental-health condition affected by intense spiritual practice or sleep changes.",
        "You are unsure whether silence, fasting, mantra or deep introspection is suitable.",
      ],
    },
    relatedModalities: [modalityLinks.meditation, modalityLinks.yoga, modalityLinks.chakra, modalityLinks.sound],
    relatedPrograms: [
      programs.threeDay,
      programs.sevenDay,
      programs.fourteenDay,
      programs.twentyEightDay,
      programs.sixtyDay,
    ],
    futureBlogTopics: [
      "What is daily sadhana and how can a beginner start?",
      "Spiritual retreat vs wellness holiday: how to choose responsibly",
      "How to keep practice alive after returning home",
    ],
    faqs: [
      {
        question: "What is spiritual sadhana?",
        answer:
          "Sadhana means steady spiritual practice. It can include meditation, mantra, silence, study, reflection, service and conscious daily routine. At Shreevan, it is framed as discipline and integration, not spiritual performance. The practice asks how insight becomes part of ordinary life after the retreat, not only how meaningful the retreat feels while you are there.",
      },
      {
        question: "Do I need to follow a specific religion?",
        answer:
          "No. Shreevan is rooted in Indian yogic and spiritual context, but the practice should not be coercive or conversion-focused. Guests can participate respectfully without being forced into belief. Some practices may use traditional language or ritual, so the suitability conversation is a good place to clarify comfort, boundaries and expectations.",
      },
      {
        question: "Is sadhana only for advanced practitioners?",
        answer:
          "No. Sadhana can begin simply. A beginner may start with short meditation, mindful meals, journaling, silence or a daily reflection. Advanced practice is not defined by complexity alone. It is defined by steadiness, humility and integration. Longer programs can hold more repetition, but even a short reset can introduce the principle of daily return.",
      },
      {
        question: "Can spiritual practice replace therapy or medical care?",
        answer:
          "No. Spiritual practice can be meaningful, but it should not replace medical care, mental-health support, medication or emergency help. If you are in active distress, under clinical care or navigating significant symptoms, speak with a qualified professional before choosing a deep retreat. Shreevan's role is wellness and spiritual education, not clinical treatment.",
      },
      {
        question: "What makes Shreevan's sadhana approach responsible?",
        answer:
          "A responsible approach uses clear context, consent and grounded integration. Guests should understand what practices are being offered and why. They should not be pressured into disclosure, belief or intensity. The work should connect back to ordinary life: sleep, food, relationships, choices, service, boundaries and how practice continues after departure.",
      },
      {
        question: "Which program is best for spiritual sadhana?",
        answer:
          "The right program depends on readiness. The 3-day reset can introduce a simple rhythm. The 7-day foundation builds continuity. The 14-day and 28-day programs allow deeper reflection. The 60-day residency is the most serious container for lifestyle integration. Choose the level that you can enter honestly, not the one that sounds most impressive.",
      },
    ],
    finalCta: {
      title: "Practice should deepen your life, not separate you from it.",
      copy:
        "If you are considering a spiritually deeper program, use the suitability call to choose the right rhythm, boundaries and level of support.",
    },
  },
];

export function getModalityBySlug(slug: string) {
  return modalities.find((modality) => modality.slug === slug);
}
