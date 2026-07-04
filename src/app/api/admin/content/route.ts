import { NextResponse } from "next/server";
import { isAdminRequestAuthorized } from "@/lib/admin/auth";
import { isContentTrustStorageEphemeral, readAdminContentTrust, writeAdminContentTrust } from "@/lib/admin/content-trust";

export const runtime = "nodejs";

export async function GET(request: Request) {
  if (!(await isAdminRequestAuthorized(request))) {
    return NextResponse.json({ error: "Unauthorized admin request." }, { status: 401 });
  }

  const contentTrust = await readAdminContentTrust();

  return NextResponse.json({ contentTrust });
}

export async function PUT(request: Request) {
  if (!(await isAdminRequestAuthorized(request))) {
    return NextResponse.json({ error: "Unauthorized admin request." }, { status: 401 });
  }

  let body: unknown;

  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid content payload." }, { status: 400 });
  }

  // FAQ/Content & Trust saving is intentionally NOT covered by the blog-only
  // ephemeral /tmp stopgap: it shares this same storage file, so without this
  // early return it would start "succeeding" silently on Vercel with no
  // warning shown in this panel. Keep this route failing exactly as before
  // until it gets its own explicit ephemeral-save UI, or real persistent
  // storage lands.
  if (isContentTrustStorageEphemeral()) {
    return NextResponse.json({ error: "Content could not be saved in this environment." }, { status: 500 });
  }

  try {
    const contentTrust = await writeAdminContentTrust(body);

    return NextResponse.json({ contentTrust });
  } catch {
    return NextResponse.json({ error: "Content could not be saved in this environment." }, { status: 500 });
  }
}
