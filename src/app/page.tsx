import type { Metadata } from "next";
import Link from "next/link";
import { buttonVariants } from "@/components/ui/button";
import { ActionLabels } from "@/lib/labels";
import { getFeaturedPosts } from "@/lib/posts";
import { Post } from "@/lib/types";
import { getAllCoursesWithLatest } from "@/lib/courses";
import ContentList, { type ContentListEntry } from "@/components/content-list";
import ProjectList from "@/components/project-list";

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

export const metadata: Metadata = {
  title: "EffessDev - Free Tech Courses, Tutorials, and Software (No Ads)",
  description:
    "I build apps, games, and websites, and program MCUs and IoT devices.",
  openGraph: {
    title: "EffessDev",
    description:
      "I build apps, games, and websites, and program MCUs and IoT devices.",
    type: "website",
    url: "https://effessdev.github.io",
  },
  twitter: {
    card: "summary_large_image",
    title: "EffessDev",
    description:
      "I build apps, games, and websites, and program MCUs and IoT devices.",
  },
};

export default function Home() {
  const featuredPosts: Post[] = getFeaturedPosts();
  const allCourses = getAllCoursesWithLatest().sort((a, b) => {
    const ta = a.latestUpdated ? Date.parse(a.latestUpdated) : 0;
    const tb = b.latestUpdated ? Date.parse(b.latestUpdated) : 0;
    return tb - ta;
  });

  const featuredCourses = allCourses.filter((c) => c.featured);
  const featuredEntries: ContentListEntry[] = [
    ...featuredPosts.map((post) => ({
      id: post.id,
      title: post.title,
      description: post.description,
      href: `/read/${post.id}`,
      updated: post.updated,
      tags: post.tags,
      typeLabel: "Post",
    })),
    ...featuredCourses.map((course) => ({
      id: course.id,
      title: course.title,
      description: course.description,
      href: `/read/${course.id}`,
      updated: course.latestUpdated,
      tags: course.tags,
      typeLabel: "Course",
    })),
  ].sort((a, b) => {
    const ta = a.updated ? Date.parse(a.updated) : 0;
    const tb = b.updated ? Date.parse(b.updated) : 0;
    return tb - ta;
  });

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
              href="/read"
              className={buttonVariants({ variant: "default", size: "lg" })}
            >
              {ActionLabels.ReadContent}
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
        <ProjectList heading="Featured Projects" projects={featuredProjects} />
        <ContentList
          heading="Featured Courses & Tutorials"
          items={featuredEntries}
        />
      </main>
    </>
  );
}
