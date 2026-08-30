import type { Metadata } from "next";
import { notFound } from "next/navigation";
import {
  getAllCourseIds,
  getChapter,
  getCourseChapters,
  getCourseMeta,
} from "@/lib/courses";
import TopNav from "@/components/layout/top-nav";
import PostComponent from "@/components/post-component";
import { ArrowLeft, ArrowRight } from "lucide-react";
import Link from "next/link";
import { buttonVariants } from "@/components/ui/button";
import { Post } from "@/lib/types";

export function generateStaticParams() {
  return getAllCourseIds().flatMap((courseId) =>
    getCourseChapters(courseId).map((chapter) => ({
      courseId: courseId,
      chapter: chapter.id,
    })),
  );
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ courseId: string; chapter: string }>;
}): Promise<Metadata> {
  const { courseId, chapter: chapterId } = await params;
  const course = getCourseMeta(courseId);
  const chapter = getChapter(courseId, chapterId);

  if (!chapter) {
    return {
      title: "Chapter Not Found",
      description: "The requested course chapter could not be found.",
    };
  }

  return {
    title: `${chapter.title} | ${course.title} | EffessDev`,
    description: chapter.description,
    keywords: chapter.tags.join(", "),
    openGraph: {
      title: chapter.title,
      description: chapter.description,
      type: "article",
      tags: chapter.tags,
    },
    twitter: {
      card: "summary_large_image",
      title: chapter.title,
      description: chapter.description,
    },
  };
}

export default async function ChapterPage({
  params,
}: {
  params: Promise<{ courseId: string; chapter: string }>;
}) {
  const { courseId, chapter: chapterId } = await params;
  const chapter = getChapter(courseId, chapterId);
  if (!chapter) notFound();

  const chapters = getCourseChapters(courseId);
  const idx = chapters.findIndex((c) => c.id === chapterId);
  const prev = idx > 0 ? chapters[idx - 1] : null;
  const next = idx < chapters.length - 1 ? chapters[idx + 1] : null;

  return (
    <>
      <TopNav
        backLabel="Contents"
        backHref={`/courses/${courseId}`}
        extraLinks={[
          { label: "All courses", href: "/courses" },
          { label: "Home", href: "/" },
        ]}
      />

      <ChapterNav courseId={courseId} prev={prev} next={next} />

      <div className="w-full h-6" />

      <PostComponent post={chapter} />

      <ChapterNav courseId={courseId} prev={prev} next={next} />
    </>
  );
}

function ChapterNav({
  courseId,
  prev,
  next,
}: {
  courseId: string;
  prev: Post | null;
  next: Post | null;
}) {
  return (
    <nav className="flex gap-2 justify-between mt-8 pt-6 border-t">
      {prev ? (
        <Link
          className={buttonVariants({ variant: "secondary", size: "lg" })}
          href={`/courses/${courseId}/${prev.id}`}
        >
          <ArrowLeft /> Prev
        </Link>
      ) : (
        <span />
      )}
      {next ? (
        <Link
          className={buttonVariants({ variant: "secondary", size: "lg" })}
          href={`/courses/${courseId}/${next.id}`}
        >
          Next
          <ArrowRight />{" "}
        </Link>
      ) : (
        <span />
      )}
    </nav>
  );
}
