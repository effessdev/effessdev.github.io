import { z } from "zod";

// Frontmatter of every post and chapter. Strict: every field is required and
// extra fields are rejected — content with invalid frontmatter is never shown.
export const FrontmatterSchema = z.strictObject({
  title: z.string(),
  description: z.string(),
  updated: z.string(),
  tags: z.array(z.string()),
  destructiveTags: z.array(z.string()),
});

export type Post = z.infer<typeof FrontmatterSchema> & {
  content: string;
  id: string;
};

// Course metadata lives in meta.json, not frontmatter — its own, looser shape.
export const CourseMetaSchema = z.object({
  id: z.string(),
  title: z.string(),
  description: z.string().optional(),
  tags: z.array(z.string()).default([]),
  destructiveTags: z.array(z.string()).default([]),
});

export type CourseMeta = z.infer<typeof CourseMetaSchema>;
