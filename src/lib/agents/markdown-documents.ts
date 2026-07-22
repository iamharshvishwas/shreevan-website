import "server-only";

import { modalities, modalitiesHubContent } from "@/lib/content/modalities";
import { getPublicFaqContent, getPublicJournalContent, getPublicStoryContent } from "@/lib/site/public-content-trust";
import type { PublicJournalArticle } from "@/lib/site/public-content-trust-types";
import { getPublicHomeContent } from "@/lib/site/public-home";
import { getPublicPageContent } from "@/lib/site/public-pages";
import { getPublicProgramSummaries } from "@/lib/site/public-programs";
import { getPublicSiteOrigin, getPublicSiteSettings } from "@/lib/site/public-settings";

type MarkdownDocument = {
  body: string;
  canonicalPath: string;
  description: string;
  title: string;
};

type ProgramGuide = {
  audience: string;
  focus: string[];
  title: string;
  whatToExpect: string;
};

const STANDARD_PAGE_IDS: Record<string, string> = {
  "/about-founder": "about-founder",
  "/accommodation-inclusions": "accommodation-inclusions",
  "/contact": "contact",
};

const PROGRAM_GUIDES: Record<string, ProgramGuide> = {
  "/programs/3-day-ganga-reset": {
    title: "3-Day Ganga Sattva Reset",
    audience: "First-time retreat guests, busy professionals and travellers who want a gentle entry into a more intentional daily rhythm.",
    whatToExpect:
      "A short, paced retreat experience centred on arrival, rest, guided practice, simple food and reflection. It is designed as an entry point, not a substitute for medical or mental-health support.",
    focus: [
      "Gentle yoga, breath awareness, guided meditation and Yoga Nidra.",
      "Sattvic meals, nature-based pauses and reflective journaling.",
      "A realistic take-home rhythm to discuss during the suitability conversation.",
    ],
  },
  "/programs/7-day-foundation": {
    title: "7-Day Ganga Sattva Foundation",
    audience: "International guests who want more continuity than a short reset and a clear foundation for everyday practice.",
    whatToExpect:
      "A full-week rhythm of guided movement, meditation, reflection, sattvic living education and practical integration. Exact sessions, room category and travel details are confirmed through the suitability process.",
    focus: [
      "A repeatable yoga, breath and meditation rhythm.",
      "Workshops and group reflection that make the retreat structure understandable.",
      "Food, rest, accommodation and international-travel context before commitment.",
    ],
  },
  "/programs/14-day-transformation": {
    title: "14-Day Ganga Sattva Transformation",
    audience: "Guests in a life transition or demanding season who have the time and readiness for a longer reflection and routine-building arc.",
    whatToExpect:
      "Two weeks create more space for repetition, paced learning and thoughtful integration than a short stay. The programme is suitability-led and does not promise a cure, diagnosis, trauma release or guaranteed transformation.",
    focus: [
      "A deeper daily rhythm of movement, meditation, rest and journaling.",
      "Guided reflection on habits, values, attention and practical life design.",
      "Relevant modalities explained separately, so guests can understand the methods before booking.",
    ],
  },
  "/programs/28-day-inner-awakening": {
    title: "28-Day Sattva Ganga Inner Awakening",
    audience: "Guests who want an extended, structured immersion and can make a considered decision after a detailed suitability conversation.",
    whatToExpect:
      "A month-long immersive rhythm combining selected wellness practices, reflection, food, rest and integration. It is a premium retreat container rather than a promise of instant awakening or medical recovery.",
    focus: [
      "Daily practice continuity, reflection and a clearer personal rhythm.",
      "Longer-form learning across yoga, meditation, sound, sattvic living and yogic philosophy as suitable.",
      "A calm consultation flow before any payment or travel commitment.",
    ],
  },
  "/programs/60-day-rishi-residency": {
    title: "60-Day Rishi Tantra Conscious Living Residency",
    audience: "Experienced or highly committed guests considering an advanced, long-stay conscious-living residency.",
    whatToExpect:
      "A long-form, suitability-led residency built around repetition, mentoring, personal rhythm and integration. It requires a careful conversation about expectations, health context, travel readiness and the boundaries of wellness education.",
    focus: [
      "A sustained practice rhythm across movement, breath, meditation and self-inquiry.",
      "Mentoring, practical lifestyle reflection and a realistic integration plan.",
      "Clear boundaries: the residency is not medical care, emergency support or a guaranteed life outcome.",
    ],
  },
};

const GENERIC_PAGES: Record<string, { description: string; title: string; body: string[] }> = {
  "/book-consultation": {
    title: "Book a Shreevan Wellness Suitability Consultation",
    description: "A calm, suitability-led consultation pathway for prospective Shreevan Wellness retreat guests.",
    body: [
      "A suitability consultation is the first step before booking a Shreevan Wellness retreat. It helps the team understand the guest's goals, travel context, preferred programme length and any questions about daily rhythm, food or accommodation.",
      "The conversation is not medical advice, diagnosis, treatment or crisis support. It is designed to clarify whether a retreat is an appropriate next step and which programme length may be worth considering.",
      "To enquire, use the website form or contact the Shreevan team directly. A payment should only follow an approved, clear booking path.",
    ],
  },
  "/payment": {
    title: "Secure Booking Payment",
    description: "Payment information for approved Shreevan Wellness retreat bookings.",
    body: [
      "This page is for guests who have already completed the suitability and booking approval process. It is intentionally not an open purchase page.",
      "For programme fit, travel or booking questions, begin with a suitability consultation before making a payment decision.",
    ],
  },
  "/privacy-policy": {
    title: "Privacy Policy",
    description: "Shreevan Wellness privacy information for website visitors and prospective retreat guests.",
    body: ["Read the full privacy policy in the standard website view for the current details about personal information, forms and communication preferences."],
  },
  "/terms-conditions": {
    title: "Terms and Conditions",
    description: "Terms governing the Shreevan Wellness website and retreat booking process.",
    body: ["Read the full terms in the standard website view before making a booking, travel or payment decision."],
  },
  "/refund-policy": {
    title: "Refund and Cancellation Policy",
    description: "Refund and cancellation information for Shreevan Wellness retreat bookings.",
    body: ["Read the full refund and cancellation policy in the standard website view before making a booking or payment decision."],
  },
  "/wellness-disclaimer": {
    title: "Wellness Disclaimer",
    description: "Important boundaries for Shreevan Wellness educational and retreat content.",
    body: [
      "Shreevan Wellness presents yoga, meditation, sound, sattvic living and yogic philosophy as wellness education and guided retreat practices.",
      "The website and retreat experience do not provide medical diagnosis, treatment, cure, therapy replacement, medication advice, emergency support or guaranteed outcomes. Guests should consult an appropriately qualified professional for medical or mental-health concerns.",
    ],
  },
};

function absoluteUrl(origin: string, href: string) {
  if (/^https?:\/\//i.test(href)) return href;
  if (href.startsWith("#")) return `${origin}/${href}`;
  return `${origin}${href.startsWith("/") ? href : `/${href}`}`;
}

function addHeading(lines: string[], title: string, level = 2) {
  if (!title.trim()) return;
  lines.push(`${"#".repeat(level)} ${title.trim()}`, "");
}

function addBullets(lines: string[], values: string[]) {
  for (const value of values) {
    if (value.trim()) lines.push(`- ${value.trim()}`);
  }
  if (values.some((value) => value.trim())) lines.push("");
}

function addLinkedList(lines: string[], origin: string, values: Array<{ href: string; name: string; note?: string }>) {
  for (const value of values) {
    lines.push(`- [${value.name}](${absoluteUrl(origin, value.href)})${value.note ? `: ${value.note}` : ""}`);
  }
  if (values.length) lines.push("");
}

function plainText(value: string) {
  return value
    .replace(/<\/?(p|div|h[1-6]|li|blockquote|br|hr)[^>]*>/gi, "\n")
    .replace(/<[^>]+>/g, " ")
    .replace(/&nbsp;/gi, " ")
    .replace(/&amp;/gi, "&")
    .replace(/&quot;/gi, '"')
    .replace(/&#39;/gi, "'")
    .replace(/\n{3,}/g, "\n\n")
    .trim();
}

function articleBody(article: PublicJournalArticle) {
  if (article.contentHtml.trim()) return plainText(article.contentHtml);
  if (article.content.trim()) return plainText(article.content);
  if (article.blocks.length) {
    return article.blocks
      .map((block) => {
        if (block.type === "divider") return "---";
        if (block.type === "heading") return `## ${plainText(block.content)}`;
        if (block.type === "image") return block.caption || block.alt || "";
        if (block.type === "button") return block.label || block.content || "";
        return plainText(block.content);
      })
      .filter(Boolean)
      .join("\n\n");
  }
  if (article.body.length) return article.body.map(plainText).filter(Boolean).join("\n\n");
  return article.keyPoints.map((point) => `- ${point}`).join("\n");
}

function withFrontmatter(document: MarkdownDocument, origin: string) {
  const canonical = absoluteUrl(origin, document.canonicalPath);
  return [
    "---",
    `title: ${JSON.stringify(document.title)}`,
    `description: ${JSON.stringify(document.description)}`,
    `canonical: ${JSON.stringify(canonical)}`,
    "language: en",
    "---",
    "",
    document.body.trim(),
    "",
    "---",
    "",
    "## Responsible wellness note",
    "",
    "Shreevan Wellness content is educational and suitability-led. Retreat practices may support reflection, rhythm and wellbeing, but they do not replace medical care, mental-health care, medication, diagnosis, treatment, crisis support or emergency help.",
    "",
  ].join("\n");
}

async function homeDocument(origin: string): Promise<MarkdownDocument> {
  const [home, page] = await Promise.all([getPublicHomeContent(), getPublicPageContent("home")]);
  const lines: string[] = [`# ${home.hero.title}`, "", home.hero.lede, ""];

  addHeading(lines, "At a glance");
  addBullets(lines, home.hero.trustItems.map((item) => item.text));

  addHeading(lines, home.intro.heading);
  lines.push(...home.intro.paragraphs.map((item) => item.text), "");

  addHeading(lines, home.programPathways.heading);
  lines.push(home.programPathways.copy, "");
  for (const program of home.programPathways.items) {
    addHeading(lines, `${program.title} (${program.duration})`, 3);
    lines.push(program.summary, "", `Possible focus: ${program.outcome}`, "");
    lines.push(`Read the programme: [${program.title}](${absoluteUrl(origin, program.href)})`, "");
  }

  addHeading(lines, home.differentiation.heading);
  for (const card of home.differentiation.cards) {
    lines.push(`### ${card.title}`, "", card.copy, "");
  }

  addHeading(lines, home.rhythm.heading);
  lines.push(home.rhythm.body, "");
  addBullets(lines, home.rhythm.items.map((item) => item.text));

  addHeading(lines, home.team.heading);
  lines.push(home.team.body, "");
  addBullets(lines, home.team.bullets.map((item) => item.text));

  addHeading(lines, home.travel.heading);
  lines.push(home.travel.body, "");
  for (const card of home.travel.cards) {
    lines.push(`### ${card.title}`, "", card.copy, "");
  }

  addHeading(lines, home.location.heading);
  lines.push(home.location.body, "");
  for (const card of home.location.cards) {
    lines.push(`### ${card.title}`, "", card.copy, "");
  }

  addHeading(lines, home.consultation.heading);
  lines.push(home.consultation.body, "");
  for (const step of home.consultation.steps) {
    lines.push(`### ${step.title}`, "", step.copy, "");
  }
  lines.push(`[${home.consultation.ctaLabel}](${absoluteUrl(origin, home.consultation.ctaHref)})`, "");

  return {
    title: page.seo.title,
    description: page.seo.description,
    canonicalPath: "/",
    body: lines.join("\n"),
  };
}

async function modalitiesDocument(origin: string, pathname: string): Promise<MarkdownDocument | null> {
  if (pathname === "/modalities") {
    const lines: string[] = [`# ${modalitiesHubContent.hero.title}`, "", modalitiesHubContent.hero.answer, ""];
    addHeading(lines, "In simple terms");
    lines.push(modalitiesHubContent.quickAnswer.simpleTerms, "");
    for (const section of modalitiesHubContent.articleSections) {
      addHeading(lines, section.title);
      lines.push(...section.body, "");
    }
    addHeading(lines, "Choose a modality to explore");
    addLinkedList(lines, origin, modalitiesHubContent.decisionCards.map((card) => ({ name: card.title, href: card.href, note: card.copy })));
    addHeading(lines, "Responsible standards");
    for (const standard of modalitiesHubContent.responsibleStandards) {
      lines.push(`### ${standard.title}`, "", standard.copy, "");
    }
    addHeading(lines, "Frequently asked questions");
    for (const faq of modalitiesHubContent.faqs) {
      lines.push(`### ${faq.question}`, "", faq.answer, "");
    }
    addHeading(lines, modalitiesHubContent.finalCta.title);
    lines.push(modalitiesHubContent.finalCta.copy, "", `[Check retreat suitability](${absoluteUrl(origin, "/book-consultation")})`, "");
    return {
      title: "Core Wellness Modalities | Shreevan Wellness",
      description: modalitiesHubContent.hero.answer,
      canonicalPath: pathname,
      body: lines.join("\n"),
    };
  }

  const modality = modalities.find((item) => item.path === pathname);
  if (!modality) return null;

  const lines: string[] = [`# ${modality.title}`, "", modality.hero.answer, ""];
  addHeading(lines, "Quick answer");
  lines.push(`**In simple terms:** ${modality.quickAnswer.simpleTerms}`, "");
  addHeading(lines, "May be useful to explore if", 3);
  addBullets(lines, modality.quickAnswer.bestFor);
  addHeading(lines, "What to expect", 3);
  addBullets(lines, modality.quickAnswer.whatToExpect);
  addHeading(lines, "What it is not", 3);
  addBullets(lines, modality.quickAnswer.whatItIsNot);
  for (const section of modality.articleSections) {
    addHeading(lines, section.title);
    lines.push(...section.body, "");
  }
  addHeading(lines, "Inside a Shreevan retreat");
  for (const step of modality.retreatExperience) {
    lines.push(`### ${step.stage}: ${step.title}`, "", step.copy, "");
  }
  addHeading(lines, "Suitability");
  addHeading(lines, "May suit you if", 3);
  addBullets(lines, modality.suitability.maySuitYouIf);
  addHeading(lines, "Be careful if", 3);
  addBullets(lines, modality.suitability.beCarefulIf);
  addHeading(lines, "Consult a qualified professional first if", 3);
  addBullets(lines, modality.suitability.consultProfessionalIf);
  addHeading(lines, "Related learning and retreat paths");
  addHeading(lines, "Related modalities", 3);
  addLinkedList(lines, origin, modality.relatedModalities);
  addHeading(lines, "Related programmes", 3);
  addLinkedList(lines, origin, modality.relatedPrograms);
  addHeading(lines, "Frequently asked questions");
  for (const faq of modality.faqs) {
    lines.push(`### ${faq.question}`, "", faq.answer, "");
  }
  addHeading(lines, modality.finalCta.title);
  lines.push(modality.finalCta.copy, "", `[Check suitability](${absoluteUrl(origin, "/book-consultation")})`, "");

  return {
    title: modality.seoTitle,
    description: modality.seoDescription,
    canonicalPath: pathname,
    body: lines.join("\n"),
  };
}

async function programsDocument(origin: string, pathname: string): Promise<MarkdownDocument | null> {
  const programs = await getPublicProgramSummaries();

  if (pathname === "/programs") {
    const lines: string[] = ["# Retreat Programmes", "", "Compare Shreevan Wellness retreat durations before booking a suitability consultation.", ""];
    for (const program of programs) {
      lines.push(`## [${program.title}](${absoluteUrl(origin, program.href)})`, "", `**Duration:** ${program.duration}`, "", program.summary, "", `**Possible outcome:** ${program.outcome}`, "");
    }
    lines.push("## Choosing a duration", "", "Program pages explain retreat duration, rhythm, inclusions and readiness. Modality pages explain the individual practices used within those programmes. Use both before a suitability conversation.", "");
    return {
      title: "Retreat Programmes | Shreevan Wellness",
      description: "Compare structured Shreevan Wellness retreat programmes in Rishikesh by duration, focus and suitability.",
      canonicalPath: pathname,
      body: lines.join("\n"),
    };
  }

  const guide = PROGRAM_GUIDES[pathname];
  const program = programs.find((item) => item.href === pathname);
  if (!guide || !program) return null;
  const lines: string[] = [
    `# ${guide.title}`,
    "",
    program.summary,
    "",
    "## At a glance",
    "",
    `- **Duration:** ${program.duration}`,
    `- **Best considered by:** ${guide.audience}`,
    `- **Programme direction:** ${program.outcome}`,
    "",
    "## What to expect",
    "",
    guide.whatToExpect,
    "",
    "## Practice and experience layers",
    "",
  ];
  addBullets(lines, guide.focus);
  addHeading(lines, "Understand the practices before booking");
  addLinkedList(lines, origin, [
    { name: "Yoga Therapy", href: "/modalities/yoga-therapy", note: "movement, breath and embodied awareness" },
    { name: "Guided Meditation", href: "/modalities/guided-meditation", note: "guided attention and reflection" },
    { name: "Spiritual Sadhanas", href: "/modalities/spiritual-sadhanas", note: "daily discipline and yogic philosophy" },
  ]);
  lines.push("## Next step", "", "A consultation is used to discuss travel readiness, programme expectations and practical questions before payment. It is not a medical assessment or a sales-pressure call.", "", `[Book a suitability consultation](${absoluteUrl(origin, "/book-consultation")})`, "");
  return {
    title: `${guide.title} | Shreevan Wellness`,
    description: program.summary,
    canonicalPath: pathname,
    body: lines.join("\n"),
  };
}

async function faqDocument(): Promise<MarkdownDocument> {
  const content = await getPublicFaqContent();
  const lines: string[] = ["# Frequently Asked Questions", "", "Practical answers for prospective Shreevan Wellness guests.", ""];
  for (const category of content.categories) {
    addHeading(lines, category.label);
    for (const faq of category.faqs) {
      lines.push(`### ${faq.question}`, "", faq.answer.join(" "), "");
    }
  }
  addHeading(lines, "Responsible standards");
  for (const standard of content.responsibleStandards) {
    lines.push(`### ${standard.title}`, "", standard.copy, "");
  }
  return {
    title: "FAQs | Shreevan Wellness",
    description: "Answers about suitability, travel, stay, food, payment and responsible wellness boundaries.",
    canonicalPath: "/faqs",
    body: lines.join("\n"),
  };
}

async function storyDocument(): Promise<MarkdownDocument> {
  const content = await getPublicStoryContent();
  const lines: string[] = ["# Healing Stories", "", "Guest experience context and trust standards from Shreevan Wellness.", ""];
  addHeading(lines, "How stories are held");
  for (const marker of content.trustMarkers) {
    lines.push(`### ${marker.title}`, "", marker.copy, "");
  }
  addHeading(lines, "Guest story themes");
  for (const story of content.storySlots) {
    lines.push(`### ${story.title}`, "", story.context, "", `**What this illustrates:** ${story.proof}`, "");
  }
  addHeading(lines, "Consent and responsible sharing");
  addBullets(lines, content.consentStandards);
  return {
    title: "Healing Stories | Shreevan Wellness",
    description: "Experience-led guest stories and trust standards for Shreevan Wellness retreats.",
    canonicalPath: "/testimonials",
    body: lines.join("\n"),
  };
}

async function journalDocument(origin: string, pathname: string): Promise<MarkdownDocument | null> {
  const content = await getPublicJournalContent();
  if (pathname === "/journal") {
    const lines: string[] = ["# Shreevan Wellness Journal", "", "Educational retreat, travel and wellbeing resources for thoughtful international guests.", ""];
    for (const article of content.articles) {
      const href = `/journal/${article.slug || article.id}`;
      lines.push(`## [${article.title}](${absoluteUrl(origin, href)})`, "", article.excerpt, "", `**Category:** ${article.category} · **Reading time:** ${article.readTime}`, "");
    }
    return {
      title: "Journal | Shreevan Wellness",
      description: "Educational retreat resources, practical guest guidance and responsible wellness insights from Shreevan Wellness.",
      canonicalPath: pathname,
      body: lines.join("\n"),
    };
  }

  const slug = pathname.replace("/journal/", "");
  const article = content.articles.find((item) => item.slug === slug || item.id === slug);
  if (!article) return null;
  const lines: string[] = [`# ${article.title}`, "", article.excerpt, "", `**Category:** ${article.category} · **Reading time:** ${article.readTime}`, "", articleBody(article), ""];
  if (article.faqs.length) {
    addHeading(lines, "Frequently asked questions");
    for (const faq of article.faqs) {
      lines.push(`### ${faq.question}`, "", faq.answer, "");
    }
  }
  if (article.relatedHref && article.relatedLabel) {
    lines.push(`## Continue exploring`, "", `[${article.relatedLabel}](${absoluteUrl(origin, article.relatedHref)})`, "");
  }
  return {
    title: article.seoTitle || article.title,
    description: article.seoDescription || article.excerpt,
    canonicalPath: article.canonicalPath || pathname,
    body: lines.join("\n"),
  };
}

function sawanRetreatDocument(): MarkdownDocument {
  return {
    title: "Sawan Special Shiv Sadhana Retreat in Rishikesh | Shreevan Wellness",
    description:
      "A 3 nights / 4 days seasonal Shreevan Wellness retreat in Rishikesh with devotional practice, meditation, Ganga Aarti, sattvik meals and stay.",
    canonicalPath: "/sawan-shiv-sadhana-retreat",
    body: [
      "# Sawan Special Shiv Sadhana Retreat in Rishikesh",
      "",
      "A 3 nights / 4 days, suitability-led seasonal retreat for guests who wish to explore a guided rhythm of Shiva devotion, meditation, silence and reflection during Sawan.",
      "",
      "## At a glance",
      "",
      "- Location: Rishikesh, India",
      "- Duration: 3 nights / 4 days",
      "- Starting price: ₹21,000; final room category, dates and availability are confirmed before booking.",
      "",
      "## What the retreat includes",
      "",
      "- Guided Shivling Rudra Abhishek and devotional ritual context.",
      "- Rudri Path or Shri Rudram chanting, guided meditation and quiet reflection.",
      "- A Ganga Aarti experience, sattvik meals and comfortable stay.",
      "- A clear booking conversation for first-time guests, wellness travellers and devotional visitors.",
      "",
      "## Suitability and boundaries",
      "",
      "This is a guided spiritual-wellness retreat, not medical care, mental-health treatment, emergency support or a guarantee of spiritual outcomes. Guests should consider their travel, health and personal context before booking, and seek appropriate professional support where needed.",
      "",
      "## Booking",
      "",
      "Contact Shreevan Wellness by WhatsApp or use the enquiry form on the standard website view to confirm current dates and suitability.",
      "",
    ].join("\n"),
  };
}

async function simplePageDocument(pathname: string): Promise<MarkdownDocument | null> {
  const pageId = STANDARD_PAGE_IDS[pathname];
  if (pageId) {
    const page = await getPublicPageContent(pageId);
    return {
      title: page.seo.title,
      description: page.seo.description,
      canonicalPath: pathname,
      body: [
        `# ${page.hero.title}`,
        "",
        page.hero.lede,
        "",
        "## Next steps",
        "",
        `[${page.hero.primaryCtaLabel}](${page.hero.primaryCtaHref})`,
        "",
        `[${page.hero.secondaryCtaLabel}](${page.hero.secondaryCtaHref})`,
        "",
      ].join("\n"),
    };
  }

  const generic = GENERIC_PAGES[pathname];
  if (!generic) return null;
  return {
    title: generic.title,
    description: generic.description,
    canonicalPath: pathname,
    body: [`# ${generic.title}`, "", ...generic.body, ""].join("\n"),
  };
}

export async function buildMarkdownDocument(pathname: string) {
  const settings = await getPublicSiteSettings();
  const origin = getPublicSiteOrigin(settings);
  const document =
    (pathname === "/" ? await homeDocument(origin) : null) ??
    (pathname === "/modalities" || pathname.startsWith("/modalities/") ? await modalitiesDocument(origin, pathname) : null) ??
    (pathname === "/programs" || pathname.startsWith("/programs/") ? await programsDocument(origin, pathname) : null) ??
    (pathname === "/faqs" ? await faqDocument() : null) ??
    (pathname === "/testimonials" ? await storyDocument() : null) ??
    (pathname === "/journal" || pathname.startsWith("/journal/") ? await journalDocument(origin, pathname) : null) ??
    (pathname === "/sawan-shiv-sadhana-retreat" ? sawanRetreatDocument() : null) ??
    (await simplePageDocument(pathname));

  if (!document) return null;
  return { body: withFrontmatter(document, origin), origin };
}
