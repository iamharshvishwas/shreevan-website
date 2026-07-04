import type { Metadata } from "next";
import { LegalPage, type LegalSection } from "@/components/legal/legal-page";
import { JsonLd } from "@/lib/schema/json-ld";
import { breadcrumbSchema } from "@/lib/schema/site-schema";
import { siteConfig } from "@/config/site";
import { buildPageMetadata } from "@/lib/seo/page-metadata";

const lastUpdated = "19 June 2026";

const sections: LegalSection[] = [
  {
    title: "Who this policy applies to",
    copy: [
      "This Privacy Policy explains how Shreevan Wellness collects, uses and protects personal information when you visit the website, submit an enquiry, request a consultation, communicate with us, make a booking or participate in a retreat.",
      "Shreevan Wellness currently serves international visitors, including guests from the United States, United Kingdom, Canada, Australia and India. The final legal entity name, registered address and data-protection contact should be added before launch.",
    ],
  },
  {
    title: "Information we may collect",
    items: [
      {
        title: "Contact and identity details",
        copy: "Name, email address, phone or WhatsApp number, country, time zone, preferred travel dates and communication preferences.",
      },
      {
        title: "Retreat and suitability information",
        copy: "Program interest, goals, lifestyle context, prior practice, dietary needs and any health-related information you voluntarily provide during suitability conversations.",
      },
      {
        title: "Onboarding and travel information",
        copy: "Nationality, date of birth, emergency contact, arrival and departure plans, travel route, room preferences, accessibility needs, pre-retreat preparation details and welcome-pack confirmations.",
      },
      {
        title: "Health, safety and dietary details",
        copy: "Allergies, injuries, medical conditions, medications, mobility limits, pregnancy-related information, food restrictions, yoga or meditation experience and other information needed to assess safe participation.",
      },
      {
        title: "Payment and booking information",
        copy: "Billing name, invoice details, transaction status and booking records. Card or bank details are processed by secure payment providers and should not be stored by Shreevan Wellness.",
      },
      {
        title: "Media, testimonial and consent records",
        copy: "Photo, video, testimonial, story, review or alumni-community permissions where you choose to give separate consent.",
      },
      {
        title: "Website and marketing data",
        copy: "Cookie identifiers, device/browser information, analytics events, page views, form submissions, ad campaign source and email or WhatsApp engagement data.",
      },
    ],
  },
  {
    title: "How we use information",
    bullets: [
      "Respond to enquiries, consultation requests and travel or accommodation questions.",
      "Assess whether a retreat is suitable before accepting a booking or payment.",
      "Manage payments, invoices, booking confirmations, onboarding, welcome packs, reminders and guest support.",
      "Review health, dietary, accessibility and emergency-contact information for safety planning and responsible guest care.",
      "Coordinate arrival details, accommodation needs, program preparation, post-retreat follow-up and alumni communication where appropriate.",
      "Send marketing communications only where consent or applicable law allows it.",
      "Operate CRM, WhatsApp Business, email, analytics, booking and payment workflows.",
      "Improve website performance, content, safety, fraud prevention and customer experience.",
      "Meet legal, accounting, tax, recordkeeping and compliance obligations.",
    ],
  },
  {
    title: "Legal bases and consent",
    copy: [
      "For visitors in the UK, EU or similar privacy-law jurisdictions, we rely on legal bases such as consent, performance of a contract, legitimate interests, legal obligations and, where health-related details are voluntarily provided, explicit consent or another applicable lawful basis.",
      "You may withdraw marketing consent at any time. Withdrawing consent does not affect processing that happened before the withdrawal or information we must keep for legal, accounting, dispute or safety reasons.",
    ],
  },
  {
    title: "Cookies, analytics and marketing pixels",
    copy: [
      "The website may use necessary cookies for basic functionality and optional analytics or advertising technologies to understand traffic and measure consultation or payment conversions.",
      "Before launch, add a cookie banner or consent mechanism where required, list the specific tools in use, and connect consent choices to analytics and marketing tags.",
    ],
  },
  {
    title: "Third-party integrations",
    copy: [
      "The roadmap expects integrations for CRM, WhatsApp Business, analytics, consultation booking, email sequences and international payment collection. These providers may process information on Shreevan Wellness's behalf or as independent controllers depending on their role.",
      "Before launch, list the actual providers, such as payment gateway, CRM, email, WhatsApp, calendar, analytics, cloud form, storage, automation and ad platforms, and link to their privacy terms where appropriate.",
    ],
  },
  {
    title: "International transfers and security",
    copy: [
      "Because guests and service providers may be located in different countries, personal information may be transferred internationally. Shreevan Wellness should use reputable service providers and appropriate contractual, technical and organizational safeguards.",
      "No online system is completely risk-free. We use reasonable measures such as limited access, secure provider accounts, encrypted payment workflows and operational controls, but cannot guarantee absolute security.",
    ],
  },
  {
    title: "Retention",
    copy: [
      "We keep personal information only as long as reasonably needed for enquiries, bookings, retreat operations, legal/accounting requirements, dispute handling, safety records and marketing consent management.",
      "Before launch, define specific retention periods for leads, consultation notes, booking records, invoices, payment records, health/suitability notes, onboarding forms, travel details, emergency contacts, testimonial/media consent records and marketing contacts.",
    ],
  },
  {
    title: "Your rights",
    bullets: [
      "Request access to personal information we hold about you.",
      "Ask us to correct inaccurate or incomplete information.",
      "Ask for deletion where retention is no longer legally or operationally required.",
      "Object to or restrict certain processing where applicable.",
      "Request portability where applicable.",
      "Withdraw marketing consent at any time.",
      "Raise a complaint with your local data-protection authority where applicable.",
    ],
  },
  {
    title: "Testimonials, photos and sensitive details",
    copy: [
      "We will not use your testimonial, image, story, video or before/after content for marketing without separate permission. Do not submit sensitive medical details through public forms unless specifically requested through a secure suitability or onboarding process.",
    ],
  },
];

export const metadata: Metadata = buildPageMetadata({
  title: "Privacy Policy",
  description:
    "Privacy Policy for Shreevan Wellness covering data collection, marketing consent, cookies, third-party integrations, user rights and international visitor privacy standards.",
  path: "/privacy-policy",
});

export default function Page() {
  return (
    <>
      <JsonLd
        data={breadcrumbSchema([
          { name: "Home", url: siteConfig.url },
          { name: "Privacy Policy", url: `${siteConfig.url}/privacy-policy` },
        ])}
      />
      <LegalPage
        eyebrow="Privacy policy"
        title="How Shreevan Wellness handles personal information"
        intro="A clear privacy draft for enquiries, consultation requests, bookings, CRM, WhatsApp, analytics and international payment workflows."
        lastUpdated={lastUpdated}
        summary={[
          { label: "Covers", value: "Forms, consultations, bookings, payments, marketing and analytics." },
          { label: "Roadmap requirement", value: "GDPR, UK GDPR, Australian Privacy Principles and Canadian privacy standards." },
          { label: "Before launch", value: "Add final legal entity, provider list, retention schedule and cookie consent flow." },
        ]}
        sections={sections}
      />
    </>
  );
}
