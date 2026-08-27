---
id: "f5b50a04-7375-4c4c-ba33-8f3bd136e761"
title: "Hello World!"
description: "My first blog post using Next.js and Markdown"
updated: "2026-08-27"
tags: ["introduction", "nextjs"]
---

## Welcome to my blog!

This is my first post using Next.js with Markdown. I'm excited to share my thoughts and projects with you. `code` will work.

### Code Example

```python
#!/usr/bin/env python3
"""
A comprehensive test program for syntax highlighting.
This program doesn't actually need to run - it's just for testing!
"""

import os
import sys
from dataclasses import dataclass
from typing import List, Optional, Dict, Any
from collections import defaultdict, Counter
import asyncio
import re

# Constants and configuration
MAX_RETRIES = 3
DEBUG_MODE = True
API_KEY = "sk-1234567890abcdef"
VERSION = (1, 5, 2)
PI = 3.14159

@dataclass
class User:
    """User class with type hints and decorators"""
    name: str
    age: int = 18
    email: Optional[str] = None
    tags: List[str] = None
    
    def __post_init__(self):
        self.tags = self.tags or []
    
    @property
    def is_adult(self) -> bool:
        return self.age >= 18
    
    @staticmethod
    def validate_email(email: str) -> bool:
        pattern = r'^[\w\.-]+@[\w\.-]+\.\w+$'
        return re.match(pattern, email) is not None

class DataProcessor:
    """Class demonstrating various Python features"""
    
    _instance = None
    __secret_key = "hidden_value"
    
    def __init__(self, data: List[Dict[str, Any]]):
        self.data = data
        self.processed = False
        self._cache = {}
    
    def __str__(self) -> str:
        return f"DataProcessor({len(self.data)} items)"
    
    def __repr__(self) -> str:
        return f"DataProcessor(data={self.data!r})"
    
    def __len__(self) -> int:
        return len(self.data)
    
    def __getitem__(self, key):
        return self.data[key]
    
    def __enter__(self):
        print("Entering context...")
        return self
    
    def __exit__(self, exc_type, exc_val, exc_tb):
        print("Exiting context...")
        return False
    
    @classmethod
    def create_empty(cls) -> 'DataProcessor':
        return cls([])
    
    @property
    def summary(self) -> Dict[str, int]:
        return Counter(item.get('type', 'unknown') for item in self.data)
    
    @summary.setter
    def summary(self, value):
        raise ValueError("Cannot set summary directly")
    
    @summary.deleter
    def summary(self):
        self._cache.clear()

async def fetch_data(url: str, params: Optional[Dict] = None) -> Dict:
    """Async function with error handling"""
    try:
        async with asyncio.timeout(5):
            # Simulating async operation
            await asyncio.sleep(1)
            response = {"status": "success", "url": url}
            if params:
                response["params"] = params
            return response
    except asyncio.TimeoutError as e:
        print(f"Timeout error: {e}")
        return {"status": "error", "message": str(e)}
    except Exception as e:
        print(f"Unexpected error: {type(e).__name__}: {e}")
        raise
    finally:
        print("Cleanup operations...")

def generator_function(data: List[int]):
    """Generator with yield statements"""
    for i, item in enumerate(data):
        if item % 2 == 0:
            yield i, item * 2
        else:
            yield i, item * 3
    
    # Multiple yields
    yield None, "END_OF_DATA"
    yield from [1, 2, 3]

async def main():
    """Main async function"""
    # List comprehension
    numbers = [x ** 2 for x in range(10) if x % 2 == 0]
    
    # Dictionary comprehension
    mapping = {str(x): x * 10 for x in numbers}
    
    # Set comprehension
    unique_values = {x % 3 for x in numbers}
    
    # Lambda function
    multiply = lambda x, y=2: x * y
    
    # Map, filter, reduce
    doubled = list(map(lambda x: x * 2, numbers))
    filtered = list(filter(lambda x: x > 10, doubled))
    
    # Ternary operator
    status = "active" if DEBUG_MODE else "inactive"
    
    # Walrus operator (Python 3.8+)
    if (n := len(numbers)) > 5:
        print(f"Many numbers: {n}")
    
    # F-strings with format specifiers
    print(f"PI: {PI:.2f}, Numbers: {numbers}")
    
    # Exception handling
    try:
        result = 10 / 0
    except ZeroDivisionError:
        print("Cannot divide by zero!")
    except (ValueError, TypeError) as e:
        print(f"Error: {e}")
    else:
        print(f"Result: {result}")
    finally:
        print("Done with exceptions")
    
    # Context manager
    with DataProcessor([{"type": "test"}]) as processor:
        print(f"Processing: {processor}")
    
    # Decorator usage
    @staticmethod
    def helper():
        pass
    
    # Bitwise operations
    bitwise = (0xFF & 0x0F) | (0b1010 ^ 0b1100)
    
    # String methods
    text = "Hello, World!"
    words = text.split(", ")
    upper = text.upper()
    replaced = text.replace("World", "Python")
    
    # Bytes and encoding
    encoded = "Hello".encode('utf-8')
    decoded = encoded.decode('utf-8')
    
    # Regular expressions
    pattern = re.compile(r'\d+')
    matches = pattern.findall("123 abc 456 def")
    
    return {"numbers": numbers, "mapping": mapping, "status": status}

if __name__ == "__main__":
    # Command line arguments
    args = sys.argv[1:]
    
    # Global variables
    global_variable = "accessible"
    
    # Class instantiation
    user = User("Alice", 25, "alice@example.com", ["admin", "user"])
    
    # Method chaining
    result = (DataProcessor.create_empty()
              .summary
              .get("test", 0))
    
    # Multiple assignment
    a, b, *rest = [1, 2, 3, 4, 5]
    x = y = z = 0
    
    # Comparison operators
    is_equal = (a == b)
    is_not_equal = (a != b)
    is_greater = (a > b)
    is_less_equal = (a <= b)
    is_identity = (a is None)
    is_not_identity = (a is not None)
    is_in = (a in [1, 2, 3])
    is_not_in = (a not in [4, 5, 6])
    
    # Logical operators
    logical_and = True and False
    logical_or = True or False
    logical_not = not True
    
    # Arithmetic operations
    addition = 1 + 2
    subtraction = 5 - 3
    multiplication = 4 * 5
    division = 10 / 2
    floor_division = 10 // 3
    modulo = 10 % 3
    exponent = 2 ** 10
    
    # Run async main
    asyncio.run(main())
    
    # Type hints and annotations
    def typed_function(x: int, y: str = "default") -> List[int]:
        return [x, len(y)]
    
    # Union types (Python 3.10+)
    def process_value(value: int | str | None) -> str:
        return str(value)
    
    print("Program complete!")
```

#### Note

*(Note: This was AI-generated, not written by me)*
