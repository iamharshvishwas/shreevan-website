// Cache tags for public content readers. Public pages read through
// unstable_cache keyed by these tags; admin writes call revalidatePublicContent
// to invalidate the affected tag, so a save shows up on the public site
// immediately while every other request is served from cache (no DB round-trip).
export const CACHE_TAGS = {
  settings: "shreevan:settings",
  home: "shreevan:home",
  pages: "shreevan:pages",
  programs: "shreevan:programs",
  contentTrust: "shreevan:content-trust",
  seo: "shreevan:seo",
} as const;

export type PublicCacheTag = (typeof CACHE_TAGS)[keyof typeof CACHE_TAGS];

// revalidateTag is a Next server-runtime API. It is imported lazily and guarded
// so this module stays safe to import from non-Next contexts (e.g. the one-time
// migration script, which imports the admin libs that call this).
//
// Next 16 requires a cache profile as the second argument in Route Handlers;
// "max" gives stale-while-revalidate semantics (serve the old value once, fetch
// fresh in the background). updateTag() would be single-arg but is Server-Action
// only, so revalidateTag is the correct call from our POST/PUT handlers.
export async function revalidatePublicContent(...tags: PublicCacheTag[]) {
  try {
    const { revalidateTag } = await import("next/cache");

    for (const tag of tags) {
      revalidateTag(tag, "max");
    }
  } catch {
    // Not running inside a Next request (e.g. a standalone script) — no cache to bust.
  }
}
