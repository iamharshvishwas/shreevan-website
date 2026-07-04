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
