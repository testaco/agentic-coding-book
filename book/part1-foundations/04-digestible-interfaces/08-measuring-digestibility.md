---
title: "Measuring Digestibility"
chapter_title: "Digestible Interfaces"
part: 1
chapter: 4
section: 8
version: "0.1"
date: "2026-01-29"
status: "draft"
author: "Brian Childress"
tags: ["interfaces", "metrics", "assessment", "best-practices"]
related:
  - part2-playbook/07-testing-strategies.md
  - part3-patterns-tools/testing/testing-ai-code.md
requirements:
  - REQ-C005
abstract: |
  [Placeholder: Practical metrics and heuristics for assessing interface
  digestibility - how to know if your interface is good enough for both
  human and AI users.]
---

# Measuring Digestibility

[Placeholder: How do you know if an interface is digestible? What are the
concrete, measurable indicators?

Present practical metrics and tests:

## Quantitative Metrics

### 1. Parameter Count

- **Guideline**: ≤5 parameters per function
- **Why**: Fits in working memory, reduces context tokens
- **Action**: If >5, consider parameter objects or splitting the function

### 2. Cyclomatic Complexity

- **Guideline**: ≤10 per function
- **Why**: Indicates cognitive complexity
- **Tool**: Most linters calculate this automatically

### 3. Lines of Code per Function

- **Guideline**: ≤50 lines for most functions
- **Why**: Should fit on one screen, AI can reason about in one chunk
- **Exception**: Some complex algorithms legitimately longer

### 4. Documentation-to-Code Ratio

- **Anti-pattern**: Interface requires 100 lines of docs for 20 lines of code
- **Goal**: Interface mostly self-documenting, docs provide context not mechanics
- **Test**: Can you explain the interface in 2-3 sentences?

## Qualitative Tests

### The Onboarding Test

**Test**: Show the interface to a new team member (or ask an AI agent).
Can they use it correctly without reading extensive documentation?

**Pass**: They understand purpose and usage from the signature and names
**Fail**: They need to read docs, ask questions, or make multiple attempts

### The Six-Month Test

**Test**: Can you (the author) explain the interface correctly after not
looking at it for six months?

**Pass**: You remember the purpose and key parameters
**Fail**: You need to re-read your own code/docs

### The AI Agent Test

**Test**: Ask Claude Code to use your interface without providing documentation.
Does it use it correctly?

**Pass**: AI infers correct usage from signature, names, and types
**Fail**: AI makes incorrect assumptions or asks for clarification

### The Error Message Test

**Test**: Intentionally misuse the interface. Are error messages helpful?

**Pass**: Errors clearly state the problem and how to fix it
**Fail**: Generic errors like "Invalid input" or stack traces without context

~3-4 pages with concrete examples and assessment checklists.]

## The "Explain It to a Rubber Duck" Heuristic

[Placeholder: If you can't explain the interface clearly to a rubber duck
(or AI assistant) in under 3 minutes, it's probably too complex.]

## Continuous Assessment

[Placeholder: Digestibility isn't one-time - reassess as code evolves:

- Code review checklist
- Linter rules for complexity metrics
- Regular refactoring to maintain simplicity]
