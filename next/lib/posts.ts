import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { Post } from "./types";

const postsDirectory = path.join(process.cwd(), "posts");

export function getAllPosts(): Post[] {
  // Get all markdown files from the posts directory
  const files = fs.readdirSync(postsDirectory);

  const posts = files
    .filter((file) => file.endsWith(".md"))
    .map((file) => {
      const filePath = path.join(postsDirectory, file);
      const fileContents = fs.readFileSync(filePath, "utf8");
      const { data, content } = matter(fileContents);

      return {
        uuid: data.uuid,
        title: data.title,
        description: data.description,
        updated: data.updated,
        tags: data.tags || [],
        content: content,
      } as Post;
    });

  // Sort by updated date (newest first)
  return posts.sort((a, b) => {
    if (a.updated < b.updated) return 1;
    if (a.updated > b.updated) return -1;
    return 0;
  });
}

export function getPostByUuid(uuid: string): Post | null {
  const posts = getAllPosts();
  const post = posts.find((p) => p.uuid === uuid);
  return post || null;
}

export function getAllUuids(): string[] {
  const posts = getAllPosts();
  return posts.map((post) => post.uuid);
}
