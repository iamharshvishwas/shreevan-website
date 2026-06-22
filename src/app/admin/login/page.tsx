import type { Metadata } from "next";
import { Suspense } from "react";
import { AdminLoginForm } from "@/components/admin/admin-login-form";

export const metadata: Metadata = {
  title: "Login",
};

export default function AdminLoginPage() {
  return (
    <Suspense fallback={<main className="admin-login-page" />}>
      <AdminLoginForm />
    </Suspense>
  );
}
