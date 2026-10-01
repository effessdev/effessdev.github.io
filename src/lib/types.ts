import { z } from "zod";

// Fields every piece of content (post or course) shares.
const sharedFields = {
  title: z.string(),
  description: z.string().optional(),
  draft: z.boolean().default(false),
  aiGenerated: z.boolean().default(false),
  featured: z.boolean().default(false),
  tags: z.array(z.string()).default([]),
};

export const PostSchema = z.object({
  ...sharedFields,
  updated: z.string(),
  content: z.string(),
});

export type Post = z.infer<typeof PostSchema> & { id: string };

export const CourseMetaSchema = z.object({ ...sharedFields, id: z.string() });

export type CourseMeta = z.infer<typeof CourseMetaSchema>;
