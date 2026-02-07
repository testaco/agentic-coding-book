---
title: "Unified Principles: Interfaces That Serve Both"
chapter_title: "Digestible Interfaces"
part: 1
chapter: 4
section: 5
version: "1.0"
date: "2026-02-05"
status: "published"
author: "Chris Testa"
tags: ["interfaces", "design-principles", "foundations", "best-practices"]
related:
  - part1-foundations/03-architecture-principles/03-component-decomposition.md
  - part3-patterns-tools/architecture/interface-boundaries.md
requirements:
  - REQ-C005
abstract: |
  The core design principles for creating interfaces that are digestible for
  both human developers and AI agents - with the key insight that serving one
  audience automatically serves the other.
---

# Unified Principles: Interfaces That Serve Both

We've seen that humans and AI agents face parallel constraints. Working memory maps to context windows. Cognitive load maps to token efficiency. Selective attention maps to attention mechanisms. This parallel reveals something powerful: **you don't need separate "human-friendly" and "AI-friendly" interface designs. The same principles serve both.**

This is the central insight of digestible interface design. Optimize for one audience, and you automatically optimize for the other. What makes code easy for a human to understand makes it easy for an AI agent to process. What makes an interface error-prone for humans makes it error-prone for AI.

Let's codify these principles.

## Principle 1: Single Responsibility

**Each interface does ONE thing well.**

This is the most fundamental principle. An interface with a single, clear purpose is easier to understand, easier to use correctly, and easier to modify without breaking other things.

```python
# Violates single responsibility
def handle_user_request(request):
    """Parse request, authenticate, authorize, execute,
    log, cache, and return response."""
    pass

# Follows single responsibility
def authenticate_user(credentials: Credentials) -> AuthResult:
    """Authenticate user from credentials."""
    pass

def authorize_action(user: User, action: Action) -> bool:
    """Check if user is authorized for action."""
    pass

def execute_action(user: User, action: Action) -> ActionResult:
    """Execute an authorized action."""
    pass
```

**For humans**: Single responsibility means you can understand what a function does without tracking multiple concerns. You can modify authentication logic without worrying about caching.

**For AI agents**: Single responsibility means less context needed to understand and use an interface. The agent can focus on one task without reasoning about unrelated behaviors.

**Guideline**: If you can't describe what a function does in one sentence without using "and," it probably does too much.

## Principle 2: Limited Parameters

**Five or fewer parameters per function.**

This isn't arbitrary—it's derived from working memory limits and context efficiency.

```python
# Too many parameters
def send_email(
    to, cc, bcc, subject, body, attachments,
    reply_to, priority, tracking, template_id,
    personalization_data, send_at
):
    pass

# Appropriate parameters
def send_email(message: EmailMessage) -> SendResult:
    """Send an email message.

    Args:
        message: Complete email with recipients, content, options

    Returns:
        SendResult with delivery status and message ID
    """
    pass

@dataclass
class EmailMessage:
    """An email message ready to send."""
    to: List[str]
    subject: str
    body: str
    cc: List[str] = field(default_factory=list)
    bcc: List[str] = field(default_factory=list)
    attachments: List[Attachment] = field(default_factory=list)
    options: EmailOptions = field(default_factory=EmailOptions)
```

**For humans**: You can hold five things in working memory while making a function call. Beyond that, you're constantly referencing documentation.

**For AI agents**: Fewer parameters mean fewer tokens to process and less chance of mixing up argument order. Type hints on parameter objects provide self-documentation.

**Guideline**: When you exceed five parameters, group related ones into parameter objects. `send_email(message)` is clearer than `send_email(to, cc, bcc, subject, body, ...)`.

## Principle 3: Explicit Over Implicit

**No hidden state, side effects, or magic behavior.**

Everything a function needs should be visible in its signature. Everything it does should be predictable from its documentation.

```python
# Implicit dependencies (bad)
def generate_report():
    # Depends on global config, environment variables,
    # current working directory, system timezone
    config = GlobalConfig.instance()
    db = get_database_from_env()
    tz = system_timezone()
    # ...

# Explicit dependencies (good)
def generate_report(
    data_source: DataSource,
    report_config: ReportConfig,
    timezone: ZoneInfo = ZoneInfo("UTC")
) -> Report:
    """Generate report from data source with configuration."""
    pass
```

**For humans**: Explicit dependencies mean no mysterious failures. You can read the function signature and know everything it needs.

**For AI agents**: Explicit dependencies mean the agent can reason about the function from its signature alone. No need to trace through implementation to discover hidden requirements.

**Guideline**: If a function depends on something, that something should appear in its signature or be documented clearly.

## Principle 4: Self-Documenting Names

**Function and parameter names explain themselves.**

Good names reduce the need for external documentation. They make code readable without comments.

```python
# Names that require explanation
def proc(d, m):
    pass

def handle(x, flag):
    pass

# Self-documenting names
def calculate_shipping_cost(order: Order) -> Decimal:
    pass

def validate_email_format(email: str) -> ValidationResult:
    pass
```

**For humans**: You read code far more than you write it. Self-documenting names reduce the cognitive load of understanding.

**For AI agents**: Names are patterns. `calculate_shipping_cost` tells the agent this function calculates something, specifically a cost, specifically for shipping. The agent can infer correct usage from the name alone.

**Guideline**: If you need a comment to explain what a variable or function does, rename it instead.

## Principle 5: Consistent Patterns

**Similar things work similarly.**

Consistency reduces learning curves and enables pattern recognition.

```python
# Inconsistent (bad)
class UsersAPI:
    def get_user(self, id) -> User: pass
    def fetch_all_users(self) -> List[User]: pass
    def user_by_email(self, email) -> User: pass

class OrdersAPI:
    def retrieve_order(self, order_id) -> Order: pass
    def list_orders(self, filters) -> List[Order]: pass
    def find_by_customer(self, customer) -> List[Order]: pass

# Consistent (good)
class UsersAPI:
    def get(self, id: int) -> User: pass
    def list(self, filters: UserFilters = None) -> List[User]: pass
    def find_by_email(self, email: str) -> User: pass

class OrdersAPI:
    def get(self, id: int) -> Order: pass
    def list(self, filters: OrderFilters = None) -> List[Order]: pass
    def find_by_customer(self, customer_id: int) -> List[Order]: pass
```

**For humans**: Once you learn how `UsersAPI.get()` works, you know how `OrdersAPI.get()` works. Consistency compounds across a codebase.

**For AI agents**: Consistent patterns enable generalization. The agent learns the pattern once and applies it everywhere. Inconsistency forces explicit tracking of each variation.

**Guideline**: Establish conventions and follow them ruthlessly. Use linters and code review to enforce consistency.

## Principle 6: Fail Fast with Clear Errors

**Validate inputs immediately. Make error messages actionable.**

When something goes wrong—and it will—the feedback should help recovery, not obscure the problem.

```python
# Unhelpful error handling
def create_user(data):
    try:
        # ... lots of code ...
        return user
    except Exception:
        raise Exception("Failed to create user")

# Helpful error handling
def create_user(user_data: CreateUserRequest) -> User:
    """Create a new user account.

    Raises:
        ValidationError: If user_data fails validation, with details
        DuplicateEmailError: If email is already registered
        DatabaseError: If persistence fails
    """
    if not user_data.email:
        raise ValidationError(
            field="email",
            message="Email is required",
            value=user_data.email
        )

    if not is_valid_email(user_data.email):
        raise ValidationError(
            field="email",
            message="Invalid email format. Expected: user@domain.com",
            value=user_data.email
        )

    if user_exists(user_data.email):
        raise DuplicateEmailError(
            email=user_data.email,
            message=f"User with email {user_data.email} already exists"
        )
    # ...
```

**For humans**: Clear errors mean faster debugging. You know exactly what went wrong and how to fix it.

**For AI agents**: Clear errors enable self-correction. When an AI agent makes a mistake, informative errors help it understand what to do differently.

**Guideline**: Errors should answer three questions: What happened? Why did it happen? What should I do about it?

```mermaid
flowchart TD
    subgraph "Bad Error Flow"
        B1[Call Function] --> B2[Generic Exception]
        B2 --> B3[Confused Developer/Agent]
        B3 --> B4[Debug by Reading Source]
        B4 --> B5[Eventually Fix]
    end

    subgraph "Good Error Flow"
        G1[Call Function] --> G2[Specific Error]
        G2 --> G3[Error Explains Problem]
        G3 --> G4[Fix Immediately]
    end

    style B2 fill:#ef5350
    style B3 fill:#ffcdd2
    style B4 fill:#ffcdd2
    style G2 fill:#66bb6a
    style G3 fill:#c8e6c9
    style G4 fill:#c8e6c9
```

*Figure 4.5: Error handling impact. Generic errors lead to debugging spirals. Specific, actionable errors enable immediate fixes for both humans and AI agents.*

## The Meta-Principle

If you need to remember just one thing, remember this:

> **Design interfaces as if you'll need to explain them to someone who has never seen your codebase before. If you can't explain it clearly in 2-3 sentences, the interface is probably too complex.**

This "someone" could be:

- A new team member joining the project
- A future you who has forgotten the details
- An AI agent with no prior context

The discipline of imagining this explanation reveals complexity. When you catch yourself saying "well, first you need to understand X, and then Y, and there's also this special case..." you've found an interface that needs simplification.

## Applying the Principles Together

These principles reinforce each other. Here's a before/after example combining all six:

**Before** (violates multiple principles):

```python
def process_order(
    items, customer_id, shipping_type, billing, promo,
    gift, notes, priority, insurance, signature
):
    """Process order. See docs for details.

    Note: Requires ORDER_SYSTEM_URL environment variable.
    Gift options only work if shipping_type is 'standard' or 'express'.
    Priority orders require insurance=True.
    """
    # 200 lines of interleaved concerns...
    pass
```

**After** (follows all principles):

```python
def create_order(order_request: OrderRequest) -> Order:
    """Create a new order from request.

    Args:
        order_request: Validated order with items, shipping, payment

    Returns:
        Created Order with ID and status

    Raises:
        ValidationError: If request fails validation (details in error)
        InventoryError: If items are unavailable
        PaymentError: If payment processing fails
    """
    pass

@dataclass
class OrderRequest:
    """Request to create an order."""
    customer_id: int
    items: List[OrderItem]
    shipping: ShippingOptions
    payment: PaymentInfo
    options: OrderOptions = field(default_factory=OrderOptions)

    def __post_init__(self):
        if not self.items:
            raise ValidationError("Order must have at least one item")
        if self.options.priority and not self.options.insurance:
            raise ValidationError("Priority orders require insurance")
```

The improved version:

- **Single responsibility**: Creates an order (one thing)
- **Limited parameters**: One parameter object
- **Explicit**: No hidden environment dependencies
- **Self-documenting**: Names explain purpose
- **Consistent**: Follows standard request/response pattern
- **Fails fast**: Validates in `__post_init__`, clear error messages

Both humans and AI agents can understand and use this interface correctly on the first attempt.

## Summary

The unified principles for digestible interfaces:

1. **Single Responsibility**: Each interface does one thing well
2. **Limited Parameters**: Five or fewer parameters per function
3. **Explicit Over Implicit**: No hidden state or magic behavior
4. **Self-Documenting Names**: Names explain purpose without comments
5. **Consistent Patterns**: Similar things work similarly
6. **Fail Fast with Clear Errors**: Validate early, explain clearly

These principles serve both human developers and AI agents because both face parallel constraints. Design for digestibility, and you automatically design for both audiences.

In the next section, we'll see these principles in action through concrete before/after examples.
