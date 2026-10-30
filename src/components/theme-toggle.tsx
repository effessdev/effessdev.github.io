"use client";

import { useEffect, useState } from "react";
import { Monitor, Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";
import { floatBtn } from "@/components/ui";

type Theme = "light" | "dark" | "system";

const NEXT_THEME: Record<Theme, Theme> = {
  light: "dark",
  dark: "system",
  system: "light",
};

const THEME_ICON: Record<Theme, typeof Sun> = {
  light: Sun,
  dark: Moon,
  system: Monitor,
};

/** One small floating button that cycles light → dark → system. */
export function ThemeToggle() {
  const { theme, setTheme } = useTheme();

  // The stored theme is only readable in the browser, so the server and the
  // first client render both use the default to keep the markup identical.
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  const stored: Theme | undefined =
    theme === "light" || theme === "dark" || theme === "system"
      ? theme
      : undefined;
  const current: Theme = (mounted && stored) || "system";
  const Icon = THEME_ICON[current];

  return (
    <button
      type="button"
      aria-label={`Current theme: ${current}. Click to switch.`}
      onClick={() => setTheme(NEXT_THEME[current])}
      className={floatBtn}
    >
      <Icon />
    </button>
  );
}
