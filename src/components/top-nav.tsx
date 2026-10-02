import Link from "next/link";
import { btn } from "@/components/ui";
import { ArrowLeft, ArrowRight } from "lucide-react";

export default function TopNav({
  backHref,
  backLabel,
  extraLinks,
  prevHref,
  nextHref,
}: {
  backHref: string;
  backLabel: string;
  extraLinks?: { label: string; href: string }[];
  prevHref?: string;
  nextHref?: string;
}) {
  const showChapterNav = prevHref !== undefined || nextHref !== undefined;

  return (
    <div>
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
        {showChapterNav && (
          <div className="ml-auto flex items-center gap-2">
            {prevHref ? (
              <Link
                href={prevHref}
                aria-label="Previous chapter"
                className={btn({ variant: "outline", size: "icon" })}
              >
                <ArrowLeft />
              </Link>
            ) : (
              <button
                disabled
                aria-label="No previous chapter"
                className={btn({ variant: "outline", size: "icon" })}
              >
                <ArrowLeft />
              </button>
            )}
            {nextHref ? (
              <Link
                href={nextHref}
                aria-label="Next chapter"
                className={btn({ variant: "outline", size: "icon" })}
              >
                <ArrowRight />
              </Link>
            ) : (
              <button
                disabled
                aria-label="No next chapter"
                className={btn({ variant: "outline", size: "icon" })}
              >
                <ArrowRight />
              </button>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
