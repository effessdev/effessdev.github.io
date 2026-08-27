import { FeatureCard } from "@/components/feature-card";
import { PageHeader } from "@/components/page-header";
import { PageSection } from "@/components/page-section";
import { SiteFooter } from "@/components/site-footer";
import { SocialLinks } from "@/components/social-links";
import { ActionLink } from "@/components/ui/action-link";

export default function Home() {
  return (
    <>
      <PageHeader>
        <h1 className="mb-4 text-[clamp(2.5rem,8vw,4rem)] font-bold leading-[1.1] tracking-[-0.05em] text-[var(--text-color)]">
          Hi, I am EffessDev
        </h1>
        <p className="mb-8 text-[clamp(1.15rem,3vw,1.5rem)] text-[var(--text-color-muted)]">
          I build apps, games, and websites, and program MCUs and IoT devices.
        </p>

        <div className="mb-8 border-l-4 border-[var(--accent)] pl-4 text-base text-[var(--text-color)]">
          <strong>Full name: Faseeh Zaman F. S.</strong>
          <br />
          Location: Kerala, Email:{" "}
          <a
            href="mailto:effessdev@gmail.com"
            className="text-inherit underline"
          >
            effessdev@gmail.com
          </a>
        </div>

        <SocialLinks />
      </PageHeader>

      <main className="mx-auto max-w-6xl px-4 py-10 sm:px-6 lg:px-8">
        <PageSection title="Featured">
          <div className="grid gap-6 md:grid-cols-2">
            <FeatureCard
              title="MmOrganized"
              description={
                <p>
                  An AI-powered, multi-tenant, full-stack Next.js application
                  with secure authentication (Google &amp; GitHub OAuth),
                  payment gateway integration (Razorpay), and real-time
                  notifications (using Pusher). Motion (Framer Motion), Shadcn
                  UI, Drizzle ORM, Better Auth, and Lucide React were used to
                  speed up development. New users get limited free credits to
                  try it out!
                </p>
              }
              actionHref="https://mmorganized.vercel.app"
              actionLabel="Visit Website"
              actionExternal
              actionTarget="_blank"
              actionRel="noreferrer"
            />

            <FeatureCard
              title="The Stellar Expedition"
              description={
                <p>
                  A skill-based space exploration game made with Godot. Features
                  realistic gravity physics, real-time orbital trajectory
                  prediction, a custom particle system for the rocket thruster,
                  various planets, with gas planets having a drag force, and
                  cryptographic data hashing and validation to prevent cheating.
                  Available on Browser, Windows, Linux, and Android. Click the
                  button below to play without installing or download the game
                  for free.
                </p>
              }
              actionHref="https://effessdev.itch.io/the-stellar-expedition"
              actionLabel="Play/Download"
              actionExternal
              actionTarget="_blank"
              actionRel="noreferrer"
            />

            <FeatureCard
              title="ReptClip"
              description={
                <p>
                  A fast, cross-platform Python CLI app that turns a git
                  repository into clean Markdown context for an LLM chat, and
                  copies it straight to your clipboard. Supports
                  including/excluding files using glob patterns, default
                  patterns though reptclip-config.toml, easy install using pip,
                  and custom presets.
                </p>
              }
              actionHref="https://github.com/effessdev/reptclip"
              actionLabel="View Repo"
              actionExternal
              actionTarget="_blank"
              actionRel="noreferrer"
            />

            <FeatureCard
              title="ghsync-gui"
              description={
                <p>
                  A GUI app built with Electron to back up your GitHub
                  repositories into your local machine with a single click.
                  Supports Git LFS, automatic dark and light mode and ignoring
                  specific repos.
                </p>
              }
              actionHref="https://github.com/effessdev/ghsync-gui"
              actionLabel="View on GitHub"
              actionExternal
              actionTarget="_blank"
              actionRel="noreferrer"
            />
          </div>
        </PageSection>

        <PageSection title="Latest">
          <article className="rounded-[var(--card-radius)] border border-[var(--card-border)] bg-[var(--surface-color)] p-6 shadow-[0_6px_20px_rgba(2,6,23,0.04)] sm:p-8">
            <p className="mb-4 text-[var(--text-color)]">
              Trying to figure out the NimBLE_GATT_Server example from the
              official ESP-IDF docs. Also writing a tutorial about this on DEV
              to help others like me.
            </p>
            <p className="pl-4 text-[var(--text-color-muted)]">
              Updated on: Aug 26, 2026
            </p>
          </article>
        </PageSection>

        <PageSection title="Early Work &amp; Experiments">
          <div className="grid gap-6 md:grid-cols-2">
            <FeatureCard
              title="File Encrypter"
              description={
                <p>
                  A small Python GUI app made with Tkinter to encrypt and
                  decrypt individual files.
                </p>
              }
              actionHref="https://github.com/effessdev/file-encrypter"
              actionLabel="View Repo"
              actionExternal
              actionTarget="_blank"
              actionRel="noreferrer"
            />

            <FeatureCard
              title="Apple Jump"
              description={
                <p>
                  A small Unity game (probably my first one) that I made when I
                  was a kid. Available on Windows.
                </p>
              }
              actionHref="https://effessdev.itch.io/apple-jump"
              actionLabel="Download on itch.io"
              actionExternal
              actionTarget="_blank"
              actionRel="noreferrer"
            />

            <FeatureCard
              title="Recall Words"
              description={
                <p>
                  A small Python Flask web app to build vocabulary using spaced
                  repetition.
                </p>
              }
              actionHref="https://github.com/effessdev/recall-words"
              actionLabel="View Repo"
              actionExternal
              actionTarget="_blank"
              actionRel="noreferrer"
            />

            <FeatureCard
              title="Trigonometric Visualizer"
              description={
                <p>
                  Graphical visualization of trigonometric concepts. Made with
                  Python and Pygame.
                </p>
              }
              actionHref="https://github.com/effessdev/trigonometric-visualizer"
              actionLabel="View Repo"
              actionExternal
              actionTarget="_blank"
              actionRel="noreferrer"
            />
          </div>
        </PageSection>

        <PageSection title="More stuff">
          <div className="grid gap-6 md:grid-cols-1">
            <article className="rounded-[var(--card-radius)] border border-[var(--card-border)] bg-[var(--surface-color)] p-6 shadow-[0_6px_20px_rgba(2,6,23,0.04)] sm:p-8">
              <p className="mb-6 text-[var(--text-color-muted)]">
                The projects that aren't listed here can be found on my GitHub.
              </p>
              <ActionLink
                href="https://github.com/effessdev?tab=repositories"
                external
                target="_blank"
                rel="noreferrer"
              >
                Browse Repos
              </ActionLink>
            </article>
          </div>
        </PageSection>
      </main>

      <SiteFooter />
    </>
  );
}
