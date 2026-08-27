import Link from "next/link";
import { buttonVariants } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

const featuredProjects = [
  {
    title: "MmOrganized",
    description:
      "AI-assisted workspace management with OAuth sign-ins, subscriptions, real-time updates, and a polished full-stack product experience.",
    href: "https://mmorganized.vercel.app",
    label: "Visit website",
    tags: ["Next.js", "Better Auth", "Razorpay"],
  },
  {
    title: "The Stellar Expedition",
    description:
      "A physics-driven space game with orbital planning, device support, and a custom rocket systems feel tuned for experimentation.",
    href: "https://effessdev.itch.io/the-stellar-expedition",
    label: "Play or download",
    tags: ["Godot", "Physics", "Game design"],
  },
  {
    title: "ReptClip",
    description:
      "A fast repository-to-Markdown exporter for LLM workflows, built to make coding context sharing simple and repeatable.",
    href: "https://github.com/effessdev/reptclip",
    label: "View repo",
    tags: ["Python", "CLI", "AI tooling"],
  },
  {
    title: "ghsync-gui",
    description:
      "A one-click GitHub backup utility with sane defaults, local storage, and cross-platform convenience for developers.",
    href: "https://github.com/effessdev/ghsync-gui",
    label: "Open project",
    tags: ["Electron", "GitHub", "Desktop"],
  },
];

const quickLinks = [
  { href: "/read", label: "Read posts" },
  { href: "https://github.com/effessdev", label: "GitHub" },
  { href: "https://www.linkedin.com/in/effessdev", label: "LinkedIn" },
  { href: "https://effessdev.itch.io", label: "itch.io" },
];

export default function Home() {
  return (
    <>
      <header className="py-8">
        <div className="flex flex-col gap-8">
          <div>
            <h1 className="max-w-3xl text-4xl font-bold tracking-tight text-foreground sm:text-5xl lg:text-7xl">
              Hi, I&apos;m EffessDev.
            </h1>
            <p className="mt-5 max-w-2xl text-lg text-muted-foreground md:text-xl">
              I build apps, games, and websites, and I enjoy writing firmware
              and connected devices that bring ideas to life.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <Link
              href="/read"
              className={buttonVariants({ variant: "default", size: "lg" })}
            >
              Read posts
            </Link>
            <a
              href="mailto:effessdev@gmail.com"
              className={buttonVariants({ variant: "outline", size: "lg" })}
            >
              Email me
            </a>
            <a
              href="https://github.com/effessdev"
              target="_blank"
              rel="noreferrer"
              className={buttonVariants({ variant: "secondary", size: "lg" })}
            >
              GitHub
            </a>
          </div>
        </div>

        <div className="mt-8 grid gap-4 md:grid-cols-3">
          <div className="rounded-2xl border border-border bg-card p-4">
            <p className="text-sm text-muted-foreground">Full name</p>
            <p className="mt-2 font-medium text-foreground">
              Faseeh Zaman F. S.
            </p>
          </div>
          <div className="rounded-2xl border border-border bg-card p-4">
            <p className="text-sm text-muted-foreground">Location</p>
            <p className="mt-2 font-medium text-foreground">Kerala, India</p>
          </div>
          <div className="rounded-2xl border border-border bg-card p-4">
            <p className="text-sm text-muted-foreground">Contact</p>
            <a
              href="mailto:effessdev@gmail.com"
              className="mt-2 inline-block font-medium text-foreground underline-offset-4 hover:underline"
            >
              effessdev@gmail.com
            </a>
          </div>
        </div>
      </header>

      <main className="space-y-8 pb-10">
        <section>
          <div className="mb-4 flex items-center justify-between gap-3">
            <h2 className="text-2xl font-semibold tracking-tight text-foreground">
              Featured work
            </h2>
            <Link
              href="/read"
              className="text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
            >
              Browse posts →
            </Link>
          </div>

          <div className="grid gap-6 md:grid-cols-2">
            {featuredProjects.map((project) => (
              <Card
                key={project.title}
                className="h-full border-border/80 bg-card"
              >
                <CardHeader>
                  <CardTitle className="text-2xl">{project.title}</CardTitle>
                  <CardDescription className="mt-2 text-base leading-7 text-muted-foreground">
                    {project.description}
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-5">
                  <div className="flex flex-wrap gap-2">
                    {project.tags.map((tag) => (
                      <span
                        key={tag}
                        className="rounded-full border border-border bg-muted px-2.5 py-1 text-xs font-medium text-muted-foreground"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>

                  <a
                    href={project.href}
                    target="_blank"
                    rel="noreferrer"
                    className={buttonVariants({
                      variant: "outline",
                      size: "default",
                    })}
                  >
                    {project.label}
                  </a>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        <section>
          <Card className="border-border/80 bg-card">
            <CardHeader>
              <CardTitle className="text-2xl">Latest note</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4 pb-6 text-muted-foreground">
              <p className="text-base leading-7">
                I&apos;m currently working through the NimBLE GATT server
                example from the ESP-IDF docs and turning the findings into a
                practical write-up to help others navigate the same setup.
              </p>
              <p className="text-sm">Updated on Aug 26, 2026</p>
            </CardContent>
          </Card>
        </section>

        <section>
          <div className="mb-4">
            <h2 className="text-2xl font-semibold tracking-tight text-foreground">
              More links
            </h2>
          </div>

          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
            {quickLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                target={link.href.startsWith("http") ? "_blank" : undefined}
                rel={link.href.startsWith("http") ? "noreferrer" : undefined}
                className="flex items-center justify-between rounded-2xl border border-border bg-card px-4 py-3 text-sm font-medium text-foreground transition-colors hover:bg-muted"
              >
                <span>{link.label}</span>
                <span aria-hidden="true">→</span>
              </a>
            ))}
          </div>
        </section>
      </main>

      <footer className="border-t py-8 w-full">
        <div className="flex flex-col items-center justify-between gap-4 text-center text-muted-foreground sm:flex-row sm:text-left">
          <p className="text-base">Thanks for visiting. See you again soon.</p>
          <div className="flex items-center gap-3 text-sm">
            <a
              href="https://github.com/effessdev"
              target="_blank"
              rel="noreferrer"
              className="hover:text-foreground"
            >
              GitHub
            </a>
            <a
              href="https://www.linkedin.com/in/effessdev"
              target="_blank"
              rel="noreferrer"
              className="hover:text-foreground"
            >
              LinkedIn
            </a>
            <a
              href="https://effessdev.itch.io"
              className="hover:text-foreground"
            >
              Itch.io
            </a>
          </div>
        </div>
      </footer>
    </>
  );
}
