import Link from "next/link";
import { buttonVariants } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { ArrowRight } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { getPostById } from "@/lib/posts";
import { Post } from "@/lib/types";

const featuredProjects = [
  {
    title: "MmOrganized",
    description:
      "An AI-powered, multi-tenant, full-stack Next.js application with               secure authentication (Google and GitHub OAuth), payment gateway               integration (Razorpay), and real-time notifications (using Pusher). Motion (Framer Motion), Shadcn UI, Tailwind CSS, Drizzle ORM, Better Auth, Lucide React, etc. were used to speed up development. Used for memorizing and recalling facts easily with control. Import and export data. New users get limited free credits to try it out!",
    href: "https://mmorganized.vercel.app",
    label: "Visit website",
    tags: ["Next.js", "Better Auth", "Razorpay"],
  },
  {
    title: "The Stellar Expedition",
    description:
      "A skill-based space exploration game made with Godot. Features realistic gravity physics, real-time orbital trajectory prediction, a custom particle system for the rocket thruster, various planets, with gas planets having a drag force, and cryptographic data hashing and validation to prevent cheating. Available on Browser, Windows, Linux, and Android. Click the button below to play without installing or download the game for free.",
    href: "https://effessdev.itch.io/the-stellar-expedition",
    label: "Play or download",
    tags: ["Godot", "Physics", "Game design"],
  },
  {
    title: "ReptClip",
    description:
      "A fast, cross-platform Python CLI app that turns a git repository into clean Markdown context for an LLM chat, and copies it straight to your clipboard. Supports including/excluding files using glob patterns, default patterns though reptclip-config.toml, easy install using pip, and custom presets.",
    href: "https://github.com/effessdev/reptclip",
    label: "View repo",
    tags: ["Python", "CLI", "AI tooling"],
  },
  {
    title: "ghsync-gui",
    description:
      "A GUI app built with Electron to back up your GitHub repositories into your local machine with a single click. Supports Git LFS, automatic dark and light mode and ignoring specific repos.",
    href: "https://github.com/effessdev/ghsync-gui",
    label: "View repo",
    tags: ["Electron", "GitHub", "Desktop"],
  },
];

const featuredPostIds = ["2026-08-27"];

const quickLinks = [
  { href: "/courses", label: "View Courses" },
  { href: "/posts", label: "Read Posts" },
  { href: "https://github.com/effessdev", label: "GitHub" },
  { href: "https://www.linkedin.com/in/effessdev", label: "LinkedIn" },
];

export default function Home() {
  let featuredPosts: Post[] = [];

  if (featuredPostIds.length > 0) {
    featuredPosts = featuredPostIds
      .map((id) => getPostById(id))
      .filter((post): post is Post => post !== null);
  }

  return (
    <>
      <header className="py-8">
        <div className="flex flex-col gap-8">
          <div>
            <h1 className="max-w-3xl text-4xl font-bold tracking-tight text-foreground sm:text-5xl lg:text-7xl">
              Hi, I&apos;m EffessDev.
            </h1>
            <p className="mt-5 max-w-2xl text-lg text-muted-foreground md:text-xl">
              I enjoy building apps, games, and websites, and programming MCUs
              and IoT devices.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <Link
              href="/courses"
              className={buttonVariants({ variant: "default", size: "lg" })}
            >
              View Courses
            </Link>
            <Link
              href="/posts"
              className={buttonVariants({ variant: "outline", size: "lg" })}
            >
              Read Posts
            </Link>
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
            <p className="mt-2 font-medium text-foreground">
              Alappuzha, Kerala
            </p>
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
              Featured Work
            </h2>
            <Link
              href="/posts"
              className="text-sm flex items-center gap-2 font-medium text-muted-foreground transition-colors hover:text-foreground"
            >
              Browse posts <ArrowRight />
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
                      <Badge variant="secondary" key={tag}>
                        {tag}
                      </Badge>
                    ))}
                  </div>

                  <a
                    href={project.href}
                    target="_blank"
                    rel="noreferrer"
                    className={buttonVariants({
                      variant: "default",
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
          <div className="mb-4 flex items-center justify-between gap-3">
            <h2 className="text-2xl font-semibold tracking-tight text-foreground">
              Featured Posts
            </h2>
            <Link
              href="/posts"
              className="text-sm flex items-center gap-2 font-medium text-muted-foreground transition-colors hover:text-foreground"
            >
              Browse posts <ArrowRight />
            </Link>
          </div>

          <div className="space-y-6">
            {featuredPosts.map((post) => (
              <Card
                key={post.title}
                className="h-full border-border/80 bg-card"
              >
                <CardContent>
                  <div className="flex gap-4 mb-2 w-full justify-between items-start">
                    <CardTitle className="text-2xl">{post.title}</CardTitle>
                    <Link
                      href={`/posts/${post.id}`}
                      className={buttonVariants({
                        variant: "default",
                        size: "default",
                      })}
                    >
                      Read
                    </Link>
                  </div>
                  <p className="text-base leading-7 text-muted-foreground">
                    {post.description}
                  </p>
                  <div className="flex mt-4 flex-wrap gap-2">
                    {post.tags.map((tag) => (
                      <Badge variant="secondary" key={tag}>
                        {tag}
                      </Badge>
                    ))}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
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
    </>
  );
}
