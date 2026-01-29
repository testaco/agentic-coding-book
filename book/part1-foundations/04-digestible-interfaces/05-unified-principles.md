---
title: "Unified Principles: Interfaces That Serve Both"
chapter_title: "Digestible Interfaces"
part: 1
chapter: 4
section: 5
version: "0.1"
date: "2026-01-29"
status: "draft"
author: "Brian Childress"
tags: ["interfaces", "design-principles", "foundations", "best-practices"]
related:
  - part1-foundations/03-architecture-principles/03-component-decomposition.md
  - part3-patterns-tools/architecture/interface-boundaries.md
requirements:
  - REQ-C005
abstract: |
  [Placeholder: The core design principles for creating interfaces that are
  digestible for both human developers and AI agents - with the key insight
  that serving one audience automatically serves the other.]
---

# Unified Principles: Interfaces That Serve Both

[Placeholder: The breakthrough insight - you don't need separate "human-friendly"
and "AI-friendly" interfaces. The principles that make interfaces digestible are
universal because the constraints are parallel.

Present the unified principles:

## 1. Single Responsibility

- Each interface does ONE thing well
- Easier for humans to understand purpose
- Easier for AI to reason about behavior
- Reduces cognitive/context load for both

## 2. Limited Parameters

- 5 or fewer parameters per function/method
- Humans can't track 10+ parameters in working memory
- AI wastes tokens explaining/tracking excessive parameters
- Use parameter objects for complex cases

## 3. Explicit Over Implicit

- No hidden state or side effects
- No "magic" behavior that requires external knowledge
- Humans appreciate predictability
- AI agents struggle with implicit dependencies

## 4. Self-Documenting Names

- Function/parameter names that explain themselves
- Reduces need for external documentation
- Humans read code more than write it
- AI agents can infer intent from good names

## 5. Consistent Patterns

- Follow established conventions
- Similar things should work similarly
- Reduces learning curve for humans
- Enables AI pattern matching and generalization

## 6. Fail-Fast with Clear Errors

- Validate inputs immediately
- Error messages explain what's wrong and how to fix it
- Humans debug faster with good errors
- AI agents can self-correct with informative feedback

~4-6 pages with concrete examples of each principle in action.]

## The Meta-Principle

[Placeholder: If you had to choose ONE guiding principle: Design interfaces
as if you'll need to explain them to someone (human or AI) who has never seen
your codebase before. If you can't explain it clearly in 2-3 sentences, the
interface is probably too complex.]
