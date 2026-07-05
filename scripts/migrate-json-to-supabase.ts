// One-time import: data/admin/content-trust.json -> Supabase tables.
// Run once after 0001_content_trust_core.sql has been applied:
//   npx tsx scripts/migrate-json-to-supabase.ts
// Idempotent (upserts) — safe to re-run if it fails partway.

import "dotenv/config";
import { readFile } from "node:fs/promises";
import { join } from "node:path";
import { createClient } from "@supabase/supabase-js";
import { normalizeAdminContentTrust } from "../src/lib/admin/content-trust";

const CONTENT_TRUST_JSON_PATH = join(process.cwd(), "data", "admin", "content-trust.json");

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

async function main() {
  const url = requireEnv("SUPABASE_URL");
  const serviceRoleKey = requireEnv("SUPABASE_SERVICE_ROLE_KEY");
  const client = createClient(url, serviceRoleKey, { auth: { persistSession: false } });

  const raw = await readFile(CONTENT_TRUST_JSON_PATH, "utf8");
  const store = normalizeAdminContentTrust(JSON.parse(raw));

  console.log(`Source: ${store.journalArticles.length} journal articles, ${store.faqCategories.length} FAQ categories, ${store.storySlots.length} story slots, ${store.mediaItems.length} media items.`);

  // journal_articles
  const journalRows = store.journalArticles.map((article) => ({
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
  }));

  const { error: journalError, count: journalCount } = await client
    .from("journal_articles")
    .upsert(journalRows, { onConflict: "id", count: "exact" });

  if (journalError) {
    throw new Error(`journal_articles upsert failed: ${journalError.message}`);
  }

  if (journalCount !== journalRows.length) {
    throw new Error(`journal_articles row-count mismatch: expected ${journalRows.length}, upserted ${journalCount}`);
  }

  console.log(`journal_articles: upserted ${journalCount} rows.`);

  // faq_categories
  const faqRows = store.faqCategories.map((category, index) => ({
    id: category.id,
    label: category.label,
    intent: category.intent,
    status: category.status,
    faqs: category.faqs,
    sort_order: index,
  }));

  const { error: faqError, count: faqCount } = await client
    .from("faq_categories")
    .upsert(faqRows, { onConflict: "id", count: "exact" });

  if (faqError) {
    throw new Error(`faq_categories upsert failed: ${faqError.message}`);
  }

  if (faqCount !== faqRows.length) {
    throw new Error(`faq_categories row-count mismatch: expected ${faqRows.length}, upserted ${faqCount}`);
  }

  console.log(`faq_categories: upserted ${faqCount} rows.`);

  // story_slots
  const storyRows = store.storySlots.map((slot, index) => ({
    id: slot.id,
    label: slot.label,
    title: slot.title,
    context: slot.context,
    proof: slot.proof,
    status: slot.status,
    sort_order: index,
  }));

  const { error: storyError, count: storyCount } = await client
    .from("story_slots")
    .upsert(storyRows, { onConflict: "id", count: "exact" });

  if (storyError) {
    throw new Error(`story_slots upsert failed: ${storyError.message}`);
  }

  if (storyCount !== storyRows.length) {
    throw new Error(`story_slots row-count mismatch: expected ${storyRows.length}, upserted ${storyCount}`);
  }

  console.log(`story_slots: upserted ${storyCount} rows.`);

  // media_items (existing editorial placeholder rows — storage_* columns left null)
  const mediaRows = store.mediaItems.map((item) => ({
    id: item.id,
    title: item.title,
    type: item.type,
    placement: item.placement,
    asset_hint: item.assetHint,
    status: item.status,
    notes: item.notes,
  }));

  const { error: mediaError, count: mediaCount } = await client
    .from("media_items")
    .upsert(mediaRows, { onConflict: "id", count: "exact" });

  if (mediaError) {
    throw new Error(`media_items upsert failed: ${mediaError.message}`);
  }

  if (mediaCount !== mediaRows.length) {
    throw new Error(`media_items row-count mismatch: expected ${mediaRows.length}, upserted ${mediaCount}`);
  }

  console.log(`media_items: upserted ${mediaCount} rows.`);

  // content_trust_lists (one row per simple array field)
  const listRows = LIST_KEYS.map((key) => ({
    list_key: key,
    items: store[key],
  }));

  const { error: listsError, count: listsCount } = await client
    .from("content_trust_lists")
    .upsert(listRows, { onConflict: "list_key", count: "exact" });

  if (listsError) {
    throw new Error(`content_trust_lists upsert failed: ${listsError.message}`);
  }

  if (listsCount !== listRows.length) {
    throw new Error(`content_trust_lists row-count mismatch: expected ${listRows.length}, upserted ${listsCount}`);
  }

  console.log(`content_trust_lists: upserted ${listsCount} rows.`);
  console.log("Migration complete.");
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
