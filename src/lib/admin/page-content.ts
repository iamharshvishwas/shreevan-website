import { siteConfig } from "@/config/site";
import { getSupabaseAdminClient } from "@/lib/supabase/client";
import { CACHE_TAGS, revalidatePublicContent } from "@/lib/site/content-cache";

export type AdminPageStatus = "draft" | "published" | "archived";

export type AdminManagedPage = {
  id: string;
  title: string;
  path: string;
  template: "home" | "standard" | "legal" | "commerce";
  status: AdminPageStatus;
  connected: boolean;
  seo: {
    title: string;
    description: string;
    canonicalPath: string;
    noindex: boolean;
  };
  hero: {
    eyebrow: string;
    title: string;
    lede: string;
    primaryCtaLabel: string;
    primaryCtaHref: string;
    secondaryCtaLabel: string;
    secondaryCtaHref: string;
  };
  notes: string;
};

export type AdminPageContentStore = {
  pages: AdminManagedPage[];
  updatedAt: string;
};


export const defaultAdminPageContent: AdminPageContentStore = {
  updatedAt: "2026-06-21T00:00:00.000Z",
  pages: [
    {
      id: "home",
      title: "Home",
      path: "/",
      template: "home",
      status: "published",
      connected: true,
      seo: {
        title: `${siteConfig.name} | ${siteConfig.tagline}`,
        description: siteConfig.description,
        canonicalPath: "/",
        noindex: false,
      },
      hero: {
        eyebrow: "Premium wellness retreats in India",
        title: "Return to Your True Self",
        lede:
          "Structured retreat experiences for professionals, founders, serious practitioners and life-transition seekers who want space, rhythm and guided reconnection.",
        primaryCtaLabel: "Book a consultation",
        primaryCtaHref: "#consultation",
        secondaryCtaLabel: "Explore programs",
        secondaryCtaHref: "#programs",
      },
      notes: "Connected to the public homepage hero and metadata.",
    },
    {
      id: "about-founder",
      title: "Our Story",
      path: "/about-founder",
      template: "standard",
      status: "published",
      connected: false,
      seo: {
        title: `Our Story | ${siteConfig.name}`,
        description: "Founder story, philosophy and trust markers for Shreevan Wellness.",
        canonicalPath: "/about-founder",
        noindex: false,
      },
      hero: {
        eyebrow: "Founder story",
        title: "The story behind Shreevan Wellness",
        lede: "A human introduction to the person, practice and care standards behind the retreat experience.",
        primaryCtaLabel: "Book Consultation",
        primaryCtaHref: "/book-consultation",
        secondaryCtaLabel: "Explore Programs",
        secondaryCtaHref: "/#programs",
      },
      notes: "Seeded for Phase 3; public wiring comes after homepage validation.",
    },
    {
      id: "accommodation-inclusions",
      title: "Stay & Food",
      path: "/accommodation-inclusions",
      template: "standard",
      status: "published",
      connected: false,
      seo: {
        title: `Stay & Food | ${siteConfig.name}`,
        description: "Accommodation, meals, inclusions and practical retreat-life clarity for guests.",
        canonicalPath: "/accommodation-inclusions",
        noindex: false,
      },
      hero: {
        eyebrow: "Stay and food",
        title: "Know the place before you travel",
        lede: "Clear expectations for rooms, sattvic meals, daily comfort and practical guest support.",
        primaryCtaLabel: "Book Consultation",
        primaryCtaHref: "/book-consultation",
        secondaryCtaLabel: "Contact Us",
        secondaryCtaHref: "/contact",
      },
      notes: "Seeded for Phase 3; public wiring comes after homepage validation.",
    },
    {
      id: "contact",
      title: "Contact Us",
      path: "/contact",
      template: "standard",
      status: "published",
      connected: false,
      seo: {
        title: `Contact Us | ${siteConfig.name}`,
        description: "Contact Shreevan Wellness for retreat enquiries, travel questions and support.",
        canonicalPath: "/contact",
        noindex: false,
      },
      hero: {
        eyebrow: "Contact",
        title: "Start with a clear conversation",
        lede: "Use this page for retreat enquiries, travel questions, partnerships and guest support.",
        primaryCtaLabel: "Book Consultation",
        primaryCtaHref: "/book-consultation",
        secondaryCtaLabel: "Email Us",
        secondaryCtaHref: `mailto:${siteConfig.email}`,
      },
      notes: "Seeded for Phase 3; public wiring comes after homepage validation.",
    },
    {
      id: "faqs",
      title: "FAQs",
      path: "/faqs",
      template: "standard",
      status: "published",
      connected: false,
      seo: {
        title: `FAQs | ${siteConfig.name}`,
        description: "Answers for suitability, travel, stay, food, payment and wellness boundaries.",
        canonicalPath: "/faqs",
        noindex: false,
      },
      hero: {
        eyebrow: "FAQs",
        title: "Answers before you enquire",
        lede: "Practical clarity for international guests and responsible wellness decision-making.",
        primaryCtaLabel: "Book Consultation",
        primaryCtaHref: "/book-consultation",
        secondaryCtaLabel: "Contact Us",
        secondaryCtaHref: "/contact",
      },
      notes: "Seeded for Phase 3; public wiring comes after homepage validation.",
    },
    {
      id: "payment",
      title: "Payment",
      path: "/payment",
      template: "commerce",
      status: "draft",
      connected: false,
      seo: {
        title: `Payment | ${siteConfig.name}`,
        description: "Secure payment page for approved Shreevan Wellness bookings.",
        canonicalPath: "/payment",
        noindex: true,
      },
      hero: {
        eyebrow: "Approved booking",
        title: "Complete your booking securely",
        lede: "Payment is available after suitability review and booking approval.",
        primaryCtaLabel: "Contact Support",
        primaryCtaHref: "/contact",
        secondaryCtaLabel: "Read Terms",
        secondaryCtaHref: "/terms-conditions",
      },
      notes: "Keep noindex until the secure checkout flow is final.",
    },
  ],
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

function statusValue(value: unknown, fallback: AdminPageStatus): AdminPageStatus {
  return value === "draft" || value === "published" || value === "archived" ? value : fallback;
}

function templateValue(value: unknown, fallback: AdminManagedPage["template"]) {
  return value === "home" || value === "standard" || value === "legal" || value === "commerce"
    ? value
    : fallback;
}

function normalizePage(value: unknown, fallback: AdminManagedPage): AdminManagedPage {
  const input = isRecord(value) ? value : {};
  const seo = isRecord(input.seo) ? input.seo : {};
  const hero = isRecord(input.hero) ? input.hero : {};

  return {
    id: stringValue(input.id, fallback.id),
    title: stringValue(input.title, fallback.title),
    path: stringValue(input.path, fallback.path),
    template: templateValue(input.template, fallback.template),
    status: statusValue(input.status, fallback.status),
    connected: booleanValue(input.connected, fallback.connected),
    seo: {
      title: stringValue(seo.title, fallback.seo.title),
      description: stringValue(seo.description, fallback.seo.description),
      canonicalPath: stringValue(seo.canonicalPath, fallback.seo.canonicalPath),
      noindex: booleanValue(seo.noindex, fallback.seo.noindex),
    },
    hero: {
      eyebrow: stringValue(hero.eyebrow, fallback.hero.eyebrow),
      title: stringValue(hero.title, fallback.hero.title),
      lede: stringValue(hero.lede, fallback.hero.lede),
      primaryCtaLabel: stringValue(hero.primaryCtaLabel, fallback.hero.primaryCtaLabel),
      primaryCtaHref: stringValue(hero.primaryCtaHref, fallback.hero.primaryCtaHref),
      secondaryCtaLabel: stringValue(hero.secondaryCtaLabel, fallback.hero.secondaryCtaLabel),
      secondaryCtaHref: stringValue(hero.secondaryCtaHref, fallback.hero.secondaryCtaHref),
    },
    notes: stringValue(input.notes, fallback.notes),
  };
}

export function normalizeAdminPageContent(value: unknown): AdminPageContentStore {
  const input = isRecord(value) ? value : {};
  const incomingPages = Array.isArray(input.pages) ? input.pages : [];
  const incomingById = new Map(
    incomingPages
      .filter(isRecord)
      .map((page) => [typeof page.id === "string" ? page.id : "", page] as const),
  );

  const defaultPages = defaultAdminPageContent.pages.map((fallback) =>
    normalizePage(incomingById.get(fallback.id), fallback),
  );
  const defaultIds = new Set(defaultPages.map((page) => page.id));
  const customPages = incomingPages
    .filter(isRecord)
    .filter((page) => typeof page.id === "string" && page.id && !defaultIds.has(page.id))
    .map((page, index) =>
      normalizePage(page, {
        id: `custom-${index + 1}`,
        title: "Custom Page",
        path: "/",
        template: "standard",
        status: "draft",
        connected: false,
        seo: {
          title: "",
          description: "",
          canonicalPath: "/",
          noindex: true,
        },
        hero: {
          eyebrow: "",
          title: "",
          lede: "",
          primaryCtaLabel: "",
          primaryCtaHref: "",
          secondaryCtaLabel: "",
          secondaryCtaHref: "",
        },
        notes: "",
      }),
    );

  return {
    pages: [...defaultPages, ...customPages],
    updatedAt: stringValue(input.updatedAt, defaultAdminPageContent.updatedAt),
  };
}

function rowToManagedPage(row: Record<string, unknown>): unknown {
  return {
    id: row.id,
    title: row.title,
    path: row.path,
    template: row.template,
    status: row.status,
    connected: row.connected,
    seo: row.seo,
    hero: row.hero,
    notes: row.notes,
  };
}

export async function readAdminPageContent() {
  const client = getSupabaseAdminClient();
  const { data, error } = await client.from("managed_pages").select("*");

  if (error) {
    throw new Error(`readAdminPageContent: ${error.message}`);
  }

  if (!data?.length) {
    return defaultAdminPageContent;
  }

  return normalizeAdminPageContent({
    pages: data.map(rowToManagedPage),
    updatedAt: data.reduce(
      (latest, row) => (typeof row.updated_at === "string" && row.updated_at > latest ? row.updated_at : latest),
      "",
    ),
  });
}

export async function writeAdminPageContent(value: unknown) {
  const pageContent = {
    ...normalizeAdminPageContent(value),
    updatedAt: new Date().toISOString(),
  };

  const client = getSupabaseAdminClient();
  const rows = pageContent.pages.map((page) => ({
    id: page.id,
    title: page.title,
    path: page.path,
    template: page.template,
    status: page.status,
    connected: page.connected,
    seo: page.seo,
    hero: page.hero,
    notes: page.notes,
    updated_at: pageContent.updatedAt,
  }));

  const { error: upsertError } = await client.from("managed_pages").upsert(rows, { onConflict: "id" });

  if (upsertError) {
    throw new Error(`managed_pages upsert failed: ${upsertError.message}`);
  }

  const keepIds = rows.map((row) => row.id);
  const { error: deleteError } = await client
    .from("managed_pages")
    .delete()
    .not("id", "in", `(${keepIds.join(",")})`);

  if (deleteError) {
    throw new Error(`managed_pages cleanup failed: ${deleteError.message}`);
  }

  await revalidatePublicContent(CACHE_TAGS.pages);

  return pageContent;
}
