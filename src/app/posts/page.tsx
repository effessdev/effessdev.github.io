import type { Metadata } from "next";
import { getPostById } from "@/lib/posts";
import PostList from "@/components/post-list";
import { Post } from "@/lib/types";
import TopNav from "@/components/layout/top-nav";

export type Category = {
  name: string;
  description?: string;
  content: string[];
};

export const postCategories: Category[] = [
  {
    name: "Featured posts",
    description: "",
    content: ["ble-basics-in-esp-idf", "esp-idf-vscode-setup-guide"],
  },
  {
    name: "Other posts",
    description: "",
    content: ["multi-file-c-programs"],
  },
];

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
  return (
    <>
      <TopNav backLabel="Home" backHref="/" />
      <main className="space-y-8">
        {postCategories.map((cat) => {
          const posts: Post[] = cat.content
            .map((id) => getPostById(id))
            .filter((p): p is Post => p !== null);

          return (
            <section key={cat.name}>
              <PostList
                heading={cat.name}
                description={cat.description}
                posts={posts}
              />
            </section>
          );
        })}
      </main>
    </>
  );
}
