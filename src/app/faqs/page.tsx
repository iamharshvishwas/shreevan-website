import type { Metadata } from "next";
import { FaqsPage } from "@/components/faqs/faqs-page";
import { siteConfig } from "@/config/site";
import { JsonLd } from "@/lib/schema/json-ld";
import { breadcrumbSchema, webPageSchema } from "@/lib/schema/site-schema";
import { buildPageMetadata } from "@/lib/seo/page-metadata";
import { faqPageSchema, getPublicFaqContent } from "@/lib/site/public-content-trust";

export const revalidate = 3600;

export const metadata: Metadata = buildPageMetadata({
  title: "FAQs for International Wellness Retreat Guests",
  description:
    "Answers for Shreevan Wellness guests comparing Rishikesh retreat programs, consultation, payment, stay, food, travel, health boundaries and realistic outcomes.",
  path: "/faqs",
});

export default async function Page() {
  const faqContent = await getPublicFaqContent();

  return (
    <>
      <JsonLd
        data={breadcrumbSchema([
          { name: "Home", url: siteConfig.url },
          { name: "FAQs", url: `${siteConfig.url}/faqs` },
        ])}
      />
      <JsonLd
        data={webPageSchema({
          name: "FAQs for International Wellness Retreat Guests",
          url: `${siteConfig.url}/faqs`,
          description:
            "Answers for Shreevan Wellness guests comparing Rishikesh retreat programs, consultation, payment, stay, food, travel, health boundaries and realistic outcomes.",
        })}
      />
      <JsonLd data={faqPageSchema(faqContent.categories)} />
      <FaqsPage content={faqContent} />
    </>
  );
}
