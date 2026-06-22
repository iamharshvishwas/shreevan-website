import { NextResponse } from "next/server";
import { isAdminRequestAuthorized } from "@/lib/admin/auth";
import { readAdminPageContent, writeAdminPageContent } from "@/lib/admin/page-content";

export const runtime = "nodejs";

export async function GET(request: Request) {
  if (!isAdminRequestAuthorized(request)) {
    return NextResponse.json({ error: "Unauthorized admin request." }, { status: 401 });
  }

  const pageContent = await readAdminPageContent();

  return NextResponse.json({ pageContent });
}

export async function PUT(request: Request) {
  if (!isAdminRequestAuthorized(request)) {
    return NextResponse.json({ error: "Unauthorized admin request." }, { status: 401 });
  }

  let body: unknown;

  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid page content payload." }, { status: 400 });
  }

  try {
    const pageContent = await writeAdminPageContent(body);

    return NextResponse.json({ pageContent });
  } catch {
    return NextResponse.json(
      { error: "Page content could not be saved in this environment." },
      { status: 500 },
    );
  }
}
