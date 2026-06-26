import type { Metadata } from "next";
import { HealingStoriesPage } from "@/components/testimonials/healing-stories-page";
import { siteConfig } from "@/config/site";
import { JsonLd } from "@/lib/schema/json-ld";
import { breadcrumbSchema, webPageSchema } from "@/lib/schema/site-schema";
import { getPublicStoryContent } from "@/lib/site/public-content-trust";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Healing Stories",
  description:
    "Consent-led Shreevan Wellness guest stories, reflections and retreat outcomes presented with responsible wellness boundaries.",
  alternates: {
    canonical: "/testimonials",
  },
};

export default async function Page() {
  const storyContent = await getPublicStoryContent();

  return (
    <>
      <JsonLd
        data={breadcrumbSchema([
          { name: "Home", url: siteConfig.url },
          { name: "Healing Stories", url: `${siteConfig.url}/testimonials` },
        ])}
      />
      <JsonLd
        data={webPageSchema({
          name: "Healing Stories",
          url: `${siteConfig.url}/testimonials`,
          description:
            "Consent-led Shreevan Wellness guest stories, reflections and retreat outcomes presented with responsible wellness boundaries.",
        })}
      />
      <HealingStoriesPage content={storyContent} />
    </>
  );
}
