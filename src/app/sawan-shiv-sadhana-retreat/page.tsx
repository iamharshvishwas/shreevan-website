import type { Metadata } from "next";
import Script from "next/script";
import { SawanShivSadhanaPage, sawanRetreatFaqs } from "@/components/campaigns/sawan-shiv-sadhana-page";
import { siteConfig } from "@/config/site";
import { JsonLd } from "@/lib/schema/json-ld";
import { breadcrumbSchema, faqPageSchema, programServiceSchema, webPageSchema } from "@/lib/schema/site-schema";
import { absoluteSiteUrl, buildPageMetadata } from "@/lib/seo/page-metadata";

const pagePath = "/sawan-shiv-sadhana-retreat";
const pageTitle = "Sawan Special Shiv Sadhana Retreat in Rishikesh";
const pageDescription =
  "Join Shreevan Wellness' 3 nights / 4 days Sawan Special Shiv Sadhana Retreat in Rishikesh with Rudra Abhishek, Shri Rudram chanting, meditation, Ganga Aarti, sattvik meals and stay.";
const pageUrl = `${siteConfig.url}${pagePath}`;
const campaignImage = absoluteSiteUrl("/images/campaigns/sawan-shiv-sadhana-retreat-main.jpeg");

export const metadata: Metadata = buildPageMetadata({
  title: pageTitle,
  description: pageDescription,
  path: pagePath,
  image: {
    url: campaignImage,
    width: 828,
    height: 1280,
    alt: "Sawan Special Shiv Sadhana Retreat at Shreevan Wellness Rishikesh",
  },
});

export default function Page() {
  return (
    <>
      <Script id="sawan-view-content" strategy="afterInteractive">
        {`
          window.fbq && window.fbq('track', 'ViewContent', {
            content_name: 'Sawan Special Shiv Sadhana Retreat',
            content_category: 'seasonal_retreat',
            value: 21000,
            currency: 'INR'
          });
          window.dataLayer = window.dataLayer || [];
          window.dataLayer.push({
            event: 'sawan_view_content',
            campaign: 'sawan_shiv_sadhana_retreat'
          });
        `}
      </Script>
      <JsonLd
        data={breadcrumbSchema([
          { name: "Home", url: siteConfig.url },
          { name: "Sawan Shiv Sadhana Retreat", url: pageUrl },
        ])}
      />
      <JsonLd
        data={webPageSchema({
          name: pageTitle,
          url: pageUrl,
          description: pageDescription,
          primaryImage: "/images/campaigns/sawan-shiv-sadhana-retreat-main.jpeg",
        })}
      />
      <JsonLd
        data={programServiceSchema({
          name: pageTitle,
          url: pageUrl,
          description: pageDescription,
          audienceType: "Indian spiritual seekers, wellness travelers, NRIs and first-time devotional retreat guests",
          serviceType: "Seasonal spiritual wellness retreat",
          offers: {
            price: "21000",
            priceCurrency: "INR",
          },
        })}
      />
      <JsonLd data={faqPageSchema(sawanRetreatFaqs)} />
      <SawanShivSadhanaPage />
    </>
  );
}
