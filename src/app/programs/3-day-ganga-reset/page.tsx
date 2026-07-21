import type { Metadata } from "next";
import { ThreeDayGangaResetPage } from "@/components/programs/three-day-ganga-reset-page";
import { JsonLd } from "@/lib/schema/json-ld";
import { breadcrumbSchema, programServiceSchema, webPageSchema } from "@/lib/schema/site-schema";
import { siteConfig } from "@/config/site";
import { buildPageMetadata } from "@/lib/seo/page-metadata";

export const revalidate = 3600;

const pageUrl = `${siteConfig.url}/programs/3-day-ganga-reset`;
const pageDescription =
  "A 3-day Shreevan Wellness retreat in Rishikesh designed to help participants pause, breathe, reconnect and leave with a simple wellness routine.";

const programSchema = programServiceSchema({
  name: "3-Day Ganga Sattva Reset",
  url: pageUrl,
  description: pageDescription,
  audienceType: "Busy professionals, entrepreneurs, corporate employees, solo travelers and first-time retreat guests",
});

export const metadata: Metadata = buildPageMetadata({
  title: "3-Day Ganga Sattva Reset",
  description:
    "Explore the 3-Day Ganga Sattva Reset by Shreevan Wellness: Pause. Breathe. Reconnect. A first-timer friendly retreat for stress reset, meditation, yoga and daily routine building.",
  path: "/programs/3-day-ganga-reset",
});

export default function Page() {
  return (
    <>
      <JsonLd
        data={breadcrumbSchema([
          { name: "Home", url: siteConfig.url },
          { name: "Programs", url: `${siteConfig.url}/programs` },
          { name: "3-Day Ganga Sattva Reset", url: pageUrl },
        ])}
      />
      <JsonLd
        data={webPageSchema({
          name: "3-Day Ganga Sattva Reset",
          url: pageUrl,
          description: pageDescription,
        })}
      />
      <JsonLd data={programSchema} />
      <ThreeDayGangaResetPage />
    </>
  );
}
