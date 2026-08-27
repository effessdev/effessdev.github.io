import { ActionLink } from "@/components/ui/action-link";
import { PageHeader } from "@/components/page-header";
import { SiteFooter } from "@/components/site-footer";
import { getAllPosts } from "@/lib/posts";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "All Posts | EffessDev",
  description:
    "Read all my blog posts about web development, IoT, game development, and more.",
};

export default function ReadPage() {
  const posts = getAllPosts();

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
          All Posts
        </h1>
        <p className="text-[clamp(1.15rem,3vw,1.5rem)] text-[var(--text-color-muted)]">
          {posts.length} post{posts.length !== 1 ? "s" : ""} available
        </p>
      </PageHeader>

      <main className="mx-auto max-w-6xl px-4 py-10 sm:px-6 lg:px-8">
        {posts.length === 0 ? (
          <article className="rounded-[var(--card-radius)] border border-[var(--card-border)] bg-[var(--surface-color)] p-6 shadow-[0_6px_20px_rgba(2,6,23,0.04)]">
            <p className="text-[var(--text-color-muted)]">
              No posts yet. Check back soon!
            </p>
          </article>
        ) : (
          <div className="grid gap-6 md:grid-cols-2">
            {posts.map((post) => {
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
                  className="flex h-full flex-col rounded-[var(--card-radius)] border border-[var(--card-border)] bg-[var(--surface-color)] p-6 shadow-[0_6px_20px_rgba(2,6,23,0.04)] sm:p-8"
                >
                  <h3 className="mb-4 text-[clamp(1.5rem,4vw,2rem)] font-semibold tracking-[-0.02em] text-[var(--text-color)]">
                    {post.title}
                  </h3>
                  <p className="mb-4 text-[var(--text-color-muted)]">
                    {post.description}
                  </p>
                  <div className="mb-6 flex flex-wrap gap-4 text-sm text-[var(--text-color-muted)]">
                    <span>
                      <i className="fas fa-calendar-alt" aria-hidden="true"></i>{" "}
                      {formattedDate}
                    </span>
                    {post.tags.length > 0 && (
                      <span>
                        <i className="fas fa-tags" aria-hidden="true"></i>{" "}
                        {post.tags.join(", ")}
                      </span>
                    )}
                  </div>
                  <div className="mt-auto pt-2">
                    <ActionLink href={`/${post.uuid}`}>
                      <i className="fas fa-book-open" aria-hidden="true"></i>{" "}
                      Read Post
                    </ActionLink>
                  </div>
                </article>
              );
            })}
          </div>
        )}

        <div className="mt-8 text-center">
          <ActionLink href="/">
            <i className="fas fa-home" aria-hidden="true"></i> Back to Home
          </ActionLink>
        </div>
      </main>

      <SiteFooter />
    </>
  );
}
