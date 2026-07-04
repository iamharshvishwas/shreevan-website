export type ModalityLink = {
  name: string;
  href: string;
  note: string;
};

export type ModalityFaq = {
  question: string;
  answer: string;
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
    answer: string;
    boundaryNote: string;
  };
  quickAnswer: ModalityQuickAnswer;
  articleSections: ModalityArticleSection[];
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
    title: "Yoga Therapy & Medicine",
    shortTitle: "Yoga Therapy",
    path: "/modalities/yoga-therapy",
    category: "Movement, breath and embodied awareness",
    description:
      "Educational yoga-based practice within Shreevan Wellness retreats, used to support rhythm, mobility, self-awareness and daily lifestyle structure.",
    seoTitle: "Yoga Therapy Retreat Practice in Rishikesh | Shreevan Wellness",
    seoDescription:
      "Understand how Shreevan Wellness uses yoga therapy responsibly inside Rishikesh retreats for movement, breath, posture awareness and daily rhythm.",
    keywords: [
      "yoga therapy retreat Rishikesh",
      "yoga therapy India",
      "retreat yoga practice",
      "breath and movement",
      "responsible wellness",
    ],
    summary:
      "Yoga therapy at Shreevan is guided wellness education, not diagnosis or treatment. It helps guests explore breath, posture, mobility, attention and daily rhythm inside a structured retreat environment.",
    hero: {
      eyebrow: "Yoga therapy retreat practice",
      answer:
        "Yoga therapy at Shreevan means gentle, guided yoga-informed practice used to build body awareness, breath literacy and a realistic daily rhythm. It is paced through suitability, not performance.",
      boundaryNote:
        "This page is educational. Yoga practice may support general well-being, but it is not a substitute for physiotherapy, medical care, injury care or urgent professional help.",
    },
    quickAnswer: {
      simpleTerms:
        "Yoga therapy is the careful use of movement, breath, rest and awareness so a guest can understand their body better and build a sustainable practice rhythm.",
      bestFor: [
        "Guests who feel disconnected from their body after long work seasons.",
        "Beginners who want gentle guidance rather than advanced postures.",
        "Travelers who want movement, breath and reflection in one practice container.",
      ],
      whatToExpect: [
        "Breath-led movement, simple postural awareness and rest.",
        "Options to slow down, modify or pause based on comfort.",
        "A practice rhythm that can be continued after the retreat.",
      ],
      whatItIsNot: [
        "Not medical yoga treatment or physiotherapy.",
        "Not a promise to remove pain or reverse a condition.",
        "Not a competitive asana class.",
      ],
    },
    articleSections: [
      {
        title: "What yoga therapy means at Shreevan",
        body: [
          "At Shreevan, yoga therapy is best understood as yoga-informed wellness education. The practice uses accessible movement, breath awareness, simple alignment cues, guided relaxation and reflective pauses. The aim is not to impress the body into advanced shapes. The aim is to help the guest notice how they stand, breathe, rest, respond to effort and carry tension through the day.",
          "The word therapy can be misunderstood, so the boundary matters. Shreevan does not present this page as medical treatment. The retreat setting can offer a supportive environment for general well-being, but health conditions, injuries and pain require qualified professional guidance. The suitability conversation helps decide intensity, modification and whether a guest should avoid certain practices.",
        ],
      },
      {
        title: "Why people explore yoga therapy in a retreat",
        body: [
          "Many international guests arrive after years of screen-heavy work, leadership pressure, travel fatigue or inconsistent routines. They may not need a hard workout. They need a way to return to the body without judgment. Yoga therapy offers a slower language for that return: breath, posture, sensation, pace and rest.",
          "A retreat gives the practice a cleaner container than a casual weekly class. Meals, sleep, silence, nature and daily rhythm support the learning. The guest is not only doing yoga for one hour. They are observing how the body feels before breakfast, after sitting, during conversation, before sleep and after reflection.",
        ],
      },
      {
        title: "How it works inside the retreat rhythm",
        body: [
          "A session may begin with arrival cues: noticing breath, the floor, the spine and areas that feel tense or tired. The practice can then move through gentle mobility, standing stability, supported postures, breath-led transitions and rest. The facilitator may offer options rather than fixed demands.",
          "In longer programs, yoga therapy becomes part of a pattern. Morning practice may prepare the body for meditation. Evening practice may help the guest transition out of mental speed. Journaling can help connect physical sensation with daily choices. The result is a more coherent rhythm, not a single dramatic session.",
        ],
      },
      {
        title: "How Shreevan approaches this modality",
        body: [
          "Shreevan's approach is structured but not rigid. The practice respects the fact that guests arrive with different histories, bodies and tolerance levels. A corporate executive with neck tension, a founder recovering from burnout, and a seeker with years of yoga experience should not be pushed through the same intensity.",
          "The standard is consent-aware pacing. Guests should feel free to ask for modifications, skip a shape, use support, reduce intensity or choose rest. A premium retreat is not proven by how hard it pushes people. It is proven by how clearly it holds practice, safety and integration.",
        ],
      },
      {
        title: "What beginners should know",
        body: [
          "You do not need to be flexible to begin. Flexibility is not the entry requirement. Curiosity, honesty and willingness to move slowly are more useful. The first goal is to understand what your body is already communicating. From there, a simple practice can become more intelligent and repeatable.",
          "Beginners should also know that discomfort and pain are not the same. Mild effort may be part of learning. Sharp pain, dizziness, numbness or pressure should be treated as a signal to stop and communicate. If you have a known condition or recent injury, professional advice before travel is part of responsible preparation.",
        ],
      },
      {
        title: "What to be careful about",
        body: [
          "Avoid choosing a retreat because it sounds physically intense. The better question is whether the practice is suitable for your current body and season. Hot yoga, forceful breathing, headstands, deep twists and long holds may not be appropriate for many guests, especially without preparation.",
          "If you are pregnant, older, managing blood pressure, glaucoma, balance issues, joint concerns, spine conditions or recent surgery, discuss this before booking. Shreevan can adapt a wellness practice, but it cannot replace the role of your health professional.",
        ],
      },
    ],
    retreatExperience: [
      {
        stage: "Before session",
        title: "Readiness and pacing",
        copy:
          "You share relevant comfort notes during the suitability process, then arrive with simple expectations: comfortable clothing, hydration and willingness to modify.",
      },
      {
        stage: "During session",
        title: "Movement with options",
        copy:
          "Practice may include breath, mobility, gentle strength, supported postures and rest. You are not expected to perform advanced shapes.",
      },
      {
        stage: "After session",
        title: "Reflection, not evaluation",
        copy:
          "The useful question is not whether you were good at yoga. It is what you noticed about breath, effort, resistance and rest.",
      },
      {
        stage: "Daily rhythm",
        title: "Small continuity",
        copy:
          "Longer stays use repetition so the practice becomes familiar enough to continue at home in a realistic way.",
      },
    ],
    suitability: {
      maySuitYouIf: [
        "You want gentle movement and breath guidance rather than a fitness-first yoga class.",
        "You are rebuilding routine after stress, travel fatigue or long work seasons.",
        "You prefer structured practice with room for adaptation.",
      ],
      beCarefulIf: [
        "You are drawn to intense postures before building basic awareness.",
        "You tend to ignore pain signals or compare yourself with others.",
        "You expect yoga to fix a medical or injury-related issue by itself.",
      ],
      consultProfessionalIf: [
        "You have recent surgery, chronic pain, spinal conditions or joint instability.",
        "You are pregnant or have significant blood pressure, balance or eye-pressure concerns.",
        "You are under medical supervision and unsure which movements are safe.",
      ],
    },
    relatedModalities: [modalityLinks.meditation, modalityLinks.sadhana, modalityLinks.sound],
    relatedPrograms: [
      programs.threeDay,
      programs.sevenDay,
      programs.fourteenDay,
      programs.twentyEightDay,
      programs.sixtyDay,
    ],
    futureBlogTopics: [
      "Yoga therapy vs regular yoga class: what retreat guests should know",
      "How to prepare your body for a Rishikesh wellness retreat",
      "Gentle morning yoga rhythm for founders and executives",
    ],
    faqs: [
      {
        question: "Is yoga therapy at Shreevan a medical treatment?",
        answer:
          "No. Shreevan presents yoga therapy as yoga-informed wellness education inside a retreat rhythm. It may help guests explore breath, movement, posture and daily routine, but it does not diagnose, treat or cure health conditions. If you have pain, injury, pregnancy, surgery history or a medical condition, consult a qualified professional before travel and share relevant context during the suitability process.",
      },
      {
        question: "Do I need previous yoga experience?",
        answer:
          "No previous experience is required for the gentler entry programs. The practice can be adjusted for beginners through slower pacing, simpler movements and more rest. What matters is not flexibility or performance. What matters is whether you can listen, communicate discomfort and stay honest about your current capacity. Longer programs may include more repetition and deeper practice, so suitability matters.",
      },
      {
        question: "How is this different from a normal yoga class?",
        answer:
          "A normal class often focuses on a single session. Yoga therapy inside a retreat is connected to the wider day: meditation, meals, rest, journaling, silence and sleep. The practice is less about completing a sequence and more about noticing patterns. It can help guests understand how movement, breath and attention affect their daily rhythm.",
      },
      {
        question: "Can yoga therapy help with stress or burnout?",
        answer:
          "Yoga practice may support general well-being, stress awareness and healthier routines for some people. Shreevan avoids promising a cure for burnout because burnout can involve work conditions, health factors and mental-health needs. The retreat can provide a structured pause, guided practice and reflection, but it should not replace professional care when deeper support is needed.",
      },
      {
        question: "What if I have an injury or limited mobility?",
        answer:
          "Share this before booking. Some guests can participate with modifications, while others may need to avoid certain movements or consult a professional first. A responsible retreat should never push you through sharp pain, dizziness or unsafe strain. The suitability call helps identify whether the program can be adapted comfortably or whether another timing would be wiser.",
      },
      {
        question: "Which Shreevan program uses yoga therapy the most?",
        answer:
          "Yoga therapy appears across the retreat ladder, but the depth changes with duration. The 3-day reset uses gentle practice for arrival and grounding. The 7-day foundation builds continuity. The 14-day, 28-day and 60-day programs can use more repetition, reflection and personal rhythm work. Choose by readiness, not only by ambition.",
      },
    ],
    finalCta: {
      title: "Choose a yoga rhythm your body can actually continue.",
      copy:
        "If you are unsure whether a gentle reset or a longer immersion fits your body, start with a suitability call. The goal is to make the practice safe, clear and realistic.",
    },
  },
  {
    slug: "guided-meditation",
    title: "Guided Meditation & Mind Mastery",
    shortTitle: "Guided Meditation",
    path: "/modalities/guided-meditation",
    category: "Attention, reflection and inner steadiness",
    description:
      "Guided meditation and reflective practice for guests who need structure, steadiness and a responsible entry into stillness.",
    seoTitle: "Guided Meditation Retreat Practice | Shreevan Wellness",
    seoDescription:
      "Learn how guided meditation supports Shreevan Wellness retreat guests with attention, reflection, stillness and responsible pacing.",
    keywords: [
      "guided meditation retreat",
      "Rishikesh meditation retreat",
      "meditation for beginners",
      "mind mastery retreat",
      "wellness meditation India",
    ],
    summary:
      "Guided meditation gives the mind a container rather than demanding instant silence. It supports self-observation, emotional pacing and practice continuity across the retreat rhythm.",
    hero: {
      eyebrow: "Guided meditation retreat practice",
      answer:
        "Guided meditation at Shreevan is a structured way to explore attention, breath, observation and reflection. It helps guests enter stillness with support instead of pressure.",
      boundaryNote:
        "Meditation is a wellness practice, not psychotherapy, psychiatric care, crisis care or a substitute for prescribed care or professional support.",
    },
    quickAnswer: {
      simpleTerms:
        "Guided meditation means you are led through a practice using voice, breath cues, body awareness, reflective prompts or silence in manageable intervals.",
      bestFor: [
        "Guests whose mind feels fast, scattered or over-occupied.",
        "Beginners who find silent meditation intimidating.",
        "Experienced seekers who want a steadier retreat container.",
      ],
      whatToExpect: [
        "Breath awareness, body scanning, reflection and quiet pauses.",
        "Shorter practices in entry programs and deeper repetition in longer stays.",
        "Integration through journaling, silence and daily rhythm.",
      ],
      whatItIsNot: [
        "Not therapy, trauma processing or crisis intervention.",
        "Not a test of whether you can stop thinking.",
        "Not a guaranteed path to bliss or permanent calm.",
      ],
    },
    articleSections: [
      {
        title: "What guided meditation means",
        body: [
          "Guided meditation is a practice container. Instead of asking the guest to sit in silence and figure everything out, the facilitator offers cues that help attention settle. The cue may be breath, sensation, sound, a simple image, a mantra, a question or a period of quiet observation.",
          "This matters for retreat guests because the mind often becomes louder when the external world becomes quieter. A structured voice can make the first layer of stillness less confusing. It also helps beginners understand that meditation is not about deleting thoughts. It is about changing the relationship with attention.",
        ],
      },
      {
        title: "Why people explore it",
        body: [
          "Many visitors are not looking for a religious performance. They are looking for space to notice what constant pressure has done to attention, sleep, decision-making and emotional tone. Guided meditation can help create a pause between stimulus and response. It may support general calm and self-awareness when practiced responsibly.",
          "For founders, executives and life-transition seekers, meditation can also expose how hard it is to be still. That insight is useful when held gently. It should not become another achievement metric. Shreevan frames meditation as practice, not as proof of spiritual status.",
        ],
      },
      {
        title: "How it works inside a retreat",
        body: [
          "A retreat allows meditation to be repeated in different states: after arrival, after movement, before meals, in silence, after journaling and before sleep. This repetition teaches the guest that attention changes across the day. Some sessions may feel calm. Others may feel restless. Both are information.",
          "Shorter programs may use guided practices to help guests arrive and decompress. Longer programs can include more silence, longer sits, reflective circles and integration prompts. The progression should be paced. Intensity without readiness can become destabilizing for some people.",
        ],
      },
      {
        title: "How Shreevan approaches it",
        body: [
          "Shreevan's meditation approach is supportive, structured and consent-aware. The facilitator can offer a clear start, a steady anchor and a clear end. Guests should know what is happening and why. This reduces the mystery that can make meditation feel inaccessible.",
          "The retreat also avoids inflated claims. Meditation may be meaningful, but it is not a replacement for mental-health care. If a guest is in acute distress, managing active symptoms or changing medication, professional guidance matters more than retreat intensity.",
        ],
      },
      {
        title: "What beginners should know",
        body: [
          "You are allowed to have thoughts. You are allowed to feel bored. You are allowed to become emotional, distracted or sleepy. None of those experiences means you are failing. In the beginning, noticing what is happening is already practice.",
          "Beginners should also know that eyes closed is not mandatory for everyone. Some people feel safer with a soft gaze. Some need shorter sessions. Some need movement before sitting. A well-held retreat adapts the entry point rather than forcing one ideal method.",
        ],
      },
      {
        title: "What to be careful about",
        body: [
          "Long silence, intense introspection and certain practices may not suit everyone. Guests with active mental-health concerns, panic, dissociation, recent trauma, severe insomnia or crisis-level distress should consult a qualified professional before joining a meditation-heavy retreat.",
          "Meditation can be gentle, but gentle does not mean risk-free for every person. The responsible question is not whether meditation is good in general. The question is whether this form, duration and timing are suitable for you now.",
        ],
      },
    ],
    retreatExperience: [
      {
        stage: "Before session",
        title: "A clear container",
        copy:
          "The facilitator explains the practice, expected duration and optional modifications so the mind knows what it is entering.",
      },
      {
        stage: "During session",
        title: "Guided attention",
        copy:
          "You may be invited to notice breath, body, sound, sensation or a reflective question, with silence used in manageable intervals.",
      },
      {
        stage: "After session",
        title: "Grounding",
        copy:
          "Guests may journal, sit quietly or transition slowly so the practice is integrated rather than abruptly interrupted.",
      },
      {
        stage: "Daily rhythm",
        title: "Repeatable practice",
        copy:
          "The goal is to leave with a meditation rhythm you can realistically continue, even if it is short and simple.",
      },
    ],
    suitability: {
      maySuitYouIf: [
        "You want to begin meditation but need structure and guidance.",
        "You feel mentally overloaded and need a quieter rhythm.",
        "You value reflection, journaling and self-observation.",
      ],
      beCarefulIf: [
        "You expect meditation to permanently stop thoughts.",
        "You are using retreat practice to avoid needed professional support.",
        "You want a very intense silent practice without prior experience.",
      ],
      consultProfessionalIf: [
        "You have active panic, severe depression, psychosis symptoms or crisis-level distress.",
        "You are changing psychiatric medication or currently under clinical care.",
        "You have a trauma history and know that inward attention can feel destabilizing.",
      ],
    },
    relatedModalities: [modalityLinks.yoga, modalityLinks.sound, modalityLinks.sadhana, modalityLinks.chakra],
    relatedPrograms: [
      programs.threeDay,
      programs.sevenDay,
      programs.fourteenDay,
      programs.twentyEightDay,
      programs.sixtyDay,
    ],
    futureBlogTopics: [
      "Guided meditation vs silent meditation for first-time retreat guests",
      "How to prepare for a meditation retreat without forcing the mind",
      "What to do when meditation feels restless instead of calm",
    ],
    faqs: [
      {
        question: "Is guided meditation suitable for beginners?",
        answer:
          "Yes, guided meditation is often the easiest entry point for beginners because the facilitator provides structure. You do not need to know how to sit perfectly or keep the mind empty. The practice can begin with short intervals, breath cues and simple observation. If you have active mental-health concerns, suitability should be discussed carefully before choosing a meditation-heavy program.",
      },
      {
        question: "What happens during a guided meditation session?",
        answer:
          "A session usually begins with arrival cues, then moves into breath awareness, body awareness, sound, reflection or a simple anchor. The facilitator may include pauses of silence and then guide you back gently. After the session, you may journal or sit quietly. The exact structure depends on the program duration and the readiness of the group.",
      },
      {
        question: "Will meditation stop my thoughts?",
        answer:
          "No responsible meditation page should promise that. Thoughts may continue, especially in the beginning. The practice is about noticing thoughts without automatically following them. Over time, some guests may experience more space and steadiness, but the goal is not to force silence. The goal is to build a healthier relationship with attention.",
      },
      {
        question: "Can guided meditation help with stress?",
        answer:
          "Meditation and mindfulness practices may support general well-being and stress awareness for some people. Shreevan uses cautious language because stress can involve work, health, relationships and mental-health factors. A retreat can provide space, routine and guided practice, but it is not a replacement for professional care when symptoms are significant or persistent.",
      },
      {
        question: "Is guided meditation the same as therapy?",
        answer:
          "No. Guided meditation at Shreevan is a wellness and self-observation practice. It is not psychotherapy, psychiatric care, trauma treatment or crisis support. It may sit alongside professional care if your provider agrees, but it should not be used as a substitute. Guests with active clinical concerns should discuss travel and practice suitability before booking.",
      },
      {
        question: "Which programs include guided meditation?",
        answer:
          "Guided meditation is relevant across the Shreevan retreat ladder. The 3-day reset uses it gently for arrival and reflection. The 7-day foundation builds continuity. The 14-day, 28-day and 60-day programs can include deeper repetition and integration. The longer the program, the more important suitability and pacing become.",
      },
    ],
    finalCta: {
      title: "Stillness should feel held, not forced.",
      copy:
        "If you are unsure how much meditation is right for you, use the suitability call to choose a program that meets your current capacity.",
    },
  },
  {
    slug: "sound-healing",
    title: "Sound Healing & Vibrational Therapy",
    shortTitle: "Sound Healing",
    path: "/modalities/sound-healing",
    category: "Rest, stillness and sensory decompression",
    description:
      "Sound-supported wellness practice used as a gentle rest and reflection modality within Shreevan retreat rhythm.",
    seoTitle: "Sound Healing Retreat Practice | Shreevan Wellness",
    seoDescription:
      "Understand Shreevan Wellness sound healing as a supportive retreat modality for rest, listening and reflection without medical cure claims.",
    keywords: [
      "sound healing retreat",
      "vibrational therapy retreat",
      "sound bath Rishikesh",
      "wellness sound practice",
      "guided rest India",
    ],
    summary:
      "Sound work is framed as supportive wellness education. It can help guests slow down, listen, rest and transition between active practice and quiet reflection.",
    hero: {
      eyebrow: "Sound-supported rest practice",
      answer:
        "Sound healing at Shreevan is a guided listening and rest practice using resonant sound, silence and stillness. It is designed as a supportive retreat layer, not a medical intervention.",
      boundaryNote:
        "Sound sessions are optional wellness practices. They are not medical treatment, guaranteed nervous-system repair, trauma work or a replacement for professional care.",
    },
    quickAnswer: {
      simpleTerms:
        "Sound healing means resting while listening to carefully held tones, rhythm, bowls, bells, voice or ambient sound as part of a reflective retreat session.",
      bestFor: [
        "Guests who need rest but find silent meditation difficult.",
        "People who want a softer transition after movement or travel.",
        "Visitors who respond well to music, rhythm, atmosphere and quiet.",
      ],
      whatToExpect: [
        "A calm room, lying or seated rest, and guided listening.",
        "Periods of sound, silence and gentle transition.",
        "Optional participation with permission to step out if needed.",
      ],
      whatItIsNot: [
        "Not a clinical sound therapy protocol.",
        "Not a guarantee of emotional release or healing.",
        "Not suitable for everyone without sensitivity checks.",
      ],
    },
    articleSections: [
      {
        title: "What sound healing means at Shreevan",
        body: [
          "Sound healing is a common wellness phrase, but Shreevan uses it carefully. In this context, it means a guided sound-supported rest session. The facilitator may use bowls, bells, drone, voice, rhythm or silence to create a listening environment where the guest can slow down and notice the body without needing to perform.",
          "The word healing can create unrealistic expectations, so the page keeps the boundary clear. Sound may feel calming, spacious or emotionally meaningful for some people. It may also feel neutral or overstimulating for others. The experience is treated as optional wellness support rather than a guaranteed outcome.",
        ],
      },
      {
        title: "Why people explore it",
        body: [
          "Many guests arrive with a nervous habit of doing. Even on retreat, they may want to optimize, analyze and achieve. Sound practice gives them a different instruction: receive, listen, rest and let the session be simple. That can be useful for guests who find formal meditation too mental at first.",
          "Sound also creates a transition between active and quiet parts of the day. After travel, movement or conversation, a sound session may help the group settle into a slower pace. It is often easier to rest when attention has something gentle to meet.",
        ],
      },
      {
        title: "How it works inside a retreat",
        body: [
          "A session may begin with an explanation of what sounds will be used and how long the practice will last. Guests may lie down or sit, keep eyes open or closed, and use props for comfort. The facilitator then holds the sound environment with periods of tone, rhythm, quiet and grounding.",
          "In shorter programs, sound may be used as a reset layer. In longer programs, it can support integration after deeper practice days. The most important design choice is pacing. A sound session should never be framed as something a guest must endure to receive a result.",
        ],
      },
      {
        title: "How Shreevan approaches it",
        body: [
          "Shreevan's approach is atmosphere-led and responsible. The session should feel clean, calm and clear. Guests should know that they can adjust position, cover the ears, sit instead of lie down, or leave quietly if sound becomes uncomfortable.",
          "The practice is also kept separate from medical claims. Some sound content online overstates frequency, vibration and body effects. Shreevan can honor sound as a traditional and sensory practice without presenting it as a cure or regulated clinical treatment.",
        ],
      },
      {
        title: "What beginners should know",
        body: [
          "You do not need to understand instruments or spiritual terminology. The practice is simple: listen, rest, notice and return gently when the mind wanders. If emotion arises, it does not need to be dramatized. If nothing special happens, the session can still be useful as rest.",
          "Beginners should also know that sensitivity is valid. Some people prefer lower volume, more distance from instruments or a seated posture. A good retreat container allows these adjustments without making the guest feel difficult.",
        ],
      },
      {
        title: "What to be careful about",
        body: [
          "Sound can be intense for people with migraines, tinnitus, sound sensitivity, certain neurological conditions, trauma triggers or anxiety around enclosed group experiences. Suitability should be discussed before deep or long sessions.",
          "The safest framing is modest. Sound practice can be supportive within a broader retreat rhythm. It should not be used as proof that something has been healed, released or permanently changed. Integration matters more than dramatic interpretation.",
        ],
      },
    ],
    retreatExperience: [
      {
        stage: "Before session",
        title: "Comfort setup",
        copy:
          "Guests are told what to expect, how loud the session may be and what options exist for comfort, distance or exit.",
      },
      {
        stage: "During session",
        title: "Listening and rest",
        copy:
          "The practice may include bowls, bells, drone, voice, rhythm and silence. Your role is to listen and remain comfortable.",
      },
      {
        stage: "After session",
        title: "Slow return",
        copy:
          "The closing should be grounded, with time to sit, drink water, journal or transition gently.",
      },
      {
        stage: "Daily rhythm",
        title: "A soft bridge",
        copy:
          "Sound can bridge movement, meditation and evening rest without adding physical intensity.",
      },
    ],
    suitability: {
      maySuitYouIf: [
        "You need rest but find silent meditation hard.",
        "You enjoy sensory practices, music, rhythm or atmosphere.",
        "You want a softer modality inside a structured retreat.",
      ],
      beCarefulIf: [
        "You are sensitive to sound, vibration or group-room intensity.",
        "You expect sound to guarantee a specific emotional experience.",
        "You are uncomfortable lying still and need a seated option.",
      ],
      consultProfessionalIf: [
        "You have tinnitus, seizure history, migraines or sound-triggered symptoms.",
        "You have trauma-related triggers around sound or enclosed environments.",
        "You are unsure whether sensory practices are suitable for your current condition.",
      ],
    },
    relatedModalities: [modalityLinks.meditation, modalityLinks.yoga, modalityLinks.chakra],
    relatedPrograms: [programs.sevenDay, programs.fourteenDay, programs.twentyEightDay],
    futureBlogTopics: [
      "What to expect in a sound bath at a wellness retreat",
      "Sound healing vs meditation: which is easier for beginners?",
      "How to evaluate sound healing claims responsibly",
    ],
    faqs: [
      {
        question: "What is sound healing in a retreat context?",
        answer:
          "At Shreevan, sound healing means a guided listening and rest practice using resonant sound, silence and a calm environment. It is not presented as a medical intervention. Guests may lie down or sit while the facilitator uses sound to support stillness and reflection. The value is in rest, attention and atmosphere, not in a guaranteed result.",
      },
      {
        question: "Is sound healing scientifically proven?",
        answer:
          "Research around sound baths and singing bowls is still limited, and claims online can be overstated. Shreevan therefore uses modest language. Sound practice may feel relaxing or meaningful for some guests, but the site does not promise clinical effects, permanent change or specific health outcomes. It is offered as one supportive wellness layer inside a wider retreat rhythm.",
      },
      {
        question: "What if I am sensitive to sound?",
        answer:
          "Tell the team before booking and again before the session. You may need lower volume, more distance from instruments, a seated posture, ear coverage or the option to step out. Sound work should be consent-aware. If you have tinnitus, migraines, seizure history or other sound-triggered symptoms, consult a qualified professional before participating.",
      },
      {
        question: "Do I need to believe in vibration or energy for it to work?",
        answer:
          "No. You can approach the session simply as guided rest and listening. Some guests connect sound with spiritual language, while others experience it as atmosphere, music or a calming ritual. Shreevan does not require a belief system. The practice is held in a way that respects different backgrounds and keeps claims grounded.",
      },
      {
        question: "Can sound healing replace meditation?",
        answer:
          "Sound practice can be an easier doorway into stillness for some guests, but it does not fully replace meditation training. Meditation builds attention through repeated practice, while sound sessions offer a supportive listening environment. In a retreat, the two can work together: sound can soften the body and mind, while meditation builds steadier awareness.",
      },
      {
        question: "Which programs include sound healing?",
        answer:
          "Sound healing is most relevant in the 7-day, 14-day and 28-day programs where there is enough time to use it as rest, transition and integration. It may not be central to every guest's plan. Suitability, group context and program design decide how often it appears and how deeply it is used.",
      },
    ],
    finalCta: {
      title: "Use sound as support, not spectacle.",
      copy:
        "If you want a softer way into rest and meditation, ask during the suitability call whether sound-supported practice fits your program.",
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
