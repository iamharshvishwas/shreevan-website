// Pure string helpers shared by the admin SEO checklist (client) and the
// public article renderer (server). No DOM APIs — regex over TipTap's
// well-formed HTML output only.

export type ArticleTocItem = {
  id: string;
  text: string;
  level: 2 | 3;
};

export type SeoCheckItem = {
  id: string;
  label: string;
  status: "pass" | "fail" | "info";
  detail?: string;
};

export function stripHtmlTags(html: string) {
  return html
    .replace(/<style[\s\S]*?<\/style>/gi, " ")
    .replace(/<script[\s\S]*?<\/script>/gi, " ")
    .replace(/<[^>]+>/g, " ")
    .replace(/&nbsp;/gi, " ")
    .replace(/&amp;/gi, "&")
    .replace(/&lt;/gi, "<")
    .replace(/&gt;/gi, ">")
    .replace(/&#39;|&apos;/gi, "'")
    .replace(/&quot;/gi, '"')
    .replace(/\s+/g, " ")
    .trim();
}

function headingSlug(text: string, index: number) {
  const base = text
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 60);

  return base ? `${base}-h${index + 1}` : `section-h${index + 1}`;
}

export function extractHeadings(html: string): ArticleTocItem[] {
  const headings: ArticleTocItem[] = [];
  const pattern = /<h([23])[^>]*>([\s\S]*?)<\/h\1>/gi;
  let match: RegExpExecArray | null;
  let index = 0;

  while ((match = pattern.exec(html)) !== null) {
    const text = stripHtmlTags(match[2]);

    if (text) {
      headings.push({
        id: headingSlug(text, index),
        text,
        level: Number(match[1]) === 3 ? 3 : 2,
      });
    }

    index += 1;
  }

  return headings;
}

// Adds stable id attributes to h2/h3 tags so the TOC can anchor-link to them.
export function injectHeadingIds(html: string) {
  let index = -1;

  return html.replace(/<h([23])([^>]*)>([\s\S]*?)<\/h\1>/gi, (full, level: string, attrs: string, inner: string) => {
    index += 1;
    const text = stripHtmlTags(inner);

    if (!text || /\bid=/.test(attrs)) {
      return full;
    }

    return `<h${level}${attrs} id="${headingSlug(text, index)}">${inner}</h${level}>`;
  });
}

function normalizeForMatch(value: string) {
  return value.toLowerCase().replace(/\s+/g, " ").trim();
}

function includesKeyword(haystack: string, keyword: string) {
  return normalizeForMatch(haystack).includes(normalizeForMatch(keyword));
}

export function analyzeArticleSeo(input: {
  focusKeyword: string;
  title: string;
  seoTitle: string;
  seoDescription: string;
  excerpt: string;
  slug: string;
  contentHtml: string;
}): SeoCheckItem[] {
  const keyword = input.focusKeyword.trim();
  const plainText = stripHtmlTags(input.contentHtml);
  const words = plainText ? plainText.split(/\s+/) : [];
  const first70Words = words.slice(0, 70).join(" ");
  const headings = extractHeadings(input.contentHtml);
  const internalLinks = [...input.contentHtml.matchAll(/href="(\/[^"]*)"/gi)].map((match) => match[1]);
  const conversionLink = internalLinks.some(
    (href) => href.startsWith("/book-consultation") || href.startsWith("/programs") || href.startsWith("/modalities"),
  );
  const checks: SeoCheckItem[] = [];

  if (!keyword) {
    checks.push({
      id: "keyword-missing",
      label: "Set a focus keyword to unlock keyword checks",
      status: "info",
    });
  } else {
    checks.push(
      {
        id: "keyword-title",
        label: "Focus keyword in title",
        status: includesKeyword(input.seoTitle || input.title, keyword) ? "pass" : "fail",
      },
      {
        id: "keyword-meta",
        label: "Focus keyword in meta description",
        status: includesKeyword(input.seoDescription || input.excerpt, keyword) ? "pass" : "fail",
      },
      {
        id: "keyword-slug",
        label: "Focus keyword in slug",
        status: includesKeyword(input.slug.replace(/-/g, " "), keyword) ? "pass" : "fail",
      },
      {
        id: "keyword-first-70",
        label: "Focus keyword in first 70 words (direct answer rule)",
        status: includesKeyword(first70Words, keyword) ? "pass" : "fail",
      },
      {
        id: "keyword-heading",
        label: "Focus keyword in at least one H2/H3",
        status: headings.some((heading) => includesKeyword(heading.text, keyword)) ? "pass" : "fail",
      },
    );
  }

  checks.push(
    {
      id: "length",
      label: `Content length: ${words.length} words`,
      status: words.length >= 1200 ? "pass" : words.length >= 600 ? "info" : "fail",
      detail: words.length >= 1200 ? "Great depth" : words.length >= 600 ? "OK — calendar targets 1200+" : "Target 1200+ words",
    },
    {
      id: "headings",
      label: `Section headings: ${headings.length}`,
      status: headings.length >= 2 ? "pass" : "fail",
      detail: headings.length >= 2 ? undefined : "Add H2 sections for structure and TOC",
    },
    {
      id: "internal-links",
      label: `Internal links: ${internalLinks.length}`,
      status: internalLinks.length >= 2 ? "pass" : internalLinks.length === 1 ? "info" : "fail",
    },
    {
      id: "conversion-link",
      label: "Links to a program, modality or consultation page",
      status: conversionLink ? "pass" : "fail",
    },
  );

  return checks;
}
