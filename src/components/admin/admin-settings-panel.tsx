"use client";

import { FormEvent, useMemo, useState } from "react";
import type { AdminFooterColumn, AdminNavLink, AdminSiteSettings } from "@/lib/admin/site-settings";

type SettingsSection = "brand" | "contact" | "crm" | "launch" | "header" | "footer";
type SaveState = "idle" | "saving" | "saved" | "error";

const sections: Array<{ id: SettingsSection; label: string; copy: string }> = [
  { id: "brand", label: "Brand", copy: "Identity, domains and positioning." },
  { id: "contact", label: "Contact", copy: "Email, phone, WhatsApp and social links." },
  { id: "crm", label: "CRM", copy: "Widget script and API endpoint." },
  { id: "launch", label: "Launch", copy: "Indexing, robots and sitemap state." },
  { id: "header", label: "Header Nav", copy: "Top navigation and primary CTA." },
  { id: "footer", label: "Footer", copy: "Footer columns and public links." },
];

function cloneSettings(settings: AdminSiteSettings): AdminSiteSettings {
  return JSON.parse(JSON.stringify(settings)) as AdminSiteSettings;
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

export function AdminSettingsPanel({ initialSettings }: Readonly<{ initialSettings: AdminSiteSettings }>) {
  const [activeSection, setActiveSection] = useState<SettingsSection>("brand");
  const [settings, setSettings] = useState(() => cloneSettings(initialSettings));
  const [savedSettings, setSavedSettings] = useState(() => cloneSettings(initialSettings));
  const [saveState, setSaveState] = useState<SaveState>("idle");
  const [message, setMessage] = useState("");

  const dirty = useMemo(
    () => JSON.stringify(settings) !== JSON.stringify(savedSettings),
    [settings, savedSettings],
  );

  const enabledHeaderItems = settings.navigation.headerItems.filter((item) => item.enabled).length;
  const enabledFooterLinks = settings.navigation.footerColumns.reduce(
    (total, column) => total + column.links.filter((link) => column.enabled && link.enabled).length,
    0,
  );

  function updateBrand(field: keyof AdminSiteSettings["brand"], value: string) {
    setSettings((current) => ({
      ...current,
      brand: { ...current.brand, [field]: value },
    }));
  }

  function updateContact(field: keyof AdminSiteSettings["contact"], value: string) {
    setSettings((current) => ({
      ...current,
      contact: { ...current.contact, [field]: value },
    }));
  }

  function updateSocial(field: keyof AdminSiteSettings["social"], value: string) {
    setSettings((current) => ({
      ...current,
      social: { ...current.social, [field]: value },
    }));
  }

  function updateCrm(field: keyof AdminSiteSettings["crm"], value: string | boolean) {
    setSettings((current) => ({
      ...current,
      crm: { ...current.crm, [field]: value },
    }));
  }

  function updateLaunch(field: keyof AdminSiteSettings["launch"], value: string | boolean) {
    setSettings((current) => ({
      ...current,
      launch: { ...current.launch, [field]: value },
    }));
  }

  function updateHeaderCta(field: keyof AdminNavLink, value: string | boolean) {
    setSettings((current) => ({
      ...current,
      navigation: {
        ...current.navigation,
        headerCta: { ...current.navigation.headerCta, [field]: value },
      },
    }));
  }

  function updateHeaderItem(itemId: string, patch: Partial<AdminNavLink>) {
    setSettings((current) => ({
      ...current,
      navigation: {
        ...current.navigation,
        headerItems: current.navigation.headerItems.map((item) =>
          item.id === itemId ? { ...item, ...patch } : item,
        ),
      },
    }));
  }

  function updateHeaderChild(itemId: string, childId: string, patch: Partial<AdminNavLink>) {
    setSettings((current) => ({
      ...current,
      navigation: {
        ...current.navigation,
        headerItems: current.navigation.headerItems.map((item) =>
          item.id === itemId
            ? {
                ...item,
                children: item.children?.map((child) =>
                  child.id === childId ? { ...child, ...patch } : child,
                ),
              }
            : item,
        ),
      },
    }));
  }

  function updateFooterColumn(columnId: string, patch: Partial<AdminFooterColumn>) {
    setSettings((current) => ({
      ...current,
      navigation: {
        ...current.navigation,
        footerColumns: current.navigation.footerColumns.map((column) =>
          column.id === columnId ? { ...column, ...patch } : column,
        ),
      },
    }));
  }

  function updateFooterLink(columnId: string, linkId: string, patch: Partial<AdminNavLink>) {
    setSettings((current) => ({
      ...current,
      navigation: {
        ...current.navigation,
        footerColumns: current.navigation.footerColumns.map((column) =>
          column.id === columnId
            ? {
                ...column,
                links: column.links.map((link) => (link.id === linkId ? { ...link, ...patch } : link)),
              }
            : column,
        ),
      },
    }));
  }

  async function handleSave(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setSaveState("saving");
    setMessage("");

    const response = await fetch("/api/admin/settings", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(settings),
    });

    const body = (await response.json().catch(() => null)) as
      | { settings?: AdminSiteSettings; error?: string }
      | null;

    if (!response.ok || !body?.settings) {
      setSaveState("error");
      setMessage(body?.error ?? "Settings could not be saved.");
      return;
    }

    setSettings(cloneSettings(body.settings));
    setSavedSettings(cloneSettings(body.settings));
    setSaveState("saved");
    setMessage("Settings saved.");
  }

  function handleRevert() {
    setSettings(cloneSettings(savedSettings));
    setSaveState("idle");
    setMessage("Unsaved changes reverted.");
  }

  return (
    <main className="admin-dashboard admin-settings-page" aria-labelledby="admin-settings-title">
      <section className="admin-dashboard-hero admin-settings-hero">
        <div>
          <p className="admin-kicker">Global site controls</p>
          <h2 id="admin-settings-title">Manage the public website settings from one controlled surface.</h2>
          <p>
            These settings define the brand, contact channels, CRM widget, launch state and
            navigation structure that later frontend modules can consume directly.
          </p>
        </div>
        <div className="admin-status-panel" aria-label="Settings status">
          <span>Settings State</span>
          <dl>
            <div>
              <dt>Save status</dt>
              <dd>{dirty ? "Unsaved changes" : "Saved"}</dd>
            </div>
            <div>
              <dt>Updated</dt>
              <dd>{formatUpdatedAt(savedSettings.updatedAt)}</dd>
            </div>
            <div>
              <dt>Header links</dt>
              <dd>{enabledHeaderItems} enabled</dd>
            </div>
            <div>
              <dt>Footer links</dt>
              <dd>{enabledFooterLinks} enabled</dd>
            </div>
          </dl>
        </div>
      </section>

      <form className="admin-settings-layout" onSubmit={handleSave}>
        <aside className="admin-settings-aside" aria-label="Settings sections">
          <div className="admin-settings-tabs" role="tablist" aria-label="Global settings sections">
            {sections.map((section) => (
              <button
                className={activeSection === section.id ? "is-active" : ""}
                type="button"
                role="tab"
                aria-selected={activeSection === section.id}
                key={section.id}
                onClick={() => setActiveSection(section.id)}
              >
                <span>{section.label}</span>
                <small>{section.copy}</small>
              </button>
            ))}
          </div>

          <div className="admin-panel admin-settings-note">
            <p className="admin-kicker">Storage adapter</p>
            <h2>Local JSON</h2>
            <p>
              Phase 2 persists into the project settings file. A production database adapter can
              replace this without changing the editor surface.
            </p>
          </div>
        </aside>

        <section className="admin-panel admin-settings-editor">
          <div className="admin-panel-heading admin-settings-heading">
            <div>
              <p className="admin-kicker">Phase 2 editor</p>
              <h2>{sections.find((section) => section.id === activeSection)?.label}</h2>
            </div>
            <span>{dirty ? "Unsaved" : "Saved"}</span>
          </div>

          {activeSection === "brand" ? (
            <div className="admin-form-grid">
              <AdminTextField label="Brand name" value={settings.brand.name} onChange={(value) => updateBrand("name", value)} />
              <AdminTextField label="Tagline" value={settings.brand.tagline} onChange={(value) => updateBrand("tagline", value)} />
              <AdminTextField label="Founder" value={settings.brand.founder} onChange={(value) => updateBrand("founder", value)} />
              <AdminTextField label="Location" value={settings.brand.location} onChange={(value) => updateBrand("location", value)} />
              <AdminTextField
                label="Primary domain"
                value={settings.brand.primaryDomain}
                onChange={(value) => updateBrand("primaryDomain", value)}
              />
              <AdminTextField
                label="Admin domain"
                value={settings.brand.adminDomain}
                onChange={(value) => updateBrand("adminDomain", value)}
              />
              <AdminTextArea
                className="admin-field-wide"
                label="Site description"
                value={settings.brand.description}
                onChange={(value) => updateBrand("description", value)}
              />
            </div>
          ) : null}

          {activeSection === "contact" ? (
            <div className="admin-form-grid">
              <AdminTextField label="Email" value={settings.contact.email} onChange={(value) => updateContact("email", value)} />
              <AdminTextField label="Phone" value={settings.contact.phone} onChange={(value) => updateContact("phone", value)} />
              <AdminTextField
                label="WhatsApp"
                value={settings.contact.whatsapp}
                onChange={(value) => updateContact("whatsapp", value)}
              />
              <AdminTextField
                label="Response time"
                value={settings.contact.responseTime}
                onChange={(value) => updateContact("responseTime", value)}
              />
              <AdminTextArea
                className="admin-field-wide"
                label="Address"
                value={settings.contact.address}
                onChange={(value) => updateContact("address", value)}
              />
              <AdminTextField
                label="Instagram"
                value={settings.social.instagram}
                onChange={(value) => updateSocial("instagram", value)}
              />
              <AdminTextField label="YouTube" value={settings.social.youtube} onChange={(value) => updateSocial("youtube", value)} />
              <AdminTextField
                label="LinkedIn"
                value={settings.social.linkedin}
                onChange={(value) => updateSocial("linkedin", value)}
              />
              <AdminTextField
                label="Facebook"
                value={settings.social.facebook}
                onChange={(value) => updateSocial("facebook", value)}
              />
              <AdminTextField label="X" value={settings.social.x} onChange={(value) => updateSocial("x", value)} />
              <AdminTextField
                label="Trustpilot"
                value={settings.social.trustpilot}
                onChange={(value) => updateSocial("trustpilot", value)}
              />
              <AdminTextField
                label="Tripadvisor"
                value={settings.social.tripadvisor}
                onChange={(value) => updateSocial("tripadvisor", value)}
              />
            </div>
          ) : null}

          {activeSection === "crm" ? (
            <div className="admin-form-stack">
              <AdminToggle
                checked={settings.crm.enabled}
                label="Enable CRM widget"
                onChange={(checked) => updateCrm("enabled", checked)}
              />
              <AdminTextField label="Widget script URL" value={settings.crm.scriptUrl} onChange={(value) => updateCrm("scriptUrl", value)} />
              <AdminTextField label="API URL" value={settings.crm.apiUrl} onChange={(value) => updateCrm("apiUrl", value)} />
            </div>
          ) : null}

          {activeSection === "launch" ? (
            <div className="admin-form-stack">
              <div className="admin-segment-group">
                <span>Indexing mode</span>
                <div className="admin-segmented" role="group" aria-label="Indexing mode">
                  <button
                    className={settings.launch.indexingMode === "noindex" ? "is-active" : ""}
                    type="button"
                    onClick={() => updateLaunch("indexingMode", "noindex")}
                  >
                    Noindex
                  </button>
                  <button
                    className={settings.launch.indexingMode === "indexable" ? "is-active" : ""}
                    type="button"
                    onClick={() => updateLaunch("indexingMode", "indexable")}
                  >
                    Indexable
                  </button>
                </div>
              </div>

              <div className="admin-segment-group">
                <span>Robots policy</span>
                <div className="admin-segmented" role="group" aria-label="Robots policy">
                  <button
                    className={settings.launch.robotsPolicy === "blocked" ? "is-active" : ""}
                    type="button"
                    onClick={() => updateLaunch("robotsPolicy", "blocked")}
                  >
                    Block crawling
                  </button>
                  <button
                    className={settings.launch.robotsPolicy === "public" ? "is-active" : ""}
                    type="button"
                    onClick={() => updateLaunch("robotsPolicy", "public")}
                  >
                    Public robots
                  </button>
                </div>
              </div>

              <AdminToggle
                checked={settings.launch.sitemapEnabled}
                label="Include sitemap URL in robots output"
                onChange={(checked) => updateLaunch("sitemapEnabled", checked)}
              />

              <div className="admin-settings-warning">
                <strong>Launch boundary</strong>
                <p>
                  The live site is intentionally noindex right now. Keep this blocked until content,
                  images, modality pages, CRM and payment workflows are ready.
                </p>
              </div>
            </div>
          ) : null}

          {activeSection === "header" ? (
            <div className="admin-form-stack">
              <div className="admin-nav-editor-card">
                <div className="admin-nav-editor-heading">
                  <h3>Primary CTA</h3>
                  <AdminToggle
                    checked={settings.navigation.headerCta.enabled}
                    label="Show"
                    onChange={(checked) => updateHeaderCta("enabled", checked)}
                  />
                </div>
                <div className="admin-inline-grid">
                  <AdminTextField
                    label="CTA label"
                    value={settings.navigation.headerCta.label}
                    onChange={(value) => updateHeaderCta("label", value)}
                  />
                  <AdminTextField
                    label="CTA link"
                    value={settings.navigation.headerCta.href}
                    onChange={(value) => updateHeaderCta("href", value)}
                  />
                </div>
              </div>

              <div className="admin-nav-editor-list">
                {settings.navigation.headerItems.map((item) => (
                  <article className="admin-nav-editor-card" key={item.id}>
                    <div className="admin-nav-editor-heading">
                      <h3>{item.label}</h3>
                      <AdminToggle
                        checked={item.enabled}
                        label="Show"
                        onChange={(checked) => updateHeaderItem(item.id, { enabled: checked })}
                      />
                    </div>
                    <div className="admin-inline-grid">
                      <AdminTextField
                        label="Label"
                        value={item.label}
                        onChange={(value) => updateHeaderItem(item.id, { label: value })}
                      />
                      <AdminTextField
                        label="Link"
                        value={item.href}
                        onChange={(value) => updateHeaderItem(item.id, { href: value })}
                      />
                    </div>
                    {item.children?.length ? (
                      <div className="admin-child-link-list">
                        {item.children.map((child) => (
                          <div className="admin-child-link-row" key={child.id}>
                            <AdminToggle
                              checked={child.enabled}
                              label={child.label}
                              onChange={(checked) => updateHeaderChild(item.id, child.id, { enabled: checked })}
                            />
                            <AdminTextField
                              label="Label"
                              value={child.label}
                              onChange={(value) => updateHeaderChild(item.id, child.id, { label: value })}
                            />
                            <AdminTextField
                              label="Link"
                              value={child.href}
                              onChange={(value) => updateHeaderChild(item.id, child.id, { href: value })}
                            />
                          </div>
                        ))}
                      </div>
                    ) : null}
                  </article>
                ))}
              </div>
            </div>
          ) : null}

          {activeSection === "footer" ? (
            <div className="admin-nav-editor-list">
              {settings.navigation.footerColumns.map((column) => (
                <article className="admin-nav-editor-card" key={column.id}>
                  <div className="admin-nav-editor-heading">
                    <h3>{column.title}</h3>
                    <AdminToggle
                      checked={column.enabled}
                      label="Show column"
                      onChange={(checked) => updateFooterColumn(column.id, { enabled: checked })}
                    />
                  </div>
                  <AdminTextField
                    label="Column title"
                    value={column.title}
                    onChange={(value) => updateFooterColumn(column.id, { title: value })}
                  />
                  <div className="admin-child-link-list">
                    {column.links.map((link) => (
                      <div className="admin-child-link-row" key={link.id}>
                        <AdminToggle
                          checked={link.enabled}
                          label={link.label}
                          onChange={(checked) => updateFooterLink(column.id, link.id, { enabled: checked })}
                        />
                        <AdminTextField
                          label="Label"
                          value={link.label}
                          onChange={(value) => updateFooterLink(column.id, link.id, { label: value })}
                        />
                        <AdminTextField
                          label="Link"
                          value={link.href}
                          onChange={(value) => updateFooterLink(column.id, link.id, { href: value })}
                        />
                      </div>
                    ))}
                  </div>
                </article>
              ))}
            </div>
          ) : null}

          <div className="admin-settings-savebar">
            <div>
              <strong>{dirty ? "Unsaved settings" : "No unsaved changes"}</strong>
              <p className={saveState === "error" ? "is-error" : undefined}>{message}</p>
            </div>
            <div>
              <button className="admin-secondary-button" type="button" disabled={!dirty} onClick={handleRevert}>
                Revert
              </button>
              <button className="admin-primary-button" type="submit" disabled={!dirty || saveState === "saving"}>
                {saveState === "saving" ? "Saving..." : "Save settings"}
              </button>
            </div>
          </div>
        </section>
      </form>
    </main>
  );
}

function AdminTextField({
  label,
  value,
  onChange,
}: Readonly<{
  label: string;
  value: string;
  onChange: (value: string) => void;
}>) {
  return (
    <label className="admin-field">
      <span>{label}</span>
      <input value={value} onChange={(event) => onChange(event.target.value)} />
    </label>
  );
}

function AdminTextArea({
  className,
  label,
  value,
  onChange,
}: Readonly<{
  className?: string;
  label: string;
  value: string;
  onChange: (value: string) => void;
}>) {
  return (
    <label className={`admin-field${className ? ` ${className}` : ""}`}>
      <span>{label}</span>
      <textarea value={value} onChange={(event) => onChange(event.target.value)} />
    </label>
  );
}

function AdminToggle({
  checked,
  label,
  onChange,
}: Readonly<{
  checked: boolean;
  label: string;
  onChange: (checked: boolean) => void;
}>) {
  return (
    <label className="admin-toggle-row">
      <input checked={checked} type="checkbox" onChange={(event) => onChange(event.target.checked)} />
      <span>{label}</span>
    </label>
  );
}
