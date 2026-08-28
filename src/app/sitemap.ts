// src/app/sitemap.ts
import { MetadataRoute } from "next";
import { getAllPosts } from "@/lib/posts";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = "https://effessdev.github.io";
  const posts = getAllPosts();

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

  return [...routes, ...postRoutes];
}
