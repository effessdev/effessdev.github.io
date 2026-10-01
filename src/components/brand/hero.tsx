import { Logo } from "@/components/brand/logo";
import { SocialIcon } from "@/components/brand/social-icon";
import { buttonVariants } from "@/components/ui/button";
import { brand, repoUrl, socials } from "@/lib/brand";

const github = socials.find((social) => social.label === "GitHub")!;

/**
 * The front door. The mark reads as `f()` — a function call broadcasting a
 * signal — so the hero leans into that: short, technical, a little cheeky.
 */
export function Hero() {
  return (
    <section className="hero-glow border rounded-2xl relative overflow-hidden">
      <div className="mx-auto flex w-full max-w-6xl flex-col items-start gap-10 px-4 py-4 sm:py-6 sm:px-6 md:flex-row md:items-center lg:px-8 lg:py-8">
        <div className="flex-1">
          <p className="inline-flex items-center gap-2 rounded-full border border-border bg-card/60 px-3 py-1 font-mono text-xs text-muted-foreground">
            <span className="h-2 w-2 rounded-full bg-secondary" aria-hidden />
            Embedded Systems · C & C++ · ESP-IDF · RTOS
          </p>

          <h1 className="mt-5 text-4xl font-bold tracking-tight text-foreground sm:text-5xl">
            Free tutorials related to{" "}
            <span className="text-primary">embedded systems</span>
          </h1>

          <p className="mt-5 max-w-xl text-lg leading-relaxed text-muted-foreground">
            This site is a collection of tutorials related to embedded systems,
            C, C++, ESP-IDF, and RTOS. I hope you find them useful.
          </p>

          <div className="mt-8 flex flex-wrap items-center gap-3">
            <a href="#tutorials" className={buttonVariants({ size: "lg" })}>
              Start reading
            </a>
            <a
              href={github.href}
              target="_blank"
              rel="noreferrer"
              className={buttonVariants({ variant: "outline", size: "lg" })}
            >
              <SocialIcon label="GitHub" />
              Reach out on GitHub
            </a>
          </div>

          <p className="mt-4 text-sm text-muted-foreground">
            This site doubles as my portfolio — the source lives on{" "}
            <a
              href={repoUrl}
              target="_blank"
              rel="noreferrer"
              className="font-medium text-primary underline-offset-4 hover:underline"
            >
              GitHub
            </a>
            , and so do I.
          </p>
        </div>

        <div className="relative mx-auto hidden shrink-0 md:block">
          <div
            aria-hidden
            className="absolute inset-0 -m-10 rounded-full bg-secondary/10 blur-3xl"
          />
          <Logo className="relative h-52 w-52 drop-shadow-2xl" />
        </div>
      </div>
    </section>
  );
}
