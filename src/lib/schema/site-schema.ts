import { siteConfig } from "@/config/site";
import type { PublicSiteSettings } from "@/lib/site/public-settings-types";

type SchemaValue = string | number | boolean | null | SchemaObject | SchemaValue[];

type SchemaObject = {
  [key: string]: SchemaValue;
};

function normalizeOrigin(origin?: string) {
  return (origin || siteConfig.url).replace(/\/+$/, "");
}

export function absoluteUrl(pathOrUrl: string, origin?: string) {
  if (/^https?:\/\//i.test(pathOrUrl)) {
    return pathOrUrl;
  }

  const siteOrigin = normalizeOrigin(origin);
  const path = pathOrUrl.startsWith("/") ? pathOrUrl : `/${pathOrUrl}`;

  return `${siteOrigin}${path}`;
}

function organizationId(origin?: string) {
  return `${normalizeOrigin(origin)}/#organization`;
}

function websiteId(origin?: string) {
  return `${normalizeOrigin(origin)}/#website`;
}

function localBusinessId(origin?: string) {
  return `${normalizeOrigin(origin)}/#local-business`;
}

export function organizationSchema(settings?: PublicSiteSettings) {
  const siteOrigin = normalizeOrigin(settings?.brand.primaryDomain);
  const brandName = settings?.brand.name ?? siteConfig.name;

  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    "@id": organizationId(siteOrigin),
    name: brandName,
    url: siteOrigin,
    description: settings?.brand.description ?? siteConfig.description,
    logo: {
      "@type": "ImageObject",
      url: absoluteUrl(siteConfig.logos.primary, siteOrigin),
    },
    founder: {
      "@type": "Person",
      name: settings?.brand.founder ?? siteConfig.founder,
    },
    contactPoint: {
      "@type": "ContactPoint",
      contactType: "customer support",
      email: settings?.contact.email ?? siteConfig.email,
      availableLanguage: ["English", "Hindi"],
      areaServed: ["US", "CA", "GB", "IN"],
    },
    knowsAbout: [
      "Rishikesh wellness retreats",
      "Yoga therapy",
      "Guided meditation",
      "Sound healing",
      "Panchkarma education",
      "Sattvic living",
      "Responsible wellness travel",
    ],
  };
}

export function websiteSchema(settings?: PublicSiteSettings) {
  const siteOrigin = normalizeOrigin(settings?.brand.primaryDomain);

  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": websiteId(siteOrigin),
    name: settings?.brand.name ?? siteConfig.name,
    url: siteOrigin,
    description: settings?.brand.description ?? siteConfig.description,
    inLanguage: "en",
    publisher: {
      "@id": organizationId(siteOrigin),
    },
  };
}

export function localBusinessSchema(settings?: PublicSiteSettings) {
  const siteOrigin = normalizeOrigin(settings?.brand.primaryDomain);

  return {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    "@id": localBusinessId(siteOrigin),
    name: settings?.brand.name ?? siteConfig.name,
    url: siteOrigin,
    image: absoluteUrl(siteConfig.logos.logoOnForest, siteOrigin),
    description: settings?.brand.description ?? siteConfig.description,
    email: settings?.contact.email ?? siteConfig.email,
    parentOrganization: {
      "@id": organizationId(siteOrigin),
    },
    address: {
      "@type": "PostalAddress",
      addressLocality: "Rishikesh",
      addressRegion: "Uttarakhand",
      addressCountry: "IN",
    },
    areaServed: ["United States", "Canada", "United Kingdom", "India"],
    priceRange: "$$$",
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
      item: absoluteUrl(item.url),
    })),
  };
}

export function webPageSchema(page: {
  name: string;
  url: string;
  description: string;
  type?: "WebPage" | "AboutPage" | "ContactPage" | "CollectionPage";
  primaryImage?: string;
}) {
  const url = absoluteUrl(page.url);

  return {
    "@context": "https://schema.org",
    "@type": page.type ?? "WebPage",
    "@id": `${url}#webpage`,
    name: page.name,
    url,
    description: page.description,
    inLanguage: "en",
    isPartOf: {
      "@id": websiteId(),
    },
    publisher: {
      "@id": organizationId(),
    },
    ...(page.primaryImage
      ? {
          primaryImageOfPage: {
            "@type": "ImageObject",
            url: absoluteUrl(page.primaryImage),
          },
        }
      : {}),
  };
}

export function itemListSchema(params: {
  name: string;
  url: string;
  items: Array<{ name: string; url: string; description?: string }>;
}) {
  return {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: params.name,
    url: absoluteUrl(params.url),
    itemListElement: params.items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      item: {
        "@type": "WebPage",
        name: item.name,
        url: absoluteUrl(item.url),
        ...(item.description ? { description: item.description } : {}),
      },
    })),
  };
}

export function blogPostingSchema(article: {
  title: string;
  url: string;
  description: string;
  datePublished: string;
  category: string;
  tags: string[];
  audience: string;
}) {
  const pageUrl = absoluteUrl(article.url);

  return {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    "@id": `${pageUrl}#blogposting`,
    headline: article.title,
    description: article.description,
    url: pageUrl,
    datePublished: article.datePublished,
    dateModified: article.datePublished,
    inLanguage: "en",
    articleSection: article.category,
    keywords: article.tags.join(", "),
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": `${pageUrl}#webpage`,
    },
    author: {
      "@id": organizationId(),
    },
    publisher: {
      "@id": organizationId(),
    },
    audience: {
      "@type": "Audience",
      audienceType: article.audience,
    },
  };
}

export function programServiceSchema(program: {
  name: string;
  url: string;
  description: string;
  audienceType: string;
  serviceType?: string;
  offers?: {
    price: string;
    priceCurrency: string;
  };
}) {
  const pageUrl = absoluteUrl(program.url);

  return {
    "@context": "https://schema.org",
    "@type": "Service",
    "@id": `${pageUrl}#service`,
    name: program.name,
    serviceType: program.serviceType ?? "Wellness retreat program",
    provider: {
      "@id": organizationId(),
    },
    areaServed: ["United States", "Canada", "United Kingdom", "India"],
    url: pageUrl,
    description: program.description,
    audience: {
      "@type": "Audience",
      audienceType: program.audienceType,
    },
    termsOfService: absoluteUrl("/terms-conditions"),
    ...(program.offers
      ? {
          offers: {
            "@type": "Offer",
            price: program.offers.price,
            priceCurrency: program.offers.priceCurrency,
            availability: "https://schema.org/InStock",
            url: pageUrl,
          },
        }
      : {}),
  };
}

export function educationalServiceSchema(modality: {
  name: string;
  url: string;
  description: string;
  keywords: string[];
  relatedPrograms: Array<{ name: string; url: string }>;
}) {
  const pageUrl = absoluteUrl(modality.url);

  return {
    "@context": "https://schema.org",
    "@type": "Service",
    "@id": `${pageUrl}#service`,
    name: modality.name,
    serviceType: "Wellness education and guided retreat modality",
    provider: {
      "@id": organizationId(),
    },
    url: pageUrl,
    description: modality.description,
    areaServed: ["United States", "Canada", "United Kingdom", "India"],
    keywords: modality.keywords.join(", "),
    isRelatedTo: modality.relatedPrograms.map((program) => ({
      "@type": "Service",
      name: program.name,
      url: absoluteUrl(program.url),
    })),
  };
}

export function faqPageSchema(faqs: Array<{ question: string; answer: string }>) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: faq.answer,
      },
    })),
  };
}
