"use client";

import Link from "next/link";
import { ChangeEvent, FormEvent, ReactNode, useMemo, useState } from "react";
import type { AdminAboutStoryContent, AdminStoryCard, AdminStoryMedia, AdminStoryTextItem } from "@/lib/admin/about-story-content";
import type { AdminManagedPage, AdminPageContentStore, AdminPageStatus } from "@/lib/admin/page-content";

type SaveState = "idle" | "saving" | "saved" | "error";
type MediaSlot = "hero" | "founder" | "principles" | "roots" | "guestCare" | "standards";

const sections = [
  ["hero", "Hero", "First impression, CTAs and lead image."],
  ["pillars", "Story pillars", "Three short trust signals."],
  ["positioning", "Positioning", "What Shreevan is and is not."],
  ["founder", "Founder intention", "Founder story and supporting image."],
  ["principles", "Brand principles", "Trust standards shown as cards."],
  ["roots", "Rishikesh roots", "Location context and supporting image."],
  ["guestCare", "Guest care", "Before, during and after care pathway."],
  ["standards", "Responsible wellness", "Boundaries and credible proof."],
  ["closingCta", "Closing CTA", "Final conversion section."],
] as const;

function clone<T>(value: T): T { return JSON.parse(JSON.stringify(value)) as T; }
function createId(prefix: string) { return `${prefix}-${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 7)}`; }
function move<T>(items: T[], index: number, direction: -1 | 1) { const target = index + direction; if (target < 0 || target >= items.length) return items; const next = [...items]; const [item] = next.splice(index, 1); next.splice(target, 0, item); return next; }
function replace<T extends { id: string }>(items: T[], id: string, patch: Partial<T>) { return items.map((item) => item.id === id ? { ...item, ...patch } : item); }
function statusLabel(status: AdminPageStatus) { return status.charAt(0).toUpperCase() + status.slice(1); }

function validationError(page: AdminManagedPage, content: AdminAboutStoryContent) {
  if (!page.path.trim().startsWith("/")) return "Public path must begin with a slash.";
  if (!page.seo.title.trim()) return "Add a meta title before saving.";
  if (!page.seo.description.trim()) return "Add a meta description before saving.";
  if (!content.hero.title.trim()) return "Add a hero headline before saving.";
  return "";
}

export function AdminAboutStoryEditorPanel({ initialPageContent, pageId }: Readonly<{ initialPageContent: AdminPageContentStore; pageId: string }>) {
  const [pageContent, setPageContent] = useState(() => clone(initialPageContent));
  const [savedPageContent, setSavedPageContent] = useState(() => clone(initialPageContent));
  const [saveState, setSaveState] = useState<SaveState>("idle");
  const [message, setMessage] = useState("");
  const [uploading, setUploading] = useState<MediaSlot | "">("");
  const page = pageContent.pages.find((item) => item.id === pageId);
  const content = page?.content?.aboutStory;
  const dirty = useMemo(() => JSON.stringify(pageContent) !== JSON.stringify(savedPageContent), [pageContent, savedPageContent]);

  function updatePage(patch: Partial<AdminManagedPage>) {
    setPageContent((current) => ({ ...current, pages: current.pages.map((item) => item.id === pageId ? { ...item, ...patch } : item) }));
  }

  function updateContent(updater: (current: AdminAboutStoryContent) => AdminAboutStoryContent) {
    setPageContent((current) => ({
      ...current,
      pages: current.pages.map((item) => item.id === pageId
        ? { ...item, content: { ...item.content, aboutStory: updater(item.content?.aboutStory ?? content!) } }
        : item),
    }));
  }

  function updateSeo(field: keyof AdminManagedPage["seo"], value: string | boolean) {
    if (!page) return;
    updatePage({ seo: { ...page.seo, [field]: value } });
  }

  function updateMedia(slot: MediaSlot, patch: Partial<AdminStoryMedia>) {
    updateContent((current) => ({
      ...current,
      [slot]: slot === "hero"
        ? { ...current.hero, media: { ...current.hero.media, ...patch } }
        : { ...current[slot], media: { ...current[slot].media, ...patch } },
    } as AdminAboutStoryContent));
  }

  async function uploadMedia(slot: MediaSlot, file: File | null) {
    if (!file) return;
    setUploading(slot);
    setMessage("");
    const data = new FormData();
    data.append("file", file);
    try {
      const response = await fetch("/api/admin/pages/media", { method: "POST", body: data });
      const body = await response.json().catch(() => null) as { media?: { kind: "image" | "video"; src: string }; error?: string } | null;
      if (!response.ok || !body?.media) throw new Error(body?.error ?? "Image upload failed.");
      if (body.media.kind !== "image") throw new Error("This section uses an image. Upload a JPG, PNG, WEBP or GIF file.");
      updateMedia(slot, { src: body.media.src });
      setMessage("Image uploaded. Save page changes to publish it.");
    } catch (error) {
      setSaveState("error");
      setMessage(error instanceof Error ? error.message : "Image upload failed.");
    } finally {
      setUploading("");
    }
  }

  async function save(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!page || !content) return;
    const error = validationError(page, content);
    if (error) { setSaveState("error"); setMessage(error); return; }
    setSaveState("saving");
    setMessage("");
    try {
      const response = await fetch("/api/admin/pages", { method: "PUT", headers: { "Content-Type": "application/json" }, body: JSON.stringify(pageContent) });
      const body = await response.json().catch(() => null) as { pageContent?: AdminPageContentStore; error?: string } | null;
      if (!response.ok || !body?.pageContent) throw new Error(body?.error ?? "Page content could not be saved.");
      setPageContent(clone(body.pageContent));
      setSavedPageContent(clone(body.pageContent));
      setSaveState("saved");
      setMessage("Our Story page saved and connected to the public site.");
    } catch (error) {
      setSaveState("error");
      setMessage(error instanceof Error ? error.message : "Page content could not be saved.");
    }
  }

  if (!page || !content) return null;
  const error = validationError(page, content);

  return (
    <main className="admin-dashboard admin-story-editor-page" aria-labelledby="story-editor-title">
      <section className="admin-page-editor-toolbar">
        <Link className="admin-secondary-button" href="/admin/pages">Back to pages</Link>
        <div>
          <p className="admin-kicker">Connected page builder</p>
          <h2 id="story-editor-title">Our Story</h2>
          <p>{page.path} - 9 editable content sections</p>
        </div>
        <Link className="admin-secondary-button" href={page.path} target="_blank">Preview page</Link>
      </section>

      <form className="admin-story-builder" onSubmit={save}>
        <aside className="admin-story-builder-nav" aria-label="Our Story sections">
          <p className="admin-kicker">Page structure</p>
          <strong>Our Story</strong>
          <span>Published page</span>
          <nav>
            {sections.map(([key, label], index) => <a href={`#story-${key}`} key={key}><b>{String(index + 1).padStart(2, "0")}</b>{label}</a>)}
            <a href="#story-settings"><b>10</b>SEO & publishing</a>
          </nav>
          <p>Only fields that exist on this public page are shown here. Global header and footer remain in Global Settings.</p>
        </aside>

        <section className="admin-panel admin-story-editor-surface">
          <div className="admin-panel-heading admin-settings-heading">
            <div><p className="admin-kicker">Content editor</p><h2>Edit the actual page sections</h2></div>
            <span>{dirty ? "Unsaved" : "Saved"}</span>
          </div>
          <p className="admin-story-editor-intro">Edit in reading order. Images are requested only where the public design has a visual slot.</p>

          <StorySection id="hero" number="01" label="Hero" note="First viewport: introduction, calls to action and feature image." open>
            <FieldGrid><TextField label="Eyebrow" value={content.hero.eyebrow} onChange={(value) => updateContent((current) => ({ ...current, hero: { ...current.hero, eyebrow: value } }))} /><TextField label="Headline" value={content.hero.title} onChange={(value) => updateContent((current) => ({ ...current, hero: { ...current.hero, title: value } }))} /><TextArea label="Lead copy" value={content.hero.lede} onChange={(value) => updateContent((current) => ({ ...current, hero: { ...current.hero, lede: value } }))} wide /><TextField label="Primary CTA label" value={content.hero.primaryCtaLabel} onChange={(value) => updateContent((current) => ({ ...current, hero: { ...current.hero, primaryCtaLabel: value } }))} /><TextField label="Primary CTA link" value={content.hero.primaryCtaHref} onChange={(value) => updateContent((current) => ({ ...current, hero: { ...current.hero, primaryCtaHref: value } }))} /><TextField label="Secondary CTA label" value={content.hero.secondaryCtaLabel} onChange={(value) => updateContent((current) => ({ ...current, hero: { ...current.hero, secondaryCtaLabel: value } }))} /><TextField label="Secondary CTA link" value={content.hero.secondaryCtaHref} onChange={(value) => updateContent((current) => ({ ...current, hero: { ...current.hero, secondaryCtaHref: value } }))} /></FieldGrid>
            <MediaField media={content.hero.media} label="Hero image" uploading={uploading === "hero"} onUpload={(file) => uploadMedia("hero", file)} onChange={(patch) => updateMedia("hero", patch)} />
          </StorySection>

          <StorySection id="pillars" number="02" label="Story pillars" note="Compact proof strip directly after the hero.">
            <CardRepeater label="Pillars" addLabel="Add pillar" items={content.pillars} onAdd={() => updateContent((current) => ({ ...current, pillars: [...current.pillars, { id: createId("pillar"), title: "New pillar", copy: "" }] }))} onChange={(id, patch) => updateContent((current) => ({ ...current, pillars: replace(current.pillars, id, patch) }))} onDelete={(id) => updateContent((current) => ({ ...current, pillars: current.pillars.filter((item) => item.id !== id) }))} onMove={(index, direction) => updateContent((current) => ({ ...current, pillars: move(current.pillars, index, direction) }))} />
          </StorySection>

          <StorySection id="positioning" number="03" label="Positioning" note="Editorial explanation of what the brand is and is not.">
            <FieldGrid><TextField label="Eyebrow" value={content.positioning.eyebrow} onChange={(value) => updateContent((current) => ({ ...current, positioning: { ...current.positioning, eyebrow: value } }))} /><TextField label="Heading" value={content.positioning.heading} onChange={(value) => updateContent((current) => ({ ...current, positioning: { ...current.positioning, heading: value } }))} /></FieldGrid>
            <CardRepeater label="Positioning rows" addLabel="Add row" items={content.positioning.rows} onAdd={() => updateContent((current) => ({ ...current, positioning: { ...current.positioning, rows: [...current.positioning.rows, { id: createId("positioning"), title: "New statement", copy: "" }] } }))} onChange={(id, patch) => updateContent((current) => ({ ...current, positioning: { ...current.positioning, rows: replace(current.positioning.rows, id, patch) } }))} onDelete={(id) => updateContent((current) => ({ ...current, positioning: { ...current.positioning, rows: current.positioning.rows.filter((item) => item.id !== id) } }))} onMove={(index, direction) => updateContent((current) => ({ ...current, positioning: { ...current.positioning, rows: move(current.positioning.rows, index, direction) } }))} />
          </StorySection>

          <StorySection id="founder" number="04" label="Founder intention" note="Founder narrative with one supporting image.">
            <FieldGrid><TextField label="Section marker" value={content.founder.sectionNumber} onChange={(value) => updateContent((current) => ({ ...current, founder: { ...current.founder, sectionNumber: value } }))} /><TextField label="Heading" value={content.founder.heading} onChange={(value) => updateContent((current) => ({ ...current, founder: { ...current.founder, heading: value } }))} /></FieldGrid>
            <TextRepeater label="Paragraphs" addLabel="Add paragraph" multiline items={content.founder.paragraphs} onAdd={() => updateContent((current) => ({ ...current, founder: { ...current.founder, paragraphs: [...current.founder.paragraphs, { id: createId("founder"), text: "" }] } }))} onChange={(id, text) => updateContent((current) => ({ ...current, founder: { ...current.founder, paragraphs: replace(current.founder.paragraphs, id, { text }) } }))} onDelete={(id) => updateContent((current) => ({ ...current, founder: { ...current.founder, paragraphs: current.founder.paragraphs.filter((item) => item.id !== id) } }))} onMove={(index, direction) => updateContent((current) => ({ ...current, founder: { ...current.founder, paragraphs: move(current.founder.paragraphs, index, direction) } }))} />
            <MediaField media={content.founder.media} label="Founder intention image" uploading={uploading === "founder"} onUpload={(file) => uploadMedia("founder", file)} onChange={(patch) => updateMedia("founder", patch)} />
          </StorySection>

          <StorySection id="principles" number="05" label="Brand principles" note="Principle cards and an editorial supporting image.">
            <FieldGrid><TextField label="Eyebrow" value={content.principles.eyebrow} onChange={(value) => updateContent((current) => ({ ...current, principles: { ...current.principles, eyebrow: value } }))} /><TextField label="Heading" value={content.principles.heading} onChange={(value) => updateContent((current) => ({ ...current, principles: { ...current.principles, heading: value } }))} /><TextArea label="Intro copy" value={content.principles.body} onChange={(value) => updateContent((current) => ({ ...current, principles: { ...current.principles, body: value } }))} wide /></FieldGrid>
            <MediaField media={content.principles.media} label="Principles image" uploading={uploading === "principles"} onUpload={(file) => uploadMedia("principles", file)} onChange={(patch) => updateMedia("principles", patch)} />
            <CardRepeater label="Principles" addLabel="Add principle" items={content.principles.items} onAdd={() => updateContent((current) => ({ ...current, principles: { ...current.principles, items: [...current.principles.items, { id: createId("principle"), title: "New principle", copy: "" }] } }))} onChange={(id, patch) => updateContent((current) => ({ ...current, principles: { ...current.principles, items: replace(current.principles.items, id, patch) } }))} onDelete={(id) => updateContent((current) => ({ ...current, principles: { ...current.principles, items: current.principles.items.filter((item) => item.id !== id) } }))} onMove={(index, direction) => updateContent((current) => ({ ...current, principles: { ...current.principles, items: move(current.principles.items, index, direction) } }))} />
          </StorySection>

          <StorySection id="roots" number="06" label="Rishikesh roots" note="Location context with one supporting image.">
            <FieldGrid><TextField label="Eyebrow" value={content.roots.eyebrow} onChange={(value) => updateContent((current) => ({ ...current, roots: { ...current.roots, eyebrow: value } }))} /><TextField label="Heading" value={content.roots.heading} onChange={(value) => updateContent((current) => ({ ...current, roots: { ...current.roots, heading: value } }))} /></FieldGrid>
            <TextRepeater label="Paragraphs" addLabel="Add paragraph" multiline items={content.roots.paragraphs} onAdd={() => updateContent((current) => ({ ...current, roots: { ...current.roots, paragraphs: [...current.roots.paragraphs, { id: createId("roots"), text: "" }] } }))} onChange={(id, text) => updateContent((current) => ({ ...current, roots: { ...current.roots, paragraphs: replace(current.roots.paragraphs, id, { text }) } }))} onDelete={(id) => updateContent((current) => ({ ...current, roots: { ...current.roots, paragraphs: current.roots.paragraphs.filter((item) => item.id !== id) } }))} onMove={(index, direction) => updateContent((current) => ({ ...current, roots: { ...current.roots, paragraphs: move(current.roots.paragraphs, index, direction) } }))} />
            <MediaField media={content.roots.media} label="Rishikesh roots image" uploading={uploading === "roots"} onUpload={(file) => uploadMedia("roots", file)} onChange={(patch) => updateMedia("roots", patch)} />
          </StorySection>

          <StorySection id="guestCare" number="07" label="Guest care" note="Clear pathway for guest support before, during and after the stay.">
            <FieldGrid><TextField label="Eyebrow" value={content.guestCare.eyebrow} onChange={(value) => updateContent((current) => ({ ...current, guestCare: { ...current.guestCare, eyebrow: value } }))} /><TextField label="Heading" value={content.guestCare.heading} onChange={(value) => updateContent((current) => ({ ...current, guestCare: { ...current.guestCare, heading: value } }))} /></FieldGrid>
            <MediaField media={content.guestCare.media} label="Guest-care image" uploading={uploading === "guestCare"} onUpload={(file) => uploadMedia("guestCare", file)} onChange={(patch) => updateMedia("guestCare", patch)} />
            <CardRepeater label="Care steps" addLabel="Add care step" items={content.guestCare.steps} onAdd={() => updateContent((current) => ({ ...current, guestCare: { ...current.guestCare, steps: [...current.guestCare.steps, { id: createId("guest-care"), title: "New step", copy: "" }] } }))} onChange={(id, patch) => updateContent((current) => ({ ...current, guestCare: { ...current.guestCare, steps: replace(current.guestCare.steps, id, patch) } }))} onDelete={(id) => updateContent((current) => ({ ...current, guestCare: { ...current.guestCare, steps: current.guestCare.steps.filter((item) => item.id !== id) } }))} onMove={(index, direction) => updateContent((current) => ({ ...current, guestCare: { ...current.guestCare, steps: move(current.guestCare.steps, index, direction) } }))} />
          </StorySection>

          <StorySection id="standards" number="08" label="Responsible wellness" note="Visible boundaries, proof and one supporting image.">
            <FieldGrid><TextField label="Eyebrow" value={content.standards.eyebrow} onChange={(value) => updateContent((current) => ({ ...current, standards: { ...current.standards, eyebrow: value } }))} /><TextField label="Heading" value={content.standards.heading} onChange={(value) => updateContent((current) => ({ ...current, standards: { ...current.standards, heading: value } }))} /><TextArea label="Body copy" value={content.standards.body} onChange={(value) => updateContent((current) => ({ ...current, standards: { ...current.standards, body: value } }))} wide /></FieldGrid>
            <MediaField media={content.standards.media} label="Standards image" uploading={uploading === "standards"} onUpload={(file) => uploadMedia("standards", file)} onChange={(patch) => updateMedia("standards", patch)} />
            <TextRepeater label="Standards" addLabel="Add standard" items={content.standards.items} onAdd={() => updateContent((current) => ({ ...current, standards: { ...current.standards, items: [...current.standards.items, { id: createId("standard"), text: "" }] } }))} onChange={(id, text) => updateContent((current) => ({ ...current, standards: { ...current.standards, items: replace(current.standards.items, id, { text }) } }))} onDelete={(id) => updateContent((current) => ({ ...current, standards: { ...current.standards, items: current.standards.items.filter((item) => item.id !== id) } }))} onMove={(index, direction) => updateContent((current) => ({ ...current, standards: { ...current.standards, items: move(current.standards.items, index, direction) } }))} />
          </StorySection>

          <StorySection id="closingCta" number="09" label="Closing CTA" note="Final section that sends the visitor to a consultation.">
            <FieldGrid><TextField label="Eyebrow" value={content.closingCta.eyebrow} onChange={(value) => updateContent((current) => ({ ...current, closingCta: { ...current.closingCta, eyebrow: value } }))} /><TextField label="Heading" value={content.closingCta.heading} onChange={(value) => updateContent((current) => ({ ...current, closingCta: { ...current.closingCta, heading: value } }))} /><TextArea label="Body copy" value={content.closingCta.body} onChange={(value) => updateContent((current) => ({ ...current, closingCta: { ...current.closingCta, body: value } }))} wide /><TextField label="CTA label" value={content.closingCta.label} onChange={(value) => updateContent((current) => ({ ...current, closingCta: { ...current.closingCta, label: value } }))} /><TextField label="CTA link" value={content.closingCta.href} onChange={(value) => updateContent((current) => ({ ...current, closingCta: { ...current.closingCta, href: value } }))} /></FieldGrid>
          </StorySection>

          <StorySection id="settings" number="10" label="SEO & publishing" note="Technical page settings, kept separate from content editing.">
            <FieldGrid><TextField label="Admin page label" value={page.title} onChange={(value) => updatePage({ title: value })} /><TextField label="Public path" value={page.path} onChange={(value) => updatePage({ path: value })} /><label className="admin-field">Publishing status<select value={page.status} onChange={(event) => updatePage({ status: event.target.value as AdminPageStatus })}><option value="published">Published</option><option value="draft">Draft</option><option value="archived">Archived</option></select></label><label className="admin-toggle-row admin-page-checkbox"><input type="checkbox" checked={page.seo.noindex} onChange={(event) => updateSeo("noindex", event.target.checked)} /><span>Keep out of Google<small>Use only for pages that should not appear in search.</small></span></label><TextField label="Meta title" value={page.seo.title} onChange={(value) => updateSeo("title", value)} /><TextArea label="Meta description" value={page.seo.description} onChange={(value) => updateSeo("description", value)} /><TextField label="Canonical path" value={page.seo.canonicalPath} onChange={(value) => updateSeo("canonicalPath", value)} /><TextArea label="Internal notes" value={page.notes} onChange={(value) => updatePage({ notes: value })} /></FieldGrid>
          </StorySection>

          <div className="admin-settings-savebar">
            <div><strong>{dirty ? "Unsaved changes" : `Page ${statusLabel(page.status).toLowerCase()}`}</strong><p className={saveState === "error" ? "is-error" : undefined}>{message || error || "Review section changes, then save."}</p></div>
            <div><button className="admin-secondary-button" type="button" disabled={!dirty} onClick={() => { setPageContent(clone(savedPageContent)); setSaveState("idle"); setMessage("Unsaved changes reverted."); }}>Revert</button><button className="admin-primary-button" type="submit" disabled={!dirty || saveState === "saving"}>{saveState === "saving" ? "Saving..." : "Save Our Story"}</button></div>
          </div>
        </section>
      </form>
    </main>
  );
}

function StorySection({ id, number, label, note, open = false, children }: Readonly<{ id: string; number: string; label: string; note: string; open?: boolean; children: ReactNode }>) { return <details className="admin-story-section" id={`story-${id}`} open={open}><summary><span>{number}</span><div><strong>{label}</strong><small>{note}</small></div></summary><div className="admin-story-section-body">{children}</div></details>; }
function FieldGrid({ children }: Readonly<{ children: ReactNode }>) { return <div className="admin-form-grid">{children}</div>; }
function TextField({ label, value, onChange }: Readonly<{ label: string; value: string; onChange: (value: string) => void }>) { return <label className="admin-field">{label}<input value={value} onChange={(event) => onChange(event.target.value)} /></label>; }
function TextArea({ label, value, onChange, wide = false }: Readonly<{ label: string; value: string; onChange: (value: string) => void; wide?: boolean }>) { return <label className={wide ? "admin-field admin-field-wide" : "admin-field"}>{label}<textarea value={value} onChange={(event) => onChange(event.target.value)} /></label>; }

function MediaField({ label, media, uploading, onUpload, onChange }: Readonly<{ label: string; media: AdminStoryMedia; uploading: boolean; onUpload: (file: File | null) => void; onChange: (patch: Partial<AdminStoryMedia>) => void }>) {
  function upload(event: ChangeEvent<HTMLInputElement>) { onUpload(event.target.files?.[0] ?? null); event.target.value = ""; }
  return <div className="admin-story-media"><div className="admin-media-preview">{media.src ? <img src={media.src} alt={media.alt || media.caption || ""} /> : <div><strong>No image selected</strong><p>Upload only if this public section needs a visual.</p></div>}</div><div className="admin-form-stack"><label className="admin-field">{label}<input type="file" accept="image/jpeg,image/png,image/webp,image/gif" onChange={upload} disabled={uploading} /></label><FieldGrid><TextField label="Alt text" value={media.alt} onChange={(value) => onChange({ alt: value })} /><TextField label="Caption" value={media.caption} onChange={(value) => onChange({ caption: value })} /></FieldGrid>{media.src ? <button className="admin-secondary-button" type="button" onClick={() => onChange({ src: "" })}>Remove image</button> : null}{uploading ? <p className="admin-form-status">Uploading image...</p> : null}</div></div>;
}

function CardRepeater({ label, addLabel, items, onAdd, onChange, onDelete, onMove }: Readonly<{ label: string; addLabel: string; items: AdminStoryCard[]; onAdd: () => void; onChange: (id: string, patch: Partial<AdminStoryCard>) => void; onDelete: (id: string) => void; onMove: (index: number, direction: -1 | 1) => void }>) { return <div className="admin-story-repeater"><div className="admin-story-repeater-head"><strong>{label}</strong><button className="admin-secondary-button" type="button" onClick={onAdd}>{addLabel}</button></div>{items.map((item, index) => <div className="admin-story-repeater-item" key={item.id}><div><b>{String(index + 1).padStart(2, "0")}</b><button type="button" className="admin-text-button" onClick={() => onMove(index, -1)} disabled={index === 0}>Move up</button><button type="button" className="admin-text-button" onClick={() => onMove(index, 1)} disabled={index === items.length - 1}>Move down</button></div><FieldGrid><TextField label="Title" value={item.title} onChange={(value) => onChange(item.id, { title: value })} /><TextArea label="Copy" value={item.copy} onChange={(value) => onChange(item.id, { copy: value })} /></FieldGrid><button className="admin-danger-button" type="button" onClick={() => onDelete(item.id)}>Delete</button></div>)}</div>; }
function TextRepeater({ label, addLabel, items, multiline = false, onAdd, onChange, onDelete, onMove }: Readonly<{ label: string; addLabel: string; items: AdminStoryTextItem[]; multiline?: boolean; onAdd: () => void; onChange: (id: string, text: string) => void; onDelete: (id: string) => void; onMove: (index: number, direction: -1 | 1) => void }>) { return <div className="admin-story-repeater"><div className="admin-story-repeater-head"><strong>{label}</strong><button className="admin-secondary-button" type="button" onClick={onAdd}>{addLabel}</button></div>{items.map((item, index) => <div className="admin-story-repeater-item" key={item.id}><div><b>{String(index + 1).padStart(2, "0")}</b><button type="button" className="admin-text-button" onClick={() => onMove(index, -1)} disabled={index === 0}>Move up</button><button type="button" className="admin-text-button" onClick={() => onMove(index, 1)} disabled={index === items.length - 1}>Move down</button></div>{multiline ? <TextArea label="Copy" value={item.text} onChange={(value) => onChange(item.id, value)} /> : <TextField label="Text" value={item.text} onChange={(value) => onChange(item.id, value)} />}<button className="admin-danger-button" type="button" onClick={() => onDelete(item.id)}>Delete</button></div>)}</div>; }
