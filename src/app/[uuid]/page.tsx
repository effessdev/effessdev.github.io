import { ActionLink } from "@/components/ui/action-link";
import { PageHeader } from "@/components/page-header";
import { SiteFooter } from "@/components/site-footer";
import { Markdown } from "@/lib/markdown";
import { getAllUuids, getPostByUuid } from "@/lib/posts";
import { Metadata } from "next";
import { notFound } from "next/navigation";

interface PostPageProps {
  params: Promise<{
    uuid: string;
  }>;
}

export async function generateStaticParams() {
  const uuids = getAllUuids();
  return uuids.map((uuid) => ({
    uuid: uuid,
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
    <>
      <PageHeader>
        <div className="mb-6">
          <ActionLink href="/">
            <i className="fas fa-arrow-left" aria-hidden="true"></i> Back to
            Home
          </ActionLink>
        </div>
        <h1 className="mb-4 text-[clamp(2.5rem,8vw,4rem)] font-bold leading-[1.1] tracking-[-0.05em] text-[var(--text-color)]">
          {post.title}
        </h1>
        <div className="mb-4 flex flex-wrap gap-4 text-sm text-[var(--text-color-muted)]">
          <span>
            <i className="fas fa-calendar-alt" aria-hidden="true"></i> Updated:{" "}
            {formattedDate}
          </span>
          {post.tags.length > 0 && (
            <span>
              <i className="fas fa-tags" aria-hidden="true"></i>{" "}
              {post.tags.join(", ")}
            </span>
          )}
        </div>
        <p className="text-[clamp(1.15rem,3vw,1.5rem)] text-[var(--text-color-muted)]">
          {post.description}
        </p>
      </PageHeader>

      <main className="mx-auto max-w-6xl px-4 py-10 sm:px-6 lg:px-8">
        <article className="rounded-[var(--card-radius)] border border-[var(--card-border)] bg-[var(--surface-color)] p-6 shadow-[0_6px_20px_rgba(2,6,23,0.04)] sm:p-8">
          <Markdown content={post.content} />
        </article>

        <div className="mt-8 flex flex-wrap justify-center gap-4 text-center">
          <ActionLink href="/read">
            <i className="fas fa-book" aria-hidden="true"></i> View All Posts
          </ActionLink>
          <ActionLink href="/">
            <i className="fas fa-home" aria-hidden="true"></i> Home
          </ActionLink>
        </div>
      </main>

      <SiteFooter text="Thanks for reading!" />
    </>
  );
}
