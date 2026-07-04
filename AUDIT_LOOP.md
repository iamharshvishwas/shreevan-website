# Shreevan Wellness — Full Codebase Audit → Fix → Verify → Deploy Loop Framework

> Version: 1.1 (project-adapted). Paste this entire file into the coding agent as its operating instructions. The agent should treat this as binding until it explicitly reports "loop complete" in Phase 3.

## CONTEXT (pre-filled — verified 2026-07-04)

- **Project name:** Shreevan Wellness website
- **Project root path:** `/Users/harshvishwas/Documents/Codex/2026-06-16/files-mentioned-by-the-user-c-2/outputs/shreevan-wellness-platform`
- **Tech stack:** Next.js (App Router, latest) + React + TypeScript + Tailwind CSS v4 (`@tailwindcss/postcss`). **No database** — file-based JSON CMS in `data/admin/*.json`. Package manager: npm. Scripts: `dev`, `build`, `start`, `lint`, `typecheck`.
- **Environment this runs against:** local (this folder). Live site: https://shreevanwellness.com
- **Deployment target:** **Vercel** (confirmed by Harsh, 2026-07-04). ⚠ Consequence: Vercel's serverless filesystem is ephemeral/read-only — admin panel writes to `data/admin/*.json` will NOT persist in production. This is a confirmed Critical architecture finding (needs external store: Vercel Blob/KV, Supabase, or similar).
- **Git:** already initialized with commit history. Do NOT re-init.
- **Prior knowledge:** `brain.md` in the project root is a verified full-crawl reference (business facts, routes, data files, CRM wiring, SEO setup, known gaps). Read it FIRST in Phase 0.

## ROLE

You are acting as a senior full-stack engineer + security auditor + QA lead, working autonomously on the codebase at the path above. Run a structured, iterative **Detect → Diagnose → Fix → Verify → Log** loop across the entire project until every category below has been fully audited and every issue found is either resolved or explicitly deferred with a stated reason.

Do not summarize or guess — actually open and read the files. Every claim about a problem must point to a real file path and line number.

## NON-NEGOTIABLE GROUND RULES

1. **Branch first.** Create a new git branch before touching anything: `audit/full-review-<date>`. Never work directly on the default branch. (Git already exists — do not re-initialize.)
2. **No fabricated fixes.** Never claim to fix something you haven't located and reproduced in the code. Cite exact file + line.
3. **Secrets:** if any secret/API key/password is found hardcoded or in git history, move it to `.env`, ensure `.env` is gitignored, and flag the credential for rotation. (Baseline verified: only `.env.example` with empty placeholders is committed; admin creds come from `SHREEVAN_ADMIN_USER` / `SHREEVAN_ADMIN_PASSWORD` / `SHREEVAN_ADMIN_SESSION_SECRET` env vars.)
4. **One issue at a time.** After each individual fix: re-run `npm run typecheck && npm run lint && npm run build`, confirm nothing broke, THEN move on. No batched uncontrolled sweeps.
5. **No production deploy** without presenting the final report and getting explicit go-ahead from Harsh.
6. **Maintain `CHANGELOG.md`** (create it) — log every fix: what was wrong, why, what changed, how verified.

### Project-specific guardrails (additions — do not skip)

7. **`data/admin/*.json` is live CMS DATA, not code.** Do not reformat, "clean up", deduplicate, or restructure these files as part of code hygiene. Before any change that writes to them, copy the whole `data/` folder to `data-backup-<date>/` (gitignored) or verify it's committed. Losing these files = losing the website's content.
8. **Integration contracts are frozen.** Do not rename/remove without explicit approval:
   - `data-veda-form` attributes on public forms (Veda CRM auto-capture depends on them);
   - the two CRM script tags in `src/components/integrations/crm-widget.tsx` (veda-widget.js, veda-forms.js) and their `data-api` attribute;
   - the `/api/leads` request/response shape and the manual POST to `https://api.shreevanwellness.com/api/v1/intake/form`;
   - route paths in `src/config/routes.ts` (they are indexed, in the sitemap, and referenced by the CRM knowledge pack).
9. **Legal pages are read-only for meaning.** `/privacy-policy`, `/terms-conditions`, `/refund-policy`, `/wellness-disclaimer` are drafts pending qualified legal review. You may fix markup/a11y/typos; you may NOT change legal meaning, refund percentages, or policy terms. Flag concerns instead.
10. **Responsible-wellness language is a compliance constraint.** No copy edit may introduce cure/treatment/guaranteed-transformation claims. When touching any user-facing text, keep the language rules in `knowledge/rag/shreevan-wellness-crm-agent/00-agent-operating-rules.md`.
11. **Baseline before first fix.** Before Phase 1, record a green (or documented-red) baseline: `npm run typecheck`, `npm run lint`, `npm run build`, plus a dev-server boot with the homepage loading. Every later verification compares against this baseline.

## PHASE 0 — Inventory (do this first, always)

- Read `brain.md` (project root) — it already maps structure, routes, data files, CRM wiring, SEO setup, and known gaps. Verify its claims rather than re-deriving from scratch; note anything that has drifted.
- Map the folder/file structure; confirm framework, package manager, build tool.
- List all dependencies and versions; flag anything deprecated, abandoned, or vulnerable. **Known issue to confirm:** every dependency in `package.json` is pinned to `"latest"` — no lockfile-independent reproducibility. Evaluate pinning real versions.
- Identify entry points, routing (`src/app/*`, `src/config/routes.ts`), config/env files, and third-party integrations (Veda CRM widget + intake API; no database).
- Output a short "Project Map" summary (delta vs. brain.md) before Phase 1.

## PHASE 1 — Category-by-category audit loop

Run separately per category: scan whole codebase → list every issue with the Issue Record template → fix in priority order (Critical > High > Medium > Low) → verify → log in CHANGELOG → next category.

### A. Security

- Hardcoded secrets in code or git history.
- Input validation & sanitization on all forms, query params, uploaded files (admin media upload routes: `api/admin/blog/media`, `api/admin/home/media`).
- XSS, CSRF, SQL/NoSQL injection surfaces (no DB, but JSON-file writes via admin APIs = injection/path-traversal surface).
- Auth & session handling. **Seeded findings to verify and fix:**
  - `src/lib/admin/auth.ts` — session cookie value is compared with `===` directly against the static session secret. No expiry, no signing, no per-session token, non-constant-time comparison. Evaluate signed/expiring session tokens.
  - Dev fallback credentials `admin` / `shreevan-admin` — confirm they can never activate when `NODE_ENV=production`.
  - Cookie flags: `Secure` only in production (`isSecureAdminCookie`) — verify `HttpOnly`, `SameSite` in the login route.
- Dependency vulnerabilities: run `npm audit` and record output.
- Security headers (CSP, HSTS, X-Frame-Options, Referrer-Policy) — likely missing from `next.config.ts`; add sensible defaults without breaking the CRM widget scripts (crm.shreevanwellness.com must stay allowed in CSP).
- File upload restrictions (types, size, path traversal) on admin media endpoints.
- **Rate limiting / brute-force protection** on `/api/admin/login` and `/api/leads` — seeded finding: none exists.
- Verbose errors / stack traces in production responses.
- Personal data: leads (name, email, phone, country, optional health context) are stored in plaintext JSON in `data/admin/seo-leads.json`. Assess exposure risk (is `data/` reachable from the web build? committed to git?), retention, and whether the consent flow matches the privacy policy.

### B. Architecture & Code Hierarchy

- Folder structure consistency (`src/app` routes, `src/components`, `src/lib/admin` vs `src/lib/site`, `src/config`).
- Separation of concerns; naming consistency.
- Duplicate/dead code, unused files/assets (check unused images in `public/images`, `tsconfig.tsbuildinfo` committed, `.next/` artifacts in the folder).
- Config from env vs hardcoded (domains are in `data/admin/site-settings.json` — acceptable as CMS data; verify no per-environment hardcoding elsewhere).
- API design consistency across `src/app/api/*` (error shapes, status codes, auth checks on every admin route).
- Known naming inconsistency to resolve or document: the 60-day program is "Lifestyle Transformation Residency" in `src/config/routes.ts` but "Conscious Living Residency" in `data/admin/program-content.json`.

### C. Functionality

- Every route in `src/config/routes.ts` + all admin routes load without console/server errors (use the local dev server; verify with browser tooling, not assumptions).
- All forms validate client- and server-side and submit end-to-end: home suitability, book-consultation multi-step, contact, journal subscription, payment verification, admin login, every admin panel save. **Watch the known duplicate-lead risk** (veda-forms auto-capture + manual intake POST for the same submission).
- Broken links / 404s (nav JSON in site-settings, footer links, journal `relatedHref`s, sitemap entries).
- Responsive behavior at mobile/tablet/desktop breakpoints.
- Cross-browser: verify in the available Chromium tooling; code-level checks for obvious Safari/Firefox hazards. Full Safari/Firefox passes go on the manual-test list for Harsh — do not claim them verified.
- Edge cases: empty states (0 leads, empty journal category), failed network on form submit, invalid input, double-submits.
- Graceful error handling instead of blank screens.

### D. Performance

- Bundle size, code-splitting/lazy-loading (`src/lib/content/modalities.ts` is ~85KB of content imported into pages — check what ships to the client).
- Image optimization: several JPEG/PNG heroes exist alongside WebP — check sizes, use `next/image` where missing, correct formats.
- Caching headers; note `force-dynamic` on sitemap/robots is intentional (admin-driven), don't "optimize" it away.
- Render-blocking resources; third-party script loading strategy (CRM widget is `afterInteractive` — keep).
- Run Lighthouse before and after fixes on `/`, one program page, one modality page; record score deltas.

### E. SEO & Accessibility

- Meta tags, `sitemap.xml`, `robots.txt`, JSON-LD — largely built (see brain.md §7); verify correctness, not existence: canonical URLs, no sitemap entries for noindex routes, FAQPage schema matches visible FAQ content.
- `llms.txt` consistency with actual routes.
- Alt text on all images, semantic HTML, keyboard navigation (dropdown nav menus especially), focus states, WCAG AA contrast against the forest/sand/mist palette.
- Heading hierarchy per page; sentence-case headings per the design system.

## ISSUE RECORD TEMPLATE (use for every single finding)

```
Issue ID: SEC-01 / ARCH-03 / FUNC-05 / PERF-02 / SEO-01 ...
Category:
File(s) / Location (path + line numbers):
Severity: Critical / High / Medium / Low
What's wrong (what you actually observed):
Root cause (why this happened, not just what):
Fix applied:
Verification performed & result:
Status: Fixed / Deferred (state the reason) / Needs your decision
```

## PHASE 2 — Full regression pass

After all categories: run full `typecheck` + `lint` + `build`, boot the dev server, and manually walk every core flow (homepage, program pages, modality pages, journal, all public forms, admin login + every admin panel save/load). Confirm nothing that worked at baseline is broken.

Then run one more full Phase 1 sweep focused on **Critical/High only** (a fix-induced regression hunt). The loop is complete only when a full pass turns up zero new Critical/High issues.

## PHASE 3 — Deployment readiness report

Before deploying anywhere, present one consolidated report containing:

- Total issues by category and severity; fixed vs deferred (with reasons).
- Items needing Harsh's decision (must include: deployment target confirmation; dependency pinning policy; session-auth redesign approval if not already approved; anything touching legal pages or CRM contracts).
- Pre-deploy checklist:
  - [ ] Build passes cleanly
  - [ ] All required env vars set for target (`SHREEVAN_ADMIN_USER`, `SHREEVAN_ADMIN_PASSWORD`, `SHREEVAN_ADMIN_SESSION_SECRET`, + any added during audit)
  - [ ] No console/server errors on core pages
  - [ ] No secrets committed to git
  - [ ] `data/admin/` content backed up + rollback point exists (git tag)
  - [ ] Persistent storage plan for `data/admin/*.json` confirmed for the target host (serverless hosts like Vercel have read-only/ephemeral filesystems — admin panel writes will NOT persist there without an external store; this is a launch blocker to resolve, not a footnote)

Only after explicit confirmation: deploy, then run a smoke test on the live URL (homepage, one program page, one form submit, admin login) and report results.
