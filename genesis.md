# Genesis Task List

**Project**: Agentic Coding Book - Product Development Workflow
**Created**: 2025-12-18
**Purpose**: Master task list for transforming a product idea into a complete implementation plan

## How to Use This Task List

This document tracks the end-to-end product development process from initial idea through implementation planning.

**Status Indicators:**
- `[ ]` Not Started
- `[~]` In Progress
- `[x]` Complete

**Workflow:**
Each task must complete all acceptance criteria before being marked complete. Respect prerequisite chains - a task cannot start until all prerequisites are complete.

**Tracking Progress:**
1. Mark task status as `[~]` when beginning work
2. Check off `[x]` each acceptance criterion as completed
3. Mark task status as `[x]` when all criteria are met
4. If blocked, document blockers in the task description

---

## Task List

### T001: Understand Product Idea

**Prerequisites**: None (assumes idea.md exists)
**Status**: [x] Complete

#### Description
Read and thoroughly analyze the product idea documented in idea.md. Extract key insights about the problem being solved, target users, and core value proposition. This forms the foundation for all subsequent work.

#### Sub-tasks
- [x] **T001.1**: Read and analyze idea.md content
- [x] **T001.2**: Identify key stakeholders and target users
- [x] **T001.3**: Extract core value proposition and problem statement

#### Acceptance Criteria
- [x] Complete understanding of the problem being solved
- [x] Target audience and primary use cases clearly identified
- [x] Core value proposition articulated
- [x] Initial assumptions and constraints documented
- [x] Key questions for brainstorming session identified

---

### T002: Brainstorm Product

**Prerequisites**: T001
**Status**: [x] Complete

#### Description
Conduct a comprehensive brainstorming session to explore the product idea deeply. Develop clarifying questions, explore alternative approaches, and document all findings in brainstorm.md. This phase expands understanding and captures critical insights.

#### Sub-tasks
- [x] **T002.1**: Develop clarifying questions about scope, users, and technical approach
- [x] **T002.2**: Conduct brainstorming session (ask questions, explore alternatives)
- [x] **T002.3**: Document findings, answers, and decisions in brainstorm.md

#### Acceptance Criteria
- [x] Comprehensive list of questions asked and answered
- [x] Alternative approaches and features explored and evaluated
- [x] Key insights and decisions captured in brainstorm.md
- [x] Risks and unknowns identified
- [x] brainstorm.md is well-organized and complete

---

### T003: Create Product Brief

**Prerequisites**: T002
**Status**: [ ] Not Started

#### Description
Synthesize understanding from T001 and T002 into a formal product brief. Define the product vision, goals, scope, and success metrics. The brief serves as the canonical reference for what will be built and why.

#### Sub-tasks
- [ ] **T003.1**: Define product vision and strategic goals
- [ ] **T003.2**: Outline key features and define scope boundaries
- [ ] **T003.3**: Document complete brief in brief.md

#### Acceptance Criteria
- [ ] Clear, compelling product vision statement
- [ ] Specific goals and success metrics defined
- [ ] Features explicitly scoped (in-scope and out-of-scope)
- [ ] Key constraints and assumptions documented
- [ ] brief.md follows standard product brief structure

---

### T004: Develop Requirements in EARS Notation

**Prerequisites**: T003
**Status**: [ ] Not Started

#### Description
Extract detailed functional and non-functional requirements from the product brief. Document all requirements using EARS (Easy Approach to Requirements Syntax) notation to ensure clarity, testability, and unambiguity. Requirements must be traceable to the product brief.

#### Sub-tasks
- [ ] **T004.1**: Extract and document functional requirements from brief
- [ ] **T004.2**: Define technical requirements (environments, infrastructure, architecture, performance, security, deployment)
- [ ] **T004.3**: Define non-functional requirements (usability, reliability, maintainability, etc.)
- [ ] **T004.4**: Write all requirements in EARS notation in requirements.md
- [ ] **T004.5**: Validate requirements for completeness and traceability

#### Acceptance Criteria
- [ ] Technical requirements explicitly documented including:
  - [ ] Environment specifications (local dev, test, e2e, staging, production)
  - [ ] Infrastructure and deployment requirements
  - [ ] Performance targets and scalability needs
  - [ ] Security and compliance requirements
  - [ ] Integration and technology constraints
- [ ] All requirements written in proper EARS format (WHEN/WHILE/WHERE/IF as applicable)
- [ ] Requirements are specific, testable, and unambiguous
- [ ] Clear traceability from requirements back to product brief
- [ ] Non-functional requirements comprehensively covered
- [ ] requirements.md reviewed and validated

---

### T005: Create Technical Design

**Prerequisites**: T004
**Status**: [ ] Not Started

#### Description
Design the technical architecture and implementation approach that satisfies all requirements. Define system components, data models, interfaces, and technology choices. The design must address all requirements from T004 and provide a clear blueprint for implementation.

#### Sub-tasks
- [ ] **T005.1**: Map technical requirements to design decisions
- [ ] **T005.2**: Define system architecture and major components
- [ ] **T005.3**: Design infrastructure and deployment architecture for all environments
- [ ] **T005.4**: Specify data models, APIs, and interfaces
- [ ] **T005.5**: Select technology stack with rationale (including CI/CD tools)
- [ ] **T005.6**: Document complete design in design.md

#### Acceptance Criteria
- [ ] Clear traceability from technical requirements (T004) to design decisions
- [ ] Architecture clearly defined with component diagrams (text/ASCII format or referenced)
- [ ] Each component's responsibilities and interfaces specified
- [ ] Infrastructure design for each environment (local, test, e2e, staging, prod) documented
- [ ] Deployment pipeline and CI/CD approach defined
- [ ] Environment-specific configurations and requirements specified
- [ ] Data models and schemas documented
- [ ] Technology stack selected with clear rationale
- [ ] Design addresses all requirements from T004

---

### T006: Produce Implementation Plan with MVP Roadmap

**Prerequisites**: T005
**Status**: [ ] Not Started

#### Description
Break down the technical design into concrete, actionable implementation tasks with a clear path to MVP. Create a phased implementation roadmap that prioritizes MVP features, defines environment activation sequence, maps task dependencies, and provides timeline visualization through a gantt chart. Enable systematic, incremental delivery with proper environment progression.

#### Sub-tasks
- [ ] **T006.1**: Decompose design into implementation tasks
- [ ] **T006.2**: Define task dependencies and sequencing
- [ ] **T006.3**: Write acceptance criteria for each implementation task
- [ ] **T006.4**: Classify tasks as MVP vs post-MVP based on brief.md scope
- [ ] **T006.5**: Define environment activation path (sequence: local dev → tests → e2e → staging → prod)
- [ ] **T006.6**: Map environment setup tasks to implementation timeline
- [ ] **T006.7**: Define release phases (MVP, v1.1, v1.2, etc.) with feature grouping
- [ ] **T006.8**: Create gantt chart showing tasks, environments, dependencies, and milestones
- [ ] **T006.9**: Create tasks.md and mvp-plan.md following genesis.md format

#### Acceptance Criteria
- [ ] All design components mapped to specific implementation tasks
- [ ] Task dependencies clearly identified (prerequisite chains)
- [ ] Each task has clear, testable acceptance criteria
- [ ] Tasks explicitly marked as MVP or post-MVP with justification
- [ ] MVP tasks define the minimum viable feature set from brief.md
- [ ] Environment activation path clearly defined with milestones for each environment going live
- [ ] Infrastructure and deployment tasks included in implementation plan
- [ ] Environment dependencies identified (e.g., staging requires working e2e tests)
- [ ] Release phases defined with clear milestones
- [ ] Gantt chart shows: tasks, environment activations, dependencies, and critical path
- [ ] tasks.md follows the same format as genesis.md (task IDs, prerequisites, criteria)
- [ ] mvp-plan.md documents MVP scope, environment roadmap, phases, and gantt chart
- [ ] Implementation plan is complete and ready to execute

---

## Output Files

This workflow produces the following deliverables:

1. **idea.md** - Initial product idea (input, assumed to exist)
2. **brainstorm.md** - Brainstorming questions, answers, and insights (T002) ✓
3. **brief.md** - Comprehensive product brief (T003)
4. **requirements.md** - Requirements in EARS notation (T004)
5. **design.md** - Technical design and architecture (T005)
6. **tasks.md** - Implementation task list (T006)
7. **mvp-plan.md** - MVP roadmap, environment activation path, release phases, and gantt chart (T006)

---

## Progress Summary

**Overall Status**: In Progress (2/6 tasks complete)

| Task ID | Task Name | Status | Completion |
|---------|-----------|--------|------------|
| T001 | Understand Product Idea | [x] | 5/5 criteria |
| T002 | Brainstorm Product | [x] | 5/5 criteria |
| T003 | Create Product Brief | [ ] | 0/5 criteria |
| T004 | Develop Requirements | [ ] | 0/6 criteria |
| T005 | Create Technical Design | [ ] | 0/9 criteria |
| T006 | Produce Implementation Plan with MVP Roadmap | [ ] | 0/13 criteria |

**Next Action**: Begin T003 - Create Product Brief based on completed brainstorming work
