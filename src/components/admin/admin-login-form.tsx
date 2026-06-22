"use client";

import Image from "next/image";
import { useSearchParams } from "next/navigation";
import { FormEvent, useMemo, useState } from "react";
import { siteConfig } from "@/config/site";

export function AdminLoginForm() {
  const searchParams = useSearchParams();
  const [status, setStatus] = useState<"idle" | "submitting" | "error">("idle");
  const [message, setMessage] = useState("");

  const nextPath = useMemo(() => {
    const requestedPath = searchParams.get("next");

    if (!requestedPath || !requestedPath.startsWith("/")) {
      return "/admin";
    }

    return requestedPath;
  }, [searchParams]);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setStatus("submitting");
    setMessage("");

    const formData = new FormData(event.currentTarget);

    const response = await fetch("/api/admin/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        username: formData.get("username"),
        password: formData.get("password"),
      }),
    });

    if (!response.ok) {
      const body = (await response.json().catch(() => null)) as { error?: string } | null;

      setStatus("error");
      setMessage(body?.error ?? "Unable to sign in. Check the admin credentials.");
      return;
    }

    window.location.assign(nextPath);
  }

  return (
    <main className="admin-login-page" aria-labelledby="admin-login-title">
      <section className="admin-login-panel">
        <div className="admin-login-brand">
          <Image
            src={siteConfig.logos.horizontalLockup}
            alt="Shreevan Wellness"
            width={214}
            height={62}
            priority
          />
          <span>Admin V1</span>
        </div>

        <div>
          <p className="admin-kicker">Private website operations</p>
          <h1 id="admin-login-title">Sign in to manage Shreevan</h1>
          <p className="admin-login-copy">
            Phase 1 protects the admin route and prepares the dashboard shell for content,
            program, SEO and lead-management modules.
          </p>
        </div>

        <form className="admin-login-form" onSubmit={handleSubmit}>
          <label>
            <span>Username</span>
            <input name="username" type="text" autoComplete="username" required />
          </label>
          <label>
            <span>Password</span>
            <input name="password" type="password" autoComplete="current-password" required />
          </label>

          <button className="admin-primary-button" type="submit" disabled={status === "submitting"}>
            {status === "submitting" ? "Signing in..." : "Sign in"}
          </button>

          <p className="admin-form-status" role={status === "error" ? "alert" : undefined}>
            {message}
          </p>
        </form>
      </section>
    </main>
  );
}
