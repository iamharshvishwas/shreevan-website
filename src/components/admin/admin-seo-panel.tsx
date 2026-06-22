"use client";

import { FormEvent, useMemo, useState } from "react";
import type {
  AdminLead,
  AdminLeadStatus,
  AdminSeoLeadsStore,
  AdminSeoQaStatus,
  AdminSeoRoute,
  AdminSitemapFrequency,
} from "@/lib/admin/seo-leads";
import type { AdminSiteSettings } from "@/lib/admin/site-settings";

type SaveState = "idle" | "saving" | "saved" | "error";
type SeoSection = "routes" | "leads" | "routing";

const sectionTabs: { id: SeoSection; label: string; copy: string }[] = [
  { id: "routes", label: "Route SEO", copy: "Sitemap, indexability and QA status." },
  { id: "leads", label: "Lead Inbox", copy: "Consultation and enquiry submissions." },
  { id: "routing", label: "Lead Routing", copy: "Owner, SLA and qualification checklist." },
];

function cloneSeoLeads(seoLeads: AdminSeoLeadsStore): AdminSeoLeadsStore {
  return JSON.parse(JSON.stringify(seoLeads)) as AdminSeoLeadsStore;
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

function textToArray(value: string) {
  return value
    .split("\n")
    .map((item) => item.trim())
    .filter(Boolean);
}

function arrayToText(items: string[]) {
  return items.join("\n");
}

function qaLabel(status: AdminSeoQaStatus) {
  if (status === "ready") {
    return "Ready";
  }

  if (status === "blocked") {
    return "Blocked";
  }

  return "Needs review";
}

function leadStatusLabel(status: AdminLeadStatus) {
  if (status === "reviewed") {
    return "Reviewed";
  }

  if (status === "contacted") {
    return "Contacted";
  }

  if (status === "closed") {
    return "Closed";
  }

  return "New";
}

function sourceLabel(source: AdminLead["source"]) {
  if (source === "book-consultation") {
    return "Book Consultation";
  }

  if (source === "contact") {
    return "Contact";
  }

  return "Home Suitability";
}

function routeStatusClass(status: AdminSeoQaStatus) {
  if (status === "ready") {
    return "is-published";
  }

  if (status === "blocked") {
    return "is-archived";
  }

  return "is-draft";
}

function leadStatusClass(status: AdminLeadStatus) {
  if (status === "new") {
    return "is-draft";
  }

  if (status === "closed") {
    return "is-archived";
  }

  return "is-published";
}

function indexabilityLabel(route: AdminSeoRoute) {
  return route.indexable ? "Indexable" : "Noindex";
}

function sitemapLabel(route: AdminSeoRoute) {
  return route.sitemapEnabled ? "Included" : "Off";
}

function sitemapStatusClass(route: AdminSeoRoute) {
  return route.sitemapEnabled ? "is-published" : "is-archived";
}

export function AdminSeoPanel({
  initialSeoLeads,
  launchSettings,
}: Readonly<{ initialSeoLeads: AdminSeoLeadsStore; launchSettings: AdminSiteSettings["launch"] }>) {
  const [seoLeads, setSeoLeads] = useState(() => cloneSeoLeads(initialSeoLeads));
  const [savedSeoLeads, setSavedSeoLeads] = useState(() => cloneSeoLeads(initialSeoLeads));
  const [activeSection, setActiveSection] = useState<SeoSection>("routes");
  const [activeRouteId, setActiveRouteId] = useState(initialSeoLeads.routes[0]?.id ?? "home");
  const [activeLeadId, setActiveLeadId] = useState(initialSeoLeads.leads[0]?.id ?? "");
  const [saveState, setSaveState] = useState<SaveState>("idle");
  const [message, setMessage] = useState("");

  const activeRoute = seoLeads.routes.find((route) => route.id === activeRouteId) ?? seoLeads.routes[0];
  const activeLead = seoLeads.leads.find((lead) => lead.id === activeLeadId) ?? seoLeads.leads[0];
  const dirty = useMemo(
    () => JSON.stringify(seoLeads) !== JSON.stringify(savedSeoLeads),
    [seoLeads, savedSeoLeads],
  );
  const sitemapCount = seoLeads.routes.filter((route) => route.indexable && route.sitemapEnabled).length;
  const blockedCount = seoLeads.routes.filter((route) => route.qaStatus === "blocked").length;
  const reviewCount = seoLeads.routes.filter((route) => route.qaStatus === "needs-review").length;
  const newLeadCount = seoLeads.leads.filter((lead) => lead.status === "new").length;

  function updateRoute(patch: Partial<AdminSeoRoute>) {
    setSeoLeads((current) => ({
      ...current,
      routes: current.routes.map((route) => (route.id === activeRouteId ? { ...route, ...patch } : route)),
    }));
  }

  function updateLeadStatus(leadId: string, status: AdminLeadStatus) {
    setSeoLeads((current) => ({
      ...current,
      leads: current.leads.map((lead) => (lead.id === leadId ? { ...lead, status } : lead)),
    }));
  }

  async function handleSave(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setSaveState("saving");
    setMessage("");

    const response = await fetch("/api/admin/seo", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(seoLeads),
    });

    const body = (await response.json().catch(() => null)) as
      | { seoLeads?: AdminSeoLeadsStore; error?: string }
      | null;

    if (!response.ok || !body?.seoLeads) {
      setSaveState("error");
      setMessage(body?.error ?? "SEO and leads data could not be saved.");
      return;
    }

    setSeoLeads(cloneSeoLeads(body.seoLeads));
    setSavedSeoLeads(cloneSeoLeads(body.seoLeads));
    setSaveState("saved");
    setMessage("SEO and leads saved.");
  }

  function handleRevert() {
    setSeoLeads(cloneSeoLeads(savedSeoLeads));
    setSaveState("idle");
    setMessage("Unsaved changes reverted.");
  }

  return (
    <main className="admin-dashboard admin-settings-page" aria-labelledby="admin-seo-title">
      <section className="admin-dashboard-hero admin-settings-hero">
        <div>
          <p className="admin-kicker">SEO & Leads manager</p>
          <h2 id="admin-seo-title">Manage search readiness and consultation leads.</h2>
          <p>
            Review every public route before launch, control sitemap inclusion, and keep new enquiry
            submissions in one admin inbox.
          </p>
        </div>
        <div className="admin-status-panel" aria-label="SEO and leads status">
          <span>Launch State</span>
          <dl>
            <div>
              <dt>Save status</dt>
              <dd>{dirty ? "Unsaved changes" : "Saved"}</dd>
            </div>
            <div>
              <dt>Updated</dt>
              <dd>{formatUpdatedAt(savedSeoLeads.updatedAt)}</dd>
            </div>
            <div>
              <dt>Launch gate</dt>
              <dd>
                {launchSettings.indexingMode} / {launchSettings.robotsPolicy}
              </dd>
            </div>
            <div>
              <dt>Sitemap</dt>
              <dd>{launchSettings.sitemapEnabled ? `${sitemapCount} routes enabled` : "Disabled in settings"}</dd>
            </div>
            <div>
              <dt>QA review</dt>
              <dd>{reviewCount} needs review</dd>
            </div>
            <div>
              <dt>Leads</dt>
              <dd>{newLeadCount} new</dd>
            </div>
          </dl>
        </div>
      </section>

      <form className="admin-settings-layout" onSubmit={handleSave}>
        <aside className="admin-settings-aside" aria-label="SEO and leads sections">
          <div className="admin-settings-tabs" role="tablist" aria-label="SEO and leads sections">
            {sectionTabs.map((tab) => (
              <button
                className={activeSection === tab.id ? "is-active" : ""}
                type="button"
                role="tab"
                aria-selected={activeSection === tab.id}
                key={tab.id}
                onClick={() => setActiveSection(tab.id)}
              >
                <span>{tab.label}</span>
                <small>{tab.copy}</small>
              </button>
            ))}
          </div>

          <div className="admin-panel admin-settings-note">
            <p className="admin-kicker">Publishing gate</p>
            <h2>Global Settings still controls robots</h2>
            <p>
              Route-level sitemap controls here only matter after robots are public and sitemap is
              enabled in Global Settings.
            </p>
          </div>
        </aside>

        <section className="admin-panel admin-settings-editor">
          <div className="admin-panel-heading admin-settings-heading">
            <div>
              <p className="admin-kicker">Phase 6 editor</p>
              <h2>{sectionTabs.find((tab) => tab.id === activeSection)?.label}</h2>
            </div>
            <span>{dirty ? "Unsaved" : "Saved"}</span>
          </div>

          {activeSection === "routes" && activeRoute ? (
            <div className="admin-form-stack">
              <div className="admin-seo-summary-grid" aria-label="SEO route summary">
                <article>
                  <span>Routes ready</span>
                  <strong>{seoLeads.routes.length - reviewCount - blockedCount}</strong>
                  <p>Reviewed and not blocked.</p>
                </article>
                <article>
                  <span>Needs review</span>
                  <strong>{reviewCount}</strong>
                  <p>Check before launch.</p>
                </article>
                <article>
                  <span>Blocked</span>
                  <strong>{blockedCount}</strong>
                  <p>Kept out of public launch.</p>
                </article>
                <article>
                  <span>Sitemap</span>
                  <strong>{sitemapCount}</strong>
                  <p>Eligible route entries.</p>
                </article>
              </div>

              <div className="admin-seo-workbench">
                <div className="admin-route-table" role="tablist" aria-label="SEO route list">
                  <div className="admin-route-table-head" aria-hidden="true">
                    <span>Page</span>
                    <span>Search</span>
                    <span>Review</span>
                    <span>Sitemap</span>
                  </div>
                  {seoLeads.routes.map((route) => (
                    <button
                      className={activeRouteId === route.id ? "admin-route-row is-active" : "admin-route-row"}
                      type="button"
                      role="tab"
                      aria-selected={activeRouteId === route.id}
                      aria-label={`${route.label}, ${route.path}, ${indexabilityLabel(route)}, ${qaLabel(
                        route.qaStatus,
                      )}, sitemap ${sitemapLabel(route)}`}
                      key={route.id}
                      onClick={() => setActiveRouteId(route.id)}
                    >
                      <span className="admin-route-page">
                        <strong>{route.label}</strong>
                        <small>{route.path}</small>
                      </span>
                      <em className={`admin-page-status ${route.indexable ? "is-published" : "is-archived"}`}>
                        {indexabilityLabel(route)}
                      </em>
                      <em className={`admin-page-status ${routeStatusClass(route.qaStatus)}`}>
                        {qaLabel(route.qaStatus)}
                      </em>
                      <em className={`admin-page-status ${sitemapStatusClass(route)}`}>{sitemapLabel(route)}</em>
                    </button>
                  ))}
                </div>

                <div className="admin-route-detail">
                  <div className="admin-route-detail-heading">
                    <div>
                      <span>Selected route</span>
                      <h3>{activeRoute.label}</h3>
                      <p>{activeRoute.path}</p>
                    </div>
                    <em className={`admin-page-status ${routeStatusClass(activeRoute.qaStatus)}`}>
                      {qaLabel(activeRoute.qaStatus)}
                    </em>
                  </div>

                  <div className="admin-settings-warning">
                    <strong>Search visibility gate</strong>
                    <p>
                      These route settings prepare the page for search. Public indexing still depends
                      on Global Settings enabling public robots and sitemap.
                    </p>
                  </div>

                  <div className="admin-form-grid">
                    <label className="admin-field">
                      Route label
                      <input
                        value={activeRoute.label}
                        onChange={(event) => updateRoute({ label: event.target.value })}
                      />
                    </label>
                    <label className="admin-field">
                      Public path
                      <input
                        value={activeRoute.path}
                        onChange={(event) => updateRoute({ path: event.target.value })}
                      />
                    </label>
                    <label className="admin-field">
                      Focus keyword
                      <input
                        value={activeRoute.focusKeyword}
                        onChange={(event) => updateRoute({ focusKeyword: event.target.value })}
                      />
                    </label>
                    <label className="admin-field">
                      Review status
                      <select
                        value={activeRoute.qaStatus}
                        onChange={(event) => updateRoute({ qaStatus: event.target.value as AdminSeoQaStatus })}
                      >
                        <option value="ready">Ready</option>
                        <option value="needs-review">Needs review</option>
                        <option value="blocked">Blocked</option>
                      </select>
                    </label>
                    <label className="admin-field">
                      Sitemap priority
                      <input
                        max="1"
                        min="0"
                        step="0.01"
                        type="number"
                        value={activeRoute.priority}
                        onChange={(event) => updateRoute({ priority: Number(event.target.value) })}
                      />
                    </label>
                    <label className="admin-field">
                      Change frequency
                      <select
                        value={activeRoute.changeFrequency}
                        onChange={(event) =>
                          updateRoute({ changeFrequency: event.target.value as AdminSitemapFrequency })
                        }
                      >
                        <option value="weekly">Weekly</option>
                        <option value="monthly">Monthly</option>
                        <option value="yearly">Yearly</option>
                        <option value="never">Never</option>
                      </select>
                    </label>
                    <label className="admin-toggle-row admin-page-checkbox">
                      <input
                        type="checkbox"
                        checked={activeRoute.indexable}
                        onChange={(event) => updateRoute({ indexable: event.target.checked })}
                      />
                      <span>Allow search indexing</span>
                    </label>
                    <label className="admin-toggle-row admin-page-checkbox">
                      <input
                        type="checkbox"
                        checked={activeRoute.sitemapEnabled}
                        onChange={(event) => updateRoute({ sitemapEnabled: event.target.checked })}
                      />
                      <span>Include in sitemap</span>
                    </label>
                  </div>

                  <label className="admin-field">
                    Review notes
                    <textarea
                      value={activeRoute.notes}
                      onChange={(event) => updateRoute({ notes: event.target.value })}
                    />
                  </label>
                  <label className="admin-field">
                    Last reviewed
                    <input
                      value={activeRoute.lastReviewedAt}
                      onChange={(event) => updateRoute({ lastReviewedAt: event.target.value })}
                    />
                  </label>
                </div>
              </div>
            </div>
          ) : null}

          {activeSection === "leads" ? (
            <div className="admin-form-stack">
              {seoLeads.leads.length ? (
                <>
                  <div className="admin-page-list" role="tablist" aria-label="Lead inbox">
                    {seoLeads.leads.map((lead) => (
                      <button
                        className={activeLead?.id === lead.id ? "is-active" : ""}
                        type="button"
                        role="tab"
                        aria-selected={activeLead?.id === lead.id}
                        aria-label={`${lead.name || "Unnamed lead"}, ${lead.email}, ${sourceLabel(
                          lead.source,
                        )}, ${leadStatusLabel(lead.status)}`}
                        key={lead.id}
                        onClick={() => setActiveLeadId(lead.id)}
                      >
                        <span>{lead.name || "Unnamed lead"}</span>
                        <small>
                          {lead.email} / {sourceLabel(lead.source)}
                        </small>
                        <em className={`admin-page-status ${leadStatusClass(lead.status)}`}>
                          {leadStatusLabel(lead.status)}
                        </em>
                      </button>
                    ))}
                  </div>

                  {activeLead ? (
                    <div className="admin-form-stack">
                      <div className="admin-form-grid">
                        <label className="admin-field">
                          Lead status
                          <select
                            value={activeLead.status}
                            onChange={(event) =>
                              updateLeadStatus(activeLead.id, event.target.value as AdminLeadStatus)
                            }
                          >
                            <option value="new">New</option>
                            <option value="reviewed">Reviewed</option>
                            <option value="contacted">Contacted</option>
                            <option value="closed">Closed</option>
                          </select>
                        </label>
                        <label className="admin-field">
                          Source
                          <input value={sourceLabel(activeLead.source)} readOnly />
                        </label>
                        <label className="admin-field">
                          Name
                          <input value={activeLead.name} readOnly />
                        </label>
                        <label className="admin-field">
                          Email
                          <input value={activeLead.email} readOnly />
                        </label>
                        <label className="admin-field">
                          Phone / WhatsApp
                          <input value={activeLead.phone} readOnly />
                        </label>
                        <label className="admin-field">
                          Country
                          <input value={activeLead.country} readOnly />
                        </label>
                        <label className="admin-field">
                          Program
                          <input value={activeLead.program} readOnly />
                        </label>
                        <label className="admin-field">
                          Created
                          <input value={formatUpdatedAt(activeLead.createdAt)} readOnly />
                        </label>
                      </div>
                      <div className="admin-form-grid">
                        <label className="admin-field">
                          Topic
                          <textarea value={activeLead.topic} readOnly />
                        </label>
                        <label className="admin-field">
                          Message / goal
                          <textarea value={activeLead.message || activeLead.goal} readOnly />
                        </label>
                        <label className="admin-field">
                          Dates / season
                          <textarea value={[activeLead.dates, activeLead.season].filter(Boolean).join("\n")} readOnly />
                        </label>
                        <label className="admin-field">
                          Health or comfort context
                          <textarea value={activeLead.health} readOnly />
                        </label>
                      </div>
                    </div>
                  ) : null}
                </>
              ) : (
                <div className="admin-settings-warning">
                  <strong>No leads yet</strong>
                  <p>
                    Submit the homepage suitability form, contact form or consultation form to populate
                    this inbox.
                  </p>
                </div>
              )}
            </div>
          ) : null}

          {activeSection === "routing" ? (
            <div className="admin-form-stack">
              <div className="admin-form-grid">
                <label className="admin-field">
                  Inbox email
                  <input
                    value={seoLeads.leadRouting.inboxEmail}
                    onChange={(event) =>
                      setSeoLeads((current) => ({
                        ...current,
                        leadRouting: { ...current.leadRouting, inboxEmail: event.target.value },
                      }))
                    }
                  />
                </label>
                <label className="admin-field">
                  Lead owner
                  <input
                    value={seoLeads.leadRouting.leadOwner}
                    onChange={(event) =>
                      setSeoLeads((current) => ({
                        ...current,
                        leadRouting: { ...current.leadRouting, leadOwner: event.target.value },
                      }))
                    }
                  />
                </label>
                <label className="admin-field">
                  Response SLA
                  <input
                    value={seoLeads.leadRouting.responseSla}
                    onChange={(event) =>
                      setSeoLeads((current) => ({
                        ...current,
                        leadRouting: { ...current.leadRouting, responseSla: event.target.value },
                      }))
                    }
                  />
                </label>
                <label className="admin-field">
                  CRM stage
                  <input
                    value={seoLeads.leadRouting.crmStage}
                    onChange={(event) =>
                      setSeoLeads((current) => ({
                        ...current,
                        leadRouting: { ...current.leadRouting, crmStage: event.target.value },
                      }))
                    }
                  />
                </label>
              </div>
              <label className="admin-field">
                WhatsApp escalation rule
                <textarea
                  value={seoLeads.leadRouting.whatsappEscalation}
                  onChange={(event) =>
                    setSeoLeads((current) => ({
                      ...current,
                      leadRouting: { ...current.leadRouting, whatsappEscalation: event.target.value },
                    }))
                  }
                />
              </label>
              <label className="admin-field">
                Qualification checklist
                <textarea
                  value={arrayToText(seoLeads.leadRouting.qualificationChecklist)}
                  onChange={(event) =>
                    setSeoLeads((current) => ({
                      ...current,
                      leadRouting: {
                        ...current.leadRouting,
                        qualificationChecklist: textToArray(event.target.value),
                      },
                    }))
                  }
                />
              </label>
            </div>
          ) : null}

          <div className="admin-settings-savebar">
            <div>
              <strong>{dirty ? "Unsaved SEO or lead changes" : "SEO and leads saved"}</strong>
              <p className={saveState === "error" ? "is-error" : undefined}>{message || "Review before publishing."}</p>
            </div>
            <div>
              <button className="admin-secondary-button" type="button" onClick={handleRevert} disabled={!dirty}>
                Revert
              </button>
              <button className="admin-primary-button" type="submit" disabled={!dirty || saveState === "saving"}>
                {saveState === "saving" ? "Saving..." : "Save SEO & leads"}
              </button>
            </div>
          </div>
        </section>
      </form>
    </main>
  );
}
