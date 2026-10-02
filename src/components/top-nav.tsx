import Link from "next/link";
import { btn } from "@/components/ui";
import { ArrowLeft } from "lucide-react";

export default function TopNav({
  backHref,
  backLabel,
}: {
  backHref: string;
  backLabel: string;
}) {
  return (
    <div className="mb-6 flex flex-wrap items-center gap-3">
      <Link href={backHref} className={btn({ variant: "outline" })}>
        <ArrowLeft />
        {backLabel}
      </Link>
    </div>
  );
}
