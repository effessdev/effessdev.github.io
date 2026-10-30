import type { Metadata } from "next";
import { Logo } from "@/components/logo";
import { SocialIcon } from "@/components/social-icon";
import { RepoCard } from "@/components/repo-card";
import { btn } from "@/components/ui";
import { loadHome } from "@/lib/content";
import { slugify } from "@/lib/utils";

export const metadata: Metadata = {
  title: "EffessDev • Home",
};

const categories = await loadHome([
  {
    name: "Embedded Systems",
    description: "My top projects related to embedded systems.",
    repos: [{ name: "esp-idf" }, { name: "smart-led" }],
  },
  {
    name: "Software Engineering",
    description: "My top projects related to software engineering.",
    repos: [{ name: "reptclip-vscode" }, { name: "GiffyPy" }],
  },
  {
    name: "Web & Game Development",
    description: "My top projects related to web and game development.",
    repos: [
      {
        name: "MmOrganized",
        url: "https://mmorganized.vercel.app",
        description:
          "An AI-powered memory capture and recall app. Made with Next.js, Drizzle, Shadcn, Pusher, Razorpay, etc. Limited free credits for new users!",
      },
      {
        name: "The Stellar Expedition",
        url: "https://effessdev.itch.io/the-stellar-expedition",
        description:
          "Float through space to reach your station. A relaxing physics-based 2D game made with Godot.",
      },
    ],
  },
  {
    name: "Everything else",
    description: "Click the following links to find my other projects.",
    repos: [
      {
        name: "GitHub Repositories",
        url: "https://github.com/effessdev?tab=repositories",
        description: "Browse all my public repositories.",
      },
      {
        name: "Itch.io Games",
        url: "https://effessdev.itch.io",
        description: "Browse my games on Itch.io.",
      },
    ],
  },
]);

export default async function Home() {
  return (
    <>
      <section className="bg-card">
        <div className="mx-auto flex w-full max-w-6xl flex-col items-start gap-10 px-4 py-12 sm:px-6 md:flex-row md:items-center lg:px-8">
          <div className="flex-1">
            <p className="inline-flex items-center gap-2 rounded-full border border-border bg-background px-3 py-1 text-xs text-muted-foreground">
              <span className="h-2 w-2 rounded-full bg-secondary" aria-hidden />
              Full Name: Faseeh Zaman F S
            </p>

            <h1 className="mt-5 text-4xl font-bold tracking-tight text-foreground sm:text-5xl">
              Hi, I am{" "}
              <span className="font-display text-primary">EffessDev</span>
            </h1>

            <p className="mt-5 max-w-xl text-lg leading-relaxed text-muted-foreground">
              I build apps, games, and websites, and program MCUs and IoT
              devices.
            </p>

            <div className="mt-8 flex flex-wrap items-center gap-3">
              <a href="#content" className={btn({ size: "lg" })}>
                See my Work
              </a>
              <a
                href="https://github.com/effessdev"
                target="_blank"
                rel="noreferrer"
                className={btn({ variant: "outline", size: "lg" })}
              >
                <SocialIcon label="GitHub" />
                Reach out on GitHub
              </a>
            </div>

            <p className="mt-4 text-sm text-muted-foreground">
              This site is open source.{" "}
              <a
                href="https://github.com/effessdev/effessdev.github.io"
                target="_blank"
                rel="noreferrer"
                className="font-medium text-primary underline-offset-4 hover:underline"
              >
                Click here
              </a>{" "}
              to view the GitHub repository.
            </p>
          </div>

          <div className="mx-auto hidden shrink-0 md:block">
            <Logo className="h-52 w-52" />
          </div>
        </div>
      </section>
      <div id="content" />
      <div className="mx-auto w-full max-w-6xl px-4 py-12 sm:px-6 lg:px-8">
        <article className="space-y-14">
          {categories.map((category) => (
            <section key={category.name} className="scroll-mt-24">
              <h2
                id={slugify(category.name)}
                className="text-2xl font-bold tracking-tight text-foreground"
              >
                {category.name}
              </h2>
              {category.description && (
                <p className="mt-3 max-w-2xl leading-7 text-muted-foreground">
                  {category.description}
                </p>
              )}
              <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-5">
                {category.repos.map((repo) => (
                  <RepoCard key={repo.url || repo.label} repo={repo} />
                ))}
              </div>
            </section>
          ))}
        </article>
      </div>
      <div className="h-12" />
    </>
  );
}
