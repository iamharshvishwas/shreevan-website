import { coreRoutes, modalityRoutes, programRoutes, utilityRoutes } from "@/config/routes";
import { siteConfig } from "@/config/site";
import type { PublicFooterColumn, PublicNavLink, PublicSiteSettings } from "@/lib/site/public-settings-types";

function routeToPublicNavLink(route: { href: string; label: string }): PublicNavLink {
  return {
    id: route.href.replace(/[^a-z0-9]+/gi, "-").replace(/(^-|-$)/g, "") || "home",
    label: route.label,
    href: route.href,
  };
}

function footerColumn(id: string, title: string, routes: Array<{ href: string; label: string }>): PublicFooterColumn {
  return {
    id,
    title,
    links: routes.map(routeToPublicNavLink),
  };
}

export const defaultPublicSiteSettings: PublicSiteSettings = {
  brand: {
    name: siteConfig.name,
    tagline: siteConfig.tagline,
    founder: siteConfig.founder,
    location: siteConfig.location,
    primaryDomain: siteConfig.url,
    adminDomain: "https://admin.shreevanwellness.com",
    description: siteConfig.description,
  },
  contact: {
    email: siteConfig.email,
    phone: "",
    whatsapp: "",
    address: "Rishikesh, Uttarakhand, India",
    responseTime: "Within 24-48 hours",
  },
  social: {
    instagram: "",
    youtube: "",
    linkedin: "",
    facebook: "",
  },
  crm: {
    enabled: true,
    scriptUrl: "https://crm.shreevanwellness.com/veda-widget.js",
    apiUrl: "https://api.shreevanwellness.com/api/v1",
  },
  launch: {
    indexingMode: "indexable",
    robotsPolicy: "public",
    sitemapEnabled: true,
  },
  navigation: {
    headerCta: {
      id: "book-consultation",
      label: "Book Consultation",
      href: "/book-consultation",
    },
    headerItems: [
      routeToPublicNavLink(coreRoutes[0]),
      { id: "our-story", label: "Our Story", href: "/about-founder" },
      {
        id: "modalities",
        label: "Core Modalities",
        href: "/modalities",
        children: modalityRoutes.map(routeToPublicNavLink),
      },
      {
        id: "programs",
        label: "Immersive Programs",
        href: "/programs",
        children: programRoutes.map(routeToPublicNavLink),
      },
      { id: "healing-stories", label: "Healing Stories", href: "/testimonials" },
      { id: "stay-food", label: "Stay & Food", href: "/accommodation-inclusions" },
      { id: "journal", label: "Journal", href: "/journal" },
      { id: "contact", label: "Contact Us", href: "/contact" },
    ],
    footerColumns: [
      footerColumn(
        "core",
        "Core Pages",
        coreRoutes.filter((route) => route.href !== "/"),
      ),
      footerColumn("programs", "Programs", programRoutes),
      footerColumn("modalities", "Modalities", modalityRoutes),
      footerColumn(
        "conversion",
        "Conversion",
        utilityRoutes.filter((route) => route.intent === "transactional"),
      ),
      footerColumn(
        "legal",
        "Legal",
        utilityRoutes.filter((route) => route.intent === "legal"),
      ),
    ],
  },
};
