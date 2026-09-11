import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { Post, PostSchema } from "./types";

const readDirectory = path.join(process.cwd(), "read");

export function sortPostsByUpdatedDesc(a: Post, b: Post): number {
  if (a.updated < b.updated) return 1;
  if (a.updated > b.updated) return -1;
  return 0;
}

export function parseMarkdownPost(filePath: string): Post {
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
    id: path.basename(filePath, ".md"),
  } satisfies Post;
}

export function getPostsFromDirectory(
  dirPath: string,
  options?: {
    includeDrafts?: boolean;
    sortBy?: "updated-desc" | "filename";
  },
): Post[] {
  const files = fs
    .readdirSync(dirPath)
    .filter(
      (entry) =>
        entry.endsWith(".md") &&
        !fs.statSync(path.join(dirPath, entry)).isDirectory(),
    );

  const posts = files.map((file) =>
    parseMarkdownPost(path.join(dirPath, file)),
  );

  const filtered = options?.includeDrafts
    ? posts
    : posts.filter((post) => !post.draft);

  if (options?.sortBy === "filename") return filtered;

  return filtered.sort(sortPostsByUpdatedDesc);
}

export function getAllPosts(): Post[] {
  return getPostsFromDirectory(readDirectory, {
    includeDrafts: false,
    sortBy: "updated-desc",
  });
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
