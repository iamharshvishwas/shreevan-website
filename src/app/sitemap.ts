import type { MetadataRoute } from "next";
import { getPublicSitemapRoutes } from "@/lib/site/public-seo";
import { getPublicSiteOrigin, getPublicSiteSettings } from "@/lib/site/public-settings";

export const dynamic = "force-dynamic";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const settings = await getPublicSiteSettings();

  if (!settings.launch.sitemapEnabled || settings.launch.robotsPolicy !== "public") {
    return [];
  }

  const siteOrigin = getPublicSiteOrigin(settings);
  const lastModified = new Date("2026-06-20T00:00:00.000Z");
  const routes = await getPublicSitemapRoutes();

  return routes.map((route) => ({
    url: `${siteOrigin}${route.href === "/" ? "" : route.href}`,
    lastModified,
    changeFrequency: route.changeFrequency,
    priority: route.priority,
  }));
}
