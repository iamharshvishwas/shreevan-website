import type { Metadata } from "next";
import { BookConsultationPage } from "@/components/consultation/book-consultation-page";
import { siteConfig } from "@/config/site";
import { JsonLd } from "@/lib/schema/json-ld";
import { breadcrumbSchema } from "@/lib/schema/site-schema";

export const metadata: Metadata = {
  title: "Book a Suitability Consultation",
  description:
    "Request a calm Shreevan Wellness suitability consultation before choosing a Rishikesh retreat program, travel dates, stay needs or payment path.",
  alternates: {
    canonical: "/book-consultation",
  },
};

export default function Page() {
  return (
    <>
      <JsonLd
        data={breadcrumbSchema([
          { name: "Home", url: siteConfig.url },
          { name: "Book Consultation", url: `${siteConfig.url}/book-consultation` },
        ])}
      />
      <BookConsultationPage />
    </>
  );
}
