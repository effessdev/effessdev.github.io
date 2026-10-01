import type { Metadata } from "next";
import Link from "next/link";
import ReadRedirect from "./read-redirect";
import { brand } from "@/lib/brand";

export const metadata: Metadata = {
  title: "Tutorials",
  description: brand.description,
  robots: "noindex",
};

export default function ReadPage() {
  return (
    <>
      <ReadRedirect />
      <p className="py-12 text-center text-muted-foreground">
        Taking you to the{" "}
        <Link href="/" className="underline">
          tutorials
        </Link>
        &hellip;
      </p>
    </>
  );
}
