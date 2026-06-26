import type { Metadata } from "next";
import { ModalitiesHubPage } from "@/components/seo/modalities-pages";
import { siteConfig } from "@/config/site";
import { modalities } from "@/lib/content/modalities";
import { JsonLd } from "@/lib/schema/json-ld";
import { breadcrumbSchema, itemListSchema, webPageSchema } from "@/lib/schema/site-schema";

const pageUrl = `${siteConfig.url}/modalities`;

export const metadata: Metadata = {
  title: "Core Wellness Modalities",
  description:
    "Explore Shreevan Wellness educational modality pages for yoga therapy, guided meditation, sound healing, Panchkarma, chakra work and spiritual sadhanas.",
  alternates: {
    canonical: "/modalities",
  },
};

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
          name: "Core Wellness Modalities",
          url: pageUrl,
          description:
            "Educational Shreevan Wellness modality hub for practices used inside retreat programs.",
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
      <ModalitiesHubPage modalities={modalities} />
    </>
  );
}
