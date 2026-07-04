# Shreevan Wellness Frontend URL Crawl Map

Last updated: 2026-07-04

Primary production host:
`https://www.shreevanwellness.com`

## Purpose

This document lists the public frontend URLs that users can access on the Shreevan Wellness website.
It excludes admin routes, API routes, and internal-only paths.

Use this file for:

- crawl planning
- internal-link planning
- Search Console tracking
- sitemap review
- index/noindex review
- content cluster mapping

## Canonical Host Rule

Use `https://www.shreevanwellness.com` as the canonical public host for crawl planning and reporting.

## URL Index

| URL | Page Type | Intent | Index Status | Crawl Priority | Notes |
| --- | --- | --- | --- | --- | --- |
| `/` | Home | Core / Commercial | Index | Highest | Main entry page |
| `/about-founder` | Brand page | Trust | Index | High | Founder credibility page |
| `/accommodation-inclusions` | Brand page | Trust / Commercial assist | Index | High | Stay, inclusions, experience proof |
| `/testimonials` | Brand page | Trust / Conversion assist | Index | High | Healing stories |
| `/journal` | Hub page | Educational | Index | High | Journal listing page |
| `/faqs` | Support page | Educational / Trust | Index | High | Search intent capture page |
| `/contact` | Contact page | Transactional / Trust | Index | Medium | Contact and location clarity |
| `/modalities` | Hub page | Educational | Index | Highest | Educational modality hub |
| `/modalities/yoga-therapy` | Detail page | Educational | Index | High | Modality detail page |
| `/modalities/guided-meditation` | Detail page | Educational | Index | High | Modality detail page |
| `/modalities/sound-healing` | Detail page | Educational | Index | High | Modality detail page |
| `/modalities/panchkarma-detox` | Detail page | Educational | Index | High | Modality detail page |
| `/modalities/chakra-opening` | Detail page | Educational | Index | High | Modality detail page |
| `/modalities/spiritual-sadhanas` | Detail page | Educational | Index | High | Modality detail page |
| `/programs` | Hub page | Commercial | Index | Highest | Program comparison / commercial hub |
| `/programs/3-day-ganga-reset` | Detail page | Commercial | Index | Highest | Entry-level program page |
| `/programs/7-day-foundation` | Detail page | Commercial | Index | Highest | Core commercial program page |
| `/programs/14-day-transformation` | Detail page | Commercial | Index | Highest | Core commercial program page |
| `/programs/28-day-inner-awakening` | Detail page | Commercial | Index | Highest | Flagship commercial program page |
| `/programs/60-day-rishi-residency` | Detail page | Commercial | Index | Highest | Premium long-stay page |
| `/book-consultation` | Conversion page | Transactional | Index | Highest | Primary conversion page |
| `/payment` | Utility page | Transactional | Noindex | Low | Payment step only |
| `/privacy-policy` | Legal page | Legal / Trust | Index | Low | Legal support page |
| `/terms-conditions` | Legal page | Legal / Trust | Index | Low | Legal support page |
| `/refund-policy` | Legal page | Legal / Trust | Index | Low | Legal support page |
| `/wellness-disclaimer` | Legal page | Legal / Trust | Index | Low | Legal support page |

## Dynamic Public URLs

These are public-facing but generated from content.

| URL Pattern | Page Type | Intent | Index Status | Notes |
| --- | --- | --- | --- | --- |
| `/journal/[slug]` | Article page | Educational | Index | Exact URLs depend on published journal article slugs |

## Crawl Order Recommendation

Recommended crawl / monitoring priority:

1. `/`
2. `/programs`
3. all `/programs/*`
4. `/book-consultation`
5. `/modalities`
6. all `/modalities/*`
7. `/about-founder`
8. `/accommodation-inclusions`
9. `/testimonials`
10. `/journal`
11. `/faqs`
12. `/contact`
13. legal pages
14. `/payment` as noindex

## Cluster Map

### Core Trust / Brand

- `/`
- `/about-founder`
- `/accommodation-inclusions`
- `/testimonials`
- `/contact`

### Commercial Program Cluster

- `/programs`
- `/programs/3-day-ganga-reset`
- `/programs/7-day-foundation`
- `/programs/14-day-transformation`
- `/programs/28-day-inner-awakening`
- `/programs/60-day-rishi-residency`
- `/book-consultation`

### Educational Modality Cluster

- `/modalities`
- `/modalities/yoga-therapy`
- `/modalities/guided-meditation`
- `/modalities/sound-healing`
- `/modalities/panchkarma-detox`
- `/modalities/chakra-opening`
- `/modalities/spiritual-sadhanas`

### Journal / Search Intent Cluster

- `/journal`
- `/journal/[slug]`
- `/faqs`

### Legal / Compliance Cluster

- `/privacy-policy`
- `/terms-conditions`
- `/refund-policy`
- `/wellness-disclaimer`

### Utility / Restricted SEO Value

- `/payment`

## Indexing Notes

- `payment` should remain `noindex`.
- Program pages should receive the strongest internal links from the home page, modality pages, journal pages, and CTA sections.
- Modality pages should target educational intent and link contextually to the most relevant program pages.
- Journal pages should support topical authority and push qualified users toward either program pages or the consultation page.
- Legal pages should remain accessible and indexable unless legal or strategy requirements change.

## Source of Truth

This map was compiled from:

- `src/config/routes.ts`
- public Next.js app routes in `src/app`

