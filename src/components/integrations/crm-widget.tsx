"use client";

import Script from "next/script";
import { usePathname } from "next/navigation";
import { useSyncExternalStore } from "react";
import { usePublicSiteSettings } from "@/components/site/public-settings-provider";

const subscribeNever = () => () => {};

// Hostname never changes during a session; assume the admin host during SSR so
// CRM scripts only ever load after the client confirms a public host.
function useIsAdminHost() {
  return useSyncExternalStore(
    subscribeNever,
    () => window.location.hostname.startsWith("admin."),
    () => true,
  );
}

export function CrmWidget() {
  const pathname = usePathname();
  const settings = usePublicSiteSettings();
  const isAdminHost = useIsAdminHost();
  const shouldLoad = !pathname?.startsWith("/admin") && !isAdminHost;

  if (!shouldLoad || !settings.crm.enabled || !settings.crm.scriptUrl) {
    return null;
  }

  return (
    <>
      <Script
        id="shreevan-crm-widget"
        src={settings.crm.scriptUrl}
        data-api={settings.crm.apiUrl}
        strategy="lazyOnload"
      />
      <Script
        id="shreevan-crm-forms"
        src="https://crm.shreevanwellness.com/veda-forms.js"
        data-api={settings.crm.apiUrl}
        strategy="afterInteractive"
      />
    </>
  );
}
