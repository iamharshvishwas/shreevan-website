import { siteConfig } from "@/config/site";
import { getSupabaseAdminClient } from "@/lib/supabase/client";
import { CACHE_TAGS, revalidatePublicContent } from "@/lib/site/content-cache";

export type AdminProgramStatus = "draft" | "published" | "archived";

export type AdminManagedProgram = {
  id: string;
  title: string;
  path: string;
  status: AdminProgramStatus;
  connected: boolean;
  order: number;
  label: string;
  duration: string;
  summary: string;
  outcome: string;
  audience: string;
  investment: string;
  seo: {
    title: string;
    description: string;
    canonicalPath: string;
    noindex: boolean;
  };
  highlights: string[];
  inclusions: string[];
  notes: string;
};

export type AdminProgramContentStore = {
  programs: AdminManagedProgram[];
  updatedAt: string;
};


export const defaultAdminProgramContent: AdminProgramContentStore = {
  updatedAt: "2026-06-21T00:00:00.000Z",
  programs: [
    {
      id: "3-day-ganga-reset",
      title: "3-Day Ganga Sattva Reset",
      path: "/programs/3-day-ganga-reset",
      status: "published",
      connected: true,
      order: 1,
      label: "",
      duration: "3 days",
      summary: "Best for a short pause and reconnection.",
      outcome: "A gentle return to breath, rhythm and perspective.",
      audience: "First-time retreat guests, busy professionals and travellers who need a grounded pause.",
      investment: "Confirm after suitability review",
      seo: {
        title: `3-Day Ganga Sattva Reset | ${siteConfig.name}`,
        description:
          "Pause, breathe and reconnect through a first-timer friendly Shreevan Wellness retreat with yoga, pranayama, meditation and daily-rhythm support.",
        canonicalPath: "/programs/3-day-ganga-reset",
        noindex: false,
      },
      highlights: [
        "Gentle yoga, pranayama and meditation rhythm",
        "First-timer friendly schedule",
        "Short reset for stress, clarity and perspective",
      ],
      inclusions: [
        "Guided daily practices",
        "Sattvic vegetarian meals",
        "Accommodation and retreat support",
        "Pre-arrival suitability conversation",
      ],
      notes: "Homepage program index is connected in Phase 4; full public program template wiring stays on the next pass.",
    },
    {
      id: "7-day-foundation",
      title: "7-Day Ganga Sattva Foundation",
      path: "/programs/7-day-foundation",
      status: "published",
      connected: true,
      order: 2,
      label: "",
      duration: "7 days",
      summary: "Best for beginners who want structure and clarity.",
      outcome: "A practical base for everyday wellness practices.",
      audience: "Guests who want a complete but approachable foundation in yogic daily rhythm.",
      investment: "Confirm after suitability review",
      seo: {
        title: `7-Day Ganga Sattva Foundation | ${siteConfig.name}`,
        description:
          "Build a practical wellness foundation through yoga, pranayama, meditation, sattvic nutrition and habit formation at Shreevan Wellness.",
        canonicalPath: "/programs/7-day-foundation",
        noindex: false,
      },
      highlights: [
        "Structured 7-day retreat rhythm",
        "Yoga, breathwork, meditation and reflective practices",
        "Habit formation for post-retreat integration",
      ],
      inclusions: [
        "Daily guided practice",
        "Sattvic meals and stay support",
        "Workshops and integration guidance",
        "Suitability-led booking process",
      ],
      notes: "Core beginner pathway. Keep claims practical and education-led.",
    },
    {
      id: "14-day-transformation",
      title: "14-Day Ganga Sattva Transformation",
      path: "/programs/14-day-transformation",
      status: "published",
      connected: true,
      order: 3,
      label: "",
      duration: "14 days",
      summary: "Best for a deeper mind-body-emotional reset.",
      outcome: "More time for practice, reflection and integration.",
      audience: "Guests in a life transition or deeper reset window who can commit to two weeks.",
      investment: "Confirm after suitability review",
      seo: {
        title: `14-Day Ganga Sattva Transformation | ${siteConfig.name}`,
        description:
          "A deeper Shreevan Wellness retreat for yoga, meditation, emotional healing, purpose work and practical life-design support.",
        canonicalPath: "/programs/14-day-transformation",
        noindex: false,
      },
      highlights: [
        "Two-week transformation rhythm",
        "Mind-body-emotional reset practices",
        "Purpose, reflection and integration work",
      ],
      inclusions: [
        "Daily practice and workshops",
        "Sattvic meals and accommodation",
        "Reflection and sharing circles",
        "Post-retreat routine guidance",
      ],
      notes: "Use responsible wellness language; avoid guaranteed transformation claims.",
    },
    {
      id: "28-day-inner-awakening",
      title: "28-Day Sattva Ganga Inner Awakening",
      path: "/programs/28-day-inner-awakening",
      status: "published",
      connected: true,
      order: 4,
      label: "Signature",
      duration: "28 days",
      summary: "Best for a complete structured retreat experience.",
      outcome: "A sustained reset with daily rhythm, guided practice and reflection.",
      audience: "Serious seekers, founders and professionals ready for a full immersive reset.",
      investment: "Confirm after suitability review",
      seo: {
        title: `28-Day Sattva Ganga Inner Awakening | ${siteConfig.name}`,
        description:
          "Shreevan Wellness's signature 28-day immersive retreat for guided practice, reflection, integration and conscious lifestyle reset in Rishikesh.",
        canonicalPath: "/programs/28-day-inner-awakening",
        noindex: false,
      },
      highlights: [
        "Signature immersive Shreevan pathway",
        "Sustained daily rhythm and integration",
        "120-140 guided experiences across four weeks",
      ],
      inclusions: [
        "Daily yoga, pranayama and meditation",
        "Sattvic meals and accommodation",
        "Workshops, mentoring and reflection",
        "Integration plan for returning home",
      ],
      notes: "Signature offer. Keep it visually prominent on the homepage index.",
    },
    {
      id: "60-day-rishi-residency",
      title: "60-Day Rishi Tantra Conscious Living Residency",
      path: "/programs/60-day-rishi-residency",
      status: "published",
      connected: true,
      order: 5,
      label: "Advanced",
      duration: "60 days",
      summary: "Advanced residency for serious lifestyle reinvention.",
      outcome: "A conscious living residency with mentoring, service and integration.",
      audience: "Advanced guests seeking a long-form residency, mentoring and lifestyle reinvention.",
      investment: "Confirm after suitability review",
      seo: {
        title: `60-Day Rishi Tantra Conscious Living Residency | ${siteConfig.name}`,
        description:
          "Shreevan Wellness's advanced 60-day conscious living residency for health, habits, purpose, mentoring and long-term integration.",
        canonicalPath: "/programs/60-day-rishi-residency",
        noindex: false,
      },
      highlights: [
        "Advanced conscious-living residency",
        "Long-form mentoring, practice and integration",
        "Health, habits, purpose and service rhythm",
      ],
      inclusions: [
        "Residency stay and sattvic meals",
        "Daily practice and curriculum tracks",
        "Mentoring and integration support",
        "Post-program conscious living plan",
      ],
      notes: "Advanced pathway; suitability screening should stay prominent before booking.",
    },
  ],
};

function isRecord(value: unknown): value is Record<string, unknown> {
  return Boolean(value && typeof value === "object" && !Array.isArray(value));
}

function stringValue(value: unknown, fallback: string) {
  return typeof value === "string" ? value : fallback;
}

function booleanValue(value: unknown, fallback: boolean) {
  return typeof value === "boolean" ? value : fallback;
}

function numberValue(value: unknown, fallback: number) {
  const number = typeof value === "number" ? value : Number(value);

  return Number.isFinite(number) ? number : fallback;
}

function statusValue(value: unknown, fallback: AdminProgramStatus): AdminProgramStatus {
  return value === "draft" || value === "published" || value === "archived" ? value : fallback;
}

function stringArrayValue(value: unknown, fallback: string[]) {
  if (!Array.isArray(value)) {
    return fallback;
  }

  return value.filter((item): item is string => typeof item === "string").map((item) => item.trim()).filter(Boolean);
}

function normalizeProgram(value: unknown, fallback: AdminManagedProgram): AdminManagedProgram {
  const input = isRecord(value) ? value : {};
  const seo = isRecord(input.seo) ? input.seo : {};

  return {
    id: stringValue(input.id, fallback.id),
    title: stringValue(input.title, fallback.title),
    path: stringValue(input.path, fallback.path),
    status: statusValue(input.status, fallback.status),
    connected: booleanValue(input.connected, fallback.connected),
    order: numberValue(input.order, fallback.order),
    label: stringValue(input.label, fallback.label),
    duration: stringValue(input.duration, fallback.duration),
    summary: stringValue(input.summary, fallback.summary),
    outcome: stringValue(input.outcome, fallback.outcome),
    audience: stringValue(input.audience, fallback.audience),
    investment: stringValue(input.investment, fallback.investment),
    seo: {
      title: stringValue(seo.title, fallback.seo.title),
      description: stringValue(seo.description, fallback.seo.description),
      canonicalPath: stringValue(seo.canonicalPath, fallback.seo.canonicalPath),
      noindex: booleanValue(seo.noindex, fallback.seo.noindex),
    },
    highlights: stringArrayValue(input.highlights, fallback.highlights),
    inclusions: stringArrayValue(input.inclusions, fallback.inclusions),
    notes: stringValue(input.notes, fallback.notes),
  };
}

export function normalizeAdminProgramContent(value: unknown): AdminProgramContentStore {
  const input = isRecord(value) ? value : {};
  const incomingPrograms = Array.isArray(input.programs) ? input.programs : [];
  const incomingById = new Map(
    incomingPrograms
      .filter(isRecord)
      .map((program) => [typeof program.id === "string" ? program.id : "", program] as const),
  );

  const defaultPrograms = defaultAdminProgramContent.programs.map((fallback) =>
    normalizeProgram(incomingById.get(fallback.id), fallback),
  );
  const defaultIds = new Set(defaultPrograms.map((program) => program.id));
  const customPrograms = incomingPrograms
    .filter(isRecord)
    .filter((program) => typeof program.id === "string" && program.id && !defaultIds.has(program.id))
    .map((program, index) =>
      normalizeProgram(program, {
        id: `custom-program-${index + 1}`,
        title: "Custom Program",
        path: "/programs/custom-program",
        status: "draft",
        connected: false,
        order: defaultAdminProgramContent.programs.length + index + 1,
        label: "",
        duration: "",
        summary: "",
        outcome: "",
        audience: "",
        investment: "",
        seo: {
          title: "",
          description: "",
          canonicalPath: "/programs/custom-program",
          noindex: true,
        },
        highlights: [],
        inclusions: [],
        notes: "",
      }),
    );

  return {
    programs: [...defaultPrograms, ...customPrograms],
    updatedAt: stringValue(input.updatedAt, defaultAdminProgramContent.updatedAt),
  };
}

function rowToManagedProgram(row: Record<string, unknown>): unknown {
  return {
    id: row.id,
    title: row.title,
    path: row.path,
    status: row.status,
    connected: row.connected,
    order: row.order_num,
    label: row.label,
    duration: row.duration,
    summary: row.summary,
    outcome: row.outcome,
    audience: row.audience,
    investment: row.investment,
    seo: row.seo,
    highlights: row.highlights,
    inclusions: row.inclusions,
    notes: row.notes,
  };
}

export async function readAdminProgramContent() {
  const client = getSupabaseAdminClient();
  const { data, error } = await client.from("managed_programs").select("*").order("order_num", { ascending: true });

  if (error) {
    throw new Error(`readAdminProgramContent: ${error.message}`);
  }

  if (!data?.length) {
    return defaultAdminProgramContent;
  }

  return normalizeAdminProgramContent({
    programs: data.map(rowToManagedProgram),
    updatedAt: data.reduce(
      (latest, row) => (typeof row.updated_at === "string" && row.updated_at > latest ? row.updated_at : latest),
      "",
    ),
  });
}

export async function writeAdminProgramContent(value: unknown) {
  const programContent = {
    ...normalizeAdminProgramContent(value),
    updatedAt: new Date().toISOString(),
  };

  const client = getSupabaseAdminClient();
  const rows = programContent.programs.map((program) => ({
    id: program.id,
    title: program.title,
    path: program.path,
    status: program.status,
    connected: program.connected,
    order_num: program.order,
    label: program.label,
    duration: program.duration,
    summary: program.summary,
    outcome: program.outcome,
    audience: program.audience,
    investment: program.investment,
    seo: program.seo,
    highlights: program.highlights,
    inclusions: program.inclusions,
    notes: program.notes,
    updated_at: programContent.updatedAt,
  }));

  const { error: upsertError } = await client.from("managed_programs").upsert(rows, { onConflict: "id" });

  if (upsertError) {
    throw new Error(`managed_programs upsert failed: ${upsertError.message}`);
  }

  const keepIds = rows.map((row) => row.id);
  const { error: deleteError } = await client
    .from("managed_programs")
    .delete()
    .not("id", "in", `(${keepIds.join(",")})`);

  if (deleteError) {
    throw new Error(`managed_programs cleanup failed: ${deleteError.message}`);
  }

  await revalidatePublicContent(CACHE_TAGS.programs);

  return programContent;
}
