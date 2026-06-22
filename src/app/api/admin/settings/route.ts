import { NextResponse } from "next/server";
import { isAdminRequestAuthorized } from "@/lib/admin/auth";
import { readAdminSiteSettings, writeAdminSiteSettings } from "@/lib/admin/site-settings";

export const runtime = "nodejs";

export async function GET(request: Request) {
  if (!isAdminRequestAuthorized(request)) {
    return NextResponse.json({ error: "Unauthorized admin request." }, { status: 401 });
  }

  const settings = await readAdminSiteSettings();

  return NextResponse.json({ settings });
}

export async function PUT(request: Request) {
  if (!isAdminRequestAuthorized(request)) {
    return NextResponse.json({ error: "Unauthorized admin request." }, { status: 401 });
  }

  let body: unknown;

  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid settings payload." }, { status: 400 });
  }

  try {
    const settings = await writeAdminSiteSettings(body);

    return NextResponse.json({ settings });
  } catch {
    return NextResponse.json(
      { error: "Settings could not be saved in this environment." },
      { status: 500 },
    );
  }
}
