import type { ReactNode } from "react";

interface PageSectionProps {
  title: string;
  children: ReactNode;
  className?: string;
}

export function PageSection({
  title,
  children,
  className = "",
}: PageSectionProps) {
  return (
    <section className={className}>
      <h2 className="mb-6 inline-block border-b-[3px] border-[var(--accent)] pb-2 text-[clamp(2rem,6vw,3rem)] font-bold tracking-[-0.01em] text-[var(--text-color)]">
        {title}
      </h2>
      {children}
    </section>
  );
}
