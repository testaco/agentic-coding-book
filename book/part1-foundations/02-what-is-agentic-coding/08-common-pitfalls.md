---
title: Common Pitfalls
chapter_title: What is Agentic Coding?
part: 1
chapter: 2
section: 8
version: '0.1'
date: '2026-01-28'
status: draft
author: Author Name
tags:
  - agentic-coding
  - definitions
  - foundations
  - ai-tools
related:
  - part1-foundations/01-renaissance-developer.md
  - part2-playbook/10-managing-ai-agents.md
  - part3-patterns-tools/toolchain/mcp-servers.md
requirements:
  - REQ-C003
  - REQ-C039
  - REQ-C040
  - REQ-C044
abstract: Section 8 of What is Agentic Coding?
---

As with any powerful tool, there are ways to misuse agentic coding. Here are the most common mistakes people make when starting out, and how to avoid them.

### Pitfall 1: Treating AI as Infallible

**The mistake**: Assuming AI-generated code is correct because it runs without errors or passes basic tests.

**The reality**: AI makes mistakes. It can:

- Write code with subtle bugs that only appear in edge cases
- Introduce security vulnerabilities (SQL injection, XSS, authentication bypass)
- Create inefficient implementations (O(n²) algorithms where O(n) exists)
- Miss requirements (code works but doesn't do what you actually need)
- Follow antipatterns (works but violates best practices)

**How to avoid**:

- **Always review AI-generated code** - Read every line you're adding to your codebase
- **Always test thoroughly** - Don't rely on AI-generated tests alone; add your own
- **Question assumptions** - If something looks unusual, investigate why
- **Use code review tools** - Both AI and human reviewers catch different types of issues
- **Trust but verify** - The AI is proposing implementations, not guaranteeing correctness

Treat AI output like you'd treat code from a capable but junior developer: probably good, possibly excellent, definitely requiring review.

### Pitfall 2: Skipping Requirements Definition

**The mistake**: Jumping straight to "build me a task management system" without defining what that means.

**The reality**: Vague requirements generate vague implementations. The AI will make assumptions that don't match your needs.

What does "task management" mean?

- Can tasks have subtasks?
- Can multiple users be assigned?
- What are the possible statuses?
- Can tasks have deadlines?
- What permissions model?
- What about recurring tasks?

Different answers lead to completely different implementations. The AI will pick something reasonable—but probably not what you wanted.

**How to avoid**:

- **Write specifications first** - Define requirements before requesting implementations
- **Use concrete examples** - "Tasks should work like Asana" is better than "task management"
- **Define acceptance criteria** - What does "done" look like specifically?
- **Iterate on requirements** - Start with a requirements conversation before implementation
- **Treat spec time as investment** - Every hour on requirements saves 5-10 hours fixing wrong implementations

The clearer your requirements, the better your results. Garbage in, garbage out is an iron law.

### Pitfall 3: Over-Relying on Autonomous Agents

**The mistake**: Giving autonomous agents big, open-ended tasks without checkpoints, then being surprised when the result doesn't match your vision.

**The reality**: Autonomous agents are powerful but need guardrails. They can execute plans but can't validate that the plan is right. They optimize for the goals you give them, not for unstated constraints or preferences.

Ask an agent to "refactor the authentication system" and it might:

- Rewrite everything when you wanted incremental changes
- Choose a different auth approach than your team knows
- Break backward compatibility with existing clients
- Introduce dependencies you don't want

All technically valid refactorings—but maybe not what you meant.

**How to avoid**:

- **Break tasks into checkpoints** - "Refactor auth" → "First show me the plan" → review → "Now implement phase 1" → review → continue
- **Provide constraints** - "Refactor auth without breaking existing clients and using only our current dependencies"
- **Review plans before execution** - Many agents can generate a plan for you to approve before they implement
- **Start small** - Test with small tasks before delegating large ones
- **Maintain oversight** - Check in regularly, don't just wait for completion

Think of autonomous agents like smart interns: capable of substantial work, but requiring supervision to ensure they're solving the right problem in the right way.

### Pitfall 4: Ignoring the Learning Curve

**The mistake**: Expecting to be immediately productive with AI tools without learning how to use them effectively.

**The reality**: Effective prompting is a skill. Like any skill, it requires learning and practice. Your first attempts will be clumsy. That's normal.

Common beginner mistakes:

- Prompts too vague: "make it better" (better how?)
- Prompts too ambitious: "build a complete e-commerce platform" (needs breakdown)
- Missing context: asking about "the user model" without showing which one
- Wrong level of detail: either too high-level or too prescriptive

**How to avoid**:

- **Expect iteration** - Your first prompt probably won't work perfectly. That's fine.
- **Learn from examples** - See how effective prompts are structured
- **Start simple** - Begin with small, well-defined tasks and build up
- **Develop patterns** - Notice what works and create templates for common requests
- **Be patient with yourself** - You're learning a new skill; improvement comes with practice

See Part 2: Managing AI Agents (coming soon) for detailed guidance on effective prompting and collaboration patterns.

### Pitfall 5: Forgetting Security and Best Practices

**The mistake**: Trusting AI to follow security best practices and write secure code without verification.

**The reality**: AI tools are trained on lots of code—including insecure code. They can suggest implementations with:

- SQL injection vulnerabilities
- XSS vulnerabilities
- Authentication bypass bugs
- Insecure password storage
- Missing input validation
- Excessive permissions
- Hardcoded secrets

They're not trying to write insecure code; they're reproducing patterns they've seen, which includes both good and bad patterns.

**How to avoid**:

- **Always review for security** - Specifically look for common vulnerabilities
- **Use AI code review tools** - They catch security issues humans might miss
- **Test security explicitly** - Don't assume it works; verify it
- **Follow secure coding checklists** - OWASP Top 10, CWE Top 25
- **Get security-focused review** - For sensitive code, have security expertise review it
- **Never skip authentication/authorization review** - These are common AI failure points

Security is not automatic. AI can help (security-focused review tools are excellent), but ultimate responsibility remains with you.
