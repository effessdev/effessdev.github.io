import { Star } from "lucide-react";
import { Badge, card } from "@/components/ui";
import { cn } from "@/lib/utils";
import type { Repo } from "@/lib/content";

/**
 * A single repository tile. Cards are equal-height and flow into a responsive
 * grid (see page.tsx): one column on phones, two from `sm` up.
 */
export function RepoCard({ repo }: { repo: Repo }) {
  return (
    <a
      href={repo.url}
      target={repo.url.startsWith("http") ? "_blank" : undefined}
      rel="noreferrer"
      className={cn(
        card,
        "group flex min-w-0 flex-col gap-2 p-5 transition-colors hover:border-primary/50 hover:bg-muted/40",
      )}
    >
      <div className="flex items-center justify-between gap-3">
        <h3 className="truncate font-semibold text-foreground transition-colors group-hover:text-primary">
          {repo.label}
        </h3>
        {typeof repo.stars === "number" && repo.stars > 0 && (
          <span className="inline-flex shrink-0 items-center gap-1 text-xs text-muted-foreground">
            <Star className="size-3.5" aria-hidden />
            {repo.stars}
          </span>
        )}
      </div>

      {repo.description && (
        <p className="line-clamp-4 text-sm leading-relaxed text-muted-foreground">
          {repo.description}
        </p>
      )}

      {repo.note && (
        <p className="text-xs font-medium text-destructive">{repo.note}</p>
      )}

      {repo.language && (
        <div className="mt-auto flex items-center gap-2 pt-2">
          <Badge>{repo.language}</Badge>
        </div>
      )}
    </a>
  );
}
