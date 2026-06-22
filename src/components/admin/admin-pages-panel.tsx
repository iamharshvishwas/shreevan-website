"use client";

import { FormEvent, useMemo, useState } from "react";
import type { AdminManagedPage, AdminPageContentStore, AdminPageStatus } from "@/lib/admin/page-content";

type SaveState = "idle" | "saving" | "saved" | "error";

function clonePageContent(pageContent: AdminPageContentStore): AdminPageContentStore {
  return JSON.parse(JSON.stringify(pageContent)) as AdminPageContentStore;
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

function statusLabel(status: AdminPageStatus) {
  if (status === "published") {
    return "Published";
  }

  if (status === "archived") {
    return "Archived";
  }

  return "Draft";
}

export function AdminPagesPanel({
  initialPageContent,
}: Readonly<{ initialPageContent: AdminPageContentStore }>) {
  const [pageContent, setPageContent] = useState(() => clonePageContent(initialPageContent));
  const [savedPageContent, setSavedPageContent] = useState(() => clonePageContent(initialPageContent));
  const [activePageId, setActivePageId] = useState(initialPageContent.pages[0]?.id ?? "home");
  const [saveState, setSaveState] = useState<SaveState>("idle");
  const [message, setMessage] = useState("");

  const activePage = pageContent.pages.find((page) => page.id === activePageId) ?? pageContent.pages[0];
  const dirty = useMemo(
    () => JSON.stringify(pageContent) !== JSON.stringify(savedPageContent),
    [pageContent, savedPageContent],
  );
  const publishedCount = pageContent.pages.filter((page) => page.status === "published").length;
  const connectedCount = pageContent.pages.filter((page) => page.connected).length;

  function updateActivePage(patch: Partial<AdminManagedPage>) {
    setPageContent((current) => ({
      ...current,
      pages: current.pages.map((page) => (page.id === activePageId ? { ...page, ...patch } : page)),
    }));
  }

  function updateSeo(field: keyof AdminManagedPage["seo"], value: string | boolean) {
    setPageContent((current) => ({
      ...current,
      pages: current.pages.map((page) =>
        page.id === activePageId ? { ...page, seo: { ...page.seo, [field]: value } } : page,
      ),
    }));
  }

  function updateHero(field: keyof AdminManagedPage["hero"], value: string) {
    setPageContent((current) => ({
      ...current,
      pages: current.pages.map((page) =>
        page.id === activePageId ? { ...page, hero: { ...page.hero, [field]: value } } : page,
      ),
    }));
  }

  async function handleSave(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setSaveState("saving");
    setMessage("");

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
    setMessage("Page content saved.");
  }

  function handleRevert() {
    setPageContent(clonePageContent(savedPageContent));
    setSaveState("idle");
    setMessage("Unsaved changes reverted.");
  }

  if (!activePage) {
    return null;
  }

  return (
    <main className="admin-dashboard admin-settings-page" aria-labelledby="admin-pages-title">
      <section className="admin-dashboard-hero admin-settings-hero">
        <div>
          <p className="admin-kicker">Page content manager</p>
          <h2 id="admin-pages-title">Manage page-level SEO and hero content.</h2>
          <p>
            Phase 3 starts with a controlled page registry. The Home page is connected to the public
            frontend now; the remaining seeded pages are ready for the next wiring pass.
          </p>
        </div>
        <div className="admin-status-panel" aria-label="Page manager status">
          <span>Page State</span>
          <dl>
            <div>
              <dt>Save status</dt>
              <dd>{dirty ? "Unsaved changes" : "Saved"}</dd>
            </div>
            <div>
              <dt>Updated</dt>
              <dd>{formatUpdatedAt(savedPageContent.updatedAt)}</dd>
            </div>
            <div>
              <dt>Published</dt>
              <dd>{publishedCount} pages</dd>
            </div>
            <div>
              <dt>Connected</dt>
              <dd>{connectedCount} live page</dd>
            </div>
          </dl>
        </div>
      </section>

      <form className="admin-settings-layout" onSubmit={handleSave}>
        <aside className="admin-settings-aside" aria-label="Managed pages">
          <div className="admin-page-list" role="tablist" aria-label="Managed page list">
            {pageContent.pages.map((page) => (
              <button
                className={activePageId === page.id ? "is-active" : ""}
                type="button"
                role="tab"
                aria-selected={activePageId === page.id}
                aria-label={`${page.title}, ${page.path}, ${statusLabel(page.status)}${
                  page.connected ? ", connected" : ""
                }`}
                key={page.id}
                onClick={() => setActivePageId(page.id)}
              >
                <span>{page.title}</span>
                <small>{page.path}</small>
                <em className={`admin-page-status is-${page.status}`}>{statusLabel(page.status)}</em>
                {page.connected ? <strong>Connected</strong> : null}
              </button>
            ))}
          </div>

          <div className="admin-panel admin-settings-note">
            <p className="admin-kicker">Frontend wiring</p>
            <h2>Home live now</h2>
            <p>
              Save changes on Home to update the public homepage hero and metadata. Other pages are
              editable seeds until their templates are connected.
            </p>
          </div>
        </aside>

        <section className="admin-panel admin-settings-editor">
          <div className="admin-panel-heading admin-settings-heading">
            <div>
              <p className="admin-kicker">Phase 3 editor</p>
              <h2>{activePage.title}</h2>
            </div>
            <span>{activePage.connected ? "Live connected" : "Seeded"}</span>
          </div>

          <div className="admin-form-stack">
            <div className="admin-form-grid">
              <label className="admin-field">
                Page label
                <input
                  value={activePage.title}
                  onChange={(event) => updateActivePage({ title: event.target.value })}
                />
              </label>
              <label className="admin-field">
                Public path
                <input
                  value={activePage.path}
                  onChange={(event) => updateActivePage({ path: event.target.value })}
                />
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
                <span>Noindex this page</span>
              </label>
            </div>

            <div className="admin-settings-warning">
              <strong>Publishing boundary</strong>
              <p>
                A page must be published before its public template consumes the saved content. Draft
                and archived pages fall back to the last safe defaults on connected templates.
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
                  <h3>First viewport copy</h3>
                </div>
              </div>
              <label className="admin-field">
                Eyebrow
                <input
                  value={activePage.hero.eyebrow}
                  onChange={(event) => updateHero("eyebrow", event.target.value)}
                />
              </label>
              <label className="admin-field">
                Headline
                <input
                  value={activePage.hero.title}
                  onChange={(event) => updateHero("title", event.target.value)}
                />
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
                  Primary CTA href
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
                  Secondary CTA href
                  <input
                    value={activePage.hero.secondaryCtaHref}
                    onChange={(event) => updateHero("secondaryCtaHref", event.target.value)}
                  />
                </label>
              </div>
            </div>

            <label className="admin-field">
              Internal notes
              <textarea
                value={activePage.notes}
                onChange={(event) => updateActivePage({ notes: event.target.value })}
              />
            </label>
          </div>

          <div className="admin-settings-savebar">
            <div>
              <strong>{dirty ? "Unsaved page changes" : "Page content saved"}</strong>
              <p className={saveState === "error" ? "is-error" : undefined}>{message || "Review before publishing."}</p>
            </div>
            <div>
              <button className="admin-secondary-button" type="button" onClick={handleRevert} disabled={!dirty}>
                Revert
              </button>
              <button className="admin-primary-button" type="submit" disabled={!dirty || saveState === "saving"}>
                {saveState === "saving" ? "Saving..." : "Save page content"}
              </button>
            </div>
          </div>
        </section>
      </form>
    </main>
  );
}
