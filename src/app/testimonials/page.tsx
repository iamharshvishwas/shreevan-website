import type { Metadata } from "next";
import { HealingStoriesPage } from "@/components/testimonials/healing-stories-page";
import { siteConfig } from "@/config/site";
import { JsonLd } from "@/lib/schema/json-ld";
import { breadcrumbSchema } from "@/lib/schema/site-schema";

export const metadata: Metadata = {
  title: "Healing Stories",
  description:
    "Consent-led Shreevan Wellness guest stories, reflections and retreat outcomes presented with responsible wellness boundaries.",
  alternates: {
    canonical: "/testimonials",
  },
};

export default function Page() {
  return (
    <>
      <JsonLd
        data={breadcrumbSchema([
          { name: "Home", url: siteConfig.url },
          { name: "Healing Stories", url: `${siteConfig.url}/testimonials` },
        ])}
      />
      <HealingStoriesPage />
    </>
  );
}
