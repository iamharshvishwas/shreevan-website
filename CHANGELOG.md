# Changelog — Shreevan Wellness Website

All audit-loop fixes are logged here. Format per AUDIT_LOOP.md: what was wrong, why, what changed, how verified.

## [Audit] 2026-07-04 — branch `audit/full-review-2026-07-04`

### Phase 0 — Baseline & Project Map (delta vs brain.md)

- **Toolchain (actual installed versions):** Next.js 16.2.9 (Turbopack), React 19.2.7, TypeScript 6.0.3, Tailwind 4.3.1, Node v22.22.3, npm 10.9.8. `package.json` declares everything as `"latest"`; the lockfile pins the real versions.
- **Baseline results:** `typecheck` ✅ clean · `build` ✅ clean (28 pages generated) · `lint` ❌ broken (`next lint` was removed in Next 16; ESLint not installed) · `npm audit` = 2 moderate (postcss <8.5.10 XSS advisory, nested inside `next` itself; npm's suggested "fix" is a nonsense downgrade to next@9).
- **Pre-existing uncommitted WIP found on `main`** (36 files): admin blog module (`/admin/blog`, `/api/admin/blog/*`), security headers + 25 redirects in `next.config.ts`, page metadata edits, content-trust extensions. Snapshotted as-is in commit `a327c0d` on the audit branch; `main` untouched.
- **Notable:** every route builds as dynamic (ƒ) — zero static pages; all page views hit a serverless function on Vercel.
- **Deployment target confirmed: Vercel** → file-based JSON CMS (`data/admin/*.json`) will not persist admin writes in production. Logged as ARCH-01 (Critical, needs Harsh's decision).

### Fixes

<!-- Individual fix entries appended below as the loop progresses. -->

#### SEC-01 — Admin session cookie was the raw session secret (High → Fixed, commit 5f99912)
- **Where:** `src/lib/admin/auth.ts`, `src/app/api/admin/login/route.ts:38-46` (pre-fix), `src/proxy.ts:45`, 10 admin API routes.
- **Observed:** cookie value = `SHREEVAN_ADMIN_SESSION_SECRET` verbatim; validation `sessionValue === sessionSecret` (no server-side expiry, non-constant-time). A leaked cookie = permanent admin credential.
- **Root cause:** Phase-1 admin scaffold used the simplest possible session model and was never hardened.
- **Fix:** cookie now holds `expiry.HMAC-SHA256(secret, "shreevan-admin-session:"+expiry)` (Web Crypto, Node+Edge compatible), validated with constant-time compare + 8h server-side expiry; credential check also constant-time. 20 call sites made async.
- **Verified:** typecheck + production build clean; E2E login re-test in Phase 1C.

#### SEC-02 — No rate limiting on login and public lead API (High → Fixed, commit 2503e7a)
- **Where:** `src/app/api/admin/login/route.ts`, `src/app/api/leads/route.ts`; new `src/lib/security/rate-limit.ts`.
- **Observed:** unlimited brute-force attempts on admin login; unlimited spam submissions into the lead store.
- **Root cause:** no abuse controls were ever added to the API layer.
- **Fix:** in-memory fixed-window limiter — login 5/min/IP, leads 10/10min/IP, 429 + Retry-After. Limitation documented: per-instance on Vercel (best-effort damping, not a hard global limit).
- **Verified:** typecheck + build clean; behavior test in Phase 1C.

#### SEC-03 — Unbounded lead field lengths (Medium → Fixed, commit 6069e3a)
- **Where:** `src/app/api/leads/route.ts` `stringValue()`.
- **Observed:** a single request could write arbitrarily large strings into `data/admin/seo-leads.json`.
- **Fix:** short fields capped at 200 chars, free-text (message/goal/health) at 2000.
- **Verified:** typecheck clean.

#### SEC-06 — README documented a fallback admin login that doesn't exist (Low/doc → Fixed, commit 4018ceb)
- **Observed:** README:92 claimed `admin`/`shreevan-admin` fallback; code returns 500 when env vars are unset.
- **Fix:** README now matches code.

#### SEC-04 — Security headers (Verified present, no fix needed)
- CSP + HSTS + X-Frame-Options + Referrer-Policy + Permissions-Policy + nosniff already added in the pre-audit WIP (`next.config.ts:24-56`). Note: `script-src` includes `'unsafe-inline' 'unsafe-eval'` to accommodate GTM/Next runtime — accepted trade-off; nonce-based CSP is a future hardening item.

#### SEC-05 — Lead PII stored in git-tracked JSON (Medium → **Needs Harsh's decision**)
- **Where:** `data/admin/seo-leads.json` (git-tracked; leads incl. optional health context append here).
- **Risk:** local dev leads can end up committed to git history; health context is sensitive data in plaintext.
- **Options:** (a) move lead inbox to an untracked file, (b) external store (fixes ARCH-01 too), (c) accept for now (0 leads currently). Deferred to Phase 3 decision list.

#### SEC-07 — fs error messages pass through on admin media upload failures (Low → Deferred)
- **Where:** `src/app/api/admin/{blog,home}/media/route.ts` catch blocks return `error.message`.
- **Reason deferred:** routes are admin-auth-gated; disclosure value negligible. Revisit if upload code changes.

#### SEC-08 — npm audit: 2 moderate (postcss <8.5.10, nested in next@16.2.9) (Deferred)
- **Reason deferred:** advisory concerns CSS stringify XSS when processing untrusted CSS — not our usage (own CSS at build time). npm's suggested fix (`next@9.3.3`) is a breaking mis-resolution. Action: pick up the next Next.js patch release.

#### Git history secrets scan — clean
- No `.env`/key files ever committed; no hardcoded credential patterns in the last 50 revisions.

#### ARCH-01 — File-JSON CMS cannot persist on Vercel (Critical → **Needs Harsh's decision**)
- **Where:** all writes in `src/lib/admin/*.ts` target `data/admin/*.json`; hosting confirmed as Vercel.
- **Observed:** Vercel serverless filesystems are ephemeral — admin panel saves, uploads (`public/images/uploads/*`) and lead-inbox appends will silently vanish (or 500 on read-only paths) in production.
- **Options:** (a) external store (Vercel Blob/KV, Supabase — Supabase MCP already available), (b) treat admin as local-only authoring + redeploy-to-publish workflow, (c) move hosting to a VPS. Deferred to Phase 3 decision list; too large/architectural for an unapproved audit fix.

#### ARCH-02 — 60-day program name inconsistent across the site (Medium → Fixed, commit fcaa3ea)
- Page H1/program-content/RAG say "Conscious Living Residency"; routes.ts, header+footer nav labels, llms.txt, modalities.ts and one FAQ answer said "Lifestyle Transformation Residency". Aligned all 7 occurrences to the canonical name (route path untouched).
- **Verified:** JSON parse OK, typecheck + build clean.

#### ARCH-03 — Lint gate was dead (High/tooling → Fixed, commit 3ee41a2)
- `next lint` was removed in Next 16 and ESLint was never installed, so `npm run lint` errored since the Next 16 upgrade. Installed eslint 9 + eslint-config-next flat config, script now `eslint .`.
- Fixed surfaced errors: 6 unescaped JSX quotes (typographic now), setState-in-effect in `crm-widget.tsx:17` (→ `useSyncExternalStore`, same load behavior).
- **Verified:** lint 0 errors / 28 warnings, typecheck + build clean.

#### ARCH-04 — All dependencies pinned to "latest" (Medium → Fixed, commit 51df97a)
- Fresh installs (e.g., Vercel builds) could silently jump majors. Pinned to caret ranges of build-verified versions (next ^16.2.9, react ^19.2.7, etc.).
- **Verified:** reinstall + typecheck + build clean.

#### ARCH-05 — Structure review (no fix needed)
- `src/app` / `components` / `lib/admin` vs `lib/site` / `config` separation is consistent; admin API routes share a uniform auth+error shape; no tracked build artifacts (`.next/`, `tsbuildinfo`, `.DS_Store` all untracked). Unused-asset sweep deferred to PERF backlog (low value).
