# Shreevan Wellness — Website Brain

> Single-source reference for the Shreevan Wellness website codebase. Built from a full crawl of this folder on 2026-07-04. Use this file to orient before any future task (content, SEO, dev, CRM, marketing).
>
> Project root: `~/Documents/Codex/2026-06-16/files-mentioned-by-the-user-c-2/outputs/shreevan-wellness-platform`

---

## 1. Business identity

| Fact | Value |
|---|---|
| Brand | Shreevan Wellness |
| Tagline | Return to Your True Self |
| Founder | Isha Dutta |
| Location (public) | Rishikesh, Uttarakhand, India (near the sacred Ganga landscape) |
| Location (exact) | Shared only with confirmed guests after booking — never to cold leads |
| Primary domain | https://shreevanwellness.com |
| Hosting | **Vercel** (confirmed 2026-07-04). ⚠ File-JSON CMS writes won't persist on Vercel serverless — needs external store before admin panel is used in production |
| Admin domain | https://admin.shreevanwellness.com |
| CRM domain | https://crm.shreevanwellness.com (Veda widget) |
| API domain | https://api.shreevanwellness.com/api/v1 |
| Email | hello@shreevanwellness.com |
| Phone / WhatsApp / socials | Empty in settings (not yet public) |
| Response SLA | Within 24–48 hours |
| Positioning | Premium structured wellness retreats for international guests (US/CA/UK primary) — NOT a spa, hotel, ashram, clinic, or miracle-healing brand |

**One-line description (used sitewide):** "Premium structured wellness retreats in Rishikesh, India for international guests seeking guided reconnection, rhythm and responsible transformation."

**Conversion model: consultation-first.** No cold payment. Flow = free suitability consultation → team fit review → invoice/booking ID → payment. The `/payment` page is noindex and only for invoice-ready guests.

**Target audience:** international visitors (US, Canada, UK), corporate executives, entrepreneurs/founders, high-responsibility professionals, serious seekers, people in life transitions. Group size 12–18 (from business memory).

---

## 2. Programs (the product ladder)

5 durations, same journey, increasing depth. All published & connected in admin.

| # | Program | Route | Duration | Label | Investment |
|---|---|---|---|---|---|
| 1 | 3-Day Ganga Sattva Reset | `/programs/3-day-ganga-reset` | 3 days | — | Confirm after suitability review |
| 2 | 7-Day Ganga Sattva Foundation | `/programs/7-day-foundation` | 7 days | — | Confirm after suitability review |
| 3 | 14-Day Ganga Sattva Transformation | `/programs/14-day-transformation` | 14 days | — | Confirm after suitability review |
| 4 | 28-Day Sattva Ganga Inner Awakening | `/programs/28-day-inner-awakening` | 28 days | **Signature** | **USD 2,200 standard** (min USD 2,000 per business memory) |
| 5 | 60-Day Rishi Tantra Conscious Living Residency | `/programs/60-day-rishi-residency` | 60 days | Advanced | Never quote — escalate to human |

- 28-day is the flagship: ~120–140 guided experiences, arc = Detox/Foundation → Healing/Release → Awakening/Self-discovery → Integration/Life design. Take-home: wellness blueprint, sadhana plan, sattvic recipes, stress toolkit, 90-day integration roadmap.
- 60-day: advanced residency (Body/Mind/Spirit/Life domains; Reset→Heal→Awaken→Embody→Integrate phases). CRM rule: 60-day interest = early human escalation, no price quotes.
- Fit rule: never push the longest program; recommend by readiness/time/health boundaries.
- Naming caution: the 60-day label varies slightly across files — routes.ts says "Lifestyle Transformation Residency", program-content.json says "Conscious Living Residency". Both refer to the same program.
- Common inclusions: guided daily practice (yoga, pranayama, meditation, Yoga Nidra), sattvic vegetarian meals, accommodation + retreat support, workshops, suitability-led booking, integration guidance.

---

## 3. Modalities (educational content layer)

6 modality pages, all defined in `src/lib/content/modalities.ts` (~85KB, the largest content file — hub + per-modality deep pages with sections, care notes, CTAs):

1. Yoga Therapy & Medicine — `/modalities/yoga-therapy`
2. Guided Meditation & Mind Mastery — `/modalities/guided-meditation`
3. Sound Healing & Vibrational Therapy — `/modalities/sound-healing`
4. Panchkarma & Deep Detox — `/modalities/panchkarma-detox`
5. Chakra Opening & Energy Balancing — `/modalities/chakra-opening`
6. Spiritual Sadhanas & Yogic Philosophy — `/modalities/spiritual-sadhanas`

SEO intent split (strict, to avoid cannibalization):
- `/modalities/*` = educational practice intent
- `/programs/*` = commercial/duration intent
- `/journal/*` = questions, comparisons, planning, objections
- `/book-consultation` = conversion intent
- `/payment` = confirmed guests only, never a cold CTA

---

## 4. Site architecture (all routes)

**Core:** `/` (Home), `/about-founder` (Our Story), `/accommodation-inclusions` (Stay & Food), `/testimonials` (Healing Stories), `/journal` (+ `/journal/[slug]`), `/faqs`, `/contact`

**Educational:** `/modalities` + 6 modality pages (above)

**Commercial:** `/programs` hub + 5 program pages (above)

**Transactional:** `/book-consultation` (multi-step suitability flow), `/payment` (**noindex**, blocked in robots.txt)

**Legal:** `/privacy-policy`, `/terms-conditions`, `/refund-policy`, `/wellness-disclaimer`

**Admin:** `/admin` (dashboard), `/admin/login`, `/admin/settings`, `/admin/home`, `/admin/pages`, `/admin/programs`, `/admin/content`, `/admin/seo`, `/admin/blog` (+ `/admin/blog/preview/[slug]`)

Canonical route registry: `src/config/routes.ts` (intents: core/educational/commercial/transactional/legal). Header/footer nav is admin-editable via site-settings.json (header: Home, Our Story, Core Modalities ▾, Immersive Programs ▾, Healing Stories, Stay & Food, Journal, Contact Us; CTA = Book Consultation).

---

## 5. Tech stack & how it runs

- **Next.js (App Router, latest) + React + TypeScript + Tailwind CSS v4** (via `@tailwindcss/postcss`, entry `src/app/globals.css`).
- **No database.** All CMS content persists as JSON files in `data/admin/*.json`. File-based CMS, admin panel writes to these via API routes.
- Run locally: `npm install && npm run dev` → http://localhost:3000. Also `npm run build`, `npm run typecheck`, `npm run lint`.
- **Admin auth:** env vars `SHREEVAN_ADMIN_USER`, `SHREEVAN_ADMIN_PASSWORD`, `SHREEVAN_ADMIN_SESSION_SECRET` (see `.env.example`). Dev fallback: `admin` / `shreevan-admin`. Session = plain cookie `shreevan_admin_session` whose value must equal the session secret (`src/lib/admin/auth.ts`) — simple, worth hardening later.
- **Admin subdomain proxy:** `src/proxy.ts` — requests on `admin.*` host get rewritten to `/admin/*`; unauthenticated admin routes redirect to login. Admin API routes check the cookie via `isAdminRequestAuthorized`.

### Data files → what they drive

| File | Drives | Admin editor |
|---|---|---|
| `data/admin/site-settings.json` | Brand, contact, socials, CRM config, launch/indexing flags, header+footer nav | `/admin/settings` |
| `data/admin/home-content.json` | Every homepage section (hero, proof strip, programs, rhythm, travel, testimonials, consultation, lead form) | `/admin/home` |
| `data/admin/page-content.json` | Per-page SEO + hero seeds (home connected; others seeded) | `/admin/pages` |
| `data/admin/program-content.json` | Program titles, order, labels, outcomes, SEO, highlights, inclusions | `/admin/programs` |
| `data/admin/content-trust.json` | FAQs (6 categories), story/testimonial slots, journal categories + 9 articles, consent standards, media slots | `/admin/content` + `/admin/blog` |

> Blog editing (2026-07-05): `/admin/blog` uses a TipTap rich text editor (`src/components/admin/rich-text-editor/`) writing to `contentHtml` per article; the old block builder is kept behind `SHOW_LEGACY_BLOCK_BUILDER=false` in `admin-blog-panel.tsx`. Public `/journal/[slug]` renders `contentHtml` first, then legacy blocks/body. On Vercel, blog saves use an ephemeral /tmp overlay (stopgap with UI warning) — real persistent storage still pending.
| `data/admin/seo-leads.json` | 26 route-level sitemap/SEO controls (priority, changefreq, focus keyword, QA status), lead routing config, local lead inbox (currently 0 leads) | `/admin/seo` |

Read path: `src/lib/admin/*` (read/write for admin) and `src/lib/site/public-*` (public runtime readers with defaults). Public pages consume admin JSON at runtime (`force-dynamic` on sitemap/robots).

---

## 6. CRM / Veda integration

- `src/components/integrations/crm-widget.tsx` loads two scripts on all **public** (non-admin) pages when `crm.enabled`:
  - `https://crm.shreevanwellness.com/veda-widget.js` (chat widget)
  - `https://crm.shreevanwellness.com/veda-forms.js` (auto form capture)
  - both get `data-api = https://api.shreevanwellness.com/api/v1`
- Public forms carry `data-veda-form` attributes: home suitability, booking enquiry, contact, payment verification, journal subscription. All include WhatsApp/mobile + country code. Admin forms deliberately NOT tagged.
- Suitability form double-writes: internal `/api/leads` (local JSON inbox) + manual POST to `api.shreevanwellness.com/api/v1/intake/form` (keepalive). ⚠ Known risk: duplicate CRM notes when both veda-forms auto-capture and the manual intake call fire for the same enquiry.
- `/api/leads` (`src/app/api/leads/route.ts`): validates name+email+consent, sources = `home-suitability` | `book-consultation` | `contact`, appends to `seo-leads.json`.
- Lead routing config: owner "Shreevan guest care", CRM stage "New suitability request", WhatsApp escalation for confirmed international travellers after email reply.
- Follow-up cadence (playbook): Day 0 ack → Day 1 missing context → Day 3 program comparison + call invite → Day 7 check window → Day 14 close/nurture. No fake scarcity ever.

The wider stack (separate repos, not in this folder): Shreevan CRM + LMS + Veda AI agent. Veda's RAG is generated FROM this folder's `knowledge/rag/` files (see §8).

---

## 7. SEO / AEO setup

- **Dynamic sitemap** (`src/app/sitemap.ts`) and **robots** (`src/app/robots.ts`) — obey admin launch settings (`indexingMode: indexable`, `robotsPolicy: public`, `sitemapEnabled: true`). Robots disallows `/admin/` and `/payment`.
- **Route-level SEO registry** in seo-leads.json: per-route indexable flag, priority (home 1.0, book-consultation 0.86, programs 0.82…), changefreq, focus keyword (e.g. home = "Rishikesh wellness retreats"), QA status (`ready` / `needs-review`).
- **JSON-LD** (`src/lib/schema/site-schema.ts`): Organization, WebSite, LocalBusiness (Rishikesh, priceRange $$$, areaServed US/CA/GB/IN), Breadcrumb, WebPage, ItemList, BlogPosting, Service (programs + modalities), FAQPage. Rendered via `src/lib/schema/json-ld.tsx`.
- **`public/llms.txt`** — curated AI-assistant guide to the site with strict interpretation notes (educational, suitability-led, no medical claims).
- Page metadata helper: `src/lib/seo/page-metadata.ts`; homepage metadata comes from page-content.json at runtime.
- Ahrefs MCP is connected in Claude sessions for SEO analysis of the live domain.

---

## 8. Veda RAG knowledge pack (`knowledge/rag/shreevan-wellness-crm-agent/`)

9 markdown files, v0.1, chunk-by-heading design. **This is the source of truth for what Veda may say.** When facts change (price, venue, refund, gateway), update these files FIRST, then regenerate `server/src/modules/veda/knowledge/shreevan-pack.ts` in the CRM repo (65 entries, tag `pack:shreevan`).

| File | Content |
|---|---|
| `00-agent-operating-rules.md` | Highest priority. Tone, safety boundaries, no-cure/no-diagnosis, payment boundaries, unknown-information rule |
| `01-business-profile.md` | Brand, audience, positioning, routes, conversion model |
| `02-programs-and-fit.md` | Program ladder, fit logic, red flags, recommendation scripts |
| `03-stay-food-travel-location.md` | Rooms (Calm Standard / Premium Comfort / Balcony-View), sattvic food, travel (Delhi → Dehradun/Rishikesh), address privacy |
| `04-booking-payment-and-crm.md` | Consultation-first flow, form fields, payment page rules, CRM labels |
| `05-health-legal-and-policy-boundaries.md` | Disclaimer, privacy, terms, refund rules, insurance |
| `06-faq-answer-bank.md` | 18 CRM-safe canonical answers |
| `07-lead-qualification-playbooks.md` | Lead scoring (high/med/low), routing, escalation, reply templates |
| `08-known-gaps-and-do-not-invent.md` | Everything Veda must NOT invent |

---

## 9. Policies & hard facts (never contradict these)

- **Refund policy (CONFIRMED current version):** registration fee non-refundable; balance due ≥25 days before start; cancel >10 days before start = up to 25% refund of retreat fee paid (excluding reg fee); within 10 days = 0%; no-show = 0%; transfer to another participant possible up to 2 days before, with written approval; early departure/removal = no refund. (A 90%/50% version existed as a draft only — NOT used.)
- **Payment:** methods positioned = international card, Wise/bank transfer, manual invoice. Currencies shown: USD, GBP, CAD, EUR, INR. Gateway live status NOT confirmed — don't claim it's live. Page collects no card data; intent is Stripe/Wise/provider session per verified booking.
- **Pricing:** only the 28-day price ($2,200) is public. Everything else = "confirm after suitability review."
- **Health/legal boundaries:** never medical care/therapy/diagnosis/cure/guaranteed transformation. Health mentions (pregnancy, medication, surgery, eating disorders, mental-health crisis, etc.) → recommend professional advice + suitability call; crisis → immediate human escalation.
- **Do-not-invent list:** legal entity, tax details, exact address, room counts, Wi-Fi speed, transfer costs, visa advice, medical staffing, testimonial results (all current testimonials are PLACEHOLDERS pending consent-approved real stories).

---

## 10. Content inventory

- **FAQs:** 6 categories × 3 = 18 (Program Fit, Booking & Payment, Stay & Food, Travel & Arrival, Health Boundaries, Outcomes & Aftercare). Full answers in content-trust.json + FAQ answer bank.
- **Journal:** 9 published articles, 3 featured (`choose-retreat-duration`, `vacation-vs-retreat`, `rishikesh-preparation`); others: sattvic-living-guide, guided-meditation-first-time, panchkarma-responsible-detox, structure-not-pressure, long-residency-fit, sound-healing-silence. Categories: All, Program Fit, Burnout & Rhythm, Meditation, Sattvic Living, Rishikesh Travel, Detox, Founder Notes. Managed via `/admin/blog` (writes into content-trust.json).
- **Marketing plans** (`docs/marketing/`, all prepared 2026-06-27):
  - `30-day-organic-visibility-content-calendar.md` — no-ads acceleration: indexing signals, AEO answer assets, country trust content (US/UK/CA), daily social, directories.
  - `90-day-organic-search-content-calendar.md` — specialist AEO/GEO/AIO calendar; every topic = search + answer + trust + distribution + conversion asset.
  - `phase-4-01-30-day-master-content-calendar.md` — first 30-day publishing calendar across journal/social/email/FAQ; content rules incl. "direct answer in first 70 words", every high-intent article links to /book-consultation.
- **Images** (`public/images/`): brand logos (10 variants), home (9), programs (3-day + 7-day sets), about/founder (5). 14-day/28-day/60-day program photography missing.

---

## 11. Design system

Direction: **"Sacred Forest, Flowing River, Clear Mind."** Premium via restraint/whitespace, not gold/luxury clichés.
- Forest = primary surfaces/buttons; sand/white = calm backgrounds; mist = soft panels; river = links/focus; clay = selective warm emphasis; gold = decorative accent only.
- Headings sentence case. CTAs action-specific ("Book a consultation").
- Design export reference lives at `../shreevan-wellness-design-system-export` (sibling folder).

---

## 12. Known gaps / pre-launch TODOs (from README + QA notes)

1. Testimonials/stories are placeholders — need consent-approved real guest stories.
2. Founder credentials/photos need real content (`about-founder` QA = needs-review).
3. Real room/food/stay photography and details needed (`accommodation-inclusions` needs-review).
4. Legal pages are launch-ready DRAFTS — need qualified legal review + final entity/tax/venue/payment details.
5. Payment checkout flow not built (page is a verification shell; keep noindex until done).
6. Forms show local confirmations; CRM/WhatsApp/email workflow wiring to be verified end-to-end (duplicate-note risk, §6).
7. Phone/WhatsApp/social links empty in settings.
8. Admin session auth is a static secret cookie — consider hardening.
9. New pages must be added to route registry + sitemap to avoid 404s in sitemap.

---

## 13. Related context (outside this folder)

- **Veda AI agent** (CRM repo): omnichannel (WhatsApp/Email/Call/Chat/Video), self-learning RAG, operating rules injected into system prompt. See memory `project-veda-ai-agent`.
- **Meta Lead Ads** FB webhook built, blocked on app publish (Dev mode).
- **Live Classes** feature (100ms) in CRM/LMS — Phase 1 backend done.
- **Social:** IG bio/content was mixed with unrelated "Ramayan Inn" hotel content by mistake; FB page unlaunched. Audit in memory `project-shreevan-social-media`.
- Owner: Harsh Vishwas (SEO pro, Agra) — solo-built the whole stack.
