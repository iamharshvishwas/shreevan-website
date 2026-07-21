import type { Metadata } from "next";
import { notFound, permanentRedirect, redirect } from "next/navigation";
import { JournalArticlePage } from "@/components/journal/journal-article-page";
import { siteConfig } from "@/config/site";
import { JsonLd } from "@/lib/schema/json-ld";
import { findArticleAuthor } from "@/lib/content/authors";
import { blogPostingSchema, breadcrumbSchema, faqPageSchema, webPageSchema } from "@/lib/schema/site-schema";
import { absoluteSiteUrl, buildPageMetadata } from "@/lib/seo/page-metadata";
import { getPublicJournalContent } from "@/lib/site/public-content-trust";

export const revalidate = 3600;

type JournalArticlePageProps = {
  params: Promise<{
    slug: string;
  }>;
};

function articlePath(slug: string) {
  return `/journal/${slug}`;
}

function toIsoDate(date: string) {
  const parsed = new Date(date);

  return Number.isNaN(parsed.getTime()) ? "2026-06-26T00:00:00.000Z" : parsed.toISOString();
}

function findArticle(journalContent: Awaited<ReturnType<typeof getPublicJournalContent>>, slug: string) {
  return journalContent.articles.find((item) => item.id === slug || item.slug === slug);
}

function isSchemaObject(value: unknown): value is Record<string, unknown> {
  return Boolean(value && typeof value === "object" && !Array.isArray(value));
}

function parseSchemaJson(value: string): Record<string, unknown> | null {
  if (!value.trim()) {
    return null;
  }

  try {
    const parsed = JSON.parse(value) as unknown;

    return isSchemaObject(parsed) ? parsed : null;
  } catch {
    return null;
  }
}

export async function generateStaticParams() {
  const journalContent = await getPublicJournalContent();

  return journalContent.articles.map((article) => ({
    slug: article.slug || article.id,
  }));
}

export async function generateMetadata({ params }: JournalArticlePageProps): Promise<Metadata> {
  const { slug } = await params;
  const journalContent = await getPublicJournalContent();
  const article = findArticle(journalContent, slug);

  if (!article) {
    return {};
  }

  return buildPageMetadata({
    title: article.seoTitle || `${article.title} | Shreevan Journal`,
    description: article.seoDescription || article.excerpt,
    path: article.canonicalPath || articlePath(article.id),
    image: article.coverMedia.src
      ? {
          url: absoluteSiteUrl(article.coverMedia.src),
          alt: article.coverMedia.alt || article.title,
        }
      : undefined,
    article: {
      publishedTime: toIsoDate(article.publishedAt || article.date),
      modifiedTime: toIsoDate(article.updatedAt || article.publishedAt || article.date),
      authors: [article.author],
      section: article.category,
      tags: article.tags,
    },
    robots:
      article.indexStatus === "noindex"
        ? {
            index: false,
            follow: false,
            nocache: true,
          }
        : undefined,
  });
}

export default async function Page({ params }: JournalArticlePageProps) {
  const { slug } = await params;
  const journalContent = await getPublicJournalContent();
  const article = findArticle(journalContent, slug);

  if (!article) {
    notFound();
  }

  if (article.redirectEnabled && article.redirectUrl) {
    if (article.redirectStatusCode === 301) {
      permanentRedirect(article.redirectUrl);
    }

    redirect(article.redirectUrl);
  }

  const path = articlePath(article.slug || article.id);
  const pageUrl = `${siteConfig.url}${path}`;
  const manualSchema = parseSchemaJson(article.schemaJson);
  const author = findArticleAuthor(article.authorId, article.author);
  const articleFaqs = article.faqs.filter((faq) => faq.question.trim() && faq.answer.trim());
  const relatedArticles = journalContent.articles
    .filter((item) => item.id !== article.id)
    .slice(0, 3)
    .map((item) => ({
      id: item.slug || item.id,
      title: item.title,
    }));

  return (
    <>
      <JsonLd
        data={breadcrumbSchema([
          { name: "Home", url: siteConfig.url },
          { name: "Journal", url: `${siteConfig.url}/journal` },
          { name: article.title, url: pageUrl },
        ])}
      />
      <JsonLd
        data={webPageSchema({
          type: "WebPage",
          name: article.title,
          url: pageUrl,
          description: article.excerpt,
        })}
      />
      <JsonLd
        data={blogPostingSchema({
          title: article.title,
          url: path,
          description: article.seoDescription || article.excerpt,
          datePublished: toIsoDate(article.publishedAt || article.date),
          dateModified: toIsoDate(article.updatedAt || article.publishedAt || article.date),
          image: article.coverMedia.src || undefined,
          category: article.category,
          tags: article.tags,
          audience: article.audience,
          author: {
            name: author.name,
            role: author.role,
            sameAs: author.sameAs,
          },
        })}
      />
      {articleFaqs.length ? (
        <JsonLd data={faqPageSchema(articleFaqs.map((faq) => ({ question: faq.question, answer: faq.answer })))} />
      ) : null}
      {manualSchema ? <JsonLd data={manualSchema} /> : null}
      <JournalArticlePage article={article} relatedArticles={relatedArticles} />
    </>
  );
}
