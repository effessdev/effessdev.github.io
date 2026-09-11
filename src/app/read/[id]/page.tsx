import { Metadata } from "next";
import { notFound } from "next/navigation";
import { getAllPostIds, getPostById } from "@/lib/posts";
import PostComponent from "@/components/post-component";
import TopNav from "@/components/layout/top-nav";

interface PostPageProps {
  params: Promise<{
    id: string;
  }>;
}

export async function generateStaticParams() {
  const ids = getAllPostIds();
  return ids.map((id) => ({ id }));
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

  return (
    <>
      <TopNav
        backHref="/read"
        backLabel="All posts"
        extraLinks={[{ label: "Home", href: "/" }]}
      />

      <PostComponent post={post} />
    </>
  );
}
