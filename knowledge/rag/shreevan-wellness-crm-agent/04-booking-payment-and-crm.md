---
rag_id: shreevan-booking-payment-crm
version: 0.1
last_updated: 2026-06-26
retrieval_tags:
  - booking
  - consultation
  - payment
  - CRM
  - forms
  - invoice
---

# Booking, Payment and CRM Knowledge

## Consultation-first booking

Shreevan Wellness uses a free suitability call before booking and payment.

The consultation is intended to understand:

- Visitor context.
- Country and time zone.
- Program interest.
- Travel dates.
- Current season of life.
- Comfort and health boundaries.
- Food, room, and travel questions.
- Whether a retreat is suitable now.

The consultation should feel like a responsible fit conversation, not a sales trap.

## Book consultation page

Route: `/book-consultation`

Key message:

"Before you choose a retreat, let us understand the person arriving."

This page:

- Does not take payment.
- Starts a suitability conversation.
- Is human reviewed.
- Is international-aware.
- Helps choose the right depth across 3, 7, 14, 28 and 60-day programs.

Good fit for consultation:

- Guest is considering India travel.
- Guest is unsure which duration matches their current season.
- Guest has food, stay, comfort or health-boundary questions.
- Guest wants a serious retreat, not a rushed wellness holiday.

Not the right path if:

- Guest needs emergency support or urgent medical advice.
- Guest wants guaranteed healing or instant transformation.
- Guest wants a casual holiday without daily structure.

## Consultation form fields

The booking enquiry form can capture:

- Full name.
- Email address.
- Country code.
- WhatsApp/mobile number.
- Country/time zone.
- Preferred program.
- Desired travel dates.
- Current season of life.
- Goal or what would make the retreat worthwhile.
- Optional comfort or health context.
- Wellness suitability consent.

Program options:

- Not sure yet.
- 3-Day Ganga Sattva Reset.
- 7-Day Ganga Sattva Foundation.
- 14-Day Ganga Sattva Transformation.
- 28-Day Inner Awakening.
- 60-Day Rishi Residency.

## CRM forms

Public forms have `data-veda-form` capture attributes:

- Home suitability request.
- Booking enquiry.
- Contact form.
- Payment verification.
- Journal subscription.

All public forms include WhatsApp/mobile number and country code fields.

Admin forms are intentionally not tagged for CRM capture.

## Suitability form behavior

The home suitability form sends:

- Internal `/api/leads` logging.
- Manual POST to `https://api.shreevanwellness.com/api/v1/intake/form`.
- Uses `keepalive: true`.
- Still shows thank-you even if internal logging fails.

Important operational note:

Watch for duplicate CRM notes if both automatic `veda-forms.js` capture and manual intake calls log the same enquiry.

## Payment page

Route: `/payment`

Payment page purpose:

- Confirm retreat booking.
- Verify booking or invoice ID.
- Select payment type.
- Choose preferred currency.
- Handoff to secure payment provider or invoice support.

Payment page is not a cold visitor sales page.

Payment should happen only after:

- Consultation or team confirmation.
- Program duration confirmed.
- Dates confirmed.
- Invoice or booking ID received.
- Terms, refund, and wellness disclaimer reviewed.
- Room, food, travel, and suitability questions clarified.

Payment methods currently positioned:

- International card.
- Wise / bank transfer.
- Manual invoice support.

Currencies shown:

- USD.
- GBP.
- CAD.
- EUR.
- INR.

Agent must not say payment gateway is fully live unless confirmed.

## Payment response rules

If visitor asks "Can I pay now?":

"Payment is intended after your booking or invoice has been confirmed. Please first complete the suitability conversation so the team can confirm program fit, dates, stay details, food comfort, terms, and payment route."

If visitor has invoice ID:

"Use the payment verification page and enter your booking or invoice ID. If anything looks unclear, pause and contact the team before paying."

If visitor has no invoice ID:

"Please do not use the payment page yet. Start with a consultation or contact the team so your booking context can be confirmed."

## CRM lead status suggestions

Useful CRM labels:

- New enquiry.
- Needs reply.
- Awaiting call scheduling.
- Suitability review.
- Program fit unclear.
- Travel/logistics question.
- Food/stay question.
- Health-boundary review.
- Invoice ready.
- Payment verification.
- Not suitable now.
- Follow up later.

