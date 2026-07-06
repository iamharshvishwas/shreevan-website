import "server-only";

import { unstable_cache } from "next/cache";
import { readAdminSeoLeads } from "@/lib/admin/seo-leads";
import { CACHE_TAGS } from "@/lib/site/content-cache";
import { getPublicJournalContent } from "@/lib/site/public-content-trust";

function toSitemapDate(date: string) {
  const parsed = new Date(date);

  return Number.isNaN(parsed.getTime()) ? "2026-06-26" : parsed.toISOString();
}

export const getPublicSitemapRoutes = unstable_cache(
  async function getPublicSitemapRoutes() {
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
  },
  ["public-sitemap-routes"],
  { tags: [CACHE_TAGS.seo, CACHE_TAGS.contentTrust] },
);
