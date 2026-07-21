import type { Metadata } from "next";
import { ModalitiesHubPage } from "@/components/seo/modalities-pages";
import { siteConfig } from "@/config/site";
import { modalities, modalitiesHubContent } from "@/lib/content/modalities";
import { JsonLd } from "@/lib/schema/json-ld";
import { breadcrumbSchema, faqPageSchema, itemListSchema, webPageSchema } from "@/lib/schema/site-schema";
import { buildPageMetadata } from "@/lib/seo/page-metadata";

export const revalidate = 3600;

const pageUrl = `${siteConfig.url}/modalities`;

export const metadata: Metadata = buildPageMetadata({
  title: "Core Wellness Modalities in Rishikesh",
  description:
    "Explore Shreevan Wellness educational modality pages for yoga therapy, guided meditation, sound healing, Panchkarma, chakra work and spiritual sadhanas with clear suitability boundaries.",
  path: "/modalities",
});

export default function Page() {
  return (
    <>
      <JsonLd
        data={breadcrumbSchema([
          { name: "Home", url: siteConfig.url },
          { name: "Modalities", url: pageUrl },
        ])}
      />
      <JsonLd
        data={webPageSchema({
          type: "CollectionPage",
          name: "Core Wellness Modalities in Rishikesh",
          url: pageUrl,
          description:
            "Educational Shreevan Wellness modality hub for practices used inside retreat programs, including responsible boundaries and program links.",
        })}
      />
      <JsonLd
        data={itemListSchema({
          name: "Shreevan Wellness core modalities",
          url: pageUrl,
          items: modalities.map((modality) => ({
            name: modality.title,
            url: modality.path,
            description: modality.description,
          })),
        })}
      />
      <JsonLd data={faqPageSchema(modalitiesHubContent.faqs)} />
      <ModalitiesHubPage content={modalitiesHubContent} modalities={modalities} />
    </>
  );
}
