import { MetadataRoute } from "next";
import { getAllPosts } from "@/lib/posts";
import { getAllCourses, getCourseChapters } from "@/lib/courses";

export const dynamic = "force-static";
export const revalidate = false;

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = "https://effessdev.github.io";
  const posts = getAllPosts();
  const courses = getAllCourses();

  // Base URLs
  const routes = [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: "weekly" as const,
      priority: 1.0,
    },
    {
      url: `${baseUrl}/posts`,
      lastModified: new Date(),
      changeFrequency: "weekly" as const,
      priority: 0.8,
    },
  ];

  // Individual posts
  const postRoutes = posts.map((post) => ({
    url: `${baseUrl}/posts/${post.id}`,
    lastModified: new Date(post.updated),
    changeFrequency: "weekly" as const,
    priority: 0.6,
  }));

  // Courses listing
  routes.push({
    url: `${baseUrl}/courses`,
    lastModified: new Date(),
    changeFrequency: "weekly" as const,
    priority: 0.8,
  });

  // Individual course pages
  const courseRoutes = courses.map((course) => ({
    url: `${baseUrl}/courses/${course.id}`,
    lastModified: new Date(),
    changeFrequency: "weekly" as const,
    priority: 0.7,
  }));

  // Course chapter pages
  const chapterRoutes = courses.flatMap((course) =>
    getCourseChapters(course.id).map((chapter) => ({
      url: `${baseUrl}/courses/${course.id}/${chapter.id}`,
      lastModified: new Date(chapter.updated),
      changeFrequency: "weekly" as const,
      priority: 0.5,
    })),
  );

  return [...routes, ...postRoutes, ...courseRoutes, ...chapterRoutes];
}
