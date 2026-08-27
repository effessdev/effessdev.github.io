import Link from "next/link";
import type { ReactNode } from "react";

interface ActionLinkProps {
  href: string;
  children: ReactNode;
  className?: string;
  external?: boolean;
  target?: string;
  rel?: string;
  ariaLabel?: string;
}

export function ActionLink({
  href,
  children,
  className = "",
  external = false,
  target,
  rel,
  ariaLabel,
}: ActionLinkProps) {
  const sharedClassName = [
    "inline-flex items-center justify-center gap-2 rounded-[var(--btn-radius)]",
    "border border-transparent bg-[var(--accent)] px-4 py-3 text-base font-semibold text-white",
    "no-underline shadow-[0_6px_18px_rgba(2,6,23,0.06)] transition duration-150 ease-out",
    "hover:-translate-y-0.5 hover:shadow-[0_12px_30px_rgba(2,6,23,0.08)] focus-visible:outline-3",
    "focus-visible:outline-offset-3 focus-visible:outline-[color:var(--accent)]",
    className,
  ]
    .filter(Boolean)
    .join(" ");

  if (external) {
    return (
      <a
        href={href}
        className={sharedClassName}
        target={target}
        rel={rel}
        aria-label={ariaLabel}
      >
        {children}
      </a>
    );
  }

  return (
    <Link href={href} className={sharedClassName} aria-label={ariaLabel}>
      {children}
    </Link>
  );
}
