import type { Metadata } from "next";
import { getFeaturedPosts, getOtherPosts } from "@/lib/posts";
import PostList from "@/components/post-list";
import TopNav from "@/components/layout/top-nav";

export const metadata: Metadata = {
  title: "Posts | EffessDev",
  description: "Read my posts on various topics.",
  openGraph: {
    title: "Posts | EffessDev",
    description: "Read my posts on various topics.",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Posts | EffessDev",
    description: "Read my posts on various topics.",
  },
};

export default function ReadPage() {
  const featuredPosts = getFeaturedPosts();
  const otherPosts = getOtherPosts();

  return (
    <>
      <TopNav backLabel="Home" backHref="/" />
      <main className="space-y-8">
        <section>
          <PostList heading="Featured Posts" posts={featuredPosts} />
        </section>

        <section>
          <PostList heading="Other Posts" posts={otherPosts} />
        </section>
      </main>
    </>
  );
}
