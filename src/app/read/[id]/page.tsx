import { Metadata } from "next";
import { notFound } from "next/navigation";
import { getAllPostIds, getPostById } from "@/lib/posts";
import PostComponent from "@/components/post-component";
import TopNav from "@/components/top-nav";
import { FrontmatterError } from "@/components/ui";

interface ReadEntryPageProps {
  params: Promise<{
    id: string;
  }>;
}

export async function generateStaticParams() {
  return getAllPostIds().map((id) => ({ id }));
}

export async function generateMetadata({
  params,
}: ReadEntryPageProps): Promise<Metadata> {
  const { id } = await params;
  const entry = getPostById(id);

  if (!entry) {
    return {
      title: "Content Not Found",
    };
  }

  if (entry.status === "error") {
    return {
      title: "Content Not Available",
      robots: "noindex",
    };
  }

  const post = entry.post;
  return {
    title: post.title,
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

export default async function ReadEntryPage({ params }: ReadEntryPageProps) {
  const { id } = await params;
  const entry = getPostById(id);

  if (!entry) notFound();

  if (entry.status === "error") {
    return (
      <>
        <TopNav backHref="/" backLabel="Tutorials" />

        <FrontmatterError file={`read/${id}.md`} message={entry.error} />
      </>
    );
  }

  return (
    <>
      <TopNav backHref="/" backLabel="Tutorials" />

      <PostComponent post={entry.post} />
    </>
  );
}
