# Requirements Specification: Agentic Coding Book

**Product**: The Agentic Coding Playbook: From Idea to Production in 6 Weeks
**Version**: 1.0
**Date**: 2025-12-19
**Status**: Draft

---

## Document Purpose

This document specifies all functional, technical, and non-functional requirements for the Agentic Coding Book. All requirements are written in EARS (Easy Approach to Requirements Syntax) notation and are traceable to the product brief.

**EARS Notation Reference**:
- **Ubiquitous**: "The system shall [capability]"
- **Event-driven**: "WHEN [trigger] the system shall [response]"
- **State-driven**: "WHILE [state] the system shall [capability]"
- **Optional**: "WHERE [feature enabled] the system shall [capability]"
- **Conditional**: "IF [condition] THEN the system shall [response]"

**Traceability**: Each requirement references the corresponding section in brief.md

---

## 1. Content Requirements

### 1.1 Part 1: Foundations Content

**Source**: brief.md - Key Features - Part 1: Foundations

**REQ-C001**: The book shall include a Part 1: Foundations section that establishes mindset and principles.

**REQ-C002**: Part 1 shall define the Renaissance Developer concept and explain the mindset shift required for agentic coding.

**REQ-C003**: Part 1 shall provide a comprehensive definition of agentic coding covering AI pair programming tools, autonomous agents, AI-assisted code review, natural language to code generation, and AI-driven testing and debugging.

**REQ-C004**: Part 1 shall explain first principles of software architecture specifically optimized for agentic development.

**REQ-C005**: Part 1 shall explain why digestible interfaces matter for both humans and AI agents.

**REQ-C006**: Part 1 shall identify and explain the new bottlenecks that emerge when coding accelerates 5-10x through agentic tools.

### 1.2 Part 2: Playbook Content

**Source**: brief.md - Key Features - Part 2: The Playbook

**REQ-C007**: The book shall include a Part 2: The Playbook section that provides the complete 6-week journey from idea to production.

**REQ-C008**: Part 2 shall document the complete workflow with phases: idea, brainstorm, brief, requirements, design, implementation, testing, and deployment.

**REQ-C009**: Part 2 shall explain the spec-driven development approach including EARS notation, OpenAPI, and AsyncAPI.

**REQ-C010**: Part 2 shall define the environment progression sequence: local → test → e2e → staging → production.

**REQ-C011**: Part 2 shall provide an MVP definition and prioritization framework.

**REQ-C012**: Part 2 shall explain iterative phases post-MVP (v1.1, v1.2, etc.).

**REQ-C013**: Part 2 shall explain how to manage AI agents as implementation partners.

### 1.3 Part 3: Patterns & Tools Content

**Source**: brief.md - Key Features - Part 3: Patterns & Tools

**REQ-C014**: The book shall include a Part 3: Patterns & Tools section that provides deep reference material for specific needs.

**REQ-C015**: Part 3 shall document architecture patterns optimized for agentic coding.

**REQ-C016**: Part 3 shall document interface design patterns covering API boundaries and component contracts.

**REQ-C017**: Part 3 shall document testing strategies for AI-generated code.

**REQ-C018**: Part 3 shall document specification writing patterns for EARS, OpenAPI, AsyncAPI, and JSON Schema.

**REQ-C019**: Part 3 shall provide deep dives on the agent-friendly toolchain including JSON Schema for data validation.

**REQ-C020**: Part 3 shall provide deep dives on OpenAPI for REST APIs.

**REQ-C021**: Part 3 shall provide deep dives on AsyncAPI for event-driven systems.

**REQ-C022**: Part 3 shall provide deep dives on MCP servers for extending AI capabilities.

**REQ-C023**: Part 3 shall provide deep dives on Skills and custom tools for specialized tasks.

**REQ-C024**: Part 3 shall document code review patterns for AI-generated code.

**REQ-C025**: Part 3 shall document debugging strategies for AI-generated implementations.

### 1.4 Part 4: Complete Example Content

**Source**: brief.md - Key Features - Part 4: Complete Example

**REQ-C026**: The book shall include a Part 4: Complete Example section that proves the 6-week MVP promise end-to-end.

**REQ-C027**: Part 4 shall present a real, non-trivial product built using the entire playbook.

**REQ-C028**: Part 4 shall demonstrate every phase of the workflow: idea → requirements → architecture → specs → implementation → testing → deployment → iteration.

**REQ-C029**: Part 4 shall demonstrate all key patterns and tools in practice.

**REQ-C030**: Part 4 shall include the timeline, decisions made, and lessons learned from the example project.

**REQ-C031**: Part 4 shall validate that the 6-week MVP timeline is achievable.

### 1.5 Content Exclusions

**Source**: brief.md - Out of Scope

**REQ-C032**: The book shall NOT include introductory programming content such as basic syntax, data structures, or algorithms.

**REQ-C033**: The book shall NOT include deep AI/ML theory about how LLMs work internally.

**REQ-C034**: The book shall NOT include step-by-step tool tutorials with "click here" instructions.

**REQ-C035**: The book shall NOT cover non-software products such as hardware or physical goods.

**REQ-C036**: The book shall NOT cover enterprise-specific concerns such as compliance frameworks, procurement processes, or legacy system integration.

**REQ-C037**: The book shall NOT include advanced computer science theory such as distributed systems theory or formal verification.

**REQ-C038**: The book shall NOT include tool comparisons and rankings.

### 1.6 Teaching Approach

**Source**: brief.md - Writing Approach

**REQ-C039**: The book shall teach using first principles, assuming zero prior knowledge.

**REQ-C040**: The book shall teach principles and patterns rather than providing step-by-step tutorials.

**REQ-C041**: WHEN explaining concepts, the book shall use light code examples such as pseudocode and simple snippets.

**REQ-C042**: WHERE necessary for specifications, the book shall include real YAML examples for OpenAPI, AsyncAPI, and JSON Schema configurations.

**REQ-C043**: The book shall use Mermaid diagrams for architecture visualization.

**REQ-C044**: The book shall provide conceptual explanations with practical applications.

---

## 2. Structure and Organization Requirements

### 2.1 Document Structure

**Source**: brief.md - Key Features

**REQ-S001**: The book shall be organized into four main parts: Foundations, Playbook, Patterns & Tools, and Complete Example.

**REQ-S002**: Part 1 (Foundations) shall be structured for sequential reading.

**REQ-S003**: Part 2 (Playbook) shall be structured as a sequential journey.

**REQ-S004**: Part 3 (Patterns & Tools) shall be structured as a reference section allowing readers to jump to specific needs.

**REQ-S005**: Part 4 (Complete Example) shall integrate all previous parts into a cohesive end-to-end demonstration.

### 2.2 Navigation and Accessibility

**Source**: brief.md - Format & Publishing Strategy

**REQ-S006**: The book shall include hyperlinks between related sections for digital reading.

**REQ-S007**: The book shall include a comprehensive glossary of terms.

**REQ-S008**: The book shall include an index optimized for print versions.

**REQ-S009**: The book shall use consistent heading hierarchy throughout all sections.

**REQ-S010**: The book shall use consistent formatting style across all chapters.

**REQ-S011**: The book shall use consistent cross-reference syntax throughout.

---

## 3. Technical Requirements

### 3.1 Writing Environment

**Source**: brief.md - Writing Toolchain

**REQ-T001**: The book shall be written in Markdown format.

**REQ-T002**: The book shall be authored using VS Code as the primary editing environment.

**REQ-T003**: WHILE writing, the author shall use Claude Code as an AI writing partner.

**REQ-T004**: The book shall use Mermaid syntax for all diagrams.

**REQ-T005**: The book shall track tasks in a tasks.md file maintained in git.

### 3.2 Infrastructure and Hosting

**Source**: brief.md - Publishing & Distribution - Platform

**REQ-T006**: The book's source files shall be stored in a GitHub repository.

**REQ-T007**: The book shall be published online using GitHub Pages.

**REQ-T008**: WHEN a commit is pushed to the main branch, GitHub Actions shall automatically generate a PDF version.

**REQ-T009**: The GitHub repository shall be publicly accessible for reading and contributions.

**REQ-T010**: The GitHub repository shall maintain full version history of all changes.

### 3.3 Build and Generation

**Source**: brief.md - Writing Toolchain

**REQ-T011**: The system shall use Pandoc to generate PDF files from Markdown source.

**REQ-T012**: WHEN generating PDFs, the system shall apply consistent styling and formatting.

**REQ-T013**: The PDF generation shall complete within 5 minutes of a commit.

**REQ-T014**: IF PDF generation fails, the system shall notify the author with error details.

**REQ-T015**: The generated PDF shall maintain page numbers, table of contents, and index.

### 3.4 Diagram Rendering

**Source**: brief.md - Writing Toolchain

**REQ-T016**: The system shall render Mermaid diagrams natively in GitHub markdown view.

**REQ-T017**: WHEN generating PDFs, the system shall convert Mermaid diagrams to static images.

**REQ-T018**: All diagrams shall be readable in both digital and print formats.

### 3.5 Deployment

**Source**: brief.md - Publishing & Distribution

**REQ-T019**: WHEN content is updated in the repository, GitHub Pages shall automatically update the online version within 5 minutes.

**REQ-T020**: The online version shall be accessible via HTTPS.

**REQ-T021**: The online version shall be mobile-responsive for reading on various devices.

### 3.6 Environments

**Source**: brief.md - Constraints and Assumptions

**REQ-T022**: The development environment shall support local Markdown preview with Mermaid rendering.

**REQ-T023**: The development environment shall include git for version control.

**REQ-T024**: The development environment shall include access to Claude Code or similar AI coding assistant.

---

## 4. Publishing and Distribution Requirements

### 4.1 Licensing

**Source**: brief.md - Publishing & Distribution - Licensing

**REQ-P001**: The book shall be licensed under Creative Commons Attribution (CC BY).

**REQ-P002**: The author shall retain copyright of the work.

**REQ-P003**: Readers shall be permitted to view, share, and create derivatives of the work with attribution.

**REQ-P004**: The license terms shall be clearly displayed in the repository and on the website.

### 4.2 Incremental Publishing

**Source**: brief.md - Publishing & Distribution - Incremental publishing strategy

**REQ-P005**: The book shall be published incrementally as chapters are completed.

**REQ-P006**: Readers shall be able to see work-in-progress content and development in real-time.

**REQ-P007**: The repository shall maintain a public tasks.md file showing current and planned work.

**REQ-P008**: WHEN a significant section is completed, the author shall announce the update to readers.

### 4.3 Feedback Mechanisms

**Source**: brief.md - Writing Toolchain

**REQ-P009**: The GitHub repository shall enable Issues for reader feedback and bug reports.

**REQ-P010**: The GitHub repository shall enable Discussions for community conversation.

**REQ-P011**: WHEN readers submit feedback, the author shall acknowledge within 7 days.

**REQ-P012**: The author shall incorporate relevant feedback into future updates.

### 4.4 Physical Print

**Source**: brief.md - Success Criteria - Nice-to-Have

**REQ-P013**: WHERE physical print is enabled, the book shall be available through print-on-demand services.

**REQ-P014**: The print version shall use formatting optimized for physical reading.

**REQ-P015**: The print version shall include all content from the digital version.

---

## 5. Quality and Content Standards Requirements

### 5.1 Accuracy

**Source**: brief.md - Strategic Goals

**REQ-Q001**: All technical patterns and recommendations shall be based on proven, battle-tested experience.

**REQ-Q002**: All code examples shall be syntactically correct and functional.

**REQ-Q003**: All tool references shall specify version information where relevant.

**REQ-Q004**: IF a pattern or recommendation changes due to tool evolution, the content shall be updated with a changelog entry.

### 5.2 Completeness

**Source**: brief.md - Success Criteria - Must-Have

**REQ-Q005**: The MVP release shall include complete and published content for Part 1: Foundations.

**REQ-Q006**: The MVP release shall include complete and published content for Part 2: Playbook with the full 6-week workflow.

**REQ-Q007**: The MVP release shall include core patterns documented in Part 3 covering at least architecture, interfaces, specs, and testing.

**REQ-Q008**: The MVP release shall include a complete example in Part 4 demonstrating the workflow.

**REQ-Q009**: At v1.0, all Part 3 patterns shall be thoroughly documented.

### 5.3 Traceability

**Source**: genesis.md - T004 Acceptance Criteria

**REQ-Q010**: Each requirement in this document shall trace back to a specific section in brief.md.

**REQ-Q011**: Each section of the book shall trace back to specific requirements in this document.

**REQ-Q012**: The design document (design.md) shall reference specific requirements it addresses.

**REQ-Q013**: The implementation tasks (tasks.md) shall reference specific requirements they fulfill.

---

## 6. Non-Functional Requirements

### 6.1 Usability

**Source**: brief.md - Target Users

**REQ-N001**: The book shall be readable and understandable by individuals with zero technical background (vibecoders).

**REQ-N002**: The book shall be valuable to experienced CTOs and engineering leaders.

**REQ-N003**: The book shall allow readers to skim familiar concepts and dive deep into novel material.

**REQ-N004**: The table of contents shall enable readers to quickly locate specific topics.

**REQ-N005**: Each section shall be digestible in a single focused reading session (15-45 minutes).

**REQ-N006**: The writing style shall be clear, concise, and jargon-free where possible.

**REQ-N007**: WHERE technical jargon is necessary, the book shall define terms in the glossary.

### 6.2 Accessibility

**Source**: brief.md - Strategic Goals - Democratize product development

**REQ-N008**: The book shall be freely accessible online to all readers.

**REQ-N009**: The website shall meet WCAG 2.1 Level AA accessibility standards.

**REQ-N010**: All diagrams shall include alt text describing their content.

**REQ-N011**: The content shall be readable with screen readers.

**REQ-N012**: The online version shall support adjustable font sizes.

### 6.3 Reliability

**Source**: brief.md - Constraints - Rapid tool evolution

**REQ-N013**: The book's core principles and patterns shall remain valid even as specific AI tools evolve.

**REQ-N014**: The book shall be updated within 30 days when major tools or standards change significantly.

**REQ-N015**: All links to external resources shall be validated quarterly.

**REQ-N016**: IF an external link breaks, the book shall provide an archived or alternative reference.

### 6.4 Maintainability

**Source**: brief.md - Publishing & Distribution

**REQ-N017**: The book's source structure shall support easy updates and additions.

**REQ-N018**: Each part shall be independently updatable without affecting other parts.

**REQ-N019**: The repository shall maintain a CHANGELOG documenting all significant updates.

**REQ-N020**: The repository shall use semantic versioning for releases (v1.0, v1.1, v2.0, etc.).

**REQ-N021**: The build process shall be documented and reproducible.

### 6.5 Performance

**Source**: brief.md - Technical Requirements

**REQ-N022**: The GitHub Pages site shall load initial content within 3 seconds on a standard broadband connection.

**REQ-N023**: The PDF file size shall not exceed 50MB for the complete book.

**REQ-N024**: Mermaid diagrams shall render within 2 seconds in the browser.

**REQ-N025**: The GitHub Actions build pipeline shall complete within 10 minutes.

### 6.6 Portability

**Source**: brief.md - Format & Publishing Strategy - Multi-Use Design

**REQ-N026**: The book shall be fully functional in digital format with searchable content and hyperlinks.

**REQ-N027**: The book shall be fully functional in physical print format with page numbers and index.

**REQ-N028**: All diagrams shall be readable in both color (digital) and grayscale (print).

**REQ-N029**: The content shall render correctly across major browsers (Chrome, Firefox, Safari, Edge).

**REQ-N030**: The PDF shall be compatible with standard PDF readers.

---

## 7. Timeline and Milestone Requirements

### 7.1 MVP Phase (Weeks 1-2)

**Source**: brief.md - Timeline and Phases - Phase 1

**REQ-M001**: By Week 1, the requirements document (this document) shall be complete.

**REQ-M002**: By Week 1, the technical design document (design.md) shall be complete.

**REQ-M003**: By Week 2, the implementation plan (tasks.md) shall be complete.

**REQ-M004**: By Week 2, initial Part 1 content shall be written and published.

**REQ-M005**: By Week 2, GitHub Pages shall be configured and live.

**REQ-M006**: By Week 2, at least one publishable section shall be available online.

### 7.2 Complete First Pass (Weeks 3-6)

**Source**: brief.md - Timeline and Phases - Phase 2

**REQ-M007**: By Week 6, Part 1: Foundations shall be complete and published.

**REQ-M008**: By Week 6, Part 2: Playbook shall be complete and published.

**REQ-M009**: By Week 6, Part 3 core patterns shall be documented and published.

**REQ-M010**: By Week 6, Part 4 complete example shall be finished and published.

**REQ-M011**: By Week 6, PDF auto-generation shall be working and producing quality output.

**REQ-M012**: By Week 6, at least one full read-through and revision shall be complete.

### 7.3 Iteration Phase (Weeks 7-12)

**Source**: brief.md - Timeline and Phases - Phase 3

**REQ-M013**: By Week 12, community feedback shall be collected and analyzed.

**REQ-M014**: By Week 12, identified gaps from feedback shall be addressed.

**REQ-M015**: By Week 12, Part 3 patterns shall be expanded based on reader needs.

**REQ-M016**: By Week 12, clarity improvements from feedback shall be incorporated.

**REQ-M017**: By Week 12, v1.1 shall be published with refinements.

---

## 8. Success Validation Requirements

### 8.1 Reader Outcome Validation

**Source**: brief.md - Success Metrics

**REQ-V001**: The book shall enable readers to successfully ship MVPs within 6 weeks of starting the book.

**REQ-V002**: WHEN readers complete the book, they shall be surveyed about their outcomes.

**REQ-V003**: The book shall collect testimonials from readers who successfully shipped products.

**REQ-V004**: Reader success stories shall be published in the repository or website.

### 8.2 Engagement Validation

**Source**: brief.md - Success Metrics - Engagement

**REQ-V005**: The GitHub repository shall track stars, forks, and contributions as engagement metrics.

**REQ-V006**: The project shall monitor active discussions on issues and feedback channels.

**REQ-V007**: The website shall track page views and download metrics for PDFs.

**REQ-V008**: WHEN engagement metrics are collected, they shall be reviewed monthly to assess reach.

### 8.3 Quality Validation

**Source**: brief.md - Success Metrics - Qualitative

**REQ-V009**: The book shall receive positive feedback from non-technical readers (vibecoders, founders) regarding accessibility.

**REQ-V010**: Readers shall report successfully using specific patterns from the book.

**REQ-V011**: The book shall be reviewed for completeness against the full idea-to-production journey.

**REQ-V012**: The book shall be reviewed for clarity by having readers confirm understanding of both "what" and "why".

---

## 9. Meta-Requirements (Genesis Workflow Alignment)

### 9.1 Process Requirements

**Source**: brief.md - Alignment with Genesis Workflow

**REQ-G001**: The book shall be created following the genesis.md workflow that it teaches.

**REQ-G002**: The book's development shall proceed through phases: idea → brainstorm → brief → requirements → design → tasks → implementation.

**REQ-G003**: Each phase of the book's development shall be documented and visible in the repository.

**REQ-G004**: The book's development shall demonstrate the effectiveness of the workflow it teaches.

### 9.2 Agentic Coding Requirements

**Source**: brief.md - Writing Approach - Agentic writing

**REQ-G005**: The book shall be written using Claude Code as an AI pair programmer.

**REQ-G006**: The book's development shall demonstrate effective use of agentic coding tools.

**REQ-G007**: The writing process shall apply the same principles and patterns taught in the book.

**REQ-G008**: Lessons learned from writing with AI shall be incorporated into the book's content.

---

## 10. Constraints and Assumptions

### 10.1 Author Constraints

**Source**: brief.md - Constraints and Assumptions - Constraints

**REQ-A001**: The book's development timeline shall account for solo author (CTO) with limited time.

**REQ-A002**: The writing process shall use agentic coding to maximize author productivity.

**REQ-A003**: Tasks shall be sized to be completable in single focused sessions.

### 10.2 Tool Assumptions

**Source**: brief.md - Constraints and Assumptions - Assumptions

**REQ-A004**: The book assumes readers have access to AI coding tools (Claude Code, GitHub Copilot, Cursor, or similar).

**REQ-A005**: The book assumes readers have access to free GitHub accounts.

**REQ-A006**: The book assumes readers can use Markdown and basic git operations with AI assistance.

---

## Requirements Summary

### Requirement Counts by Category

| Category | Count | Description |
|----------|-------|-------------|
| Content Requirements | 44 | What content the book must include |
| Structure Requirements | 11 | How the book is organized |
| Technical Requirements | 24 | Technical implementation specs |
| Publishing Requirements | 15 | Distribution and licensing |
| Quality Requirements | 13 | Content quality standards |
| Non-Functional Requirements | 30 | Usability, reliability, performance, etc. |
| Milestone Requirements | 17 | Timeline and phase deliverables |
| Validation Requirements | 12 | Success measurement |
| Meta Requirements | 8 | Genesis workflow alignment |
| Assumptions/Constraints | 6 | Limitations and dependencies |
| **TOTAL** | **180** | **All requirements** |

### Requirement Priorities

**Must-Have (MVP Critical)**: REQ-C001 through REQ-C031, REQ-S001 through REQ-S011, REQ-T001 through REQ-T024, REQ-P001 through REQ-P008, REQ-Q001 through REQ-Q009, REQ-M001 through REQ-M006

**Should-Have (v1.0)**: All remaining REQ-N, REQ-Q, REQ-M, REQ-V requirements

**Nice-to-Have (v1.1+)**: REQ-P013 through REQ-P015 (physical print)

---

## Traceability Matrix

All requirements trace back to specific sections in brief.md as documented in the "Source" field of each requirement. Key mappings:

- **Content Requirements** → brief.md: Key Features sections
- **Structure Requirements** → brief.md: Key Features, Format & Publishing Strategy
- **Technical Requirements** → brief.md: Writing Toolchain, Publishing & Distribution
- **Publishing Requirements** → brief.md: Publishing & Distribution
- **Quality Requirements** → brief.md: Success Criteria, Strategic Goals
- **Non-Functional Requirements** → brief.md: Target Users, Strategic Goals
- **Milestone Requirements** → brief.md: Timeline and Phases
- **Validation Requirements** → brief.md: Success Metrics
- **Meta Requirements** → brief.md: Alignment with Genesis Workflow
- **Constraints/Assumptions** → brief.md: Constraints and Assumptions

---

## Next Steps

With requirements now defined in EARS notation:

1. **T005**: Create technical design (design.md) addressing these requirements
2. **T006**: Develop implementation plan (tasks.md) to fulfill these requirements
3. **Validation**: Ensure all requirements are addressed in design and tasks

---

## Document Control

**Version History**:
- v1.0 (2025-12-19): Initial requirements specification

**Review Status**: Pending validation against T004 acceptance criteria

**Approval**: Pending completion of T004.5 (validation)
