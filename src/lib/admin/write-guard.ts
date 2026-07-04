import { NextResponse } from "next/server";

// The admin panel persists to data/admin/*.json and public/images/uploads on
// the local filesystem. On Vercel that filesystem is ephemeral/read-only, so
// saves would silently vanish. Until persistent storage exists, content is
// authored locally and published by redeploying (git push).
export function adminWritesDisabledResponse() {
  const onVercel = process.env.VERCEL === "1";
  const writesAllowed = process.env.SHREEVAN_ADMIN_ALLOW_WRITES === "true";

  if (!onVercel || writesAllowed) {
    return null;
  }

  return NextResponse.json(
    {
      error:
        "Admin editing is disabled on this deployment. Content is file-based and does not persist on Vercel — edit locally and redeploy, or configure persistent storage first.",
    },
    { status: 503 },
  );
}
