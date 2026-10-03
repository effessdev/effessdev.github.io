import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/** Turns heading text into a URL-friendly anchor id. */
export function slugify(text: string) {
  return text
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, "")
    .replace(/[\s_-]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

export type TocHeading = { text: string; slug: string; level: number };

/** Extracts `#`/`##`/`###` headings from markdown, skipping fenced code blocks. */
export function extractHeadings(markdown: string): TocHeading[] {
  const headings: TocHeading[] = [];
  let inCode = false;
  for (const line of markdown.split("\n")) {
    if (/^\s*```/.test(line)) {
      inCode = !inCode;
      continue;
    }
    if (inCode) continue;
    const match = /^(#{1,3})\s+(.+?)\s*#*\s*$/.exec(line);
    if (!match) continue;
    const text = match[2].replace(/[*_`]/g, "").trim();
    headings.push({ text, slug: slugify(text), level: match[1].length });
  }
  return headings;
}
