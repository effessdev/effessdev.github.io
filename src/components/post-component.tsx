import { MetaBadges } from "@/components/ui";
import { repoUrl } from "@/lib/brand";
import { Post } from "@/lib/types";
import { Markdown } from "@/lib/markdown";

export default function PostComponent({ post }: { post: Post }) {
  return (
    <div className="space-y-8">
      <article>
        <h1 className="border-b pb-2 text-3xl font-bold md:text-5xl">
          {post.title}
        </h1>
        <div className="my-10 mt-4">
          <MetaBadges {...post} />
        </div>
        <Markdown content={post.content} />
      </article>

      <p className="w-full text-center text-sm text-muted-foreground">
        Found an issue? Open an{" "}
        <a href={`${repoUrl}/issues`} className="underline underline-offset-2">
          issue
        </a>{" "}
        or submit a{" "}
        <a href={`${repoUrl}/pulls`} className="underline underline-offset-2">
          pull request
        </a>{" "}
        on GitHub
      </p>
    </div>
  );
}
