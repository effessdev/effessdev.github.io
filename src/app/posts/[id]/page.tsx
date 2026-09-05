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
import TopNav from "@/components/layout/top-nav";
import PostComponent from "@/components/post-component";

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
    description: post.description ?? "",
    keywords: (post.tags ?? []).join(", "),
    openGraph: {
      title: post.title,
      description: post.description ?? "",
      type: "article",
      publishedTime: post.updated,
      tags: post.tags ?? [],
    },
    twitter: {
      card: "summary_large_image",
      title: post.title,
      description: post.description ?? "",
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
    <>
      <TopNav
        backHref="/posts"
        backLabel="All posts"
        extraLinks={[{ label: "Home", href: "/" }]}
      />

      <PostComponent post={post} />
    </>
  );
}
