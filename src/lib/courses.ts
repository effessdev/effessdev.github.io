import fs from "fs";
import path from "path";
import { Post, CourseMeta, CourseMetaSchema } from "./types";
import { getPostsFromDirectory } from "./posts";

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
    includeDrafts: true,
    sortBy: "filename",
  });
}

export function getChapter(courseId: string, chapterId: string): Post | null {
  return getCourseChapters(courseId).find((c) => c.id === chapterId) || null;
}
