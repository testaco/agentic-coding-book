---
title: "Measuring Digestibility"
chapter_title: "Digestible Interfaces"
part: 1
chapter: 4
section: 8
version: "1.0"
date: "2026-02-05"
status: "published"
author: "Chris Testa"
tags: ["interfaces", "metrics", "assessment", "best-practices"]
related:
  - part2-playbook/07-testing-strategies.md
  - part3-patterns-tools/testing/testing-ai-code.md
requirements:
  - REQ-C005
abstract: |
  Practical metrics and heuristics for assessing interface digestibility -
  how to know if your interface is good enough for both human and AI users.
---

# Measuring Digestibility

Principles are valuable, but how do you know when you've achieved digestible design? This section provides concrete metrics and tests you can apply to evaluate your interfaces.

## Quantitative Metrics

These metrics can be measured automatically, often with existing linting tools.

### 1. Parameter Count

**Guideline**: ≤5 parameters per function

**Why it matters**: Each parameter is an item to track in working memory or context. Beyond five, the probability of mistakes increases sharply.

**How to measure**: Most linters can flag functions with excessive parameters.

```python
# pylint: max-args=5
# eslint: max-params: [error, 5]
```

**Action threshold**:

- 1-3 parameters: Excellent
- 4-5 parameters: Acceptable
- 6-7 parameters: Review for improvement
- 8+ parameters: Refactor to use parameter objects

### 2. Cyclomatic Complexity

**Guideline**: ≤10 per function

**Why it matters**: Cyclomatic complexity measures the number of independent paths through code. Higher complexity means more conditions to track mentally.

**How to measure**:

```bash
# Python: radon
radon cc your_module.py -a

# JavaScript: eslint
# "complexity": ["error", 10]

# General: sonarqube
```

**Action threshold**:

- 1-5: Simple, easy to understand
- 6-10: Moderate, acceptable for most functions
- 11-20: Complex, consider splitting
- 21+: Very complex, refactor required

### 3. Lines of Code per Function

**Guideline**: ≤50 lines for most functions

**Why it matters**: A function should fit on one screen. If you need to scroll to understand it, you're exceeding visual working memory.

**How to measure**: Line count in any editor or linter.

**Action threshold**:

- 1-20 lines: Concise and focused
- 21-50 lines: Reasonable for complex logic
- 51-100 lines: Consider splitting
- 100+ lines: Almost certainly needs refactoring

**Exceptions**: Some algorithms legitimately require longer functions. The key is whether the length serves the task or results from poor organization.

### 4. Nesting Depth

**Guideline**: ≤3 levels of nesting

**Why it matters**: Each nesting level adds another condition to track. Deep nesting makes it hard to remember what conditions led to the current point.

**How to measure**:

```python
# Bad: 5 levels deep
def process(data):
    if data:                          # Level 1
        for item in data:             # Level 2
            if item.valid:            # Level 3
                for sub in item.children:  # Level 4
                    if sub.active:    # Level 5
                        # What conditions got us here?
                        pass
```

**The fix**: Use early returns, extract helper functions, or restructure the logic.

```python
# Better: Maximum 2 levels
def process(data):
    if not data:
        return

    valid_items = [item for item in data if item.valid]

    for item in valid_items:
        process_item(item)

def process_item(item):
    active_children = [c for c in item.children if c.active]
    for child in active_children:
        process_child(child)
```

### 5. Documentation-to-Code Ratio

**Guideline**: Interface should be mostly self-documenting

**Anti-pattern**: Needing 100 lines of documentation for 20 lines of interface code suggests the interface is too complex.

**What to measure**: If your docstring is longer than the function body, the function signature may not be clear enough.

```python
# Red flag: Massive docstring for small function
def process(data, mode, opts):
    """Process data according to mode and options.

    Args:
        data: The input data. Must be a dict with keys 'items',
              'metadata', and 'config'. The 'items' key must contain
              a list of dicts, each with 'id', 'value', and 'type'.
              The 'type' must be one of 'A', 'B', or 'C'. If 'type'
              is 'A', then 'value' must be an integer. If 'type'
              is 'B', then 'value' must be a string. If 'type' is 'C',
              then 'value' must be a list of floats...
              [continues for 50 more lines]

        mode: Processing mode. Can be 'fast', 'accurate', or 'balanced'.
              In 'fast' mode, some validations are skipped...
              [20 more lines]

        opts: Processing options dict. Keys include...
              [30 more lines]

    Returns:
        Processed result dict with keys...
        [20 more lines]
    """
    # 10 lines of actual code
    pass
```

**The fix**: Use typed data structures that carry their own documentation.

```python
# Better: Types document themselves
def process(data: ProcessInput, config: ProcessConfig) -> ProcessResult:
    """Process input data according to configuration."""
    pass

@dataclass
class ProcessInput:
    """Input data for processing."""
    items: List[ProcessItem]
    metadata: Metadata

@dataclass
class ProcessItem:
    """Single item to process."""
    id: str
    value: Union[int, str, List[float]]
    item_type: ItemType

class ItemType(Enum):
    A = "a"  # Integer values
    B = "b"  # String values
    C = "c"  # Float list values
```

## Qualitative Tests

Some aspects of digestibility can't be measured numerically. These tests provide practical assessment methods.

### The Onboarding Test

**Test**: Show the interface to someone unfamiliar with the codebase. Can they use it correctly on the first try?

**How to run**:

1. Find a colleague who hasn't seen this code
2. Show them the function signature and types
3. Ask them to write code that calls it correctly
4. Observe where they hesitate or make mistakes

**Pass criteria**:

- They understand the purpose from the name
- They can identify required vs optional parameters
- They can write a correct call without reading docs
- They know what to expect as a return value

**Fail indicators**:

- They ask "What does X mean?"
- They need to read the implementation
- They guess at parameter types or order
- They make mistakes that compile but fail at runtime

### The Six-Month Test

**Test**: Can you (the author) explain the interface correctly after not looking at it for six months?

**How to run**: This is a thought experiment during design. Ask yourself:

- In six months, will I remember what each parameter does?
- Will I remember the error cases?
- Will I remember the implicit assumptions?

If the answer is "probably not," the interface needs to be more explicit.

**Practical application**: When reviewing old code, notice which interfaces you can use immediately and which require re-reading. The difference often reveals digestibility issues.

### The AI Agent Test

**Test**: Ask an AI agent to use your interface without providing extensive documentation. Does it use it correctly?

**How to run**:

1. Provide the AI agent with only the function signature and type definitions
2. Ask it to write code that calls the function
3. Check if the generated code is correct

**Example prompt**:

```text
Given this function signature, write code that creates a user:

def create_user(request: CreateUserRequest) -> User:
    """Create a new user account."""
    pass

@dataclass
class CreateUserRequest:
    username: str
    password: str
    email: str
    profile: Optional[UserProfile] = None
```

**Pass criteria**:

- AI generates correct instantiation of request type
- AI uses appropriate values for required fields
- AI handles return type appropriately

**Fail indicators**:

- AI uses wrong types for parameters
- AI misses required fields
- AI makes incorrect assumptions about behavior

This test is particularly valuable because AI agents are unforgiving of ambiguity. If an AI struggles, humans will too.

### The Error Message Test

**Test**: Intentionally misuse the interface. Are the error messages helpful?

**How to run**:

1. Call with wrong types
2. Call with missing required fields
3. Call with invalid values
4. Call in wrong order (if relevant)

**Pass criteria**:

Error messages should answer:

- What went wrong?
- Why did it go wrong?
- How do I fix it?

**Good error**:

```text
ValidationError: CreateUserRequest.password must be at least 8 characters.
  Received: "abc" (3 characters)
  Fix: Provide a password with 8 or more characters.
```

**Bad error**:

```text
ValueError: Invalid input
```

### The Explain-It Heuristic

**Test**: Can you explain the interface clearly in 2-3 sentences?

**How to apply**: Before finalizing an interface, write out a brief explanation:

> "`create_user` takes a `CreateUserRequest` with username, password, and email, and returns a new `User`. It raises `ValidationError` if the request is invalid or `DuplicateUserError` if the email is taken."

If your explanation requires more than 2-3 sentences, or includes phrases like "but first you need to..." or "except when...", the interface may be too complex.

## Continuous Assessment

Digestibility isn't a one-time check—it should be continuously monitored.

### Code Review Checklist

Add these questions to your code review process:

- [ ] Can I understand this interface from signature and types alone?
- [ ] Are there more than 5 parameters?
- [ ] Are there any boolean parameters with unclear meaning?
- [ ] Does this depend on implicit state?
- [ ] Is this consistent with similar interfaces in the codebase?
- [ ] Would a new team member understand this?
- [ ] Would an AI agent generate correct usage?

### Automated Linting

Configure linters to enforce digestibility:

```yaml
# .pylintrc
[MESSAGES CONTROL]
max-args=5
max-locals=15
max-branches=12
max-statements=50

# eslintrc.json
{
  "rules": {
    "max-params": ["error", 5],
    "complexity": ["error", 10],
    "max-depth": ["error", 3],
    "max-lines-per-function": ["error", 50]
  }
}
```

### Regular Refactoring

Schedule time for interface improvement:

1. **During feature work**: When touching existing interfaces, improve them
2. **Technical debt sprints**: Dedicated time for interface cleanup
3. **Post-incident**: If complexity contributed to an issue, prioritize refactoring

## The Assessment Matrix

Use this matrix to evaluate interfaces:

| Metric | Excellent | Good | Needs Work | Critical |
|--------|-----------|------|------------|----------|
| Parameters | 1-3 | 4-5 | 6-7 | 8+ |
| Complexity | 1-5 | 6-10 | 11-15 | 16+ |
| Lines | 1-20 | 21-50 | 51-100 | 100+ |
| Nesting | 1-2 | 3 | 4 | 5+ |
| Onboarding | First try | Quick check | Read docs | Ask author |
| AI test | Correct | Minor issues | Major issues | Fails |
| Explain | 1 sentence | 2-3 sentences | Paragraph | Page |

An interface in the "Needs Work" or "Critical" columns for multiple metrics should be prioritized for improvement.

## Summary

Measuring digestibility requires both quantitative metrics (parameter count, complexity, lines) and qualitative tests (onboarding, AI agent, explanation). Neither alone is sufficient:

- Metrics catch obvious violations but miss semantic issues
- Tests reveal usability problems but are harder to automate

**The key insight**: If you measure nothing, you improve nothing. Pick the metrics and tests that fit your workflow and apply them consistently. Over time, you'll develop intuition for digestible design—but the metrics remain valuable as objective checks on that intuition.
