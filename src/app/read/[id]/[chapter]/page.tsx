import type { Metadata } from "next";
import { notFound } from "next/navigation";
import {
  getAllCourseIds,
  getChapter,
  getChapterIds,
  getCourseChapters,
  getCourseMeta,
} from "@/lib/courses";
import TopNav from "@/components/top-nav";
import PostComponent from "@/components/post-component";
import { ArrowLeft, ArrowRight } from "lucide-react";
import Link from "next/link";
import { btn, card, FrontmatterError } from "@/components/ui";
import { cn } from "@/lib/utils";
import { Post } from "@/lib/types";

export function generateStaticParams() {
  return getAllCourseIds().flatMap((courseId) =>
    getChapterIds(courseId).map((chapter) => ({
      id: courseId,
      chapter,
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
  const entry = getChapter(courseId, chapterId);

  if (!entry) {
    return {
      title: "Chapter Not Found",
      description: "The requested course chapter could not be found.",
    };
  }

  if (entry.status === "error") {
    return {
      title: "Content Not Available",
      robots: "noindex",
    };
  }

  const chapter = entry.post;

  return {
    title: `${chapter.title} | ${course.title}`,
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
  const entry = getChapter(courseId, chapterId);
  if (!entry) notFound();

  if (entry.status === "error") {
    return (
      <>
        <TopNav
          backLabel="Chapters"
          backHref={`/read/${courseId}`}
          extraLinks={[{ label: "Tutorials", href: "/" }]}
        />

        <FrontmatterError
          file={`read/${courseId}/${chapterId}.md`}
          message={entry.error}
        />
      </>
    );
  }

  const chapter = entry.post;
  const course = getCourseMeta(courseId);
  const chapters = getCourseChapters(courseId);
  const idx = chapters.findIndex((c) => c.id === chapterId);
  const prev = idx > 0 ? chapters[idx - 1] : null;
  const next = idx < chapters.length - 1 ? chapters[idx + 1] : null;

  return (
    <>
      <TopNav
        backLabel="Chapters"
        backHref={`/read/${courseId}`}
        extraLinks={[{ label: "Tutorials", href: "/" }]}
        prevHref={prev ? `/read/${courseId}/${prev.id}` : undefined}
        nextHref={next ? `/read/${courseId}/${next.id}` : undefined}
      />

      <PostComponent post={chapter} />

      <div className="h-6" />

      <PrevAndNext courseId={courseId} prev={prev} next={next} />
    </>
  );
}

function PrevAndNext({
  courseId,
  prev,
  next,
}: {
  courseId: string;
  prev: Post | null;
  next: Post | null;
}) {
  const tile = cn(card, "basis-1/2 p-4 transition-colors hover:bg-card/80");

  return (
    <nav className="flex justify-center gap-2">
      {prev && (
        <Link href={`/read/${courseId}/${prev.id}`} className={tile}>
          <div className="mb-2 flex items-center gap-2">
            <ArrowLeft />
            Prev
          </div>
          <span className="text-muted-foreground">{prev.title}</span>
        </Link>
      )}

      {next && (
        <Link href={`/read/${courseId}/${next.id}`} className={tile}>
          <div className="mb-2 flex items-center gap-2">
            Next
            <ArrowRight />
          </div>
          <span className="text-muted-foreground">{next.title}</span>
        </Link>
      )}
    </nav>
  );
}
