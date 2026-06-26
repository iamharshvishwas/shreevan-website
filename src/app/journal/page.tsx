import type { Metadata } from "next";
import { JournalPage } from "@/components/journal/journal-page";
import { siteConfig } from "@/config/site";
import { JsonLd } from "@/lib/schema/json-ld";
import { breadcrumbSchema, itemListSchema, webPageSchema } from "@/lib/schema/site-schema";
import { getPublicJournalContent } from "@/lib/site/public-content-trust";

export const dynamic = "force-dynamic";

const pageUrl = `${siteConfig.url}/journal`;

const journalSchema = {
  "@context": "https://schema.org",
  "@type": "Blog",
  name: "Shreevan Wellness Journal",
  url: pageUrl,
  description:
    "Educational wellness resources from Shreevan Wellness on retreat selection, yoga, meditation, sattvic living, Rishikesh preparation and responsible spiritual care.",
  publisher: {
    "@type": "Organization",
    name: siteConfig.name,
    url: siteConfig.url,
    logo: `${siteConfig.url}${siteConfig.logos.primary}`,
  },
  about: [
    "Rishikesh wellness retreats",
    "Yoga and meditation education",
    "Sattvic living",
    "Retreat preparation",
    "Responsible wellness",
  ],
  audience: {
    "@type": "Audience",
    audienceType:
      "International retreat guests, professionals, entrepreneurs, serious seekers and life-transition visitors",
  },
};

export const metadata: Metadata = {
  title: "Journal | Wellness Resources",
  description:
    "Read Shreevan Wellness resources on retreat selection, yoga, meditation, sattvic living, Rishikesh preparation and responsible wellness boundaries.",
  alternates: {
    canonical: "/journal",
  },
};

export default async function Page() {
  const journalContent = await getPublicJournalContent();

  return (
    <>
      <JsonLd
        data={breadcrumbSchema([
          { name: "Home", url: siteConfig.url },
          { name: "Journal", url: pageUrl },
        ])}
      />
      <JsonLd
        data={webPageSchema({
          type: "CollectionPage",
          name: "Shreevan Wellness Journal",
          url: pageUrl,
          description:
            "Educational wellness resources from Shreevan Wellness on retreat selection, yoga, meditation, sattvic living, Rishikesh preparation and responsible spiritual care.",
        })}
      />
      <JsonLd data={journalSchema} />
      <JsonLd
        data={itemListSchema({
          name: "Shreevan Wellness journal articles",
          url: pageUrl,
          items: journalContent.articles.map((article) => ({
            name: article.title,
            url: `/journal/${article.id}`,
            description: article.excerpt,
          })),
        })}
      />
      <JournalPage content={journalContent} />
    </>
  );
}
