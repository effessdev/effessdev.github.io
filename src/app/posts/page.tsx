import type { Metadata } from "next";
import { getAllPosts } from "@/lib/posts";
import PostList from "@/components/post-list";
import TopNav from "@/components/layout/top-nav";

export const metadata: Metadata = {
  title: "All Posts | EffessDev",
  description:
    "Read all my blog posts about web development, IoT, game development, and more.",
};

export default function ReadPage() {
  const posts = getAllPosts();

  return (
    <>
      <TopNav backLabel="Home" backHref="/" />
      <PostList heading="All Posts" posts={posts} />
    </>
  );
}
