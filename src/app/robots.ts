import type { MetadataRoute } from "next";
import { getPublicSiteOrigin, getPublicSiteSettings } from "@/lib/site/public-settings";

export const dynamic = "force-dynamic";

// Explicitly allow known AI/LLM crawlers so the site can be discovered and
// cited by AI search and answer engines (GEO/AEO/AIO), not just traditional
// search. Grouped by provider; review periodically against each vendor's
// published crawler docs since new bots get added over time.
//
// IMPORTANT: Cloudflare's "AI Crawl Control" feature currently hard-blocks
// several of these (ClaudeBot, GPTBot, Google-Extended, meta-externalagent,
// CCBot, Bytespider, Amazonbot, Applebot-Extended) at the edge, ahead of this
// file's own output — this origin-level allow list alone will NOT override
// that. Those specific bots also need to be allowed in the Cloudflare
// dashboard (Security/Bots -> AI Crawl Control) for the allow to take effect
// live. Real-time/citation bots not in Cloudflare's blocked set (OAI-SearchBot,
// PerplexityBot, Claude-User, etc.) are unaffected and will work immediately.
const AI_CRAWLER_USER_AGENTS = [
  // OpenAI / ChatGPT
  "GPTBot", // training data collection
  "OAI-SearchBot", // powers ChatGPT's live web-search citations
  "ChatGPT-User", // user-triggered fetch of a specific page inside ChatGPT

  // Anthropic / Claude
  "ClaudeBot", // general crawling + training
  "Claude-User", // user-triggered fetch inside Claude
  "Claude-SearchBot", // Claude's web-search tool

  // Google / Gemini (separate from Googlebot, which is already covered by "*")
  "Google-Extended", // Gemini + Vertex AI training/grounding

  // Perplexity
  "PerplexityBot",
  "Perplexity-User",

  // Meta / Meta AI
  "meta-externalagent",
  "meta-externalfetcher",

  // Apple Intelligence
  "Applebot-Extended",

  // Amazon (Rufus, Alexa+)
  "Amazonbot",

  // Common Crawl — dataset used as training data by many smaller/open-source LLMs
  "CCBot",

  // ByteDance (Doubao and other ByteDance AI products). Has a reputation for
  // heavy crawl volume — revisit if it causes noticeable server/bandwidth load.
  "Bytespider",

  // You.com
  "YouBot",

  // Cohere
  "cohere-ai",

  // Allen Institute for AI (OLMo and other open research models)
  "AI2Bot",
] as const;

export default async function robots(): Promise<MetadataRoute.Robots> {
  const settings = await getPublicSiteSettings();
  const siteOrigin = getPublicSiteOrigin(settings);

  if (settings.launch.robotsPolicy === "public") {
    return {
      rules: [
        {
          userAgent: "*",
          allow: "/",
          disallow: ["/admin/", "/payment"],
        },
        ...AI_CRAWLER_USER_AGENTS.map((userAgent) => ({
          userAgent,
          allow: "/",
          disallow: ["/admin/", "/payment"],
        })),
      ],
      host: siteOrigin,
      ...(settings.launch.sitemapEnabled ? { sitemap: `${siteOrigin}/sitemap.xml` } : {}),
    };
  }

  return {
    rules: [
      {
        userAgent: "*",
        disallow: "/",
      },
    ],
    host: siteOrigin,
  };
}
