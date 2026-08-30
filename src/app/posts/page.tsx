import type { Metadata } from "next";
import { getAllPosts } from "@/lib/posts";
import PostList from "@/components/post-list";
import TopNav from "@/components/layout/top-nav";

export const metadata: Metadata = {
  title: "Posts | EffessDev",
  description: "Read my posts on various topics.",
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
