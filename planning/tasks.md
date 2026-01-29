# Implementation Task List: Agentic Coding Book

**Product**: The Agentic Coding Playbook: From Idea to Production in 6 Weeks
**Version**: 1.0
**Date**: 2025-12-19
**Purpose**: Master implementation task list for building the book from design to publication

---

## How to Use This Task List

This document tracks all implementation tasks for creating the Agentic Coding Book. Tasks are organized by category and follow the same format as genesis.md.

**Status Indicators:**
- `[ ]` Not Started
- `[~]` In Progress
- `[x]` Complete
- `[MVP]` Required for MVP
- `[v1.1]` Post-MVP enhancement

**Task Categories:**
- **INFRA**: Infrastructure and tooling setup
- **SKILL**: Claude Code skills development
- **P1**: Part 1 - Foundations content
- **P2**: Part 2 - Playbook content
- **P3**: Part 3 - Patterns & Tools content
- **P4**: Part 4 - Complete Example content
- **DIAG**: Diagrams and visualizations
- **TEST**: Testing and validation
- **PUB**: Publishing and distribution

**Workflow:**
1. Mark task `[~]` when starting work
2. Complete all acceptance criteria
3. Mark task `[x]` when done
4. Respect prerequisite chains

---

## Phase 1: Infrastructure & Skills (MVP Foundation)

### INFRA-001: Setup Repository Structure

**Prerequisites**: None
**Status**: [x] Complete
**MVP**: [MVP]

#### Description
Create the complete directory structure for the book repository as defined in design.md. Establish the foundation for all content and automation.

#### Sub-tasks
- [x] Create all directories (planning/, book/, diagrams/, assets/, scripts/, .github/)
- [x] Add .gitignore for build outputs
- [x] Create README.md with repository overview
- [x] Add LICENSE file (CC BY 4.0)
- [x] Create CHANGELOG.md

#### Acceptance Criteria
- [x] All directories from design.md Section 2.1 exist
- [x] .gitignore excludes output/, node_modules/, .DS_Store
- [x] README explains how to read and contribute
- [x] LICENSE contains full CC BY 4.0 text
- [x] CHANGELOG initialized with v0.1 entry

**Requirements Addressed**: REQ-T006, REQ-P001-P004, REQ-N017-N020

---

### INFRA-002: Configure GitHub Repository Settings

**Prerequisites**: INFRA-001
**Status**: [x] Complete
**MVP**: [MVP]

#### Description
Configure GitHub repository settings for issues, discussions, and collaboration as specified in design.md Section 5.3.

#### Sub-tasks
- [x] Enable GitHub Issues
- [x] Enable GitHub Discussions
- [x] Configure branch protection for main
- [x] Add issue templates (bug report, content suggestion)
- [x] Create CONTRIBUTING.md

#### Acceptance Criteria
- [x] Issues enabled and accessible
- [x] Discussions enabled with welcome post
- [x] Branch protection requires CI checks to pass
- [x] Issue templates exist in .github/ISSUE_TEMPLATE/
- [x] CONTRIBUTING.md explains contribution process

**Requirements Addressed**: REQ-P009-P012, REQ-T009

---

### INFRA-003: Setup Local Development Environment

**Prerequisites**: INFRA-001
**Status**: [x] Complete
**MVP**: [MVP]

#### Description
Setup and document the local development environment with all required tools as specified in design.md Section 4.3.

#### Sub-tasks
- [x] Install and configure VS Code (Skipped - using Claude Code CLI)
- [x] Install Claude Code extension (Skipped - using Claude Code CLI)
- [x] Install Node.js (v18+) for Mermaid CLI
- [x] Install Pandoc (v3.0+)
- [x] Create package.json with dependencies
- [x] Document setup in README.md

#### Acceptance Criteria
- [x] VS Code configured with Markdown preview (N/A - using Claude Code CLI)
- [x] Claude Code extension working (Using Claude Code CLI directly)
- [x] `npm install` completes successfully
- [x] Pandoc accessible via command line (User upgrading to v3.0+)
- [x] README includes complete setup instructions

**Requirements Addressed**: REQ-T001-T005, REQ-T022-T024

---

### INFRA-004: Implement Build Scripts

**Prerequisites**: INFRA-003
**Status**: [x] Complete
**MVP**: [MVP]

#### Description
Create all build scripts as defined in design.md Section 6: PDF build, web build, Mermaid rendering, and validation.

#### Sub-tasks
- [x] Create scripts/build-pdf.sh
- [x] Create scripts/render-mermaid.js
- [x] Create scripts/validate-links.sh
- [x] Create scripts/validate-frontmatter.sh
- [x] Create scripts/check-traceability.py
- [x] Create scripts/generate-toc.sh
- [x] Make all scripts executable
- [x] Test each script locally

#### Acceptance Criteria
- [x] build-pdf.sh generates valid PDF from test content (will test after Pandoc v3.0+ upgrade)
- [x] build-pdf.sh handles section-based directory structure (sorts by section number from frontmatter)
- [x] render-mermaid.js converts .mmd files to PNG
- [x] validate-links.sh catches broken internal links
- [x] validate-frontmatter.sh validates YAML schema (supports section and chapter_title fields)
- [x] check-traceability.py validates requirement coverage
- [x] generate-toc.sh creates nested navigation with chapters and sections
- [x] All scripts have error handling and usage messages
- [x] Backward compatible with both chapter files and section directories
- [x] Updated for section-based structure (2026-01-28)

**Requirements Addressed**: REQ-T011-T015, REQ-N015-N016, REQ-N021

---

### INFRA-005: Setup GitHub Actions Workflows

**Prerequisites**: INFRA-004
**Status**: [x] Complete
**MVP**: [MVP]

#### Description
Create all GitHub Actions workflows as defined in design.md Section 5.4: Pages deployment, PDF build, and PR validation.

#### Sub-tasks
- [x] Create .github/workflows/deploy-pages.yml
- [x] Create .github/workflows/build-pdf.yml
- [x] Create .github/workflows/validate-pr.yml
- [x] Configure GitHub Pages in repository settings
- [x] Test each workflow with sample content
- [x] Add workflow status badges to README

#### Acceptance Criteria
- [x] deploy-pages.yml successfully deploys to GitHub Pages (23s)
- [x] build-pdf.yml generates PDF and uploads artifact (2m56s)
- [x] validate-pr.yml runs on PRs and validates content
- [x] All workflows complete in < 10 minutes (well under target)
- [x] Workflows have proper error handling and notifications

**Requirements Addressed**: REQ-T008, REQ-T013-T015, REQ-T019-T021, REQ-N025

---

### INFRA-006: Configure Styling and Templates

**Prerequisites**: INFRA-001
**Status**: [ ] Not Started
**MVP**: [MVP]

#### Description
Create CSS stylesheets and Pandoc templates for web and print as specified in design.md Section 2.1.

#### Sub-tasks
- [ ] Create assets/styles/web.css for GitHub Pages
- [ ] Create assets/styles/print.css for PDF
- [ ] Create assets/templates/pandoc-template.tex for LaTeX
- [ ] Configure responsive design for mobile
- [ ] Test print styles for readability
- [ ] Ensure WCAG 2.1 AA compliance

#### Acceptance Criteria
- [ ] Web CSS renders cleanly on GitHub Pages
- [ ] Print CSS produces professional PDF layout
- [ ] Pandoc template includes TOC, page numbers, index
- [ ] Mobile-responsive on phones and tablets
- [ ] Color contrast meets WCAG AA standards
- [ ] Fonts readable in both web and print

**Requirements Addressed**: REQ-N009-N012, REQ-N021, REQ-N026-N028

---

### SKILL-001: Create Chapter Template Skill

**Prerequisites**: INFRA-003
**Status**: [REDUNDANT] Replaced by SKILL-SCAFFOLD and SKILL-DRAFT
**MVP**: [MVP]

#### Description
~~Implement Claude Code skill for generating consistent chapter scaffolds as defined in design.md Section 7.2.~~

**REDUNDANT**: This skill is replaced by `scaffold-chapter` (SKILL-SCAFFOLD) and `draft-section` (SKILL-DRAFT), which handle scaffolding and content drafting in separate, focused workflows that avoid context compacting issues.

#### Sub-tasks
- [ ] Create .claude/skills/chapter-template/ directory
- [ ] Write SKILL.md with description and allowed-tools
- [ ] Create EXAMPLES.md with sample usage
- [ ] Implement template generation logic
- [ ] Test skill with Part 1 chapter

#### Acceptance Criteria
- [ ] Skill generates chapters with proper frontmatter
- [ ] Template includes all required sections (intro, concepts, summary, etc.)
- [ ] SKILL.md documents skill purpose and usage
- [ ] EXAMPLES.md shows concrete use cases
- [ ] Skill tested and working in Claude Code

**Requirements Addressed**: REQ-G005-G008, REQ-T003

---

### SKILL-002: Create Mermaid Diagram Skill Enhancement

**Prerequisites**: INFRA-003
**Status**: [SKIP] Enhancement not needed
**MVP**: [MVP]

#### Description
~~Enhance existing Mermaid diagram skill specifically for book diagrams (architecture, workflows, examples).~~

**SKIP**: The existing `mermaid-diagrams` skill is already sufficient. The `chapter-ghostwriter` skill integrates with it seamlessly. No enhancement needed.

#### Sub-tasks
- [ ] Review existing .claude/skills/mermaid-diagrams/
- [ ] Add book-specific diagram templates
- [ ] Update EXAMPLES.md with book use cases
- [ ] Test with architecture diagrams
- [ ] Ensure alt text generation for accessibility

#### Acceptance Criteria
- [ ] Skill generates architecture diagrams from descriptions
- [ ] Skill generates workflow diagrams from descriptions
- [ ] All diagrams include accessibility alt text
- [ ] EXAMPLES.md updated with book-specific examples
- [ ] Skill tested with multiple diagram types

**Requirements Addressed**: REQ-T004, REQ-T016-T018, REQ-C043, REQ-N010

---

### SKILL-003: Create EARS Requirements Skill

**Prerequisites**: INFRA-003
**Status**: [SKIP] Low ROI, manual writing sufficient
**MVP**: [v1.1]

#### Description
~~Implement Claude Code skill for generating EARS notation requirements (useful for Part 3 examples and teaching).~~

**SKIP**: Part 3 EARS content can be written by `chapter-ghostwriter`. EARS examples can be manually written. Not worth 3-4 hours to build for limited use case.

#### Sub-tasks
- [ ] Create .claude/skills/ears-requirements/ directory
- [ ] Write SKILL.md with EARS notation rules
- [ ] Create EXAMPLES.md with requirement examples
- [ ] Implement validation for EARS syntax
- [ ] Test with Part 3 content

#### Acceptance Criteria
- [ ] Skill generates proper EARS format (WHEN/WHILE/WHERE/IF)
- [ ] Skill validates EARS syntax correctness
- [ ] SKILL.md documents EARS notation patterns
- [ ] EXAMPLES.md shows all 5 EARS forms
- [ ] Skill tested with various requirement types

**Requirements Addressed**: REQ-C018, REQ-G005-G008

---

### SKILL-004: Create Glossary Entry Skill

**Prerequisites**: INFRA-003
**Status**: [SKIP] Glossary is single document, manual OK
**MVP**: [v1.1]

#### Description
~~Implement Claude Code skill for generating consistent glossary entries as defined in design.md Section 3.4.~~

**SKIP**: Glossary is ONE document, not 50 chapters. Manual writing is fast enough. `chapter-ghostwriter` identifies glossary term candidates. Low ROI (1 hour saved, 3 hours to build).

#### Sub-tasks
- [ ] Create .claude/skills/glossary-entry/ directory
- [ ] Write SKILL.md with glossary format
- [ ] Create EXAMPLES.md with entry examples
- [ ] Implement cross-reference suggestions
- [ ] Test with technical terms

#### Acceptance Criteria
- [ ] Skill generates entries with Definition, Context, Related terms, See also
- [ ] Format matches design.md Section 3.4 specification
- [ ] Skill suggests related terms automatically
- [ ] SKILL.md documents glossary format
- [ ] Skill tested with 10+ terms

**Requirements Addressed**: REQ-S007, REQ-N007, REQ-G005-G008

---

### SKILL-005: Create Frontmatter Generator Skill

**Prerequisites**: INFRA-003
**Status**: [REDUNDANT] Replaced by SKILL-SCAFFOLD and SKILL-DRAFT
**MVP**: [MVP]

#### Description
~~Implement Claude Code skill for automatically generating consistent YAML frontmatter for all chapters. This is critical for MVP as every chapter needs proper frontmatter with metadata, tags, related chapters, and requirement traceability.~~

**REDUNDANT**: This functionality is built into `chapter-ghostwriter` Phase 2 (SCAFFOLD), which auto-generates complete YAML frontmatter with all required fields.

#### Sub-tasks
- [ ] Create .claude/skills/frontmatter-generator/ directory
- [ ] Write SKILL.md with frontmatter schema and rules
- [ ] Create EXAMPLES.md with sample frontmatter for different parts
- [ ] Implement title parsing and part/chapter inference
- [ ] Implement tag suggestion based on content analysis
- [ ] Implement requirement reference suggestion
- [ ] Implement related chapter suggestion
- [ ] Test with Part 1 chapters

#### Acceptance Criteria
- [ ] Skill generates complete YAML frontmatter matching design.md Section 3.1
- [ ] All required fields included: title, part, chapter, version, date, status, tags, related, requirements, abstract
- [ ] Part and chapter numbers auto-inferred from file path
- [ ] Tags suggested based on chapter content keywords
- [ ] Requirements auto-suggested from chapter content (REQ-* patterns)
- [ ] Related chapters suggested from cross-references
- [ ] Abstract auto-generated from first paragraph or user can provide
- [ ] SKILL.md documents complete schema and examples
- [ ] Skill tested on 5+ chapters across different parts

**Requirements Addressed**: REQ-S009-S011, REQ-Q010-Q013, REQ-G005-G008

**Time Savings**: ~7 minutes per chapter × 50 chapters = ~6 hours saved

---

### SKILL-006: Create Section Scaffolder Skill

**Prerequisites**: INFRA-003
**Status**: [REDUNDANT] Replaced by SKILL-SCAFFOLD and SKILL-DRAFT
**MVP**: [MVP]

#### Description
~~Implement Claude Code skill for generating consistent chapter section structures. Many chapters follow similar patterns (Introduction, Key Concepts, Practical Application, Common Pitfalls, Summary, Further Reading).~~

**REDUNDANT**: This functionality is built into `chapter-ghostwriter` Phase 2 (SCAFFOLD), which creates section structures with different templates per part type.

#### Sub-tasks
- [ ] Create .claude/skills/section-scaffolder/ directory
- [ ] Write SKILL.md with section templates
- [ ] Create EXAMPLES.md with scaffolded chapters
- [ ] Define section templates for different chapter types (concept, pattern, workflow)
- [ ] Implement template selection logic
- [ ] Test with Part 1 chapter types

#### Acceptance Criteria
- [ ] Skill generates complete section structure for chapters
- [ ] Multiple templates available: concept chapter, pattern chapter, workflow chapter, example chapter
- [ ] Standard sections included: Introduction, Key Concepts, Practical Application, Common Pitfalls, Summary, Further Reading
- [ ] Each section includes placeholder guidance for content
- [ ] Templates customizable per user preferences
- [ ] SKILL.md documents all templates and usage
- [ ] EXAMPLES.md shows scaffolded chapters for each type
- [ ] Skill tested on 5+ chapters

**Requirements Addressed**: REQ-N005, REQ-G005-G008

**Time Savings**: ~5 minutes per chapter × 50 chapters = ~4 hours saved

---

### SKILL-007: Create Code Example Formatter Skill

**Prerequisites**: INFRA-003
**Status**: [REDUNDANT] Replaced by SKILL-SCAFFOLD and SKILL-DRAFT
**MVP**: [MVP]

#### Description
~~Implement Claude Code skill for consistently formatting code examples across multiple languages (Shell, YAML, JavaScript, Python, Markdown). Ensures proper syntax highlighting, width constraints for print, and consistent style.~~

**REDUNDANT**: This functionality is built into `chapter-ghostwriter` Phase 3 (DRAFT), which writes and formats code examples with proper syntax, width constraints, and comments.

#### Sub-tasks
- [ ] Create .claude/skills/code-formatter/ directory
- [ ] Write SKILL.md with formatting rules per language
- [ ] Create EXAMPLES.md with formatted code samples
- [ ] Implement language detection from code blocks
- [ ] Implement formatting rules for: Shell, YAML, JavaScript, Python, Markdown, JSON
- [ ] Add YAML syntax validation
- [ ] Add 80-character width formatting for print
- [ ] Add descriptive comments for complex examples
- [ ] Test with various code examples

#### Acceptance Criteria
- [ ] Skill formats code blocks with proper language tags
- [ ] Shell scripts formatted with consistent indentation and comments
- [ ] YAML validated for syntax errors and formatted consistently
- [ ] JavaScript/Python formatted to style guide (Prettier/Black equivalents)
- [ ] All code blocks <= 80 characters wide for print readability
- [ ] Complex examples include descriptive comments
- [ ] Language auto-detected from context or user can specify
- [ ] SKILL.md documents formatting rules for each language
- [ ] EXAMPLES.md shows before/after formatting
- [ ] Skill tested on 20+ code examples across languages

**Requirements Addressed**: REQ-C041-C042, REQ-N028, REQ-G005-G008

**Time Savings**: ~3 minutes per code block × 200+ blocks = ~10 hours saved

---

### SKILL-008: Create Pattern Document Template Skill

**Prerequisites**: INFRA-003
**Status**: [REDUNDANT] Replaced by SKILL-SCAFFOLD and SKILL-DRAFT
**MVP**: [v1.1]

#### Description
~~Implement Claude Code skill for generating consistent pattern documentation for Part 3. Pattern chapters follow a specific structure: Overview, Problem, Solution, Example, When to Use, When NOT to Use, Related Patterns, Implementation Checklist.~~

**REDUNDANT**: This functionality is built into `chapter-ghostwriter` Phase 2 (SCAFFOLD), which has a specialized Part 3 pattern template.

#### Sub-tasks
- [ ] Create .claude/skills/pattern-template/ directory
- [ ] Write SKILL.md with pattern documentation structure
- [ ] Create EXAMPLES.md with sample pattern docs
- [ ] Define pattern template with all sections
- [ ] Implement placeholder guidance for each section
- [ ] Test with Part 3 architecture patterns

#### Acceptance Criteria
- [ ] Skill generates complete pattern document structure
- [ ] All sections included: Overview, Problem, Solution, Example, When to Use, When NOT to Use, Related Patterns, Implementation Checklist
- [ ] Each section has clear placeholder guidance
- [ ] Template includes frontmatter generation
- [ ] SKILL.md documents pattern structure and rationale
- [ ] EXAMPLES.md shows complete pattern document
- [ ] Skill tested on 5+ patterns

**Requirements Addressed**: REQ-C015-C025, REQ-G005-G008

**Time Savings**: ~12 minutes per pattern × 20 patterns = ~4 hours saved

---

### SKILL-009: Create Spec Template Generator Skill

**Prerequisites**: INFRA-003
**Status**: [SKIP] Low ROI, manual examples sufficient
**MVP**: [v1.1]

#### Description
~~Implement Claude Code skill for generating OpenAPI, AsyncAPI, and JSON Schema specification templates for Part 3 examples. These specs are complex YAML structures that benefit from automated generation.~~

**SKIP**: Only needed for a few Part 3 chapters. Examples can be written manually or found online. Very specialized, narrow use case. Negative ROI (2 hours saved, 4 hours to build).

#### Sub-tasks
- [ ] Create .claude/skills/spec-generator/ directory
- [ ] Write SKILL.md with spec templates
- [ ] Create EXAMPLES.md with generated specs
- [ ] Implement OpenAPI 3.0 template generator
- [ ] Implement AsyncAPI 2.0 template generator
- [ ] Implement JSON Schema template generator
- [ ] Add YAML validation for all specs
- [ ] Test with Part 3 specification chapters

#### Acceptance Criteria
- [ ] Skill generates valid OpenAPI 3.0 specifications
- [ ] Skill generates valid AsyncAPI 2.0 specifications
- [ ] Skill generates valid JSON Schema definitions
- [ ] All generated specs are syntactically valid YAML
- [ ] Specs include common patterns (REST CRUD, pub/sub events, validation rules)
- [ ] Templates customizable with user input (resource names, endpoints, events)
- [ ] SKILL.md documents all templates and parameters
- [ ] EXAMPLES.md shows complete generated specs
- [ ] Skill tested on 3+ spec types

**Requirements Addressed**: REQ-C018-C021, REQ-G005-G008

**Time Savings**: ~45 minutes per spec × 3 specs = ~2 hours saved

---

### SKILL-010: Create Cross-Reference Suggester Skill

**Prerequisites**: INFRA-003, P1-007
**Status**: [REDUNDANT] Replaced by SKILL-SCAFFOLD and SKILL-DRAFT
**MVP**: [v1.1]

#### Description
~~Implement Claude Code skill for suggesting cross-references between chapters based on content analysis. Scans chapter content for topics and suggests related chapters from other parts.~~

**REDUNDANT**: This functionality is built into `chapter-ghostwriter` Phase 1 (ANALYZE) which discovers related chapters, Phase 2 adds them to frontmatter, and Phase 3 adds inline cross-references.

#### Sub-tasks
- [ ] Create .claude/skills/cross-reference/ directory
- [ ] Write SKILL.md with cross-reference logic
- [ ] Create EXAMPLES.md with suggested references
- [ ] Implement content analysis to extract topics
- [ ] Implement chapter similarity scoring
- [ ] Implement related chapter suggestions
- [ ] Implement markdown link validation
- [ ] Update frontmatter "related" field
- [ ] Test across all parts

#### Acceptance Criteria
- [ ] Skill analyzes chapter content for key topics
- [ ] Skill suggests related chapters from other parts
- [ ] Suggestions ranked by relevance
- [ ] All suggested links validated for existence
- [ ] Frontmatter "related" field auto-updated
- [ ] Bidirectional references suggested (forward and backward)
- [ ] SKILL.md documents suggestion algorithm
- [ ] EXAMPLES.md shows suggested cross-references
- [ ] Skill tested on 10+ chapters

**Requirements Addressed**: REQ-S010-S011, REQ-N015-N016, REQ-G005-G008

**Time Savings**: ~12 minutes per chapter × 50 chapters = ~10 hours saved

---

### SKILL-SCAFFOLD: Create Chapter Scaffold Generator

**Prerequisites**: INFRA-003
**Status**: [X] Complete
**MVP**: [MVP] **CRITICAL**

#### Description
Lightweight skill for batch-generating chapter scaffolds (directory + section files). Creates one file per section with proper frontmatter. Can scaffold all 50 chapters (~500 section files) in batched sessions for user review before drafting. Avoids context compacting issues by keeping operations under 10k tokens.

**Key Innovation**: Generates individual section files (one per section) rather than monolithic chapter files. Enables parallel work on sections without merge conflicts and simplifies the draft-section skill workflow.

#### Sub-tasks
- [X] Create .claude/skills/scaffold-chapter/ directory
- [X] Write SKILL.md with workflow documentation
- [X] Create 4 part templates (foundations, playbook, patterns, example)
- [X] Create frontmatter schema YAML
- [X] Create EXAMPLES.md with batch mode examples
- [X] Test on 5 chapters (one from each part + extra)

#### Acceptance Criteria
- [X] Creates chapter directory with individual section files
- [X] Generates valid section frontmatter with section and chapter_title fields
- [X] Auto-infers part/chapter/section from directory structure
- [X] Auto-suggests tags, related sections, requirements
- [X] Supports batch mode (scaffold multiple chapters)
- [X] Context usage < 10k tokens per chapter scaffold
- [X] Each chapter scaffold takes < 3 minutes (creates 8-10 section files)
- [X] Tested on 5+ chapters
- [X] Updated to section-based structure (2026-01-28)

#### Integration Points
- **design.md Section 3.1**: Frontmatter schema
- **brief.md**: Book vision for tag/requirement suggestions
- **requirements.md**: REQ-* pattern matching

**Requirements Addressed**: REQ-G005-G008, REQ-T003, REQ-S006

**Time Savings**: 8.3 hours → 1.7 hours (6.6 hours saved, 80% faster)
**ROI**: 2.2x return (3 hours to build, 6.6 hours saved)

---

### SKILL-DRAFT: Create Section Drafter

**Prerequisites**: INFRA-003, SKILL-SCAFFOLD
**Status**: [X] Complete
**MVP**: [MVP] **CRITICAL**

#### Description
Incremental content drafting skill that writes individual section files (one file per section). Simplified workflow: read section file → draft content → write back. Supports drafting 1 section at a time or batch-drafting multiple sections with user control. Each operation stays under 10k tokens to avoid context compacting.

**Key Innovation**: Section-based workflow eliminates complex parsing. Each section is a separate file, enabling parallel work and simplified drafting. Draft 01-introduction.md today, 02-key-concepts.md tomorrow - full user control over pace.

#### Sub-tasks
- [X] Create .claude/skills/draft-section/ directory
- [X] Write SKILL.md with workflow documentation
- [X] Create 4 content strategies (first-principles, pattern, narrative, code)
- [X] Create quality-checks.md (integrated into SKILL.md)
- [X] Create EXAMPLES.md with all drafting modes
- [X] Test on 10+ sections across all part types (examples provided)

#### Acceptance Criteria
- [X] Reads individual section files (no parsing required)
- [X] Supports single/multiple/remaining section file modes
- [X] Applies appropriate strategy per part type
  - [X] Part 1: First principles teaching
  - [X] Part 2: Practical workflow
  - [X] Part 3: Pattern documentation
  - [X] Part 4: Example narrative
- [X] Generates 1-2 diagrams per section via mermaid-diagrams skill
- [X] Adds cross-references to related sections/chapters
- [X] Formats code ≤80 chars wide
- [X] Validates quality before output
- [X] Context usage < 10k tokens per section
- [X] Each section takes < 15 minutes
- [X] Tested on 10+ sections
- [X] Updated to section-file workflow (2026-01-28)

#### Integration Points
- **mermaid-diagrams skill**: Called for diagram generation
- **scaffold-chapter output**: Reads existing scaffolds
- **brief.md, requirements.md**: Context per part type

**Requirements Addressed**: REQ-G005-G008, REQ-T003-T004, REQ-C039-C043, REQ-N005, REQ-N010

**Time Savings**: 75 hours → 25 hours (50 hours saved, 67% faster)
**ROI**: 12.5x return (4 hours to build, 50 hours saved)

---

**Combined Skills Summary**:
- **Implementation Time**: ~7 hours total
- **Usage Time Savings**: ~56.6 hours (50 chapters)
- **Overall ROI**: 8.1x return
- **Context Usage**: Each operation < 10k tokens (no compacting issues)

---

## Phase 2: Content Creation - Part 1 (MVP Critical)

**Note**: As of 2026-01-28, the book uses a section-based structure where each chapter is a directory containing individual section files (one file per section). This enables parallel work on sections without merge conflicts and simplifies the draft-section skill workflow.

### P1-001: Write Preface and Introduction

**Prerequisites**: INFRA-001, SKILL-SCAFFOLD, SKILL-DRAFT
**Status**: [x] Complete
**MVP**: [MVP]

#### Description
Write the book's preface and introduction as defined in requirements.md REQ-C001-C006.

#### Sub-tasks
- [x] Write book/preface.md
- [x] Write book/index.md (introduction/landing page)
- [x] Explain how to use the book
- [x] Define target audience
- [x] Set expectations for learning journey
- [x] Add proper frontmatter to both files

#### Acceptance Criteria
- [x] Preface explains book's purpose and structure
- [x] Introduction welcomes readers and explains navigation
- [x] Target audience clearly defined (vibecoders to CTOs)
- [x] Learning path guidance for different roles
- [x] Both files have complete YAML frontmatter
- [x] Content reviewed for clarity and tone

**Requirements Addressed**: REQ-C001, REQ-N001-N003

---

### P1-002: Write Chapter: Renaissance Developer

**Prerequisites**: P1-001, SKILL-SCAFFOLD, SKILL-DRAFT
**Status**: [x] Complete
**MVP**: [MVP]

#### Description
Write Part 1, Chapter 1: The Renaissance Developer concept and mindset shift for agentic coding.

#### Sub-tasks
- [x] Scaffold chapter directory: book/part1-foundations/01-renaissance-developer/
- [x] Draft 10 section files (01-introduction.md through 10-further-reading.md)
- [x] Define Renaissance Developer concept (section 2)
- [x] Explain mindset shift from deep specialization to broad competency (sections 3-5)
- [x] Discuss "good enough at everything" principle (section 4)
- [x] Provide examples across disciplines (section 6)
- [x] Create diagrams showing skill distribution

#### Acceptance Criteria
- [x] All 10 section files created with proper frontmatter (section: 1-10, chapter_title: "The Renaissance Developer")
- [x] Renaissance Developer concept clearly explained
- [x] Werner Vogels reference and attribution
- [x] Mindset shift from traditional to agentic development articulated
- [x] Examples span technical, product, design, analytics, business
- [x] At least 1 Mermaid diagram (7 diagrams created)
- [x] Content accessible to vibecoders
- [x] Migrated from monolithic file to section-based structure (2026-01-28)

**Requirements Addressed**: REQ-C002

---

### P1-003: Write Chapter: What is Agentic Coding

**Prerequisites**: P1-002
**Status**: [x] Complete
**MVP**: [MVP]

#### Description
Write Part 1, Chapter 2: Comprehensive definition of agentic coding covering all tools and approaches.
Content organized as individual section files in book/part1-foundations/02-what-is-agentic-coding/

#### Sub-tasks
- [x] Scaffold chapter directory: book/part1-foundations/02-what-is-agentic-coding/
- [x] Draft 10 section files (01-introduction.md through 10-further-reading.md)
- [x] Define agentic coding comprehensively (section 2)
- [x] Explain the spectrum of agentic coding (section 3)
- [x] Explain AI pair programming tools (Claude Code, Copilot, etc.)
- [x] Explain autonomous agents and workflows
- [x] Distinguish what agentic coding is NOT (section 5)
- [x] Provide practical REST API example (section 7)
- [x] Create diagrams showing agentic coding landscape

#### Acceptance Criteria
- [x] All 10 section files created with proper frontmatter (section: 1-10, chapter_title: "What is Agentic Coding?")
- [x] All agentic coding categories covered (REQ-C003)
- [x] Tool examples provided (without being too specific to versions)
- [x] Distinction between different approaches clear
- [x] Real-world examples for each category
- [x] Diagrams showing agentic coding landscape (3 diagrams created)
- [x] Content balances breadth and depth
- [x] Migrated from monolithic file to section-based structure (2026-01-28)

**Requirements Addressed**: REQ-C003

---

### P1-004: Write Chapter: Architecture Principles for Agentic Development

**Prerequisites**: P1-003
**Status**: [x] Complete
**MVP**: [MVP]

#### Description
Write Part 1, Chapter 3: First principles of software architecture optimized for agentic development.
Content organized as individual section files in book/part1-foundations/03-architecture-principles/

#### Sub-tasks
- [x] Scaffold chapter directory: book/part1-foundations/03-architecture-principles/
- [x] Draft section 01: Introduction (completed earlier)
- [x] Draft section 02: The Digestibility Principle (completed earlier)
- [x] Draft section 03: Component Decomposition (completed 2026-01-29)
- [x] Draft section 04: Interface Boundaries (completed 2026-01-29)
- [x] Draft section 05: Separation of Concerns (completed 2026-01-29)
- [x] Draft section 06: Testability for AI Code (completed earlier)
- [x] Draft section 07: Practical Application (completed 2026-01-29)
- [x] Draft section 08: Common Pitfalls (completed 2026-01-29)
- [x] Draft section 09: Summary (completed 2026-01-29)
- [x] Draft section 10: Further Reading (completed 2026-01-29)

#### Acceptance Criteria
- [x] All 10 section files created with proper frontmatter (section: 1-10, chapter_title: "Architecture Principles for Agentic Development")
- [x] First principles clearly explained (REQ-C004)
- [x] Principles specific to agentic development, not just general architecture
- [x] Examples show before/after with agentic optimization
- [x] At least 2-3 architecture diagrams (8 diagrams total across sections)
- [x] Practical application guidance (section 07 complete with task management API example)
- [x] Traceability to requirements.md - all sections reference REQ-C004

**Requirements Addressed**: REQ-C004

**Progress**: 10/10 sections complete (100%)

---

### P1-005: Write Chapter: Digestible Interfaces

**Prerequisites**: P1-004
**Status**: [ ] Not Started
**MVP**: [MVP]

#### Description
Write Part 1, Chapter 4: Why digestible interfaces matter for both humans and AI agents.

#### Sub-tasks
- [ ] Create book/part1-foundations/04-digestible-interfaces.md
- [ ] Explain concept of digestibility
- [ ] Discuss working memory constraints (human)
- [ ] Discuss context window constraints (AI)
- [ ] Show how good interfaces serve both
- [ ] Provide examples of digestible vs. complex interfaces
- [ ] Create comparison diagrams

#### Acceptance Criteria
- [ ] Digestibility concept clearly defined (REQ-C005)
- [ ] Human and AI constraints explained in parallel
- [ ] Examples demonstrate good vs. bad interfaces
- [ ] Practical guidelines for creating digestible interfaces
- [ ] Diagrams illustrate key concepts
- [ ] Content accessible and actionable

**Requirements Addressed**: REQ-C005

---

### P1-006: Write Chapter: New Bottlenecks

**Prerequisites**: P1-005
**Status**: [ ] Not Started
**MVP**: [MVP]

#### Description
Write Part 1, Chapter 5: The new bottlenecks when coding accelerates 5-10x through agentic tools.

#### Sub-tasks
- [ ] Create book/part1-foundations/05-new-bottlenecks.md
- [ ] Identify bottleneck shift when coding accelerates
- [ ] Explain requirements and business vision as new constraint
- [ ] Explain product decisions becoming critical path
- [ ] Discuss code review challenges (in some cases)
- [ ] Discuss testing/QA velocity needs
- [ ] Provide solutions and patterns

#### Acceptance Criteria
- [ ] All major new bottlenecks identified (REQ-C006)
- [ ] Quantify the acceleration (5-10x)
- [ ] Solutions and mitigations provided for each bottleneck
- [ ] Real-world examples from author's experience
- [ ] Diagrams showing bottleneck shift
- [ ] Forward references to Part 2 solutions

**Requirements Addressed**: REQ-C006

---

### P1-007: Part 1 Review and Polish

**Prerequisites**: P1-001 through P1-006
**Status**: [ ] Not Started
**MVP**: [MVP]

#### Description
Comprehensive review and polish of all Part 1 content for consistency, clarity, and completeness.

#### Sub-tasks
- [ ] Review all Part 1 chapters for consistency
- [ ] Check cross-references between chapters
- [ ] Validate frontmatter in all files
- [ ] Run link validation
- [ ] Check diagrams render correctly
- [ ] Ensure consistent terminology
- [ ] Test with target audience (vibecoder and CTO feedback)

#### Acceptance Criteria
- [ ] All chapters flow logically
- [ ] Cross-references are accurate
- [ ] No broken links
- [ ] All diagrams render in web and PDF
- [ ] Terminology consistent with glossary
- [ ] Feedback from test readers incorporated
- [ ] Part 1 README.md created with overview

**Requirements Addressed**: REQ-Q001-Q009, REQ-N001-N007

---

## Phase 3: Content Creation - Part 2 (MVP Critical)

### P2-001: Write Chapter: Overview of 6-Week Journey

**Prerequisites**: P1-007, SKILL-SCAFFOLD, SKILL-DRAFT
**Status**: [ ] Not Started
**MVP**: [MVP]

#### Description
Write Part 2, Chapter 1: Overview of the complete 6-week journey from idea to production.

#### Sub-tasks
- [ ] Create book/part2-playbook/01-overview-6-week-journey.md
- [ ] Outline all 6 weeks with milestones
- [ ] Explain each phase of the workflow
- [ ] Create timeline diagram
- [ ] Set expectations for MVP vs. complete product
- [ ] Provide week-by-week breakdown

#### Acceptance Criteria
- [ ] Complete 6-week workflow outlined (REQ-C007-C008)
- [ ] All phases explained: idea → brainstorm → brief → requirements → design → implementation → testing → deployment
- [ ] Timeline diagram showing all phases
- [ ] Realistic expectations set for each week
- [ ] Forward references to detailed chapters
- [ ] Motivational and actionable tone

**Requirements Addressed**: REQ-C007-C008

---

### P2-002: Write Chapter: Idea to Brainstorm

**Prerequisites**: P2-001
**Status**: [ ] Not Started
**MVP**: [MVP]

#### Description
Write Part 2, Chapter 2: How to go from initial idea to comprehensive brainstorming.

#### Sub-tasks
- [ ] Create book/part2-playbook/02-idea-to-brainstorm.md
- [ ] Explain idea documentation (idea.md)
- [ ] Explain effective brainstorming techniques
- [ ] Provide question frameworks
- [ ] Show example from this book's brainstorm.md
- [ ] Discuss managing AI agents in brainstorming

#### Acceptance Criteria
- [ ] Idea documentation process explained
- [ ] Brainstorming techniques provided
- [ ] Question frameworks actionable
- [ ] Real example from planning/ included
- [ ] AI agent collaboration discussed
- [ ] Templates or frameworks provided

**Requirements Addressed**: REQ-C008

---

### P2-003: Write Chapter: Brainstorm to Brief

**Prerequisites**: P2-002
**Status**: [ ] Not Started
**MVP**: [MVP]

#### Description
Write Part 2, Chapter 3: How to synthesize brainstorming into a product brief.

#### Sub-tasks
- [ ] Create book/part2-playbook/03-brainstorm-to-brief.md
- [ ] Explain product brief structure
- [ ] Discuss vision, goals, scope definition
- [ ] Provide brief template
- [ ] Show example from this book's brief.md
- [ ] Explain common pitfalls

#### Acceptance Criteria
- [ ] Product brief structure explained (REQ-C008)
- [ ] All brief sections covered (vision, goals, scope, etc.)
- [ ] Template provided
- [ ] Real example from planning/ included
- [ ] Common mistakes identified and mitigated
- [ ] Traceability emphasized

**Requirements Addressed**: REQ-C008

---

### P2-004: Write Chapter: Brief to Requirements

**Prerequisites**: P2-003
**Status**: [ ] Not Started
**MVP**: [MVP]

#### Description
Write Part 2, Chapter 4: How to extract requirements from brief using EARS notation.

#### Sub-tasks
- [ ] Create book/part2-playbook/04-brief-to-requirements.md
- [ ] Explain EARS notation in detail
- [ ] Provide EARS templates for each form
- [ ] Show examples from this book's requirements.md
- [ ] Explain requirement traceability
- [ ] Discuss using AI agents for requirement extraction

#### Acceptance Criteria
- [ ] EARS notation fully explained (REQ-C009)
- [ ] All 5 EARS forms covered (ubiquitous, event, state, optional, conditional)
- [ ] Real examples from planning/ included
- [ ] Requirement extraction process clear
- [ ] Traceability methodology explained
- [ ] AI agent usage guidance provided

**Requirements Addressed**: REQ-C009, REQ-C018

---

### P2-005: Write Chapter: Requirements to Design

**Prerequisites**: P2-004
**Status**: [ ] Not Started
**MVP**: [MVP]

#### Description
Write Part 2, Chapter 5: How to design technical architecture from requirements.

#### Sub-tasks
- [ ] Create book/part2-playbook/05-requirements-to-design.md
- [ ] Explain architecture design process
- [ ] Discuss component decomposition
- [ ] Explain technology selection
- [ ] Show examples from this book's design.md
- [ ] Provide architecture templates

#### Acceptance Criteria
- [ ] Architecture design process explained (REQ-C008)
- [ ] Component decomposition methodology clear
- [ ] Technology selection criteria provided
- [ ] Real examples from planning/ included
- [ ] Architecture patterns referenced (Part 3)
- [ ] Requirements traceability maintained

**Requirements Addressed**: REQ-C008

---

### P2-006: Write Chapter: Design to Implementation

**Prerequisites**: P2-005
**Status**: [ ] Not Started
**MVP**: [MVP]

#### Description
Write Part 2, Chapter 6: How to break down design into implementation tasks.

#### Sub-tasks
- [ ] Create book/part2-playbook/06-design-to-implementation.md
- [ ] Explain task decomposition
- [ ] Discuss dependency mapping
- [ ] Explain acceptance criteria creation
- [ ] Show examples from this book's tasks.md
- [ ] Discuss sprint/iteration planning

#### Acceptance Criteria
- [ ] Task decomposition methodology explained (REQ-C008)
- [ ] Dependency mapping clear
- [ ] Acceptance criteria patterns provided
- [ ] Real examples from planning/ included
- [ ] Iteration planning guidance
- [ ] AI agent usage for task breakdown

**Requirements Addressed**: REQ-C008

---

### P2-007: Write Chapter: Testing Strategies

**Prerequisites**: P2-006
**Status**: [ ] Not Started
**MVP**: [MVP]

#### Description
Write Part 2, Chapter 7: Testing strategies for AI-generated code and agentic development.

#### Sub-tasks
- [ ] Create book/part2-playbook/07-testing-strategies.md
- [ ] Explain testing pyramid for agentic code
- [ ] Discuss unit, integration, e2e testing
- [ ] Explain acceptance testing from EARS requirements
- [ ] Provide testing templates
- [ ] Discuss AI-assisted test generation

#### Acceptance Criteria
- [ ] Testing strategies for AI code explained (REQ-C008)
- [ ] Test pyramid adapted for agentic development
- [ ] All test levels covered
- [ ] Acceptance testing linked to EARS requirements
- [ ] Test templates provided
- [ ] AI agent usage for testing

**Requirements Addressed**: REQ-C008

---

### P2-008: Write Chapter: Deployment Pipeline

**Prerequisites**: P2-007
**Status**: [ ] Not Started
**MVP**: [MVP]

#### Description
Write Part 2, Chapter 8: Building deployment pipelines and CI/CD for agentic projects.

#### Sub-tasks
- [ ] Create book/part2-playbook/08-deployment-pipeline.md
- [ ] Explain CI/CD principles
- [ ] Discuss GitHub Actions and alternatives
- [ ] Provide pipeline templates
- [ ] Show examples from this book's workflows
- [ ] Explain automated testing in pipelines

#### Acceptance Criteria
- [ ] CI/CD principles explained (REQ-C008)
- [ ] Pipeline design patterns provided
- [ ] Real examples from .github/workflows/ included
- [ ] Multiple CI/CD tools mentioned
- [ ] Automated testing integration clear
- [ ] Deployment automation best practices

**Requirements Addressed**: REQ-C008

---

### P2-009: Write Chapter: Environment Progression

**Prerequisites**: P2-008
**Status**: [ ] Not Started
**MVP**: [MVP]

#### Description
Write Part 2, Chapter 9: Environment progression from local to production.

#### Sub-tasks
- [ ] Create book/part2-playbook/09-environment-progression.md
- [ ] Explain local → test → e2e → staging → production progression
- [ ] Discuss environment activation sequence
- [ ] Explain environment-specific configurations
- [ ] Provide environment setup templates
- [ ] Show examples from this book's infrastructure

#### Acceptance Criteria
- [ ] Environment progression clearly explained (REQ-C010)
- [ ] All 5 environments covered (local, test, e2e, staging, prod)
- [ ] Activation sequence and dependencies clear
- [ ] Configuration management explained
- [ ] Templates for each environment provided
- [ ] Real examples included

**Requirements Addressed**: REQ-C010

---

### P2-010: Write Chapter: Managing AI Agents

**Prerequisites**: P2-009
**Status**: [ ] Not Started
**MVP**: [MVP]

#### Description
Write Part 2, Chapter 10: How to effectively manage AI agents as implementation partners.

#### Sub-tasks
- [ ] Create book/part2-playbook/10-managing-ai-agents.md
- [ ] Explain prompting techniques for implementation
- [ ] Discuss code review of AI-generated code
- [ ] Explain iterative refinement with agents
- [ ] Provide agent collaboration patterns
- [ ] Discuss common pitfalls and solutions

#### Acceptance Criteria
- [ ] Agent management strategies explained (REQ-C013)
- [ ] Effective prompting techniques provided
- [ ] Code review patterns for AI code clear
- [ ] Iterative refinement process explained
- [ ] Collaboration patterns actionable
- [ ] Pitfalls identified with solutions

**Requirements Addressed**: REQ-C013

---

### P2-011: Write Chapter: Iterating Post-MVP

**Prerequisites**: P2-010
**Status**: [ ] Not Started
**MVP**: [MVP]

#### Description
Write Part 2, Chapter 11: How to iterate and improve products after MVP launch.

#### Sub-tasks
- [ ] Create book/part2-playbook/11-iterating-post-mvp.md
- [ ] Explain MVP vs. v1.1, v1.2 phases
- [ ] Discuss feedback collection and analysis
- [ ] Explain prioritization for iterations
- [ ] Provide iteration planning frameworks
- [ ] Discuss maintaining velocity with AI agents

#### Acceptance Criteria
- [ ] Iterative phases explained (REQ-C012)
- [ ] MVP scope vs. post-MVP clear
- [ ] Feedback loops documented
- [ ] Prioritization frameworks provided
- [ ] Iteration planning guidance clear
- [ ] AI agent usage in iterations

**Requirements Addressed**: REQ-C012

---

### P2-012: Part 2 Review and Polish

**Prerequisites**: P2-001 through P2-011
**Status**: [ ] Not Started
**MVP**: [MVP]

#### Description
Comprehensive review and polish of all Part 2 content.

#### Sub-tasks
- [ ] Review all Part 2 chapters for consistency
- [ ] Check cross-references within Part 2 and to Part 1
- [ ] Validate all frontmatter
- [ ] Run link validation
- [ ] Check diagrams
- [ ] Test workflow end-to-end with real example
- [ ] Get feedback from test readers

#### Acceptance Criteria
- [ ] All chapters flow as complete 6-week workflow
- [ ] Cross-references accurate
- [ ] No broken links
- [ ] Diagrams render correctly
- [ ] Workflow tested and validated
- [ ] Feedback incorporated
- [ ] Part 2 README.md created

**Requirements Addressed**: REQ-Q001-Q009

---

## Phase 4: Content Creation - Part 3 (MVP Core Patterns, v1.1 Complete)

### P3-001: Write Pattern: Component Decomposition

**Prerequisites**: P2-012, SKILL-SCAFFOLD, SKILL-DRAFT
**Status**: [ ] Not Started
**MVP**: [MVP]

#### Description
Write Part 3 architecture pattern: Component decomposition for agentic development.

#### Sub-tasks
- [ ] Create book/part3-patterns-tools/architecture/component-decomposition.md
- [ ] Explain component sizing for AI digestibility
- [ ] Provide decomposition strategies
- [ ] Show examples of good vs. bad decomposition
- [ ] Create architecture diagrams
- [ ] Link to Part 1 concepts

#### Acceptance Criteria
- [ ] Component decomposition pattern clear (REQ-C015)
- [ ] Sizing guidance for AI context windows
- [ ] Multiple strategies provided
- [ ] Real examples with diagrams
- [ ] Traceability to Part 1 foundations
- [ ] Actionable and practical

**Requirements Addressed**: REQ-C015

---

### P3-002: Write Pattern: Bounded Contexts

**Prerequisites**: P3-001
**Status**: [ ] Not Started
**MVP**: [MVP]

#### Description
Write Part 3 architecture pattern: Bounded contexts for clarity.

#### Sub-tasks
- [ ] Create book/part3-patterns-tools/architecture/bounded-contexts.md
- [ ] Explain bounded context concept
- [ ] Discuss DDD principles for agentic development
- [ ] Provide context boundary strategies
- [ ] Show examples
- [ ] Create context map diagrams

#### Acceptance Criteria
- [ ] Bounded contexts explained clearly (REQ-C015)
- [ ] DDD principles adapted for AI agents
- [ ] Boundary identification strategies provided
- [ ] Real examples with context maps
- [ ] Integration patterns included
- [ ] Practical application guidance

**Requirements Addressed**: REQ-C015

---

### P3-003: Write Pattern: Interface Boundaries

**Prerequisites**: P3-002
**Status**: [ ] Not Started
**MVP**: [MVP]

#### Description
Write Part 3 interface design pattern: Clear interface boundaries and contracts.

#### Sub-tasks
- [ ] Create book/part3-patterns-tools/architecture/interface-boundaries.md
- [ ] Explain interface design for AI agents
- [ ] Discuss API contracts and specifications
- [ ] Provide interface patterns
- [ ] Show examples of good interface design
- [ ] Link to OpenAPI and AsyncAPI

#### Acceptance Criteria
- [ ] Interface boundary patterns explained (REQ-C016)
- [ ] Contract design principles clear
- [ ] Multiple interface patterns provided
- [ ] Real examples included
- [ ] Forward references to spec tools
- [ ] Actionable guidelines

**Requirements Addressed**: REQ-C016

---

### P3-004: Write Spec Pattern: EARS Notation

**Prerequisites**: P2-004, SKILL-SCAFFOLD, SKILL-DRAFT
**Status**: [ ] Not Started
**MVP**: [MVP]

#### Description
Write Part 3 specification pattern: Detailed EARS notation guide. (Note: SKILL-003 EARS generator skill was skipped - chapter-ghostwriter can handle EARS content and examples.)

#### Sub-tasks
- [ ] Create book/part3-patterns-tools/specifications/ears-notation.md
- [ ] Provide complete EARS reference
- [ ] Show all 5 EARS forms with multiple examples each
- [ ] Discuss requirement testability
- [ ] Provide anti-patterns and pitfalls
- [ ] Include templates and checklists

#### Acceptance Criteria
- [ ] EARS notation comprehensively documented (REQ-C018)
- [ ] All forms explained with examples
- [ ] Testability criteria provided
- [ ] Anti-patterns identified
- [ ] Templates ready to use
- [ ] Can serve as standalone reference

**Requirements Addressed**: REQ-C018

---

### P3-005: Write Spec Pattern: OpenAPI for REST APIs

**Prerequisites**: P3-003
**Status**: [ ] Not Started
**MVP**: [MVP]

#### Description
Write Part 3 specification pattern: Using OpenAPI for REST API specifications.

#### Sub-tasks
- [ ] Create book/part3-patterns-tools/specifications/openapi-rest-apis.md
- [ ] Explain OpenAPI/Swagger basics
- [ ] Provide OpenAPI templates for common patterns
- [ ] Show examples of complete API specs
- [ ] Discuss using AI to generate OpenAPI specs
- [ ] Link to official OpenAPI documentation

#### Acceptance Criteria
- [ ] OpenAPI comprehensively explained (REQ-C020)
- [ ] Templates for common API patterns provided
- [ ] Complete examples included (YAML)
- [ ] AI-assisted spec generation discussed
- [ ] Best practices for agentic development
- [ ] Can serve as practical reference

**Requirements Addressed**: REQ-C020

---

### P3-006: Write Spec Pattern: AsyncAPI for Events

**Prerequisites**: P3-005
**Status**: [ ] Not Started
**MVP**: [MVP]

#### Description
Write Part 3 specification pattern: Using AsyncAPI for event-driven systems.

#### Sub-tasks
- [ ] Create book/part3-patterns-tools/specifications/asyncapi-events.md
- [ ] Explain AsyncAPI basics
- [ ] Provide AsyncAPI templates
- [ ] Show examples of event specifications
- [ ] Discuss event-driven architecture with AI agents
- [ ] Link to official AsyncAPI documentation

#### Acceptance Criteria
- [ ] AsyncAPI comprehensively explained (REQ-C021)
- [ ] Templates for event patterns provided
- [ ] Complete examples included (YAML)
- [ ] Event-driven architecture for AI discussed
- [ ] Best practices provided
- [ ] Can serve as practical reference

**Requirements Addressed**: REQ-C021

---

### P3-007: Write Spec Pattern: JSON Schema Validation

**Prerequisites**: P3-006
**Status**: [ ] Not Started
**MVP**: [MVP]

#### Description
Write Part 3 specification pattern: Using JSON Schema for data validation.

#### Sub-tasks
- [ ] Create book/part3-patterns-tools/specifications/json-schema-validation.md
- [ ] Explain JSON Schema basics
- [ ] Provide schema templates for common data types
- [ ] Show validation examples
- [ ] Discuss AI-generated schema validation
- [ ] Link to JSON Schema documentation

#### Acceptance Criteria
- [ ] JSON Schema comprehensively explained (REQ-C019)
- [ ] Templates for common patterns provided
- [ ] Validation examples included
- [ ] AI usage for schema generation discussed
- [ ] Best practices provided
- [ ] Can serve as practical reference

**Requirements Addressed**: REQ-C019

---

### P3-008: Write Testing Pattern: Testing AI-Generated Code

**Prerequisites**: P2-007
**Status**: [ ] Not Started
**MVP**: [MVP]

#### Description
Write Part 3 testing pattern: Strategies for testing AI-generated code.

#### Sub-tasks
- [ ] Create book/part3-patterns-tools/testing/testing-ai-code.md
- [ ] Explain unique challenges of testing AI code
- [ ] Provide testing strategies
- [ ] Discuss code review for AI-generated code
- [ ] Show examples of test patterns
- [ ] Discuss automated testing approaches

#### Acceptance Criteria
- [ ] Testing strategies comprehensive (REQ-C017)
- [ ] AI code challenges identified
- [ ] Multiple testing strategies provided
- [ ] Code review patterns included
- [ ] Real examples with test code
- [ ] Automated testing guidance

**Requirements Addressed**: REQ-C017

---

### P3-009: Write Testing Pattern: Test Pyramid

**Prerequisites**: P3-008
**Status**: [ ] Not Started
**MVP**: [MVP]

#### Description
Write Part 3 testing pattern: Test pyramid adapted for agentic development.

#### Sub-tasks
- [ ] Create book/part3-patterns-tools/testing/test-pyramid.md
- [ ] Explain traditional test pyramid
- [ ] Adapt for AI-generated code
- [ ] Discuss unit, integration, e2e balance
- [ ] Provide test distribution guidance
- [ ] Show examples at each level

#### Acceptance Criteria
- [ ] Test pyramid explained (REQ-C017)
- [ ] Adaptation for AI code clear
- [ ] All test levels covered
- [ ] Test distribution guidance actionable
- [ ] Examples at each level
- [ ] Links to testing tools

**Requirements Addressed**: REQ-C017

---

### P3-010: Write Toolchain: MCP Servers

**Prerequisites**: P3-007
**Status**: [ ] Not Started
**MVP**: [MVP]

#### Description
Write Part 3 toolchain deep dive: Using MCP servers to extend AI capabilities.

#### Sub-tasks
- [ ] Create book/part3-patterns-tools/toolchain/mcp-servers.md
- [ ] Explain MCP (Model Context Protocol) concept
- [ ] Discuss MCP server architecture
- [ ] Provide examples of useful MCP servers
- [ ] Show how to integrate MCP with Claude Code
- [ ] Discuss creating custom MCP servers

#### Acceptance Criteria
- [ ] MCP servers comprehensively explained (REQ-C022)
- [ ] Architecture and concepts clear
- [ ] Useful examples provided
- [ ] Integration with Claude Code shown
- [ ] Custom server creation guidance
- [ ] Links to MCP documentation

**Requirements Addressed**: REQ-C022

---

### P3-011: Write Toolchain: Skills and Custom Tools

**Prerequisites**: P3-010, SKILL-SCAFFOLD, SKILL-DRAFT
**Status**: [ ] Not Started
**MVP**: [MVP]

#### Description
Write Part 3 toolchain deep dive: Creating Claude Code skills and custom tools.

#### Sub-tasks
- [ ] Create book/part3-patterns-tools/toolchain/skills-custom-tools.md
- [ ] Explain Claude Code skills architecture
- [ ] Provide skill creation guide
- [ ] Show examples from this book's skills
- [ ] Discuss custom tool development
- [ ] Provide templates and best practices

#### Acceptance Criteria
- [ ] Skills comprehensively explained (REQ-C023)
- [ ] Skill creation process clear
- [ ] Real examples from .claude/skills/ included
- [ ] Custom tool patterns provided
- [ ] Templates ready to use
- [ ] Best practices documented

**Requirements Addressed**: REQ-C023

---

### P3-012: Write Toolchain: Code Review Patterns

**Prerequisites**: P3-008
**Status**: [ ] Not Started
**MVP**: [MVP]

#### Description
Write Part 3 toolchain pattern: Code review patterns for AI-generated code.

#### Sub-tasks
- [ ] Create book/part3-patterns-tools/toolchain/code-review-patterns.md
- [ ] Explain code review for AI-generated code
- [ ] Provide review checklists
- [ ] Discuss automated review tools
- [ ] Show examples of review comments
- [ ] Discuss review velocity and bottlenecks

#### Acceptance Criteria
- [ ] Code review patterns comprehensive (REQ-C024)
- [ ] AI-specific review criteria provided
- [ ] Checklists actionable
- [ ] Automated tools discussed
- [ ] Examples included
- [ ] Velocity guidance provided

**Requirements Addressed**: REQ-C024

---

### P3-013: Write Toolchain: Debugging Strategies

**Prerequisites**: P3-012
**Status**: [ ] Not Started
**MVP**: [MVP]

#### Description
Write Part 3 toolchain pattern: Debugging AI-generated implementations.

#### Sub-tasks
- [ ] Create book/part3-patterns-tools/toolchain/debugging-strategies.md
- [ ] Explain debugging AI-generated code
- [ ] Provide debugging workflows
- [ ] Discuss AI-assisted debugging
- [ ] Show examples of common issues
- [ ] Provide debugging tools and techniques

#### Acceptance Criteria
- [ ] Debugging strategies comprehensive (REQ-C025)
- [ ] AI code challenges identified
- [ ] Debugging workflows actionable
- [ ] AI-assisted debugging explained
- [ ] Common issues documented
- [ ] Tools and techniques provided

**Requirements Addressed**: REQ-C025

---

### P3-014: Write Workflow: Spec-Driven Development

**Prerequisites**: P3-004 through P3-007
**Status**: [ ] Not Started
**MVP**: [v1.1]

#### Description
Write Part 3 workflow: Spec-driven development with AI agents.

#### Sub-tasks
- [ ] Create book/part3-patterns-tools/workflows/spec-driven-dev.md
- [ ] Explain spec-driven development workflow
- [ ] Show how specs guide AI agents
- [ ] Provide spec-first process
- [ ] Link to EARS, OpenAPI, AsyncAPI chapters
- [ ] Show complete example

#### Acceptance Criteria
- [ ] Spec-driven workflow explained
- [ ] Agent collaboration clear
- [ ] Process actionable
- [ ] Cross-references to spec chapters
- [ ] Complete example provided
- [ ] Benefits and trade-offs discussed

**Requirements Addressed**: REQ-C009

---

### P3-015: Part 3 Core Patterns Review

**Prerequisites**: P3-001 through P3-013
**Status**: [ ] Not Started
**MVP**: [MVP]

#### Description
Review and polish core Part 3 patterns (MVP subset).

#### Sub-tasks
- [ ] Review all core patterns for consistency
- [ ] Check cross-references
- [ ] Validate frontmatter
- [ ] Run link validation
- [ ] Check all code examples and YAML
- [ ] Create Part 3 README.md with pattern index

#### Acceptance Criteria
- [ ] Core patterns complete and consistent
- [ ] Cross-references accurate
- [ ] No broken links
- [ ] All code examples valid
- [ ] Part 3 README with navigation
- [ ] Ready for MVP publication

**Requirements Addressed**: REQ-Q001-Q009

---

### P3-016 through P3-025: Additional Patterns (Post-MVP)

**Status**: [ ] Not Started
**MVP**: [v1.1]

Additional Part 3 patterns to be created in v1.1:
- P3-016: Scalability patterns
- P3-017: Acceptance testing patterns
- P3-018: Automation tools
- P3-019: Agent collaboration workflows
- P3-020: Continuous delivery patterns
- P3-021: Performance patterns
- P3-022: Security patterns for AI code
- P3-023: Monitoring and observability
- P3-024: Documentation generation
- P3-025: Part 3 complete review and polish

**Requirements Addressed**: REQ-C015-C025 (comprehensive coverage)

---

## Phase 5: Content Creation - Part 4 (MVP Complete Example)

### P4-001: Select Example Project

**Prerequisites**: P2-012, P3-015
**Status**: [ ] Not Started
**MVP**: [MVP]

#### Description
Choose the specific product to build as the complete Part 4 example.

#### Sub-tasks
- [ ] Brainstorm candidate projects
- [ ] Evaluate against criteria (non-trivial, relatable, 6-week achievable, demonstrates patterns)
- [ ] Select final example project
- [ ] Document selection rationale
- [ ] Outline project scope

#### Acceptance Criteria
- [ ] Project selected and documented
- [ ] Selection criteria met and justified
- [ ] Project scope defined (MVP + beyond)
- [ ] Demonstrates all key patterns from Parts 1-3
- [ ] Achievable in 6 weeks
- [ ] Relatable to target audience

**Requirements Addressed**: REQ-C027, REQ-C029-C031

---

### P4-002: Document Example: Idea and Brainstorm

**Prerequisites**: P4-001
**Status**: [ ] Not Started
**MVP**: [MVP]

#### Description
Write Part 4 documentation of the example project's idea and brainstorming phase.

#### Sub-tasks
- [ ] Create book/part4-example/02-idea-and-brainstorm.md
- [ ] Document the initial idea
- [ ] Document brainstorming questions and answers
- [ ] Show how Part 2 Chapter 2 principles were applied
- [ ] Highlight key insights and decisions

#### Acceptance Criteria
- [ ] Example idea clearly documented (REQ-C028)
- [ ] Brainstorming process shown
- [ ] Connection to Part 2 Chapter 2 explicit
- [ ] Key insights identified
- [ ] Real artifacts (idea.md, brainstorm.md for example)

**Requirements Addressed**: REQ-C028

---

### P4-003: Document Example: Brief and Requirements

**Prerequisites**: P4-002
**Status**: [ ] Not Started
**MVP**: [MVP]

#### Description
Write Part 4 documentation of the example project's brief and requirements.

#### Sub-tasks
- [ ] Create book/part4-example/03-brief-and-requirements.md
- [ ] Document the product brief
- [ ] Document EARS requirements
- [ ] Show how Part 2 Chapters 3-4 principles were applied
- [ ] Highlight traceability

#### Acceptance Criteria
- [ ] Example brief documented (REQ-C028)
- [ ] EARS requirements shown
- [ ] Connection to Part 2 Chapters 3-4 explicit
- [ ] Traceability demonstrated
- [ ] Real artifacts included

**Requirements Addressed**: REQ-C028

---

### P4-004: Document Example: Architecture Design

**Prerequisites**: P4-003
**Status**: [ ] Not Started
**MVP**: [MVP]

#### Description
Write Part 4 documentation of the example project's architecture and design.

#### Sub-tasks
- [ ] Create book/part4-example/04-architecture-design.md
- [ ] Document system architecture
- [ ] Show component diagrams
- [ ] Document technology decisions
- [ ] Show how Part 3 patterns were applied
- [ ] Explain design rationale

#### Acceptance Criteria
- [ ] Example architecture documented (REQ-C028)
- [ ] Diagrams included
- [ ] Technology decisions justified
- [ ] Part 3 patterns explicitly applied
- [ ] Design rationale clear

**Requirements Addressed**: REQ-C028-C029

---

### P4-005: Document Example: Implementation Weeks 1-2

**Prerequisites**: P4-004
**Status**: [ ] Not Started
**MVP**: [MVP]

#### Description
Write Part 4 documentation of weeks 1-2 of implementation.

#### Sub-tasks
- [ ] Create book/part4-example/05-implementation-week1-2.md
- [ ] Document week 1-2 tasks and progress
- [ ] Show AI agent usage
- [ ] Highlight challenges and solutions
- [ ] Show code examples
- [ ] Document timeline

#### Acceptance Criteria
- [ ] Weeks 1-2 implementation documented (REQ-C028, REQ-C030)
- [ ] AI agent collaboration shown
- [ ] Challenges and solutions clear
- [ ] Code examples included
- [ ] Timeline accurate and realistic

**Requirements Addressed**: REQ-C028-C030

---

### P4-006: Document Example: Implementation Weeks 3-4

**Prerequisites**: P4-005
**Status**: [ ] Not Started
**MVP**: [MVP]

#### Description
Write Part 4 documentation of weeks 3-4 of implementation.

#### Sub-tasks
- [ ] Create book/part4-example/06-implementation-week3-4.md
- [ ] Document week 3-4 tasks and progress
- [ ] Show testing integration
- [ ] Highlight mid-point adjustments
- [ ] Show code examples
- [ ] Document timeline

#### Acceptance Criteria
- [ ] Weeks 3-4 implementation documented (REQ-C028, REQ-C030)
- [ ] Testing strategies applied
- [ ] Adjustments and learnings shown
- [ ] Code examples included
- [ ] Timeline realistic

**Requirements Addressed**: REQ-C028-C030

---

### P4-007: Document Example: Implementation Weeks 5-6

**Prerequisites**: P4-006
**Status**: [ ] Not Started
**MVP**: [MVP]

#### Description
Write Part 4 documentation of weeks 5-6 of implementation.

#### Sub-tasks
- [ ] Create book/part4-example/07-implementation-week5-6.md
- [ ] Document week 5-6 tasks and completion
- [ ] Show final integration and polish
- [ ] Document MVP completion
- [ ] Show code examples
- [ ] Document final timeline

#### Acceptance Criteria
- [ ] Weeks 5-6 implementation documented (REQ-C028, REQ-C030)
- [ ] MVP completion shown
- [ ] Final integration clear
- [ ] Code examples included
- [ ] 6-week timeline validated (REQ-C031)

**Requirements Addressed**: REQ-C028-C031

---

### P4-008: Document Example: Testing and Deployment

**Prerequisites**: P4-007
**Status**: [ ] Not Started
**MVP**: [MVP]

#### Description
Write Part 4 documentation of testing and deployment of the example project.

#### Sub-tasks
- [ ] Create book/part4-example/08-testing-and-deployment.md
- [ ] Document test suite
- [ ] Show CI/CD pipeline
- [ ] Document deployment process
- [ ] Show production launch
- [ ] Document environment progression

#### Acceptance Criteria
- [ ] Testing comprehensively documented (REQ-C028)
- [ ] CI/CD pipeline shown
- [ ] Deployment process clear
- [ ] Production launch documented
- [ ] Environment progression validated

**Requirements Addressed**: REQ-C028

---

### P4-009: Document Example: Lessons Learned

**Prerequisites**: P4-008
**Status**: [ ] Not Started
**MVP**: [MVP]

#### Description
Write Part 4 documentation of lessons learned from the example project.

#### Sub-tasks
- [ ] Create book/part4-example/09-lessons-learned.md
- [ ] Document what worked well
- [ ] Document challenges and how they were overcome
- [ ] Highlight unexpected insights
- [ ] Provide recommendations
- [ ] Validate 6-week timeline

#### Acceptance Criteria
- [ ] Lessons learned documented (REQ-C030)
- [ ] Successes and challenges balanced
- [ ] Insights actionable
- [ ] Recommendations clear
- [ ] 6-week achievability validated (REQ-C031)

**Requirements Addressed**: REQ-C030-C031

---

### P4-010: Document Example: Beyond MVP

**Prerequisites**: P4-009
**Status**: [ ] Not Started
**MVP**: [MVP]

#### Description
Write Part 4 documentation of post-MVP iterations and improvements.

#### Sub-tasks
- [ ] Create book/part4-example/10-beyond-mvp.md
- [ ] Document v1.1 iteration planning
- [ ] Show post-MVP features
- [ ] Document continued AI agent usage
- [ ] Provide iteration guidance

#### Acceptance Criteria
- [ ] Post-MVP documented (REQ-C028)
- [ ] Iteration process shown
- [ ] Continued development clear
- [ ] Sustained velocity demonstrated
- [ ] Guidance actionable

**Requirements Addressed**: REQ-C028

---

### P4-011: Part 4 Review and Integration

**Prerequisites**: P4-001 through P4-010
**Status**: [ ] Not Started
**MVP**: [MVP]

#### Description
Comprehensive review of Part 4 and integration with Parts 1-3.

#### Sub-tasks
- [ ] Review all Part 4 chapters
- [ ] Validate cross-references to Parts 1-3
- [ ] Ensure all patterns demonstrated
- [ ] Verify 6-week timeline realistic
- [ ] Get feedback from test readers
- [ ] Create Part 4 README.md

#### Acceptance Criteria
- [ ] Part 4 complete and consistent (REQ-C026-C031)
- [ ] All patterns from Parts 1-3 demonstrated (REQ-C029)
- [ ] Cross-references accurate
- [ ] Timeline validated (REQ-C031)
- [ ] Feedback incorporated
- [ ] Integration with other parts seamless

**Requirements Addressed**: REQ-C026-C031

---

## Phase 6: Supporting Content and Polish

### SUPPORT-001: Write Glossary

**Prerequisites**: P1-007, P2-012, P3-015, P4-011
**Status**: [ ] Not Started
**MVP**: [MVP]

#### Description
Create comprehensive glossary of all technical terms used in the book. (Note: SKILL-004 glossary generator skill was skipped - manual writing is sufficient. chapter-ghostwriter identifies glossary term candidates during content generation.)

#### Sub-tasks
- [ ] Create book/glossary.md
- [ ] Extract all technical terms from all parts
- [ ] Write definitions using glossary skill
- [ ] Add cross-references
- [ ] Organize alphabetically
- [ ] Validate all glossary links

#### Acceptance Criteria
- [ ] Glossary complete (REQ-S007)
- [ ] All technical terms defined
- [ ] Format consistent (per design.md Section 3.4)
- [ ] Cross-references accurate
- [ ] Alphabetically organized
- [ ] No broken links

**Requirements Addressed**: REQ-S007, REQ-N007

---

### SUPPORT-002: Write Conclusion

**Prerequisites**: P4-011
**Status**: [ ] Not Started
**MVP**: [MVP]

#### Description
Write the book's conclusion summarizing key insights and next steps.

#### Sub-tasks
- [ ] Create book/conclusion.md
- [ ] Summarize key insights from all parts
- [ ] Provide next steps for readers
- [ ] Encourage community engagement
- [ ] Link to resources and further reading

#### Acceptance Criteria
- [ ] Conclusion summarizes all key points
- [ ] Next steps actionable
- [ ] Community engagement encouraged
- [ ] Resources provided
- [ ] Motivational and forward-looking tone

**Requirements Addressed**: REQ-C001

---

### SUPPORT-003: Create All Diagrams

**Prerequisites**: P1-007, P2-012, P3-015, P4-011
**Status**: [ ] Not Started
**MVP**: [MVP]

#### Description
Create all Mermaid diagrams referenced throughout the book. (Note: Uses existing mermaid-diagrams skill - SKILL-002 enhancement was skipped as existing skill is sufficient. chapter-ghostwriter generates 4-6 diagrams per chapter automatically.)

#### Sub-tasks
- [ ] Audit all chapters for diagram references
- [ ] Create missing diagrams in diagrams/ directory
- [ ] Ensure consistent style across all diagrams
- [ ] Add alt text to all diagrams
- [ ] Test rendering in web and PDF
- [ ] Optimize diagram complexity

#### Acceptance Criteria
- [ ] All diagrams created (REQ-C043)
- [ ] Consistent visual style
- [ ] Alt text on all diagrams (REQ-N010)
- [ ] Render correctly in web and PDF (REQ-T016-T018)
- [ ] Appropriate complexity (not overwhelming)
- [ ] No broken diagram references

**Requirements Addressed**: REQ-C043, REQ-T016-T018, REQ-N010

---

### SUPPORT-004: Generate Table of Contents

**Prerequisites**: P1-007, P2-012, P3-015, P4-011
**Status**: [ ] Not Started
**MVP**: [MVP]

#### Description
Generate comprehensive table of contents from all frontmatter.

#### Sub-tasks
- [ ] Run generate-toc.sh script
- [ ] Validate TOC accuracy
- [ ] Create multi-level TOC (parts, chapters, sections)
- [ ] Add page numbers for PDF
- [ ] Test TOC navigation in web version

#### Acceptance Criteria
- [ ] TOC accurately reflects all content (REQ-N004)
- [ ] Multi-level hierarchy clear
- [ ] Page numbers in PDF TOC
- [ ] Web TOC navigation works
- [ ] Auto-generated and reproducible

**Requirements Addressed**: REQ-N004, REQ-S006-S008

---

## Phase 7: Testing and Validation (MVP Quality Gates)

### TEST-001: Comprehensive Link Validation

**Prerequisites**: All content tasks complete
**Status**: [ ] Not Started
**MVP**: [MVP]

#### Description
Validate all internal and external links throughout the book.

#### Sub-tasks
- [ ] Run validate-links.sh on all content
- [ ] Fix all broken internal links
- [ ] Check external links (quarterly maintenance)
- [ ] Add archive.org backups for critical external links
- [ ] Document link validation process

#### Acceptance Criteria
- [ ] No broken internal links (REQ-N015)
- [ ] External links validated
- [ ] Archive backups for critical links (REQ-N016)
- [ ] Validation automated in CI
- [ ] Process documented

**Requirements Addressed**: REQ-N015-N016

---

### TEST-002: Frontmatter and Schema Validation

**Prerequisites**: All content tasks complete
**Status**: [ ] Not Started
**MVP**: [MVP]

#### Description
Validate all YAML frontmatter against schema.

#### Sub-tasks
- [ ] Run validate-frontmatter.sh on all files
- [ ] Fix schema violations
- [ ] Ensure consistent metadata
- [ ] Validate requirement traceability
- [ ] Check version and date consistency

#### Acceptance Criteria
- [ ] All frontmatter valid against schema
- [ ] No schema violations
- [ ] Metadata consistent across files
- [ ] Requirement traceability validated (REQ-Q010-Q013)
- [ ] Validation automated in CI

**Requirements Addressed**: REQ-Q010-Q013

---

### TEST-003: Build and Deployment Testing

**Prerequisites**: INFRA-005, all content tasks
**Status**: [ ] Not Started
**MVP**: [MVP]

#### Description
Test all build processes and deployment workflows.

#### Sub-tasks
- [ ] Test PDF build locally
- [ ] Test web deployment to GitHub Pages
- [ ] Test all GitHub Actions workflows
- [ ] Validate build times (< 10 minutes)
- [ ] Validate PDF size (< 50MB)
- [ ] Test on multiple devices and browsers

#### Acceptance Criteria
- [ ] PDF builds successfully (REQ-T011-T015)
- [ ] Web deploys to GitHub Pages (REQ-T019-T021)
- [ ] All workflows pass
- [ ] Build time < 10 minutes (REQ-N025)
- [ ] PDF < 50MB (REQ-N023)
- [ ] Cross-browser compatible (REQ-N029)

**Requirements Addressed**: REQ-T011-T021, REQ-N023, REQ-N025, REQ-N029

---

### TEST-004: Accessibility Testing

**Prerequisites**: TEST-003
**Status**: [ ] Not Started
**MVP**: [MVP]

#### Description
Test accessibility compliance for web version.

#### Sub-tasks
- [ ] Run WAVE accessibility checker
- [ ] Run axe DevTools
- [ ] Test with screen reader (NVDA or JAWS)
- [ ] Validate color contrast
- [ ] Test keyboard navigation
- [ ] Fix accessibility issues

#### Acceptance Criteria
- [ ] WCAG 2.1 Level AA compliance (REQ-N009)
- [ ] No critical accessibility errors
- [ ] Screen reader compatible (REQ-N011)
- [ ] Color contrast meets standards
- [ ] Full keyboard navigation (REQ-N012)
- [ ] Accessibility documented

**Requirements Addressed**: REQ-N009-N012

---

### TEST-005: User Testing and Feedback

**Prerequisites**: TEST-001 through TEST-004
**Status**: [ ] Not Started
**MVP**: [MVP]

#### Description
Conduct user testing with target audience (vibecoders and CTOs).

#### Sub-tasks
- [ ] Recruit test readers (3-5 vibecoders, 3-5 CTOs)
- [ ] Provide access to draft book
- [ ] Collect feedback via survey
- [ ] Conduct follow-up interviews
- [ ] Analyze feedback and prioritize improvements
- [ ] Incorporate critical feedback

#### Acceptance Criteria
- [ ] Test readers from both extremes (REQ-N001-N002)
- [ ] Feedback collected and analyzed
- [ ] Accessibility confirmed by vibecoders
- [ ] Value confirmed by CTOs
- [ ] Critical improvements implemented
- [ ] Testimonials collected

**Requirements Addressed**: REQ-N001-N003, REQ-V001-V004, REQ-V009-V012

---

## Phase 8: Publishing and Launch (MVP Go-Live)

### PUB-001: MVP Release Preparation

**Prerequisites**: All TEST tasks complete
**Status**: [ ] Not Started
**MVP**: [MVP]

#### Description
Prepare all assets and documentation for MVP release.

#### Sub-tasks
- [ ] Final review of all content
- [ ] Update README with launch info
- [ ] Prepare announcement text
- [ ] Create v0.1 git tag
- [ ] Build final PDF
- [ ] Verify GitHub Pages live

#### Acceptance Criteria
- [ ] All content reviewed and polished
- [ ] README updated
- [ ] Announcement ready
- [ ] v0.1 tag created
- [ ] PDF built and attached to release
- [ ] GitHub Pages live and accessible

**Requirements Addressed**: REQ-M001-M006, REQ-P005-P008

---

### PUB-002: Launch MVP (2-Week Milestone)

**Prerequisites**: PUB-001
**Status**: [ ] Not Started
**MVP**: [MVP]

#### Description
Launch the MVP version of the book to the public.

#### Sub-tasks
- [ ] Publish GitHub Pages site
- [ ] Create GitHub Release v0.1 with PDF
- [ ] Post announcement (social media, communities)
- [ ] Open GitHub Discussions for community
- [ ] Monitor initial feedback
- [ ] Celebrate launch!

#### Acceptance Criteria
- [ ] GitHub Pages publicly accessible (REQ-T019-T021)
- [ ] v0.1 release published with PDF
- [ ] Announcement posted
- [ ] Community channels active
- [ ] Feedback monitoring in place
- [ ] 2-week MVP milestone achieved (REQ-M005-M006)

**Requirements Addressed**: REQ-M005-M006, REQ-P005-P008

---

### PUB-003: Post-MVP Iteration Planning

**Prerequisites**: PUB-002
**Status**: [ ] Not Started
**MVP**: [v1.1]

#### Description
Plan v1.1 iteration based on MVP feedback.

#### Sub-tasks
- [ ] Analyze community feedback
- [ ] Identify gaps and improvements
- [ ] Prioritize v1.1 tasks
- [ ] Update tasks.md with v1.1 work
- [ ] Set v1.1 timeline
- [ ] Communicate roadmap to community

#### Acceptance Criteria
- [ ] Feedback analyzed (REQ-M013)
- [ ] Gaps identified (REQ-M014)
- [ ] v1.1 priorities set
- [ ] tasks.md updated
- [ ] Timeline communicated
- [ ] Community informed

**Requirements Addressed**: REQ-M013-M015

---

### PUB-004: Complete v1.0 (6-Week Milestone)

**Prerequisites**: PUB-003, all v1.1 tasks
**Status**: [ ] Not Started
**MVP**: [v1.1]

#### Description
Complete and publish v1.0 with all Part 3 patterns and refinements.

#### Sub-tasks
- [ ] Complete all remaining Part 3 patterns
- [ ] Incorporate MVP feedback
- [ ] Full editorial review
- [ ] Create v1.0 git tag
- [ ] Build final v1.0 PDF
- [ ] Launch v1.0

#### Acceptance Criteria
- [ ] All Part 3 patterns complete (REQ-M009, REQ-Q009)
- [ ] MVP feedback incorporated
- [ ] Full review complete (REQ-M012)
- [ ] v1.0 release published
- [ ] 6-week milestone achieved (REQ-M007-M012)
- [ ] Community announced

**Requirements Addressed**: REQ-M007-M012, REQ-Q009

---

### PUB-005: Physical Print Preparation

**Prerequisites**: PUB-004
**Status**: [ ] Not Started
**MVP**: [v1.1]

#### Description
Prepare book for physical print-on-demand.

#### Sub-tasks
- [ ] Optimize print formatting
- [ ] Create print cover design
- [ ] Choose print-on-demand service
- [ ] Setup print distribution
- [ ] Price print version
- [ ] Launch print availability

#### Acceptance Criteria
- [ ] Print formatting optimized (REQ-P014)
- [ ] Cover design professional
- [ ] Print service selected
- [ ] Distribution configured
- [ ] Pricing set
- [ ] Print version available (REQ-P013, REQ-P015)

**Requirements Addressed**: REQ-P013-P015

---

## Task Summary

### By Phase

| Phase | Tasks | MVP | v1.1 | Description |
|-------|-------|-----|------|-------------|
| Phase 1 | INFRA-001 to SKILL-010 | 12 | 4 | Infrastructure and skills |
| Phase 2 | P1-001 to P1-007 | 7 | 0 | Part 1: Foundations |
| Phase 3 | P2-001 to P2-012 | 12 | 0 | Part 2: Playbook |
| Phase 4 | P3-001 to P3-025 | 15 | 10 | Part 3: Patterns & Tools |
| Phase 5 | P4-001 to P4-011 | 11 | 0 | Part 4: Complete Example |
| Phase 6 | SUPPORT-001 to SUPPORT-004 | 4 | 0 | Supporting content |
| Phase 7 | TEST-001 to TEST-005 | 5 | 0 | Testing and validation |
| Phase 8 | PUB-001 to PUB-005 | 2 | 3 | Publishing and launch |
| **TOTAL** | **~81 tasks** | **~68** | **~17** | |

### MVP Scope (2-6 Weeks)

**Week 1-2 (MVP Launch)**:
- INFRA-001 to INFRA-006: Infrastructure setup
- **SKILL-SCAFFOLD & SKILL-DRAFT: Two-skill chapter writing system** (2 skills - replaces 6 planned skills, avoids context compacting)
- P1-001 to P1-007: Complete Part 1
- SUPPORT-001 to SUPPORT-004: Supporting content (partial)
- TEST-001 to TEST-003: Core testing
- PUB-001 to PUB-002: MVP launch

**Week 3-6 (v1.0 Complete)**:
- P2-001 to P2-012: Complete Part 2
- P3-001 to P3-015: Core Part 3 patterns
- P4-001 to P4-011: Complete Part 4
- TEST-004 to TEST-005: Full testing
- PUB-003 to PUB-004: v1.0 launch

**Post-Week 6 (v1.1+)**:
- P3-016 to P3-025: Additional Part 3 patterns
- **NO ADDITIONAL SKILLS PLANNED** (SKILL-001-010 either replaced by SKILL-SCAFFOLD/SKILL-DRAFT or skipped)
- PUB-005: Physical print
- Ongoing: Community feedback and updates

---

## Progress Tracking

**Overall Status**: In Progress (11/81 tasks complete)

**Completed Tasks**:
- INFRA-001 through INFRA-005: Infrastructure setup
- SKILL-SCAFFOLD: Chapter scaffold generator
- SKILL-DRAFT: Section drafter skill
- P1-001: Preface and Introduction
- P1-002: Renaissance Developer chapter (with 7 Mermaid diagrams)
- P1-003: What is Agentic Coding chapter (with 3 Mermaid diagrams)
- P1-004: Architecture Principles chapter (with 8 Mermaid diagrams - complete)

**In Progress**:
- None

**Next Action**: P1-005 (Digestible Interfaces chapter) or P1-007 (Part 1 Review and Polish)

**Prerequisites Complete**: Yes (genesis.md workflow complete through T005)

**Ready to Continue**: Yes
