"use client";

import { createContext, useContext } from "react";
import type { PublicSiteSettings } from "@/lib/site/public-settings-types";
import { defaultPublicSiteSettings } from "@/lib/site/public-settings-defaults";

const PublicSiteSettingsContext = createContext<PublicSiteSettings>(defaultPublicSiteSettings);

export function PublicSiteSettingsProvider({
  children,
  settings,
}: Readonly<{
  children: React.ReactNode;
  settings: PublicSiteSettings;
}>) {
  return <PublicSiteSettingsContext.Provider value={settings}>{children}</PublicSiteSettingsContext.Provider>;
}

export function usePublicSiteSettings() {
  return useContext(PublicSiteSettingsContext);
}
