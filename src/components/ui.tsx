import type { ComponentProps } from "react";
import { cn } from "@/lib/utils";

/** Shared bordered-surface look (list items, articles, nav tiles). */
export const card = "rounded-2xl border border-border bg-card";

const BTN_VARIANTS = {
  solid: "bg-primary text-primary-foreground hover:bg-primary/80",
  outline: "border-border bg-background hover:bg-muted",
  secondary: "bg-secondary text-secondary-foreground hover:bg-secondary/80",
};

const BTN_SIZES = {
  sm: "h-8 px-3",
  md: "h-9 px-3",
  lg: "h-10 px-4",
  icon: "size-9",
};

/**
 * Button classes for `<a>`/`<Link>` elements and real `<button>`s alike —
 * one definition, so links and buttons never drift apart visually.
 */
export function btn(
  {
    variant = "solid",
    size = "md",
  }: {
    variant?: keyof typeof BTN_VARIANTS;
    size?: keyof typeof BTN_SIZES;
  } = {},
  className?: string,
) {
  return cn(
    "inline-flex shrink-0 items-center justify-center gap-1.5 rounded-xl border border-transparent text-sm font-medium whitespace-nowrap transition-colors outline-none select-none focus-visible:ring-2 focus-visible:ring-primary/50 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg]:size-4",
    BTN_VARIANTS[variant],
    BTN_SIZES[size],
    className,
  );
}

export function Badge({
  className,
  tone = "default",
  ...props
}: ComponentProps<"span"> & { tone?: "default" | "destructive" }) {
  return (
    <span
      className={cn(
        "inline-flex h-5 items-center gap-1 rounded-full border px-2 text-xs font-medium whitespace-nowrap",
        tone === "default"
          ? "border-border text-foreground"
          : "border-destructive/30 bg-destructive/10 text-destructive",
        className,
      )}
      {...props}
    />
  );
}
