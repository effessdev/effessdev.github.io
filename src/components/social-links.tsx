import { ActionLink } from "@/components/ui/action-link";

const socialItems = [
  {
    label: "GitHub",
    href: "https://github.com/effessdev/",
    icon: "fab fa-github",
  },
  {
    label: "itch.io",
    href: "https://effessdev.itch.io/",
    icon: "fab fa-itch-io",
  },
  {
    label: "LinkedIn",
    href: "https://www.linkedin.com/in/effessdev/",
    icon: "fab fa-linkedin",
  },
  { label: "Posts", href: "/read", icon: "fas fa-book" },
];

interface SocialLinksProps {
  variant?: "header" | "footer";
  className?: string;
}

export function SocialLinks({
  variant = "header",
  className = "",
}: SocialLinksProps) {
  const isFooter = variant === "footer";

  return (
    <div
      className={[
        "flex flex-wrap gap-3",
        isFooter ? "justify-center" : "",
        className,
      ]
        .filter(Boolean)
        .join(" ")}
    >
      {socialItems.map((item) => (
        <ActionLink
          key={item.label}
          href={item.href}
          external={item.href.startsWith("http")}
          target={item.href.startsWith("http") ? "_blank" : undefined}
          rel={item.href.startsWith("http") ? "noreferrer" : undefined}
          ariaLabel={item.label}
          className={[
            "min-h-[3.1rem] px-4 py-3",
            isFooter
              ? "h-12 w-12 rounded-lg border border-[var(--card-border)] bg-transparent p-0 text-[var(--text-color)] hover:text-[var(--accent)]"
              : "",
          ]
            .filter(Boolean)
            .join(" ")}
        >
          <i className={item.icon} aria-hidden="true" />
          {!isFooter && item.label}
        </ActionLink>
      ))}
    </div>
  );
}
