import { siteConfig } from "@/config/site";
import type { PublicSiteSettings } from "@/lib/site/public-settings-types";

export function organizationSchema(settings?: PublicSiteSettings) {
  const siteOrigin = settings?.brand.primaryDomain.replace(/\/+$/, "") || siteConfig.url;

  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: settings?.brand.name ?? siteConfig.name,
    url: siteOrigin,
    logo: `${siteOrigin}${siteConfig.logos.primary}`,
    founder: {
      "@type": "Person",
      name: settings?.brand.founder ?? siteConfig.founder,
    },
  };
}

export function localBusinessSchema(settings?: PublicSiteSettings) {
  const siteOrigin = settings?.brand.primaryDomain.replace(/\/+$/, "") || siteConfig.url;

  return {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    name: settings?.brand.name ?? siteConfig.name,
    url: siteOrigin,
    image: `${siteOrigin}${siteConfig.logos.primary}`,
    email: settings?.contact.email ?? siteConfig.email,
    address: {
      "@type": "PostalAddress",
      addressLocality: "Rishikesh",
      addressRegion: "Uttarakhand",
      addressCountry: "IN",
    },
  };
}

export function breadcrumbSchema(items: Array<{ name: string; url: string }>) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: item.url,
    })),
  };
}
