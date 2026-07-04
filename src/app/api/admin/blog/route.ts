import { NextResponse } from "next/server";
import { isAdminRequestAuthorized } from "@/lib/admin/auth";
import { isContentTrustStorageEphemeral, readAdminContentTrust, writeAdminContentTrust } from "@/lib/admin/content-trust";
import type { AdminJournalArticle } from "@/lib/admin/content-trust";

export const runtime = "nodejs";

const EPHEMERAL_WARNING =
  "Saved, but only for this server instance. This deployment has no persistent storage yet — the post can vanish without warning on restart/redeploy, and other visitors may not see it. Copy this content somewhere safe.";

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

function ephemeralFields() {
  return isContentTrustStorageEphemeral() ? { ephemeral: true, warning: EPHEMERAL_WARNING } : {};
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

    return NextResponse.json({ blog: toBlogPayload(contentTrust), ...ephemeralFields() });
  } catch {
    return NextResponse.json({ error: "Blog content could not be saved." }, { status: 500 });
  }
}

export async function POST(request: Request) {
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

    return NextResponse.json(
      { blog: toBlogPayload(contentTrust), article: savedArticle, ...ephemeralFields() },
      { status: 201 },
    );
  } catch {
    return NextResponse.json({ error: "Blog could not be created." }, { status: 500 });
  }
}
