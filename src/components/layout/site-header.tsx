import Link from "next/link";

import { Logo } from "@/components/brand/logo";
import { SocialIcon } from "@/components/brand/social-icon";
import { ModeToggle } from "@/components/ui/mode-toggle";
import { buttonVariants } from "@/components/ui/button";
import { brand, socials } from "@/lib/brand";
import { ExternalLink } from "lucide-react";

const github = socials.find((social) => social.label === "GitHub")!;

export function SiteHeader() {
  return (
    <div className="flex w-full max-w-6xl items-center justify-between gap-3 rounded-2xl border border-border/80 bg-background/85 px-4 py-3 shadow-sm backdrop-blur-sm sm:px-6 lg:px-8">
      <Link
        href="/"
        className="group flex items-center gap-3 rounded-full no-underline"
        aria-label={`${brand.name} — home`}
      >
        <Logo className="h-9 w-9 rounded-full" />
        <span className="text-lg font-semibold tracking-tight text-foreground">
          {brand.name}
        </span>
      </Link>

      <nav
        aria-label="Main navigation"
        className="flex items-center gap-2 sm:gap-3"
      >
        <Link
          href="/"
          className={buttonVariants({ variant: "default", size: "sm" })}
        >
          Home
        </Link>
        <a
          href={github.href}
          target="_blank"
          rel="noreferrer"
          className={buttonVariants({ variant: "secondary", size: "sm" })}
        >
          <SocialIcon label="GitHub" className="text-base" />
          <span className="hidden sm:inline">GitHub</span>
          <span className="sr-only sm:hidden">GitHub profile</span>
        </a>
        <ModeToggle />
      </nav>
    </div>
  );
}
