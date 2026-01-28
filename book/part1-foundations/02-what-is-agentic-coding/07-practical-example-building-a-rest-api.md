---
title: 'Practical Example: Building a REST API'
chapter_title: What is Agentic Coding?
part: 1
chapter: 2
section: 7
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
abstract: Section 7 of What is Agentic Coding?
---

Let's make this concrete with a complete example: building a REST API for a task management system. We'll contrast the traditional approach with the agentic approach to see the differences clearly.

### Traditional Approach (Pre-2024)

**Goal**: Build a REST API for managing tasks with endpoints for creating, reading, updating, and deleting tasks, plus listing tasks by user and by status.

**Timeline**:

#### Hour 1-2: Setup and boilerplate

- Initialize project structure
- Configure dependencies (Express, database driver, testing framework)
- Set up database connection
- Create base server with middleware

#### Hour 3-4: Implement endpoints

- Write POST /tasks endpoint with validation
- Write GET /tasks/:id endpoint
- Write PUT /tasks/:id endpoint
- Write DELETE /tasks/:id endpoint
- Write GET /tasks?user_id=X endpoint
- Write GET /tasks?status=X endpoint

#### Hour 5-6: Error handling and validation

- Add input validation for all endpoints
- Implement error handling middleware
- Add database error handling
- Add authentication/authorization checks

#### Hour 7-8: Testing

- Write unit tests for each endpoint
- Write integration tests
- Test edge cases (invalid IDs, missing fields, etc.)
- Debug test failures

#### Hour 9-10: Documentation and polish

- Write API documentation
- Add request/response examples
- Final testing and debugging
- Code review and cleanup

**Total time**: 10-12 hours of focused work

**Result**: Working API with reasonable test coverage and basic documentation

### Agentic Approach (2026)

**Goal**: Same as above—complete REST API for task management.

**Timeline**:

#### 30 minutes: Write OpenAPI specification

Instead of writing code, you write a spec describing what the API should do:

```yaml
openapi: 3.0.0
info:
  title: Task Management API
  version: 1.0.0

paths:
  /tasks:
    get:
      summary: List tasks
      parameters:
        - name: user_id

          in: query
          schema:
            type: integer
        - name: status

          in: query
          schema:
            type: string
            enum: [pending, in_progress, completed]
      responses:
        200:
          description: Task list
          content:
            application/json:
              schema:
                type: array
                items:
                  $ref: '#/components/schemas/Task'

    post:
      summary: Create task
      requestBody:
        content:
          application/json:
            schema:
              $ref: '#/components/schemas/TaskCreate'
      responses:
        201:
          description: Task created
          content:
            application/json:
              schema:
                $ref: '#/components/schemas/Task'

  /tasks/{id}:
    get:
      summary: Get task by ID
      parameters:
        - name: id

          in: path
          required: true
          schema:
            type: integer
      responses:
        200:
          description: Task details
          content:
            application/json:
              schema:
                $ref: '#/components/schemas/Task'
        404:
          description: Task not found

components:
  schemas:
    Task:
      type: object
      properties:
        id:
          type: integer
        title:
          type: string
        description:
          type: string
        status:
          type: string
          enum: [pending, in_progress, completed]
        user_id:
          type: integer
        created_at:
          type: string
          format: date-time

```

You're thinking about the API design, not implementation details. What endpoints? What parameters? What responses? The spec captures your requirements precisely.

#### 5 minutes: Generate server scaffold

Feed the OpenAPI spec to an NL2Code tool: "Generate an Express.js server implementing this API with PostgreSQL backend, input validation, error handling, and basic authentication."

Output: Complete project structure with:

- All routes implemented
- Request validation using the spec
- Database schema and migrations
- Error handling middleware
- Authentication middleware
- Basic configuration

#### 1-2 hours: Implement business logic

The generated code handles all the mechanical parts—routing, validation, serialization. You focus on the parts that need your domain knowledge:

- Task ownership rules (who can modify whose tasks?)
- Status transition logic (can you skip from pending to completed?)
- Notification triggers (notify assignee when status changes)
- Performance optimizations (indices, query optimization)

You work with a pair programming tool that suggests implementations based on your codebase patterns. It understands your architecture and follows your conventions.

#### 15 minutes: Generate test suite

Point an AI testing tool at your implementation: "Generate comprehensive tests covering all endpoints, edge cases, and error conditions."

Output: Test suite with:

- Happy path tests for all endpoints
- Edge case tests (invalid IDs, missing fields, wrong types)
- Authorization tests (users can't modify others' tasks)
- Error handling tests (database failures, network issues)
- Performance tests (large task lists, query efficiency)

You review the tests, add a few domain-specific cases the AI missed, and run the suite.

#### 10 minutes: Code review

Run AI code review: "Check this implementation for security issues, code quality, and best practices."

Findings:

- Missing index on user_id field (performance issue)
- No rate limiting (security issue)
- Inconsistent error message format (UX issue)
- SQL injection risk in custom query filter (security issue)

All legitimate issues you fix quickly with pair programming assistance.

#### 30 minutes: Fix issues and finalize

Address the review findings:

- Add database index
- Implement rate limiting following project patterns
- Standardize error messages
- Fix SQL injection vulnerability using parameterized queries

Run tests again (all pass), do final review, and deploy.

**Total time**: 3-4 hours

**Result**: Production-ready API with comprehensive tests, security review passed, complete documentation (the OpenAPI spec serves as documentation), and better coverage than the traditional approach.

### The Difference

Same result, but:

- **60-70% time savings** (10-12 hours → 3-4 hours)
- **Better test coverage** (AI generates edge cases you'd skip)
- **Better documentation** (OpenAPI spec is both input and documentation)
- **Fewer security issues** (AI review catches common vulnerabilities)
- **More time on business logic** (70% of your time vs 20%)

The mechanical work—boilerplate, validation, testing setup—collapses to minutes. Your time goes to requirements clarity (writing the spec) and business logic (domain-specific rules). That's the agentic coding promise realized.
