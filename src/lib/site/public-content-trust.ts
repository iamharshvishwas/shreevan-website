import "server-only";

import { defaultAdminContentTrust, readAdminContentTrust } from "@/lib/admin/content-trust";
import type {
  AdminContentTrustStore,
  AdminFaqCategory,
  AdminJournalArticle,
  AdminStorySlot,
  AdminTrustStandard,
  AdminVideoSlot,
} from "@/lib/admin/content-trust";
import type {
  PublicFaqCategory,
  PublicFaqContent,
  PublicJournalArticle,
  PublicJournalContent,
  PublicStoryContent,
  PublicStorySlot,
  PublicTrustStandard,
  PublicVideoSlot,
} from "@/lib/site/public-content-trust-types";

function published<T extends { status: string }>(items: T[]) {
  return items.filter((item) => item.status === "published");
}

function toTrustStandard(item: AdminTrustStandard): PublicTrustStandard {
  return {
    id: item.id,
    title: item.title,
    copy: item.copy,
  };
}

function toFaqCategory(category: AdminFaqCategory): PublicFaqCategory {
  return {
    id: category.id,
    label: category.label,
    intent: category.intent,
    faqs: category.faqs
      .filter((faq) => faq.enabled)
      .map((faq) => ({
        question: faq.question,
        answer: faq.answer,
        links: faq.links,
      })),
  };
}

function toStorySlot(story: AdminStorySlot): PublicStorySlot {
  return {
    id: story.id,
    label: story.label,
    title: story.title,
    context: story.context,
    proof: story.proof,
  };
}

function toVideoSlot(video: AdminVideoSlot): PublicVideoSlot {
  return {
    id: video.id,
    title: video.title,
    copy: video.copy,
  };
}

function toJournalArticle(article: AdminJournalArticle): PublicJournalArticle {
  return {
    id: article.id,
    category: article.category,
    title: article.title,
    excerpt: article.excerpt,
    date: article.date,
    readTime: article.readTime,
    audience: article.audience,
    tags: article.tags,
    keyPoints: article.keyPoints,
    relatedHref: article.relatedHref,
    relatedLabel: article.relatedLabel,
    contactLabel: article.contactLabel,
  };
}

function fallbackIfEmpty<T>(items: T[], fallback: T[]) {
  return items.length ? items : fallback;
}

async function readStoreWithFallback(): Promise<AdminContentTrustStore> {
  return readAdminContentTrust();
}

export async function getPublicFaqContent(): Promise<PublicFaqContent> {
  const store = await readStoreWithFallback();
  const categories = published(store.faqCategories).map(toFaqCategory).filter((category) => category.faqs.length);
  const fallbackCategories = published(defaultAdminContentTrust.faqCategories)
    .map(toFaqCategory)
    .filter((category) => category.faqs.length);

  return {
    categories: fallbackIfEmpty(categories, fallbackCategories),
    researchSignals: fallbackIfEmpty(store.faqResearchSignals, defaultAdminContentTrust.faqResearchSignals),
    responsibleStandards: fallbackIfEmpty(
      published(store.responsibleStandards).map(toTrustStandard),
      published(defaultAdminContentTrust.responsibleStandards).map(toTrustStandard),
    ),
  };
}

export async function getPublicStoryContent(): Promise<PublicStoryContent> {
  const store = await readStoreWithFallback();

  return {
    trustMarkers: fallbackIfEmpty(
      published(store.storyTrustMarkers).map(toTrustStandard),
      published(defaultAdminContentTrust.storyTrustMarkers).map(toTrustStandard),
    ),
    storySlots: fallbackIfEmpty(
      published(store.storySlots).map(toStorySlot),
      published(defaultAdminContentTrust.storySlots).map(toStorySlot),
    ),
    videoSlots: fallbackIfEmpty(
      published(store.videoSlots).map(toVideoSlot),
      published(defaultAdminContentTrust.videoSlots).map(toVideoSlot),
    ),
    outcomeRows: fallbackIfEmpty(
      published(store.outcomeRows).map(toTrustStandard),
      published(defaultAdminContentTrust.outcomeRows).map(toTrustStandard),
    ),
    consentStandards: fallbackIfEmpty(store.consentStandards, defaultAdminContentTrust.consentStandards),
  };
}

export async function getPublicJournalContent(): Promise<PublicJournalContent> {
  const store = await readStoreWithFallback();
  const articles = published(store.journalArticles).map(toJournalArticle);
  const fallbackArticles = published(defaultAdminContentTrust.journalArticles).map(toJournalArticle);
  const sourceArticles = fallbackIfEmpty(articles, fallbackArticles);
  const featuredArticleIds = store.journalArticles
    .filter((article) => article.status === "published" && article.featured)
    .map((article) => article.id);

  return {
    categories: fallbackIfEmpty(store.journalCategories, defaultAdminContentTrust.journalCategories),
    articles: sourceArticles,
    editorPicks: fallbackIfEmpty(featuredArticleIds, defaultAdminContentTrust.journalArticles.filter((article) => article.featured).map((article) => article.id)),
  };
}

export function faqPageSchema(categories: PublicFaqCategory[]) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: categories.flatMap((category) =>
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
