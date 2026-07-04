import type { Metadata } from "next";
import { SixtyDayRishiResidencyPage } from "@/components/programs/sixty-day-rishi-residency-page";
import { JsonLd } from "@/lib/schema/json-ld";
import { breadcrumbSchema, programServiceSchema, webPageSchema } from "@/lib/schema/site-schema";
import { siteConfig } from "@/config/site";
import { buildPageMetadata } from "@/lib/seo/page-metadata";

const pageUrl = `${siteConfig.url}/programs/60-day-rishi-residency`;
const pageDescription =
  "A 60-day Shreevan Wellness conscious living residency in Rishikesh for advanced lifestyle transformation, yogic living, mentoring and integration.";

const programSchema = programServiceSchema({
  name: "60-Day Rishi Tantra Conscious Living Residency",
  serviceType: "Wellness residency program",
  url: pageUrl,
  description: pageDescription,
  audienceType:
    "Burned-out executives, entrepreneurs, wellness professionals, digital nomads, life transition seekers and serious spiritual seekers",
});

export const metadata: Metadata = buildPageMetadata({
  title: "60-Day Rishi Tantra Conscious Living Residency",
  description:
    "Explore Shreevan Wellness's most advanced 60-day Rishi Tantra residency: a conscious living immersion for health, habits, purpose, mentoring and long-term integration.",
  path: "/programs/60-day-rishi-residency",
});

export default function Page() {
  return (
    <>
      <JsonLd
        data={breadcrumbSchema([
          { name: "Home", url: siteConfig.url },
          { name: "Programs", url: `${siteConfig.url}/programs` },
          { name: "60-Day Rishi Tantra Conscious Living Residency", url: pageUrl },
        ])}
      />
      <JsonLd
        data={webPageSchema({
          name: "60-Day Rishi Tantra Conscious Living Residency",
          url: pageUrl,
          description: pageDescription,
        })}
      />
      <JsonLd data={programSchema} />
      <SixtyDayRishiResidencyPage />
    </>
  );
}
