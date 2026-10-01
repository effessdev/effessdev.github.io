import Link from "next/link";
import { btn } from "@/components/ui";
import { ArrowLeft } from "lucide-react";

export default function TopNav({
  backHref,
  backLabel,
  extraLinks,
}: {
  backHref: string;
  backLabel: string;
  extraLinks?: { label: string; href: string }[];
}) {
  return (
    <div className="mb-6 flex flex-wrap items-center gap-3">
      <Link href={backHref} className={btn({ variant: "outline" })}>
        <ArrowLeft />
        {backLabel}
      </Link>
      {extraLinks?.map(({ label, href }) => (
        <Link key={href} href={href} className={btn({ variant: "outline" })}>
          {label}
        </Link>
      ))}
    </div>
  );
}
