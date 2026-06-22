# Shreevan Wellness Platform

Separate Next.js App Router scaffold for the Shreevan Wellness website.

## Current Status

- Home route `/` is set to the finalized Design 5 home page and now consumes editable section content from the Home Builder.
- Our Story route `/about-founder` is implemented with founder, positioning and responsible-wellness sections.
- Healing Stories route `/testimonials` is implemented with consent-led story, image and video placeholders.
- Contact route `/contact` is implemented with enquiry channels, Rishikesh location clarity, map slot and general enquiry form.
- Book Consultation route `/book-consultation` is implemented as a multi-step suitability request flow before payment.
- Payment route `/payment` is implemented as a noindex checkout page for approved program bookings; it accepts program/booking query context and is not listed in the sitemap.
- Legal utility routes `/privacy-policy`, `/terms-conditions`, `/refund-policy` and `/wellness-disclaimer` are implemented as launch-ready drafts based on the roadmap.
- Admin Phase 1 is implemented at `/admin` with login protection, logout, dashboard shell, module roadmap cards and `admin.*` subdomain proxy support.
- Admin Phase 2 has started at `/admin/settings` with editable brand, contact, CRM, launch, header navigation and footer settings backed by `data/admin/site-settings.json`.
- Public header, footer, CRM script, root metadata, JSON-LD, `robots.txt` and `sitemap.xml` now consume the admin settings at runtime.
- Admin Phase 3 has started at `/admin/pages` with editable page SEO and hero seed content backed by `data/admin/page-content.json`; the Home page metadata consumes this content at runtime.
- Admin Phase 4 has started at `/admin/programs` with editable program titles, ordering, labels, duration, outcomes, SEO seed content, highlights and inclusions backed by `data/admin/program-content.json`.
- Admin Phase 5 has started at `/admin/content` with editable FAQ answers, story trust markers, journal article seeds and media placeholders backed by `data/admin/content-trust.json`; `/faqs`, `/testimonials` and `/journal` consume published content at runtime.
- Admin Phase 6 has started at `/admin/seo` with route-level sitemap controls, SEO QA notes, lead-routing settings and a local lead inbox backed by `data/admin/seo-leads.json`; public suitability, consultation and contact forms now submit to `/api/leads`.
- Admin Home Builder is implemented at `/admin/home` with section-wise homepage editing, repeatable blocks, media uploads and `data/admin/home-content.json` persistence.
- `sitemap.xml` and `robots.txt` are implemented for currently live routes; `/payment` is blocked from crawling until the secure checkout flow is ready.
- Logo asset is copied into `public/images/brand/shreevan-wellness-logo.png`.
- Tailwind CSS entry is configured through `src/app/globals.css`.
- Organization, LocalBusiness and home Breadcrumb JSON-LD helpers are present.
- Canonical route registry is present in `src/config/routes.ts`, including educational modality routes, commercial program routes and utility/legal nodes.
- The Claude Design export is extracted at `../shreevan-wellness-design-system-export` and has been used as the active design-system reference.

## Design System Notes

- Direction: "Sacred Forest, Flowing River, Clear Mind."
- Premium should come from restraint, whitespace, clarity and credible detail, not heavy gold decoration or luxury cliches.
- Use forest for primary surfaces/buttons, sand and white for calm backgrounds, mist for soft panels, river for links/focus, clay only for selective warm emphasis and gold only as a decorative accent.
- The brand is a premium, professionally managed Indian wellness-retreat experience, not a medical centre, religious ashram, luxury spa vacation or guaranteed-healing brand.
- Headings should use sentence case. CTAs should be action-specific, such as "Book a consultation."

## Run Locally

```bash
npm install
npm run dev
```

Then open:

```txt
http://localhost:3000
```

Admin Phase 1 is available at:

```txt
http://localhost:3000/admin
```

Global Settings are available at:

```txt
http://localhost:3000/admin/settings
```

Home Builder is available at:

```txt
http://localhost:3000/admin/home
```

Pages are available at:

```txt
http://localhost:3000/admin/pages
```

Programs are available at:

```txt
http://localhost:3000/admin/programs
```

Content & Trust is available at:

```txt
http://localhost:3000/admin/content
```

SEO & Leads is available at:

```txt
http://localhost:3000/admin/seo
```

Local development falls back to `admin` / `shreevan-admin` when admin env vars are not set. Production requires:

```bash
SHREEVAN_ADMIN_USER=
SHREEVAN_ADMIN_PASSWORD=
SHREEVAN_ADMIN_SESSION_SECRET=
```

## Important Notes

- The Home Builder keeps placeholders visible until real retreat photography, founder images and testimonials are uploaded.
- The suitability and consultation forms currently show local confirmation messages; connect them to CRM/WhatsApp/email workflows before launch.
- The payment page intentionally does not collect card data. Program pages can link to `/payment?program={program-slug}&booking={booking-id}` and the submit action should create a secure Stripe/Wise/provider checkout session for the verified booking.
- Legal pages must be reviewed by qualified legal/compliance professionals and updated with final business entity, tax, venue, provider and payment details before accepting bookings.
- When new program, modality or utility pages are implemented, add them to `src/app/sitemap.ts` so the sitemap does not point to unfinished 404 routes.
