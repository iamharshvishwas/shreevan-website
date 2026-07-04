import { NextResponse } from "next/server";
import { isAdminRequestAuthorized } from "@/lib/admin/auth";
import { adminWritesDisabledResponse } from "@/lib/admin/write-guard";
import { readAdminProgramContent, writeAdminProgramContent } from "@/lib/admin/program-content";

export const runtime = "nodejs";

export async function GET(request: Request) {
  if (!(await isAdminRequestAuthorized(request))) {
    return NextResponse.json({ error: "Unauthorized admin request." }, { status: 401 });
  }

  const programContent = await readAdminProgramContent();

  return NextResponse.json({ programContent });
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
    return NextResponse.json({ error: "Invalid program content payload." }, { status: 400 });
  }

  try {
    const programContent = await writeAdminProgramContent(body);

    return NextResponse.json({ programContent });
  } catch {
    return NextResponse.json(
      { error: "Program content could not be saved in this environment." },
      { status: 500 },
    );
  }
}
