"use client";

import type { LucideIcon } from "lucide-react";

export function ToolbarButton({
  icon: Icon,
  title,
  onClick,
  isActive = false,
  disabled = false,
}: Readonly<{
  icon: LucideIcon;
  title: string;
  onClick: () => void;
  isActive?: boolean;
  disabled?: boolean;
}>) {
  return (
    <button
      type="button"
      className={isActive ? "admin-rte-button is-active" : "admin-rte-button"}
      title={title}
      aria-label={title}
      aria-pressed={isActive}
      onClick={onClick}
      disabled={disabled}
    >
      <Icon size={16} />
    </button>
  );
}
