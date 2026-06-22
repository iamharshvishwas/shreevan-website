import { NextResponse } from "next/server";
import { isAdminRequestAuthorized } from "@/lib/admin/auth";
import { readAdminHomeContent, writeAdminHomeContent } from "@/lib/admin/home-content";

export const runtime = "nodejs";

export async function GET(request: Request) {
  if (!isAdminRequestAuthorized(request)) {
    return NextResponse.json({ error: "Unauthorized admin request." }, { status: 401 });
  }

  const homeContent = await readAdminHomeContent();

  return NextResponse.json({ homeContent });
}

export async function PUT(request: Request) {
  if (!isAdminRequestAuthorized(request)) {
    return NextResponse.json({ error: "Unauthorized admin request." }, { status: 401 });
  }

  let body: unknown;

  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid home content payload." }, { status: 400 });
  }

  try {
    const homeContent = await writeAdminHomeContent(body);

    return NextResponse.json({ homeContent });
  } catch {
    return NextResponse.json(
      { error: "Home content could not be saved in this environment." },
      { status: 500 },
    );
  }
}
