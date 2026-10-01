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
import { btn, card } from "@/components/ui";
import { cn } from "@/lib/utils";
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
        extraLinks={[{ label: "Tutorials", href: "/" }]}
      />

      <ChapterNavTop courseId={courseId} prev={prev} next={next} />

      <PostComponent post={chapter} />

      <ChapterNavBottom courseId={courseId} prev={prev} next={next} />
    </>
  );
}

/** Prev/Next pill that renders disabled when there is no chapter. */
function NavPill({
  chapter,
  courseId,
  children,
}: {
  chapter: Post | null;
  courseId: string;
  children: React.ReactNode;
}) {
  return (
    <Link
      href={chapter ? `/read/${courseId}/${chapter.id}` : "#"}
      aria-disabled={!chapter || undefined}
      tabIndex={chapter ? undefined : -1}
      className={cn(
        btn({ size: "lg" }),
        !chapter && "pointer-events-none opacity-50",
      )}
    >
      {children}
    </Link>
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
    <nav className="mt-8 flex gap-2 border-t pt-6">
      <NavPill courseId={courseId} chapter={prev}>
        <ArrowLeft /> Prev
      </NavPill>
      <NavPill courseId={courseId} chapter={next}>
        Next <ArrowRight />
      </NavPill>
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
  const tile = cn(card, "flex-1 p-4 transition-colors hover:bg-card/80");

  return (
    <nav className="mt-8 flex justify-between gap-2 border-t pt-6">
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
        <Link
          href={`/read/${courseId}/${next.id}`}
          className={cn(tile, "text-right")}
        >
          <div className="mb-2 flex items-center justify-end gap-2">
            Next
            <ArrowRight />
          </div>
          <span className="text-muted-foreground">{next.title}</span>
        </Link>
      )}
    </nav>
  );
}
