import type { Metadata } from "next";
import "./globals.css";
import { Inter } from "next/font/google";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { ThemeProvider } from "@/components/theme-provider";
import Navbar from "./navbar";
import Footer from "./footer";
import ScrollHeader from "@/components/scroll-header";
import Script from "next/script";

const inter = Inter({ subsets: ["latin"], variable: "--font-sans" });

export const metadata: Metadata = {
  title: "EffessDev",
  description:
    "I build apps, games, and websites, and program MCUs and IoT devices.",
  openGraph: {
    title: "EffessDev",
    description:
      "I build apps, games, and websites, and program MCUs and IoT devices.",
    type: "website",
    url: "https://effessdev.github.io",
  },
  twitter: {
    card: "summary_large_image",
    title: "EffessDev",
    description:
      "I build apps, games, and websites, and program MCUs and IoT devices.",
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
      <head>
        <link
          rel="stylesheet"
          href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css"
        />
      </head>
      <body className="min-h-screen bg-background text-foreground antialiased">
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <div className="flex min-h-screen flex-col">
            <ScrollHeader>
              <Navbar />
            </ScrollHeader>

            <main className="flex-1 w-full mx-auto max-w-6xl px-4 py-6 sm:px-6 lg:px-8">
              {children}
            </main>

            <Footer />
          </div>
        </ThemeProvider>

        {/* GoatCounter Analytics */}
        <Script
          src="https://gc.zgo.at/count.js"
          data-goatcounter="https://effessdev.goatcounter.com/count"
          strategy="afterInteractive"
        />
      </body>
    </html>
  );
}
