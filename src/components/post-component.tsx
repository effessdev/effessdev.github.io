import Link from "next/link";
import { btn, MetaBadges } from "@/components/ui";
import { repoUrl } from "@/lib/brand";
import { Post } from "@/lib/types";
import { Markdown } from "@/lib/markdown";
import { ArrowRight } from "lucide-react";

export default function PostComponent({ post }: { post: Post }) {
  return (
    <div>
      <article>
        <h1 className="border-b pb-2 text-3xl font-bold md:text-5xl">
          {post.title}
        </h1>
        <div className="my-10 mt-4">
          <MetaBadges {...post} />
        </div>
        <Markdown content={post.content} />
      </article>

      <div className="pt-6 text-center">
        <hr className="border-border" />
        <div className="my-12 flex items-center justify-between gap-4">
          <p className="text-sm text-left text-muted-foreground">
            Found an issue? Open an{" "}
            <a
              href={`${repoUrl}/issues`}
              className="underline underline-offset-2"
            >
              issue
            </a>{" "}
            or submit a{" "}
            <a
              href={`${repoUrl}/pulls`}
              className="underline underline-offset-2"
            >
              pull request
            </a>{" "}
            on GitHub
          </p>
          <Link
            href="/#tutorials"
            className={`${btn({ variant: "outline" })} shrink-0`}
          >
            Read more <ArrowRight />
          </Link>
        </div>
      </div>
    </div>
  );
}
