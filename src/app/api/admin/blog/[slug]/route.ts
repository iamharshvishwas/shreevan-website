import { NextResponse } from "next/server";
import { isAdminRequestAuthorized } from "@/lib/admin/auth";
import { isContentTrustStorageEphemeral, readAdminContentTrust, writeAdminContentTrust } from "@/lib/admin/content-trust";
import type { AdminJournalArticle } from "@/lib/admin/content-trust";

export const runtime = "nodejs";

const EPHEMERAL_WARNING =
  "Saved, but only for this server instance. This deployment has no persistent storage yet — the post can vanish without warning on restart/redeploy, and other visitors may not see it. Copy this content somewhere safe.";

function ephemeralFields() {
  return isContentTrustStorageEphemeral() ? { ephemeral: true, warning: EPHEMERAL_WARNING } : {};
}

type BlogArticleRouteProps = {
  params: Promise<{
    slug: string;
  }>;
};

function isRecord(value: unknown): value is Record<string, unknown> {
  return Boolean(value && typeof value === "object" && !Array.isArray(value));
}

function slugify(value: string) {
  return value
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 70);
}

function articleSlug(article: Partial<AdminJournalArticle>) {
  return slugify(article.slug || article.id || article.title || "blog-draft") || "blog-draft";
}

function findArticleIndex(articles: AdminJournalArticle[], slug: string) {
  return articles.findIndex((article) => article.id === slug || articleSlug(article) === slug);
}

export async function GET(request: Request, { params }: BlogArticleRouteProps) {
  if (!(await isAdminRequestAuthorized(request))) {
    return NextResponse.json({ error: "Unauthorized admin request." }, { status: 401 });
  }

  const { slug } = await params;
  const contentTrust = await readAdminContentTrust();
  const article = contentTrust.journalArticles.find((item) => item.id === slug || articleSlug(item) === slug);

  if (!article) {
    return NextResponse.json({ error: "Blog article not found." }, { status: 404 });
  }

  return NextResponse.json({ article });
}

export async function PATCH(request: Request, { params }: BlogArticleRouteProps) {
  if (!(await isAdminRequestAuthorized(request))) {
    return NextResponse.json({ error: "Unauthorized admin request." }, { status: 401 });
  }

  let body: unknown;

  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid blog update payload." }, { status: 400 });
  }

  if (!isRecord(body)) {
    return NextResponse.json({ error: "Invalid blog update payload." }, { status: 400 });
  }

  try {
    const { slug } = await params;
    const currentContent = await readAdminContentTrust();
    const index = findArticleIndex(currentContent.journalArticles, slug);

    if (index < 0) {
      return NextResponse.json({ error: "Blog article not found." }, { status: 404 });
    }

    const nextArticles = [...currentContent.journalArticles];
    nextArticles[index] = {
      ...nextArticles[index],
      ...body,
    };
    const contentTrust = await writeAdminContentTrust({
      ...currentContent,
      journalArticles: nextArticles,
    });
    const savedArticle = contentTrust.journalArticles.find(
      (item) => item.id === slug || articleSlug(item) === articleSlug(body as Partial<AdminJournalArticle>),
    );

    return NextResponse.json({
      article: savedArticle,
      blog: {
        journalCategories: contentTrust.journalCategories,
        journalArticles: contentTrust.journalArticles,
        updatedAt: contentTrust.updatedAt,
      },
      ...ephemeralFields(),
    });
  } catch {
    return NextResponse.json({ error: "Blog article could not be updated." }, { status: 500 });
  }
}

export async function DELETE(request: Request, { params }: BlogArticleRouteProps) {
  if (!(await isAdminRequestAuthorized(request))) {
    return NextResponse.json({ error: "Unauthorized admin request." }, { status: 401 });
  }

  try {
    const { slug } = await params;
    const currentContent = await readAdminContentTrust();
    const index = findArticleIndex(currentContent.journalArticles, slug);

    if (index < 0) {
      return NextResponse.json({ error: "Blog article not found." }, { status: 404 });
    }

    const nextArticles = [...currentContent.journalArticles];
    nextArticles[index] = {
      ...nextArticles[index],
      status: "archived",
      updatedAt: new Date().toISOString(),
    };
    const contentTrust = await writeAdminContentTrust({
      ...currentContent,
      journalArticles: nextArticles,
    });

    return NextResponse.json({
      ok: true,
      blog: {
        journalCategories: contentTrust.journalCategories,
        journalArticles: contentTrust.journalArticles,
        updatedAt: contentTrust.updatedAt,
      },
      ...ephemeralFields(),
    });
  } catch {
    return NextResponse.json({ error: "Blog article could not be archived." }, { status: 500 });
  }
}
