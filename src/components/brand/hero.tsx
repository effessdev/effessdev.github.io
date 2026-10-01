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
    <section className="hero-glow relative overflow-hidden">
      <div className="mx-auto flex w-full max-w-6xl flex-col items-start gap-10 px-4 py-16 sm:px-6 md:flex-row md:items-center md:py-20 lg:px-8">
        <div className="flex-1">
          <p className="inline-flex items-center gap-2 rounded-full border border-border bg-card/60 px-3 py-1 font-mono text-xs text-muted-foreground">
            <span className="h-2 w-2 rounded-full bg-secondary" aria-hidden />
            embedded systems · C · ESP-IDF · hardware
          </p>

          <h1 className="mt-5 text-4xl font-bold tracking-tight text-foreground sm:text-5xl">
            Hi, I&apos;m Faseeh.{" "}
            <span className="text-primary">I make silicon talk.</span>
          </h1>

          <p className="mt-5 max-w-xl text-lg leading-relaxed text-muted-foreground">
            {brand.name} is where I write down what I learn building software
            close to the metal — tutorials and courses on embedded systems, C,
            and everything that blinks back. Plain language, real hardware, no
            fluff.
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
