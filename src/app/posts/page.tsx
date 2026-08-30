import type { Metadata } from "next";
import { getAllPosts } from "@/lib/posts";
import PostList from "@/components/post-list";

export const metadata: Metadata = {
  title: "All Posts | EffessDev",
  description:
    "Read all my blog posts about web development, IoT, game development, and more.",
};

export default function ReadPage() {
  const posts = getAllPosts();

  return <PostList heading="All Posts" posts={posts} />;
}
