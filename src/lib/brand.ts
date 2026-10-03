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
