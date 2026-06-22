import "server-only";

import { readAdminSeoLeads } from "@/lib/admin/seo-leads";

export async function getPublicSitemapRoutes() {
  const store = await readAdminSeoLeads();

  return store.routes
    .filter((route) => route.indexable && route.sitemapEnabled)
    .map((route) => ({
      href: route.path,
      priority: route.priority,
      changeFrequency: route.changeFrequency,
    }));
}
