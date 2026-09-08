# My Website

## Creating a New Post

Create a Markdown file in the `/posts` folder. The filename is used as the URL slug, so keep it lowercase and use hyphens instead of spaces, for example `posts/esp-idf-vscode-setup-guide.md`.

Use frontmatter at the top of the file:

```yaml
---
title: "Title of the post"
description: "Short summary shown in listings and metadata."
updated: "2026-09-08"
featured: false
draft: false
tags: ["tag1", "tag2", "tag3"]
---
```

Then write the post body below it in normal Markdown.

Notes:

- Required fields: `title` and `updated`
- Optional fields: `description`, `featured`, `draft`, `tags`
- `draft: true` adds a destructive colored "draft" badge to the post
- `featured: true` makes it show up in featured post sections
- The file name becomes the route, so `my-post.md` becomes `/posts/my-post`

## Creating a New Course

Create a new folder inside `/courses`, using a short lowercase slug for the course ID, for example `/courses/embedded-c`.

Each course needs a `meta.json` file inside its folder. This file defines the course landing page metadata:

```json
{
  "title": "Embedded C Mastery: From Application Developer to Firmware Engineer",
  "description": "A practical course for developers who already know C but are new to embedded systems.",
  "featured": true
}
```

The site reads the folder name as the course route, so this example becomes `/courses/embedded-c`.

Inside the same course folder, add chapter files as numbered Markdown documents such as `01.md`, `02.md`, `03.md`. The app sorts them by filename, so the numeric prefix controls the chapter order.

### Creating Course Chapters

This is identical to creating posts.

## Documentation I Used

- Shadcn UI installation: <https://ui.shadcn.com/docs/installation>
- Shadcn UI Dark Mode (Next.js): <https://ui.shadcn.com/docs/dark-mode/next>

## Notes

- Start the development server: `npm run dev`
- Build the project: `npm run build`
- Serve the built output: `npx serve@latest out`
