---
title: "Why we need header files in C"
description: "Explains how #include, header files, function declarations, and compilation phases work together."
updated: "2026-10-02"
tags: ["c", "programming", "AI-Assisted"]
destructiveTags: []
---

## The Core Scenario

Suppose we split a C program across two source files:

```c
// functions.c
#include <stdio.h>

void greet(void) {
	printf("Hi!\n");
}
```

```c
// main.c
int main(void) {
	greet();
	return 0;
}
```

If you compile these files together, you want `main.c` to call `greet()` from `functions.c`. However, C requires you to understand how multi-file compilation works under the hood before this will work smoothly.

## The C Build Pipeline

When you run a build command like:

```bash
gcc -o program main.c functions.c
```

The build process goes through four distinct phases:

- **Preprocessing**: Expands `#include` directives, macros, and strips comments.
- **Compilation**: Translates preprocessed C code into assembly code.
- **Assembly**: Converts assembly code into binary machine code object files (`.o` or `.obj`).
- **Linking**: Combines all object files and libraries into a single executable.

Crucially, **phases 2 and 3 run independently on each source file**. The compiler translates `main.c` without knowing what is written inside `functions.c`.

## Why We Need Function Declarations

When the compiler processes `main.c` and reaches `greet()`, it must generate the correct machine code instructions for a function call. To do this, it needs to know:

- Is `greet` a function or a variable?
- What arguments does it accept?
- What type of value does it return?

Different signatures require different calling conventions (such as how arguments are passed or how return values are handled). 

A **function declaration** provides this blueprint:

```c
void greet(void); // Declares that greet takes no arguments and returns nothing
```

With this declaration present in `main.c`, the compiler can safely compile `main.c` into `main.o`. Because the actual implementation of `greet` is inside `functions.c`, the compiler leaves a **relocation entry** in `main.o`—a placeholder saying *"fill in the memory address of `greet` later."*

During the **linking phase**, the linker inspects `main.o` and `functions.o`, matches the placeholder with the actual address of `greet()`, and creates the final executable. If no definition exists, the linker outputs an error:

```text
undefined reference to `greet'
```

## Why We Need Header Files

Instead of manually writing `void greet(void);` at the top of every `.c` file that needs to call `greet()`, we store function declarations in a **header file** (`functions.h`):

```c
// functions.h
#ifndef FUNCTIONS_H
#ifndef FUNCTIONS_H
#define FUNCTIONS_H

void greet(void);

#endif
```

We then `#include` the header wherever it is needed:

```c
// main.c
#include "functions.h"

int main(void) {
	greet();
	return 0;
}
```

### What `#include` Actually Does

The preprocessor replaces `#include "functions.h"` by copying the literal text of `functions.h` directly into `main.c` before compilation starts. 

After preprocessing, `main.c` becomes:

```c
// main.c (post-preprocessing)
void greet(void);

int main(void) {
	greet();
	return 0;
}
```

Header files do not contain new language magic; they simply automate copy-pasting declarations, giving you a single central location to update when function signatures change.

## Why Not `#include "functions.c"` Directly?

If `#include` just copies text, you might wonder why we don't `#include "functions.c"` directly in `main.c`. 

While `#include "functions.c"` would textually paste the function implementation into `main.c` and allow it to compile, it causes serious problems in larger programs:

- **Duplicate Definition Errors**: If two different `.c` files `#include "functions.c"`, or if you compile both `main.c` and `functions.c` together with `gcc main.c functions.c`, the definition of `greet()` appears twice in object files. The linker will throw a `multiple definition of greet` error.
- **Slower Build Times**: Every file that includes `functions.c` must recompile the entire function implementation. Keeping code in separate `.c` files allows incremental compilation—recompiling only the files that changed.

## Common Misconceptions

### Header Files vs. Standard Libraries

When you write `#include <stdio.h>`, beginners often assume that the complete code for `printf` is included from `stdio.h`. 

In reality:
- `stdio.h` contains only **declarations** for standard I/O functions.
- The actual **implementations** live in pre-compiled C standard library binary files (e.g., `libc`), which the linker automatically connects to your program at build time.
