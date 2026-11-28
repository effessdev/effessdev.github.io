"use client";

import { useSyncExternalStore } from "react";
import { Monitor, Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";

type Theme = "light" | "dark" | "system";

const THEMES: Theme[] = ["light", "dark", "system"];

const THEME_ICON: Record<Theme, typeof Sun> = {
  light: Sun,
  dark: Moon,
  system: Monitor,
};

// No-op subscribe: this snapshot only flips once, from the initial hydration
// mismatch being resolved, so there's nothing external to subscribe to.
const subscribe = () => () => {};

/**
 * A tiny segmented control showing all three theme options as hanging
 * ribbons. The active ribbon drops down below the others and picks up
 * its own color and border, like a pressed tab.
 */
export function ThemeToggle() {
  const { theme, setTheme } = useTheme();

  // The stored theme is only readable in the browser, so the server and the
  // first client render both use the default to keep the markup identical.
  const mounted = useSyncExternalStore(
    subscribe,
    () => true,
    () => false,
  );

  const stored: Theme | undefined =
    theme === "light" || theme === "dark" || theme === "system"
      ? theme
      : undefined;
  const current: Theme = (mounted && stored) || "system";

  return (
    <div
      role="radiogroup"
      aria-label="Theme"
      className="inline-flex items-start gap-1"
    >
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
            className={`flex w-7 items-start justify-center bg-muted transition-all duration-200 ease-out ${
              isActive
                ? "h-12 pt-4"
                : "h-9 pt-1.5 text-muted-foreground hover:text-foreground"
            }`}
            style={{
              clipPath: "polygon(0 0, 100% 0, 100% 78%, 50% 100%, 0 78%)",
            }}
          >
            <Icon className={`h-3.5 w-3.5 ${isActive ? "text-primary" : ""}`} />
          </button>
        );
      })}
    </div>
  );
}
