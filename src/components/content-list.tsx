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
  typeLabel?: string;
};

/** The one list used everywhere: home page sections and course chapter lists. */
export default function ContentList({
  heading,
  description,
  items,
  id,
  headingLevel = 2,
}: {
  heading: string;
  description?: string;
  items: ContentListEntry[];
  id?: string;
  headingLevel?: 1 | 2;
}) {
  const Heading = headingLevel === 1 ? "h1" : "h2";

  return (
    <section id={id} className="space-y-6">
      <div className="space-y-2">
        <Heading className="text-4xl font-bold tracking-tight">
          {heading}
        </Heading>
        {description && (
          <p className="text-base text-muted-foreground">{description}</p>
        )}
      </div>

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
                {item.typeLabel === "Course" ? "View Chapters" : "Read"}
              </Link>
            </div>
            <MetaBadges {...item} />
          </article>
        ))
      )}
    </section>
  );
}
