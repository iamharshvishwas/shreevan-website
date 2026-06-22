"use client";

import Script from "next/script";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { usePublicSiteSettings } from "@/components/site/public-settings-provider";

export function CrmWidget() {
  const pathname = usePathname();
  const settings = usePublicSiteSettings();
  const [shouldLoad, setShouldLoad] = useState(false);

  useEffect(() => {
    const isAdminPath = pathname?.startsWith("/admin");
    const isAdminHost = window.location.hostname.startsWith("admin.");

    setShouldLoad(!isAdminPath && !isAdminHost);
  }, [pathname]);

  if (!shouldLoad || !settings.crm.enabled || !settings.crm.scriptUrl) {
    return null;
  }

  return (
    <>
      <Script
        id="shreevan-crm-widget"
        src={settings.crm.scriptUrl}
        data-api={settings.crm.apiUrl}
        strategy="afterInteractive"
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
