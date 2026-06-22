import "server-only";

import type { AdminFooterColumn, AdminNavLink } from "@/lib/admin/site-settings";
import { readAdminSiteSettings } from "@/lib/admin/site-settings";
import { defaultPublicSiteSettings } from "@/lib/site/public-settings-defaults";
import type { PublicFooterColumn, PublicNavLink, PublicSiteSettings } from "@/lib/site/public-settings-types";

function cleanText(value: string, fallback: string) {
  return value.trim() || fallback;
}

function publicLink(link: AdminNavLink): PublicNavLink | null {
  const label = link.label.trim();
  const href = link.href.trim();

  if (!link.enabled || !label || !href) {
    return null;
  }

  const children = link.children?.map(publicLink).filter((item): item is PublicNavLink => Boolean(item));

  return {
    id: link.id,
    label,
    href,
    ...(children?.length ? { children } : {}),
  };
}

function publicFooterColumn(column: AdminFooterColumn): PublicFooterColumn | null {
  if (!column.enabled || !column.title.trim()) {
    return null;
  }

  const links = column.links.map(publicLink).filter((item): item is PublicNavLink => Boolean(item));

  if (!links.length) {
    return null;
  }

  return {
    id: column.id,
    title: column.title.trim(),
    links,
  };
}

export function getPublicSiteOrigin(settings: PublicSiteSettings) {
  return settings.brand.primaryDomain.replace(/\/+$/, "") || defaultPublicSiteSettings.brand.primaryDomain;
}

export async function getPublicSiteSettings(): Promise<PublicSiteSettings> {
  const settings = await readAdminSiteSettings();
  const headerItems = settings.navigation.headerItems
    .map(publicLink)
    .filter((item): item is PublicNavLink => Boolean(item));
  const footerColumns = settings.navigation.footerColumns
    .map(publicFooterColumn)
    .filter((item): item is PublicFooterColumn => Boolean(item));

  return {
    brand: {
      name: cleanText(settings.brand.name, defaultPublicSiteSettings.brand.name),
      tagline: cleanText(settings.brand.tagline, defaultPublicSiteSettings.brand.tagline),
      founder: cleanText(settings.brand.founder, defaultPublicSiteSettings.brand.founder),
      location: cleanText(settings.brand.location, defaultPublicSiteSettings.brand.location),
      primaryDomain: cleanText(settings.brand.primaryDomain, defaultPublicSiteSettings.brand.primaryDomain),
      adminDomain: cleanText(settings.brand.adminDomain, defaultPublicSiteSettings.brand.adminDomain),
      description: cleanText(settings.brand.description, defaultPublicSiteSettings.brand.description),
    },
    contact: {
      email: cleanText(settings.contact.email, defaultPublicSiteSettings.contact.email),
      phone: settings.contact.phone.trim(),
      whatsapp: settings.contact.whatsapp.trim(),
      address: cleanText(settings.contact.address, defaultPublicSiteSettings.contact.address),
      responseTime: cleanText(settings.contact.responseTime, defaultPublicSiteSettings.contact.responseTime),
    },
    social: {
      instagram: settings.social.instagram.trim(),
      youtube: settings.social.youtube.trim(),
      linkedin: settings.social.linkedin.trim(),
      facebook: settings.social.facebook.trim(),
    },
    crm: {
      enabled: settings.crm.enabled && Boolean(settings.crm.scriptUrl.trim()),
      scriptUrl: settings.crm.scriptUrl.trim(),
      apiUrl: settings.crm.apiUrl.trim(),
    },
    launch: settings.launch,
    navigation: {
      headerCta: publicLink(settings.navigation.headerCta),
      headerItems,
      footerColumns,
    },
  };
}
