import type { Metadata } from "next";
import "./globals.css";
import { Inter } from "next/font/google";
import Link from "next/link";
import { cn } from "@/lib/utils";

const inter = Inter({ subsets: ["latin"], variable: "--font-sans" });

const navItems = [
  { href: "/", label: "Home" },
  { href: "/read", label: "Read" },
  { href: "https://github.com/effessdev", label: "GitHub" },
  { href: "mailto:effessdev@gmail.com", label: "Email" },
];

export const metadata: Metadata = {
  title: "EffessDev",
  description:
    "I build apps, games, and websites, and program MCUs and IoT devices.",
  icons: {
    icon: [
      { url: "/favicon.ico" },
      { url: "/favicon.svg", type: "image/svg+xml" },
    ],
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={cn("font-sans", inter.variable)}>
      <head>
        <link
          rel="stylesheet"
          href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css"
        />
      </head>
      <body className="min-h-screen bg-background text-foreground antialiased">
        <div className="min-h-screen">
          <header className="hidden border-b border-border/80 bg-background/80 backdrop-blur-sm lg:block">
            <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
              <Link
                href="/"
                className="text-lg font-semibold tracking-tight text-foreground"
              >
                EffessDev
              </Link>
              <nav
                aria-label="Main navigation"
                className="flex items-center gap-2"
              >
                {navItems.map((item) => {
                  const isExternal =
                    item.href.startsWith("http") ||
                    item.href.startsWith("mailto:");

                  if (isExternal) {
                    return (
                      <a
                        key={item.label}
                        href={item.href}
                        target={
                          item.href.startsWith("http") ? "_blank" : undefined
                        }
                        rel={
                          item.href.startsWith("http")
                            ? "noreferrer"
                            : undefined
                        }
                        className="rounded-full px-3 py-2 text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
                      >
                        {item.label}
                      </a>
                    );
                  }

                  return (
                    <Link
                      key={item.label}
                      href={item.href}
                      className="rounded-full px-3 py-2 text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
                    >
                      {item.label}
                    </Link>
                  );
                })}
              </nav>
            </div>
          </header>

          <div className="mx-auto max-w-6xl px-4 py-6 sm:px-6 lg:px-8">
            {children}
          </div>
        </div>
      </body>
    </html>
  );
}
