import { getAllCoursesWithLatest } from "@/lib/courses";
import { getAllPosts } from "@/lib/posts";
import type { ContentListEntry } from "@/components/content-list";
import type { CourseMeta, Post } from "@/lib/types";

function toListing(
  source: Post | CourseMeta,
  typeLabel: "Post" | "Course",
  updated?: string,
): ContentListEntry {
  return {
    id: source.id,
    title: source.title,
    description: source.description,
    href: `/read/${source.id}`,
    updated,
    tags: source.tags,
    draft: source.draft,
    aiGenerated: source.aiGenerated,
    featured: source.featured,
    typeLabel,
  };
}

function byUpdatedDesc(a: ContentListEntry, b: ContentListEntry): number {
  const ta = a.updated ? Date.parse(a.updated) : 0;
  const tb = b.updated ? Date.parse(b.updated) : 0;
  return tb - ta;
}

/**
 * Every publicly readable entry on the site (posts + courses), split the way
 * the home page presents them: hand-written vs. AI-generated, featured first.
 */
export function getContentListings() {
  const listings: ContentListEntry[] = [
    ...getAllPosts().map((post) => toListing(post, "Post", post.updated)),
    ...getAllCoursesWithLatest().map((course) =>
      toListing(course, "Course", course.latestUpdated),
    ),
  ].sort(byUpdatedDesc);

  const isHuman = (listing: ContentListEntry) => !listing.aiGenerated;

  return {
    featured: listings.filter(
      (listing) => isHuman(listing) && listing.featured,
    ),
    other: listings.filter((listing) => isHuman(listing) && !listing.featured),
    aiGenerated: listings.filter((listing) => !isHuman(listing)),
  };
}
