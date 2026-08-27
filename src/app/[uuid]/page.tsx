import { getAllUuids, getPostByUuid } from "@/lib/posts";
import { Markdown } from "@/lib/markdown";
import { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";

interface PostPageProps {
  params: Promise<{
    uuid: string;
  }>;
}

// Generate static paths for all posts at build time
export async function generateStaticParams() {
  const uuids = getAllUuids();
  return uuids.map((uuid) => ({
    uuid: uuid,
  }));
}

// Generate metadata for each post
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

  // If post doesn't exist, show 404
  if (!post) {
    notFound();
  }

  // Format the date
  const formattedDate = new Date(post.updated).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  return (
    <>
      <div className="gradient">
        <header>
          <div className="header-inner">
            <div style={{ marginBottom: "1.5rem" }}>
              <Link href="/" className="btn" style={{ display: "inline-flex" }}>
                <i className="fas fa-arrow-left"></i> Back to Home
              </Link>
            </div>
            <h1>{post.title}</h1>
            <div
              style={{
                display: "flex",
                gap: "1rem",
                flexWrap: "wrap",
                marginBottom: "1rem",
                color: "var(--text-color-muted)",
                fontSize: "0.95rem",
              }}
            >
              <span>
                <i className="fas fa-calendar-alt"></i> Updated: {formattedDate}
              </span>
              {post.tags.length > 0 && (
                <span>
                  <i className="fas fa-tags"></i> {post.tags.join(", ")}
                </span>
              )}
            </div>
            <p className="lead">{post.description}</p>
          </div>
        </header>
      </div>

      <main>
        <div className="card" style={{ maxWidth: "100%" }}>
          <Markdown content={post.content} />
        </div>

        <div style={{ marginTop: "2rem", textAlign: "center" }}>
          <Link href="/read" className="btn">
            <i className="fas fa-book"></i> View All Posts
          </Link>
          <Link href="/" className="btn" style={{ marginLeft: "1rem" }}>
            <i className="fas fa-home"></i> Home
          </Link>
        </div>
      </main>

      <div className="footer-container">
        <footer>
          <div className="footer-inner">
            <p className="lead">Thanks for reading!</p>
            <div className="social-links footer-social">
              <a href="https://github.com/effessdev/" aria-label="GitHub">
                <i className="fab fa-github"></i>
              </a>
              <a href="https://effessdev.itch.io/" aria-label="itch.io">
                <i className="fab fa-itch-io"></i>
              </a>
              <a
                href="https://www.linkedin.com/in/effessdev/"
                aria-label="LinkedIn"
              >
                <i className="fab fa-linkedin"></i>
              </a>
            </div>
          </div>
        </footer>
      </div>
    </>
  );
}
