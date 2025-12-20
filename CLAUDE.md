# Claude Code Usage Guide

**Project**: Agentic Coding Book - Product Development Workflow
**Purpose**: Guidelines for effectively using Claude Code as an AI pair programmer throughout the product development process

---

## Overview

This guide explains how to collaborate with Claude Code to execute the product development workflow defined in `genesis.md`. Claude Code excels at systematic, structured work when given clear context and specific instructions.

---

## Core Principles

### 1. Provide Context First
Always ensure Claude has read the relevant files before asking for work:

```
Read idea.md and genesis.md, then help me with T001
```

### 2. Reference Task IDs
Use specific task identifiers from genesis.md:

```
Let's work on T002.1 - developing clarifying questions
```

### 3. Request Incremental Progress
Break work into manageable chunks:

```
Complete T001.1, then wait for my review before proceeding
```

### 4. Leverage Claude's Strengths
- **Analysis**: "Analyze idea.md and identify any gaps or ambiguities"
- **Brainstorming**: "Generate 20 questions about the technical feasibility"
- **Structured Writing**: "Write the requirements in EARS notation"
- **Review**: "Review brief.md for consistency with idea.md and brainstorm.md"

---

## Workflow-Specific Guidance

### Phase 1: Understanding (T001)

**Best Prompts:**
```
Read idea.md and extract:
1. The core problem being solved
2. Target users and their needs
3. Key assumptions and constraints
```

```
Based on idea.md, what questions should we explore in the brainstorming phase?
```

**What to Expect:**
- Thorough analysis with direct quotes from idea.md
- Structured summaries of key insights
- Identification of ambiguities or missing information

**Tips:**
- Ask Claude to identify what's NOT said in idea.md
- Request comparison with similar products or approaches
- Have Claude flag assumptions that need validation

---

### Phase 2: Brainstorming (T002)

**Best Prompts:**
```
Generate 15-20 clarifying questions about:
- User needs and use cases
- Technical approach and architecture
- Scope and prioritization
- Risks and constraints
```

```
Based on the answers in brainstorm.md, what alternative approaches should we consider?
```

**What to Expect:**
- Comprehensive, thought-provoking questions
- Exploration of edge cases and alternatives
- Synthesis of discussions into structured insights

**Tips:**
- Use Claude to play devil's advocate
- Ask for pros/cons analysis of different approaches
- Request identification of risks and unknowns
- Have Claude organize scattered notes into coherent sections

**Interactive Approach:**
```
Let's brainstorm interactively. Ask me one question at a time,
wait for my answer, then ask follow-up questions based on my response.
```

---

### Phase 3: Product Brief (T003)

**Best Prompts:**
```
Read idea.md and brainstorm.md, then create a product brief
with the following sections:
1. Vision
2. Goals and Success Metrics
3. Target Users
4. Key Features (In-Scope)
5. Out of Scope
6. Constraints and Assumptions
```

```
Review the draft brief.md and check:
- Consistency with idea.md and brainstorm.md
- Clarity of vision and goals
- Completeness of scope definition
```

**What to Expect:**
- Well-structured, professional brief
- Clear prioritization and scope boundaries
- Synthesis of all prior work

**Tips:**
- Ask Claude to identify any conflicts between idea.md and brainstorm.md
- Request specific, measurable success metrics
- Have Claude flag vague or ambiguous statements
- Ask for the brief to be reviewed against standard product brief templates

---

### Phase 4: Requirements (T004)

**Best Prompts:**
```
Extract requirements from brief.md and write them in EARS notation.
Organize by:
1. User-facing functional requirements
2. System functional requirements
3. Non-functional requirements (performance, security, usability)
```

```
Review requirements.md and verify:
- All requirements use proper EARS format
- Each requirement is testable and unambiguous
- Full traceability to brief.md
```

**EARS Format Reminder:**
- **Ubiquitous**: "The system shall [capability]"
- **Event-driven**: "WHEN [trigger] the system shall [response]"
- **State-driven**: "WHILE [state] the system shall [capability]"
- **Optional**: "WHERE [feature enabled] the system shall [capability]"
- **Conditional**: "IF [condition] THEN the system shall [response]"

**What to Expect:**
- Precise, testable requirements
- Proper EARS syntax usage
- Clear organization and traceability

**Tips:**
- Ask Claude to identify ambiguous requirements
- Request examples of test cases for each requirement
- Have Claude check for completeness (missing error cases, edge cases)
- Ask for non-functional requirements to be quantified where possible

---

### Phase 5: Technical Design (T005)

**Best Prompts:**
```
Based on requirements.md, design the system architecture.
Include:
1. High-level architecture diagram (ASCII/text)
2. Component breakdown with responsibilities
3. Data models and schemas
4. API/interface specifications
5. Technology stack with rationale
```

```
Review design.md and verify:
- All requirements from requirements.md are addressed
- Architecture is appropriate for the scale and complexity
- Technology choices are justified
```

**What to Expect:**
- Comprehensive architectural design
- Clear component boundaries and interfaces
- Justified technology decisions
- ASCII diagrams for visualization

**Tips:**
- Ask Claude to identify architectural risks
- Request comparison of alternative architectures
- Have Claude explain trade-offs in technology choices
- Ask for design patterns that apply to this system

**Advanced Requests:**
```
Create a data flow diagram showing how [specific feature] works
```

```
Identify potential scalability bottlenecks in this design
```

---

### Phase 6: Implementation Planning (T006)

**Best Prompts:**
```
Break down design.md into implementation tasks for tasks.md.
Follow the same format as genesis.md with:
- Task IDs and prerequisites
- Clear descriptions
- Acceptance criteria
```

```
Review tasks.md and ensure:
- All design components are covered
- Dependencies are correctly identified
- Tasks are appropriately sized (not too large or small)
```

**What to Expect:**
- Detailed, actionable task breakdown
- Proper dependency mapping
- Clear acceptance criteria for each task

**Tips:**
- Ask Claude to identify which tasks can be parallelized
- Request estimation of task complexity (simple/medium/complex)
- Have Claude flag tasks that need more specification
- Ask for critical path identification

**Identifying and Implementing Skills (T006.3):**

Skills are custom Claude Code capabilities that accelerate development by automating repetitive tasks, generating boilerplate code, or enforcing patterns.

**When to Create Skills:**
```
Based on design.md and tasks.md, identify opportunities for Claude Code skills:
1. Code generation patterns that repeat across components
2. Diagram generation for documentation
3. Test scaffold generation
4. API client/server boilerplate
5. Database migration templates
6. Configuration file generation
```

**Skill Planning Prompt:**
```
Analyze tasks.md and design.md to identify 3-5 high-impact skills that would:
1. Reduce repetitive coding tasks
2. Enforce architectural patterns
3. Generate documentation or diagrams
4. Automate testing or validation
5. Speed up MVP development

For each skill, specify:
- Skill name and purpose
- What it automates
- Which tasks it helps with
- Expected time savings
```

**Implementing Skills:**
```
Create a skill for [specific purpose] in .claude/skills/[skill-name]/
Include:
- SKILL.md with clear workflow and examples
- EXAMPLES.md with concrete use cases
- VALIDATION.md if validation is needed
- Scripts or templates as needed
```

**Example Skills for Common Projects:**
- **API Endpoint Generator**: Scaffolds REST endpoints with validation, error handling, tests
- **Component Generator**: Creates UI components following project patterns
- **Database Migration**: Generates migration files with proper formatting
- **Test Suite Generator**: Creates unit/integration test scaffolds
- **Diagram Generator**: Creates Mermaid diagrams for architecture, flows, ERDs
- **Config Validator**: Validates configuration files against schemas
- **Code Reviewer**: Automated code review against project standards

**Validation:**
```
Review implemented skills and verify:
- Skills have proper SKILL.md with description and allowed-tools
- Examples demonstrate clear use cases
- Skills are referenced in relevant tasks in tasks.md
- Skills follow Claude Code best practices
```

---

## Advanced Techniques

### Multi-File Context Management

When working across multiple files:
```
Read idea.md, brainstorm.md, and brief.md.
Check if the requirements in requirements.md are consistent across all three.
Identify any gaps or conflicts.
```

### Iterative Refinement

Use Claude for multiple review passes:
```
Review brief.md for technical feasibility issues
```
(Make changes)
```
Now review brief.md for clarity and completeness
```

### Validation Chains

Create validation workflows:
```
For each requirement in requirements.md, verify:
1. It traces back to a feature in brief.md
2. It's addressed in design.md
3. It has corresponding tasks in tasks.md
```

### Template Generation

Ask Claude to create reusable templates:
```
Create a template for documenting API endpoints that I can reuse in design.md
```

---

## Common Pitfalls and Solutions

### Pitfall 1: Vague Requests
**Bad**: "Help me with the requirements"
**Good**: "Read brief.md and extract 10 functional requirements in EARS notation"

### Pitfall 2: Missing Context
**Bad**: "Add more features"
**Good**: "Based on brainstorm.md section 3, add the discussed features to brief.md in-scope section"

### Pitfall 3: Skipping Validation
**Bad**: Accepting first draft without review
**Good**: "Review this draft against the acceptance criteria in genesis.md T003"

### Pitfall 4: Ignoring Traceability
**Bad**: Creating requirements without linking to brief
**Good**: "For each requirement, add a comment showing which brief.md section it derives from"

---

## Progress Tracking with Claude

### Update Genesis Status
```
Update genesis.md to mark T001 as complete and T002 as in-progress
```

### Progress Reviews
```
Review genesis.md and summarize:
- What's completed
- What's in progress
- What's blocked
- Next recommended action
```

### Quality Checks
```
Before marking T003 complete, verify all acceptance criteria are met
```

---

## Best Practices Summary

1. **Always provide context** - Have Claude read relevant files first
2. **Be specific** - Reference task IDs, sections, and criteria
3. **Request validation** - Ask Claude to check work against criteria
4. **Iterate** - Use multiple review passes for quality
5. **Maintain traceability** - Link outputs to inputs explicitly
6. **Break down work** - One task or sub-task at a time
7. **Leverage Claude's analysis** - Ask for gaps, risks, and improvements
8. **Keep Claude updated** - Reference the latest file versions

---

## Example Session Flow

### Starting T001
```
User: Read idea.md and help me complete T001.1

Claude: [Reads and analyzes idea.md]

User: Now complete T001.2 - identify target users

Claude: [Identifies users based on analysis]

User: Finally, complete T001.3 - extract value proposition

Claude: [Extracts core value prop]

User: Review all T001 acceptance criteria. Are they all met?

Claude: [Reviews and confirms or identifies gaps]

User: Update genesis.md to mark T001 as complete
```

### Brainstorming Session
```
User: Let's work on T002. Read idea.md and generate 20 clarifying questions.

Claude: [Generates questions organized by category]

User: I'll answer questions 1-5 now... [provides answers]

Claude: Based on your answers, here are 5 follow-up questions...

User: [Continues dialogue]

User: Document our entire discussion in brainstorm.md following this structure: [provides structure]

Claude: [Creates organized brainstorm.md]
```

---

## Integration with Development Tools

### Version Control
```
After completing T003, create a git commit with message:
"Complete product brief (T003)"
```

### File Organization
```
Ensure all files follow this structure:
/docs/
  - idea.md
  - brainstorm.md
  - brief.md
  - requirements.md
  - design.md
  - tasks.md
```

### Documentation Standards
```
Review all .md files and ensure they follow consistent:
- Heading hierarchy
- Formatting style
- Cross-reference syntax
```

---

## Getting Help

If you encounter issues:

1. **Check genesis.md** - Verify you're following the workflow
2. **Review this guide** - Reference relevant sections
3. **Ask Claude for clarification** - "What information do you need to complete this task?"
4. **Break down requests** - Smaller, specific asks work better

---

## Conclusion

Claude Code is most effective when:
- Given clear, specific instructions
- Provided with necessary context (files to read)
- Asked to follow structured formats
- Used for validation and review
- Engaged iteratively

Follow this guide and the genesis.md workflow to systematically transform your product idea into a complete, implementable plan.
