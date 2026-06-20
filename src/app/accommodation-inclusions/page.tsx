import type { Metadata } from "next";
import { StayFoodPage } from "@/components/accommodation/stay-food-page";
import { siteConfig } from "@/config/site";
import { JsonLd } from "@/lib/schema/json-ld";
import { breadcrumbSchema } from "@/lib/schema/site-schema";

const pageUrl = `${siteConfig.url}/accommodation-inclusions`;

const stayFoodSchema = {
  "@context": "https://schema.org",
  "@type": "WebPage",
  name: "Stay and Food at Shreevan Wellness",
  url: pageUrl,
  description:
    "Accommodation, sattvic food, room comfort, dietary clarity and international guest reassurance for Shreevan Wellness retreats in Rishikesh, India.",
  isPartOf: {
    "@type": "WebSite",
    name: siteConfig.name,
    url: siteConfig.url,
  },
  about: ["Accommodation", "Sattvic food", "Rishikesh retreat stay", "International guest comfort"],
};

export const metadata: Metadata = {
  title: "Stay & Food | Accommodation & Inclusions",
  description:
    "Explore Shreevan Wellness stay and food details: private room comfort, sattvic vegetarian meals, dietary clarity, inclusions and international guest reassurance in Rishikesh.",
  alternates: {
    canonical: "/accommodation-inclusions",
  },
};

export default function Page() {
  return (
    <>
      <JsonLd
        data={breadcrumbSchema([
          { name: "Home", url: siteConfig.url },
          { name: "Stay & Food", url: pageUrl },
        ])}
      />
      <JsonLd data={stayFoodSchema} />
      <StayFoodPage />
    </>
  );
}
