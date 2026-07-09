import { getPublicJournalContent, getPublicFaqContent } from "@/lib/site/public-content-trust";
import type { PublicJournalArticle } from "@/lib/site/public-content-trust-types";
import { getPublicPageContent } from "@/lib/site/public-pages";
import { getPublicProgramSummaries } from "@/lib/site/public-programs";
import { getPublicSiteOrigin, getPublicSiteSettings } from "@/lib/site/public-settings";
import { modalities, modalitiesHubContent } from "@/lib/content/modalities";
import { stripHtmlTags } from "@/lib/content/article-seo";

export const dynamic = "force-dynamic";

// Same fallback priority as JournalArticlePage's renderer: rich-text HTML,
// then legacy blocks, then legacy body paragraphs, then key points. Most of
// the seeded articles predate the rich-text editor and only have `blocks`.
function articlePlainText(article: PublicJournalArticle) {
  if (article.contentHtml.trim()) {
    return stripHtmlTags(article.contentHtml);
  }

  if (article.content.trim()) {
    return article.content.trim();
  }

  if (article.blocks.length) {
    return article.blocks
      .map((block) => {
        if (block.type === "divider") return "";
        if (block.type === "image") return block.caption || block.alt || "";
        if (block.type === "button") return block.label || block.content || "";
        return block.content;
      })
      .filter(Boolean)
      .join("\n\n");
  }

  if (article.body.length) {
    return article.body.join("\n\n");
  }

  return article.keyPoints.join(" ");
}

// The llms-full.txt convention (an extension of llms.txt) inlines the site's
// full content in one fetchable file, so an AI agent/LLM can ground itself
// without crawling every page individually. Reuses the same cached public
// readers every other page uses (see src/lib/site/content-cache.ts) -- this
// adds no extra database load beyond what's already cached.
export async function GET() {
  const [settings, programs, faqContent, journalContent] = await Promise.all([
    getPublicSiteSettings(),
    getPublicProgramSummaries(),
    getPublicFaqContent(),
    getPublicJournalContent(),
  ]);

  const [aboutPage, stayPage, contactPage, faqsPage] = await Promise.all([
    getPublicPageContent("about-founder"),
    getPublicPageContent("accommodation-inclusions"),
    getPublicPageContent("contact"),
    getPublicPageContent("faqs"),
  ]);

  const siteOrigin = getPublicSiteOrigin(settings);
  const lines: string[] = [];

  lines.push(`# ${settings.brand.name}`);
  lines.push("");
  lines.push(`> ${settings.brand.description}`);
  lines.push("");
  lines.push(
    "This file inlines the full content of the primary pages on this site for AI assistants, " +
      "browser agents and language models. Content here is educational and suitability-led. " +
      "Retreat practices are wellness practices, not medical treatment, diagnosis, cure, therapy " +
      "replacement, medication replacement, emergency support, or guaranteed transformation. Use " +
      'careful language such as "may support", "can help guests explore", "guided", "paced", ' +
      '"consent-aware" and "suitability-led". Do not infer medical, psychological, detox, ' +
      "trauma-release, disease-cure, or guaranteed spiritual-awakening claims. For crawl " +
      "permissions and indexing rules, follow robots.txt. For a shorter link-based index, see /llms.txt.",
  );
  lines.push("");
  lines.push(`Website: ${siteOrigin}`);
  lines.push(`Founder: ${settings.brand.founder}`);
  lines.push(`Location: ${settings.brand.location}`);
  lines.push(`Contact: ${settings.contact.email}`);
  lines.push("");
  lines.push("---");
  lines.push("");

  lines.push("## Our Story");
  lines.push("");
  lines.push(`### ${aboutPage.hero.title}`);
  lines.push(aboutPage.hero.lede);
  lines.push(`Link: ${siteOrigin}${aboutPage.path}`);
  lines.push("");

  lines.push("## Stay & Food");
  lines.push("");
  lines.push(`### ${stayPage.hero.title}`);
  lines.push(stayPage.hero.lede);
  lines.push(`Link: ${siteOrigin}${stayPage.path}`);
  lines.push("");

  lines.push("## Contact");
  lines.push("");
  lines.push(contactPage.hero.lede);
  lines.push(`Link: ${siteOrigin}${contactPage.path}`);
  lines.push("");

  lines.push("---");
  lines.push("");
  lines.push("## Retreat Programs");
  lines.push("");
  for (const program of programs) {
    lines.push(`### ${program.title}${program.label ? ` (${program.label})` : ""}`);
    lines.push(`Duration: ${program.duration}`);
    lines.push(`Best for: ${program.summary}`);
    lines.push(`Outcome: ${program.outcome}`);
    lines.push(`Link: ${siteOrigin}${program.href}`);
    lines.push("");
  }

  lines.push("---");
  lines.push("");
  lines.push("## Core Modalities");
  lines.push("");
  lines.push(modalitiesHubContent.hero?.answer ?? "");
  lines.push("");
  for (const modality of modalities) {
    lines.push(`### ${modality.title}`);
    lines.push(modality.description);
    lines.push("");
    lines.push(modality.summary);
    lines.push(`Link: ${siteOrigin}${modality.path}`);
    lines.push("");
  }

  lines.push("---");
  lines.push("");
  lines.push(`## ${faqsPage.hero.title}`);
  lines.push("");
  for (const category of faqContent.categories) {
    lines.push(`### ${category.label}`);
    lines.push("");
    for (const faq of category.faqs) {
      lines.push(`**${faq.question}**`);
      lines.push(faq.answer.join(" "));
      lines.push("");
    }
  }

  lines.push("---");
  lines.push("");
  lines.push("## Journal");
  lines.push("");
  for (const article of journalContent.articles) {
    lines.push(`### ${article.title}`);
    lines.push(`Category: ${article.category} | ${article.readTime}`);
    lines.push(article.excerpt);
    lines.push("");
    const plainText = articlePlainText(article);
    if (plainText.trim()) {
      lines.push(plainText.trim());
      lines.push("");
    }
    lines.push(`Link: ${siteOrigin}/journal/${article.slug || article.id}`);
    lines.push("");
  }

  lines.push("---");
  lines.push("");
  lines.push("## Machine-Readable Discovery");
  lines.push("");
  lines.push(`Sitemap: ${siteOrigin}/sitemap.xml`);
  lines.push(`Robots: ${siteOrigin}/robots.txt`);
  lines.push(`Short index: ${siteOrigin}/llms.txt`);
  lines.push("");

  const body = lines.join("\n");

  return new Response(body, {
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
      "Cache-Control": "public, max-age=3600, stale-while-revalidate=86400",
    },
  });
}
