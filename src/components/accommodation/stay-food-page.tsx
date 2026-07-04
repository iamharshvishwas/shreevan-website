import Link from "next/link";
import { SiteFooter } from "@/components/layout/site-footer";
import { SiteHeader } from "@/components/layout/site-header";

const trustMarkers = [
  ["Private comfort", "Quiet rooms selected for rest, recovery and daily retreat rhythm."],
  ["Sattvic meals", "Vegetarian food planned to support practice, digestion and calm routine."],
  ["International clarity", "Room, food and travel questions are clarified before booking."],
  ["Responsible boundaries", "Food support is wellness education, not medical nutrition treatment."],
];

const roomOptions = [
  {
    label: "Room option 01",
    title: "Calm Standard Room",
    bestFor: "Guests who want a simple, clean and peaceful private base.",
    details: ["Private room", "Attached bathroom", "Fresh linen", "Housekeeping rhythm"],
  },
  {
    label: "Room option 02",
    title: "Premium Comfort Room",
    bestFor: "International guests who prefer extra space and a softer landing.",
    details: ["Larger room feel", "Better natural light", "Desk or sitting space", "Upgrade on request"],
  },
  {
    label: "Room option 03",
    title: "Balcony or View Room",
    bestFor: "Longer-stay guests who value quiet mornings, air and contemplative space.",
    details: ["Balcony or view subject to availability", "Ideal for 28 and 60-day stays", "Confirm before payment"],
  },
];

const includedItems = [
  {
    title: "Accommodation for your program duration",
    copy: "Room category is confirmed during the booking conversation so expectations are clear before travel.",
  },
  {
    title: "Daily vegetarian sattvic meals",
    copy: "Meals are planned around retreat rhythm, digestion, simplicity and practice readiness.",
  },
  {
    title: "Drinking water and basic hospitality",
    copy: "International guests should feel confident about daily essentials, hydration and simple support.",
  },
  {
    title: "Pre-arrival food comfort check",
    copy: "Spice level, dietary preference and major restrictions should be discussed before arrival.",
  },
  {
    title: "Housekeeping and linen rhythm",
    copy: "Cleanliness standards should be explained plainly so guests understand what is included.",
  },
  {
    title: "Logistics guidance before arrival",
    copy: "Arrival window, packing, room questions and local travel guidance can be handled before booking.",
  },
];

const mealTypes = [
  {
    title: "Daily sattvic vegetarian meals",
    copy: "Simple, freshly prepared meals that support the slower rhythm of retreat life.",
  },
  {
    title: "Indian comfort and gentle spice",
    copy: "Guests can discuss spice comfort before arrival, especially when travelling from the US, Canada or UK.",
  },
  {
    title: "Fasting or light-meal support",
    copy: "Available only when appropriate for the guest and program rhythm, not as a medical intervention.",
  },
  {
    title: "Jain, vegan or gluten-aware requests",
    copy: "Requests should be shared early so the team can confirm what is realistic and safe to promise.",
  },
];

const reassuranceRows = [
  {
    label: "Before booking",
    title: "Know your room category",
    copy: "Do not leave international guests guessing. The stay type, room comfort and upgrade options should be clearly discussed.",
  },
  {
    label: "Before travel",
    title: "Share dietary comfort early",
    copy: "Guests should mention allergies, restrictions, spice comfort and food preferences before arrival.",
  },
  {
    label: "During stay",
    title: "Keep meals simple and steady",
    copy: "The food experience should support practice and rest, not overwhelm the body with constant novelty.",
  },
  {
    label: "Boundaries",
    title: "No medical diet promises",
    copy: "Shreevan can support wellness-friendly food planning, but clinical nutrition needs require qualified medical guidance.",
  },
];

const confirmItems = [
  "Exact room category and bathroom arrangement.",
  "Whether balcony, view or room upgrade is available for your dates.",
  "Dietary restrictions, allergies, spice level and fasting comfort.",
  "Airport transfer guidance, arrival timing and local travel questions.",
  "Laundry, special requests and any paid add-ons before final payment.",
];

export function StayFoodPage() {
  return (
    <>
      <a className="skip-link" href="#main">
        Skip to content
      </a>
      <SiteHeader />

      <main id="main">
        <section className="section stay-hero" aria-labelledby="stay-title">
          <div className="container stay-hero-grid">
            <div>
              <p className="eyebrow">Stay & Food</p>
              <h1 id="stay-title">Comfort, food and clarity before you travel to Rishikesh</h1>
              <p className="hero-lede">
                Shreevan Wellness is not a generic hotel stay. The rooms, meals and daily hospitality
                should support rest, practice and confidence for international guests choosing a serious
                retreat in India.
              </p>
              <div className="hero-actions">
                <Link className="button button-primary" href="/book-consultation">
                  Ask before booking
                </Link>
                <a className="button button-secondary" href="#room-options">
                  View room options
                </a>
              </div>
            </div>

            <div className="stay-hero-media">
              <div className="image-slot stay-hero-slot">
                <span>Stay image</span>
                <p>Room, meal table, view or quiet guest space</p>
              </div>
              <div className="stay-hero-note">
                <span>Best next step</span>
                <p>Confirm room comfort, food needs and travel timing before payment.</p>
              </div>
            </div>
          </div>
        </section>

        <section className="stay-proof-strip" aria-label="Stay and food trust markers">
          <div className="container stay-marker-grid">
            {trustMarkers.map(([title, copy]) => (
              <article key={title}>
                <h2>{title}</h2>
                <p>{copy}</p>
              </article>
            ))}
          </div>
        </section>

        <section className="section stay-room-section" id="room-options" aria-labelledby="room-options-title">
          <div className="container">
            <div className="section-heading split-heading">
              <div>
                <p className="eyebrow">Rooms & accommodation</p>
                <h2 id="room-options-title">Choose the right level of comfort for your retreat depth</h2>
              </div>
              <p>
                The room should match the program commitment. A 3-day reset needs a clean landing. A
                60-day residency needs a space that can support daily life.
              </p>
            </div>

            <div className="stay-room-grid">
              {roomOptions.map((room) => (
                <article className="stay-room-card" key={room.title}>
                  <div className="image-slot stay-room-image">
                    <span>{room.label}</span>
                    <p>{room.title} photo</p>
                  </div>
                  <div className="stay-room-body">
                    <span>{room.label}</span>
                    <h3>{room.title}</h3>
                    <p>{room.bestFor}</p>
                    <ul>
                      {room.details.map((detail) => (
                        <li key={detail}>{detail}</li>
                      ))}
                    </ul>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="section stay-included-section" aria-labelledby="included-title">
          <div className="container">
            <div className="section-heading centered">
              <p className="eyebrow">What is included</p>
              <h2 id="included-title">Keep the stay promise simple, visible and easy to trust</h2>
            </div>

            <div className="stay-included-grid">
              {includedItems.map((item, index) => (
                <article key={item.title}>
                  <span>{String(index + 1).padStart(2, "0")}</span>
                  <h3>{item.title}</h3>
                  <p>{item.copy}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="section stay-food-section" aria-labelledby="food-title">
          <div className="container stay-food-grid">
            <div>
              <p className="eyebrow light">Food philosophy</p>
              <h2 id="food-title">Meals should help the nervous system settle, not become another stress point</h2>
              <p>
                Food at Shreevan should feel clean, grounding and easy to understand. International
                guests need clarity around ingredients, spice, restrictions and what can realistically be
                accommodated.
              </p>
              <Link className="button button-light" href="/contact">
                Ask a food question
              </Link>
            </div>
            <div className="stay-meal-grid">
              {mealTypes.map((meal) => (
                <article key={meal.title}>
                  <h3>{meal.title}</h3>
                  <p>{meal.copy}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="section stay-gallery-section" aria-labelledby="gallery-title">
          <div className="container">
            <div className="section-heading split-heading">
              <div>
                <p className="eyebrow">Photo clarity</p>
                <h2 id="gallery-title">Show real proof of rooms, meals and surroundings</h2>
              </div>
              <p>
                When images are added, they should show the actual room, bathroom, dining setup,
                approach area and surrounding calm. Avoid dark, cropped or overly decorative photos.
              </p>
            </div>
            <div className="stay-gallery-grid">
              <div className="image-slot">
                <span>Room photo</span>
                <p>Bed, light, storage and bathroom context</p>
              </div>
              <div className="image-slot">
                <span>Meal photo</span>
                <p>Daily sattvic meal plate or dining table</p>
              </div>
              <div className="image-slot">
                <span>Surrounding photo</span>
                <p>Quiet path, view, garden or natural setting</p>
              </div>
              <div className="image-slot">
                <span>Detail photo</span>
                <p>Linen, tea, reading corner or guest comfort detail</p>
              </div>
            </div>
          </div>
        </section>

        <section className="section stay-reassurance-section" aria-labelledby="reassurance-title">
          <div className="container stay-reassurance-grid">
            <div>
              <p className="eyebrow">International reassurance</p>
              <h2 id="reassurance-title">The safest conversion is a well-informed guest</h2>
              <p>
                A premium stay page should answer the practical worries silently sitting in the visitor’s
                mind: cleanliness, food comfort, room privacy, travel readiness and what is not promised.
              </p>
            </div>
            <div className="stay-reassurance-list">
              {reassuranceRows.map((row) => (
                <article key={row.title}>
                  <span>{row.label}</span>
                  <h3>{row.title}</h3>
                  <p>{row.copy}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="section stay-confirm-section" aria-labelledby="confirm-title">
          <div className="container stay-confirm-panel">
            <div>
              <p className="eyebrow light">Before you book</p>
              <h2 id="confirm-title">Confirm these details before travel or payment</h2>
              <p>
                This is where Shreevan should feel more trustworthy than a generic retreat listing.
                Clear answers reduce hesitation and prevent mismatch after arrival.
              </p>
            </div>
            <ul className="stay-confirm-list">
              {confirmItems.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </div>
        </section>

        <section className="section stay-cta-section" aria-labelledby="stay-cta-title">
          <div className="container stay-cta-panel">
            <div>
              <p className="eyebrow">Stay fit check</p>
              <h2 id="stay-cta-title">If the room and food feel right, choose the program depth next</h2>
              <p>
                A consultation can help match your stay needs, food comfort and retreat duration before
                you make a serious travel decision.
              </p>
            </div>
            <div className="stay-cta-actions">
              <Link className="button button-primary" href="/book-consultation">
                Book consultation
              </Link>
              <Link className="button button-secondary" href="/programs/28-day-inner-awakening">
                View flagship program
              </Link>
            </div>
          </div>
        </section>
      </main>

      <SiteFooter />
    </>
  );
}
