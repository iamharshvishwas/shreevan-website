import { NextResponse } from "next/server";
import { isAdminRequestAuthorized } from "@/lib/admin/auth";
import { adminWritesDisabledResponse } from "@/lib/admin/write-guard";
import { readAdminContentTrust, writeAdminContentTrust } from "@/lib/admin/content-trust";

export const runtime = "nodejs";

export async function GET(request: Request) {
  if (!(await isAdminRequestAuthorized(request))) {
    return NextResponse.json({ error: "Unauthorized admin request." }, { status: 401 });
  }

  const contentTrust = await readAdminContentTrust();

  return NextResponse.json({ contentTrust });
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
    return NextResponse.json({ error: "Invalid content payload." }, { status: 400 });
  }

  try {
    const contentTrust = await writeAdminContentTrust(body);

    return NextResponse.json({ contentTrust });
  } catch {
    return NextResponse.json({ error: "Content could not be saved in this environment." }, { status: 500 });
  }
}
