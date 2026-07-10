// Single source of truth for "is this request on the admin.* subdomain".
// Used by proxy.ts (routing), robots.ts (crawler policy) and layout.tsx
// (third-party script gating) -- keeping this in one place is the fix for
// the bug where robots.ts and the analytics scripts each independently
// forgot to check the host, silently exposing the admin panel.
export function isAdminHostname(hostHeader: string | null | undefined) {
  const hostname = hostHeader?.split(":")[0]?.toLowerCase() ?? "";

  return hostname.startsWith("admin.");
}
