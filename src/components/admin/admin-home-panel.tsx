"use client";

import { ChangeEvent, FormEvent, ReactNode, useMemo, useState } from "react";
import type {
  AdminHomeContentStore,
  AdminHomeDifferentiationCard,
  AdminHomeMedia,
  AdminHomeProgramItem,
  AdminHomeTaggedCard,
  AdminHomeTestimonial,
  AdminHomeTextItem,
  AdminHomeTitleCopyItem,
} from "@/lib/admin/home-content";

type SaveState = "idle" | "saving" | "saved" | "error";
type HomeSectionKey = Exclude<keyof AdminHomeContentStore, "updatedAt">;
type MediaSection = "mediaBand" | "team" | "location";

const homeSections: { key: HomeSectionKey; label: string; note: string }[] = [
  { key: "hero", label: "Hero section", note: "First viewport copy, CTAs and trust chips." },
  { key: "mediaBand", label: "Hero media band", note: "Wide image or video below hero." },
  { key: "proofStrip", label: "Trust strip", note: "Compact feature signals." },
  { key: "intro", label: "Intro section", note: "Intent and positioning copy." },
  { key: "programPathways", label: "Program pathways", note: "Homepage program rows." },
  { key: "differentiation", label: "Differentiation cards", note: "What guests should understand." },
  { key: "rhythm", label: "Daily rhythm", note: "Schedule and experience list." },
  { key: "team", label: "Trust and team", note: "Founder/team copy and portrait." },
  { key: "travel", label: "Travel confidence", note: "International guest cards." },
  { key: "location", label: "Location clarity", note: "Venue media and policies." },
  { key: "testimonials", label: "Social proof", note: "Testimonials and proof cards." },
  { key: "consultation", label: "Consultation CTA", note: "CTA copy and fit-call steps." },
  { key: "leadForm", label: "Lead form intro", note: "Intro copy beside the form." },
];

function cloneHomeContent(homeContent: AdminHomeContentStore): AdminHomeContentStore {
  return JSON.parse(JSON.stringify(homeContent)) as AdminHomeContentStore;
}

function createId(prefix: string) {
  return `${prefix}-${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 8)}`;
}

function formatUpdatedAt(value: string) {
  const date = new Date(value);

  if (Number.isNaN(date.getTime())) {
    return "Not saved yet";
  }

  return date.toLocaleString("en-IN", {
    dateStyle: "medium",
    timeStyle: "short",
  });
}

function replaceItem<T extends { id: string }>(items: T[], id: string, patch: Partial<T>) {
  return items.map((item) => (item.id === id ? { ...item, ...patch } : item));
}

function removeItem<T extends { id: string }>(items: T[], id: string) {
  return items.filter((item) => item.id !== id);
}

function moveItem<T>(items: T[], index: number, direction: -1 | 1) {
  const nextIndex = index + direction;

  if (nextIndex < 0 || nextIndex >= items.length) {
    return items;
  }

  const nextItems = [...items];
  const [item] = nextItems.splice(index, 1);
  nextItems.splice(nextIndex, 0, item);

  return nextItems;
}

function countRepeaters(homeContent: AdminHomeContentStore) {
  return (
    homeContent.hero.trustItems.length +
    homeContent.proofStrip.items.length +
    homeContent.intro.paragraphs.length +
    homeContent.programPathways.items.length +
    homeContent.differentiation.cards.length +
    homeContent.rhythm.items.length +
    homeContent.team.bullets.length +
    homeContent.travel.cards.length +
    homeContent.location.cards.length +
    homeContent.testimonials.items.length +
    homeContent.consultation.steps.length
  );
}

function countUploadedMedia(homeContent: AdminHomeContentStore) {
  return [homeContent.mediaBand.media, homeContent.team.media, homeContent.location.media].filter((media) =>
    media.src.trim(),
  ).length;
}

export function AdminHomePanel({ initialHomeContent }: Readonly<{ initialHomeContent: AdminHomeContentStore }>) {
  const [homeContent, setHomeContent] = useState(() => cloneHomeContent(initialHomeContent));
  const [savedHomeContent, setSavedHomeContent] = useState(() => cloneHomeContent(initialHomeContent));
  const [saveState, setSaveState] = useState<SaveState>("idle");
  const [message, setMessage] = useState("");
  const [uploadingField, setUploadingField] = useState<string>("");

  const dirty = useMemo(
    () => JSON.stringify(homeContent) !== JSON.stringify(savedHomeContent),
    [homeContent, savedHomeContent],
  );
  const repeaterCount = countRepeaters(homeContent);
  const mediaCount = countUploadedMedia(homeContent);

  function updateSection<K extends HomeSectionKey>(section: K, patch: Partial<AdminHomeContentStore[K]>) {
    setHomeContent((current) => ({
      ...current,
      [section]: {
        ...current[section],
        ...patch,
      },
    }));
  }

  function updateMedia(section: MediaSection, patch: Partial<AdminHomeMedia>) {
    setHomeContent((current) => ({
      ...current,
      [section]: {
        ...current[section],
        media: {
          ...current[section].media,
          ...patch,
        },
      },
    }));
  }

  async function uploadMedia(section: MediaSection, file: File | null) {
    if (!file) {
      return;
    }

    setUploadingField(section);
    setSaveState("idle");
    setMessage("");

    const formData = new FormData();
    formData.append("file", file);

    const response = await fetch("/api/admin/home/media", {
      method: "POST",
      body: formData,
    });
    const body = (await response.json().catch(() => null)) as
      | { media?: { kind: "image" | "video"; src: string }; error?: string }
      | null;

    setUploadingField("");

    if (!response.ok || !body?.media) {
      setSaveState("error");
      setMessage(body?.error ?? "Media upload failed.");
      return;
    }

    updateMedia(section, { kind: body.media.kind, src: body.media.src });
    setMessage("Media uploaded. Save Home page to publish this media reference.");
  }

  async function handleSave(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setSaveState("saving");
    setMessage("");

    const response = await fetch("/api/admin/home", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(homeContent),
    });
    const body = (await response.json().catch(() => null)) as
      | { homeContent?: AdminHomeContentStore; error?: string }
      | null;

    if (!response.ok || !body?.homeContent) {
      setSaveState("error");
      setMessage(body?.error ?? "Home content could not be saved.");
      return;
    }

    setHomeContent(cloneHomeContent(body.homeContent));
    setSavedHomeContent(cloneHomeContent(body.homeContent));
    setSaveState("saved");
    setMessage("Home content saved.");
  }

  function handleRevert() {
    setHomeContent(cloneHomeContent(savedHomeContent));
    setSaveState("idle");
    setMessage("Unsaved Home changes reverted.");
  }

  return (
    <main className="admin-dashboard admin-settings-page" aria-labelledby="admin-home-title">
      <section className="admin-dashboard-hero admin-settings-hero">
        <div>
          <p className="admin-kicker">Home page builder</p>
          <h2 id="admin-home-title">Edit the homepage section by section.</h2>
          <p>
            Manage Home body content in one place: hero, cards, lists, media, proof, consultation
            CTA and the form intro. Header, announcement bar and global footer stay in Global Settings.
          </p>
        </div>
        <div className="admin-status-panel" aria-label="Home editor status">
          <span>Home State</span>
          <dl>
            <div>
              <dt>Save status</dt>
              <dd>{dirty ? "Unsaved changes" : "Saved"}</dd>
            </div>
            <div>
              <dt>Updated</dt>
              <dd>{formatUpdatedAt(savedHomeContent.updatedAt)}</dd>
            </div>
            <div>
              <dt>Sections</dt>
              <dd>{homeSections.length} editable</dd>
            </div>
            <div>
              <dt>Blocks</dt>
              <dd>{repeaterCount} repeatable items</dd>
            </div>
            <div>
              <dt>Media</dt>
              <dd>{mediaCount}/3 uploaded</dd>
            </div>
          </dl>
        </div>
      </section>

      <form className="admin-settings-layout" onSubmit={handleSave}>
        <aside className="admin-settings-aside" aria-label="Home editor sections">
          <div className="admin-home-section-list">
            {homeSections.map((section, index) => (
              <a href={`#home-editor-${section.key}`} key={section.key}>
                <span>{String(index + 1).padStart(2, "0")}</span>
                <strong>{section.label}</strong>
                <small>{section.note}</small>
              </a>
            ))}
          </div>

          <div className="admin-panel admin-settings-note">
            <p className="admin-kicker">Not duplicated here</p>
            <h2>Header and footer stay global</h2>
            <p>
              Announcement bar, navigation, primary header CTA and footer links remain controlled by
              Global Settings.
            </p>
          </div>
        </aside>

        <section className="admin-panel admin-settings-editor">
          <div className="admin-panel-heading admin-settings-heading">
            <div>
              <p className="admin-kicker">Section builder</p>
              <h2>Home page content</h2>
            </div>
            <span>{dirty ? "Unsaved" : "Saved"}</span>
          </div>

          <div className="admin-home-builder">
            <HomeEditorSection id="hero" label="Hero section" note="First viewport content, CTAs and trust chips.">
              <div className="admin-form-grid">
                <TextField
                  label="Eyebrow"
                  value={homeContent.hero.eyebrow}
                  onChange={(value) => updateSection("hero", { eyebrow: value })}
                />
                <TextField
                  label="Headline"
                  value={homeContent.hero.title}
                  onChange={(value) => updateSection("hero", { title: value })}
                />
                <TextArea
                  label="Lead copy"
                  value={homeContent.hero.lede}
                  onChange={(value) => updateSection("hero", { lede: value })}
                  wide
                />
                <TextField
                  label="Primary CTA label"
                  value={homeContent.hero.primaryCtaLabel}
                  onChange={(value) => updateSection("hero", { primaryCtaLabel: value })}
                />
                <TextField
                  label="Primary CTA href"
                  value={homeContent.hero.primaryCtaHref}
                  onChange={(value) => updateSection("hero", { primaryCtaHref: value })}
                />
                <TextField
                  label="Secondary CTA label"
                  value={homeContent.hero.secondaryCtaLabel}
                  onChange={(value) => updateSection("hero", { secondaryCtaLabel: value })}
                />
                <TextField
                  label="Secondary CTA href"
                  value={homeContent.hero.secondaryCtaHref}
                  onChange={(value) => updateSection("hero", { secondaryCtaHref: value })}
                />
              </div>
              <TextItemRepeater
                addLabel="Add trust chip"
                items={homeContent.hero.trustItems}
                label="Trust chips"
                onAdd={() =>
                  updateSection("hero", {
                    trustItems: [...homeContent.hero.trustItems, { id: createId("hero-trust"), text: "New trust chip" }],
                  })
                }
                onDelete={(id) => updateSection("hero", { trustItems: removeItem(homeContent.hero.trustItems, id) })}
                onMove={(index, direction) =>
                  updateSection("hero", { trustItems: moveItem(homeContent.hero.trustItems, index, direction) })
                }
                onUpdate={(id, text) =>
                  updateSection("hero", { trustItems: replaceItem(homeContent.hero.trustItems, id, { text }) })
                }
              />
            </HomeEditorSection>

            <HomeEditorSection id="mediaBand" label="Hero media band" note="Wide visual slot under the hero.">
              <MediaField
                media={homeContent.mediaBand.media}
                onChange={(patch) => updateMedia("mediaBand", patch)}
                onUpload={(file) => uploadMedia("mediaBand", file)}
                uploading={uploadingField === "mediaBand"}
              />
            </HomeEditorSection>

            <HomeEditorSection id="proofStrip" label="Trust strip" note="Small proof blocks below the media band.">
              <TitleCopyRepeater
                addLabel="Add proof item"
                items={homeContent.proofStrip.items}
                label="Proof items"
                onAdd={() =>
                  updateSection("proofStrip", {
                    items: [
                      ...homeContent.proofStrip.items,
                      { id: createId("proof"), title: "New proof item", copy: "" },
                    ],
                  })
                }
                onDelete={(id) => updateSection("proofStrip", { items: removeItem(homeContent.proofStrip.items, id) })}
                onMove={(index, direction) =>
                  updateSection("proofStrip", { items: moveItem(homeContent.proofStrip.items, index, direction) })
                }
                onUpdate={(id, patch) =>
                  updateSection("proofStrip", { items: replaceItem(homeContent.proofStrip.items, id, patch) })
                }
              />
            </HomeEditorSection>

            <HomeEditorSection id="intro" label="Intro section" note="Section number, heading and body paragraphs.">
              <div className="admin-form-grid">
                <TextField
                  label="Section number"
                  value={homeContent.intro.sectionNumber}
                  onChange={(value) => updateSection("intro", { sectionNumber: value })}
                />
                <TextField
                  label="Heading"
                  value={homeContent.intro.heading}
                  onChange={(value) => updateSection("intro", { heading: value })}
                />
              </div>
              <TextItemRepeater
                addLabel="Add paragraph"
                items={homeContent.intro.paragraphs}
                label="Paragraphs"
                multiline
                onAdd={() =>
                  updateSection("intro", {
                    paragraphs: [...homeContent.intro.paragraphs, { id: createId("intro"), text: "New paragraph" }],
                  })
                }
                onDelete={(id) => updateSection("intro", { paragraphs: removeItem(homeContent.intro.paragraphs, id) })}
                onMove={(index, direction) =>
                  updateSection("intro", { paragraphs: moveItem(homeContent.intro.paragraphs, index, direction) })
                }
                onUpdate={(id, text) =>
                  updateSection("intro", { paragraphs: replaceItem(homeContent.intro.paragraphs, id, { text }) })
                }
              />
            </HomeEditorSection>

            <HomeEditorSection id="programPathways" label="Program pathways" note="Homepage program rows.">
              <div className="admin-form-grid">
                <TextField
                  label="Eyebrow"
                  value={homeContent.programPathways.eyebrow}
                  onChange={(value) => updateSection("programPathways", { eyebrow: value })}
                />
                <TextField
                  label="Heading"
                  value={homeContent.programPathways.heading}
                  onChange={(value) => updateSection("programPathways", { heading: value })}
                />
                <TextArea
                  label="Intro copy"
                  value={homeContent.programPathways.copy}
                  onChange={(value) => updateSection("programPathways", { copy: value })}
                  wide
                />
              </div>
              <Repeater
                addLabel="Add program row"
                items={homeContent.programPathways.items}
                label="Program rows"
                onAdd={() =>
                  updateSection("programPathways", {
                    items: [
                      ...homeContent.programPathways.items,
                      {
                        id: createId("home-program"),
                        title: "New program",
                        copy: "",
                        href: "/programs",
                        duration: "",
                        summary: "",
                        outcome: "",
                        label: "",
                      },
                    ],
                  })
                }
                onDelete={(id) =>
                  updateSection("programPathways", { items: removeItem(homeContent.programPathways.items, id) })
                }
                onMove={(index, direction) =>
                  updateSection("programPathways", {
                    items: moveItem(homeContent.programPathways.items, index, direction),
                  })
                }
                renderItem={(item) => (
                  <ProgramFields
                    item={item}
                    onUpdate={(patch) =>
                      updateSection("programPathways", {
                        items: replaceItem(homeContent.programPathways.items, item.id, patch),
                      })
                    }
                  />
                )}
              />
            </HomeEditorSection>

            <HomeEditorSection id="differentiation" label="Differentiation cards" note="Retreat clarity cards.">
              <div className="admin-form-grid">
                <TextField
                  label="Eyebrow"
                  value={homeContent.differentiation.eyebrow}
                  onChange={(value) => updateSection("differentiation", { eyebrow: value })}
                />
                <TextField
                  label="Heading"
                  value={homeContent.differentiation.heading}
                  onChange={(value) => updateSection("differentiation", { heading: value })}
                />
              </div>
              <Repeater
                addLabel="Add card"
                items={homeContent.differentiation.cards}
                label="Cards"
                onAdd={() =>
                  updateSection("differentiation", {
                    cards: [
                      ...homeContent.differentiation.cards,
                      { id: createId("differentiation"), title: "New card", copy: "", highlighted: false },
                    ],
                  })
                }
                onDelete={(id) =>
                  updateSection("differentiation", { cards: removeItem(homeContent.differentiation.cards, id) })
                }
                onMove={(index, direction) =>
                  updateSection("differentiation", {
                    cards: moveItem(homeContent.differentiation.cards, index, direction),
                  })
                }
                renderItem={(item) => (
                  <DifferentiationFields
                    item={item}
                    onUpdate={(patch) =>
                      updateSection("differentiation", {
                        cards: replaceItem(homeContent.differentiation.cards, item.id, patch),
                      })
                    }
                  />
                )}
              />
            </HomeEditorSection>

            <HomeEditorSection id="rhythm" label="Daily rhythm" note="Dark schedule section.">
              <div className="admin-form-grid">
                <TextField
                  label="Eyebrow"
                  value={homeContent.rhythm.eyebrow}
                  onChange={(value) => updateSection("rhythm", { eyebrow: value })}
                />
                <TextField
                  label="Heading"
                  value={homeContent.rhythm.heading}
                  onChange={(value) => updateSection("rhythm", { heading: value })}
                />
                <TextArea
                  label="Body"
                  value={homeContent.rhythm.body}
                  onChange={(value) => updateSection("rhythm", { body: value })}
                  wide
                />
              </div>
              <TextItemRepeater
                addLabel="Add rhythm item"
                items={homeContent.rhythm.items}
                label="Rhythm list"
                onAdd={() =>
                  updateSection("rhythm", {
                    items: [...homeContent.rhythm.items, { id: createId("rhythm"), text: "New rhythm item" }],
                  })
                }
                onDelete={(id) => updateSection("rhythm", { items: removeItem(homeContent.rhythm.items, id) })}
                onMove={(index, direction) =>
                  updateSection("rhythm", { items: moveItem(homeContent.rhythm.items, index, direction) })
                }
                onUpdate={(id, text) =>
                  updateSection("rhythm", { items: replaceItem(homeContent.rhythm.items, id, { text }) })
                }
              />
            </HomeEditorSection>

            <HomeEditorSection id="team" label="Trust and team" note="Founder/facilitator trust section.">
              <div className="admin-form-grid">
                <TextField
                  label="Eyebrow"
                  value={homeContent.team.eyebrow}
                  onChange={(value) => updateSection("team", { eyebrow: value })}
                />
                <TextField
                  label="Heading"
                  value={homeContent.team.heading}
                  onChange={(value) => updateSection("team", { heading: value })}
                />
                <TextArea
                  label="Body"
                  value={homeContent.team.body}
                  onChange={(value) => updateSection("team", { body: value })}
                  wide
                />
              </div>
              <MediaField
                media={homeContent.team.media}
                onChange={(patch) => updateMedia("team", patch)}
                onUpload={(file) => uploadMedia("team", file)}
                uploading={uploadingField === "team"}
              />
              <TextItemRepeater
                addLabel="Add trust bullet"
                items={homeContent.team.bullets}
                label="Trust bullets"
                onAdd={() =>
                  updateSection("team", {
                    bullets: [...homeContent.team.bullets, { id: createId("team"), text: "New trust bullet" }],
                  })
                }
                onDelete={(id) => updateSection("team", { bullets: removeItem(homeContent.team.bullets, id) })}
                onMove={(index, direction) =>
                  updateSection("team", { bullets: moveItem(homeContent.team.bullets, index, direction) })
                }
                onUpdate={(id, text) =>
                  updateSection("team", { bullets: replaceItem(homeContent.team.bullets, id, { text }) })
                }
              />
            </HomeEditorSection>

            <HomeEditorSection id="travel" label="Travel confidence" note="International visitor confidence cards.">
              <div className="admin-form-grid">
                <TextField
                  label="Eyebrow"
                  value={homeContent.travel.eyebrow}
                  onChange={(value) => updateSection("travel", { eyebrow: value })}
                />
                <TextField
                  label="Heading"
                  value={homeContent.travel.heading}
                  onChange={(value) => updateSection("travel", { heading: value })}
                />
                <TextArea
                  label="Body"
                  value={homeContent.travel.body}
                  onChange={(value) => updateSection("travel", { body: value })}
                  wide
                />
              </div>
              <Repeater
                addLabel="Add travel card"
                items={homeContent.travel.cards}
                label="Travel cards"
                onAdd={() =>
                  updateSection("travel", {
                    cards: [
                      ...homeContent.travel.cards,
                      { id: createId("travel"), tag: "New", title: "New card", copy: "" },
                    ],
                  })
                }
                onDelete={(id) => updateSection("travel", { cards: removeItem(homeContent.travel.cards, id) })}
                onMove={(index, direction) =>
                  updateSection("travel", { cards: moveItem(homeContent.travel.cards, index, direction) })
                }
                renderItem={(item) => (
                  <TaggedCardFields
                    item={item}
                    onUpdate={(patch) =>
                      updateSection("travel", { cards: replaceItem(homeContent.travel.cards, item.id, patch) })
                    }
                  />
                )}
              />
            </HomeEditorSection>

            <HomeEditorSection id="location" label="Location clarity" note="Venue media and safety cards.">
              <div className="admin-form-grid">
                <TextField
                  label="Eyebrow"
                  value={homeContent.location.eyebrow}
                  onChange={(value) => updateSection("location", { eyebrow: value })}
                />
                <TextField
                  label="Heading"
                  value={homeContent.location.heading}
                  onChange={(value) => updateSection("location", { heading: value })}
                />
                <TextArea
                  label="Body"
                  value={homeContent.location.body}
                  onChange={(value) => updateSection("location", { body: value })}
                  wide
                />
              </div>
              <MediaField
                media={homeContent.location.media}
                onChange={(patch) => updateMedia("location", patch)}
                onUpload={(file) => uploadMedia("location", file)}
                uploading={uploadingField === "location"}
              />
              <TitleCopyRepeater
                addLabel="Add location card"
                items={homeContent.location.cards}
                label="Location cards"
                onAdd={() =>
                  updateSection("location", {
                    cards: [
                      ...homeContent.location.cards,
                      { id: createId("location"), title: "New location note", copy: "" },
                    ],
                  })
                }
                onDelete={(id) => updateSection("location", { cards: removeItem(homeContent.location.cards, id) })}
                onMove={(index, direction) =>
                  updateSection("location", { cards: moveItem(homeContent.location.cards, index, direction) })
                }
                onUpdate={(id, patch) =>
                  updateSection("location", { cards: replaceItem(homeContent.location.cards, id, patch) })
                }
              />
            </HomeEditorSection>

            <HomeEditorSection id="testimonials" label="Social proof" note="Testimonials and proof snippets.">
              <div className="admin-form-grid">
                <TextField
                  label="Eyebrow"
                  value={homeContent.testimonials.eyebrow}
                  onChange={(value) => updateSection("testimonials", { eyebrow: value })}
                />
                <TextField
                  label="Heading"
                  value={homeContent.testimonials.heading}
                  onChange={(value) => updateSection("testimonials", { heading: value })}
                />
              </div>
              <Repeater
                addLabel="Add testimonial"
                items={homeContent.testimonials.items}
                label="Testimonials"
                onAdd={() =>
                  updateSection("testimonials", {
                    items: [
                      ...homeContent.testimonials.items,
                      { id: createId("testimonial"), quote: "New testimonial quote", attribution: "" },
                    ],
                  })
                }
                onDelete={(id) =>
                  updateSection("testimonials", { items: removeItem(homeContent.testimonials.items, id) })
                }
                onMove={(index, direction) =>
                  updateSection("testimonials", {
                    items: moveItem(homeContent.testimonials.items, index, direction),
                  })
                }
                renderItem={(item) => (
                  <TestimonialFields
                    item={item}
                    onUpdate={(patch) =>
                      updateSection("testimonials", {
                        items: replaceItem(homeContent.testimonials.items, item.id, patch),
                      })
                    }
                  />
                )}
              />
            </HomeEditorSection>

            <HomeEditorSection id="consultation" label="Consultation CTA" note="Fit-call CTA and steps.">
              <div className="admin-form-grid">
                <TextField
                  label="Eyebrow"
                  value={homeContent.consultation.eyebrow}
                  onChange={(value) => updateSection("consultation", { eyebrow: value })}
                />
                <TextField
                  label="Heading"
                  value={homeContent.consultation.heading}
                  onChange={(value) => updateSection("consultation", { heading: value })}
                />
                <TextArea
                  label="Body"
                  value={homeContent.consultation.body}
                  onChange={(value) => updateSection("consultation", { body: value })}
                  wide
                />
                <TextField
                  label="CTA label"
                  value={homeContent.consultation.ctaLabel}
                  onChange={(value) => updateSection("consultation", { ctaLabel: value })}
                />
                <TextField
                  label="CTA href"
                  value={homeContent.consultation.ctaHref}
                  onChange={(value) => updateSection("consultation", { ctaHref: value })}
                />
              </div>
              <TitleCopyRepeater
                addLabel="Add step"
                items={homeContent.consultation.steps}
                label="Consultation steps"
                onAdd={() =>
                  updateSection("consultation", {
                    steps: [
                      ...homeContent.consultation.steps,
                      { id: createId("consultation"), title: "New step", copy: "" },
                    ],
                  })
                }
                onDelete={(id) =>
                  updateSection("consultation", { steps: removeItem(homeContent.consultation.steps, id) })
                }
                onMove={(index, direction) =>
                  updateSection("consultation", { steps: moveItem(homeContent.consultation.steps, index, direction) })
                }
                onUpdate={(id, patch) =>
                  updateSection("consultation", { steps: replaceItem(homeContent.consultation.steps, id, patch) })
                }
              />
            </HomeEditorSection>

            <HomeEditorSection id="leadForm" label="Lead form intro" note="Copy beside the existing suitability form.">
              <div className="admin-form-grid">
                <TextField
                  label="Eyebrow"
                  value={homeContent.leadForm.eyebrow}
                  onChange={(value) => updateSection("leadForm", { eyebrow: value })}
                />
                <TextField
                  label="Heading"
                  value={homeContent.leadForm.heading}
                  onChange={(value) => updateSection("leadForm", { heading: value })}
                />
                <TextArea
                  label="Body"
                  value={homeContent.leadForm.body}
                  onChange={(value) => updateSection("leadForm", { body: value })}
                  wide
                />
              </div>
            </HomeEditorSection>
          </div>

          <div className="admin-settings-savebar">
            <div>
              <strong>{dirty ? "Unsaved Home page changes" : "Home page saved"}</strong>
              <p className={saveState === "error" ? "is-error" : undefined}>
                {message || "Review section changes before publishing."}
              </p>
            </div>
            <div>
              <button className="admin-secondary-button" type="button" onClick={handleRevert} disabled={!dirty}>
                Revert
              </button>
              <button className="admin-primary-button" type="submit" disabled={!dirty || saveState === "saving"}>
                {saveState === "saving" ? "Saving..." : "Save Home page"}
              </button>
            </div>
          </div>
        </section>
      </form>
    </main>
  );
}

function HomeEditorSection({
  children,
  id,
  label,
  note,
}: Readonly<{ children: ReactNode; id: HomeSectionKey; label: string; note: string }>) {
  return (
    <details className="admin-home-section" id={`home-editor-${id}`} open>
      <summary>
        <span>{label}</span>
        <small>{note}</small>
      </summary>
      <div className="admin-home-section-body">{children}</div>
    </details>
  );
}

function TextField({
  label,
  onChange,
  value,
  wide,
}: Readonly<{ label: string; value: string; onChange: (value: string) => void; wide?: boolean }>) {
  return (
    <label className={`admin-field${wide ? " admin-field-wide" : ""}`}>
      {label}
      <input value={value} onChange={(event) => onChange(event.target.value)} />
    </label>
  );
}

function TextArea({
  label,
  onChange,
  value,
  wide,
}: Readonly<{ label: string; value: string; onChange: (value: string) => void; wide?: boolean }>) {
  return (
    <label className={`admin-field${wide ? " admin-field-wide" : ""}`}>
      {label}
      <textarea value={value} onChange={(event) => onChange(event.target.value)} />
    </label>
  );
}

function CheckboxField({
  checked,
  label,
  onChange,
}: Readonly<{ checked: boolean; label: string; onChange: (checked: boolean) => void }>) {
  return (
    <label className="admin-toggle-row admin-page-checkbox">
      <input type="checkbox" checked={checked} onChange={(event) => onChange(event.target.checked)} />
      <span>{label}</span>
    </label>
  );
}

function Repeater<T extends { id: string }>({
  addLabel,
  items,
  label,
  onAdd,
  onDelete,
  onMove,
  renderItem,
}: Readonly<{
  addLabel: string;
  items: T[];
  label: string;
  onAdd: () => void;
  onDelete: (id: string) => void;
  onMove: (index: number, direction: -1 | 1) => void;
  renderItem: (item: T, index: number) => ReactNode;
}>) {
  return (
    <div className="admin-repeater">
      <div className="admin-repeater-heading">
        <div>
          <p className="admin-kicker">{label}</p>
          <h3>{items.length} items</h3>
        </div>
        <button className="admin-secondary-button" type="button" onClick={onAdd}>
          {addLabel}
        </button>
      </div>
      {items.length ? (
        <div className="admin-repeater-list">
          {items.map((item, index) => (
            <article className="admin-repeater-card" key={item.id}>
              <div className="admin-repeater-card-top">
                <span>{String(index + 1).padStart(2, "0")}</span>
                <div>
                  <button
                    className="admin-secondary-button"
                    type="button"
                    onClick={() => onMove(index, -1)}
                    disabled={index === 0}
                  >
                    Up
                  </button>
                  <button
                    className="admin-secondary-button"
                    type="button"
                    onClick={() => onMove(index, 1)}
                    disabled={index === items.length - 1}
                  >
                    Down
                  </button>
                  <button className="admin-secondary-button" type="button" onClick={() => onDelete(item.id)}>
                    Delete
                  </button>
                </div>
              </div>
              {renderItem(item, index)}
            </article>
          ))}
        </div>
      ) : (
        <div className="admin-settings-warning">
          <strong>No items in this section</strong>
          <p>Add at least one item if this section should show content on the homepage.</p>
        </div>
      )}
    </div>
  );
}

function TextItemRepeater({
  addLabel,
  items,
  label,
  multiline,
  onAdd,
  onDelete,
  onMove,
  onUpdate,
}: Readonly<{
  addLabel: string;
  items: AdminHomeTextItem[];
  label: string;
  multiline?: boolean;
  onAdd: () => void;
  onDelete: (id: string) => void;
  onMove: (index: number, direction: -1 | 1) => void;
  onUpdate: (id: string, text: string) => void;
}>) {
  return (
    <Repeater
      addLabel={addLabel}
      items={items}
      label={label}
      onAdd={onAdd}
      onDelete={onDelete}
      onMove={onMove}
      renderItem={(item) =>
        multiline ? (
          <TextArea label="Text" value={item.text} onChange={(value) => onUpdate(item.id, value)} wide />
        ) : (
          <TextField label="Text" value={item.text} onChange={(value) => onUpdate(item.id, value)} wide />
        )
      }
    />
  );
}

function TitleCopyRepeater({
  addLabel,
  items,
  label,
  onAdd,
  onDelete,
  onMove,
  onUpdate,
}: Readonly<{
  addLabel: string;
  items: AdminHomeTitleCopyItem[];
  label: string;
  onAdd: () => void;
  onDelete: (id: string) => void;
  onMove: (index: number, direction: -1 | 1) => void;
  onUpdate: (id: string, patch: Partial<AdminHomeTitleCopyItem>) => void;
}>) {
  return (
    <Repeater
      addLabel={addLabel}
      items={items}
      label={label}
      onAdd={onAdd}
      onDelete={onDelete}
      onMove={onMove}
      renderItem={(item) => (
        <div className="admin-form-grid">
          <TextField label="Title" value={item.title} onChange={(value) => onUpdate(item.id, { title: value })} />
          <TextArea label="Copy" value={item.copy} onChange={(value) => onUpdate(item.id, { copy: value })} />
        </div>
      )}
    />
  );
}

function ProgramFields({
  item,
  onUpdate,
}: Readonly<{ item: AdminHomeProgramItem; onUpdate: (patch: Partial<AdminHomeProgramItem>) => void }>) {
  return (
    <div className="admin-form-grid">
      <TextField label="Title" value={item.title} onChange={(value) => onUpdate({ title: value })} />
      <TextField label="Program link" value={item.href} onChange={(value) => onUpdate({ href: value })} />
      <TextField label="Label" value={item.label} onChange={(value) => onUpdate({ label: value })} />
      <TextField label="Duration" value={item.duration} onChange={(value) => onUpdate({ duration: value })} />
      <TextArea label="Short summary" value={item.summary} onChange={(value) => onUpdate({ summary: value })} />
      <TextArea label="Outcome" value={item.outcome} onChange={(value) => onUpdate({ outcome: value })} />
    </div>
  );
}

function DifferentiationFields({
  item,
  onUpdate,
}: Readonly<{
  item: AdminHomeDifferentiationCard;
  onUpdate: (patch: Partial<AdminHomeDifferentiationCard>) => void;
}>) {
  return (
    <div className="admin-form-grid">
      <TextField label="Title" value={item.title} onChange={(value) => onUpdate({ title: value })} />
      <TextArea label="Copy" value={item.copy} onChange={(value) => onUpdate({ copy: value })} />
      <CheckboxField
        checked={item.highlighted}
        label="Use warm boundary styling"
        onChange={(checked) => onUpdate({ highlighted: checked })}
      />
    </div>
  );
}

function TaggedCardFields({
  item,
  onUpdate,
}: Readonly<{ item: AdminHomeTaggedCard; onUpdate: (patch: Partial<AdminHomeTaggedCard>) => void }>) {
  return (
    <div className="admin-form-grid">
      <TextField label="Tag" value={item.tag} onChange={(value) => onUpdate({ tag: value })} />
      <TextField label="Title" value={item.title} onChange={(value) => onUpdate({ title: value })} />
      <TextArea label="Copy" value={item.copy} onChange={(value) => onUpdate({ copy: value })} wide />
    </div>
  );
}

function TestimonialFields({
  item,
  onUpdate,
}: Readonly<{ item: AdminHomeTestimonial; onUpdate: (patch: Partial<AdminHomeTestimonial>) => void }>) {
  return (
    <div className="admin-form-grid">
      <TextArea label="Quote" value={item.quote} onChange={(value) => onUpdate({ quote: value })} />
      <TextField
        label="Attribution"
        value={item.attribution}
        onChange={(value) => onUpdate({ attribution: value })}
      />
    </div>
  );
}

function MediaField({
  media,
  onChange,
  onUpload,
  uploading,
}: Readonly<{
  media: AdminHomeMedia;
  onChange: (patch: Partial<AdminHomeMedia>) => void;
  onUpload: (file: File | null) => void;
  uploading: boolean;
}>) {
  function handleUpload(event: ChangeEvent<HTMLInputElement>) {
    onUpload(event.target.files?.[0] ?? null);
    event.target.value = "";
  }

  return (
    <div className="admin-media-editor">
      <div className="admin-media-preview">
        {media.src ? (
          media.kind === "video" ? (
            <video controls muted playsInline src={media.src} />
          ) : (
            <img src={media.src} alt={media.alt || media.caption} />
          )
        ) : (
          <div>
            <strong>No media uploaded</strong>
            <p>The public page will keep the existing placeholder until a file is uploaded and saved.</p>
          </div>
        )}
      </div>
      <div className="admin-form-stack">
        <label className="admin-field">
          Upload image or video
          <input accept="image/*,video/*" type="file" onChange={handleUpload} disabled={uploading} />
        </label>
        <div className="admin-form-grid">
          <TextField label="Placeholder label" value={media.placeholder} onChange={(value) => onChange({ placeholder: value })} />
          <TextField label="Alt text" value={media.alt} onChange={(value) => onChange({ alt: value })} />
          <TextArea label="Caption" value={media.caption} onChange={(value) => onChange({ caption: value })} wide />
        </div>
        {media.src ? (
          <div className="admin-media-current">
            <span>{media.kind || "media"}</span>
            <code>{media.src}</code>
            <button className="admin-secondary-button" type="button" onClick={() => onChange({ kind: "", src: "" })}>
              Clear media
            </button>
          </div>
        ) : null}
        {uploading ? <p className="admin-form-status">Uploading media...</p> : null}
      </div>
    </div>
  );
}
