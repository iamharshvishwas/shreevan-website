"use client";

import { useState } from "react";

export function AdminLogoutButton() {
  const [isSubmitting, setIsSubmitting] = useState(false);

  async function handleLogout() {
    setIsSubmitting(true);
    await fetch("/api/admin/logout", { method: "POST" });

    const isAdminHost = window.location.hostname.startsWith("admin.");
    window.location.assign(isAdminHost ? "/login" : "/admin/login");
  }

  return (
    <button className="admin-ghost-button" type="button" onClick={handleLogout} disabled={isSubmitting}>
      {isSubmitting ? "Signing out..." : "Sign out"}
    </button>
  );
}
