import type { Metadata } from "next";
import { TwentyEightDayInnerAwakeningPage } from "@/components/programs/twenty-eight-day-inner-awakening-page";
import { JsonLd } from "@/lib/schema/json-ld";
import { breadcrumbSchema, programServiceSchema, webPageSchema } from "@/lib/schema/site-schema";
import { siteConfig } from "@/config/site";

const pageUrl = `${siteConfig.url}/programs/28-day-inner-awakening`;
const pageDescription =
  "A 28-day Shreevan Wellness flagship personal transformation immersion in Rishikesh for clarity, purpose, yogic living and sustainable wellbeing.";

const programSchema = programServiceSchema({
  name: "28-Day Sattva Ganga Inner Awakening",
  url: pageUrl,
  description: pageDescription,
  audienceType:
    "International professionals, entrepreneurs and seekers ready for a structured long-form transformation immersion",
  offers: {
    price: "2200",
    priceCurrency: "USD",
  },
});

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
      <JsonLd
        data={webPageSchema({
          name: "28-Day Sattva Ganga Inner Awakening",
          url: pageUrl,
          description: pageDescription,
        })}
      />
      <JsonLd data={programSchema} />
      <TwentyEightDayInnerAwakeningPage />
    </>
  );
}
