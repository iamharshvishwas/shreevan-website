import { NextResponse } from "next/server";
import { isAdminRequestAuthorized } from "@/lib/admin/auth";
import { adminWritesDisabledResponse } from "@/lib/admin/write-guard";
import { readAdminContentTrust, writeAdminContentTrust } from "@/lib/admin/content-trust";
import type { AdminJournalArticle } from "@/lib/admin/content-trust";

export const runtime = "nodejs";

function isRecord(value: unknown): value is Record<string, unknown> {
  return Boolean(value && typeof value === "object" && !Array.isArray(value));
}

function toBlogPayload(contentTrust: Awaited<ReturnType<typeof readAdminContentTrust>>) {
  return {
    journalCategories: contentTrust.journalCategories,
    journalArticles: contentTrust.journalArticles,
    updatedAt: contentTrust.updatedAt,
  };
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

export async function GET(request: Request) {
  if (!(await isAdminRequestAuthorized(request))) {
    return NextResponse.json({ error: "Unauthorized admin request." }, { status: 401 });
  }

  const contentTrust = await readAdminContentTrust();

  return NextResponse.json({ blog: toBlogPayload(contentTrust) });
}

export async function PUT(request: Request) {
  const writesDisabled = adminWritesDisabledResponse();

  if (writesDisabled) {
    return writesDisabled;
  }

  if (!(await isAdminRequestAuthorized(request))) {
    return NextResponse.json({ error: "Unauthorized admin request." }, { status: 401 });
  }

  let body: unknown;

  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid blog payload." }, { status: 400 });
  }

  if (!isRecord(body)) {
    return NextResponse.json({ error: "Invalid blog payload." }, { status: 400 });
  }

  try {
    const currentContent = await readAdminContentTrust();
    const contentTrust = await writeAdminContentTrust({
      ...currentContent,
      journalCategories: body.journalCategories,
      journalArticles: body.journalArticles,
    });

    return NextResponse.json({ blog: toBlogPayload(contentTrust) });
  } catch {
    return NextResponse.json({ error: "Blog content could not be saved." }, { status: 500 });
  }
}

export async function POST(request: Request) {
  const writesDisabled = adminWritesDisabledResponse();

  if (writesDisabled) {
    return writesDisabled;
  }

  if (!(await isAdminRequestAuthorized(request))) {
    return NextResponse.json({ error: "Unauthorized admin request." }, { status: 401 });
  }

  let body: unknown;

  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid blog create payload." }, { status: 400 });
  }

  if (!isRecord(body)) {
    return NextResponse.json({ error: "Invalid blog create payload." }, { status: 400 });
  }

  try {
    const currentContent = await readAdminContentTrust();
    const slug = articleSlug(body as Partial<AdminJournalArticle>);
    const exists = currentContent.journalArticles.some((article) => articleSlug(article) === slug);

    if (exists) {
      return NextResponse.json({ error: "A blog with this slug already exists." }, { status: 409 });
    }

    const article = {
      ...body,
      id: slug,
      slug,
    };
    const contentTrust = await writeAdminContentTrust({
      ...currentContent,
      journalArticles: [article, ...currentContent.journalArticles],
    });
    const savedArticle = contentTrust.journalArticles.find((item) => articleSlug(item) === slug);

    return NextResponse.json({ blog: toBlogPayload(contentTrust), article: savedArticle }, { status: 201 });
  } catch {
    return NextResponse.json({ error: "Blog could not be created." }, { status: 500 });
  }
}
