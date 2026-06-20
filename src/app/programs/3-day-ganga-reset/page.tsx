import type { Metadata } from "next";
import { ThreeDayGangaResetPage } from "@/components/programs/three-day-ganga-reset-page";
import { JsonLd } from "@/lib/schema/json-ld";
import { breadcrumbSchema } from "@/lib/schema/site-schema";
import { siteConfig } from "@/config/site";

const pageUrl = `${siteConfig.url}/programs/3-day-ganga-reset`;

const programSchema = {
  "@context": "https://schema.org",
  "@type": "Service",
  name: "3-Day Ganga Sattva Reset",
  serviceType: "Wellness retreat program",
  provider: {
    "@type": "Organization",
    name: siteConfig.name,
    url: siteConfig.url,
  },
  areaServed: ["United States", "Canada", "United Kingdom", "India"],
  url: pageUrl,
  description:
    "A 3-day Shreevan Wellness retreat in Rishikesh designed to help participants pause, breathe, reconnect and leave with a simple wellness routine.",
  audience: {
    "@type": "Audience",
    audienceType: "Busy professionals, entrepreneurs, corporate employees, solo travelers and first-time retreat guests",
  },
};

export const metadata: Metadata = {
  title: "3-Day Ganga Sattva Reset",
  description:
    "Explore the 3-Day Ganga Sattva Reset by Shreevan Wellness: Pause. Breathe. Reconnect. A first-timer friendly retreat for stress reset, meditation, yoga and daily routine building.",
  alternates: {
    canonical: "/programs/3-day-ganga-reset",
  },
};

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
      <JsonLd data={programSchema} />
      <ThreeDayGangaResetPage />
    </>
  );
}
