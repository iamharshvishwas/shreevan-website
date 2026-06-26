import type { Metadata } from "next";
import { ProgramsHubPage } from "@/components/seo/programs-hub-page";
import { siteConfig } from "@/config/site";
import { JsonLd } from "@/lib/schema/json-ld";
import { breadcrumbSchema, itemListSchema, webPageSchema } from "@/lib/schema/site-schema";
import { getPublicProgramSummaries } from "@/lib/site/public-programs";

const pageUrl = `${siteConfig.url}/programs`;

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Immersive Wellness Programs",
  description:
    "Compare Shreevan Wellness 3, 7, 14, 28 and 60-day retreat programs in Rishikesh before booking a suitability consultation.",
  alternates: {
    canonical: "/programs",
  },
};

export default async function Page() {
  const programs = await getPublicProgramSummaries();

  return (
    <>
      <JsonLd
        data={breadcrumbSchema([
          { name: "Home", url: siteConfig.url },
          { name: "Programs", url: pageUrl },
        ])}
      />
      <JsonLd
        data={webPageSchema({
          type: "CollectionPage",
          name: "Immersive Wellness Programs",
          url: pageUrl,
          description:
            "A comparison hub for Shreevan Wellness duration-based retreat programs in Rishikesh.",
        })}
      />
      <JsonLd
        data={itemListSchema({
          name: "Shreevan Wellness program paths",
          url: pageUrl,
          items: programs.map((program) => ({
            name: program.title,
            url: program.href,
            description: program.summary,
          })),
        })}
      />
      <ProgramsHubPage programs={programs} />
    </>
  );
}
