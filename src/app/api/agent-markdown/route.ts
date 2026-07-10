import { NextRequest } from "next/server";
import { buildMarkdownDocument } from "@/lib/agents/markdown-documents";

export const dynamic = "force-dynamic";

function normalisePathname(value: string | null) {
  if (!value || !value.startsWith("/") || value.startsWith("//")) return null;
  const pathname = value.replace(/\/{2,}/g, "/");
  return pathname.length > 1 && pathname.endsWith("/") ? pathname.slice(0, -1) : pathname;
}

function estimatedTokenCount(markdown: string) {
  // A lightweight estimate is enough for agents choosing a context window.
  return Math.max(1, Math.ceil(markdown.trim().length / 4));
}

export async function GET(request: NextRequest) {
  const pathname = normalisePathname(request.nextUrl.searchParams.get("path"));
  if (!pathname) {
    return new Response("# Markdown endpoint not found\n", {
      status: 404,
      headers: { "Content-Type": "text/markdown; charset=utf-8", "X-Robots-Tag": "noindex, nofollow" },
    });
  }

  const document = await buildMarkdownDocument(pathname);
  if (!document) {
    return new Response(`# Page not found\n\nNo public Markdown document is available for \`${pathname}\`.\n`, {
      status: 404,
      headers: { "Content-Type": "text/markdown; charset=utf-8", "X-Robots-Tag": "noindex, nofollow" },
    });
  }

  return new Response(document.body, {
    headers: {
      "Content-Type": "text/markdown; charset=utf-8",
      "Cache-Control": "public, max-age=300, stale-while-revalidate=3600",
      "Vary": "Accept",
      "X-Markdown-Tokens": String(estimatedTokenCount(document.body)),
      "X-Robots-Tag": "noindex, nofollow",
      "Link": `<${document.origin}/llms.txt>; rel=\"alternate\"; type=\"text/plain\", <${document.origin}/llms-full.txt>; rel=\"alternate\"; type=\"text/plain\"`,
    },
  });
}
