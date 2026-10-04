# Guide: Buttons in Markdown content

Any link inside a content file (e.g. `content/home.md`) can be rendered as a
button by adding a `button` directive to the link's **title** — the quoted
text after the URL:

```md
[Label](https://example.com "button")
```

The title has the general form:

```md
[Label](url "button [variant] [size]")
```

`variant` and `size` are optional. Without them, the button defaults to
`solid` / `md`.

## Variants (all types)

| Variant     | Syntax                            | Look                            |
| ----------- | --------------------------------- | ------------------------------- |
| `solid`     | `"button solid"`                  | Filled primary color (default)  |
| `outline`   | `"button outline"`                | Bordered, transparent background |
| `secondary` | `"button secondary"`              | Muted secondary fill            |

## Sizes (all types)

| Size    | Syntax              | Height |
| ------- | ------------------- | ------ |
| `sm`    | `"button sm"`       | 2rem   |
| `md`    | `"button md"`       | 2.25rem (default) |
| `lg`    | `"button lg"`       | 2.5rem |
| `icon`  | `"button icon"`     | 2.25rem square |

Variant and size are each optional, but when both are present the order is
fixed: `button <variant> <size>`:

```md
[View the course](https://effessdev.github.io/esp-idf "button solid lg")
[Source on GitHub](https://github.com/effessdev/effessdev.github.io "button outline lg")
[Secondary CTA](https://example.com "button secondary sm")
```

## Rules & notes

- The directive must be the link's **title** (in quotes after the URL). A
  link without a title — or with a title that doesn't start with `button` —
  renders as a normal inline link, so you can still use titles for tooltips
  elsewhere.
- Buttons are inline elements: put a button link on its own paragraph (a
  blank line above and below) for a clean block look, or keep it inside a
  sentence — both work.
- Multiple buttons in the same paragraph sit side by side naturally, so you
  can build CTA rows:

  ```md
  [Get started](/esp-idf "button solid lg") [Browse projects](#content "button outline lg")
  ```

- Supported values come from the `BTN_VARIANTS` / `BTN_SIZES` maps in
  `src/components/ui.tsx`. If a new variant or size is added there, it works
  in content automatically — no markdown parser changes needed.
- Case-insensitive: `"Button Outline LG"` works the same as
  `"button outline lg"`.
- A live example is used in `content/home.md`:

  ```md
  [Click here to view the course](https://effessdev.github.io/esp-idf "button solid lg")
  ```
