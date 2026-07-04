import type { Metadata } from "next";
import { AboutFounderPage } from "@/components/about/about-founder-page";
import { JsonLd } from "@/lib/schema/json-ld";
import { breadcrumbSchema, webPageSchema } from "@/lib/schema/site-schema";
import { siteConfig } from "@/config/site";
import { buildPageMetadata } from "@/lib/seo/page-metadata";

export const metadata: Metadata = buildPageMetadata({
  title: `Our Story | ${siteConfig.name}`,
  description:
    "Meet the story and founder intention behind Shreevan Wellness, a responsible premium retreat experience in Rishikesh, India.",
  path: "/about-founder",
  absoluteTitle: true,
});

export default function Page() {
  return (
    <>
      <JsonLd
        data={breadcrumbSchema([
          { name: "Home", url: siteConfig.url },
          { name: "Our Story", url: `${siteConfig.url}/about-founder` },
        ])}
      />
      <JsonLd
        data={webPageSchema({
          type: "AboutPage",
          name: "Our Story",
          url: `${siteConfig.url}/about-founder`,
          description:
            "Meet the story and founder intention behind Shreevan Wellness, a responsible premium retreat experience in Rishikesh, India.",
        })}
      />
      <AboutFounderPage />
    </>
  );
}
