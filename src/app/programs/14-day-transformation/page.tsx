import type { Metadata } from "next";
import { FourteenDayTransformationPage } from "@/components/programs/fourteen-day-transformation-page";
import { JsonLd } from "@/lib/schema/json-ld";
import { breadcrumbSchema, programServiceSchema, webPageSchema } from "@/lib/schema/site-schema";
import { siteConfig } from "@/config/site";
import { buildPageMetadata } from "@/lib/seo/page-metadata";

export const revalidate = 3600;

const pageUrl = `${siteConfig.url}/programs/14-day-transformation`;
const pageDescription =
  "A 14-day Shreevan Wellness transformation retreat in Rishikesh for guests seeking emotional reflection, life redesign, daily rituals and a personal transformation blueprint.";

const programSchema = programServiceSchema({
  name: "14-Day Ganga Sattva Transformation",
  url: pageUrl,
  description: pageDescription,
  audienceType: "Burned-out professionals, leaders, entrepreneurs, transition seekers and structured spiritual seekers",
});

export const metadata: Metadata = buildPageMetadata({
  title: "14-Day Ganga Sattva Transformation",
  description:
    "Explore the 14-Day Ganga Sattva Transformation by Shreevan Wellness: Transform Your Mind, Body & Life through yoga, meditation, emotional healing, purpose work and life-design practices.",
  path: "/programs/14-day-transformation",
});

export default function Page() {
  return (
    <>
      <JsonLd
        data={breadcrumbSchema([
          { name: "Home", url: siteConfig.url },
          { name: "Programs", url: `${siteConfig.url}/programs` },
          { name: "14-Day Ganga Sattva Transformation", url: pageUrl },
        ])}
      />
      <JsonLd
        data={webPageSchema({
          name: "14-Day Ganga Sattva Transformation",
          url: pageUrl,
          description: pageDescription,
        })}
      />
      <JsonLd data={programSchema} />
      <FourteenDayTransformationPage />
    </>
  );
}
