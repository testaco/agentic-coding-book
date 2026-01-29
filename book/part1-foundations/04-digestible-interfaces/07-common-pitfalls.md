---
title: "Common Pitfalls in Interface Design"
chapter_title: "Digestible Interfaces"
part: 1
chapter: 4
section: 7
version: "0.1"
date: "2026-01-29"
status: "draft"
author: "Brian Childress"
tags: ["interfaces", "antipatterns", "pitfalls", "best-practices"]
related:
  - part1-foundations/03-architecture-principles/08-common-pitfalls.md
requirements:
  - REQ-C005
abstract: |
  [Placeholder: Common mistakes developers make when designing interfaces,
  why these mistakes hurt both human and AI users, and how to avoid them.]
---

# Common Pitfalls in Interface Design

[Placeholder: What mistakes do people make when designing interfaces?
How to recognize and avoid them? Based on real experiences and common misunderstandings.]

## Pitfall 1: Over-Engineering for Flexibility

**The Mistake**: Creating highly configurable interfaces with dozens of options,
flags, and modes "in case someone needs it someday."

**Why it hurts**:
- Humans: Overwhelmed by options, analysis paralysis, harder to test all combinations
- AI: Excessive tokens explaining all the options, difficulty choosing correct configuration
- Both: Maintenance burden increases exponentially with options

**How to avoid**:
- Start simple and extend only when actual need arises
- Use the YAGNI principle (You Aren't Gonna Need It)
- Prefer composition over configuration where possible

**Example**: [Concrete example of over-configured vs. simple interface]

## Pitfall 2: Boolean Traps

**The Mistake**: Using boolean parameters that are meaningless without consulting docs.

**Example**:
```python
user.update(True, False, True)  # What do these mean?!
```

**Why it hurts**:
- Humans: Impossible to understand at call site
- AI: No semantic meaning to reason about
- Both: Easy to swap arguments and introduce bugs

**How to avoid**:
- Use enums or named parameters
- Make intent explicit: `user.update(send_email=True, archive_old=False, notify_admin=True)`

## Pitfall 3: Implicit Dependencies

**The Mistake**: Interfaces that require external state or setup not visible in the signature.

**Example**: Function that silently depends on global configuration or environment variables.

**Why it hurts**:
- Humans: Mysterious failures, hard to test, difficult to debug
- AI: Can't infer requirements from interface alone
- Both: Breaks composability and reusability

**How to avoid**:
- Make dependencies explicit in function signatures
- Use dependency injection
- Document required preconditions prominently

## Pitfall 4: Inconsistent Naming

**The Mistake**: Similar operations have different names across the system.

**Examples**:
- `get_user()` in one module, `fetch_user()` in another, `retrieve_user()` in a third
- Mixing `delete`/`remove`/`destroy` for the same concept

**Why it hurts**:
- Humans: Cognitive overhead remembering which term is used where
- AI: Difficulty recognizing patterns and inferring behavior
- Both: Wastes time searching for the "right" function name

**How to avoid**:
- Establish and document naming conventions
- Use code review to enforce consistency
- Refactor mercilessly when inconsistencies creep in

## Pitfall 5: God Objects and Swiss Army Knife Interfaces

**The Mistake**: One interface that does everything.

**Why it hurts**:
- Humans: Violates single responsibility, hard to understand full behavior
- AI: Consumes excessive context, difficult to reason about side effects
- Both: Testing nightmare, change amplification

**How to avoid**:
- Apply Single Responsibility Principle aggressively
- Split into focused, composable interfaces
- See also: Component Decomposition chapter

[3-5 pages with detailed examples of each pitfall]
