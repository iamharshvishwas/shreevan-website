import type { MetadataRoute } from "next";
import { headers } from "next/headers";
import { getPublicSiteOrigin, getPublicSiteSettings } from "@/lib/site/public-settings";
import { isAdminHostname } from "@/lib/site/is-admin-host";

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

// Paths that are never public, on either host.
const NEVER_PUBLIC_PATHS = ["/admin", "/payment"];

export default async function robots(): Promise<MetadataRoute.Robots> {
  const requestHeaders = await headers();

  // The admin subdomain is served by this same app (proxy.ts rewrites it),
  // but /robots.txt bypasses that rewrite (its matcher excludes dotted
  // paths) and previously fell through to this same, permissive policy —
  // meaning every crawler this file explicitly allows was also being told
  // it could crawl the admin panel. Block it outright here, independent of
  // the site's public/blocked launch state.
  if (isAdminHostname(requestHeaders.get("host"))) {
    return {
      rules: [
        {
          userAgent: "*",
          disallow: "/",
        },
      ],
    };
  }

  const settings = await getPublicSiteSettings();
  const siteOrigin = getPublicSiteOrigin(settings);

  if (settings.launch.robotsPolicy === "public") {
    return {
      rules: [
        {
          userAgent: "*",
          allow: "/",
          disallow: NEVER_PUBLIC_PATHS,
        },
        ...AI_CRAWLER_USER_AGENTS.map((userAgent) => ({
          userAgent,
          allow: "/",
          disallow: NEVER_PUBLIC_PATHS,
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
