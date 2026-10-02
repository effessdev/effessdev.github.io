import fs from "fs";
import path from "path";
import { Post, CourseMeta, CourseMetaSchema } from "./types";
import {
  getPostsFromDirectory,
  getMarkdownById,
  getMarkdownFileIds,
  ParsedMarkdown,
} from "./posts";

const readDirectory = path.join(process.cwd(), "read");

export function getAllCourseIds(): string[] {
  return fs
    .readdirSync(readDirectory)
    .filter((entry) =>
      fs.statSync(path.join(readDirectory, entry)).isDirectory(),
    );
}

export function getCourseMeta(courseId: string): CourseMeta {
  const metaPath = path.join(readDirectory, courseId, "meta.json");
  const raw = fs.readFileSync(metaPath, "utf8");
  return CourseMetaSchema.parse({ id: courseId, ...JSON.parse(raw) });
}

export function getAllCourses(): CourseMeta[] {
  return getAllCourseIds().map((id) => getCourseMeta(id));
}

export function getAllCoursesWithLatest(): (CourseMeta & {
  latestUpdated?: string;
})[] {
  return getAllCourseIds().map((id) => {
    const meta = getCourseMeta(id);
    const chapters = getCourseChapters(id);

    const latestDate = chapters
      .map((c) => (c.updated ? new Date(c.updated) : null))
      .filter((d): d is Date => d !== null)
      .sort((a, b) => b.getTime() - a.getTime())[0];

    return {
      ...meta,
      latestUpdated: latestDate ? latestDate.toISOString() : undefined,
    };
  });
}

export function getCourseChapters(courseId: string): Post[] {
  const courseDir = path.join(readDirectory, courseId);

  return getPostsFromDirectory(courseDir, {
    sortBy: "filename",
  });
}

/** Ids of every chapter file in a course, including ones with invalid frontmatter. */
export function getChapterIds(courseId: string): string[] {
  return getMarkdownFileIds(path.join(readDirectory, courseId));
}

/** Parse one chapter by id, whether or not its frontmatter is valid. Null if the file doesn't exist. */
export function getChapter(
  courseId: string,
  chapterId: string,
): ParsedMarkdown | null {
  return getMarkdownById(path.join(readDirectory, courseId), chapterId);
}
