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
import { getAllUuids, getPostByUuid } from "@/lib/posts";

interface PostPageProps {
  params: Promise<{
    uuid: string;
  }>;
}

export async function generateStaticParams() {
  const uuids = getAllUuids();
  return uuids.map((uuid) => ({
    uuid,
  }));
}

export async function generateMetadata({
  params,
}: PostPageProps): Promise<Metadata> {
  const { uuid } = await params;
  const post = getPostByUuid(uuid);

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
  const { uuid } = await params;
  const post = getPostByUuid(uuid);

  if (!post) {
    notFound();
  }

  const formattedDate = new Date(post.updated).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  return (
    <main className="space-y-8 py-8 md:py-12">
      <div className="flex flex-wrap items-center gap-3">
        <Link
          href="/read"
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

      <Card className="border-border/80 bg-card">
        <CardHeader className="gap-4">
          <CardTitle className="text-4xl font-bold tracking-tight md:text-5xl">
            {post.title}
          </CardTitle>
          <div className="flex flex-wrap gap-4 text-sm text-muted-foreground">
            <span>Updated {formattedDate}</span>
            {post.tags.length > 0 && <span>• {post.tags.join(", ")}</span>}
          </div>
          <CardDescription className="text-lg leading-8 text-muted-foreground">
            {post.description}
          </CardDescription>
        </CardHeader>
      </Card>

      <article className="rounded-2xl border border-border bg-card p-5 md:p-8">
        <Markdown content={post.content} />
      </article>
    </main>
  );
}
