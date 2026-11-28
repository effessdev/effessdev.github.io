"use client";

import { useEffect, useState } from "react";
import { Monitor, Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";

type Theme = "light" | "dark" | "system";

const THEMES: Theme[] = ["light", "dark", "system"];

const THEME_ICON: Record<Theme, typeof Sun> = {
  light: Sun,
  dark: Moon,
  system: Monitor,
};

const SEGMENT = 28; // px — width of each segment, keep in sync with w-7 below

/**
 * A tiny segmented control showing all three theme options at once,
 * with a spring-animated pill that slides to the active choice.
 */
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
  const activeIndex = THEMES.indexOf(current);

  return (
    <div
      role="radiogroup"
      aria-label="Theme"
      className="relative inline-flex items-center gap-0 rounded-full border border-border bg-muted p-1 shadow-[0_2px_0_0_var(--card-edge)]"
    >
      {/* Highlight pill */}
      <span
        aria-hidden
        className="absolute inset-y-1 left-1 w-7 rounded-full bg-card shadow-[0_1.5px_0_0_var(--card-edge)]"
        style={{ transform: `translateX(${activeIndex * SEGMENT}px)` }}
      />

      {THEMES.map((t) => {
        const Icon = THEME_ICON[t];
        const isActive = mounted && t === current;
        return (
          <button
            key={t}
            type="button"
            role="radio"
            aria-checked={isActive}
            aria-label={`${t} theme`}
            onClick={() => setTheme(t)}
            className="relative z-10 flex h-7 w-7 items-center justify-center rounded-full"
          >
            <Icon
              className={`h-3.5 w-3.5 ${
                isActive
                  ? "scale-110 text-primary"
                  : "scale-90 text-muted-foreground hover:text-foreground"
              }`}
            />
          </button>
        );
      })}
    </div>
  );
}
