import type { Metadata } from "next";
import { LegalPage, type LegalSection } from "@/components/legal/legal-page";
import { JsonLd } from "@/lib/schema/json-ld";
import { breadcrumbSchema } from "@/lib/schema/site-schema";
import { siteConfig } from "@/config/site";
import { buildPageMetadata } from "@/lib/seo/page-metadata";

const lastUpdated = "19 June 2026";

const sections: LegalSection[] = [
  {
    title: "Wellness education, not medical treatment",
    copy: [
      "Shreevan Wellness offers retreats, yoga, meditation, breathwork, sattvic living, reflection, nature immersion, personal-development experiences and wellness education. These programs are not medical care, psychotherapy, psychiatric care, diagnosis, treatment, cure, disease management or emergency support.",
      "Nothing on this website or in any retreat program should be interpreted as medical advice or as a substitute for advice from qualified healthcare professionals.",
    ],
  },
  {
    title: "No diagnosis, treatment, cure or prevention claims",
    bullets: [
      "Shreevan Wellness does not diagnose any disease, disorder or medical condition.",
      "Shreevan Wellness does not treat, cure or prevent disease.",
      "Retreat outcomes vary by individual and are not guaranteed.",
      "Testimonials, guest stories and examples reflect individual experiences and should not be treated as typical, promised or guaranteed results.",
    ],
  },
  {
    title: "Physical and emotional participation risks",
    copy: [
      "Yoga, movement, stretching, pranayama, breathwork, meditation, nature walks, excursions, group activities, dietary changes and retreat routines may involve physical exertion, emotional reflection or psychological discomfort. Participation is voluntary.",
      "You are responsible for deciding whether each activity is appropriate for you and for stopping or modifying participation when needed.",
    ],
    bullets: [
      "Tell facilitators about relevant limitations before participating.",
      "Stop immediately if you feel pain, dizziness, shortness of breath, distress or symptoms that feel unsafe.",
      "Seek professional medical or mental-health support when appropriate.",
    ],
  },
  {
    title: "Consult healthcare professionals where appropriate",
    copy: [
      "Guests should consult qualified healthcare professionals before joining if they have medical conditions, injuries, pregnancy, recent surgery, chronic illness, medication changes, eating disorder history, trauma concerns, mental-health concerns or any uncertainty about participation.",
      "Do not stop, change or delay medication, treatment, therapy or professional care because of website content, retreat materials, facilitator comments or wellness practices.",
    ],
  },
  {
    title: "Suitability screening",
    copy: [
      "The consultation and suitability process helps identify whether a Shreevan Wellness retreat appears appropriate. It is not a medical assessment. Shreevan Wellness may request more information, ask for medical clearance, decline participation, defer a booking or recommend a different support path if participation may not be suitable.",
    ],
  },
  {
    title: "Mental and emotional wellbeing",
    copy: [
      "Meditation, reflection, silence, sharing circles, energy practices and spiritual enquiry can bring up emotions, memories or discomfort. These practices are not a substitute for psychological, psychiatric, trauma-informed or therapeutic treatment.",
      "If you are currently under mental-health care, have recent crisis history or are experiencing severe distress, please consult your qualified professional before booking and disclose relevant suitability information during the consultation process.",
    ],
  },
  {
    title: "Nutrition, sattvic food and allergies",
    copy: [
      "Food and nutrition-related content is general wellness education. Sattvic meals, vegetarian food, herbal teas or dietary guidance are not medical nutrition therapy and are not intended to treat health conditions.",
      "Guests must disclose dietary restrictions, allergies and food-related concerns early. Absolute allergen-free environments cannot be guaranteed unless confirmed in writing by the final venue and operations team.",
    ],
  },
  {
    title: "Emergency care and external providers",
    copy: [
      "Shreevan Wellness is not an emergency medical provider. Emergency medical care may require external clinics, hospitals, ambulance services or local professionals. Guests should maintain appropriate health insurance and travel insurance.",
      "Unless expressly agreed in writing, medical consultations, emergency care, medication, hospital bills, ambulance services and related expenses are the participant's responsibility.",
    ],
  },
  {
    title: "Assumption of risk",
    copy: [
      "By participating, guests acknowledge that travel, retreat routines, yoga, breathwork, meditation, nature activities, shared spaces and dietary changes carry inherent risks. Guests participate voluntarily and agree to follow safety guidance, disclose relevant limitations and make responsible personal decisions.",
      "To the fullest extent allowed by law, Shreevan Wellness is not liable for injury, illness, loss or damage arising from ignored instructions, undisclosed health information, personal choices, third-party services or circumstances outside reasonable control.",
    ],
  },
  {
    title: "Marketing and content standards",
    copy: [
      "The business roadmap requires avoiding guaranteed medical results, cure-related claims, fake reviews, misleading testimonials and unsupported statistics. Wellness content should be reviewed by qualified experts where relevant and show author/reviewer credentials and last-updated dates when appropriate.",
    ],
  },
  {
    title: "Before launch checklist",
    bullets: [
      "Add final legal entity and emergency escalation process.",
      "Add qualified reviewer credentials for health/wellness educational content.",
      "Review all program pages, ads and testimonials for unsupported health claims.",
      "Confirm whether any activities require signed participation waivers or medical clearance forms.",
    ],
  },
];

export const metadata: Metadata = buildPageMetadata({
  title: "Wellness Disclaimer",
  description:
    "Health and wellness disclaimer for Shreevan Wellness explaining that retreat programs are wellness education, not medical treatment, diagnosis, cure or emergency care.",
  path: "/wellness-disclaimer",
});

export default function Page() {
  return (
    <>
      <JsonLd
        data={breadcrumbSchema([
          { name: "Home", url: siteConfig.url },
          { name: "Wellness Disclaimer", url: `${siteConfig.url}/wellness-disclaimer` },
        ])}
      />
      <LegalPage
        eyebrow="Wellness disclaimer"
        title="Responsible boundaries for every retreat experience"
        intro="A clear disclaimer that separates wellness education from medical advice, treatment, cure claims and emergency care."
        lastUpdated={lastUpdated}
        summary={[
          { label: "Not medical care", value: "No diagnosis, treatment, cure, prevention or emergency support." },
          { label: "Participation", value: "Voluntary and may involve physical exertion or emotional reflection." },
          { label: "Before launch", value: "Review with qualified legal/compliance and wellness professionals." },
        ]}
        sections={sections}
      />
    </>
  );
}
