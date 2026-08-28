# My Website

This is the source code for my website.

## How It Works

Place your posts in the "posts" directory as Markdown files. When you push your changes, a GitHub Action will build everything into a static site and deploy it to GitHub Pages.

> **Note:** Currently, I use the creation date as the post id since it doesn't change.

## Documentation I Used

- Shadcn UI installation: <https://ui.shadcn.com/docs/installation>
- Dark mode: <https://ui.shadcn.com/docs/dark-mode/next>

## Features I skipped

I chose not to include keywords in my post URLs. Instead, each post is identified by a unique short ID (e.g., /posts/asdfkj). This gives me complete flexibility to change post titles anytime without breaking existing links or managing complex redirects.

I also skipped the common compromise of combining IDs with titles (/posts/asdfkj-post-title) because that would introduce unnecessary URL complexity for practically zero SEO gain. Google has stated that keywords in URLs are a "very, very lightweight" ranking factor, contributing less than 1% to overall ranking weight.

Since search engines can already read the HTML `<title>` tag, meta description, and the page body itself, the URL adds little additional signal. The trade-off is that I sacrifice a minor user experience benefit (readable URLs in search results) for complete operational freedom, which I consider a worthwhile exchange.

## Notes

- Running the development server: `npm run dev`
- Generating the output: `npm run build`
- Serving the output: `npx serve@latest out`
