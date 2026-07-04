"use client";

import { FormEvent, useMemo, useState } from "react";
import type {
  AdminContentStatus,
  AdminContentTrustStore,
  AdminFaqCategory,
  AdminFaqItem,
  AdminJournalArticle,
  AdminMediaItem,
  AdminStorySlot,
  AdminTrustStandard,
  AdminVideoSlot,
} from "@/lib/admin/content-trust";

type SaveState = "idle" | "saving" | "saved" | "error";
type ContentSection = "faqs" | "stories" | "journal" | "media";

const sectionTabs: { id: ContentSection; label: string; copy: string }[] = [
  { id: "faqs", label: "FAQs", copy: "Questions, answers, links and risk checks." },
  { id: "stories", label: "Stories", copy: "Trust markers, story slots, video slots and consent." },
  { id: "journal", label: "Journal", copy: "Article seeds, categories and editor picks." },
  { id: "media", label: "Media", copy: "Asset placeholders and publishing notes." },
];

function cloneContentTrust(contentTrust: AdminContentTrustStore): AdminContentTrustStore {
  return JSON.parse(JSON.stringify(contentTrust)) as AdminContentTrustStore;
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

function linksToText(links: AdminFaqItem["links"]) {
  return (links ?? []).map((link) => [link.label, link.href, link.external ? "external" : ""].join(" | ")).join("\n");
}

function textToLinks(value: string) {
  return value
    .split("\n")
    .map((row) => row.trim())
    .filter(Boolean)
    .map((row) => {
      const [label = "", href = "", external = ""] = row.split("|").map((item) => item.trim());

      return {
        label,
        href,
        external: external.toLowerCase() === "external" || external.toLowerCase() === "true",
      };
    })
    .filter((link) => link.label && link.href);
}

function statusLabel(status: AdminContentStatus) {
  if (status === "published") {
    return "Published";
  }

  if (status === "archived") {
    return "Archived";
  }

  return "Draft";
}

function StatusSelect({
  value,
  onChange,
}: Readonly<{ value: AdminContentStatus; onChange: (value: AdminContentStatus) => void }>) {
  return (
    <select value={value} onChange={(event) => onChange(event.target.value as AdminContentStatus)}>
      <option value="published">Published</option>
      <option value="draft">Draft</option>
      <option value="archived">Archived</option>
    </select>
  );
}

export function AdminContentPanel({
  initialContentTrust,
}: Readonly<{ initialContentTrust: AdminContentTrustStore }>) {
  const [contentTrust, setContentTrust] = useState(() => cloneContentTrust(initialContentTrust));
  const [savedContentTrust, setSavedContentTrust] = useState(() => cloneContentTrust(initialContentTrust));
  const [activeSection, setActiveSection] = useState<ContentSection>("faqs");
  const [activeFaqCategoryId, setActiveFaqCategoryId] = useState(initialContentTrust.faqCategories[0]?.id ?? "program-fit");
  const [activeArticleId, setActiveArticleId] = useState(
    initialContentTrust.journalArticles[0]?.id ?? "choose-retreat-duration",
  );
  const [activeMediaId, setActiveMediaId] = useState(initialContentTrust.mediaItems[0]?.id ?? "stories-hero-media");
  const [saveState, setSaveState] = useState<SaveState>("idle");
  const [message, setMessage] = useState("");

  const activeFaqCategory =
    contentTrust.faqCategories.find((category) => category.id === activeFaqCategoryId) ?? contentTrust.faqCategories[0];
  const activeArticle =
    contentTrust.journalArticles.find((article) => article.id === activeArticleId) ?? contentTrust.journalArticles[0];
  const activeMedia = contentTrust.mediaItems.find((item) => item.id === activeMediaId) ?? contentTrust.mediaItems[0];
  const dirty = useMemo(
    () => JSON.stringify(contentTrust) !== JSON.stringify(savedContentTrust),
    [contentTrust, savedContentTrust],
  );
  const publishedFaqCount = contentTrust.faqCategories
    .filter((category) => category.status === "published")
    .flatMap((category) => category.faqs.filter((faq) => faq.enabled)).length;
  const publishedStories = contentTrust.storySlots.filter((story) => story.status === "published").length;
  const publishedArticles = contentTrust.journalArticles.filter((article) => article.status === "published").length;
  const mediaDrafts = contentTrust.mediaItems.filter((item) => item.status !== "published").length;

  function updateFaqCategory(patch: Partial<AdminFaqCategory>) {
    setContentTrust((current) => ({
      ...current,
      faqCategories: current.faqCategories.map((category) =>
        category.id === activeFaqCategoryId ? { ...category, ...patch } : category,
      ),
    }));
  }

  function updateFaq(index: number, patch: Partial<AdminFaqItem>) {
    setContentTrust((current) => ({
      ...current,
      faqCategories: current.faqCategories.map((category) =>
        category.id === activeFaqCategoryId
          ? {
              ...category,
              faqs: category.faqs.map((faq, faqIndex) => (faqIndex === index ? { ...faq, ...patch } : faq)),
            }
          : category,
      ),
    }));
  }

  function updateTrustList(
    field: "responsibleStandards" | "storyTrustMarkers" | "outcomeRows",
    id: string,
    patch: Partial<AdminTrustStandard>,
  ) {
    setContentTrust((current) => ({
      ...current,
      [field]: current[field].map((item) => (item.id === id ? { ...item, ...patch } : item)),
    }));
  }

  function updateStorySlot(id: string, patch: Partial<AdminStorySlot>) {
    setContentTrust((current) => ({
      ...current,
      storySlots: current.storySlots.map((story) => (story.id === id ? { ...story, ...patch } : story)),
    }));
  }

  function updateVideoSlot(id: string, patch: Partial<AdminVideoSlot>) {
    setContentTrust((current) => ({
      ...current,
      videoSlots: current.videoSlots.map((video) => (video.id === id ? { ...video, ...patch } : video)),
    }));
  }

  function updateArticle(patch: Partial<AdminJournalArticle>) {
    setContentTrust((current) => ({
      ...current,
      journalArticles: current.journalArticles.map((article) =>
        article.id === activeArticleId ? { ...article, ...patch } : article,
      ),
    }));
  }

  function updateMedia(patch: Partial<AdminMediaItem>) {
    setContentTrust((current) => ({
      ...current,
      mediaItems: current.mediaItems.map((item) => (item.id === activeMediaId ? { ...item, ...patch } : item)),
    }));
  }

  async function handleSave(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setSaveState("saving");
    setMessage("");

    const response = await fetch("/api/admin/content", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(contentTrust),
    });

    const body = (await response.json().catch(() => null)) as
      | { contentTrust?: AdminContentTrustStore; error?: string }
      | null;

    if (!response.ok || !body?.contentTrust) {
      setSaveState("error");
      setMessage(body?.error ?? "Content could not be saved.");
      return;
    }

    setContentTrust(cloneContentTrust(body.contentTrust));
    setSavedContentTrust(cloneContentTrust(body.contentTrust));
    setSaveState("saved");
    setMessage("Content saved.");
  }

  function handleRevert() {
    setContentTrust(cloneContentTrust(savedContentTrust));
    setSaveState("idle");
    setMessage("Unsaved changes reverted.");
  }

  return (
    <main className="admin-dashboard admin-settings-page" aria-labelledby="admin-content-title">
      <section className="admin-dashboard-hero admin-settings-hero">
        <div>
          <p className="admin-kicker">Content & Trust manager</p>
          <h2 id="admin-content-title">Manage trust-building content across FAQs, stories and journal.</h2>
          <p>
            Phase 5 connects public FAQ, Healing Stories and Journal content to one guarded admin store,
            while dedicated blog publishing now lives in the Blog Upload section.
          </p>
        </div>
        <div className="admin-status-panel" aria-label="Content manager status">
          <span>Content State</span>
          <dl>
            <div>
              <dt>Save status</dt>
              <dd>{dirty ? "Unsaved changes" : "Saved"}</dd>
            </div>
            <div>
              <dt>Updated</dt>
              <dd>{formatUpdatedAt(savedContentTrust.updatedAt)}</dd>
            </div>
            <div>
              <dt>Live FAQs</dt>
              <dd>{publishedFaqCount} answers</dd>
            </div>
            <div>
              <dt>Stories</dt>
              <dd>{publishedStories} slots</dd>
            </div>
            <div>
              <dt>Journal</dt>
              <dd>{publishedArticles} articles</dd>
            </div>
            <div>
              <dt>Media</dt>
              <dd>{mediaDrafts} draft assets</dd>
            </div>
          </dl>
        </div>
      </section>

      <form className="admin-settings-layout" onSubmit={handleSave}>
        <aside className="admin-settings-aside" aria-label="Content sections">
          <div className="admin-settings-tabs" role="tablist" aria-label="Content and trust sections">
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
            <p className="admin-kicker">Frontend wiring</p>
            <h2>Trust pages live now</h2>
            <p>
              FAQs, Healing Stories and Journal read published content from this store. New article
              drafting and cover uploads are handled from Blog Upload.
            </p>
          </div>
        </aside>

        <section className="admin-panel admin-settings-editor">
          <div className="admin-panel-heading admin-settings-heading">
            <div>
              <p className="admin-kicker">Phase 5 editor</p>
              <h2>{sectionTabs.find((tab) => tab.id === activeSection)?.label}</h2>
            </div>
            <span>{dirty ? "Unsaved" : "Saved"}</span>
          </div>

          {activeSection === "faqs" ? (
            <div className="admin-form-stack">
              <div className="admin-form-grid">
                <label className="admin-field">
                  FAQ category
                  <select value={activeFaqCategory?.id} onChange={(event) => setActiveFaqCategoryId(event.target.value)}>
                    {contentTrust.faqCategories.map((category) => (
                      <option value={category.id} key={category.id}>
                        {category.label}
                      </option>
                    ))}
                  </select>
                </label>
                {activeFaqCategory ? (
                  <label className="admin-field">
                    Category status
                    <StatusSelect
                      value={activeFaqCategory.status}
                      onChange={(status) => updateFaqCategory({ status })}
                    />
                  </label>
                ) : null}
              </div>

              {activeFaqCategory ? (
                <>
                  <div className="admin-form-grid">
                    <label className="admin-field">
                      Category label
                      <input
                        value={activeFaqCategory.label}
                        onChange={(event) => updateFaqCategory({ label: event.target.value })}
                      />
                    </label>
                    <label className="admin-field">
                      Category intent
                      <input
                        value={activeFaqCategory.intent}
                        onChange={(event) => updateFaqCategory({ intent: event.target.value })}
                      />
                    </label>
                  </div>

                  <div className="admin-nav-editor-list">
                    {activeFaqCategory.faqs.map((faq, index) => (
                      <article className="admin-nav-editor-card" key={`${activeFaqCategory.id}-${index}`}>
                        <div className="admin-nav-editor-heading">
                          <h3>FAQ {index + 1}</h3>
                          <label className="admin-toggle-row">
                            <input
                              type="checkbox"
                              checked={faq.enabled}
                              onChange={(event) => updateFaq(index, { enabled: event.target.checked })}
                            />
                            <span>Published answer</span>
                          </label>
                        </div>
                        <label className="admin-field">
                          Question
                          <input value={faq.question} onChange={(event) => updateFaq(index, { question: event.target.value })} />
                        </label>
                        <label className="admin-field">
                          Answer paragraphs
                          <textarea
                            value={arrayToText(faq.answer)}
                            onChange={(event) => updateFaq(index, { answer: textToArray(event.target.value) })}
                          />
                        </label>
                        <label className="admin-field">
                          Related links
                          <textarea
                            value={linksToText(faq.links)}
                            onChange={(event) => updateFaq(index, { links: textToLinks(event.target.value) })}
                            placeholder="Label | /href | external"
                          />
                        </label>
                      </article>
                    ))}
                  </div>
                </>
              ) : null}

              <label className="admin-field">
                Visitor research signals
                <textarea
                  value={arrayToText(contentTrust.faqResearchSignals)}
                  onChange={(event) =>
                    setContentTrust((current) => ({ ...current, faqResearchSignals: textToArray(event.target.value) }))
                  }
                />
              </label>

              <div className="admin-nav-editor-list">
                {contentTrust.responsibleStandards.map((standard) => (
                  <article className="admin-nav-editor-card" key={standard.id}>
                    <div className="admin-form-grid">
                      <label className="admin-field">
                        Standard title
                        <input
                          value={standard.title}
                          onChange={(event) =>
                            updateTrustList("responsibleStandards", standard.id, { title: event.target.value })
                          }
                        />
                      </label>
                      <label className="admin-field">
                        Status
                        <StatusSelect
                          value={standard.status}
                          onChange={(status) => updateTrustList("responsibleStandards", standard.id, { status })}
                        />
                      </label>
                    </div>
                    <label className="admin-field">
                      Standard copy
                      <textarea
                        value={standard.copy}
                        onChange={(event) =>
                          updateTrustList("responsibleStandards", standard.id, { copy: event.target.value })
                        }
                      />
                    </label>
                  </article>
                ))}
              </div>
            </div>
          ) : null}

          {activeSection === "stories" ? (
            <div className="admin-form-stack">
              <div className="admin-settings-warning">
                <strong>Consent boundary</strong>
                <p>
                  Story content must stay consent-led and free from medical, cure, guaranteed detox or
                  before-after outcome claims.
                </p>
              </div>

              <div className="admin-form-stack">
                <div className="admin-panel-heading admin-settings-subheading">
                  <div>
                    <p className="admin-kicker">Story trust markers</p>
                    <h3>Top proof strip</h3>
                  </div>
                </div>
                {contentTrust.storyTrustMarkers.map((marker) => (
                  <article className="admin-nav-editor-card" key={marker.id}>
                    <div className="admin-form-grid">
                      <label className="admin-field">
                        Marker title
                        <input
                          value={marker.title}
                          onChange={(event) => updateTrustList("storyTrustMarkers", marker.id, { title: event.target.value })}
                        />
                      </label>
                      <label className="admin-field">
                        Status
                        <StatusSelect
                          value={marker.status}
                          onChange={(status) => updateTrustList("storyTrustMarkers", marker.id, { status })}
                        />
                      </label>
                    </div>
                    <label className="admin-field">
                      Marker copy
                      <textarea
                        value={marker.copy}
                        onChange={(event) => updateTrustList("storyTrustMarkers", marker.id, { copy: event.target.value })}
                      />
                    </label>
                  </article>
                ))}
              </div>

              <div className="admin-form-stack">
                <div className="admin-panel-heading admin-settings-subheading">
                  <div>
                    <p className="admin-kicker">Story slots</p>
                    <h3>Guest journey cards</h3>
                  </div>
                </div>
                {contentTrust.storySlots.map((story) => (
                  <article className="admin-nav-editor-card" key={story.id}>
                    <div className="admin-form-grid">
                      <label className="admin-field">
                        Label
                        <input value={story.label} onChange={(event) => updateStorySlot(story.id, { label: event.target.value })} />
                      </label>
                      <label className="admin-field">
                        Status
                        <StatusSelect value={story.status} onChange={(status) => updateStorySlot(story.id, { status })} />
                      </label>
                    </div>
                    <label className="admin-field">
                      Title
                      <input value={story.title} onChange={(event) => updateStorySlot(story.id, { title: event.target.value })} />
                    </label>
                    <div className="admin-form-grid">
                      <label className="admin-field">
                        Context
                        <textarea
                          value={story.context}
                          onChange={(event) => updateStorySlot(story.id, { context: event.target.value })}
                        />
                      </label>
                      <label className="admin-field">
                        Proof focus
                        <textarea
                          value={story.proof}
                          onChange={(event) => updateStorySlot(story.id, { proof: event.target.value })}
                        />
                      </label>
                    </div>
                  </article>
                ))}
              </div>

              <div className="admin-form-grid">
                {contentTrust.videoSlots.map((video) => (
                  <article className="admin-nav-editor-card" key={video.id}>
                    <label className="admin-field">
                      Video title
                      <input value={video.title} onChange={(event) => updateVideoSlot(video.id, { title: event.target.value })} />
                    </label>
                    <label className="admin-field">
                      Video copy
                      <textarea value={video.copy} onChange={(event) => updateVideoSlot(video.id, { copy: event.target.value })} />
                    </label>
                    <label className="admin-field">
                      Status
                      <StatusSelect value={video.status} onChange={(status) => updateVideoSlot(video.id, { status })} />
                    </label>
                  </article>
                ))}
              </div>

              <label className="admin-field">
                Consent standards
                <textarea
                  value={arrayToText(contentTrust.consentStandards)}
                  onChange={(event) =>
                    setContentTrust((current) => ({ ...current, consentStandards: textToArray(event.target.value) }))
                  }
                />
              </label>
            </div>
          ) : null}

          {activeSection === "journal" && activeArticle ? (
            <div className="admin-form-stack">
              <label className="admin-field">
                Journal categories
                <textarea
                  value={arrayToText(contentTrust.journalCategories)}
                  onChange={(event) =>
                    setContentTrust((current) => ({ ...current, journalCategories: textToArray(event.target.value) }))
                  }
                />
              </label>

              <div className="admin-form-grid">
                <label className="admin-field">
                  Article
                  <select value={activeArticle.id} onChange={(event) => setActiveArticleId(event.target.value)}>
                    {contentTrust.journalArticles.map((article) => (
                      <option value={article.id} key={article.id}>
                        {article.title}
                      </option>
                    ))}
                  </select>
                </label>
                <label className="admin-field">
                  Status
                  <StatusSelect value={activeArticle.status} onChange={(status) => updateArticle({ status })} />
                </label>
              </div>

              <div className="admin-form-grid">
                <label className="admin-toggle-row admin-page-checkbox">
                  <input
                    type="checkbox"
                    checked={activeArticle.featured}
                    onChange={(event) => updateArticle({ featured: event.target.checked })}
                  />
                  <span>Use in editor picks</span>
                </label>
                <label className="admin-field">
                  Category
                  <input value={activeArticle.category} onChange={(event) => updateArticle({ category: event.target.value })} />
                </label>
              </div>

              <label className="admin-field">
                Article title
                <input value={activeArticle.title} onChange={(event) => updateArticle({ title: event.target.value })} />
              </label>
              <label className="admin-field">
                Excerpt
                <textarea value={activeArticle.excerpt} onChange={(event) => updateArticle({ excerpt: event.target.value })} />
              </label>
              <div className="admin-form-grid">
                <label className="admin-field">
                  Date label
                  <input value={activeArticle.date} onChange={(event) => updateArticle({ date: event.target.value })} />
                </label>
                <label className="admin-field">
                  Read time
                  <input value={activeArticle.readTime} onChange={(event) => updateArticle({ readTime: event.target.value })} />
                </label>
              </div>
              <label className="admin-field">
                Audience
                <textarea value={activeArticle.audience} onChange={(event) => updateArticle({ audience: event.target.value })} />
              </label>
              <div className="admin-form-grid">
                <label className="admin-field">
                  Tags
                  <textarea value={arrayToText(activeArticle.tags)} onChange={(event) => updateArticle({ tags: textToArray(event.target.value) })} />
                </label>
                <label className="admin-field">
                  Key points
                  <textarea
                    value={arrayToText(activeArticle.keyPoints)}
                    onChange={(event) => updateArticle({ keyPoints: textToArray(event.target.value) })}
                  />
                </label>
              </div>
              <div className="admin-form-grid">
                <label className="admin-field">
                  Related href
                  <input value={activeArticle.relatedHref} onChange={(event) => updateArticle({ relatedHref: event.target.value })} />
                </label>
                <label className="admin-field">
                  Related label
                  <input value={activeArticle.relatedLabel} onChange={(event) => updateArticle({ relatedLabel: event.target.value })} />
                </label>
                <label className="admin-field">
                  Contact label
                  <input value={activeArticle.contactLabel} onChange={(event) => updateArticle({ contactLabel: event.target.value })} />
                </label>
              </div>
            </div>
          ) : null}

          {activeSection === "media" && activeMedia ? (
            <div className="admin-form-stack">
              <div className="admin-page-list" role="tablist" aria-label="Media items">
                {contentTrust.mediaItems.map((item) => (
                  <button
                    className={activeMediaId === item.id ? "is-active" : ""}
                    type="button"
                    role="tab"
                    aria-selected={activeMediaId === item.id}
                    key={item.id}
                    onClick={() => setActiveMediaId(item.id)}
                  >
                    <span>{item.title}</span>
                    <small>{item.placement}</small>
                    <em className={`admin-page-status is-${item.status}`}>{statusLabel(item.status)}</em>
                  </button>
                ))}
              </div>

              <div className="admin-form-grid">
                <label className="admin-field">
                  Asset title
                  <input value={activeMedia.title} onChange={(event) => updateMedia({ title: event.target.value })} />
                </label>
                <label className="admin-field">
                  Type
                  <select
                    value={activeMedia.type}
                    onChange={(event) => updateMedia({ type: event.target.value as AdminMediaItem["type"] })}
                  >
                    <option value="image">Image</option>
                    <option value="video">Video</option>
                    <option value="document">Document</option>
                    <option value="embed">Embed</option>
                  </select>
                </label>
                <label className="admin-field">
                  Status
                  <StatusSelect value={activeMedia.status} onChange={(status) => updateMedia({ status })} />
                </label>
                <label className="admin-field">
                  Placement
                  <input value={activeMedia.placement} onChange={(event) => updateMedia({ placement: event.target.value })} />
                </label>
              </div>
              <label className="admin-field">
                Asset hint
                <textarea value={activeMedia.assetHint} onChange={(event) => updateMedia({ assetHint: event.target.value })} />
              </label>
              <label className="admin-field">
                Internal notes
                <textarea value={activeMedia.notes} onChange={(event) => updateMedia({ notes: event.target.value })} />
              </label>
            </div>
          ) : null}

          <div className="admin-settings-savebar">
            <div>
              <strong>{dirty ? "Unsaved content changes" : "Content saved"}</strong>
              <p className={saveState === "error" ? "is-error" : undefined}>{message || "Review before publishing."}</p>
            </div>
            <div>
              <button className="admin-secondary-button" type="button" onClick={handleRevert} disabled={!dirty}>
                Revert
              </button>
              <button className="admin-primary-button" type="submit" disabled={!dirty || saveState === "saving"}>
                {saveState === "saving" ? "Saving..." : "Save content"}
              </button>
            </div>
          </div>
        </section>
      </form>
    </main>
  );
}
