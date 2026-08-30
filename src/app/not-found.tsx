import Link from "next/link";
import { buttonVariants } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function NotFound() {
  return (
    <main className="flex min-h-[60vh] items-center justify-center py-12">
      <Card className="w-full max-w-xl border-border/80 bg-card text-center">
        <CardHeader>
          <CardTitle className="text-4xl font-bold tracking-tight">
            404
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6 pb-6">
          <p className="text-lg text-muted-foreground">
            The page you&apos;re looking for isn&apos;t here, or it may have
            moved.
          </p>
          <Link
            href="/"
            className={buttonVariants({
              variant: "default",
              size: "default",
            })}
          >
            Home
          </Link>
        </CardContent>
      </Card>
    </main>
  );
}
