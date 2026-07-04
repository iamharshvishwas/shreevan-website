import { NextResponse } from "next/server";
import { isAdminRequestAuthorized } from "@/lib/admin/auth";
import { adminWritesDisabledResponse } from "@/lib/admin/write-guard";
import { readAdminSeoLeads, writeAdminSeoLeads } from "@/lib/admin/seo-leads";

export const runtime = "nodejs";

export async function GET(request: Request) {
  if (!(await isAdminRequestAuthorized(request))) {
    return NextResponse.json({ error: "Unauthorized admin request." }, { status: 401 });
  }

  const seoLeads = await readAdminSeoLeads();

  return NextResponse.json({ seoLeads });
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
    return NextResponse.json({ error: "Invalid SEO and leads payload." }, { status: 400 });
  }

  try {
    const seoLeads = await writeAdminSeoLeads(body);

    return NextResponse.json({ seoLeads });
  } catch {
    return NextResponse.json({ error: "SEO and leads data could not be saved." }, { status: 500 });
  }
}
