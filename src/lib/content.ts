import { getAllPosts } from "@/lib/posts";
import type { ContentListEntry } from "@/components/content-list";

/** Every publicly readable entry on the site, newest first. */
export function getContentListings(): ContentListEntry[] {
  return getAllPosts().map((post) => ({
    id: post.id,
    title: post.title,
    description: post.description,
    href: `/read/${post.id}`,
    updated: post.updated,
    tags: post.tags,
    destructiveTags: post.destructiveTags,
  }));
}
