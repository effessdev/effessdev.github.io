import type { ReactNode } from "react";

interface PageHeaderProps {
  children: ReactNode;
  className?: string;
}

export function PageHeader({ children, className = "" }: PageHeaderProps) {
  return (
    <div
      className={[
        "border-b border-[var(--card-border)] bg-[linear-gradient(0deg,rgba(255,255,255,0)_0%,rgba(245,245,245,0.92)_100%)]",
        className,
      ]
        .filter(Boolean)
        .join(" ")}
      style={{
        backgroundImage:
          "linear-gradient(0deg, rgba(255,255,255,0) 0%, rgba(245,245,245,0.92) 100%)",
      }}
    >
      <header className="mx-auto max-w-6xl px-4 py-10 sm:px-6 lg:px-8">
        {children}
      </header>
    </div>
  );
}
