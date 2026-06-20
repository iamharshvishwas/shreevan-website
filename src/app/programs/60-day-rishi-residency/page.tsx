import type { Metadata } from "next";
import { SixtyDayRishiResidencyPage } from "@/components/programs/sixty-day-rishi-residency-page";
import { JsonLd } from "@/lib/schema/json-ld";
import { breadcrumbSchema } from "@/lib/schema/site-schema";
import { siteConfig } from "@/config/site";

const pageUrl = `${siteConfig.url}/programs/60-day-rishi-residency`;

const programSchema = {
  "@context": "https://schema.org",
  "@type": "Service",
  name: "60-Day Rishi Tantra Conscious Living Residency",
  serviceType: "Wellness residency program",
  provider: {
    "@type": "Organization",
    name: siteConfig.name,
    url: siteConfig.url,
  },
  areaServed: ["United States", "Canada", "United Kingdom", "India"],
  url: pageUrl,
  description:
    "A 60-day Shreevan Wellness conscious living residency in Rishikesh for advanced lifestyle transformation, yogic living, mentoring and integration.",
  audience: {
    "@type": "Audience",
    audienceType:
      "Burned-out executives, entrepreneurs, wellness professionals, digital nomads, life transition seekers and serious spiritual seekers",
  },
};

export const metadata: Metadata = {
  title: "60-Day Rishi Tantra Conscious Living Residency",
  description:
    "Explore Shreevan Wellness's most advanced 60-day Rishi Tantra residency: a conscious living immersion for health, habits, purpose, mentoring and long-term integration.",
  alternates: {
    canonical: "/programs/60-day-rishi-residency",
  },
};

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
      <JsonLd data={programSchema} />
      <SixtyDayRishiResidencyPage />
    </>
  );
}
