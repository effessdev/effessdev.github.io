import { Badge } from "@/components/ui/badge";
import { Post } from "@/lib/types";
import { Markdown } from "@/lib/markdown";

export default function PostComponent({ post }: { post: Post }) {
  return (
    <main className="space-y-8">
      <article className="rounded-2xl sm:border bg-background sm:bg-card p-0 sm:p-5 md:p-8">
        <h1 className="text-5xl font-bold border-b pb-2">{post.title}</h1>
        <div className="flex flex-wrap gap-4 mt-4 my-10 text-sm text-muted-foreground">
          <Badge variant="outline">Updated on {post.updated}</Badge>
          {(post.tags ?? []).map((tag, index) => (
            <Badge variant="secondary" key={`${post.id}-${tag}-${index}`}>
              {tag}
            </Badge>
          ))}
          {post.draft && <Badge variant="destructive">Draft</Badge>}
        </div>
        <Markdown content={post.content} />
      </article>

      <p className="text-sm text-muted-foreground w-full text-center">
        Found an issue? Open an{" "}
        <a
          href="https://github.com/effessdev/effessdev.github.io/issues"
          className="underline underline-offset-2"
        >
          issue
        </a>{" "}
        or submit a{" "}
        <a
          href="https://github.com/effessdev/effessdev.github.io/pulls"
          className="underline underline-offset-2"
        >
          pull request
        </a>{" "}
        on GitHub
      </p>
    </main>
  );
}
