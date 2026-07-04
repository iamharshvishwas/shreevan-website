import type { Metadata } from "next";
import { BookConsultationPage } from "@/components/consultation/book-consultation-page";
import { siteConfig } from "@/config/site";
import { JsonLd } from "@/lib/schema/json-ld";
import { breadcrumbSchema, webPageSchema } from "@/lib/schema/site-schema";
import { buildPageMetadata } from "@/lib/seo/page-metadata";

export const metadata: Metadata = buildPageMetadata({
  title: "Book a Suitability Consultation",
  description:
    "Request a calm Shreevan Wellness suitability consultation before choosing a Rishikesh retreat program, travel dates, stay needs or payment path.",
  path: "/book-consultation",
});

export default function Page() {
  return (
    <>
      <JsonLd
        data={breadcrumbSchema([
          { name: "Home", url: siteConfig.url },
          { name: "Book Consultation", url: `${siteConfig.url}/book-consultation` },
        ])}
      />
      <JsonLd
        data={webPageSchema({
          name: "Book a Suitability Consultation",
          url: `${siteConfig.url}/book-consultation`,
          description:
            "Request a calm Shreevan Wellness suitability consultation before choosing a Rishikesh retreat program, travel dates, stay needs or payment path.",
        })}
      />
      <BookConsultationPage />
    </>
  );
}
