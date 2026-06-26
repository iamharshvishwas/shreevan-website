import type { Metadata } from "next";
import { HomePage } from "@/components/home/home-page";
import { JsonLd } from "@/lib/schema/json-ld";
import { breadcrumbSchema, webPageSchema } from "@/lib/schema/site-schema";
import { getPublicHomeContent } from "@/lib/site/public-home";
import { getPublicPageContent } from "@/lib/site/public-pages";
import { getPublicSiteOrigin, getPublicSiteSettings } from "@/lib/site/public-settings";

export const dynamic = "force-dynamic";

export async function generateMetadata(): Promise<Metadata> {
  const [settings, homePage] = await Promise.all([getPublicSiteSettings(), getPublicPageContent("home")]);
  const shouldNoindex = settings.launch.indexingMode !== "indexable" || homePage.seo.noindex;

  return {
    title: homePage.seo.title,
    description: homePage.seo.description,
    alternates: {
      canonical: homePage.seo.canonicalPath,
    },
    robots: shouldNoindex
      ? {
          index: false,
          follow: false,
          nocache: true,
        }
      : {
          index: true,
          follow: true,
        },
  };
}

export default async function Page() {
  const [settings, homeContent, homePage] = await Promise.all([
    getPublicSiteSettings(),
    getPublicHomeContent(),
    getPublicPageContent("home"),
  ]);
  const siteOrigin = getPublicSiteOrigin(settings);

  return (
    <>
      <JsonLd data={breadcrumbSchema([{ name: "Home", url: siteOrigin }])} />
      <JsonLd
        data={webPageSchema({
          name: homePage.seo.title,
          url: siteOrigin,
          description: homePage.seo.description,
        })}
      />
      <HomePage content={homeContent} />
    </>
  );
}
