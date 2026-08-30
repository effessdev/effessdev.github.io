import { notFound } from "next/navigation";
import {
  getAllCourseIds,
  getChapter,
  getCourseChapters,
  getCourseMeta,
} from "@/lib/courses";
import { Markdown } from "@/lib/markdown";

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
    <article className="py-8">
      <h1 className="text-4xl font-bold mb-6">{chapter.title}</h1>
      <Markdown content={chapter.content} />
      <nav className="flex justify-between mt-12 pt-6 border-t">
        {prev ? (
          <a href={`/courses/${courseId}/${prev.id}`}>&larr; {prev.title}</a>
        ) : (
          <span />
        )}
        {next ? (
          <a href={`/courses/${courseId}/${next.id}`}>{next.title} &rarr;</a>
        ) : (
          <span />
        )}
      </nav>
    </article>
  );
}
