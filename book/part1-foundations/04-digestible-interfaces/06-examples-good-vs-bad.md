---
title: "Examples: Good vs. Bad Interfaces"
chapter_title: "Digestible Interfaces"
part: 1
chapter: 4
section: 6
version: "0.1"
date: "2026-01-29"
status: "draft"
author: "Brian Childress"
tags: ["interfaces", "examples", "code-examples", "best-practices"]
related:
  - part1-foundations/03-architecture-principles/07-practical-application.md
requirements:
  - REQ-C005
abstract: |
  [Placeholder: Concrete before/after examples showing digestible vs. complex
  interfaces across different scenarios - API endpoints, functions, configuration,
  and data structures.]
---

# Examples: Good vs. Bad Interfaces

[Placeholder: Show concrete code examples comparing digestible and complex interfaces.

For each example:

1. Show the "bad" version (complex, hard to digest)
2. Explain what's wrong from human AND AI perspectives
3. Show the "good" version (digestible, clear)
4. Explain why it's better for both audiences

## Example 1: Function Signatures

**Bad**: Function with too many parameters

```python
def create_user(name, email, password, age, country, city,
                postal_code, phone, newsletter_opt_in,
                terms_accepted, privacy_accepted, referral_code,
                preferred_language, timezone, profile_image_url):
    # ... implementation
```

**Problems**:

- Humans: Can't remember parameter order, easy to mix up arguments
- AI: Consumes excessive context explaining each parameter
- Both: Impossible to use correctly without constant reference to docs

**Good**: Function with parameter object

```python
def create_user(user_data: UserRegistration):
    # ... implementation
```

Where `UserRegistration` is a well-documented data class with clear fields.

**Why better**:

- Humans: Single concept to understand, IDE autocomplete helps
- AI: Type hints provide self-documentation, less context needed
- Both: Type checking catches errors early

## Example 2: API Endpoints

[Bad vs Good REST API design example]

## Example 3: Configuration

[Bad vs Good configuration file structure example]

## Example 4: Data Structures

[Bad vs Good data model design example]

~4-6 pages with 4-5 detailed examples showing the difference.]

## Identifying Complexity in Your Own Code

[Placeholder: Red flags that an interface might be too complex:

- You need a cheat sheet to use it
- Onboarding docs spend pages explaining one interface
- Common usage patterns require 10+ lines of setup
- Error messages don't help you fix the problem
- You forget how to use it a month after writing it]
