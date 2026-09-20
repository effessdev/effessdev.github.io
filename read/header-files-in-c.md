---
title: "Why we need header files in C"
description: "Explains how #include, header files, and function declarations all work together."
updated: "2026-08-29"
draft: false
tags: ["c", "programming"]
---

Suppose we have:

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

To call `greet` from `functions.c` in `main.c`, C programmers usually create a header file (typically `functions.h`, since it is the header for `functions.c`) containing the declaration:

```c
// functions.h

void greet(void);
```

Then include it and call the function:

```c
// main.c

#include "functions.h"

int main() {
  greet();
}
```

If you come from other languages, you might expect to import the function directly. Why not `#include` `functions.c`? Why use a header?

`#include "filename"` literally copies the file's contents into that spot during preprocessing, before compilation. After preprocessing, `main.c` looks like:

```c
// main.c

void greet(void); // <-- Contents of functions.h

int main() {
  greet();
}
```

So `functions.h` is not strictly needed here; you could put `void greet(void);` directly in `main.c`. Then why declare functions at all?

Build command:

```bash
gcc -o program main.c functions.c
```

All source files are present, but compilation has four phases:

- Preprocessing: handles `#include`, macros, and conditional compilation
- Compilation: each preprocessed source file becomes assembly
- Assembly: assembly becomes machine code, producing object files (`.o` or `.obj`)
- Linking: all object files combine into one executable

Phases 2 and 3 run separately per source file. The compiler processes `main.c` and `functions.c` independently, without knowing the other's contents. When compiling `main.c` and seeing `greet();`, it must generate correct machine code for the call. Without a declaration, it doesn't know:

- whether `greet` is a function or something else
- what arguments it takes
- what type it returns

Different signatures need different calling conventions (e.g., pushing arguments on the stack, reserving space for return values). A declaration provides this:

```c
void greet(void); // function, no arguments, returns nothing
```

Now the compiler can generate the call. Since `greet`'s implementation is in `functions.c`, compiled separately, the compiler leaves a **relocation entry**: a placeholder saying "put the address of `greet` here later." After compilation:

- `main.o`: machine code with a placeholder for `greet()`
- `functions.o`: actual implementation of `greet()`

The linker:

1. Collects all object files
2. Finds each function definition
3. Replaces placeholders with actual addresses
4. Produces the executable

If no definition is found:

```
undefined reference to `greet'
```

Instead of manually copying `void greet(void);` into every file that calls `greet()`, put it in `functions.h` and `#include` it. This avoids duplication and gives one place to update when the function changes.

Why not `#include "functions.c"` directly? Then after preprocessing, `main.c` contains the whole implementation:

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

This works, but causes problems. If you later include `functions.c` in another file, or compile with `gcc -o program main.c functions.c`, you get a linking error because `greet()` is defined twice. Also, every file including `functions.c` recompiles the entire implementation, making builds slower.

A common misconception: in

```c
#include <stdio.h>

int main() {
  printf("Hello world!");
}
```

`stdio.h` contains declarations for functions like `printf`; their implementations are in the C standard library, linked later. Beginners often think they get the whole thing.

> **Note:** the earlier preprocessed `main.c` example is simplified. The preprocessor also removes comments and unnecessary spaces, and does much more. It was written that way to keep things simpler.
