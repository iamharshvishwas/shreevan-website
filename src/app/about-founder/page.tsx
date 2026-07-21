import type { Metadata } from "next";
import { AboutFounderPage } from "@/components/about/about-founder-page";
import { JsonLd } from "@/lib/schema/json-ld";
import { breadcrumbSchema, webPageSchema } from "@/lib/schema/site-schema";
import { siteConfig } from "@/config/site";
import { buildPageMetadata } from "@/lib/seo/page-metadata";
import { getPublicAboutStoryContent, getPublicPageContent } from "@/lib/site/public-pages";

export const revalidate = 3600;

export async function generateMetadata(): Promise<Metadata> {
  const page = await getPublicPageContent("about-founder");
  return buildPageMetadata({ title: page.seo.title, description: page.seo.description, path: page.seo.canonicalPath, absoluteTitle: true, robots: page.seo.noindex ? { index: false, follow: false } : { index: true, follow: true } });
}

export default async function Page() {
  const [page, content] = await Promise.all([getPublicPageContent("about-founder"), getPublicAboutStoryContent()]);
  return (
    <>
      <JsonLd
        data={breadcrumbSchema([
          { name: "Home", url: siteConfig.url },
          { name: page.seo.title, url: `${siteConfig.url}${page.path}` },
        ])}
      />
      <JsonLd
        data={webPageSchema({
          type: "AboutPage",
          name: page.seo.title,
          url: `${siteConfig.url}${page.path}`,
          description: page.seo.description,
        })}
      />
      <AboutFounderPage content={content} />
    </>
  );
}
