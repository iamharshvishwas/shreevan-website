import type { Metadata } from "next";
import { AdminDashboard } from "@/components/admin/admin-dashboard";
import { AdminShell } from "@/components/admin/admin-shell";

export const metadata: Metadata = {
  title: "Dashboard",
};

export default function AdminPage() {
  return (
    <AdminShell>
      <AdminDashboard />
    </AdminShell>
  );
}
