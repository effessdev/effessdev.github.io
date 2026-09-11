import { MetadataRoute } from "next";
import { getAllPosts } from "@/lib/posts";
import { getAllCourses, getCourseChapters } from "@/lib/courses";

export const dynamic = "force-static";
export const revalidate = false;

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = "https://effessdev.github.io";
  const posts = getAllPosts();
  const courses = getAllCourses();

  const routes = [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: "weekly" as const,
      priority: 1.0,
    },
    {
      url: `${baseUrl}/read`,
      lastModified: new Date(),
      changeFrequency: "weekly" as const,
      priority: 0.8,
    },
  ];

  const postRoutes = posts.map((post) => ({
    url: `${baseUrl}/read/${post.id}`,
    lastModified: new Date(post.updated),
    changeFrequency: "weekly" as const,
    priority: 0.6,
  }));

  const courseRoutes = courses.map((course) => ({
    url: `${baseUrl}/read/${course.id}`,
    lastModified: new Date(),
    changeFrequency: "weekly" as const,
    priority: 0.7,
  }));

  const chapterRoutes = courses.flatMap((course) =>
    getCourseChapters(course.id).map((chapter) => ({
      url: `${baseUrl}/read/${course.id}/${chapter.id}`,
      lastModified: new Date(chapter.updated),
      changeFrequency: "weekly" as const,
      priority: 0.5,
    })),
  );

  return [...routes, ...postRoutes, ...courseRoutes, ...chapterRoutes];
}
