import type { Metadata } from "next";
import { LegalPage, type LegalSection } from "@/components/legal/legal-page";
import { JsonLd } from "@/lib/schema/json-ld";
import { breadcrumbSchema } from "@/lib/schema/site-schema";
import { siteConfig } from "@/config/site";

const lastUpdated = "19 June 2026";

const sections: LegalSection[] = [
  {
    title: "Purpose of this policy",
    copy: [
      "This Refund and Cancellation Policy explains how cancellations, refunds and transfers are handled for Shreevan Wellness retreats. It should be read with the Terms and Conditions and the final booking confirmation.",
      "This draft follows the latest launch roadmap. Final registration-fee amount, tax treatment, gateway deductions and signed guest agreement wording should still be reviewed by legal and accounting advisors before launch.",
    ],
  },
  {
    title: "Non-refundable registration fee",
    copy: [
      "A non-refundable registration fee is required to reserve a place in a Shreevan Wellness program. This fee supports pre-arrival planning, administrative work, guest-care coordination and program preparation.",
      "The registration fee is non-refundable under all circumstances unless Shreevan Wellness confirms otherwise in writing.",
    ],
    bullets: [
      "Cancellation by the participant.",
      "Travel disruption, visa issues, illness or injury.",
      "Change of plans or inability to attend.",
      "No-show or failure to arrive for the program.",
    ],
  },
  {
    title: "Balance payment terms",
    bullets: [
      "The remaining retreat balance is due at least 25 days before the program start date unless the written invoice or booking confirmation states a different deadline.",
      "If the balance is not paid by the due date, Shreevan Wellness may cancel the booking and the non-refundable registration fee may be forfeited.",
      "A place is not fully confirmed until required payment, guest information, policy acceptance and onboarding requirements are complete.",
    ],
  },
  {
    title: "Cancellation by the participant",
    items: [
      {
        title: "More than 10 days before program start",
        copy: "The participant may be eligible for a refund of 25% of the total retreat fee paid, excluding the non-refundable registration fee. Payment gateway fees, bank charges, currency conversion differences, taxes and non-refundable third-party costs may also be deducted where applicable.",
      },
      {
        title: "Within 10 days of program start",
        copy: "No refund is available within 10 days of the program start date.",
      },
      {
        title: "No-show",
        copy: "If a participant does not arrive for the program, the booking is treated as a no-show. No refund, credit or transfer is guaranteed.",
      },
    ],
  },
  {
    title: "Transfer to another participant",
    copy: [
      "A participant may request to transfer their booking to another suitable individual up to 2 days before the program start date. Approval is at Shreevan Wellness's discretion and depends on safety, suitability, operational feasibility and timely completion of the new participant's information.",
      "Only one transfer is allowed per booking. No administrative transfer fee is currently planned, but this may be changed in the final guest agreement before launch.",
    ],
    bullets: [
      "New participant full name and contact details.",
      "Email address and emergency contact.",
      "Health, dietary and suitability information required for safe participation.",
      "Written approval from Shreevan Wellness before the transfer is valid.",
    ],
  },
  {
    title: "Program changes by Shreevan Wellness",
    copy: [
      "Shreevan Wellness may modify schedules, activities, facilitators, accommodation details, session order, excursions or program content due to weather, safety, operational requirements, venue needs, facilitator availability or circumstances beyond reasonable control.",
      "Such changes are not automatic grounds for a refund when the overall program is still being delivered in a reasonable form.",
    ],
  },
  {
    title: "Force majeure",
    copy: [
      "If events beyond reasonable control make delivery unsafe, impossible or materially different, Shreevan Wellness may offer rescheduling, credit or refund options at its discretion and in line with the final guest agreement and applicable law.",
      "Force majeure events may include natural disasters, extreme weather, government restrictions, public-health disruption, transport shutdowns, civil unrest, war, venue closure or other serious external events.",
    ],
  },
  {
    title: "Early departure and removal from program",
    bullets: [
      "If a participant leaves early for personal, health, travel or other reasons, unused days, meals, sessions, accommodation or inclusions are not refundable.",
      "Shreevan Wellness may remove a participant from the program for unsafe, disruptive, abusive, illegal or seriously inappropriate conduct.",
      "Removal for conduct or safety reasons does not create a refund entitlement.",
    ],
  },
  {
    title: "Travel insurance and third-party costs",
    copy: [
      "Participants are strongly encouraged to purchase comprehensive travel insurance covering cancellation, medical needs, personal emergencies, travel disruption, visa issues and lost baggage.",
      "Shreevan Wellness is not responsible for flights, visas, insurance, personal purchases, exchange-rate changes, bank charges or other third-party travel costs unless expressly agreed in writing.",
    ],
  },
  {
    title: "How to request cancellation, refund or transfer",
    bullets: [
      `Email ${siteConfig.email} with your full name, booking reference, retreat date and reason for the request.`,
      "Cancellation, refund or transfer requests must be made in writing by email or WhatsApp.",
      "Approved refunds are normally processed back to the original payment method where possible.",
      "Refund timing depends on bank, card, payment gateway and international transfer processing times.",
    ],
  },
  {
    title: "Acceptance of this policy",
    copy: [
      "By booking, paying a registration fee, paying a program balance or participating in a Shreevan Wellness program, the participant confirms that they have read and accepted this Refund and Cancellation Policy.",
    ],
  },
];

export const metadata: Metadata = {
  title: "Refund Policy",
  description:
    "Refund, cancellation and transfer policy for Shreevan Wellness retreats, including non-refundable registration fee, 25-day balance due date, 10-day cancellation rules and transfer conditions.",
  alternates: {
    canonical: "/refund-policy",
  },
};

export default function Page() {
  return (
    <>
      <JsonLd
        data={breadcrumbSchema([
          { name: "Home", url: siteConfig.url },
          { name: "Refund Policy", url: `${siteConfig.url}/refund-policy` },
        ])}
      />
      <LegalPage
        eyebrow="Refund and cancellation policy"
        title="Clear cancellation rules before a guest pays"
        intro="A roadmap-aligned refund draft covering registration fee, balance due dates, cancellation windows, transfer conditions and international payment realities."
        lastUpdated={lastUpdated}
        summary={[
          { label: "Registration fee", value: "Required to reserve a place and non-refundable." },
          { label: "Balance due", value: "At least 25 days before the program start date." },
          { label: "Cancellation", value: "More than 10 days may allow 25% refund excluding registration fee; within 10 days is non-refundable." },
        ]}
        sections={sections}
      />
    </>
  );
}
