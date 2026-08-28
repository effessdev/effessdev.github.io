---
id: "2026-08-28"
title: "Sample Post"
description: "This is a sample post showcasing all typography features."
updated: "2026-08-28"
draft: false
tags: ["sample"]
---

This document is a **comprehensive** test suite for validating your markdown rendering engine. It includes *various* elements that are commonly used in technical documentation.

# Heading 1

## Heading 2

### Heading 3

#### Heading 4

##### Heading 5

###### Heading 6

That Heading 1 is red because you are not supposed to use it. [This is a link](https://github.com/effessdev).

## Paragraphs and Text Formatting

Markdown is a lightweight markup language with plain-text formatting syntax. It is **often** used in *README* files, forums, and text editors. The goal is to make writing *as readable* as possible **without** sacrificing structure.

> **Important:** This blockquote contains **bold** and *italic* text to test nested formatting. Ensure that the rendering preserves both styles inside the quote. *Mixed formatting like **this** should also work flawlessly.*

## Inline Code and Code Blocks

You can use `inline code` for short snippets like `console.log('Hello')`. For longer examples, use fenced code blocks.

### JavaScript Example

```javascript
function greet(name) {
    return `Hello, ${name}!`;
}
console.log(greet("World"));
```

### Python Example

```python
def factorial(n):
    if n == 0:
        return 1
    return n * factorial(n-1)

print(factorial(5))
```

### Bash Example

```bash
#!/bin/bash
echo "Current date: $(date)"
ls -la | grep ".md"
```

### HTML Example

```html
<!DOCTYPE html>
<html>
<head>
    <title>Test Page</title>
</head>
<body>
    <h1>Hello World</h1>
</body>
</html>
```

## Lists

### Unordered List

- First item
- Second item
    - Nested item with **bold** and *italic*
    - Another nested item with `inline code`
- Third item

### Ordered List

1. Prepare the environment
2. Install dependencies
    - Use `pip install -r requirements.txt`
    - Or `npm install` for Node.js
3. Run the application
4. Verify the output

## Final Notes

This document covers **headings** (starting from level 2), *paragraphs*, blockquotes, inline code, code blocks in multiple languages, and both ordered/unordered lists. Use this to verify your **styling** and *syntax highlighting*.

> **Pro tip:** Always test edge cases like **bold inside *italic*** and `code inside blockquotes`.

---

Thanks for reading.