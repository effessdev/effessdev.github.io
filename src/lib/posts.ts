import fs from "fs";
import path from "path";
import matter from "gray-matter";
import type { z } from "zod";
import { FrontmatterSchema, Post } from "./types";

const readDirectory = path.join(process.cwd(), "read");

/** The result of reading one `.md` file: either a renderable post, or what's wrong with its frontmatter. */
export type ParsedMarkdown =
  | { status: "ok"; post: Post }
  | { status: "error"; error: string };

export function sortPostsByUpdatedDesc(a: Post, b: Post): number {
  if (a.updated < b.updated) return 1;
  if (a.updated > b.updated) return -1;
  return 0;
}

function formatIssues(error: z.ZodError): string {
  return error.issues
    .map((issue) => {
      const field =
        issue.path.length > 0
          ? `frontmatter field "${issue.path.join(".")}"`
          : "frontmatter";
      return `${field}: ${issue.message}`;
    })
    .join("; ");
}

export function parseMarkdownFile(filePath: string): ParsedMarkdown {
  const fileContents = fs.readFileSync(filePath, "utf8");
  const { data, content } = matter(fileContents);

  const result = FrontmatterSchema.safeParse(data);
  if (!result.success) {
    return { status: "error", error: formatIssues(result.error) };
  }

  return {
    status: "ok",
    post: { ...result.data, content, id: path.basename(filePath, ".md") },
  };
}

/** Basenames (without `.md`) of every markdown file in a directory, valid or not. */
export function getMarkdownFileIds(dirPath: string): string[] {
  return fs
    .readdirSync(dirPath)
    .filter(
      (entry) =>
        entry.endsWith(".md") &&
        !fs.statSync(path.join(dirPath, entry)).isDirectory(),
    )
    .map((entry) => entry.slice(0, -".md".length));
}

export function getPostsFromDirectory(
  dirPath: string,
  options?: {
    sortBy?: "updated-desc" | "filename";
  },
): Post[] {
  const posts: Post[] = [];

  for (const id of getMarkdownFileIds(dirPath)) {
    const result = parseMarkdownFile(path.join(dirPath, `${id}.md`));
    if (result.status === "ok") {
      posts.push(result.post);
    } else {
      console.warn(`Skipping post "${id}": ${result.error}`);
    }
  }

  if (options?.sortBy === "filename") return posts;

  return posts.sort(sortPostsByUpdatedDesc);
}

export function getAllPosts(): Post[] {
  return getPostsFromDirectory(readDirectory, { sortBy: "updated-desc" });
}

/** Parse one `.md` file by id, whether or not its frontmatter is valid. Null if the file doesn't exist. */
export function getMarkdownById(
  dirPath: string,
  id: string,
): ParsedMarkdown | null {
  const filePath = path.join(dirPath, `${id}.md`);
  if (!fs.existsSync(filePath)) return null;
  return parseMarkdownFile(filePath);
}

export function getPostById(id: string): ParsedMarkdown | null {
  return getMarkdownById(readDirectory, id);
}

export function getAllPostIds(): string[] {
  return getMarkdownFileIds(readDirectory);
}
