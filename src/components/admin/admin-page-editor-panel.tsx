"use client";

import Link from "next/link";
import { FormEvent, useMemo, useState } from "react";
import type { AdminManagedPage, AdminPageContentStore, AdminPageStatus } from "@/lib/admin/page-content";

type SaveState = "idle" | "saving" | "saved" | "error";

function clonePageContent(pageContent: AdminPageContentStore): AdminPageContentStore {
  return JSON.parse(JSON.stringify(pageContent)) as AdminPageContentStore;
}

function statusLabel(status: AdminPageStatus) {
  if (status === "published") {
    return "Published";
  }

  if (status === "archived") {
    return "Archived";
  }

  return "Draft";
}

function pageValidationError(page: AdminManagedPage) {
  if (!page.title.trim()) {
    return "Add a page label before saving.";
  }

  if (!page.path.trim().startsWith("/")) {
    return "Public path must begin with a slash, for example /contact.";
  }

  if (!page.seo.canonicalPath.trim().startsWith("/")) {
    return "Canonical path must begin with a slash.";
  }

  if (!page.seo.title.trim()) {
    return "Add a meta title before saving.";
  }

  return "";
}

export function AdminPageEditorPanel({
  initialPageContent,
  pageId,
}: Readonly<{
  initialPageContent: AdminPageContentStore;
  pageId: string;
}>) {
  const [pageContent, setPageContent] = useState(() => clonePageContent(initialPageContent));
  const [savedPageContent, setSavedPageContent] = useState(() => clonePageContent(initialPageContent));
  const [saveState, setSaveState] = useState<SaveState>("idle");
  const [message, setMessage] = useState("");

  const activePage = pageContent.pages.find((page) => page.id === pageId);
  const dirty = useMemo(
    () => JSON.stringify(pageContent) !== JSON.stringify(savedPageContent),
    [pageContent, savedPageContent],
  );

  function updateActivePage(patch: Partial<AdminManagedPage>) {
    setPageContent((current) => ({
      ...current,
      pages: current.pages.map((page) => (page.id === pageId ? { ...page, ...patch } : page)),
    }));
  }

  function updateSeo(field: keyof AdminManagedPage["seo"], value: string | boolean) {
    setPageContent((current) => ({
      ...current,
      pages: current.pages.map((page) =>
        page.id === pageId ? { ...page, seo: { ...page.seo, [field]: value } } : page,
      ),
    }));
  }

  function updateHero(field: keyof AdminManagedPage["hero"], value: string) {
    setPageContent((current) => ({
      ...current,
      pages: current.pages.map((page) =>
        page.id === pageId ? { ...page, hero: { ...page.hero, [field]: value } } : page,
      ),
    }));
  }

  async function handleSave(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (!activePage) {
      return;
    }

    const validationError = pageValidationError(activePage);

    if (validationError) {
      setSaveState("error");
      setMessage(validationError);
      return;
    }

    setSaveState("saving");
    setMessage("");

    try {
      const response = await fetch("/api/admin/pages", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(pageContent),
      });
      const body = (await response.json().catch(() => null)) as
        | { pageContent?: AdminPageContentStore; error?: string }
        | null;

      if (!response.ok || !body?.pageContent) {
        setSaveState("error");
        setMessage(body?.error ?? "Page content could not be saved.");
        return;
      }

      setPageContent(clonePageContent(body.pageContent));
      setSavedPageContent(clonePageContent(body.pageContent));
      setSaveState("saved");
      setMessage("Page changes saved.");
    } catch {
      setSaveState("error");
      setMessage("Page content could not be saved. Check your connection and try again.");
    }
  }

  function handleRevert() {
    setPageContent(clonePageContent(savedPageContent));
    setSaveState("idle");
    setMessage("Unsaved changes reverted.");
  }

  if (!activePage) {
    return null;
  }

  const validationError = pageValidationError(activePage);

  return (
    <main className="admin-dashboard admin-page-editor-page" aria-labelledby="admin-page-editor-title">
      <section className="admin-page-editor-toolbar">
        <Link className="admin-secondary-button" href="/admin/pages">
          Back to pages
        </Link>
        <div>
          <p className="admin-kicker">Page editor</p>
          <h2 id="admin-page-editor-title">{activePage.title}</h2>
          <p>{activePage.path}</p>
        </div>
        <span className={activePage.connected ? "admin-page-editor-live is-live" : "admin-page-editor-live"}>
          {activePage.connected ? "Editor connected" : "Editor not connected"}
        </span>
      </section>

      <form className="admin-panel admin-settings-editor" onSubmit={handleSave}>
        <div className="admin-panel-heading admin-settings-heading">
          <div>
            <p className="admin-kicker">Page details</p>
            <h2>Content and publishing</h2>
          </div>
          <span>{statusLabel(activePage.status)}</span>
        </div>

        <div className="admin-form-stack">
          <div className="admin-form-grid">
            <label className="admin-field">
              Page label
              <input value={activePage.title} onChange={(event) => updateActivePage({ title: event.target.value })} />
            </label>
            <label className="admin-field">
              Public path
              <input value={activePage.path} onChange={(event) => updateActivePage({ path: event.target.value })} />
            </label>
            <label className="admin-field">
              Status
              <select
                value={activePage.status}
                onChange={(event) => updateActivePage({ status: event.target.value as AdminPageStatus })}
              >
                <option value="published">Published</option>
                <option value="draft">Draft</option>
                <option value="archived">Archived</option>
              </select>
            </label>
            <label className="admin-toggle-row admin-page-checkbox">
              <input
                type="checkbox"
                checked={activePage.seo.noindex}
                onChange={(event) => updateSeo("noindex", event.target.checked)}
              />
              <span>
                Keep out of Google
                <small>Search engines should not list this page.</small>
              </span>
            </label>
          </div>

          <div className={activePage.connected ? "admin-settings-notice is-live" : "admin-settings-warning"}>
            <strong>{activePage.connected ? "This editor is connected" : "This editor is not connected"}</strong>
            <p>
              {activePage.connected
                ? "Publish the page after reviewing your changes. The public page will use the saved content."
                : "This public page may already exist, but its full page content is not yet linked to this editor. Saving keeps page details ready for that connection."}
            </p>
          </div>

          <div className="admin-form-stack">
            <div className="admin-panel-heading admin-settings-subheading">
              <div>
                <p className="admin-kicker">SEO</p>
                <h3>Search and sharing metadata</h3>
              </div>
            </div>
            <label className="admin-field">
              Meta title
              <input value={activePage.seo.title} onChange={(event) => updateSeo("title", event.target.value)} />
            </label>
            <label className="admin-field">
              Meta description
              <textarea
                value={activePage.seo.description}
                onChange={(event) => updateSeo("description", event.target.value)}
              />
            </label>
            <label className="admin-field">
              Canonical path
              <input
                value={activePage.seo.canonicalPath}
                onChange={(event) => updateSeo("canonicalPath", event.target.value)}
              />
            </label>
          </div>

          <div className="admin-form-stack">
            <div className="admin-panel-heading admin-settings-subheading">
              <div>
                <p className="admin-kicker">Hero</p>
                <h3>First section copy</h3>
              </div>
            </div>
            <label className="admin-field">
              Eyebrow
              <input value={activePage.hero.eyebrow} onChange={(event) => updateHero("eyebrow", event.target.value)} />
            </label>
            <label className="admin-field">
              Headline
              <input value={activePage.hero.title} onChange={(event) => updateHero("title", event.target.value)} />
            </label>
            <label className="admin-field">
              Lead copy
              <textarea value={activePage.hero.lede} onChange={(event) => updateHero("lede", event.target.value)} />
            </label>
            <div className="admin-form-grid">
              <label className="admin-field">
                Primary CTA label
                <input
                  value={activePage.hero.primaryCtaLabel}
                  onChange={(event) => updateHero("primaryCtaLabel", event.target.value)}
                />
              </label>
              <label className="admin-field">
                Primary CTA link
                <input
                  value={activePage.hero.primaryCtaHref}
                  onChange={(event) => updateHero("primaryCtaHref", event.target.value)}
                />
              </label>
              <label className="admin-field">
                Secondary CTA label
                <input
                  value={activePage.hero.secondaryCtaLabel}
                  onChange={(event) => updateHero("secondaryCtaLabel", event.target.value)}
                />
              </label>
              <label className="admin-field">
                Secondary CTA link
                <input
                  value={activePage.hero.secondaryCtaHref}
                  onChange={(event) => updateHero("secondaryCtaHref", event.target.value)}
                />
              </label>
            </div>
          </div>

          <label className="admin-field">
            Internal notes
            <textarea value={activePage.notes} onChange={(event) => updateActivePage({ notes: event.target.value })} />
          </label>
        </div>

        <div className="admin-settings-savebar">
          <div>
            <strong>{dirty ? "Unsaved page changes" : "Page content saved"}</strong>
            <p className={saveState === "error" ? "is-error" : undefined}>
              {message || validationError || "Review the page before saving."}
            </p>
          </div>
          <div>
            <button className="admin-secondary-button" type="button" onClick={handleRevert} disabled={!dirty}>
              Revert
            </button>
            <button className="admin-primary-button" type="submit" disabled={!dirty || saveState === "saving"}>
              {saveState === "saving" ? "Saving..." : "Save page changes"}
            </button>
          </div>
        </div>
      </form>
    </main>
  );
}
