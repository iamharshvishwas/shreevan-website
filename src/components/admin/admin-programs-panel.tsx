"use client";

import { FormEvent, useMemo, useState } from "react";
import type {
  AdminManagedProgram,
  AdminProgramContentStore,
  AdminProgramStatus,
} from "@/lib/admin/program-content";

type SaveState = "idle" | "saving" | "saved" | "error";
type ProgramArrayField = "highlights" | "inclusions";

function cloneProgramContent(programContent: AdminProgramContentStore): AdminProgramContentStore {
  return JSON.parse(JSON.stringify(programContent)) as AdminProgramContentStore;
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

function statusLabel(status: AdminProgramStatus) {
  if (status === "published") {
    return "Published";
  }

  if (status === "archived") {
    return "Archived";
  }

  return "Draft";
}

function arrayToText(items: string[]) {
  return items.join("\n");
}

function textToArray(value: string) {
  return value
    .split("\n")
    .map((item) => item.trim())
    .filter(Boolean);
}

export function AdminProgramsPanel({
  initialProgramContent,
}: Readonly<{ initialProgramContent: AdminProgramContentStore }>) {
  const [programContent, setProgramContent] = useState(() => cloneProgramContent(initialProgramContent));
  const [savedProgramContent, setSavedProgramContent] = useState(() => cloneProgramContent(initialProgramContent));
  const [activeProgramId, setActiveProgramId] = useState(initialProgramContent.programs[0]?.id ?? "3-day-ganga-reset");
  const [saveState, setSaveState] = useState<SaveState>("idle");
  const [message, setMessage] = useState("");

  const orderedPrograms = useMemo(
    () => [...programContent.programs].sort((first, second) => first.order - second.order),
    [programContent.programs],
  );
  const activeProgram =
    programContent.programs.find((program) => program.id === activeProgramId) ?? programContent.programs[0];
  const dirty = useMemo(
    () => JSON.stringify(programContent) !== JSON.stringify(savedProgramContent),
    [programContent, savedProgramContent],
  );
  const publishedCount = programContent.programs.filter((program) => program.status === "published").length;
  const connectedCount = programContent.programs.filter((program) => program.connected).length;

  function updateActiveProgram(patch: Partial<AdminManagedProgram>) {
    setProgramContent((current) => ({
      ...current,
      programs: current.programs.map((program) =>
        program.id === activeProgramId ? { ...program, ...patch } : program,
      ),
    }));
  }

  function updateSeo(field: keyof AdminManagedProgram["seo"], value: string | boolean) {
    setProgramContent((current) => ({
      ...current,
      programs: current.programs.map((program) =>
        program.id === activeProgramId ? { ...program, seo: { ...program.seo, [field]: value } } : program,
      ),
    }));
  }

  function updateArray(field: ProgramArrayField, value: string) {
    setProgramContent((current) => ({
      ...current,
      programs: current.programs.map((program) =>
        program.id === activeProgramId ? { ...program, [field]: textToArray(value) } : program,
      ),
    }));
  }

  async function handleSave(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setSaveState("saving");
    setMessage("");

    const response = await fetch("/api/admin/programs", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(programContent),
    });

    const body = (await response.json().catch(() => null)) as
      | { programContent?: AdminProgramContentStore; error?: string }
      | null;

    if (!response.ok || !body?.programContent) {
      setSaveState("error");
      setMessage(body?.error ?? "Program content could not be saved.");
      return;
    }

    setProgramContent(cloneProgramContent(body.programContent));
    setSavedProgramContent(cloneProgramContent(body.programContent));
    setSaveState("saved");
    setMessage("Program content saved.");
  }

  function handleRevert() {
    setProgramContent(cloneProgramContent(savedProgramContent));
    setSaveState("idle");
    setMessage("Unsaved changes reverted.");
  }

  if (!activeProgram) {
    return null;
  }

  return (
    <main className="admin-dashboard admin-settings-page" aria-labelledby="admin-programs-title">
      <section className="admin-dashboard-hero admin-settings-hero">
        <div>
          <p className="admin-kicker">Program manager</p>
          <h2 id="admin-programs-title">Manage retreat pathways and homepage program ordering.</h2>
          <p>
            Phase 4 connects the public homepage program index to managed program content. Program
            detail templates remain seeded here until the next wiring pass.
          </p>
        </div>
        <div className="admin-status-panel" aria-label="Program manager status">
          <span>Program State</span>
          <dl>
            <div>
              <dt>Save status</dt>
              <dd>{dirty ? "Unsaved changes" : "Saved"}</dd>
            </div>
            <div>
              <dt>Updated</dt>
              <dd>{formatUpdatedAt(savedProgramContent.updatedAt)}</dd>
            </div>
            <div>
              <dt>Published</dt>
              <dd>{publishedCount} programs</dd>
            </div>
            <div>
              <dt>Homepage</dt>
              <dd>{connectedCount} visible</dd>
            </div>
          </dl>
        </div>
      </section>

      <form className="admin-settings-layout" onSubmit={handleSave}>
        <aside className="admin-settings-aside" aria-label="Managed programs">
          <div className="admin-page-list" role="tablist" aria-label="Managed program list">
            {orderedPrograms.map((program) => (
              <button
                className={activeProgramId === program.id ? "is-active" : ""}
                type="button"
                role="tab"
                aria-selected={activeProgramId === program.id}
                aria-label={`${program.title}, ${program.path}, ${statusLabel(program.status)}${
                  program.connected ? ", homepage visible" : ""
                }`}
                key={program.id}
                onClick={() => setActiveProgramId(program.id)}
              >
                <span>{program.title}</span>
                <small>{program.path}</small>
                <em className={`admin-page-status is-${program.status}`}>{statusLabel(program.status)}</em>
                {program.connected ? <strong>Homepage</strong> : null}
              </button>
            ))}
          </div>

          <div className="admin-panel admin-settings-note">
            <p className="admin-kicker">Frontend wiring</p>
            <h2>Homepage live now</h2>
            <p>
              Published and homepage-visible programs populate the public home program index in order.
              Draft or archived programs are kept out of the live list.
            </p>
          </div>
        </aside>

        <section className="admin-panel admin-settings-editor">
          <div className="admin-panel-heading admin-settings-heading">
            <div>
              <p className="admin-kicker">Phase 4 editor</p>
              <h2>{activeProgram.title}</h2>
            </div>
            <span>{activeProgram.connected ? "Homepage visible" : "Hidden"}</span>
          </div>

          <div className="admin-form-stack">
            <div className="admin-form-grid">
              <label className="admin-field">
                Program title
                <input
                  value={activeProgram.title}
                  onChange={(event) => updateActiveProgram({ title: event.target.value })}
                />
              </label>
              <label className="admin-field">
                Public path
                <input
                  value={activeProgram.path}
                  onChange={(event) => updateActiveProgram({ path: event.target.value })}
                />
              </label>
              <label className="admin-field">
                Status
                <select
                  value={activeProgram.status}
                  onChange={(event) => updateActiveProgram({ status: event.target.value as AdminProgramStatus })}
                >
                  <option value="published">Published</option>
                  <option value="draft">Draft</option>
                  <option value="archived">Archived</option>
                </select>
              </label>
              <label className="admin-field">
                Homepage order
                <input
                  min="1"
                  type="number"
                  value={activeProgram.order}
                  onChange={(event) => updateActiveProgram({ order: Number(event.target.value) })}
                />
              </label>
              <label className="admin-toggle-row admin-page-checkbox">
                <input
                  type="checkbox"
                  checked={activeProgram.connected}
                  onChange={(event) => updateActiveProgram({ connected: event.target.checked })}
                />
                <span>Show on homepage program index</span>
              </label>
              <label className="admin-toggle-row admin-page-checkbox">
                <input
                  type="checkbox"
                  checked={activeProgram.seo.noindex}
                  onChange={(event) => updateSeo("noindex", event.target.checked)}
                />
                <span>Noindex this program</span>
              </label>
            </div>

            <div className="admin-settings-warning">
              <strong>Publishing boundary</strong>
              <p>
                The homepage consumes title, label, duration, summary, outcome, path and order. Deeper
                itinerary and inclusion fields are stored now for program-page wiring in the next pass.
              </p>
            </div>

            <div className="admin-form-stack">
              <div className="admin-panel-heading admin-settings-subheading">
                <div>
                  <p className="admin-kicker">Homepage content</p>
                  <h3>Program index details</h3>
                </div>
              </div>
              <div className="admin-form-grid">
                <label className="admin-field">
                  Duration
                  <input
                    value={activeProgram.duration}
                    onChange={(event) => updateActiveProgram({ duration: event.target.value })}
                  />
                </label>
                <label className="admin-field">
                  Label
                  <input
                    value={activeProgram.label}
                    onChange={(event) => updateActiveProgram({ label: event.target.value })}
                    placeholder="Signature, Advanced or blank"
                  />
                </label>
              </div>
              <label className="admin-field">
                Short summary
                <textarea
                  value={activeProgram.summary}
                  onChange={(event) => updateActiveProgram({ summary: event.target.value })}
                />
              </label>
              <label className="admin-field">
                Outcome
                <textarea
                  value={activeProgram.outcome}
                  onChange={(event) => updateActiveProgram({ outcome: event.target.value })}
                />
              </label>
            </div>

            <div className="admin-form-stack">
              <div className="admin-panel-heading admin-settings-subheading">
                <div>
                  <p className="admin-kicker">Program page seed</p>
                  <h3>Audience, investment and included details</h3>
                </div>
              </div>
              <div className="admin-form-grid">
                <label className="admin-field">
                  Audience
                  <textarea
                    value={activeProgram.audience}
                    onChange={(event) => updateActiveProgram({ audience: event.target.value })}
                  />
                </label>
                <label className="admin-field">
                  Investment note
                  <textarea
                    value={activeProgram.investment}
                    onChange={(event) => updateActiveProgram({ investment: event.target.value })}
                  />
                </label>
              </div>
              <label className="admin-field">
                Highlights
                <textarea
                  value={arrayToText(activeProgram.highlights)}
                  onChange={(event) => updateArray("highlights", event.target.value)}
                />
              </label>
              <label className="admin-field">
                Inclusions
                <textarea
                  value={arrayToText(activeProgram.inclusions)}
                  onChange={(event) => updateArray("inclusions", event.target.value)}
                />
              </label>
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
                <input value={activeProgram.seo.title} onChange={(event) => updateSeo("title", event.target.value)} />
              </label>
              <label className="admin-field">
                Meta description
                <textarea
                  value={activeProgram.seo.description}
                  onChange={(event) => updateSeo("description", event.target.value)}
                />
              </label>
              <label className="admin-field">
                Canonical path
                <input
                  value={activeProgram.seo.canonicalPath}
                  onChange={(event) => updateSeo("canonicalPath", event.target.value)}
                />
              </label>
            </div>

            <label className="admin-field">
              Internal notes
              <textarea
                value={activeProgram.notes}
                onChange={(event) => updateActiveProgram({ notes: event.target.value })}
              />
            </label>
          </div>

          <div className="admin-settings-savebar">
            <div>
              <strong>{dirty ? "Unsaved program changes" : "Program content saved"}</strong>
              <p className={saveState === "error" ? "is-error" : undefined}>{message || "Review before publishing."}</p>
            </div>
            <div>
              <button className="admin-secondary-button" type="button" onClick={handleRevert} disabled={!dirty}>
                Revert
              </button>
              <button className="admin-primary-button" type="submit" disabled={!dirty || saveState === "saving"}>
                {saveState === "saving" ? "Saving..." : "Save program content"}
              </button>
            </div>
          </div>
        </section>
      </form>
    </main>
  );
}
