---
title: "Common Pitfalls: Architecture Anti-Patterns for AI"
chapter_title: "Architecture Principles for Agentic Development"
part: 1
chapter: 3
section: 8
version: "0.1"
date: "2026-01-29"
status: "draft"
author: "Brian Childress"
tags: ["architecture", "anti-patterns", "pitfalls", "foundations"]
related:
  - part1-foundations/05-new-bottlenecks/01-introduction.md
requirements:
  - REQ-C004
abstract: |
  Identifies the most common architecture mistakes when building systems
  for agentic development, from over-fragmentation to under-specification,
  with practical guidance on recognizing and avoiding each pitfall.
---

# Common Pitfalls: Architecture Anti-Patterns for AI

You understand the principles. You know what good architecture looks like. But knowing what to do isn't the same as avoiding what *not* to do. In practice, developers fall into predictable traps when architecting systems for agentic development.

Let's explore the most common pitfalls—the anti-patterns that undermine velocity, create confusion for AI agents, and turn promising architectures into maintenance nightmares. More importantly, let's learn how to recognize and avoid them.

## Pitfall 1: Over-Engineering for Perfect AI Digestion

**The Mistake**: Breaking every component into tiny, hyper-focused pieces to fit perfectly in AI context windows, creating a maze of micro-components that's impossible to navigate.

**What it looks like**:

```typescript
// Over-fragmented: Each validation rule in its own file
src/
  validation/
    email/
      email-format-validator.ts         (15 lines)
      email-domain-validator.ts         (12 lines)
      email-blacklist-validator.ts      (18 lines)
    password/
      password-length-validator.ts      (10 lines)
      password-complexity-validator.ts  (20 lines)
      password-common-validator.ts      (15 lines)
    username/
      username-length-validator.ts      (8 lines)
      username-chars-validator.ts       (12 lines)
```

This creates **90 lines spread across 8 files**. An AI agent (or human) must now read 8 files to understand user validation. The cognitive overhead of navigating files exceeds any benefit from smaller chunks.

**Why it happens**:

Developers hear "digestible components" and think "smaller is always better." They optimize for AI context window size without considering human comprehension or practical navigation.

**How to avoid it**:

**Use the 200-500 line rule**: Components should be large enough to be meaningful but small enough to be digestible. Combine related functionality.

**Better approach**:

```typescript
// Balanced: Related validations grouped logically
src/
  validation/
    user-validator.ts  (120 lines)
      - validateEmail()
      - validatePassword()
      - validateUsername()
```

**Heuristic**: If a human would naturally think "these things go together," keep them together. AI agents benefit from seeing related logic in context.

## Pitfall 2: Ignoring Human Readability

**The Mistake**: Optimizing architecture solely for AI agents at the expense of human understanding, creating systems that Claude Code can navigate but your team cannot.

**What it looks like**:

```typescript
// AI-optimized but human-hostile
interface UserCreationParams {
  p1: string;  // What is this?
  p2: string;  // Cryptic naming
  p3?: Date;
  opts: {      // Nested complexity
    f1: boolean;
    f2: number[];
    cfg: Record<string, unknown>;
  };
}
```

Sure, Claude can infer meaning from context, but your team members are stuck guessing. Code reviews become painful. Onboarding takes weeks.

**Why it happens**:

Developers assume AI agents don't need verbose names or clear documentation, so they optimize for brevity and token count.

**How to avoid it**:

**Design for humans first, AI second.** Clear, self-documenting code helps both humans and AI.

**Better approach**:

```typescript
// Clear for humans AND AI
interface UserCreationParams {
  email: string;
  password: string;
  birthdate?: Date;
  options: {
    sendWelcomeEmail: boolean;
    notificationPreferences: NotificationType[];
    metadata: Record<string, unknown>;
  };
}
```

**Heuristic**: If your team can't understand it in code review, Claude will struggle too—just in different ways.

## Pitfall 3: Under-Specifying Interfaces

**The Mistake**: Assuming AI agents can infer implicit contracts, leading to mismatched expectations and brittle integrations.

**What it looks like**:

```typescript
// Implicit contract - what does this return when not found?
async function getUser(id: string): Promise<User> {
  // Returns null? Throws error? Returns undefined?
  // AI must guess from implementation
}

// No validation specified - what's valid?
async function createProject(name: string) {
  // Max length for name? Required format?
  // Special characters allowed?
}
```

Claude Code might implement one interpretation while you expect another. Tests fail mysteriously. Integration breaks.

**Why it happens**:

Developers rely on "common sense" or institutional knowledge that AI agents don't have.

**How to avoid it**:

**Make contracts explicit.** Use TypeScript, JSDoc, OpenAPI, or AsyncAPI to define exact behavior.

**Better approach**:

```typescript
/**
 * Retrieves user by ID.
 *
 * @param id - User UUID (must be valid UUID format)
 * @returns User object if found
 * @throws UserNotFoundError if user doesn't exist
 * @throws InvalidIdError if id format is invalid
 */
async function getUser(id: string): Promise<User> {
  // Explicit contract: throws on not found
}

/**
 * Creates new project.
 *
 * @param name - Project name (3-100 chars, alphanumeric + spaces)
 * @throws ValidationError if name is invalid
 */
async function createProject(name: string): Promise<Project> {
  if (name.length < 3 || name.length > 100) {
    throw new ValidationError('Name must be 3-100 characters');
  }
}
```

**Heuristic**: If you can't write the error cases in documentation, your interface is under-specified.

## Pitfall 4: Premature Abstraction

**The Mistake**: Creating elaborate abstraction layers before understanding the problem domain, then fighting the abstractions as requirements evolve.

**What it looks like**:

```typescript
// Over-abstracted before understanding needs
abstract class BaseRepository<T, ID> {
  abstract findById(id: ID): Promise<T | null>;
  abstract findAll(options?: FindOptions): Promise<T[]>;
  abstract save(entity: T): Promise<T>;
  abstract delete(id: ID): Promise<void>;
  abstract executeQuery(query: Query): Promise<unknown>;
  // 20+ more abstract methods for every possible case
}

// Now every repository must implement all methods,
// even if they don't need them
class UserRepository extends BaseRepository<User, string> {
  // Forced to implement 25 methods when we only need 5
}
```

**Why it happens**:

Developers want to "do it right from the start" and create flexible abstractions. They optimize for future flexibility that never materializes.

**How to avoid it**:

**Follow the Rule of Three**: Create abstractions after you've written similar code three times, not before. Let patterns emerge organically.

**Better approach**:

```typescript
// Start concrete, extract patterns when they emerge
class UserRepository {
  async findById(id: string): Promise<User | null> {
    // Simple, focused implementation
  }

  async create(user: NewUser): Promise<User> {
    // Only the methods we actually need
  }
}

// After 3-4 repositories, patterns emerge:
// "They all need findById and create"
// THEN extract common interface
```

**Heuristic**: If Claude Code asks "why do I need to implement this method?", your abstraction is premature.

## Pitfall 5: Neglecting Integration Points

**The Mistake**: Focusing intensely on individual component design while ignoring how components connect and communicate, leading to integration nightmares.

**What it looks like**:

```typescript
// Beautiful internal design, terrible integration
class PaymentService {
  // Perfect single responsibility
  // Great test coverage
  // Excellent error handling
  async processPayment(amount: number): Promise<void> {
    // But... how does OrderService know payment completed?
    // How does InventoryService know to reserve items?
    // How does EmailService know to send receipt?
  }
}
```

Each service is well-designed in isolation, but they don't work together. Integration requires coupling them tightly or building complex orchestration.

**Why it happens**:

Developers optimize for component clarity while forgetting that real systems are collections of components that must collaborate.

**How to avoid it**:

**Design integration patterns early.** Decide how components communicate (events, direct calls, message queues) before implementing them.

**Better approach**:

```typescript
// Design includes integration strategy
class PaymentService {
  constructor(private eventBus: EventBus) {}

  async processPayment(
    amount: number,
    orderId: string
  ): Promise<void> {
    // Process payment
    const result = await this.gateway.charge(amount);

    // Explicit integration point
    await this.eventBus.publish(new PaymentCompleted({
      orderId,
      amount,
      transactionId: result.id
    }));
  }
}

// Other services subscribe to events
class OrderService {
  @Subscribe(PaymentCompleted)
  async handlePaymentCompleted(event: PaymentCompleted) {
    await this.markOrderPaid(event.orderId);
  }
}
```

**Heuristic**: If you can't draw arrows between your components showing how they communicate, you've neglected integration.

## Pitfall 6: Testing the Wrong Abstraction Layer

**The Mistake**: Writing tests that verify implementation details instead of behavior, creating brittle tests that break whenever you refactor.

**What it looks like**:

```typescript
// Brittle test - tests implementation, not behavior
test('user creation uses bcrypt', () => {
  const service = new UserService();

  // Test breaks if we switch to argon2
  expect(service.hasher).toBeInstanceOf(BcryptHasher);
  expect(service.hasher.rounds).toBe(10);
});
```

This test couples to the implementation (bcrypt). Switch hashing algorithms? All tests break, even though behavior is identical.

**Why it happens**:

Developers test what's easy to verify (internal state) rather than what matters (external behavior).

**How to avoid it**:

**Test contracts, not implementations.** Verify observable behavior from the component's public interface.

**Better approach**:

```typescript
// Robust test - tests behavior contract
test('user passwords are securely hashed', async () => {
  const service = new UserService();
  const plaintext = 'mypassword123';

  const user = await service.createUser('test@example.com',
                                       plaintext);

  // Hash is different from plaintext
  expect(user.passwordHash).not.toBe(plaintext);

  // Same password validates successfully
  const valid = await service.validatePassword(
    user.id,
    plaintext
  );
  expect(valid).toBe(true);

  // Different password fails
  const invalid = await service.validatePassword(
    user.id,
    'wrongpassword'
  );
  expect(invalid).toBe(false);
});
```

This test works regardless of hashing algorithm. Switch to argon2? Tests still pass. That's robust.

**Heuristic**: If your test would break from a refactoring that doesn't change behavior, you're testing the wrong layer.

## Pitfall 7: Cargo Culting Microservices

**The Mistake**: Adopting microservices architecture because "that's what AI needs" without considering if your system benefits from it.

**What it looks like**:

```text
Your 6-week MVP split into 15 microservices:
- User Service
- Auth Service
- Email Service
- SMS Service
- Payment Service
- Order Service
- Inventory Service
- Shipping Service
- Notification Service
- Analytics Service
- Logging Service
... and 4 more

Each with its own:
- Database
- Docker container
- CI/CD pipeline
- Monitoring
- Deployment config
```

You're now managing distributed systems complexity for an MVP that could run on a single server. Debugging spans 15 services. Deployments take hours. "Simple" features require coordinating changes across 5 services.

**Why it happens**:

Developers read that digestible components are good, conclude that maximum decomposition is better, and separate everything.

**How to avoid it**:

**Start with a modular monolith.** Create clear component boundaries *within* a single codebase. Extract services only when you have proven need (scale, team boundaries, deployment independence).

**Better approach**:

```typescript
// Modular monolith - clear boundaries, single deployment
src/
  modules/
    users/
      user.service.ts       # Clear module boundary
      user.repository.ts
    payments/
      payment.service.ts    # Independent module
      payment.repository.ts
    orders/
      order.service.ts      # Could extract later if needed
      order.repository.ts
  app.ts                     # Wires modules together
```

Claude Code works just as well with modules as with microservices. When you *need* to extract a service (scale, team split), the module becomes a service trivially.

**Heuristic**: If your team is smaller than 10 people, you probably don't need microservices.

## Pitfall 8: Skipping the "Why" in Documentation

**The Mistake**: Documenting *what* the code does without explaining *why* architectural decisions were made, leaving AI agents (and humans) to guess at intent.

**What it looks like**:

```typescript
// Documents "what" but not "why"
/**
 * Processes payment asynchronously.
 */
async function processPaymentAsync(amount: number) {
  await queue.enqueue({ type: 'payment', amount });
}
```

Why asynchronous? Is it for performance? Reliability? Decoupling? Without the "why," Claude Code might suggest removing the queue for "simplicity," breaking a critical architectural requirement.

**Why it happens**:

Developers assume architectural context is obvious or don't want to "clutter" code with explanations.

**How to avoid it**:

**Document architectural decisions.** Explain why, not just what.

**Better approach**:

```typescript
/**
 * Processes payment asynchronously via queue.
 *
 * WHY ASYNC: Payment processing can take 5-10 seconds with
 * external payment gateway. Queueing prevents API timeouts
 * and allows retry logic if gateway is down.
 *
 * IMPORTANT: Do not make this synchronous - API requests
 * will timeout waiting for gateway response.
 */
async function processPaymentAsync(amount: number) {
  await queue.enqueue({ type: 'payment', amount });
}
```

Now Claude Code understands the architectural rationale and won't suggest "improvements" that break requirements.

**Heuristic**: If a future developer (or AI) might ask "why did they do it this way?", document the why.

## How to Recognize You're in a Pitfall

**Warning signs**:

- ✗ Claude Code's implementations consistently miss your intent
- ✗ Simple changes require modifying dozens of files
- ✗ Code reviews devolve into "what does this even do?"
- ✗ Tests break whenever you refactor without changing behavior
- ✗ Integration between components is fragile and complex
- ✗ You spend more time managing infrastructure than building features

**Healthy signs**:

- ✓ Claude Code generates code that works on first try (or needs minor tweaks)
- ✓ New features are localized to 1-3 components
- ✓ Team members quickly understand code in reviews
- ✓ Tests remain stable through refactorings
- ✓ Components integrate cleanly with minimal glue code
- ✓ Most of your time is spent on product features

## The Balanced Approach

Good architecture for agentic development balances:

- **Digestibility** ← → **Cohesion**: Small enough to understand, large enough to be meaningful
- **AI optimization** ← → **Human readability**: Helps both, never sacrifices one for the other
- **Explicit contracts** ← → **Flexibility**: Defined interfaces with room for evolution
- **Abstraction** ← → **Concreteness**: Extract patterns when proven, not in anticipation
- **Component clarity** ← → **Integration design**: Beautiful parts *and* seamless collaboration

In the next section, [Summary](./09-summary.md), we'll distill all the principles and lessons from this chapter into actionable takeaways you can apply immediately.
