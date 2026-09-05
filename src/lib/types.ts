import { z } from "zod";

export const PostSchema = z.object({
  title: z.string(),
  description: z.string().optional(),
  updated: z.string(),
  draft: z.boolean().default(false),
  featured: z.boolean().default(false),
  tags: z.array(z.string()).default([]),
  content: z.string(),
});

export type Post = z.infer<typeof PostSchema> & {
  id: string;
};

export const CourseMetaSchema = z.object({
  id: z.string(),
  title: z.string(),
  description: z.string().optional(),
  featured: z.boolean().default(false),
});

export type CourseMeta = z.infer<typeof CourseMetaSchema>;
