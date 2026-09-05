import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { Post, PostSchema } from "./types";

const postsDirectory = path.join(process.cwd(), "posts");

function sortPostsByUpdatedDesc(a: Post, b: Post): number {
  if (a.updated < b.updated) return 1;
  if (a.updated > b.updated) return -1;
  return 0;
}

export function getAllPosts(): Post[] {
  const files = fs.readdirSync(postsDirectory);

  const posts = files
    .filter((file) => file.endsWith(".md"))
    .map((file) => {
      const filePath = path.join(postsDirectory, file);
      const fileContents = fs.readFileSync(filePath, "utf8");
      const { data, content } = matter(fileContents);

      return {
        ...PostSchema.parse({
          title: data.title,
          description: data.description,
          updated: data.updated,
          draft: data.draft === true,
          featured: data.featured === true,
          tags: data.tags ?? [],
          content,
        }),
        id: path.basename(file, ".md"),
      } satisfies Post;
    })
    .filter((post) => !post.draft)
    .sort(sortPostsByUpdatedDesc);

  return posts;
}

export function getFeaturedPosts(): Post[] {
  return getAllPosts().filter((post) => post.featured);
}

export function getOtherPosts(): Post[] {
  return getAllPosts().filter((post) => !post.featured);
}

export function getPostById(id: string): Post | null {
  const posts = getAllPosts();
  const post = posts.find((p) => p.id === id);
  return post || null;
}

export function getAllPostIds(): string[] {
  const posts = getAllPosts();
  return posts.map((post) => post.id);
}
