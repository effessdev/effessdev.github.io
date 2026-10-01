import type { Metadata } from "next";
import "./globals.css";
import { Inter } from "next/font/google";
import Script from "next/script";
import { ThemeProvider } from "next-themes";

import { cn } from "@/lib/utils";
import { brand } from "@/lib/brand";
import { SiteFooter } from "@/components/layout/site-footer";
import { SiteHeader } from "@/components/layout/site-header";
import ScrollHeader from "@/components/scroll-header";

const inter = Inter({ subsets: ["latin"], variable: "--font-sans" });

export const metadata: Metadata = {
  metadataBase: new URL(brand.url),
  title: {
    default: brand.name,
    template: `%s | ${brand.name}`,
  },
  description: brand.description,
  openGraph: {
    title: brand.name,
    description: brand.description,
    type: "website",
    url: brand.url,
    siteName: brand.name,
  },
  twitter: {
    card: "summary_large_image",
    title: brand.name,
    description: brand.description,
  },
  verification: {
    google: "TKdqNOADhD-ATBbkWCSmNBH5dYWCBpWFuzxbRFSHGHo",
  },
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
    <html
      lang="en"
      className={cn("font-sans", inter.variable)}
      suppressHydrationWarning
    >
      <body className="flex min-h-screen flex-col bg-background text-foreground antialiased">
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <ScrollHeader>
            <SiteHeader />
          </ScrollHeader>

          <main className="flex-1 w-full mx-auto max-w-6xl px-4 pt-24 pb-12 sm:px-6 lg:px-8">
            {children}
          </main>

          <SiteFooter />
        </ThemeProvider>

        {/* Analytics */}
        <Script
          src="https://cloud.umami.is/script.js"
          data-website-id="38f306eb-ba13-4b27-bcaf-e018f3224354"
          strategy="afterInteractive"
        />
      </body>
    </html>
  );
}
