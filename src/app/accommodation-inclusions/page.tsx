import type { Metadata } from "next";
import { StayFoodPage } from "@/components/accommodation/stay-food-page";
import { siteConfig } from "@/config/site";
import { JsonLd } from "@/lib/schema/json-ld";
import { breadcrumbSchema, webPageSchema } from "@/lib/schema/site-schema";
import { buildPageMetadata } from "@/lib/seo/page-metadata";

const pageUrl = `${siteConfig.url}/accommodation-inclusions`;

const stayFoodSchema = webPageSchema({
  name: "Stay and Food at Shreevan Wellness",
  url: pageUrl,
  description:
    "Accommodation, sattvic food, room comfort, dietary clarity and international guest reassurance for Shreevan Wellness retreats in Rishikesh, India.",
});

export const metadata: Metadata = buildPageMetadata({
  title: "Stay & Food | Accommodation & Inclusions",
  description:
    "Explore Shreevan Wellness stay and food details: private room comfort, sattvic vegetarian meals, dietary clarity, inclusions and international guest reassurance in Rishikesh.",
  path: "/accommodation-inclusions",
});

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
