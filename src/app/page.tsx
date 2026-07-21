import type { Metadata } from "next";
import { HomePage } from "@/components/home/home-page";
import { JsonLd } from "@/lib/schema/json-ld";
import { homeFaqs } from "@/lib/content/home-aeo";
import { breadcrumbSchema, faqPageSchema, webPageSchema } from "@/lib/schema/site-schema";
import { buildPageMetadata } from "@/lib/seo/page-metadata";
import { getPublicHomeContent } from "@/lib/site/public-home";
import { getPublicPageContent } from "@/lib/site/public-pages";
import { getPublicSiteOrigin, getPublicSiteSettings } from "@/lib/site/public-settings";

export const revalidate = 3600;

export async function generateMetadata(): Promise<Metadata> {
  const [settings, homePage] = await Promise.all([getPublicSiteSettings(), getPublicPageContent("home")]);
  const shouldNoindex = settings.launch.indexingMode !== "indexable" || homePage.seo.noindex;

  return buildPageMetadata({
    title: homePage.seo.title,
    description: homePage.seo.description,
    path: homePage.seo.canonicalPath,
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
  });
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
      <JsonLd data={faqPageSchema(homeFaqs)} />
      <HomePage content={homeContent} />
    </>
  );
}
