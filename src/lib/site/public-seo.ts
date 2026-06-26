import "server-only";

import { readAdminSeoLeads } from "@/lib/admin/seo-leads";
import { getPublicJournalContent } from "@/lib/site/public-content-trust";

function toSitemapDate(date: string) {
  const parsed = new Date(date);

  return Number.isNaN(parsed.getTime()) ? "2026-06-26" : parsed.toISOString();
}

export async function getPublicSitemapRoutes() {
  const [store, journalContent] = await Promise.all([readAdminSeoLeads(), getPublicJournalContent()]);

  const configuredRoutes = store.routes
    .filter((route) => route.indexable && route.sitemapEnabled)
    .map((route) => ({
      href: route.path,
      priority: route.priority,
      changeFrequency: route.changeFrequency,
      lastReviewedAt: route.lastReviewedAt,
    }));

  const configuredHrefs = new Set(configuredRoutes.map((route) => route.href));
  const journalRoutes = journalContent.articles
    .map((article) => ({
      href: `/journal/${article.id}`,
      priority: 0.56,
      changeFrequency: "monthly" as const,
      lastReviewedAt: toSitemapDate(article.date),
    }))
    .filter((route) => !configuredHrefs.has(route.href));

  return [...configuredRoutes, ...journalRoutes];
}
