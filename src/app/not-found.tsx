import Link from "next/link";

export default function NotFound() {
  return (
    <>
      <div className="gradient">
        <header>
          <div className="header-inner">
            <h1>404 - Post Not Found</h1>
            <p className="lead">
              Oops! The post you're looking for doesn't exist or has been moved.
            </p>
            <div className="social-links header-social">
              <Link href="/" className="btn">
                <i className="fas fa-home"></i> Back to Home
              </Link>
              <Link href="/read" className="btn">
                <i className="fas fa-book"></i> View All Posts
              </Link>
            </div>
          </div>
        </header>
      </div>
    </>
  );
}
