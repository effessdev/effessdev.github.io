import type { ComponentProps } from "react";
import ReactMarkdown, { type Components } from "react-markdown";
import remarkGfm from "remark-gfm";
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

/** Maps markdown elements to simple typographic styles (no typography plugin). */
const MD_ELEMENTS: Components = {
  h1: ({ children }) => (
    <h1 className="mt-2 text-3xl font-bold tracking-tight text-foreground">
      {children}
    </h1>
  ),
  h2: ({ children }) => (
    <h2 className="mt-8 text-2xl font-bold tracking-tight text-foreground">
      {children}
    </h2>
  ),
  h3: ({ children }) => (
    <h3 className="mt-6 text-lg font-semibold text-foreground">{children}</h3>
  ),
  p: ({ children }) => (
    <p className="mt-4 leading-relaxed text-muted-foreground">{children}</p>
  ),
  ul: ({ children }) => (
    <ul className="mt-4 list-disc space-y-1 pl-6 text-muted-foreground">
      {children}
    </ul>
  ),
  ol: ({ children }) => (
    <ol className="mt-4 list-decimal space-y-1 pl-6 text-muted-foreground">
      {children}
    </ol>
  ),
  li: ({ children }) => <li className="leading-relaxed">{children}</li>,
  a: ({ href, children }) => (
    <a
      href={href}
      className="font-medium text-primary underline-offset-4 hover:underline"
    >
      {children}
    </a>
  ),
  code: ({ children }) => (
    <code className="rounded bg-muted px-1.5 py-0.5 font-mono text-sm text-foreground">
      {children}
    </code>
  ),
  blockquote: ({ children }) => (
    <blockquote className="mt-4 border-l-2 border-primary pl-4 text-muted-foreground italic">
      {children}
    </blockquote>
  ),
  hr: () => <hr className="my-8 border-border" />,
  table: ({ children }) => (
    <div className="mt-4 overflow-x-auto">
      <table className="w-full border-collapse text-sm">{children}</table>
    </div>
  ),
  th: ({ children }) => (
    <th className="border border-border bg-muted px-3 py-2 text-left font-semibold text-foreground">
      {children}
    </th>
  ),
  td: ({ children }) => (
    <td className="border border-border px-3 py-2 text-muted-foreground">
      {children}
    </td>
  ),
};

/** Renders a markdown string with the site's look. */
export function Markdown({ content }: { content: string }) {
  return (
    <ReactMarkdown remarkPlugins={[remarkGfm]} components={MD_ELEMENTS}>
      {content}
    </ReactMarkdown>
  );
}
