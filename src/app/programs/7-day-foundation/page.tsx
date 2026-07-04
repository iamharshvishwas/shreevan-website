import type { Metadata } from "next";
import { SevenDayFoundationPage } from "@/components/programs/seven-day-foundation-page";
import { JsonLd } from "@/lib/schema/json-ld";
import { breadcrumbSchema, programServiceSchema, webPageSchema } from "@/lib/schema/site-schema";
import { siteConfig } from "@/config/site";
import { buildPageMetadata } from "@/lib/seo/page-metadata";

const pageUrl = `${siteConfig.url}/programs/7-day-foundation`;
const pageDescription =
  "A 7-day Shreevan Wellness foundation retreat in Rishikesh designed to help participants rebuild healthy habits through yoga, pranayama, meditation, sattvic living and reflection.";

const programSchema = programServiceSchema({
  name: "7-Day Ganga Sattva Foundation",
  url: pageUrl,
  description: pageDescription,
  audienceType: "International wellness guests seeking a deeper foundation than a short reset",
});

export const metadata: Metadata = buildPageMetadata({
  title: "7-Day Ganga Sattva Foundation",
  description:
    "Explore the 7-Day Ganga Sattva Foundation by Shreevan Wellness: Rebuild Your Life From Within through yoga, pranayama, meditation, sattvic nutrition and habit formation.",
  path: "/programs/7-day-foundation",
});

export default function Page() {
  return (
    <>
      <JsonLd
        data={breadcrumbSchema([
          { name: "Home", url: siteConfig.url },
          { name: "Programs", url: `${siteConfig.url}/programs` },
          { name: "7-Day Ganga Sattva Foundation", url: pageUrl },
        ])}
      />
      <JsonLd
        data={webPageSchema({
          name: "7-Day Ganga Sattva Foundation",
          url: pageUrl,
          description: pageDescription,
        })}
      />
      <JsonLd data={programSchema} />
      <SevenDayFoundationPage />
    </>
  );
}
