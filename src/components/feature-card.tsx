import { ActionLink } from "@/components/ui/action-link";
import type { ReactNode } from "react";

interface FeatureCardProps {
  title: string;
  description: ReactNode;
  actionHref: string;
  actionLabel: string;
  actionExternal?: boolean;
  actionTarget?: string;
  actionRel?: string;
}

export function FeatureCard({
  title,
  description,
  actionHref,
  actionLabel,
  actionExternal = false,
  actionTarget,
  actionRel,
}: FeatureCardProps) {
  return (
    <article className="flex h-full flex-col rounded-[var(--card-radius)] border border-[var(--card-border)] bg-[var(--surface-color)] p-6 shadow-[0_6px_20px_rgba(2,6,23,0.04)] sm:p-8">
      <h3 className="mb-4 text-[clamp(1.5rem,4vw,2rem)] font-semibold tracking-[-0.02em] text-[var(--text-color)]">
        {title}
      </h3>
      <div className="text-[var(--text-color-muted)]">{description}</div>
      <div className="mt-auto pt-6">
        <ActionLink
          href={actionHref}
          external={actionExternal}
          target={actionTarget}
          rel={actionRel}
          className="w-full sm:w-auto"
        >
          {actionLabel}
        </ActionLink>
      </div>
    </article>
  );
}
