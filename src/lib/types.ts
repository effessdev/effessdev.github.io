import { z } from "zod";

export const PostSchema = z.object({
  id: z.string(),
  title: z.string(),
  description: z.string(),
  updated: z.string(),
  draft: z.boolean(),
  tags: z.array(z.string()),
  content: z.string(),
});

export type Post = z.infer<typeof PostSchema>;
