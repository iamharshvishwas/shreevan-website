import type { Metadata } from "next";
import { AdminHomePanel } from "@/components/admin/admin-home-panel";
import { AdminShell } from "@/components/admin/admin-shell";
import { readAdminHomeContent } from "@/lib/admin/home-content";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Home Page",
};

export default async function AdminHomePage() {
  const homeContent = await readAdminHomeContent();

  return (
    <AdminShell activeSection="home" kicker="Home Builder" title="Home page">
      <AdminHomePanel initialHomeContent={homeContent} />
    </AdminShell>
  );
}
