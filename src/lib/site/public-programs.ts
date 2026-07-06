import "server-only";

import { unstable_cache } from "next/cache";
import { defaultAdminProgramContent, readAdminProgramContent } from "@/lib/admin/program-content";
import type { AdminManagedProgram } from "@/lib/admin/program-content";
import { CACHE_TAGS } from "@/lib/site/content-cache";
import type { PublicProgramSummary } from "@/lib/site/public-programs-types";

function cleanText(value: string, fallback: string) {
  return value.trim() || fallback;
}

function toPublicProgram(program: AdminManagedProgram, fallback: AdminManagedProgram, index: number): PublicProgramSummary {
  return {
    id: program.id,
    no: String(index + 1).padStart(2, "0"),
    title: cleanText(program.title, fallback.title),
    href: cleanText(program.path, fallback.path),
    duration: cleanText(program.duration, fallback.duration),
    summary: cleanText(program.summary, fallback.summary),
    outcome: cleanText(program.outcome, fallback.outcome),
    label: program.label.trim(),
  };
}

function orderPrograms(programs: AdminManagedProgram[]) {
  return [...programs].sort((first, second) => first.order - second.order || first.title.localeCompare(second.title));
}

export const getPublicProgramSummaries = unstable_cache(
  async function getPublicProgramSummaries() {
    const store = await readAdminProgramContent();
    const defaultById = new Map(defaultAdminProgramContent.programs.map((program) => [program.id, program]));
    const livePrograms = store.programs.filter((program) => program.status === "published" && program.connected);
    const sourcePrograms =
      livePrograms.length > 0
        ? livePrograms
        : defaultAdminProgramContent.programs.filter((program) => program.status === "published" && program.connected);

    return orderPrograms(sourcePrograms).map((program, index) =>
      toPublicProgram(program, defaultById.get(program.id) ?? program, index),
    );
  },
  ["public-program-summaries"],
  { tags: [CACHE_TAGS.programs] },
);
