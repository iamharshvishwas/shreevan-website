import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { JournalArticlePage } from "@/components/journal/journal-article-page";
import { readAdminContentTrust } from "@/lib/admin/content-trust";
import { toPublicJournalArticle } from "@/lib/site/public-content-trust";

type AdminBlogPreviewPageProps = {
  params: Promise<{
    slug: string;
  }>;
};

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Blog Preview",
  robots: {
    index: false,
    follow: false,
    nocache: true,
  },
};

function slugify(value: string) {
  return value
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

export default async function AdminBlogPreviewPage({ params }: AdminBlogPreviewPageProps) {
  const { slug } = await params;
  const contentTrust = await readAdminContentTrust();
  const article = contentTrust.journalArticles.find(
    (item) => item.id === slug || slugify(item.slug || item.id) === slug,
  );

  if (!article) {
    notFound();
  }

  const publicArticle = toPublicJournalArticle(article);
  const relatedArticles = contentTrust.journalArticles
    .filter((item) => item.id !== article.id)
    .slice(0, 3)
    .map((item) => ({
      id: item.slug || item.id,
      title: item.title,
    }));

  return <JournalArticlePage article={publicArticle} relatedArticles={relatedArticles} />;
}
