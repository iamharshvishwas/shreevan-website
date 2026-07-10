import type { Metadata } from "next";
import { ContactPage } from "@/components/contact/contact-page";
import { JsonLd } from "@/lib/schema/json-ld";
import { breadcrumbSchema, webPageSchema } from "@/lib/schema/site-schema";
import { siteConfig } from "@/config/site";
import { buildPageMetadata } from "@/lib/seo/page-metadata";
import { getPublicSiteSettings } from "@/lib/site/public-settings";

export const metadata: Metadata = buildPageMetadata({
  title: `Contact Us | ${siteConfig.name}`,
  description:
    "Contact Shreevan Wellness in Rishikesh, India for retreat enquiries, travel questions, consultation requests and international visitor support.",
  path: "/contact",
  absoluteTitle: true,
});

export default async function Page() {
  const settings = await getPublicSiteSettings();

  return (
    <>
      <JsonLd
        data={breadcrumbSchema([
          { name: "Home", url: siteConfig.url },
          { name: "Contact Us", url: `${siteConfig.url}/contact` },
        ])}
      />
      <JsonLd
        data={webPageSchema({
          type: "ContactPage",
          name: "Contact Shreevan Wellness",
          url: `${siteConfig.url}/contact`,
          description:
            "Contact Shreevan Wellness in Rishikesh, India for retreat enquiries, travel questions, consultation requests and international visitor support.",
        })}
      />
      <ContactPage settings={settings} />
    </>
  );
}
