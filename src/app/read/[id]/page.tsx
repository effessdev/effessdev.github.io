import { Metadata } from "next";
import { notFound } from "next/navigation";
import { getAllPostIds, getPostById } from "@/lib/posts";
import {
  getAllCourseIds,
  getCourseChapters,
  getCourseMeta,
} from "@/lib/courses";
import PostComponent from "@/components/post-component";
import TopNav from "@/components/layout/top-nav";
import PostList from "@/components/post-list";

interface ReadEntryPageProps {
  params: Promise<{
    id: string;
  }>;
}

export async function generateStaticParams() {
  return [...getAllPostIds(), ...getAllCourseIds()].map((id) => ({ id }));
}

export async function generateMetadata({
  params,
}: ReadEntryPageProps): Promise<Metadata> {
  const { id } = await params;
  const post = getPostById(id);

  if (post) {
    return {
      title: `${post.title} | EffessDev`,
      description: post.description ?? "",
      keywords: (post.tags ?? []).join(", "),
      openGraph: {
        title: post.title,
        description: post.description ?? "",
        type: "article",
        publishedTime: post.updated,
        tags: post.tags ?? [],
      },
      twitter: {
        card: "summary_large_image",
        title: post.title,
        description: post.description ?? "",
      },
    };
  }

  try {
    const course = getCourseMeta(id);
    return {
      title: `${course.title} | EffessDev`,
      description: course.description,
      keywords: [course.title, "course", ...(course.tags ?? [])].join(", "),
      openGraph: {
        title: course.title,
        description: course.description,
        type: "website",
      },
      twitter: {
        card: "summary_large_image",
        title: course.title,
        description: course.description,
      },
    };
  } catch {
    return {
      title: "Content Not Found",
    };
  }
}

export default async function ReadEntryPage({ params }: ReadEntryPageProps) {
  const { id } = await params;
  const post = getPostById(id);

  if (post) {
    return (
      <>
        <TopNav
          backHref="/read"
          backLabel="Tutorials"
          extraLinks={[{ label: "Home", href: "/" }]}
        />

        <PostComponent post={post} />
      </>
    );
  }

  let course, chapters;

  try {
    course = getCourseMeta(id);
    chapters = getCourseChapters(id);
  } catch {
    notFound();
  }

  return (
    <>
      <TopNav
        backHref="/read"
        backLabel="Tutorials"
        extraLinks={[{ label: "Home", href: "/" }]}
      />

      <PostList
        heading={course.title}
        description={course.description}
        posts={chapters}
      />
    </>
  );
}
