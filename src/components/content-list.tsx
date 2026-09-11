import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { buttonVariants } from "@/components/ui/button";
import { actionLabelForType } from "@/lib/labels";

export type ContentListEntry = {
  id: string;
  title: string;
  description?: string;
  href: string;
  updated?: string;
  tags?: string[];
  typeLabel?: string;
};

export default function ContentList({
  heading,
  description,
  items,
}: {
  heading: string;
  description?: string;
  items: ContentListEntry[];
}) {
  return (
    <section className="space-y-6">
      <div className="space-y-2">
        <h2 className="text-4xl font-semibold tracking-tight text-foreground">
          {heading}
        </h2>
        {description && (
          <p className="text-base text-muted-foreground">{description}</p>
        )}
      </div>

      {items.length === 0 ? (
        <p className="text-muted-foreground">
          Nothing here yet. Please check back soon.
        </p>
      ) : (
        items.map((item) => {
          const formattedDate = item.updated
            ? new Date(item.updated).toLocaleDateString("en-US", {
                year: "numeric",
                month: "long",
                day: "numeric",
              })
            : null;

          return (
            <article
              key={item.id}
              className="rounded-2xl border border-border bg-card p-5"
            >
              <div className="flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
                <div className="space-y-3">
                  <h3 className="text-2xl font-semibold tracking-tight text-foreground">
                    {item.title}
                  </h3>

                  {item.description && (
                    <p className="text-muted-foreground">{item.description}</p>
                  )}
                </div>

                <Link
                  href={item.href}
                  className={buttonVariants({
                    variant: "default",
                    size: "sm",
                  })}
                >
                  {actionLabelForType(item.typeLabel)}
                </Link>
              </div>

              {(item.tags ?? []).length > 0 && (
                <div className="mt-4 flex flex-wrap gap-3 text-sm text-muted-foreground">
                  {formattedDate && (
                    <Badge variant="outline">Updated on {formattedDate}</Badge>
                  )}
                  {(item.tags ?? []).map((tag, index) => (
                    <Badge
                      variant="secondary"
                      key={`${item.id}-${tag}-${index}`}
                    >
                      {tag}
                    </Badge>
                  ))}
                </div>
              )}
            </article>
          );
        })
      )}
    </section>
  );
}
