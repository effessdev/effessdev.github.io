import Link from "next/link";
import { buttonVariants } from "@/components/ui/button";
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
    <div className="flex flex-wrap mb-6 items-center gap-3">
      <Link
        href={backHref}
        className={buttonVariants({ variant: "outline", size: "default" })}
      >
        <ArrowLeft className="h-4 w-4" />
        {backLabel}
      </Link>
      {extraLinks?.map(({ label, href }) => (
        <Link
          key={href}
          href={href}
          className={buttonVariants({ variant: "outline", size: "default" })}
        >
          {label}
        </Link>
      ))}
    </div>
  );
}
