import type { Metadata } from "next";
import { FaqsPage } from "@/components/faqs/faqs-page";
import { faqPageSchema } from "@/components/faqs/faq-data";
import { siteConfig } from "@/config/site";
import { JsonLd } from "@/lib/schema/json-ld";
import { breadcrumbSchema } from "@/lib/schema/site-schema";

export const metadata: Metadata = {
  title: "FAQs for International Wellness Retreat Guests",
  description:
    "Answers for Shreevan Wellness guests comparing Rishikesh retreat programs, consultation, payment, stay, food, travel, health boundaries and realistic outcomes.",
  alternates: {
    canonical: "/faqs",
  },
};

export default function Page() {
  return (
    <>
      <JsonLd
        data={breadcrumbSchema([
          { name: "Home", url: siteConfig.url },
          { name: "FAQs", url: `${siteConfig.url}/faqs` },
        ])}
      />
      <JsonLd data={faqPageSchema()} />
      <FaqsPage />
    </>
  );
}
