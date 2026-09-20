import { getFeaturedPosts, getOtherPosts } from "@/lib/posts";
import { getAllCoursesWithLatest } from "@/lib/courses";
import TopNav from "@/components/layout/top-nav";
import ContentList from "@/components/content-list";

export const metadata = {
  title: "Read | EffessDev",
  description:
    "Read my tutorials and courses on software and embedded systems.",
  openGraph: {
    title: "Read | EffessDev",
    description:
      "Read my tutorials and courses on software and embedded systems.",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Read | EffessDev",
    description:
      "Read my tutorials and courses on software and embedded systems.",
  },
};

export default function ReadPage() {
  const featuredPosts = getFeaturedPosts();
  const otherPosts = getOtherPosts();
  const courses = getAllCoursesWithLatest().sort((a, b) => {
    const ta = a.latestUpdated ? Date.parse(a.latestUpdated) : 0;
    const tb = b.latestUpdated ? Date.parse(b.latestUpdated) : 0;
    return tb - ta;
  });

  const featuredEntries = [
    ...featuredPosts
      .filter((post) => !post.aiGenerated)
      .map((post) => ({
        id: post.id,
        title: post.title,
        description: post.description,
        href: `/read/${post.id}`,
        updated: post.updated,
        tags: post.tags,
        draft: post.draft,
        aiGenerated: post.aiGenerated,
        typeLabel: "Post",
      })),
    ...courses
      .filter((course) => course.featured && !course.aiGenerated)
      .map((course) => ({
        id: course.id,
        title: course.title,
        description: course.description,
        href: `/read/${course.id}`,
        updated: course.latestUpdated,
        tags: course.tags,
        draft: course.draft,
        aiGenerated: course.aiGenerated,
        typeLabel: "Course",
      })),
  ].sort((a, b) => {
    const ta = a.updated ? Date.parse(a.updated) : 0;
    const tb = b.updated ? Date.parse(b.updated) : 0;
    return tb - ta;
  });

  const otherEntries = [
    ...otherPosts
      .filter((post) => !post.aiGenerated)
      .map((post) => ({
        id: post.id,
        title: post.title,
        description: post.description,
        href: `/read/${post.id}`,
        updated: post.updated,
        tags: post.tags,
        draft: post.draft,
        aiGenerated: post.aiGenerated,
        typeLabel: "Post",
      })),
    ...courses
      .filter((course) => !course.featured && !course.aiGenerated)
      .map((course) => ({
        id: course.id,
        title: course.title,
        description: course.description,
        href: `/read/${course.id}`,
        updated: course.latestUpdated,
        tags: course.tags,
        draft: course.draft,
        aiGenerated: course.aiGenerated,
        typeLabel: "Course",
      })),
  ].sort((a, b) => {
    const ta = a.updated ? Date.parse(a.updated) : 0;
    const tb = b.updated ? Date.parse(b.updated) : 0;
    return tb - ta;
  });

  return (
    <>
      <TopNav backLabel="Home" backHref="/" />
      <main>
        <ContentList heading="Featured" items={featuredEntries} />
        <div className="pt-8" id="other-posts" />
        <ContentList heading="Other" items={otherEntries} />
        <div className="pt-8" id="ai-generated" />
        <ContentList
          heading="AI-Generated"
          items={
            // collect ai-generated posts and courses and sort by updated
            [
              ...featuredPosts
                .filter((p) => p.aiGenerated)
                .map((post) => ({
                  id: post.id,
                  title: post.title,
                  description: post.description,
                  href: `/read/${post.id}`,
                  updated: post.updated,
                  tags: post.tags,
                  draft: post.draft,
                  aiGenerated: post.aiGenerated,
                  typeLabel: "Post",
                })),
              ...otherPosts
                .filter((p) => p.aiGenerated)
                .map((post) => ({
                  id: post.id,
                  title: post.title,
                  description: post.description,
                  href: `/read/${post.id}`,
                  updated: post.updated,
                  tags: post.tags,
                  draft: post.draft,
                  aiGenerated: post.aiGenerated,
                  typeLabel: "Post",
                })),
              ...courses
                .filter((c) => c.aiGenerated)
                .map((course) => ({
                  id: course.id,
                  title: course.title,
                  description: course.description,
                  href: `/read/${course.id}`,
                  updated: course.latestUpdated,
                  tags: course.tags,
                  draft: course.draft,
                  aiGenerated: course.aiGenerated,
                  typeLabel: "Course",
                })),
            ].sort((a, b) => {
              const ta = a.updated ? Date.parse(a.updated) : 0;
              const tb = b.updated ? Date.parse(b.updated) : 0;
              return tb - ta;
            })
          }
        />
      </main>
    </>
  );
}
