import type { MetadataRoute } from "next";

// Required for metadata routes with `output: "export"` — rendered at build time.
export const dynamic = "force-static";

// Last modified is read at build time, so the sitemap refreshes on every build.
const lastModified = new Date();

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: "https://effessdev.github.io",
      lastModified,
      changeFrequency: "weekly",
      priority: 1,
    },
  ];
}
