import { SocialLinks } from "@/components/social-links";

export function SiteFooter({
  text = "Thanks for visiting. See you again soon!",
}: {
  text?: string;
}) {
  return (
    <div className="border-t border-[var(--card-border)] bg-[var(--surface-color)]">
      <footer className="mx-auto max-w-6xl px-4 py-10 text-center sm:px-6 lg:px-8">
        <p className="text-[clamp(1.15rem,3vw,1.5rem)] text-[var(--text-color-muted)]">
          {text}
        </p>
        <SocialLinks variant="footer" className="mt-8" />
      </footer>
    </div>
  );
}
