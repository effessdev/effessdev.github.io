import { z } from "zod";

// Frontmatter of every post. Strict: every field is required and
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
