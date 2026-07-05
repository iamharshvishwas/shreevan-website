// One-time import: data/admin/*.json -> Supabase tables (full-site scope).
// Run once after 0001_content_trust_core.sql AND 0002_full_site_modules.sql
// have both been applied:
//   npm run migrate:content-trust
// Idempotent (upserts) — safe to re-run if it fails partway.

import "dotenv/config";
import { readFile } from "node:fs/promises";
import { join } from "node:path";
import { createClient, type SupabaseClient } from "@supabase/supabase-js";
import { normalizeAdminContentTrust } from "../src/lib/admin/content-trust";
import { normalizeAdminSiteSettings } from "../src/lib/admin/site-settings";
import { normalizeAdminHomeContent } from "../src/lib/admin/home-content";
import { normalizeAdminPageContent } from "../src/lib/admin/page-content";
import { normalizeAdminProgramContent } from "../src/lib/admin/program-content";
import { normalizeAdminSeoLeads } from "../src/lib/admin/seo-leads";

const DATA_DIR = join(process.cwd(), "data", "admin");
const CONTENT_TRUST_JSON_PATH = join(DATA_DIR, "content-trust.json");
const SITE_SETTINGS_JSON_PATH = join(DATA_DIR, "site-settings.json");
const HOME_CONTENT_JSON_PATH = join(DATA_DIR, "home-content.json");
const PAGE_CONTENT_JSON_PATH = join(DATA_DIR, "page-content.json");
const PROGRAM_CONTENT_JSON_PATH = join(DATA_DIR, "program-content.json");
const SEO_LEADS_JSON_PATH = join(DATA_DIR, "seo-leads.json");

async function readJson(path: string) {
  try {
    return JSON.parse(await readFile(path, "utf8"));
  } catch (error) {
    if (error && typeof error === "object" && "code" in error && error.code === "ENOENT") {
      return {};
    }

    throw error;
  }
}

async function upsertAndVerify(
  client: SupabaseClient,
  table: string,
  rows: Record<string, unknown>[],
  onConflict: string,
) {
  if (!rows.length) {
    console.log(`${table}: nothing to import.`);
    return;
  }

  const { error, count } = await client.from(table).upsert(rows, { onConflict, count: "exact" });

  if (error) {
    throw new Error(`${table} upsert failed: ${error.message}`);
  }

  if (count !== rows.length) {
    throw new Error(`${table} row-count mismatch: expected ${rows.length}, upserted ${count}`);
  }

  console.log(`${table}: upserted ${count} rows.`);
}

const LIST_KEYS = [
  "responsibleStandards",
  "storyTrustMarkers",
  "outcomeRows",
  "videoSlots",
  "faqResearchSignals",
  "consentStandards",
  "journalCategories",
] as const;

function requireEnv(name: string) {
  const value = process.env[name];

  if (!value) {
    throw new Error(`Missing required env var: ${name}`);
  }

  return value;
}

async function migrateContentTrust(client: SupabaseClient) {
  const store = normalizeAdminContentTrust(await readJson(CONTENT_TRUST_JSON_PATH));

  console.log(
    `content-trust.json: ${store.journalArticles.length} journal articles, ${store.faqCategories.length} FAQ categories, ${store.storySlots.length} story slots, ${store.mediaItems.length} media items.`,
  );

  await upsertAndVerify(
    client,
    "journal_articles",
    store.journalArticles.map((article) => ({
      id: article.id,
      slug: article.slug || article.id,
      category: article.category,
      category_id: article.categoryId || "",
      title: article.title,
      excerpt: article.excerpt,
      date_label: article.date,
      read_time: article.readTime,
      audience: article.audience,
      tags: article.tags,
      key_points: article.keyPoints,
      focus_keyword: article.focusKeyword ?? "",
      faqs: article.faqs ?? [],
      toc_enabled: article.tocEnabled ?? true,
      content: article.content ?? "",
      content_html: article.contentHtml ?? "",
      body: article.body ?? [],
      blocks: article.blocks ?? [],
      cover_media: article.coverMedia ?? {},
      seo_title: article.seoTitle ?? "",
      seo_description: article.seoDescription ?? "",
      canonical_path: article.canonicalPath ?? "",
      canonical_url: article.canonicalUrl ?? "",
      published_at: article.publishedAt || null,
      scheduled_at: article.scheduledAt || null,
      index_status: article.indexStatus ?? "index",
      author_id: article.authorId ?? "admin",
      author: article.author ?? "Shreevan Wellness",
      redirect_enabled: article.redirectEnabled ?? false,
      redirect_url: article.redirectUrl ?? "",
      redirect_status_code: article.redirectStatusCode ?? 301,
      schema_json: article.schemaJson ?? "",
      related_href: article.relatedHref,
      related_label: article.relatedLabel,
      contact_label: article.contactLabel,
      status: article.status,
      featured: article.featured,
      created_at: article.createdAt || new Date().toISOString(),
      updated_at: article.updatedAt || new Date().toISOString(),
    })),
    "id",
  );

  await upsertAndVerify(
    client,
    "faq_categories",
    store.faqCategories.map((category, index) => ({
      id: category.id,
      label: category.label,
      intent: category.intent,
      status: category.status,
      faqs: category.faqs,
      sort_order: index,
    })),
    "id",
  );

  await upsertAndVerify(
    client,
    "story_slots",
    store.storySlots.map((slot, index) => ({
      id: slot.id,
      label: slot.label,
      title: slot.title,
      context: slot.context,
      proof: slot.proof,
      status: slot.status,
      sort_order: index,
    })),
    "id",
  );

  // Existing editorial placeholder rows — storage_* columns left null.
  await upsertAndVerify(
    client,
    "media_items",
    store.mediaItems.map((item) => ({
      id: item.id,
      title: item.title,
      type: item.type,
      placement: item.placement,
      asset_hint: item.assetHint,
      status: item.status,
      notes: item.notes,
    })),
    "id",
  );

  await upsertAndVerify(
    client,
    "content_trust_lists",
    LIST_KEYS.map((key) => ({ list_key: key, items: store[key] })),
    "list_key",
  );
}

async function migrateSiteSettings(client: SupabaseClient) {
  const settings = normalizeAdminSiteSettings(await readJson(SITE_SETTINGS_JSON_PATH));

  await upsertAndVerify(
    client,
    "site_settings",
    [
      {
        id: "singleton",
        brand: settings.brand,
        contact: settings.contact,
        social: settings.social,
        crm: settings.crm,
        launch: settings.launch,
        navigation: settings.navigation,
        updated_at: settings.updatedAt,
      },
    ],
    "id",
  );
}

async function migrateHomeContent(client: SupabaseClient) {
  const home = normalizeAdminHomeContent(await readJson(HOME_CONTENT_JSON_PATH));

  await upsertAndVerify(
    client,
    "home_content",
    [
      {
        id: "singleton",
        hero: home.hero,
        media_band: home.mediaBand,
        proof_strip: home.proofStrip,
        intro: home.intro,
        program_pathways: home.programPathways,
        differentiation: home.differentiation,
        rhythm: home.rhythm,
        team: home.team,
        travel: home.travel,
        location: home.location,
        testimonials: home.testimonials,
        consultation: home.consultation,
        lead_form: home.leadForm,
        updated_at: home.updatedAt,
      },
    ],
    "id",
  );
}

async function migratePageContent(client: SupabaseClient) {
  const store = normalizeAdminPageContent(await readJson(PAGE_CONTENT_JSON_PATH));

  await upsertAndVerify(
    client,
    "managed_pages",
    store.pages.map((page) => ({
      id: page.id,
      title: page.title,
      path: page.path,
      template: page.template,
      status: page.status,
      connected: page.connected,
      seo: page.seo,
      hero: page.hero,
      notes: page.notes,
    })),
    "id",
  );
}

async function migrateProgramContent(client: SupabaseClient) {
  const store = normalizeAdminProgramContent(await readJson(PROGRAM_CONTENT_JSON_PATH));

  await upsertAndVerify(
    client,
    "managed_programs",
    store.programs.map((program) => ({
      id: program.id,
      title: program.title,
      path: program.path,
      status: program.status,
      connected: program.connected,
      order_num: program.order,
      label: program.label,
      duration: program.duration,
      summary: program.summary,
      outcome: program.outcome,
      audience: program.audience,
      investment: program.investment,
      seo: program.seo,
      highlights: program.highlights,
      inclusions: program.inclusions,
      notes: program.notes,
    })),
    "id",
  );
}

async function migrateSeoLeads(client: SupabaseClient) {
  const store = normalizeAdminSeoLeads(await readJson(SEO_LEADS_JSON_PATH));

  await upsertAndVerify(
    client,
    "seo_routes",
    store.routes.map((route) => ({
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
    })),
    "id",
  );

  await upsertAndVerify(
    client,
    "lead_routing",
    [
      {
        id: "singleton",
        inbox_email: store.leadRouting.inboxEmail,
        lead_owner: store.leadRouting.leadOwner,
        response_sla: store.leadRouting.responseSla,
        crm_stage: store.leadRouting.crmStage,
        whatsapp_escalation: store.leadRouting.whatsappEscalation,
        qualification_checklist: store.leadRouting.qualificationChecklist,
        updated_at: store.updatedAt,
      },
    ],
    "id",
  );

  await upsertAndVerify(
    client,
    "leads",
    store.leads.map((lead) => ({
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
    })),
    "id",
  );
}

async function main() {
  const url = requireEnv("SUPABASE_URL");
  const serviceRoleKey = requireEnv("SUPABASE_SERVICE_ROLE_KEY");
  const client = createClient(url, serviceRoleKey, { auth: { persistSession: false } });

  await migrateContentTrust(client);
  await migrateSiteSettings(client);
  await migrateHomeContent(client);
  await migratePageContent(client);
  await migrateProgramContent(client);
  await migrateSeoLeads(client);

  console.log("Migration complete.");
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
