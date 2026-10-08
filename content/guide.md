# `home.json` Content Guide

`content/home.json` drives the homepage. It lists project **categories**, each
holding a set of **repos** (entries). At build time the app reads this file,
validates it against a Zod schema, and enriches GitHub entries with live
metadata (see [content.ts](../src/lib/content.ts)).

## Top-level shape

```jsonc
{
  "categories": [ /* array of category objects */ ]
}
```

Only `categories` is read at the top level. It is required and must be an array.

## Category

Each category renders as a section on the page.

| Field         | Type              | Required | Default | Notes                                                        |
| ------------- | ----------------- | -------- | ------- | ------------------------------------------------------------ |
| `name`        | string            | yes      | —       | Section heading.                                             |
| `description` | string            | no       | `""`    | Short line shown under the heading.                          |
| `repos`       | array of repo refs| no       | `[]`    | The entries shown in this section. See below.                |

## Repo entries

An entry is **either** a plain string **or** an object.

### 1. Plain string (simplest form)

```jsonc
"repos": ["esp-idf", "smart-led"]
```

A bare string is treated as a **GitHub repo name** owned by the default account
(`effessdev`). Its description, language, and star count are fetched from the
GitHub API on every build, and the link points to
`https://github.com/effessdev/<name>`.

### 2. Object (curated / non-GitHub entries)

```jsonc
{
  "name": "The Stellar Expedition",
  "description": "Float through space to reach your station.",
  "url": "https://effessdev.itch.io/the-stellar-expedition"
}
```

| Field         | Type    | Required | Default                          | Notes                                                                                   |
| ------------- | ------- | -------- | -------------------------------- | --------------------------------------------------------------------------------------- |
| `name`        | string  | yes      | —                                | The GitHub repo name (used for API fetch and default URL) or fallback label.            |
| `owner`       | string  | no       | `"effessdev"`                    | GitHub owner, override when the repo lives under a different account.                   |
| `label`       | string  | no       | `name`                           | Text shown as the card title. Use when the display name differs from `name`.            |
| `url`         | string  | no       | derived GitHub URL               | Must be a valid URL. Overrides the link target (e.g. itch.io, external site).           |
| `description` | string  | no       | fetched from GitHub (if GitHub)  | Body text on the card. A provided value wins over the fetched one.                       |
| `note`        | string  | no       | —                                | Small highlighted callout rendered under the description (e.g. "Deprecated", "WIP").    |
| `github`      | boolean | no       | `true`                           | Set to `false` for non-GitHub entries to **skip** the API fetch entirely.               |

## Behavior notes

- **Auto-fetched fields**: `language` and `stars` come from the GitHub API for
  GitHub entries. They are currently **not displayed** on the cards — only the
  description (and optional `note`) are shown.
- **Static build**: metadata is fetched once per build and baked into the HTML;
  descriptions refresh each time you rebuild/deploy.
- **External links**: when a `url` starts with `http`, the card opens in a new
  tab. Internal paths (relative strings) open in the same tab.
- **Validation**: unknown or malformed fields fail the schema check at build
  time, so keep field names exactly as listed above.

## Minimal example

```jsonc
{
  "categories": [
    {
      "name": "Software Engineering",
      "description": "Developer tools that streamline everyday workflows.",
      "repos": [
        "ghsync-gui",
        {
          "name": "custom-tool",
          "owner": "someone-else",
          "label": "Custom Tool",
          "note": "Beta",
          "github": true
        },
        {
          "name": "my-site",
          "url": "https://example.com",
          "description": "A non-GitHub link.",
          "github": false
        }
      ]
    }
  ]
}
```
