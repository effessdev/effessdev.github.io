import { Post } from "@/lib/types";
import Link from "next/link";
import { buttonVariants } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

export default function PostList({
  heading,
  description,
  posts,
}: {
  heading: string;
  description?: string;
  posts: Post[];
}) {
  return (
    <main className="space-y-6 py-0">
      <h1 className="text-4xl font-bold tracking-tight">{heading}</h1>
      {description && (
        <p className="text-base text-muted-foreground">{description}</p>
      )}

      {posts.length === 0 ? (
        <p className="text-muted-foreground">
          Nothing here yet. Please check back soon.
        </p>
      ) : (
        posts.map((post) => {
          const formattedDate = new Date(post.updated).toLocaleDateString(
            "en-US",
            {
              year: "numeric",
              month: "long",
              day: "numeric",
            },
          );

          return (
            <article
              key={post.id}
              className="rounded-2xl bg-card border border-border p-5"
            >
              <div className="flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
                <div className="space-y-3">
                  <h2 className="text-2xl font-semibold tracking-tight text-foreground">
                    {post.title}
                  </h2>
                  <p className="max-w-2xl text-muted-foreground">
                    {post.description}
                  </p>
                </div>
                <Link
                  href={`${post.id}`}
                  className={buttonVariants({
                    variant: "default",
                    size: "sm",
                  })}
                >
                  Read
                </Link>
              </div>

              <div className="mt-4 flex flex-wrap gap-3 text-sm text-muted-foreground">
                <Badge variant="outline">Updated on {formattedDate}</Badge>
                {post.tags?.map((tag, index) => (
                  <Badge variant="secondary" key={index}>
                    {tag}
                  </Badge>
                ))}
                {post.draft && <Badge variant="destructive">Draft</Badge>}
              </div>
            </article>
          );
        })
      )}
    </main>
  );
}
