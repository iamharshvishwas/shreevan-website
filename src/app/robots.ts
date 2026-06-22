import type { MetadataRoute } from "next";
import { getPublicSiteOrigin, getPublicSiteSettings } from "@/lib/site/public-settings";

export const dynamic = "force-dynamic";

export default async function robots(): Promise<MetadataRoute.Robots> {
  const settings = await getPublicSiteSettings();
  const siteOrigin = getPublicSiteOrigin(settings);

  if (settings.launch.robotsPolicy === "public") {
    return {
      rules: [
        {
          userAgent: "*",
          allow: "/",
          disallow: ["/admin/", "/payment"],
        },
      ],
      host: siteOrigin,
      ...(settings.launch.sitemapEnabled ? { sitemap: `${siteOrigin}/sitemap.xml` } : {}),
    };
  }

  return {
    rules: [
      {
        userAgent: "*",
        disallow: "/",
      },
    ],
    host: siteOrigin,
  };
}
