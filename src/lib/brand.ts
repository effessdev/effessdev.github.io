/**
 * Single source of truth for the EffessDev brand.
 *
 * The palette is sampled directly from the brand mark (public/favicon.svg):
 * a deep sea blue canvas, a yellow "f", light-blue signal rings, and an
 * orange broadcast arc.
 */
export const brand = {
  name: "EffessDev",
  owner: "Faseeh Zaman F S",
  url: "https://effessdev.github.io",
  tagline: "Tutorials on embedded systems, C, and the metal underneath.",
  description:
    "Plain-spoken tutorials on embedded systems, C, ESP-IDF, and everything that blinks back.",
  colors: {
    sea: "#045a87",
    yellow: "#fce168",
    orange: "#fdc268",
    sky: "#82d1fe",
  },
} as const;

export type BrandColor = keyof typeof brand.colors;

/** Where the source of this site (and everything else) lives. */
export const repoUrl = "https://github.com/effessdev/effessdev.github.io";

export const socials = [
  {
    label: "GitHub",
    blurb: "Source of this site, projects, and the fastest way to reach me",
    href: "https://github.com/effessdev",
  },
  {
    label: "LinkedIn",
    blurb: "Professional background and work history",
    href: "https://www.linkedin.com/in/effessdev",
  },
  {
    label: "DEV.to",
    blurb: "Cross-posted articles",
    href: "https://dev.to/effessdev",
  },
  {
    label: "itch.io",
    blurb: "Games and experimental builds",
    href: "https://effessdev.itch.io",
  },
] as const satisfies ReadonlyArray<{
  label: string;
  blurb: string;
  href: string;
}>;

export type SocialLabel = (typeof socials)[number]["label"];
