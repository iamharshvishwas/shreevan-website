# Yoga Therapy Page — SEO / AEO / AIO Implementation Brief

> **Page:** `/modalities/yoga-therapy`
> **Prepared:** 2026-07-05 · Owner: Harsh
> **Source of truth:** `brain.md` (this repo) + live page audit + Writesonic framework (corrected)
> **Stack:** Next.js App Router · TypeScript · Tailwind v4 · file-JSON CMS · Vercel

---

## 0. TL;DR — what actually changes

The page content is strong and does **not** need a rewrite. Four surgical fixes:

1. **Fix keyword targeting** (`keywords[]`, `seoTitle`, `focusKeyword`) — today this educational page points at *commercial retreat* terms, which competes with `/programs/*`. **This is the #1 fix.**
2. **Decide the H1** — "Yoga Therapy & Medicine" vs a cleaner, non-medical H1 (decision below).
3. **Add a comparison table** (Yoga Therapy vs Regular Yoga) — the only genuine content gap; biggest AI-Overview lever.
4. **Minor FAQ lead-in tightening** (optional).

**Do NOT touch:** FAQPage schema is already wired (`src/app/modalities/[slug]/page.tsx:76` → `faqPageSchema(modality.faqs)`). WebPage + educationalService schema also already render. No schema work needed.

---

## 1. Keyword map (the decision, locked)

| Tier | Keywords | Where they live |
|---|---|---|
| **Primary (focus)** | `yoga therapy` | H1 / title / URL / first paragraph |
| **Secondary (on-page H2s)** | `what is yoga therapy`, `yoga therapy vs yoga`, `yoga therapy for beginners`, `therapeutic yoga`, `yoga therapy benefits` | article sections + FAQs |
| **Long-tail (FAQ/body)** | `yoga therapy for stress`, `for burnout`, `what to expect in a yoga therapy session`, `do I need to be flexible for yoga therapy` | FAQs |
| **⛔ OFF this page → `/programs/*`** | `yoga therapy retreat rishikesh`, `yoga therapy retreat india`, `wellness retreat rishikesh` | program pages only |

**Rule:** this page answers *"what is yoga therapy / is it for me"* (educational). The *"book a yoga therapy retreat in Rishikesh"* buyer intent belongs on program pages. Keep them separate or they cannibalise each other (brain.md §3 intent split).

---

## 2. File-by-file changes

### 2.1 `src/lib/content/modalities.ts` — `yoga-therapy` object (line ~309)

**(a) `keywords[]` — line 319–325 — REPLACE (most important change)**

```ts
// BEFORE  ❌ commercial/retreat terms on an educational page
keywords: [
  "yoga therapy retreat Rishikesh",
  "yoga therapy India",
  "retreat yoga practice",
  "breath and movement",
  "responsible wellness",
],

// AFTER  ✅ educational intent, matches this page's job
keywords: [
  "yoga therapy",
  "what is yoga therapy",
  "yoga therapy vs yoga",
  "therapeutic yoga",
  "yoga therapy for beginners",
  "yoga therapy for stress",
],
```

**(b) `seoTitle` — line 316 — REPLACE (drop "Retreat" = commercial leak)**

```ts
// BEFORE
seoTitle: "Yoga Therapy Retreat Practice in Rishikesh | Shreevan Wellness",

// AFTER  (58 chars, primary keyword first, educational)
seoTitle: "Yoga Therapy: Gentle, Beginner-Friendly Practice | Shreevan",
```

**(c) `seoDescription` — line 317 — REPLACE (lead with the definition = AEO)**

```ts
// AFTER  (~156 chars: entity-first + beginner hook + geo)
seoDescription:
  "Yoga therapy is gentle, yoga-informed practice for breath, movement and body awareness — no flexibility needed. How Shreevan uses it in Rishikesh retreats.",
```

**(d) `title` (H1) — line 310 — ⚠ DECISION REQUIRED (see §4)**
Default recommendation:
```ts
// BEFORE
title: "Yoga Therapy & Medicine",
// AFTER (recommended — clean, non-YMYL)
title: "Yoga Therapy",
```
> `shortTitle: "Yoga Therapy"` (line 311) already exists, so nav/cards are unaffected.
> Verify `title` renders as the page `<h1>` in `src/app/modalities/[slug]/page.tsx` before shipping.

---

### 2.2 Add the comparison table (the one real content gap)

**Recommended — proper table (best for AI Overviews).** Add a new optional field to the `ModalityContent` type and to the `yoga-therapy` object, then render it.

**Step 1 — add to the `ModalityContent` interface (top of `modalities.ts`):**
```ts
comparison?: {
  title: string;
  columns: [string, string]; // ["Yoga Therapy (at Shreevan)", "Regular Yoga Class"]
  rows: Array<{ aspect: string; a: string; b: string }>;
};
```

**Step 2 — add to the `yoga-therapy` object (e.g. after `retreatExperience`, ~line 423):**
```ts
comparison: {
  title: "Yoga therapy vs a regular yoga class",
  columns: ["Yoga Therapy (at Shreevan)", "Regular Yoga Class"],
  rows: [
    { aspect: "Goal", a: "Body awareness, breath and a sustainable rhythm", b: "Complete a sequence, fitness or set practice" },
    { aspect: "Pacing", a: "Suitability-led, modifiable, you can pause", b: "Instructor-paced to the group tempo" },
    { aspect: "Flexibility", a: "Not required", b: "Often assumed" },
    { aspect: "Focus", a: "Noticing patterns across the whole day", b: "The single session on the mat" },
    { aspect: "Best for", a: "Beginners, burnout recovery, reconnection", b: "Established practice, fitness goals" },
    { aspect: "What it is not", a: "Not medical treatment or physiotherapy", b: "Not individualized to your body" },
  ],
},
```

**Step 3 — render in `src/app/modalities/[slug]/page.tsx`** (place after the article sections):
```tsx
{modality.comparison && (
  <section className="mt-12">
    <h2 className="text-2xl font-medium">{modality.comparison.title}</h2>
    <div className="mt-4 overflow-x-auto">
      <table className="w-full border-collapse text-left">
        <thead>
          <tr>
            <th className="p-3">Aspect</th>
            <th className="p-3">{modality.comparison.columns[0]}</th>
            <th className="p-3">{modality.comparison.columns[1]}</th>
          </tr>
        </thead>
        <tbody>
          {modality.comparison.rows.map((r) => (
            <tr key={r.aspect} className="border-t">
              <td className="p-3 font-medium">{r.aspect}</td>
              <td className="p-3">{r.a}</td>
              <td className="p-3">{r.b}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  </section>
)}
```
> Use your real Tailwind tokens (forest/mist/river) — classes above are placeholders.

**Fallback — zero render changes:** if you don't want to touch the route file now, add the same contrast as a new `articleSections` entry in prose ("Unlike a regular class where… , yoga therapy here…"). Renders fine, still gives AI the structured contrast in text — but a real `<table>` is stronger for AI Overviews.

---

### 2.3 `data/admin/seo-leads.json` — `yoga-therapy` route (line ~158)

Set the focus keyword to the primary term (confirm current value isn't a retreat/placeholder term):
```json
"focusKeyword": "yoga therapy"
```

---

## 3. FAQ tightening (optional, low priority)

Your 5 FAQs are already good and correctly non-medical. Only nudge: **lead each answer with a direct answer in the first ~1 sentence**, then elaborate (your own "direct answer in first 70 words" rule from the marketing docs). Example — FAQ #3 (line 466):

```
BEFORE: "A normal class often focuses on a single session. Yoga therapy inside a retreat is connected…"
AFTER:  "The main difference is scope. A normal class focuses on one session; yoga therapy here connects to your whole day — meditation, meals, rest and sleep — so it's about noticing patterns, not finishing a sequence."
```

Also consider adding one FAQ that literally targets the query **"What is yoga therapy?"** (your strongest AEO term) — reuse `hero.answer`, which is already an ideal 2-sentence definition.

---

## 4. ⚠ DECISION REQUIRED — the H1 ("& Medicine")

Current H1 = **"Yoga Therapy & Medicine"** (intentional per brain.md §3). Problem: brain.md §9 says *never* present medical care/therapy/diagnosis, yet "Medicine" in the H1 of a US-audience health page (a) leans toward a medical claim you explicitly disclaim, and (b) dilutes the exact-match "yoga therapy" signal.

| Option | H1 | Verdict |
|---|---|---|
| **A (recommended)** | `Yoga Therapy` | Cleanest for SEO, safest for YMYL |
| **B** | `Yoga Therapy & Yogic Medicine` | Keeps the concept, still some YMYL risk |
| **C** | `Yoga Therapy & Medicine` (unchanged) | Brand call — accept the SEO/YMYL cost |

Pick one before editing `title` (§2.1d). Everything else in this brief is independent of this choice.

---

## 5. What's already done (don't redo)

- ✅ FAQPage schema (auto from `modality.faqs`)
- ✅ WebPage + educationalService + breadcrumb schema
- ✅ Entity-first answer (`hero.answer`) — great for AEO/GEO
- ✅ YMYL boundary note (`hero.boundaryNote`)
- ✅ `quickAnswer` (simple terms / best for / what to expect / what it is not) — snippet-friendly
- ✅ Internal links to related modalities + all 5 programs
- ✅ `public/llms.txt` present

---

## 6. Ship order & QA

1. `keywords[]` swap (2.1a) ← highest impact
2. `seoTitle` + `seoDescription` (2.1b–c)
3. H1 decision + `title` (2.1d, §4)
4. `focusKeyword` in seo-leads.json (2.3)
5. Comparison table (2.2)
6. FAQ lead-ins (3, optional)

**Validate before commit:**
- `npm run typecheck && npm run lint && npm run build`
- View source on `/modalities/yoga-therapy` → confirm new `<title>`, meta description, single clean `<h1>`
- Paste page HTML into **Google Rich Results Test** → FAQPage still valid
- Confirm the comparison `<table>` renders (not literal text)

**Track after publish (GSC, this URL):** impressions/clicks for "yoga therapy", "yoga therapy vs yoga", "yoga therapy for beginners". Ignore rank obsession early — watch impression growth + AI Overview appearances first.

---

## 7. Still open (do next, separate task)

- Validate primary keyword against **real US volume/difficulty** from your Writesonic CSV or Ahrefs UI (current plan blocks Keywords Explorer via MCP). The decision above is intent-safe regardless, but numbers confirm priority order.
- Build the **`/programs/*`** targeting for `yoga therapy retreat rishikesh/india` (the buyer terms this page deliberately gives up).
