import type { MetadataRoute } from "next";
import { getPublicSitemapRoutes } from "@/lib/site/public-seo";
import { getPublicSiteOrigin, getPublicSiteSettings } from "@/lib/site/public-settings";

export const dynamic = "force-dynamic";

const sitemapExcludedPaths = new Set(["/sawan-shiv-sadhana-retreat"]);

function routeLastModified(lastReviewedAt: string) {
  const parsed = new Date(lastReviewedAt);

  return Number.isNaN(parsed.getTime()) ? new Date("2026-06-20T00:00:00.000Z") : parsed;
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const settings = await getPublicSiteSettings();

  if (!settings.launch.sitemapEnabled || settings.launch.robotsPolicy !== "public") {
    return [];
  }

  const siteOrigin = getPublicSiteOrigin(settings);
  const routes = (await getPublicSitemapRoutes()).filter((route) => !sitemapExcludedPaths.has(route.href));

  return routes.map((route) => ({
    url: `${siteOrigin}${route.href === "/" ? "" : route.href}`,
    lastModified: routeLastModified(route.lastReviewedAt),
    changeFrequency: route.changeFrequency,
    priority: route.priority,
  }));
}
