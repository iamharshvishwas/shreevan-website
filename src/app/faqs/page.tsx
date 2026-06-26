import type { Metadata } from "next";
import { FaqsPage } from "@/components/faqs/faqs-page";
import { siteConfig } from "@/config/site";
import { JsonLd } from "@/lib/schema/json-ld";
import { breadcrumbSchema, webPageSchema } from "@/lib/schema/site-schema";
import { faqPageSchema, getPublicFaqContent } from "@/lib/site/public-content-trust";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "FAQs for International Wellness Retreat Guests",
  description:
    "Answers for Shreevan Wellness guests comparing Rishikesh retreat programs, consultation, payment, stay, food, travel, health boundaries and realistic outcomes.",
  alternates: {
    canonical: "/faqs",
  },
};

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
