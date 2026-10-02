import Link from "next/link";
import { btn, card, MetaBadges } from "@/components/ui";
import { cn } from "@/lib/utils";

export type ContentListEntry = {
  id: string;
  title: string;
  description?: string;
  href: string;
  updated?: string;
  tags?: string[];
  destructiveTags?: string[];
};

/** The one list used everywhere on the site. */
export default function ContentList({
  heading,
  items,
  id,
}: {
  heading: string;
  items: ContentListEntry[];
  id?: string;
}) {
  return (
    <section id={id} className="space-y-6">
      <h2 className="text-4xl font-bold tracking-tight">{heading}</h2>

      {items.length === 0 ? (
        <p className="text-muted-foreground">
          Nothing here yet. Please check back soon.
        </p>
      ) : (
        items.map((item) => (
          <article
            key={item.id}
            className={cn(card, "flex flex-col gap-4 p-5 md:p-6")}
          >
            <div className="flex flex-col gap-3 md:flex-row md:items-start md:justify-between">
              <div className="space-y-2">
                <h3 className="text-2xl font-semibold tracking-tight">
                  {item.title}
                </h3>
                {item.description && (
                  <p className="max-w-2xl text-sm text-muted-foreground">
                    {item.description}
                  </p>
                )}
              </div>
              <Link
                href={item.href}
                className={btn({ size: "sm" }, "shrink-0")}
              >
                Read
              </Link>
            </div>
            <MetaBadges {...item} />
          </article>
        ))
      )}
    </section>
  );
}
