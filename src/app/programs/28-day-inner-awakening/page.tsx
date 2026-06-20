import type { Metadata } from "next";
import { TwentyEightDayInnerAwakeningPage } from "@/components/programs/twenty-eight-day-inner-awakening-page";
import { JsonLd } from "@/lib/schema/json-ld";
import { breadcrumbSchema } from "@/lib/schema/site-schema";
import { siteConfig } from "@/config/site";

const pageUrl = `${siteConfig.url}/programs/28-day-inner-awakening`;

const programSchema = {
  "@context": "https://schema.org",
  "@type": "Service",
  name: "28-Day Sattva Ganga Inner Awakening",
  serviceType: "Wellness retreat program",
  provider: {
    "@type": "Organization",
    name: siteConfig.name,
    url: siteConfig.url,
  },
  areaServed: ["United States", "Canada", "United Kingdom", "India"],
  url: pageUrl,
  description:
    "A 28-day Shreevan Wellness flagship personal transformation immersion in Rishikesh for clarity, healing, purpose, yogic living and sustainable wellbeing.",
  audience: {
    "@type": "Audience",
    audienceType:
      "International professionals, entrepreneurs and seekers ready for a structured long-form transformation immersion",
  },
  offers: {
    "@type": "Offer",
    price: "2200",
    priceCurrency: "USD",
    availability: "https://schema.org/InStock",
    url: pageUrl,
  },
};

export const metadata: Metadata = {
  title: "28-Day Sattva Ganga Inner Awakening",
  description:
    "Explore Shreevan Wellness's 28-day flagship Sattva Ganga Inner Awakening: Awaken, Heal, Transform and Integrate through 120-140 guided experiences in Rishikesh.",
  alternates: {
    canonical: "/programs/28-day-inner-awakening",
  },
};

export default function Page() {
  return (
    <>
      <JsonLd
        data={breadcrumbSchema([
          { name: "Home", url: siteConfig.url },
          { name: "Programs", url: `${siteConfig.url}/programs` },
          { name: "28-Day Sattva Ganga Inner Awakening", url: pageUrl },
        ])}
      />
      <JsonLd data={programSchema} />
      <TwentyEightDayInnerAwakeningPage />
    </>
  );
}
