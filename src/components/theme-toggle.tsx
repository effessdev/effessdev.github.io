"use client";

import { Monitor, Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";
import { btn } from "@/components/ui";

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

/** One small button that cycles light → dark → system. */
export function ThemeToggle() {
  const { theme, setTheme } = useTheme();
  const current: Theme =
    theme === "light" || theme === "dark" || theme === "system"
      ? theme
      : "system";
  const Icon = THEME_ICON[current];

  return (
    <button
      type="button"
      aria-label={`Current theme: ${current}. Click to switch.`}
      onClick={() => setTheme(NEXT_THEME[current])}
      className={btn({ variant: "outline", size: "icon" })}
    >
      <Icon />
    </button>
  );
}
