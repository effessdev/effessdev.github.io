import { getAllPosts } from "@/lib/posts";
import { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "All Posts | EffessDev",
  description:
    "Read all my blog posts about web development, IoT, game development, and more.",
};

export default function ReadPage() {
  const posts = getAllPosts();

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
            <h1>All Posts</h1>
            <p className="lead">
              {posts.length} post{posts.length !== 1 ? "s" : ""} available
            </p>
          </div>
        </header>
      </div>

      <main>
        {posts.length === 0 ? (
          <div className="card">
            <p>No posts yet. Check back soon!</p>
          </div>
        ) : (
          <div className="grid">
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
                <div className="card" key={post.uuid}>
                  <h3>{post.title}</h3>
                  <p>{post.description}</p>
                  <div
                    style={{
                      display: "flex",
                      gap: "1rem",
                      flexWrap: "wrap",
                      marginBottom: "1rem",
                      color: "var(--text-color-muted)",
                      fontSize: "0.9rem",
                    }}
                  >
                    <span>
                      <i className="fas fa-calendar-alt"></i> {formattedDate}
                    </span>
                    {post.tags.length > 0 && (
                      <span>
                        <i className="fas fa-tags"></i> {post.tags.join(", ")}
                      </span>
                    )}
                  </div>
                  <div className="card-links">
                    <Link href={`/${post.uuid}`} className="btn">
                      <i className="fas fa-book-open"></i> Read Post
                    </Link>
                  </div>
                </div>
              );
            })}
          </div>
        )}

        <div style={{ marginTop: "2rem", textAlign: "center" }}>
          <Link href="/" className="btn">
            <i className="fas fa-home"></i> Back to Home
          </Link>
        </div>
      </main>

      <div className="footer-container">
        <footer>
          <div className="footer-inner">
            <p className="lead">Thanks for visiting. See you again soon!</p>
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
