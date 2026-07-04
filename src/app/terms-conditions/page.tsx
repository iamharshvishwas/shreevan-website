import type { Metadata } from "next";
import { LegalPage, type LegalSection } from "@/components/legal/legal-page";
import { JsonLd } from "@/lib/schema/json-ld";
import { breadcrumbSchema } from "@/lib/schema/site-schema";
import { siteConfig } from "@/config/site";
import { buildPageMetadata } from "@/lib/seo/page-metadata";

const lastUpdated = "19 June 2026";

const sections: LegalSection[] = [
  {
    title: "Agreement to these terms",
    copy: [
      "These Terms and Conditions apply when you use the Shreevan Wellness website, submit an enquiry, request a consultation, make a booking, pay for a retreat or participate in a Shreevan Wellness program.",
      "The final legal entity name, registered address, tax details and authorized signatory should be added before launch. If a signed guest agreement conflicts with this page, the signed agreement should control to the extent of the conflict.",
    ],
  },
  {
    title: "Booking process",
    bullets: [
      "You submit an enquiry or book a consultation.",
      "Shreevan Wellness reviews program fit, travel context, expectations and suitability boundaries.",
      "If the retreat appears suitable, we recommend a program and share booking/payment instructions.",
      "A non-refundable registration fee may be required to reserve your place.",
      "Your place is not fully confirmed until required payment, guest information, policy acceptance and written confirmation are complete.",
      "We may decline or defer a booking where the retreat is not appropriate, safe or operationally available.",
    ],
  },
  {
    title: "Payment terms",
    copy: [
      "Prices may be shown in USD or another currency for international guests. Final prices, taxes, gateway fees, bank charges, exchange-rate differences and invoice details should be confirmed before payment.",
      "Payments may be collected through secure third-party payment gateways or approved bank-transfer methods. Shreevan Wellness does not store full card or bank credentials on the website.",
    ],
    bullets: [
      "A non-refundable registration fee reserves a program place unless Shreevan Wellness confirms a different arrangement in writing.",
      "The remaining retreat balance is due at least 25 days before the program start date unless the written invoice states otherwise.",
      "Failure to pay the balance by the due date may result in booking cancellation and forfeiture of the registration fee.",
      "Invoices or receipts should be issued according to the final business registration and tax setup.",
      "Discounts, agent commissions or special offers must be approved in writing.",
      "Payment failure, chargeback or suspected fraud may pause or cancel a booking.",
    ],
  },
  {
    title: "Participant responsibilities",
    bullets: [
      "Provide accurate contact, nationality, date of birth, travel, dietary, health, medication, allergy, suitability and emergency-contact information when requested.",
      "Consult qualified healthcare professionals before joining if you have medical, mental-health, pregnancy, injury or medication concerns.",
      "Follow facilitator instructions, safety guidance, property rules, meal timings, quiet hours and group conduct expectations.",
      "Arrange passport, visa, travel insurance, flights, transfers and personal expenses unless a written inclusion says otherwise.",
      "Do not attend under the influence of alcohol, recreational drugs or anything that may make participation unsafe.",
      "Respect other guests, staff, local culture, the retreat environment and confidentiality in sharing circles.",
    ],
  },
  {
    title: "Accommodation and retreat rules",
    copy: [
      "Accommodation rules will depend on the confirmed venue, room category and guest package. The final booking page or guest agreement should clarify room type, inclusions, exclusions, check-in/check-out, laundry, internet, food, allergies and any shared-space expectations.",
    ],
    bullets: [
      "Guests are responsible for damage caused to rooms, property, equipment or retreat materials.",
      "Dietary requests should be shared early. Absolute allergen-free environments cannot be guaranteed unless confirmed in writing.",
      "Quiet hours, phone/internet use, photography rules and guest conduct standards may apply.",
    ],
  },
  {
    title: "Program changes and availability",
    copy: [
      "Shreevan Wellness may adjust facilitators, session order, daily rhythm, excursion timing, venue details, inclusions or program components where needed for safety, weather, guest-care, operational or force majeure reasons.",
      "Reasonable schedule, activity, facilitator, accommodation or content changes are not automatic refund grounds where the overall program is still delivered. If a major change materially affects the retreat, we will try to offer a reasonable alternative, transfer or refund option according to the Refund Policy and applicable law.",
    ],
  },
  {
    title: "Early departure and removal",
    copy: [
      "If a guest leaves early for personal, health, travel or other reasons, unused days, meals, sessions, accommodation or inclusions are not refundable unless Shreevan Wellness confirms otherwise in writing.",
      "Shreevan Wellness may remove a guest from the program for unsafe, disruptive, abusive, illegal or seriously inappropriate conduct. Removal for conduct or safety reasons does not create a refund entitlement.",
    ],
  },
  {
    title: "Wellness boundaries",
    copy: [
      "Retreat programs are wellness education and experiential practice. They are not medical treatment, psychotherapy, diagnosis, cure or emergency care. The Wellness Disclaimer forms part of these Terms.",
    ],
  },
  {
    title: "Intellectual property",
    copy: [
      "Website content, program materials, worksheets, trackers, videos, schedules, brand assets, guides and retreat frameworks belong to Shreevan Wellness or its licensors. Guests may use materials for personal learning only and may not copy, resell, publish, record or distribute them without written permission.",
    ],
  },
  {
    title: "Testimonials, photos and media",
    copy: [
      "We will request separate consent before using guest testimonials, photos, videos, stories or identifiable retreat content for marketing. Guests should not photograph or record other participants without their permission.",
    ],
  },
  {
    title: "Liability limitations",
    copy: [
      "To the fullest extent allowed by law, Shreevan Wellness is not responsible for indirect, incidental, consequential or unforeseeable losses, or for events outside reasonable control, including travel disruption, weather, third-party services, illness, personal choices or failure to follow safety guidance.",
      "Nothing in these Terms excludes liability that cannot legally be excluded, including liability for fraud or wilful misconduct where applicable.",
    ],
  },
  {
    title: "Governing law and disputes",
    copy: [
      "The final governing-law clause should be confirmed by legal counsel. Unless a final guest agreement says otherwise, these draft Terms are intended to be governed by the laws of India, with venue and dispute process to be confirmed before launch.",
    ],
  },
];

export const metadata: Metadata = buildPageMetadata({
  title: "Terms & Conditions",
  description:
    "Terms and Conditions for Shreevan Wellness covering booking, registration fee, payment, participant responsibilities, accommodation rules, liability, program changes and intellectual property.",
  path: "/terms-conditions",
});

export default function Page() {
  return (
    <>
      <JsonLd
        data={breadcrumbSchema([
          { name: "Home", url: siteConfig.url },
          { name: "Terms & Conditions", url: `${siteConfig.url}/terms-conditions` },
        ])}
      />
      <LegalPage
        eyebrow="Terms and conditions"
        title="Clear terms for booking and participating responsibly"
        intro="A practical terms draft for consultation-first bookings, international payments, guest responsibilities, accommodation expectations and responsible wellness boundaries."
        lastUpdated={lastUpdated}
        summary={[
          { label: "Applies to", value: "Website use, enquiries, consultations, payments, bookings and retreat participation." },
          { label: "Roadmap requirement", value: "Booking process, registration fee, balance due date, participant duties, accommodation rules, liability and governing law." },
          { label: "Before launch", value: "Add legal entity, final venue rules and lawyer-approved governing law." },
        ]}
        sections={sections}
      />
    </>
  );
}
