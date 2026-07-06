"use client";

import Image from "next/image";
import { Eye, EyeOff } from "lucide-react";
import { useSearchParams } from "next/navigation";
import { FormEvent, useMemo, useState } from "react";
import { siteConfig } from "@/config/site";

export function AdminLoginForm() {
  const searchParams = useSearchParams();
  const [status, setStatus] = useState<"idle" | "submitting" | "error">("idle");
  const [message, setMessage] = useState("");
  const [showPassword, setShowPassword] = useState(false);

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
            <div className="admin-password-field">
              <input
                name="password"
                type={showPassword ? "text" : "password"}
                autoComplete="current-password"
                required
              />
              <button
                type="button"
                className="admin-password-toggle"
                onClick={() => setShowPassword((current) => !current)}
                aria-label={showPassword ? "Hide password" : "Show password"}
                aria-pressed={showPassword}
              >
                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>
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
