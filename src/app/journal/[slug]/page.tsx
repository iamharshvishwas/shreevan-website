import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { JournalArticlePage } from "@/components/journal/journal-article-page";
import { siteConfig } from "@/config/site";
import { JsonLd } from "@/lib/schema/json-ld";
import { blogPostingSchema, breadcrumbSchema, webPageSchema } from "@/lib/schema/site-schema";
import { getPublicJournalContent } from "@/lib/site/public-content-trust";

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

export async function generateStaticParams() {
  const journalContent = await getPublicJournalContent();

  return journalContent.articles.map((article) => ({
    slug: article.id,
  }));
}

export async function generateMetadata({ params }: JournalArticlePageProps): Promise<Metadata> {
  const { slug } = await params;
  const journalContent = await getPublicJournalContent();
  const article = journalContent.articles.find((item) => item.id === slug);

  if (!article) {
    return {};
  }

  return {
    title: `${article.title} | Shreevan Journal`,
    description: article.excerpt,
    alternates: {
      canonical: articlePath(article.id),
    },
  };
}

export default async function Page({ params }: JournalArticlePageProps) {
  const { slug } = await params;
  const journalContent = await getPublicJournalContent();
  const article = journalContent.articles.find((item) => item.id === slug);

  if (!article) {
    notFound();
  }

  const path = articlePath(article.id);
  const pageUrl = `${siteConfig.url}${path}`;
  const relatedArticles = journalContent.articles
    .filter((item) => item.id !== article.id)
    .slice(0, 3)
    .map((item) => ({
      id: item.id,
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
          description: article.excerpt,
          datePublished: toIsoDate(article.date),
          category: article.category,
          tags: article.tags,
          audience: article.audience,
        })}
      />
      <JournalArticlePage article={article} relatedArticles={relatedArticles} />
    </>
  );
}
