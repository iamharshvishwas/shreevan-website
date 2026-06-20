# Shreevan Wellness Platform

Separate Next.js App Router scaffold for the Shreevan Wellness website.

## Current Status

- Home route `/` is set to the finalized Design 5 home page.
- Our Story route `/about-founder` is implemented with founder, positioning and responsible-wellness sections.
- Healing Stories route `/testimonials` is implemented with consent-led story, image and video placeholders.
- Contact route `/contact` is implemented with enquiry channels, Rishikesh location clarity, map slot and general enquiry form.
- Book Consultation route `/book-consultation` is implemented as a multi-step suitability request flow before payment.
- Payment route `/payment` is implemented as a noindex checkout page for approved program bookings; it accepts program/booking query context and is not listed in the sitemap.
- Legal utility routes `/privacy-policy`, `/terms-conditions`, `/refund-policy` and `/wellness-disclaimer` are implemented as launch-ready drafts based on the roadmap.
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

## Important Notes

- The current home uses placeholders where real retreat photography, founder images and testimonials should be added.
- The suitability and consultation forms currently show local confirmation messages; connect them to CRM/WhatsApp/email workflows before launch.
- The payment page intentionally does not collect card data. Program pages can link to `/payment?program={program-slug}&booking={booking-id}` and the submit action should create a secure Stripe/Wise/provider checkout session for the verified booking.
- Legal pages must be reviewed by qualified legal/compliance professionals and updated with final business entity, tax, venue, provider and payment details before accepting bookings.
- When new program, modality or utility pages are implemented, add them to `src/app/sitemap.ts` so the sitemap does not point to unfinished 404 routes.
