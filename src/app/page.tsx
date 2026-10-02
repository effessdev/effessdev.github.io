import type { Metadata } from "next";
import ContentList from "@/components/content-list";
import { brand } from "@/lib/brand";
import { getContentListings } from "@/lib/content";
import { Logo } from "@/components/logo";
import { SocialIcon } from "@/components/social-icon";
import { btn } from "@/components/ui";
import { repoUrl, socials } from "@/lib/brand";

const github = socials.find((social) => social.label === "GitHub")!;

export const metadata: Metadata = {
  title: "Embedded Systems Tutorials",
  description: brand.description,
};

export default function Home() {
  const listings = getContentListings();

  return (
    <>
      <section className="bg-card">
        <div className="mx-auto flex w-full max-w-6xl flex-col items-start gap-10 px-4 py-12 sm:px-6 md:flex-row md:items-center lg:px-8">
          <div className="flex-1">
            <p className="inline-flex items-center gap-2 rounded-full border border-border bg-background px-3 py-1 text-xs text-muted-foreground">
              <span className="h-2 w-2 rounded-full bg-secondary" aria-hidden />
              Learn for free, without ads!
            </p>

            <h1 className="mt-5 text-4xl font-bold tracking-tight text-foreground sm:text-5xl">
              Free tutorials on{" "}
              <span className="font-display text-primary">
                embedded systems
              </span>
            </h1>

            <p className="mt-5 max-w-xl text-lg leading-relaxed text-muted-foreground">
              Learn about microcontrollers, low-level programming, embedded
              protocols, etc. I hope you find this useful :D
            </p>

            <div className="mt-8 flex flex-wrap items-center gap-3">
              <a href="#tutorials" className={btn({ size: "lg" })}>
                Start reading
              </a>
              <a
                href={github.href}
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
                href={repoUrl}
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

      <div
        id="tutorials"
        className="mx-auto w-full max-w-6xl px-4 pt-12 pb-12 sm:px-6 lg:px-8"
      >
        <ContentList heading="Tutorials" items={listings} />
      </div>
      <div className="h-12" />
    </>
  );
}
