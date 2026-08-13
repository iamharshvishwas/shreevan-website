# Yoga Therapy Retreat in Rishikesh - Corrected On-Page Plan

Page: `/modalities/yoga-therapy`  
Target URL: `https://shreevanwellness.com/modalities/yoga-therapy`  
Prepared: 2026-08-13  
Goal: SEO + AEO + GEO + AIO + SXO with easy readability and responsible wellness claims.

## 1. Current Page Check

The live page already has a strong structure: hero, quick answer, education guide, daily rhythm, suitability, related programs, FAQ and final CTA.

The issue is not structure alone. The main issue is content density. The current page reads around Flesch 44, which is fairly difficult. For a mobile-heavy international audience, this should move closer to Flesch 60+.

## 2. Final Keyword Direction

Primary keyword:

`yoga therapy retreat in Rishikesh`

Important supporting keywords:

| Keyword | Where to use |
|---|---|
| `yoga therapy retreat in Rishikesh` | Meta title, H1, hero answer, one H2, one FAQ, final CTA |
| `yoga therapy in Rishikesh` | Meta description, body copy, FAQ answer |
| `yoga therapy retreat` | Hero, article sections, related program copy |
| `yoga therapy for beginners` | Suitability section, FAQ, quick answer |
| `yoga therapy vs yoga` | New comparison section |
| `gentle yoga retreat in Rishikesh` | Body copy and suitability copy |
| `yoga wellness retreat practice` | Benefits/practice elements section |

Keyword use must stay natural. The page should not chase density by repeating the same phrase in every paragraph. That can hurt AI visibility and user trust.

## 3. Meta Plan

Title tag:

`Yoga Therapy Retreat in Rishikesh | Gentle & Guided | Shreevan`

Meta description:

`Explore gentle yoga therapy in Rishikesh at Shreevan Wellness. Learn breath-led movement, posture awareness and daily rhythm in a non-medical retreat setting.`

Canonical:

`https://shreevanwellness.com/modalities/yoga-therapy`

Open Graph title and description should match the meta title and description.

## 4. Heading Plan

Use exactly one H1:

`Yoga Therapy Retreat in Rishikesh`

Hero H2/tagline:

`Gentle Yoga for Breath, Posture and Daily Rhythm`

Reason: Gemini's `Rebuild Body Literacy, Breath, and Daily Rhythm` is meaningful, but "body literacy" is less common for general visitors. The simpler version is better for readability and mobile users.

## 5. Section Implementation Decision

| Current area | Action | Reason |
|---|---|---|
| Meta title and description | Rewrite | Current title is weaker for the chosen Rishikesh retreat keyword. |
| Hero | Rewrite | H1 needs exact primary keyword. Hero copy should be simpler. |
| Quick answer | Rewrite | Good section, but needs direct AEO-style answer with easier sentences. |
| Education guide | Rewrite | Current content is useful but too dense. Keep the section, simplify copy. |
| Comparison content | Add new section | This is the main content gap. Add `Yoga therapy vs a regular yoga class`. |
| Daily rhythm cards | Rewrite | Keep the section, make cards shorter and more scannable. |
| Suitability | Rewrite | Keep the section. Add beginner and caution terms clearly. |
| Related programs | Keep, minor copy update | Existing internal linking is useful. Anchor text should include retreat terms naturally. |
| FAQ | Rewrite and add one FAQ | FAQ schema must match visible FAQ text exactly. Add `What is yoga therapy?`. |
| Final CTA | Rewrite | Include primary keyword once, but keep conversion copy calm. |

## 6. New Section Required

Add one new section after the education guide or before daily rhythm:

H2:

`Yoga therapy vs a regular yoga class`

Purpose:

- Captures `yoga therapy vs yoga`.
- Helps AEO and AI Overview extraction.
- Helps users understand why the retreat practice is different.
- Adds useful content without stuffing the primary keyword.

Preferred format:

A real HTML table is best. If layout work needs to stay lighter, use cards with the same rows.

Rows:

| Aspect | Yoga therapy at Shreevan | Regular yoga class |
|---|---|---|
| Main goal | Breath, posture awareness and daily rhythm | One guided class or sequence |
| Pace | Slow, modifiable and consent-aware | Usually group-paced |
| Beginner fit | Built for beginners and returners | Depends on class level |
| Focus | How practice supports the whole retreat day | What happens on the mat |
| Boundary | Wellness education, not treatment | Fitness, yoga learning or general practice |

## 7. Schema Plan

Keep or implement:

- `WebPage`
- `Service` or `EducationalService`
- `FAQPage`
- `BreadcrumbList`
- Site-wide `Organization`, `WebSite`, `LocalBusiness`

Do not add:

- `MedicalAudience`

Reason: this page is non-clinical wellness education. `MedicalAudience` can make the page look more medical than the actual service. That is not ideal for YMYL safety.

## 8. Claim Safety

Avoid:

- guaranteed stress relief
- burnout recovery as a clinical claim
- pain cure
- treatment language
- physiotherapy replacement language
- medical yoga treatment language

Use safer wording:

- may support general well-being
- supports stress awareness
- helps build routine
- may help you notice breath and tension patterns
- non-medical retreat setting
- consult a qualified professional for injury, pain or health conditions

## 9. Readability Standard

Target:

- Flesch Reading Ease: 60+
- Average sentence length: under 15 words where practical
- Paragraph length: 1 to 3 short sentences
- Avoid heavy phrases unless explained simply

Words to simplify:

| Harder phrase | Better phrase |
|---|---|
| body literacy | body awareness |
| therapeutic intervention | guided wellness practice |
| nervous system regulation | help the body settle |
| modality container | practice setting |
| integration pathway | daily rhythm |

## 10. Internal Linking Plan

Use natural internal anchors:

- `3 days yoga retreat in Rishikesh` -> `/programs/3-day-ganga-reset`
- `7 days yoga retreat in Rishikesh` -> `/programs/7-day-foundation`
- `14 days yoga retreat in Rishikesh` -> `/programs/14-day-transformation`
- `28 day wellness retreat in Rishikesh` -> `/programs/28-day-inner-awakening`
- `guided meditation retreat practice` -> `/modalities/guided-meditation`
- `sound healing retreat practice` -> `/modalities/sound-healing`

## 11. QA Before Implementation

Before commit:

1. Confirm only one H1 exists.
2. Confirm meta title and description render.
3. Confirm FAQ visible text matches FAQ schema.
4. Confirm `MedicalAudience` is not added.
5. Run `npm run typecheck`.
6. Run `npm run build`.
7. Check mobile layout for long H1, cards and FAQ.

## 12. Crawlability Fix

The page HTML is server-rendered and crawler-visible. The larger crawlability issue found before implementation is `robots.txt`, not missing page HTML.

Current repo-side behavior:

- `src/app/robots.ts` allows public crawling.
- It also explicitly allows important AI/search bots such as `OAI-SearchBot`, `ChatGPT-User`, `ClaudeBot`, `Claude-SearchBot`, `PerplexityBot` and `Google-Extended`.

Live issue:

- Cloudflare Managed robots content is being prepended above the app's robots output.
- That managed block includes `Disallow: /` for several AI crawlers, including `GPTBot`, `ClaudeBot` and `Google-Extended`.
- This creates duplicate/conflicting rules for AI crawlers.

Required non-code action:

Disable Cloudflare's managed AI crawler robots block, or change Cloudflare AI crawler settings so the live `robots.txt` no longer outputs `Disallow: /` for AI/search crawlers that should access the site.

After the Cloudflare change, validate:

1. Open `https://shreevanwellness.com/robots.txt`.
2. Confirm there is no earlier Cloudflare block with `Disallow: /` for `ClaudeBot`, `GPTBot`, `Google-Extended`, `OAI-SearchBot`, `PerplexityBot` or `ChatGPT-User`.
3. Fetch `/modalities/yoga-therapy` as Googlebot and OAI-SearchBot.
4. Confirm the page returns `200` and contains the H1, comparison section, FAQ and final CTA in raw HTML.
