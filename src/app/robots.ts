import type { MetadataRoute } from "next";

// Required for metadata routes with `output: "export"` — rendered at build time.
export const dynamic = "force-static";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
    },
    sitemap: [
      "https://effessdev.github.io/sitemap.xml",
      "https://effessdev.github.io/esp-idf/sitemap.xml",
    ],
  };
}
