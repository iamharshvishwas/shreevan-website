import { mkdir, readFile, writeFile } from "node:fs/promises";
import { dirname, join } from "node:path";
import { coreRoutes, modalityRoutes, programRoutes, utilityRoutes } from "@/config/routes";
import { siteConfig } from "@/config/site";

export type AdminNavLink = {
  id: string;
  label: string;
  href: string;
  enabled: boolean;
  children?: AdminNavLink[];
};

export type AdminFooterColumn = {
  id: string;
  title: string;
  enabled: boolean;
  links: AdminNavLink[];
};

export type AdminSiteSettings = {
  brand: {
    name: string;
    tagline: string;
    founder: string;
    location: string;
    primaryDomain: string;
    adminDomain: string;
    description: string;
  };
  contact: {
    email: string;
    phone: string;
    whatsapp: string;
    address: string;
    responseTime: string;
  };
  social: {
    instagram: string;
    youtube: string;
    linkedin: string;
    facebook: string;
  };
  crm: {
    enabled: boolean;
    scriptUrl: string;
    apiUrl: string;
  };
  launch: {
    indexingMode: "noindex" | "indexable";
    robotsPolicy: "blocked" | "public";
    sitemapEnabled: boolean;
  };
  navigation: {
    headerCta: AdminNavLink;
    headerItems: AdminNavLink[];
    footerColumns: AdminFooterColumn[];
  };
  updatedAt: string;
};

const SETTINGS_PATH = join(process.cwd(), "data", "admin", "site-settings.json");

function routeToNavLink(route: { href: string; label: string }): AdminNavLink {
  return {
    id: route.href.replace(/[^a-z0-9]+/gi, "-").replace(/(^-|-$)/g, "") || "home",
    label: route.label,
    href: route.href,
    enabled: true,
  };
}

export const defaultAdminSiteSettings: AdminSiteSettings = {
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
      enabled: true,
    },
    headerItems: [
      routeToNavLink(coreRoutes[0]),
      { id: "our-story", label: "Our Story", href: "/about-founder", enabled: true },
      {
        id: "modalities",
        label: "Core Modalities",
        href: "/modalities",
        enabled: true,
        children: modalityRoutes.map(routeToNavLink),
      },
      {
        id: "programs",
        label: "Immersive Programs",
        href: "/programs",
        enabled: true,
        children: programRoutes.map(routeToNavLink),
      },
      { id: "healing-stories", label: "Healing Stories", href: "/testimonials", enabled: true },
      { id: "stay-food", label: "Stay & Food", href: "/accommodation-inclusions", enabled: true },
      { id: "journal", label: "Journal", href: "/journal", enabled: true },
      { id: "contact", label: "Contact Us", href: "/contact", enabled: true },
    ],
    footerColumns: [
      {
        id: "core",
        title: "Core Pages",
        enabled: true,
        links: coreRoutes.filter((route) => route.href !== "/").map(routeToNavLink),
      },
      {
        id: "programs",
        title: "Programs",
        enabled: true,
        links: programRoutes.map(routeToNavLink),
      },
      {
        id: "modalities",
        title: "Modalities",
        enabled: true,
        links: modalityRoutes.map(routeToNavLink),
      },
      {
        id: "conversion",
        title: "Conversion",
        enabled: true,
        links: utilityRoutes.filter((route) => route.intent === "transactional").map(routeToNavLink),
      },
      {
        id: "legal",
        title: "Legal",
        enabled: true,
        links: utilityRoutes.filter((route) => route.intent === "legal").map(routeToNavLink),
      },
    ],
  },
  updatedAt: "2026-06-21T00:00:00.000Z",
};

function isRecord(value: unknown): value is Record<string, unknown> {
  return Boolean(value && typeof value === "object" && !Array.isArray(value));
}

function stringValue(value: unknown, fallback: string) {
  return typeof value === "string" ? value : fallback;
}

function booleanValue(value: unknown, fallback: boolean) {
  return typeof value === "boolean" ? value : fallback;
}

function normalizeLink(value: unknown, fallback: AdminNavLink): AdminNavLink {
  const input = isRecord(value) ? value : {};

  return {
    id: stringValue(input.id, fallback.id),
    label: stringValue(input.label, fallback.label),
    href: stringValue(input.href, fallback.href),
    enabled: booleanValue(input.enabled, fallback.enabled),
    children: fallback.children
      ? normalizeLinks(input.children, fallback.children)
      : Array.isArray(input.children)
        ? input.children.map((child, index) =>
            normalizeLink(child, {
              id: `child-${index + 1}`,
              label: "",
              href: "",
              enabled: true,
            }),
          )
        : undefined,
  };
}

function normalizeLinks(value: unknown, fallback: AdminNavLink[]) {
  const input = Array.isArray(value) ? value : [];
  const source = input.length ? input : fallback;

  return source.map((item, index) => normalizeLink(item, fallback[index] ?? source[index]));
}

function normalizeFooterColumns(value: unknown, fallback: AdminFooterColumn[]) {
  const input = Array.isArray(value) ? value : [];
  const source = input.length ? input : fallback;

  return source.map((column, index) => {
    const inputColumn = isRecord(column) ? column : {};
    const fallbackColumn = fallback[index] ?? {
      id: `footer-${index + 1}`,
      title: "",
      enabled: true,
      links: [],
    };

    return {
      id: stringValue(inputColumn.id, fallbackColumn.id),
      title: stringValue(inputColumn.title, fallbackColumn.title),
      enabled: booleanValue(inputColumn.enabled, fallbackColumn.enabled),
      links: normalizeLinks(inputColumn.links, fallbackColumn.links),
    };
  });
}

export function normalizeAdminSiteSettings(value: unknown): AdminSiteSettings {
  const input = isRecord(value) ? value : {};
  const brand = isRecord(input.brand) ? input.brand : {};
  const contact = isRecord(input.contact) ? input.contact : {};
  const social = isRecord(input.social) ? input.social : {};
  const crm = isRecord(input.crm) ? input.crm : {};
  const launch = isRecord(input.launch) ? input.launch : {};
  const navigation = isRecord(input.navigation) ? input.navigation : {};
  const indexingMode = launch.indexingMode === "indexable" ? "indexable" : "noindex";
  const robotsPolicy = launch.robotsPolicy === "public" ? "public" : "blocked";

  return {
    brand: {
      name: stringValue(brand.name, defaultAdminSiteSettings.brand.name),
      tagline: stringValue(brand.tagline, defaultAdminSiteSettings.brand.tagline),
      founder: stringValue(brand.founder, defaultAdminSiteSettings.brand.founder),
      location: stringValue(brand.location, defaultAdminSiteSettings.brand.location),
      primaryDomain: stringValue(brand.primaryDomain, defaultAdminSiteSettings.brand.primaryDomain),
      adminDomain: stringValue(brand.adminDomain, defaultAdminSiteSettings.brand.adminDomain),
      description: stringValue(brand.description, defaultAdminSiteSettings.brand.description),
    },
    contact: {
      email: stringValue(contact.email, defaultAdminSiteSettings.contact.email),
      phone: stringValue(contact.phone, defaultAdminSiteSettings.contact.phone),
      whatsapp: stringValue(contact.whatsapp, defaultAdminSiteSettings.contact.whatsapp),
      address: stringValue(contact.address, defaultAdminSiteSettings.contact.address),
      responseTime: stringValue(contact.responseTime, defaultAdminSiteSettings.contact.responseTime),
    },
    social: {
      instagram: stringValue(social.instagram, defaultAdminSiteSettings.social.instagram),
      youtube: stringValue(social.youtube, defaultAdminSiteSettings.social.youtube),
      linkedin: stringValue(social.linkedin, defaultAdminSiteSettings.social.linkedin),
      facebook: stringValue(social.facebook, defaultAdminSiteSettings.social.facebook),
    },
    crm: {
      enabled: booleanValue(crm.enabled, defaultAdminSiteSettings.crm.enabled),
      scriptUrl: stringValue(crm.scriptUrl, defaultAdminSiteSettings.crm.scriptUrl),
      apiUrl: stringValue(crm.apiUrl, defaultAdminSiteSettings.crm.apiUrl),
    },
    launch: {
      indexingMode,
      robotsPolicy,
      sitemapEnabled: booleanValue(launch.sitemapEnabled, defaultAdminSiteSettings.launch.sitemapEnabled),
    },
    navigation: {
      headerCta: normalizeLink(navigation.headerCta, defaultAdminSiteSettings.navigation.headerCta),
      headerItems: normalizeLinks(navigation.headerItems, defaultAdminSiteSettings.navigation.headerItems),
      footerColumns: normalizeFooterColumns(
        navigation.footerColumns,
        defaultAdminSiteSettings.navigation.footerColumns,
      ),
    },
    updatedAt: stringValue(input.updatedAt, defaultAdminSiteSettings.updatedAt),
  };
}

export async function readAdminSiteSettings() {
  try {
    const file = await readFile(SETTINGS_PATH, "utf8");

    return normalizeAdminSiteSettings(JSON.parse(file));
  } catch (error) {
    if (isRecord(error) && error.code === "ENOENT") {
      return defaultAdminSiteSettings;
    }

    throw error;
  }
}

export async function writeAdminSiteSettings(value: unknown) {
  const settings = {
    ...normalizeAdminSiteSettings(value),
    updatedAt: new Date().toISOString(),
  };

  await mkdir(dirname(SETTINGS_PATH), { recursive: true });
  await writeFile(SETTINGS_PATH, `${JSON.stringify(settings, null, 2)}\n`, "utf8");

  return settings;
}
