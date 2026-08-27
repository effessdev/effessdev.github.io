import Link from "next/link";
import type { Metadata } from "next";
import { buttonVariants } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { getAllPosts } from "@/lib/posts";

export const metadata: Metadata = {
  title: "All Posts | EffessDev",
  description:
    "Read all my blog posts about web development, IoT, game development, and more.",
};

export default function ReadPage() {
  const posts = getAllPosts();

  return (
    <main className="space-y-6 py-0 ">
      <div className="flex flex-wrap items-center gap-3">
        <Link
          href="/"
          className={buttonVariants({ variant: "outline", size: "default" })}
        >
          ← Home
        </Link>
      </div>

      <h1 className="text-4xl font-bold tracking-tight">All posts</h1>
      <p className="text-base text-muted-foreground">
        {posts.length} post{posts.length === 1 ? "" : "s"} available
      </p>

      {posts.length === 0 ? (
        <p className="text-muted-foreground">No posts yet. Check back soon.</p>
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
              key={post.uuid}
              className="rounded-2xl border border-border bg-background p-5"
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
                  href={`/${post.uuid}`}
                  className={buttonVariants({
                    variant: "default",
                    size: "sm",
                  })}
                >
                  Read
                </Link>
              </div>

              <div className="mt-4 flex flex-wrap gap-3 text-sm text-muted-foreground">
                <span>{formattedDate}</span>
                {post.tags.length > 0 && <span>• {post.tags.join(", ")}</span>}
              </div>
            </article>
          );
        })
      )}
    </main>
  );
}
