import { notFound } from "next/navigation";
import {
  getAllCourseIds,
  getChapter,
  getCourseChapters,
  getCourseMeta,
} from "@/lib/courses";
import { Markdown } from "@/lib/markdown";
import TopNav from "@/components/layout/top-nav";
import PostComponent from "@/components/post-component";
import { ArrowLeft, ArrowRight } from "lucide-react";
import Link from "next/link";
import { buttonVariants } from "@/components/ui/button";

export function generateStaticParams() {
  return getAllCourseIds().flatMap((courseId) =>
    getCourseChapters(courseId).map((chapter) => ({
      courseId: courseId,
      chapter: chapter.id,
    })),
  );
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

      <PostComponent post={chapter} />

      <nav className="flex gap-2 justify-between mt-12 pt-6 border-t">
        {prev ? (
          <Link
            className={buttonVariants({ variant: "secondary" })}
            href={`/courses/${courseId}/${prev.id}`}
          >
            <ArrowLeft /> Prev
          </Link>
        ) : (
          <span />
        )}
        {next ? (
          <Link
            className={buttonVariants({ variant: "secondary" })}
            href={`/courses/${courseId}/${next.id}`}
          >
            Next
            <ArrowRight />{" "}
          </Link>
        ) : (
          <span />
        )}
      </nav>
    </>
  );
}
