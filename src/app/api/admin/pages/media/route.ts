import { NextResponse } from "next/server";
import { isAdminRequestAuthorized } from "@/lib/admin/auth";
import { saveAdminMediaUpload } from "@/lib/admin/home-content";

export const runtime = "nodejs";

function isUploadFile(value: FormDataEntryValue | null): value is File {
  return Boolean(value && typeof value === "object" && "arrayBuffer" in value && "name" in value && "size" in value && "type" in value);
}

export async function POST(request: Request) {
  if (!(await isAdminRequestAuthorized(request))) {
    return NextResponse.json({ error: "Unauthorized admin request." }, { status: 401 });
  }

  const formData = await request.formData().catch(() => null);
  const file = formData?.get("file") ?? null;

  if (!isUploadFile(file)) {
    return NextResponse.json({ error: "Upload a valid image or video file." }, { status: 400 });
  }

  try {
    const media = await saveAdminMediaUpload("page", file);
    return NextResponse.json({ media }, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: error instanceof Error ? error.message : "Media upload failed." }, { status: 400 });
  }
}
