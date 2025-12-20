# Product Brief: Agentic Coding Book

**Product Name**: The Agentic Coding Playbook: From Idea to Production in 6 Weeks
**Version**: 1.0
**Date**: 2025-12-19
**Status**: In Development

---

## Vision

**Create the definitive playbook that democratizes product development in the age of AI, enabling anyone—from vibecoders to CTOs—to build and ship software products using agentic coding.**

This book transforms how people think about building software. It's not about teaching programming; it's about teaching *product building* in an era where AI agents handle the mechanical coding work. Readers become Renaissance Developers—polymaths who are "good enough at everything" to successfully ship products, combining systems thinking, product vision, design sensibility, and strategic judgment while AI agents handle implementation details.

The book delivers a concrete promise: **transform any product idea into a production-ready MVP in 6 weeks** using proven patterns from battle-tested CTO experience.

---

## Strategic Goals

### Primary Goals

1. **Democratize product development**
   Remove technical barriers so anyone with product vision can build and ship software, regardless of programming background.

2. **Establish proven patterns**
   Provide the first comprehensive playbook for effective agentic coding across the entire software development lifecycle.

3. **Enable rapid delivery**
   Equip readers with tools, processes, and mental models to ship MVPs in 6 weeks and maintain momentum through iterative phases.

4. **Reframe developer identity**
   Promote the Renaissance Developer model—broad competency across disciplines (technical, product, design, analytics, business) rather than deep specialization in coding.

### Secondary Goals

1. **Create living reference**
   Build a resource that works both as a learning journey and ongoing reference for specific patterns and techniques.

2. **Demonstrate the process**
   Validate the book's own methodology by using the genesis.md workflow to write the book itself—practicing what we preach.

3. **Build community**
   Foster a community of practitioners who share experiences, improvements, and success stories using these patterns.

4. **Maintain currency**
   Focus on principles and patterns that remain relevant even as specific AI tools evolve.

---

## Success Metrics

### Quantitative Metrics

- **Publication milestones**:
  - 2-week MVP: Initial publishable content live on GitHub Pages
  - 6-week v1.0: Complete first pass of all sections published
  - 12-week v1.1: Refined based on early feedback

- **Reader outcomes**:
  - Readers successfully ship MVPs within 6 weeks of starting the book
  - Measured via surveys, testimonials, and community discussions

- **Engagement**:
  - GitHub stars, forks, and community contributions
  - Active discussions on issues and feedback channels
  - Adoption metrics (downloads, page views)

### Qualitative Metrics

- **Accessibility**: Positive feedback from non-technical readers (vibecoders, founders)
- **Practical value**: Readers report using specific patterns successfully
- **Completeness**: Covers the full journey from idea to production
- **Clarity**: Readers understand both the "what" and the "why"

---

## Target Users

### Primary Audience

1. **Vibecoders**
   People with zero technical background who want to build software products. Need first principles teaching.

2. **Aspiring Founders**
   Non-technical founders with product ideas who want to build MVPs without hiring developers initially.

3. **Solo Developers**
   Individual developers who want to ship complete products themselves, not just implement features.

4. **Small Teams (2-5 people)**
   Startups and small product teams looking to maximize velocity and reduce time-to-market.

### Secondary Audience

1. **Engineering Leaders and CTOs**
   Technical leaders adapting organizations to agentic coding, seeking proven patterns for team transformation.

2. **Product Managers**
   PMs who become bottlenecks when engineering velocity increases 5-10x, needing new workflows for spec-driven development.

3. **Technical Writers and Educators**
   People teaching others about modern software development practices.

### User Needs

All audiences share core needs:
- **Clarity**: Understand what agentic coding is and how to use it effectively
- **Process**: Step-by-step workflow from idea to production
- **Patterns**: Proven architectural and organizational approaches
- **Tools**: Specific technologies and standards that work well with AI agents
- **Confidence**: Validation that this approach actually works at scale

---

## Key Features (In-Scope)

### Part 1: Foundations
**Purpose**: Establish mindset and principles

- Renaissance Developer concept and mindset shift
- Comprehensive definition of agentic coding (tools, agents, workflows)
- First principles of software architecture for agentic development
- Why digestible interfaces matter for both humans and AI
- The new bottlenecks when coding accelerates 5-10x

### Part 2: The Playbook
**Purpose**: The 6-week journey from idea to production

- Complete workflow: idea → brainstorm → brief → requirements → design → implementation → testing → deployment
- Spec-driven development approach (EARS notation, OpenAPI, AsyncAPI)
- Environment progression: local → test → e2e → staging → production
- MVP definition and prioritization framework
- Iterative phases post-MVP (v1.1, v1.2, etc.)
- Managing AI agents as implementation partners

### Part 3: Patterns & Tools
**Purpose**: Deep reference material for specific needs

- Architecture patterns optimized for agentic coding
- Interface design patterns (API boundaries, component contracts)
- Testing strategies for AI-generated code
- Specification writing patterns (EARS, OpenAPI, AsyncAPI, JSON Schema)
- Agent-friendly toolchain deep dives:
  - JSON Schema for data validation
  - OpenAPI for REST APIs
  - AsyncAPI for event-driven systems
  - MCP servers for extending AI capabilities
  - Skills and custom tools for specialized tasks
- Code review patterns when AI generates code
- Debugging AI-generated implementations

### Part 4: Complete Example
**Purpose**: Prove the 6-week MVP promise end-to-end

- Real, non-trivial product built using the entire playbook
- Shows every phase: idea → requirements → architecture → specs → implementation → testing → deployment → iteration
- Demonstrates all key patterns and tools in practice
- Includes timeline, decisions, and lessons learned
- Validates that 6 weeks is achievable

### Publishing & Distribution

- **Platform**: GitHub repository (version control, transparency)
- **Online reading**: GitHub Pages (accessible, searchable, hyperlinked)
- **PDF generation**: Auto-generated via GitHub Actions on every commit
- **Physical print**: Available later when content is stable
- **Licensing**: Creative Commons Attribution (CC BY) - free to read, share, build on with attribution
- **Incremental publishing**: Ship chapters as completed, work in public, build accountability

### Writing Approach

- **Markdown-based**: Simple, portable, version-controllable
- **Mermaid diagrams**: Architecture visualizations that render natively in GitHub
- **Agentic writing**: Use Claude Code as writing partner (practice what we preach)
- **Task-driven**: Granular tasks.md tracking progress publicly
- **First principles**: Assume zero prior knowledge, accessible to complete beginners
- **Principles over tutorials**: Teach thinking and decision-making, not step-by-step clicking

---

## Out of Scope

### Explicitly Excluded

1. **Introductory Programming**
   Basic syntax, data structures, algorithms. Readers learn these through doing with AI assistance, not from this book.

2. **Deep AI/ML Theory**
   How LLMs work internally, training processes, model architectures. Focus is on *using* AI, not building it.

3. **Specific Tool Tutorials**
   Step-by-step "click here" instructions for specific tools. Tools evolve; principles endure.

4. **Non-Software Products**
   Hardware, physical goods, non-technical products. Scope is software development only.

5. **Enterprise-Specific Concerns**
   Compliance frameworks, procurement processes, legacy system integration, organizational politics.

6. **Advanced Computer Science Theory**
   Distributed systems theory, formal verification, advanced algorithms. Cover practical patterns, not academic depth.

7. **Tool Comparisons and Reviews**
   "Best AI coding tool" rankings. Tools change too rapidly; focus on principles that work across tools.

### Boundaries and Rationale

**Why these exclusions matter**:
- **Focus**: Stay laser-focused on practical product building with agentic coding
- **Longevity**: Avoid content that becomes outdated quickly
- **Accessibility**: Don't require deep CS background or enterprise context
- **Scope management**: Prevent scope creep and ensure completion

Readers needing excluded topics should seek specialized resources.

---

## Constraints and Assumptions

### Constraints

1. **Author capacity**: Solo author (CTO) with limited time
   - *Mitigation*: Agentic coding for writing, granular tasks, incremental publishing

2. **Rapid tool evolution**: AI coding tools change frequently
   - *Mitigation*: Focus on principles and patterns over specific tool versions

3. **Audience range**: Vibecoder to CTO is extremely broad
   - *Mitigation*: First principles teaching, layered content, optional deep dives

4. **Format requirements**: Must work in digital (GitHub) and print
   - *Mitigation*: Markdown + Pandoc + careful structure

5. **Time pressure**: Want to ship quickly while tools/patterns are current
   - *Mitigation*: 2-week MVP, 6-week v1.0, iterate from there

### Assumptions

1. **Market need**: People want to build products with AI assistance
   - *Validation*: Observed demand in tech communities, lack of comprehensive resources

2. **6-week MVP is achievable**: With agentic coding, MVPs can be built in 6 weeks
   - *Validation*: Author's direct experience at scale, plus the book itself will prove this

3. **Renaissance Developer resonates**: The "good enough at everything" framing appeals to builders
   - *Validation*: Based on Werner Vogels' concept, industry trends toward full-stack

4. **First principles teaching works**: Can make complex topics accessible
   - *Validation*: Established educational approach, examples exist (Stripe API docs, etc.)

5. **Incremental publishing builds audience**: Working in public creates momentum
   - *Validation*: Successful precedents (Learn in Public movement, open source projects)

6. **Readers have access to AI coding tools**: Claude Code, GitHub Copilot, Cursor, or similar
   - *Reasonable*: Free and paid options available, increasingly mainstream

7. **Markdown + GitHub is sufficient**: No need for complex platform
   - *Validation*: Many successful technical books use this approach

### Dependencies

1. **AI tool availability**: Readers need access to AI coding assistants
2. **Genesis.md workflow**: This book depends on the workflow it teaches
3. **Author expertise**: CTO experience at big tech provides credibility and battle-tested patterns
4. **Example project**: Part 4 requires building a real product (can be done in parallel)

---

## Risks and Mitigation

### High-Priority Risks

1. **Risk: Not completing the book**
   *Impact*: High - undermines all goals
   *Mitigation*:
   - Incremental publishing (ship early, ship often)
   - Public accountability (tasks.md visible, deadlines announced)
   - 2-week MVP milestone (fast early win)
   - Granular tasks (small wins, constant progress)
   - Use agentic coding (let AI help write)

2. **Risk: Overpromising on "6 weeks"**
   *Impact*: Medium - damages credibility if unrealistic
   *Mitigation*:
   - Clear scope definition of MVP vs. full product
   - Part 4 example validates the timeline
   - Honest about iteration phases post-MVP
   - Manage expectations about "good enough at everything"

3. **Risk: Too broad for any single audience**
   *Impact*: Medium - book feels unfocused or shallow
   *Mitigation*:
   - First principles approach works for all levels
   - Layered content (skim if you know it, read if you don't)
   - Clear learning paths for different roles
   - Focus on practical outcomes, not theoretical completeness

### Medium-Priority Risks

4. **Risk: Tools evolve, content becomes outdated**
   *Impact*: Medium - reduces long-term value
   *Mitigation*:
   - Focus on principles and patterns over specific tools
   - Clearly date tool-specific content
   - Plan for updates (living document on GitHub)
   - Community contributions keep it current

5. **Risk: Scope creep during writing**
   *Impact*: Medium - delays completion
   *Mitigation*:
   - Strict out-of-scope boundaries
   - Reference brief.md for scope decisions
   - MVP mindset: ship, then iterate
   - tasks.md tracks planned work only

### Lower-Priority Risks

6. **Risk: Insufficient technical depth for experienced developers**
   *Impact*: Low - secondary audience might want more
   *Mitigation*:
   - Part 3 provides deep pattern dives
   - Advanced readers can skip foundations
   - Focus on novel patterns (agentic-specific), not basics

7. **Risk: Example project not compelling enough**
   *Impact*: Low - Part 4 less engaging
   *Mitigation*:
   - Choose real-world, relatable use case
   - Get early feedback on example choice
   - Can iterate on example in v1.1

---

## Unique Value Proposition

### What Makes This Book Different

**No existing resource combines all these elements:**

1. **Battle-tested CTO experience** - Real patterns proven at scale with big tech teams, not just theory or solo experience

2. **Complete end-to-end playbook** - Covers entire lifecycle from idea to production, not just coding tips or isolated patterns

3. **First principles accessibility** - Explicitly designed for complete beginners while valuable for CTOs

4. **Concrete deliverable** - "6 weeks to MVP" is specific and measurable, not vague promises

5. **Renaissance Developer framing** - Reframes identity and capabilities for the AI era, not just tool usage

6. **Opinionated toolchain** - Specific recommendations (OpenAPI, EARS, JSON Schema, MCP) based on what actually works

7. **Open and incremental** - Developed transparently in public with accountability and community input

8. **Proven by doing** - The book itself is built using the workflow it teaches

### Competitive Landscape

**Existing resources tend to fall into categories:**
- **Tool-specific tutorials**: How to use GitHub Copilot, Claude Code, etc. (narrow, outdated quickly)
- **Architecture books**: Not specific to agentic development (traditional paradigms)
- **AI/ML books**: About building AI, not using it for software development (wrong audience)
- **Coding bootcamps**: Teach programming syntax, not product building (wrong focus)
- **Startup playbooks**: Cover business/product but not technical execution (incomplete)

**This book uniquely bridges all gaps**: Technical architecture + product development + AI-assisted execution + accessible teaching + proven patterns.

---

## Success Criteria

### Must-Have (MVP)

- [ ] Part 1: Foundations section complete and published
- [ ] Part 2: Playbook section complete with 6-week workflow
- [ ] Part 3: Core patterns documented (at least architecture, interfaces, specs, testing)
- [ ] Part 4: Complete example demonstrating workflow
- [ ] GitHub Pages site live and navigable
- [ ] PDF auto-generation working
- [ ] tasks.md publicly visible and tracking progress
- [ ] Creative Commons license applied
- [ ] At least one full read-through and revision complete

### Should-Have (v1.0)

- [ ] All Part 3 patterns thoroughly documented
- [ ] Mermaid diagrams for all major concepts
- [ ] Comprehensive glossary of terms
- [ ] Index for print version
- [ ] Community feedback mechanisms in place (GitHub Issues/Discussions)
- [ ] Initial reader testimonials or case studies
- [ ] Marketing plan for launch

### Nice-to-Have (v1.1+)

- [ ] Video walkthroughs of key concepts
- [ ] Companion repository with templates and starters
- [ ] Community-contributed examples
- [ ] Translations to other languages
- [ ] Print-on-demand physical books available
- [ ] Interactive examples or sandboxes

---

## Open Questions (To Be Resolved During Execution)

1. **Part 4 Example Project**: What specific product best demonstrates the complete workflow?
   - *Criteria*: Non-trivial, relatable, covers most patterns, achievable in 6 weeks
   - *Decision point*: During T004/T005 (requirements/design phase)

2. **Pattern Depth**: How deep should Part 3 pattern explanations go?
   - *Approach*: Start with core concepts, iterate based on feedback
   - *Decision point*: After MVP, based on reader questions

3. **Code vs. Concepts Balance**: How much actual code to include?
   - *Current thinking*: Minimal code, more pseudocode, config examples (YAML, JSON)
   - *Decision point*: While writing each section

4. **Tool-Specific Content Strategy**: How to handle specific tool instructions that may become outdated?
   - *Approach*: Date tool versions, focus on principles, maintain changelog
   - *Decision point*: While writing Part 3

5. **Community Building**: What mechanisms for community engagement?
   - *Options*: GitHub Discussions, Discord, mailing list, forum
   - *Decision point*: After MVP is published and initial traction exists

6. **Physical Print Details**: Pricing, distribution, print-on-demand service
   - *Decision point*: After v1.0 is complete and stable

---

## Timeline and Phases

### Phase 1: MVP (Weeks 1-2)
**Goal**: Ship something valuable and publishable quickly

- Complete T003 (this brief) ✓
- T004: Requirements (Week 1)
- T005: Technical design (Week 1)
- T006: Implementation plan (Week 2)
- Begin Part 1 writing (Week 2)
- GitHub Pages setup (Week 2)
- **Milestone**: Publishable content live

### Phase 2: Complete First Pass (Weeks 3-6)
**Goal**: Full v1.0 of all four parts

- Complete Part 1: Foundations
- Complete Part 2: Playbook
- Complete Part 3: Core patterns
- Complete Part 4: Example project
- PDF generation working
- First full review and revision
- **Milestone**: Complete book v1.0 published

### Phase 3: Iteration (Weeks 7-12)
**Goal**: Refine based on feedback

- Community feedback collection
- Address gaps and questions
- Expand Part 3 patterns as needed
- Improve clarity and examples
- Marketing and distribution
- **Milestone**: Refined v1.1, initial traction

### Phase 4: Ongoing (Months 4+)
**Goal**: Maintain and grow

- Regular updates for tool changes
- Community contributions
- Additional examples
- Potential companion materials
- Physical print preparation

---

## Alignment with Genesis Workflow

This product brief was created following the genesis.md workflow that it will teach:

1. ✅ **T001: Understood the idea** - Analyzed idea.md
2. ✅ **T002: Brainstormed comprehensively** - Explored in brainstorm.md
3. ✅ **T003: Created this brief** - Synthesized into formal product definition
4. ⏭️ **T004: Next - Requirements** - Will extract EARS requirements from this brief
5. ⏭️ **T005: Then - Technical design** - Will design the book's structure and toolchain
6. ⏭️ **T006: Finally - Implementation plan** - Will create granular tasks.md for writing

**This is the meta-demonstration**: Using the workflow to build the book about the workflow.

---

## Conclusion

This product brief establishes clear direction for creating a comprehensive playbook that democratizes product development through agentic coding. By synthesizing insights from the brainstorming phase, we've evolved from a simple "CTO sharing patterns" idea into a complete vision for empowering anyone to build and ship products.

**Core promise**: Transform product ideas into production-ready MVPs in 6 weeks using AI-assisted development and battle-tested patterns.

**Next step**: T004 - Extract detailed requirements from this brief using EARS notation to create a precise, testable specification for the book.
