import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { buttonVariants } from "@/components/ui/button";
import { actionLabelForType } from "@/lib/labels";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardAction,
  CardContent,
} from "@/components/ui/card";

export type ContentListEntry = {
  id: string;
  title: string;
  description?: string;
  href: string;
  updated?: string;
  tags?: string[];
  draft?: boolean;
  aiGenerated?: boolean;
  typeLabel?: string;
};

export default function ContentList({
  heading,
  description,
  items,
  id,
}: {
  heading: string;
  description?: string;
  items: ContentListEntry[];
  id?: string;
}) {
  return (
    <section id={id} className="space-y-6">
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
            <Card key={item.id}>
              <CardHeader className="flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
                <div className="space-y-3">
                  <CardTitle className="text-2xl font-semibold tracking-tight text-foreground">
                    {item.title}
                  </CardTitle>

                  {item.description && (
                    <CardDescription className="text-muted-foreground">
                      {item.description}
                    </CardDescription>
                  )}
                </div>

                <CardAction>
                  <Link
                    href={item.href}
                    className={buttonVariants({
                      variant: "default",
                      size: "sm",
                    })}
                  >
                    {actionLabelForType(item.typeLabel)}
                  </Link>
                </CardAction>
              </CardHeader>

              {(item.tags ?? []).length > 0 ||
              item.draft ||
              item.aiGenerated ? (
                <CardContent>
                  <div className="flex flex-wrap gap-2">
                    {formattedDate && (
                      <Badge variant="outline">
                        Updated on {formattedDate}
                      </Badge>
                    )}
                    {(item.tags ?? []).map((tag, index) => (
                      <Badge
                        variant="outline"
                        key={`${item.id}-${tag}-${index}`}
                      >
                        {tag}
                      </Badge>
                    ))}
                    {item.draft && <Badge variant="destructive">Draft</Badge>}
                    {item.aiGenerated && (
                      <Badge variant="destructive">AI-generated</Badge>
                    )}
                  </div>
                </CardContent>
              ) : null}
            </Card>
          );
        })
      )}
    </section>
  );
}
