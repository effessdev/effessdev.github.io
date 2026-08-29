import Link from "next/link";
import { Metadata } from "next";
import { notFound } from "next/navigation";
import { buttonVariants } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Markdown } from "@/lib/markdown";
import { getAllPostIds, getPostById } from "@/lib/posts";
import { Badge } from "@/components/ui/badge";

interface PostPageProps {
  params: Promise<{
    id: string;
  }>;
}

export async function generateStaticParams() {
  const ids = getAllPostIds();
  return ids.map((id) => ({
    id,
  }));
}

export async function generateMetadata({
  params,
}: PostPageProps): Promise<Metadata> {
  const { id } = await params;
  const post = getPostById(id);

  if (!post) {
    return {
      title: "Post Not Found",
    };
  }

  return {
    title: `${post.title} | EffessDev`,
    description: post.description,
    keywords: post.tags.join(", "),
    openGraph: {
      title: post.title,
      description: post.description,
      type: "article",
      publishedTime: post.updated,
      tags: post.tags,
    },
    twitter: {
      card: "summary_large_image",
      title: post.title,
      description: post.description,
    },
  };
}

export default async function PostPage({ params }: PostPageProps) {
  const { id } = await params;
  const post = getPostById(id);

  if (!post) {
    notFound();
  }

  const formattedDate = new Date(post.updated).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  return (
    <main className="space-y-8">
      <div className="flex flex-wrap items-center gap-3">
        <Link
          href="/posts"
          className={buttonVariants({ variant: "outline", size: "default" })}
        >
          ← All posts
        </Link>
        <Link
          href="/"
          className={buttonVariants({ variant: "secondary", size: "default" })}
        >
          Home
        </Link>
      </div>

      <article className="rounded-2xl sm:border bg-background sm:bg-card p-0 sm:p-5 md:p-8">
        <h1 className="text-6xl font-bold border-b pb-2">{post.title}</h1>
        <div className="flex flex-wrap gap-4 mt-4 my-10 text-sm text-muted-foreground">
          <Badge variant="outline">Updated on {post.updated}</Badge>
          {post.tags?.map((tag, index) => (
            <Badge variant="secondary" key={index}>
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
