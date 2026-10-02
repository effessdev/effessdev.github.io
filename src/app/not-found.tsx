import Link from "next/link";
import { Logo } from "@/components/logo";
import { btn } from "@/components/ui";

export default function NotFound() {
  return (
    <div className="flex min-h-[50vh] flex-col items-center justify-center gap-6 py-12 text-center">
      <Logo className="h-24 w-24 rounded-full opacity-90" />

      <p className="font-mono text-sm text-muted-foreground">
        f() &rarr; undefined
      </p>

      <h1 className="text-4xl font-bold tracking-tight sm:text-5xl">
        This page drifted off the map.
      </h1>

      <p className="max-w-md text-lg text-muted-foreground">
        The page you&apos;re looking for isn&apos;t here, or it may have moved
        to new hardware.
      </p>

      <Link href="/" className={btn({ size: "lg" })}>
        Back to the tutorials
      </Link>
    </div>
  );
}
