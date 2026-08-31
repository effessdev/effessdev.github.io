<!-- BEGIN:nextjs-agent-rules -->

# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->

# Course and post writing rules

- Add `ai-generated` tag along with other tags if *you* are writing the post.
- Use `$` and `$$` for LaTeX.
- Do not create large tables, since many users are on smartphones.
- Do not use horizontal rules (`---`) at all.
- Do not use level 1 headings (`#`), only use level 2 (`##`) or lower. Level 1 is taken by the title.

# Frontmatter (for posts & course chapters)

Example:

```
---
id: "2020-02-20"
title: "Title"
description: "Description"
updated: "2020-02-20"
draft: false
tags: ["tag1", "tag2", "tag3"]
---
```

Here,

- `id`:
  - For courses, use the chapter number (e.g., `01`, `02`, etc.)
  - For posts, use the post creation date
- `title`: Title of the post or course chapter. Also the SEO title. Shown in the post or chapter contents. No need of an additional title inside the post.
- `description`: Description of the post. Also the SEO description. Only shown in the page where posts or chapters are listed, not inside the post or chapter.
- `updated`: Last updated date.
- `draft`: Whether it's a draft.
- `tags`: Tags. Add `ai-generated` tag if *you* generated the post.
