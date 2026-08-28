import Link from "next/link";
import { ModeToggle } from "@/components/ui/mode-toggle";

const navItems = [
  { href: "/", label: "Home" },
  { href: "/posts", label: "Posts" },
  { href: "https://github.com/effessdev", label: "GitHub" },
  { href: "https://effessdev.itch.io", label: "itch.io" },
];

export default function Navbar() {
  return (
    <div className="border-b border-border/80 bg-background/80 backdrop-blur-sm lg:block">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
        <Link
          href="/"
          className="text-lg font-semibold tracking-tight text-foreground"
        >
          EffessDev
        </Link>
        <nav aria-label="Main navigation" className="flex items-center gap-2">
          {navItems.map((item) => {
            const isExternal =
              item.href.startsWith("http") || item.href.startsWith("mailto:");

            if (isExternal) {
              return (
                <a
                  key={item.label}
                  href={item.href}
                  target={item.href.startsWith("http") ? "_blank" : undefined}
                  rel={item.href.startsWith("http") ? "noreferrer" : undefined}
                  className="hidden md:block rounded-full px-3 py-2 text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
                >
                  {item.label}
                </a>
              );
            }

            return (
              <Link
                key={item.label}
                href={item.href}
                className="hidden md:block rounded-full px-3 py-2 text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
              >
                {item.label}
              </Link>
            );
          })}
          <ModeToggle />
        </nav>
      </div>
    </div>
  );
}
