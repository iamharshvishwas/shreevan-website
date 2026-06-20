import type { Metadata } from "next";
import { FourteenDayTransformationPage } from "@/components/programs/fourteen-day-transformation-page";
import { JsonLd } from "@/lib/schema/json-ld";
import { breadcrumbSchema } from "@/lib/schema/site-schema";
import { siteConfig } from "@/config/site";

const pageUrl = `${siteConfig.url}/programs/14-day-transformation`;

const programSchema = {
  "@context": "https://schema.org",
  "@type": "Service",
  name: "14-Day Ganga Sattva Transformation",
  serviceType: "Wellness retreat program",
  provider: {
    "@type": "Organization",
    name: siteConfig.name,
    url: siteConfig.url,
  },
  areaServed: ["United States", "Canada", "United Kingdom", "India"],
  url: pageUrl,
  description:
    "A 14-day Shreevan Wellness transformation retreat in Rishikesh for guests seeking emotional healing, life redesign, daily rituals and a personal transformation blueprint.",
  audience: {
    "@type": "Audience",
    audienceType: "Burned-out professionals, leaders, entrepreneurs, transition seekers and structured spiritual seekers",
  },
};

export const metadata: Metadata = {
  title: "14-Day Ganga Sattva Transformation",
  description:
    "Explore the 14-Day Ganga Sattva Transformation by Shreevan Wellness: Transform Your Mind, Body & Life through yoga, meditation, emotional healing, purpose work and life-design practices.",
  alternates: {
    canonical: "/programs/14-day-transformation",
  },
};

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
      <JsonLd data={programSchema} />
      <FourteenDayTransformationPage />
    </>
  );
}
