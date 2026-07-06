import { randomUUID } from "node:crypto";
import { getSupabaseAdminClient } from "@/lib/supabase/client";
import { CACHE_TAGS, revalidatePublicContent } from "@/lib/site/content-cache";

export type AdminSeoQaStatus = "ready" | "needs-review" | "blocked";
export type AdminLeadStatus = "new" | "reviewed" | "contacted" | "closed";
export type AdminLeadSource = "home-suitability" | "book-consultation" | "contact";
export type AdminSitemapFrequency = "always" | "hourly" | "daily" | "weekly" | "monthly" | "yearly" | "never";

export type AdminSeoRoute = {
  id: string;
  label: string;
  path: string;
  intent: "core" | "educational" | "commercial" | "transactional" | "legal";
  indexable: boolean;
  sitemapEnabled: boolean;
  priority: number;
  changeFrequency: AdminSitemapFrequency;
  focusKeyword: string;
  qaStatus: AdminSeoQaStatus;
  notes: string;
  lastReviewedAt: string;
};

export type AdminLeadRouting = {
  inboxEmail: string;
  leadOwner: string;
  responseSla: string;
  crmStage: string;
  whatsappEscalation: string;
  qualificationChecklist: string[];
};

export type AdminLead = {
  id: string;
  source: AdminLeadSource;
  status: AdminLeadStatus;
  name: string;
  email: string;
  phone: string;
  country: string;
  program: string;
  topic: string;
  message: string;
  goal: string;
  dates: string;
  season: string;
  health: string;
  consent: boolean;
  createdAt: string;
};

export type AdminSeoLeadsStore = {
  routes: AdminSeoRoute[];
  leadRouting: AdminLeadRouting;
  leads: AdminLead[];
  updatedAt: string;
};

export type AdminLeadInput = Partial<Omit<AdminLead, "id" | "status" | "createdAt">>;


export const defaultAdminSeoLeads: AdminSeoLeadsStore = {
  updatedAt: "2026-06-21T00:00:00.000Z",
  leadRouting: {
    inboxEmail: "hello@shreevanwellness.com",
    leadOwner: "Shreevan guest care",
    responseSla: "Reply within 24-48 hours",
    crmStage: "New suitability request",
    whatsappEscalation: "Escalate confirmed international travellers after email reply.",
    qualificationChecklist: [
      "Confirm program fit and preferred duration.",
      "Review travel dates, country, time zone and arrival comfort.",
      "Check stay, food and room expectations before payment.",
      "Keep wellness boundaries clear; do not provide medical advice.",
      "Send payment link only after fit, terms and booking context are clear.",
    ],
  },
  routes: [
    {
      id: "home",
      label: "Home",
      path: "/",
      intent: "core",
      indexable: true,
      sitemapEnabled: true,
      priority: 1,
      changeFrequency: "weekly",
      focusKeyword: "Rishikesh wellness retreats",
      qaStatus: "ready",
      notes: "Connected to managed homepage hero and program index.",
      lastReviewedAt: "2026-06-21",
    },
    {
      id: "about-founder",
      label: "Our Story",
      path: "/about-founder",
      intent: "core",
      indexable: true,
      sitemapEnabled: true,
      priority: 0.78,
      changeFrequency: "monthly",
      focusKeyword: "Shreevan Wellness founder",
      qaStatus: "needs-review",
      notes: "Founder proof and real credentials should be reviewed before launch.",
      lastReviewedAt: "2026-06-21",
    },
    {
      id: "accommodation-inclusions",
      label: "Stay & Food",
      path: "/accommodation-inclusions",
      intent: "core",
      indexable: true,
      sitemapEnabled: true,
      priority: 0.74,
      changeFrequency: "monthly",
      focusKeyword: "Rishikesh retreat accommodation and sattvic food",
      qaStatus: "needs-review",
      notes: "Replace placeholders with real room, food and stay details before launch.",
      lastReviewedAt: "2026-06-21",
    },
    {
      id: "book-consultation",
      label: "Book Consultation",
      path: "/book-consultation",
      intent: "transactional",
      indexable: true,
      sitemapEnabled: true,
      priority: 0.86,
      changeFrequency: "monthly",
      focusKeyword: "book wellness retreat consultation",
      qaStatus: "ready",
      notes: "Lead capture now stores local admin inbox entries.",
      lastReviewedAt: "2026-06-21",
    },
    {
      id: "programs",
      label: "Immersive Programs",
      path: "/programs",
      intent: "commercial",
      indexable: true,
      sitemapEnabled: true,
      priority: 0.8,
      changeFrequency: "monthly",
      focusKeyword: "wellness retreat programs Rishikesh",
      qaStatus: "ready",
      notes: "Parent program hub prevents breadcrumb links pointing to a missing route.",
      lastReviewedAt: "2026-06-26",
    },
    {
      id: "3-day-ganga-reset",
      label: "3-Day Ganga Sattva Reset",
      path: "/programs/3-day-ganga-reset",
      intent: "commercial",
      indexable: true,
      sitemapEnabled: true,
      priority: 0.82,
      changeFrequency: "monthly",
      focusKeyword: "3 day wellness retreat Rishikesh",
      qaStatus: "ready",
      notes: "Keep short-reset search intent distinct from longer transformation pages.",
      lastReviewedAt: "2026-06-21",
    },
    {
      id: "7-day-foundation",
      label: "7-Day Ganga Sattva Foundation",
      path: "/programs/7-day-foundation",
      intent: "commercial",
      indexable: true,
      sitemapEnabled: true,
      priority: 0.82,
      changeFrequency: "monthly",
      focusKeyword: "7 day yoga meditation retreat Rishikesh",
      qaStatus: "ready",
      notes: "Beginner foundation pathway.",
      lastReviewedAt: "2026-06-21",
    },
    {
      id: "14-day-transformation",
      label: "14-Day Ganga Sattva Transformation",
      path: "/programs/14-day-transformation",
      intent: "commercial",
      indexable: true,
      sitemapEnabled: true,
      priority: 0.82,
      changeFrequency: "monthly",
      focusKeyword: "14 day transformation retreat India",
      qaStatus: "ready",
      notes: "Avoid guaranteed transformation claims.",
      lastReviewedAt: "2026-06-21",
    },
    {
      id: "28-day-inner-awakening",
      label: "28-Day Sattva Ganga Inner Awakening",
      path: "/programs/28-day-inner-awakening",
      intent: "commercial",
      indexable: true,
      sitemapEnabled: true,
      priority: 0.84,
      changeFrequency: "monthly",
      focusKeyword: "28 day wellness retreat India",
      qaStatus: "ready",
      notes: "Signature program. Keep sitemap priority high.",
      lastReviewedAt: "2026-06-21",
    },
    {
      id: "60-day-rishi-residency",
      label: "60-Day Rishi Tantra Conscious Living Residency",
      path: "/programs/60-day-rishi-residency",
      intent: "commercial",
      indexable: true,
      sitemapEnabled: true,
      priority: 0.84,
      changeFrequency: "monthly",
      focusKeyword: "60 day yoga residency India",
      qaStatus: "ready",
      notes: "Advanced pathway. Suitability boundaries should stay visible.",
      lastReviewedAt: "2026-06-21",
    },
    {
      id: "modalities",
      label: "Core Modalities",
      path: "/modalities",
      intent: "educational",
      indexable: true,
      sitemapEnabled: true,
      priority: 0.74,
      changeFrequency: "monthly",
      focusKeyword: "wellness retreat modalities Rishikesh",
      qaStatus: "ready",
      notes: "Educational hub for modality search intent.",
      lastReviewedAt: "2026-06-26",
    },
    {
      id: "yoga-therapy",
      label: "Yoga Therapy & Medicine",
      path: "/modalities/yoga-therapy",
      intent: "educational",
      indexable: true,
      sitemapEnabled: true,
      priority: 0.68,
      changeFrequency: "monthly",
      focusKeyword: "yoga therapy retreat Rishikesh",
      qaStatus: "ready",
      notes: "Educational modality page linked from program pages.",
      lastReviewedAt: "2026-06-26",
    },
    {
      id: "guided-meditation",
      label: "Guided Meditation & Mind Mastery",
      path: "/modalities/guided-meditation",
      intent: "educational",
      indexable: true,
      sitemapEnabled: true,
      priority: 0.68,
      changeFrequency: "monthly",
      focusKeyword: "guided meditation retreat Rishikesh",
      qaStatus: "ready",
      notes: "Educational modality page linked from program and journal pages.",
      lastReviewedAt: "2026-06-26",
    },
    {
      id: "sound-healing",
      label: "Sound Healing & Vibrational Therapy",
      path: "/modalities/sound-healing",
      intent: "educational",
      indexable: true,
      sitemapEnabled: true,
      priority: 0.66,
      changeFrequency: "monthly",
      focusKeyword: "sound healing retreat Rishikesh",
      qaStatus: "ready",
      notes: "Educational modality page linked from program and journal pages.",
      lastReviewedAt: "2026-06-26",
    },
    {
      id: "panchkarma-detox",
      label: "Panchkarma & Deep Detox",
      path: "/modalities/panchkarma-detox",
      intent: "educational",
      indexable: true,
      sitemapEnabled: true,
      priority: 0.66,
      changeFrequency: "monthly",
      focusKeyword: "Panchkarma detox retreat India",
      qaStatus: "ready",
      notes: "Educational modality page with strict responsible-detox boundaries.",
      lastReviewedAt: "2026-06-26",
    },
    {
      id: "chakra-opening",
      label: "Chakra Opening & Energy Balancing",
      path: "/modalities/chakra-opening",
      intent: "educational",
      indexable: true,
      sitemapEnabled: true,
      priority: 0.64,
      changeFrequency: "monthly",
      focusKeyword: "chakra opening retreat India",
      qaStatus: "ready",
      notes: "Educational modality page with non-clinical spiritual language.",
      lastReviewedAt: "2026-06-26",
    },
    {
      id: "spiritual-sadhanas",
      label: "Spiritual Sadhanas & Yogic Philosophy",
      path: "/modalities/spiritual-sadhanas",
      intent: "educational",
      indexable: true,
      sitemapEnabled: true,
      priority: 0.66,
      changeFrequency: "monthly",
      focusKeyword: "spiritual sadhana retreat Rishikesh",
      qaStatus: "ready",
      notes: "Educational modality page for yogic philosophy and practice discipline.",
      lastReviewedAt: "2026-06-26",
    },
    {
      id: "testimonials",
      label: "Healing Stories",
      path: "/testimonials",
      intent: "core",
      indexable: true,
      sitemapEnabled: true,
      priority: 0.7,
      changeFrequency: "monthly",
      focusKeyword: "wellness retreat guest stories",
      qaStatus: "needs-review",
      notes: "Publish only consent-approved stories and media.",
      lastReviewedAt: "2026-06-21",
    },
    {
      id: "journal",
      label: "Journal",
      path: "/journal",
      intent: "core",
      indexable: true,
      sitemapEnabled: true,
      priority: 0.72,
      changeFrequency: "weekly",
      focusKeyword: "wellness retreat resources",
      qaStatus: "needs-review",
      notes: "Article seeds are managed in Content & Trust.",
      lastReviewedAt: "2026-06-21",
    },
    {
      id: "faqs",
      label: "FAQs",
      path: "/faqs",
      intent: "core",
      indexable: true,
      sitemapEnabled: true,
      priority: 0.7,
      changeFrequency: "monthly",
      focusKeyword: "Rishikesh retreat FAQ",
      qaStatus: "ready",
      notes: "FAQ schema now uses managed FAQ content.",
      lastReviewedAt: "2026-06-21",
    },
    {
      id: "contact",
      label: "Contact",
      path: "/contact",
      intent: "core",
      indexable: true,
      sitemapEnabled: true,
      priority: 0.72,
      changeFrequency: "monthly",
      focusKeyword: "contact Shreevan Wellness Rishikesh",
      qaStatus: "ready",
      notes: "Contact form now stores local admin inbox entries.",
      lastReviewedAt: "2026-06-21",
    },
    {
      id: "privacy-policy",
      label: "Privacy Policy",
      path: "/privacy-policy",
      intent: "legal",
      indexable: true,
      sitemapEnabled: true,
      priority: 0.38,
      changeFrequency: "yearly",
      focusKeyword: "privacy policy",
      qaStatus: "needs-review",
      notes: "Legal review required before accepting bookings.",
      lastReviewedAt: "2026-06-21",
    },
    {
      id: "terms-conditions",
      label: "Terms & Conditions",
      path: "/terms-conditions",
      intent: "legal",
      indexable: true,
      sitemapEnabled: true,
      priority: 0.38,
      changeFrequency: "yearly",
      focusKeyword: "terms and conditions",
      qaStatus: "needs-review",
      notes: "Legal review required before accepting bookings.",
      lastReviewedAt: "2026-06-21",
    },
    {
      id: "refund-policy",
      label: "Refund Policy",
      path: "/refund-policy",
      intent: "legal",
      indexable: true,
      sitemapEnabled: true,
      priority: 0.38,
      changeFrequency: "yearly",
      focusKeyword: "retreat refund policy",
      qaStatus: "needs-review",
      notes: "Confirm final refund terms before launch.",
      lastReviewedAt: "2026-06-21",
    },
    {
      id: "wellness-disclaimer",
      label: "Wellness Disclaimer",
      path: "/wellness-disclaimer",
      intent: "legal",
      indexable: true,
      sitemapEnabled: true,
      priority: 0.38,
      changeFrequency: "yearly",
      focusKeyword: "wellness disclaimer",
      qaStatus: "needs-review",
      notes: "Important responsible-wellness boundary page.",
      lastReviewedAt: "2026-06-21",
    },
    {
      id: "payment",
      label: "Payment",
      path: "/payment",
      intent: "transactional",
      indexable: false,
      sitemapEnabled: false,
      priority: 0.2,
      changeFrequency: "never",
      focusKeyword: "approved retreat payment",
      qaStatus: "blocked",
      notes: "Keep noindex and out of sitemap until secure checkout is final.",
      lastReviewedAt: "2026-06-21",
    },
  ],
  leads: [],
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

function numberValue(value: unknown, fallback: number) {
  const number = typeof value === "number" ? value : Number(value);

  return Number.isFinite(number) ? number : fallback;
}

function statusValue(value: unknown, fallback: AdminLeadStatus): AdminLeadStatus {
  return value === "new" || value === "reviewed" || value === "contacted" || value === "closed" ? value : fallback;
}

function sourceValue(value: unknown, fallback: AdminLeadSource): AdminLeadSource {
  return value === "home-suitability" || value === "book-consultation" || value === "contact" ? value : fallback;
}

function qaStatusValue(value: unknown, fallback: AdminSeoQaStatus): AdminSeoQaStatus {
  return value === "ready" || value === "needs-review" || value === "blocked" ? value : fallback;
}

function frequencyValue(value: unknown, fallback: AdminSitemapFrequency): AdminSitemapFrequency {
  return value === "always" ||
    value === "hourly" ||
    value === "daily" ||
    value === "weekly" ||
    value === "monthly" ||
    value === "yearly" ||
    value === "never"
    ? value
    : fallback;
}

function intentValue(value: unknown, fallback: AdminSeoRoute["intent"]): AdminSeoRoute["intent"] {
  return value === "core" ||
    value === "educational" ||
    value === "commercial" ||
    value === "transactional" ||
    value === "legal"
    ? value
    : fallback;
}

function stringArrayValue(value: unknown, fallback: string[]) {
  if (!Array.isArray(value)) {
    return fallback;
  }

  return value.filter((item): item is string => typeof item === "string").map((item) => item.trim()).filter(Boolean);
}

function normalizeRoute(value: unknown, fallback: AdminSeoRoute): AdminSeoRoute {
  const input = isRecord(value) ? value : {};

  return {
    id: stringValue(input.id, fallback.id),
    label: stringValue(input.label, fallback.label),
    path: stringValue(input.path, fallback.path),
    intent: intentValue(input.intent, fallback.intent),
    indexable: booleanValue(input.indexable, fallback.indexable),
    sitemapEnabled: booleanValue(input.sitemapEnabled, fallback.sitemapEnabled),
    priority: Math.min(1, Math.max(0, numberValue(input.priority, fallback.priority))),
    changeFrequency: frequencyValue(input.changeFrequency, fallback.changeFrequency),
    focusKeyword: stringValue(input.focusKeyword, fallback.focusKeyword),
    qaStatus: qaStatusValue(input.qaStatus, fallback.qaStatus),
    notes: stringValue(input.notes, fallback.notes),
    lastReviewedAt: stringValue(input.lastReviewedAt, fallback.lastReviewedAt),
  };
}

function normalizeLeadRouting(value: unknown): AdminLeadRouting {
  const input = isRecord(value) ? value : {};

  return {
    inboxEmail: stringValue(input.inboxEmail, defaultAdminSeoLeads.leadRouting.inboxEmail),
    leadOwner: stringValue(input.leadOwner, defaultAdminSeoLeads.leadRouting.leadOwner),
    responseSla: stringValue(input.responseSla, defaultAdminSeoLeads.leadRouting.responseSla),
    crmStage: stringValue(input.crmStage, defaultAdminSeoLeads.leadRouting.crmStage),
    whatsappEscalation: stringValue(input.whatsappEscalation, defaultAdminSeoLeads.leadRouting.whatsappEscalation),
    qualificationChecklist: stringArrayValue(
      input.qualificationChecklist,
      defaultAdminSeoLeads.leadRouting.qualificationChecklist,
    ),
  };
}

function normalizeLead(value: unknown, fallback?: AdminLead): AdminLead {
  const input = isRecord(value) ? value : {};
  const source = sourceValue(input.source, fallback?.source ?? "home-suitability");

  return {
    id: stringValue(input.id, fallback?.id ?? randomUUID()),
    source,
    status: statusValue(input.status, fallback?.status ?? "new"),
    name: stringValue(input.name, fallback?.name ?? ""),
    email: stringValue(input.email, fallback?.email ?? ""),
    phone: stringValue(input.phone, fallback?.phone ?? ""),
    country: stringValue(input.country, fallback?.country ?? ""),
    program: stringValue(input.program, fallback?.program ?? ""),
    topic: stringValue(input.topic, fallback?.topic ?? ""),
    message: stringValue(input.message, fallback?.message ?? ""),
    goal: stringValue(input.goal, fallback?.goal ?? ""),
    dates: stringValue(input.dates, fallback?.dates ?? ""),
    season: stringValue(input.season, fallback?.season ?? ""),
    health: stringValue(input.health, fallback?.health ?? ""),
    consent: booleanValue(input.consent, fallback?.consent ?? false),
    createdAt: stringValue(input.createdAt, fallback?.createdAt ?? new Date().toISOString()),
  };
}

export function normalizeAdminSeoLeads(value: unknown): AdminSeoLeadsStore {
  const input = isRecord(value) ? value : {};
  const incomingRoutes = Array.isArray(input.routes) ? input.routes : [];
  const incomingById = new Map(
    incomingRoutes.filter(isRecord).map((route) => [typeof route.id === "string" ? route.id : "", route] as const),
  );
  const routes = defaultAdminSeoLeads.routes.map((route) => normalizeRoute(incomingById.get(route.id), route));

  return {
    routes,
    leadRouting: normalizeLeadRouting(input.leadRouting),
    leads: Array.isArray(input.leads) ? input.leads.filter(isRecord).map((lead) => normalizeLead(lead)) : [],
    updatedAt: stringValue(input.updatedAt, defaultAdminSeoLeads.updatedAt),
  };
}

function rowToSeoRoute(row: Record<string, unknown>): unknown {
  return {
    id: row.id,
    label: row.label,
    path: row.path,
    intent: row.intent,
    indexable: row.indexable,
    sitemapEnabled: row.sitemap_enabled,
    priority: row.priority,
    changeFrequency: row.change_frequency,
    focusKeyword: row.focus_keyword,
    qaStatus: row.qa_status,
    notes: row.notes,
    lastReviewedAt: row.last_reviewed_at,
  };
}

function rowToLead(row: Record<string, unknown>): unknown {
  return {
    id: row.id,
    source: row.source,
    status: row.status,
    name: row.name,
    email: row.email,
    phone: row.phone,
    country: row.country,
    program: row.program,
    topic: row.topic,
    message: row.message,
    goal: row.goal,
    dates: row.dates,
    season: row.season,
    health: row.health,
    consent: row.consent,
    createdAt: row.created_at,
  };
}

function leadRoutingToRow(routing: AdminLeadRouting, updatedAt: string) {
  return {
    id: "singleton",
    inbox_email: routing.inboxEmail,
    lead_owner: routing.leadOwner,
    response_sla: routing.responseSla,
    crm_stage: routing.crmStage,
    whatsapp_escalation: routing.whatsappEscalation,
    qualification_checklist: routing.qualificationChecklist,
    updated_at: updatedAt,
  };
}

export async function readAdminSeoLeads() {
  const client = getSupabaseAdminClient();

  const [routesRes, routingRes, leadsRes] = await Promise.all([
    client.from("seo_routes").select("*"),
    client.from("lead_routing").select("*").eq("id", "singleton").maybeSingle(),
    client.from("leads").select("*").order("created_at", { ascending: false }),
  ]);

  if (routesRes.error) {
    throw new Error(`readAdminSeoLeads routes: ${routesRes.error.message}`);
  }
  if (routingRes.error) {
    throw new Error(`readAdminSeoLeads routing: ${routingRes.error.message}`);
  }
  if (leadsRes.error) {
    throw new Error(`readAdminSeoLeads leads: ${leadsRes.error.message}`);
  }

  if (!routesRes.data?.length && !routingRes.data) {
    return defaultAdminSeoLeads;
  }

  const routing = routingRes.data;

  return normalizeAdminSeoLeads({
    routes: (routesRes.data ?? []).map(rowToSeoRoute),
    leadRouting: routing
      ? {
          inboxEmail: routing.inbox_email,
          leadOwner: routing.lead_owner,
          responseSla: routing.response_sla,
          crmStage: routing.crm_stage,
          whatsappEscalation: routing.whatsapp_escalation,
          qualificationChecklist: routing.qualification_checklist,
        }
      : undefined,
    leads: (leadsRes.data ?? []).map(rowToLead),
    updatedAt: routing?.updated_at ?? defaultAdminSeoLeads.updatedAt,
  });
}

export async function writeAdminSeoLeads(value: unknown) {
  const seoLeads = {
    ...normalizeAdminSeoLeads(value),
    updatedAt: new Date().toISOString(),
  };

  const client = getSupabaseAdminClient();

  const routeRows = seoLeads.routes.map((route) => ({
    id: route.id,
    label: route.label,
    path: route.path,
    intent: route.intent,
    indexable: route.indexable,
    sitemap_enabled: route.sitemapEnabled,
    priority: route.priority,
    change_frequency: route.changeFrequency,
    focus_keyword: route.focusKeyword,
    qa_status: route.qaStatus,
    notes: route.notes,
    last_reviewed_at: route.lastReviewedAt,
    updated_at: seoLeads.updatedAt,
  }));

  const { error: routesUpsertError } = await client.from("seo_routes").upsert(routeRows, { onConflict: "id" });

  if (routesUpsertError) {
    throw new Error(`seo_routes upsert failed: ${routesUpsertError.message}`);
  }

  const keepRouteIds = routeRows.map((row) => row.id);
  const { error: routesDeleteError } = await client
    .from("seo_routes")
    .delete()
    .not("id", "in", `(${keepRouteIds.join(",")})`);

  if (routesDeleteError) {
    throw new Error(`seo_routes cleanup failed: ${routesDeleteError.message}`);
  }

  const { error: routingError } = await client
    .from("lead_routing")
    .upsert(leadRoutingToRow(seoLeads.leadRouting, seoLeads.updatedAt), { onConflict: "id" });

  if (routingError) {
    throw new Error(`lead_routing upsert failed: ${routingError.message}`);
  }

  await revalidatePublicContent(CACHE_TAGS.seo);

  // Leads are append-only via appendAdminLead(); this writer intentionally
  // does NOT touch the leads table, so a routes/routing save from the SEO
  // panel can never drop captured leads.
  return seoLeads;
}

export async function appendAdminLead(value: AdminLeadInput) {
  const lead = normalizeLead({
    ...value,
    id: randomUUID(),
    status: "new",
    createdAt: new Date().toISOString(),
  });

  const client = getSupabaseAdminClient();
  const { error } = await client.from("leads").insert({
    id: lead.id,
    source: lead.source,
    status: lead.status,
    name: lead.name,
    email: lead.email,
    phone: lead.phone,
    country: lead.country,
    program: lead.program,
    topic: lead.topic,
    message: lead.message,
    goal: lead.goal,
    dates: lead.dates,
    season: lead.season,
    health: lead.health,
    consent: lead.consent,
    created_at: lead.createdAt,
  });

  if (error) {
    throw new Error(`appendAdminLead: ${error.message}`);
  }

  return lead;
}
