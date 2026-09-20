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
      id: courseId,
      chapter: chapter.id,
    })),
  );
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string; chapter: string }>;
}): Promise<Metadata> {
  const { id: courseId, chapter: chapterId } = await params;
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
  params: Promise<{ id: string; chapter: string }>;
}) {
  const { id: courseId, chapter: chapterId } = await params;
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
        backHref={`/read/${courseId}`}
        extraLinks={[
          { label: "Tutorials", href: "/read" },
          { label: "Home", href: "/" },
        ]}
      />

      <ChapterNavTop courseId={courseId} prev={prev} next={next} />

      <div className="w-full h-6" />

      <PostComponent post={chapter} />

      <ChapterNavBottom courseId={courseId} prev={prev} next={next} />
    </>
  );
}
function ChapterNavTop({
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
          className={buttonVariants({ variant: "default", size: "lg" })}
          href={`/read/${courseId}/${prev.id}`}
        >
          <ArrowLeft /> Prev
        </Link>
      ) : (
        <span />
      )}
      {next ? (
        <Link
          className={buttonVariants({ variant: "default", size: "lg" })}
          href={`/read/${courseId}/${next.id}`}
        >
          Next
          <ArrowRight />
        </Link>
      ) : (
        <span />
      )}
    </nav>
  );
}

function ChapterNavBottom({
  courseId,
  prev,
  next,
}: {
  courseId: string;
  prev: Post | null;
  next: Post | null;
}) {
  const bgStyle =
    "flex-1 bg-card border rounded-lg p-4 cursor-pointer hover:bg-card/80 transition-colors";

  return (
    <nav className="flex gap-2 justify-between mt-8 pt-6 border-t">
      {prev ? (
        <div className={bgStyle}>
          <Link href={`/read/${courseId}/${prev.id}`}>
            <div className="flex mb-2 items-center gap-2">
              <ArrowLeft />
              Prev
            </div>
            <span className="text-muted-foreground">{prev.title}</span>
          </Link>
        </div>
      ) : (
        <div className="flex-1" />
      )}

      {next ? (
        <div className={bgStyle}>
          <Link href={`/read/${courseId}/${next.id}`}>
            <div className="flex mb-2 items-center gap-2">
              Next
              <ArrowRight />
            </div>
            <span className="text-right text-muted-foreground">
              {next.title}
            </span>
          </Link>
        </div>
      ) : (
        <div className="flex-1" />
      )}
    </nav>
  );
}
