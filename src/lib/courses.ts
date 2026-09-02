import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { Post, PostSchema, CourseMeta, CourseMetaSchema } from "./types";

const coursesDirectory = path.join(process.cwd(), "courses");

export function getAllCourseIds(): string[] {
  return fs
    .readdirSync(coursesDirectory)
    .filter((entry) =>
      fs.statSync(path.join(coursesDirectory, entry)).isDirectory(),
    );
}

export function getCourseMeta(courseId: string): CourseMeta {
  const metaPath = path.join(coursesDirectory, courseId, "meta.json");
  const raw = fs.readFileSync(metaPath, "utf8");
  return CourseMetaSchema.parse({ id: courseId, ...JSON.parse(raw) });
}

export function getAllCourses(): CourseMeta[] {
  return getAllCourseIds().map((id) => getCourseMeta(id));
}

export function getCourseChapters(courseId: string): Post[] {
  const courseDir = path.join(coursesDirectory, courseId);
  const files = fs
    .readdirSync(courseDir)
    .filter((f) => f.endsWith(".md"))
    .sort(); // filename order = chapter order — prefix files 01-, 02-, ...

  return files.map((file) => {
    const fileContents = fs.readFileSync(path.join(courseDir, file), "utf8");
    const { data, content } = matter(fileContents);

    return PostSchema.parse({
      id: path.basename(file, ".md"),
      title: data.title,
      description: data.description,
      updated: data.updated,
      draft: data.draft === true,
      tags: data.tags || [],
      content,
    });
  });
}

export function getChapter(courseId: string, chapterId: string): Post | null {
  return getCourseChapters(courseId).find((c) => c.id === chapterId) || null;
}
