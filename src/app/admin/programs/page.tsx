import type { Metadata } from "next";
import { AdminProgramsPanel } from "@/components/admin/admin-programs-panel";
import { AdminShell } from "@/components/admin/admin-shell";
import { readAdminProgramContent } from "@/lib/admin/program-content";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Programs",
};

export default async function AdminProgramsPage() {
  const programContent = await readAdminProgramContent();

  return (
    <AdminShell activeSection="programs" kicker="Phase 4" title="Programs">
      <AdminProgramsPanel initialProgramContent={programContent} />
    </AdminShell>
  );
}
