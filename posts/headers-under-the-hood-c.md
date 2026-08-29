---
id: "2026-08-29"
title: "How Header Files Work Under the Hood (in C)"
description: "Explains how #include, header files, and function declarations all work together."
updated: "2026-08-29"
draft: false
tags: ["c", "programming"]
---

This tutorial explains what happens under the hood when you are working with a program which has multiple source files.

## Explaining the question

Let's say we have two files:

```c
// main.c

void greet(void) {
  // Empty
}
```

```c
// functions.c

#include <stdio.h>

void greet(void) {
  printf("Hi!");
}
```

Let's say we want to call the `greet` function from `functions.c` in `mainc.`. How do we do that?

If you are coming from other languages, you might say that we simply import the function from `functions.c` into `main.c` and call the function. But in C, what we do is very different.

In C, we first create a header file (typically named `functions.h` since it's a header for `functions.c`), which has the declaraction of `greet()`:

```c
// functions.h

void greet(void);
```

Then, we include the header, and call the function:

```c
// main.c

#include "functions.h"

int main() {
  greet();
}
```

Why can't we just `#include` `functions.c` directly? Why should we create a header file? Those are the questions that we are going to answer in this tutorial.

## How `#include` works

`#include "filename"` in C is extremely simple - **it literally copies the contents of the file named `filename` into that spot**. This occurs in the preprocessing step, which happens before compilation. That means, after preprocessing, `main.c` would look something like this:

```c
// main.c

void greet(void); // <-- Contents of functions.h

int main() {
  greet();
}
```

So, we don't really need `functions.h`. We can simply put the declaraction (`void greet(void);`) directly in `main.c`.

So, the question becomes **why we need to declare the functions**. Let's address that.

## Why we should declare functions

This is the command we run during compilation:

```bash
gcc -o program main.c functions.c
```

As you can see, we already include all source files here. So why should declarations be required? Shouldn't the compiler just figure it out?

To understand this, we need to look at how compilation actually works. It happens in 4 phases:

- Preprocessing: handles #include, macros, and conditional compilation
- Compilation: converts each preprocessed source file into assembly code
- Assembly: converts assembly into machine code, producing object files (.o or .obj)
- Linking: combines all object files into a single executable

As you can see, steps 2 and 3 happen separately for each source file. The compiler processes `main.c` and `functions.c` independently, without knowing what's in the other file.

When the compiler processes `main.c` and sees `greet();`, it must generate the correct machine code for that **call**. But without a declaration, it doesn't know:

- Whether `greet` is a function or something else
- What arguments it takes
- What type it returns

Different function signatures require different calling conventions (e.g., pushing arguments onto the stack, reserving space for return values). A declaration provides this missing information.

```c
void greet(void); // tells the compiler: function, no args, returns nothing
```

Now the compiler can generate the call correctly. Since the actual implementation is in `functions.c` (compiled separately), the compiler leaves a **relocation entry**: a placeholder that says "put the address of `greet` here later".

After compilation, we have:

- `main.o`: machine code with a placeholder for `greet()`
- `functions.o`: actual implementation of `greet()`

The linker:

1. Collects all object files
2. Finds each function definition
3. Replaces placeholders with actual addresses
4. Produces the final executable

If no definition is found, you get this error from the linker:

```
undefined reference to `greet'
```

## Why header files?

Instead of manually copying `void greet(void);` into every file that calls `greet()`, we put it in `functions.h` and `#include` it. This avoids duplication across many files and provides a single place to update when the function changes.

## Why can't we `#include` `"functions.c"`?

You might ask: "If `#include` just copies content, why not `#include` `"functions.c"` directly in `main.c`?"

If you did that, `main.c` after preprocessing would contain the entire implementation of `greet()`:

```c
// main.c (after preprocessing)

#include <stdio.h>

void greet(void) {
  printf("Hi!");
}

int main() {
  greet();
}
```

This would actually work! But it creates new problems. If you later include `functions.c` in another file, or if you compile with `gcc -o program main.c functions.c`, you'll get a linking error because `greet()` is defined twice. Also, every file that includes `functions.c` would recompile the entire implementation, making builds slower.

## A common misconception

This is the classic hello world program:

```c
#include <stdio.h>

int main() {
  printf("Hello world!");
}
```

This `stdio.h` header contains declarations for functions like `printf`, but the actual implementations are in the C standard library, which gets linked later. But beginners often think that they get the whole thing.

## Note

I said that `main.c` would look like this after preprocessing:

```c
// main.c

void greet(void); // <-- Contents of functions.h

int main() {
  greet();
}
```

Just to clarify, the preprocessor also removes comments and unnecessary spaces, and do a lot more. But I said like this to keep things simpler.
