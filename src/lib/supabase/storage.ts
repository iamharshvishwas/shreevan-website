import "server-only";
import { getSupabaseAdminClient } from "@/lib/supabase/client";

const MEDIA_BUCKET = "admin-media";

export type MediaOrigin = "blog" | "home" | "page";

type UploadAdminMediaInput = {
  origin: MediaOrigin;
  bytes: Buffer;
  filename: string;
  contentType: string;
};

function datedPath(origin: MediaOrigin, filename: string) {
  const now = new Date();
  const yyyy = now.getUTCFullYear();
  const mm = String(now.getUTCMonth() + 1).padStart(2, "0");

  return `${origin}/${yyyy}/${mm}/${filename}`;
}

export async function uploadAdminMedia({ origin, bytes, filename, contentType }: UploadAdminMediaInput) {
  const client = getSupabaseAdminClient();
  const path = datedPath(origin, filename);

  const { error } = await client.storage.from(MEDIA_BUCKET).upload(path, bytes, {
    contentType,
    upsert: false,
  });

  if (error) {
    throw new Error(`Media upload failed: ${error.message}`);
  }

  const { data } = client.storage.from(MEDIA_BUCKET).getPublicUrl(path);

  return { path, publicUrl: data.publicUrl };
}
