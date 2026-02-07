---
title: "Examples: Good vs. Bad Interfaces"
chapter_title: "Digestible Interfaces"
part: 1
chapter: 4
section: 6
version: "1.0"
date: "2026-02-05"
status: "published"
author: "Chris Testa"
tags: ["interfaces", "examples", "code-examples", "best-practices"]
related:
  - part1-foundations/03-architecture-principles/07-practical-application.md
requirements:
  - REQ-C005
abstract: |
  Concrete before/after examples showing digestible vs. complex interfaces
  across different scenarios - API endpoints, functions, configuration, and
  data structures.
---

# Examples: Good vs. Bad Interfaces

Theory is useful, but examples make principles concrete. In this section, we'll examine real-world interface patterns—the kind you encounter every day—and see how digestible design transforms them.

For each example, we'll examine:

1. The problematic version and its issues
2. Why it's hard for humans AND AI agents
3. The improved version
4. Why it works better for both audiences

## Example 1: Function Signatures

**The Problem**: A function with too many parameters.

### Bad: The Parameter Explosion

```python
def create_user(
    username,
    email,
    password,
    first_name,
    last_name,
    date_of_birth,
    phone_number,
    address_line1,
    address_line2,
    city,
    state,
    postal_code,
    country,
    newsletter_opt_in,
    terms_accepted,
    privacy_accepted,
    referral_code,
    preferred_language,
    timezone,
    profile_image_url,
    bio
):
    """Create a new user with the provided information."""
    pass
```

**Human problems**:

- Can't remember parameter order without documentation
- Easy to swap similar parameters (city/state, first_name/last_name)
- Calling code is unreadable: `create_user("alice", "a@b.com", "secret", "Alice", "Smith", ...)`
- Adding a new parameter requires finding all call sites

**AI agent problems**:

- 21 parameters consume significant context explaining each one
- High probability of mixing up argument positions
- Agent may not know which parameters are optional
- Generated calls will be verbose and hard to verify

### Good: Structured Parameter Objects

```python
@dataclass
class UserProfile:
    """User's personal information."""
    first_name: str
    last_name: str
    date_of_birth: date
    bio: str = ""
    profile_image_url: Optional[str] = None

@dataclass
class Address:
    """Physical address."""
    line1: str
    city: str
    state: str
    postal_code: str
    country: str
    line2: str = ""

@dataclass
class ContactInfo:
    """Contact information."""
    email: str
    phone: Optional[str] = None

@dataclass
class Preferences:
    """User preferences."""
    language: str = "en"
    timezone: str = "UTC"
    newsletter_opt_in: bool = False

@dataclass
class CreateUserRequest:
    """Request to create a new user account."""
    username: str
    password: str
    contact: ContactInfo
    profile: UserProfile
    address: Optional[Address] = None
    preferences: Preferences = field(default_factory=Preferences)
    referral_code: Optional[str] = None

    def __post_init__(self):
        if len(self.password) < 8:
            raise ValidationError("Password must be at least 8 characters")

def create_user(request: CreateUserRequest) -> User:
    """Create a new user account.

    Args:
        request: Validated user creation request

    Returns:
        Created User with assigned ID

    Raises:
        ValidationError: If request data is invalid
        DuplicateUserError: If username or email exists
    """
    pass
```

**Why this is better**:

- **For humans**: Related fields are grouped logically. IDE autocomplete shows structure. Call sites are readable.
- **For AI agents**: Single parameter to understand. Type hints provide complete documentation. Validation is built-in.

**Usage comparison**:

```python
# Bad: What do all these parameters mean?
create_user("alice", "a@b.com", "secret123", "Alice", "Smith",
            date(1990, 1, 15), "555-1234", "123 Main St", "",
            "Seattle", "WA", "98101", "US", True, True, True,
            None, "en", "America/Los_Angeles", None, "Hello!")

# Good: Self-documenting structure
create_user(CreateUserRequest(
    username="alice",
    password="secret123",
    contact=ContactInfo(email="a@b.com", phone="555-1234"),
    profile=UserProfile(
        first_name="Alice",
        last_name="Smith",
        date_of_birth=date(1990, 1, 15),
        bio="Hello!"
    ),
    address=Address(
        line1="123 Main St",
        city="Seattle",
        state="WA",
        postal_code="98101",
        country="US"
    )
))
```

## Example 2: API Endpoints

**The Problem**: REST endpoints with unclear contracts.

### Bad: Ambiguous API

```python
# What does this endpoint accept? Return? When does it fail?
@app.route('/api/orders', methods=['POST'])
def create_order():
    data = request.json
    # Accepts... something
    # Returns... something
    # Might fail... somehow
    pass

@app.route('/api/orders/<id>')
def get_order(id):
    # What type is id? String? Int?
    # What if order doesn't exist?
    # What fields are returned?
    pass
```

**Problems for both audiences**:

- No type information on inputs or outputs
- Error cases undocumented
- No way to know what fields to send or expect

### Good: Explicit API Contract

```python
from pydantic import BaseModel, Field
from typing import List
from decimal import Decimal
from datetime import datetime

# Request/Response models
class OrderItem(BaseModel):
    """Item in an order."""
    product_id: int = Field(gt=0, description="Product ID")
    quantity: int = Field(gt=0, le=100, description="Quantity")

class CreateOrderRequest(BaseModel):
    """Request to create an order."""
    customer_id: int = Field(gt=0)
    items: List[OrderItem] = Field(min_items=1, max_items=50)
    shipping_address_id: int = Field(gt=0)
    notes: str = Field(default="", max_length=500)

class OrderResponse(BaseModel):
    """Order data returned from API."""
    id: int
    customer_id: int
    items: List[OrderItem]
    total: Decimal
    status: str = Field(pattern="^(pending|confirmed|shipped|delivered)$")
    created_at: datetime

class ErrorResponse(BaseModel):
    """Error response format."""
    error: str
    details: dict = {}

# Endpoints with clear contracts
@app.route('/api/orders', methods=['POST'])
def create_order():
    """Create a new order.

    Request body: CreateOrderRequest
    Success (201): OrderResponse
    Errors:
        400: ValidationError - Invalid request data
        404: NotFoundError - Customer or shipping address not found
        409: ConflictError - Items out of stock
    """
    try:
        request_data = CreateOrderRequest(**request.json)
        order = order_service.create(request_data)
        return OrderResponse.from_orm(order).dict(), 201
    except ValidationError as e:
        return ErrorResponse(error="Validation failed",
                           details=e.errors()).dict(), 400

@app.route('/api/orders/<int:order_id>')
def get_order(order_id: int):
    """Get order by ID.

    Path params:
        order_id: Integer order ID (positive)

    Success (200): OrderResponse
    Errors:
        404: Order not found
    """
    order = order_service.get(order_id)
    if not order:
        return ErrorResponse(error="Order not found").dict(), 404
    return OrderResponse.from_orm(order).dict()
```

**Why this is better**:

- **Types are explicit**: Pydantic models define exact shapes
- **Validation is automatic**: Invalid requests fail fast with clear errors
- **Documentation is code**: The models ARE the API contract
- **AI agents can generate correct calls**: Structure is unambiguous

## Example 3: Configuration

**The Problem**: Configuration files that are hard to understand and easy to misconfigure.

### Bad: Flat Configuration Soup

```yaml
# config.yaml - What do these mean? What are valid values?
app_name: myapp
debug: true
log_level: 3
db_host: localhost
db_port: 5432
db_name: myapp_db
db_user: admin
db_pass: secret
db_pool_size: 10
db_timeout: 30
cache_enabled: yes
cache_host: localhost
cache_port: 6379
cache_ttl: 3600
cache_max_size: 1000
email_host: smtp.gmail.com
email_port: 587
email_user: app@example.com
email_pass: secret2
email_tls: 1
api_rate_limit: 100
api_timeout: 30000
feature_new_ui: true
feature_beta_api: false
```

**Problems**:

- Flat structure with no organization
- Inconsistent boolean formats (true, yes, 1)
- Unclear units (is timeout in seconds? milliseconds?)
- No validation—typos silently break things
- Related settings scattered throughout

### Good: Structured Configuration

```yaml
# config.yaml - Organized, typed, documented
app:
  name: myapp
  environment: development  # development | staging | production
  debug: true               # Enable debug mode

logging:
  level: INFO               # DEBUG | INFO | WARNING | ERROR
  format: json              # json | text

database:
  host: localhost
  port: 5432
  name: myapp_db
  credentials:
    username: admin
    password: ${DB_PASSWORD}  # From environment variable
  pool:
    size: 10                 # Connection pool size
    timeout_seconds: 30      # Connection timeout

cache:
  enabled: true
  provider: redis            # redis | memcached | memory
  redis:
    host: localhost
    port: 6379
  ttl_seconds: 3600          # Default TTL for cached items
  max_entries: 1000

email:
  provider: smtp
  smtp:
    host: smtp.gmail.com
    port: 587
    tls: true
    credentials:
      username: app@example.com
      password: ${EMAIL_PASSWORD}

api:
  rate_limit:
    requests_per_minute: 100
  timeout_seconds: 30

features:
  new_ui: true
  beta_api: false
```

```python
# config.py - Typed configuration loading
from pydantic import BaseSettings, Field
from typing import Literal

class DatabaseConfig(BaseSettings):
    host: str = "localhost"
    port: int = Field(default=5432, ge=1, le=65535)
    name: str
    username: str
    password: str
    pool_size: int = Field(default=10, ge=1, le=100)
    timeout_seconds: int = Field(default=30, ge=1)

class CacheConfig(BaseSettings):
    enabled: bool = True
    provider: Literal["redis", "memcached", "memory"] = "redis"
    ttl_seconds: int = Field(default=3600, ge=0)
    max_entries: int = Field(default=1000, ge=1)

class AppConfig(BaseSettings):
    name: str
    environment: Literal["development", "staging", "production"]
    debug: bool = False
    database: DatabaseConfig
    cache: CacheConfig
    # ... other nested configs

# Load and validate on startup
config = AppConfig.parse_file("config.yaml")
```

**Why this is better**:

- **Hierarchical organization**: Related settings grouped together
- **Clear units**: `timeout_seconds` vs ambiguous `timeout`
- **Typed validation**: Invalid values caught at startup
- **Self-documenting**: Structure shows relationships
- **AI-friendly**: Agent can navigate and modify specific sections

## Example 4: Data Structures

**The Problem**: Data models with unclear meaning and relationships.

### Bad: Generic Dictionaries

```python
# What fields? What types? What's required?
def process_transaction(txn: dict) -> dict:
    """Process a transaction."""
    # txn has... fields?
    # Returns... data?
    pass

# Actual usage reveals nothing
result = process_transaction({
    "amt": 100,
    "curr": "USD",
    "src": "card_123",
    "dst": "acct_456",
    "meta": {"ip": "1.2.3.4"},
    "ts": 1234567890,
    "type": 1
})
# result["status"]? result["id"]? Who knows.
```

**Problems**:

- No type information at any point
- Field names are cryptic abbreviations
- No way to know required vs optional fields
- No validation—anything can be passed

### Good: Explicit Data Models

```python
from dataclasses import dataclass
from datetime import datetime
from decimal import Decimal
from enum import Enum
from typing import Optional

class TransactionType(Enum):
    """Type of financial transaction."""
    PAYMENT = "payment"
    REFUND = "refund"
    TRANSFER = "transfer"

class TransactionStatus(Enum):
    """Status of a transaction."""
    PENDING = "pending"
    COMPLETED = "completed"
    FAILED = "failed"

@dataclass
class Money:
    """Monetary amount with currency."""
    amount: Decimal
    currency: str  # ISO 4217 code

    def __post_init__(self):
        if self.amount < 0:
            raise ValueError("Amount cannot be negative")
        if len(self.currency) != 3:
            raise ValueError("Currency must be 3-letter ISO code")

@dataclass
class TransactionMetadata:
    """Optional metadata for a transaction."""
    ip_address: Optional[str] = None
    user_agent: Optional[str] = None
    reference_id: Optional[str] = None

@dataclass
class TransactionRequest:
    """Request to process a transaction."""
    transaction_type: TransactionType
    amount: Money
    source_account: str
    destination_account: str
    metadata: TransactionMetadata = field(
        default_factory=TransactionMetadata
    )

@dataclass
class TransactionResult:
    """Result of processing a transaction."""
    transaction_id: str
    status: TransactionStatus
    amount: Money
    created_at: datetime
    error_message: Optional[str] = None

def process_transaction(
    request: TransactionRequest
) -> TransactionResult:
    """Process a financial transaction.

    Args:
        request: Validated transaction request

    Returns:
        TransactionResult with status and details

    Raises:
        InsufficientFundsError: If source has insufficient balance
        InvalidAccountError: If account IDs are invalid
    """
    pass
```

**Why this is better**:

- **Self-documenting**: Field names explain themselves
- **Type safety**: Compiler/runtime catches type mismatches
- **Validated**: Invalid states caught at construction
- **Discoverable**: IDE shows available fields and types

## Identifying Complexity in Your Own Code

How do you know if your interfaces need improvement? Watch for these red flags:

### Red Flag 1: Documentation Dependency

**Symptom**: You need to read extensive docs to use the interface.

```python
# If you need this much documentation, the interface is too complex
def configure_pipeline(
    stages,      # See docs Table 3.1 for stage format
    options,     # See docs Section 4.2 for available options
    transforms,  # See docs Appendix A for transform syntax
    hooks        # See docs Section 5.1 for hook lifecycle
):
    pass
```

### Red Flag 2: Common Usage Requires Boilerplate

**Symptom**: Simple operations need many lines of setup.

```python
# If common usage looks like this, simplify it
client = ServiceClient()
client.set_auth(auth_provider.get_token())
client.configure_retry(max_retries=3, backoff=1.5)
client.set_timeout(connect=5, read=30)
client.enable_logging(level='DEBUG')
request = client.create_request('GET', '/users/123')
request.add_header('Accept', 'application/json')
response = client.execute(request)
data = response.parse_json()
# vs: data = service.get_user(123)
```

### Red Flag 3: The Cheat Sheet

**Symptom**: Developers maintain notes to remember how to use it.

If your team has a wiki page titled "How to use the OrderService" with examples for common operations, the interface isn't self-explanatory.

### Red Flag 4: Frequent Mistakes

**Symptom**: The same mistakes keep happening.

If code reviews repeatedly catch the same interface misuse, the interface is error-prone. Fix the interface, not just the usage.

### Red Flag 5: The Six-Month Amnesia

**Symptom**: Even the author forgets how to use it.

If you can't remember how to use an interface you wrote six months ago, neither can anyone else.

## Summary

These examples illustrate the core transformation: from implicit, unstructured, ambiguous interfaces to explicit, structured, clear ones. The patterns repeat:

- **Group related data** into typed structures
- **Name things clearly** so they explain themselves
- **Validate at boundaries** so errors are caught early
- **Document contracts** through types, not just comments

Whether the user is a human or an AI agent, these improvements make interfaces easier to understand and harder to misuse.
