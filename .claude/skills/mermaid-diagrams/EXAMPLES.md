# Mermaid Diagram Examples

## Flowchart: User Authentication Flow

```mermaid
flowchart TD
    Start([User Visits App]) --> CheckAuth{Logged In?}
    CheckAuth -->|Yes| Dashboard[Show Dashboard]
    CheckAuth -->|No| LoginForm[Display Login Form]
    LoginForm --> Submit[Submit Credentials]
    Submit --> Validate{Valid?}
    Validate -->|No| Error[Show Error Message]
    Error --> LoginForm
    Validate -->|Yes| CreateSession[Create Session]
    CreateSession --> Dashboard
    Dashboard --> End([Access Granted])
```

## Flowchart: Order Processing System

```mermaid
flowchart LR
    Order[New Order] --> Validate{Valid?}
    Validate -->|No| Reject[Reject Order]
    Validate -->|Yes| CheckStock{In Stock?}
    CheckStock -->|No| Backorder[(Backorder)]
    CheckStock -->|Yes| Process[Process Payment]
    Process --> Ship[Ship Order]
    Ship --> Complete([Complete])
    Reject --> Complete
    Backorder --> Notify[Notify Customer]
    Notify --> Complete
```

## Sequence Diagram: Payment Processing

```mermaid
sequenceDiagram
    actor User
    participant App
    participant PaymentGateway
    participant Bank
    participant Inventory

    User->>+App: Add to Cart
    User->>App: Checkout
    App->>+PaymentGateway: Initiate Payment
    PaymentGateway->>+Bank: Process Card
    Bank-->>-PaymentGateway: Approved
    PaymentGateway->>+Inventory: Deduct Stock
    Inventory-->>-PaymentGateway: Updated
    PaymentGateway-->>-App: Payment Confirmed
    App->>User: Show Confirmation
    deactivate App
```

## Sequence Diagram: API Request Flow

```mermaid
sequenceDiagram
    participant Client
    participant Gateway
    participant Auth
    participant Service
    participant DB

    Client->>+Gateway: GET /api/users/123
    Gateway->>+Auth: Validate Token
    Auth-->>-Gateway: Token Valid
    Gateway->>+Service: Get User
    Service->>+DB: SELECT * FROM users
    DB-->>-Service: User Data
    Service-->>-Gateway: User Response
    Gateway-->>-Client: 200 OK
```

## Class Diagram: E-commerce System

```mermaid
classDiagram
    class Product {
        -id: string
        -name: string
        -price: float
        -stock: int
        +getPrice() float
        +updateStock(quantity: int)
        +isAvailable() bool
    }

    class Order {
        -id: string
        -customerId: string
        -items: List~LineItem~
        -total: float
        -status: OrderStatus
        +addItem(item: LineItem)
        +removeItem(itemId: string)
        +calculateTotal() float
        +submit()
    }

    class Customer {
        -id: string
        -email: string
        -name: string
        -orders: List~Order~
        +createOrder() Order
        +getOrderHistory() List~Order~
        +updateProfile(data: ProfileData)
    }

    class LineItem {
        -productId: string
        -quantity: int
        -price: float
        +getSubtotal() float
    }

    Order --> LineItem: contains
    LineItem --> Product: references
    Customer --> Order: places
```

## Class Diagram: Inheritance Example

```mermaid
classDiagram
    class Animal {
        <<abstract>>
        -name: string
        -age: int
        +makeSound()* void
        +eat() void
    }

    class Dog {
        -breed: string
        +makeSound() void
        +fetch() void
    }

    class Cat {
        -indoor: bool
        +makeSound() void
        +scratch() void
    }

    Animal <|-- Dog
    Animal <|-- Cat
```

## Entity Relationship Diagram: E-commerce Database

```mermaid
erDiagram
    CUSTOMER ||--o{ ORDER : places
    ORDER ||--|{ LINE_ITEM : contains
    LINE_ITEM }o--|| PRODUCT : references
    PRODUCT }o--|| CATEGORY : "belongs to"
    PRODUCT }o--o{ SUPPLIER : "supplied by"

    CUSTOMER {
        int id PK
        string email UK
        string name
        string address
        datetime created_at
    }

    ORDER {
        int id PK
        int customer_id FK
        float total
        string status
        datetime created_at
    }

    LINE_ITEM {
        int id PK
        int order_id FK
        int product_id FK
        int quantity
        float price
    }

    PRODUCT {
        int id PK
        string sku UK
        string name
        string description
        float price
        int stock
        int category_id FK
    }

    CATEGORY {
        int id PK
        string name
        string slug UK
    }

    SUPPLIER {
        int id PK
        string name
        string contact
    }
```

## State Diagram: Order Lifecycle

```mermaid
stateDiagram-v2
    [*] --> Pending: Order Created

    Pending --> Confirmed: Payment Confirmed
    Pending --> Cancelled: User Cancels

    Confirmed --> Processing: Start Processing
    Confirmed --> Cancelled: User Cancels

    Processing --> Shipped: Package Dispatched
    Processing --> Failed: Processing Error

    Shipped --> InTransit: Carrier Pickup
    InTransit --> OutForDelivery: Arrival at Destination
    OutForDelivery --> Delivered: Delivery Confirmed

    Delivered --> Returned: Return Initiated
    Returned --> Refunded: Refund Processed

    Failed --> Pending: Retry
    Failed --> Cancelled: Unrecoverable Error

    Cancelled --> [*]
    Refunded --> [*]
    Delivered --> [*]
```

## State Diagram: User Session

```mermaid
stateDiagram-v2
    [*] --> LoggedOut

    LoggedOut --> LoggingIn: Submit Credentials
    LoggingIn --> LoggedIn: Success
    LoggingIn --> LoggedOut: Failed

    LoggedIn --> Active: User Activity
    Active --> Idle: No Activity (5min)
    Idle --> Active: User Activity
    Idle --> LoggedOut: Timeout (30min)

    LoggedIn --> LoggedOut: Logout
    Active --> LoggedOut: Logout

    LoggedOut --> [*]
```

## Gantt Chart: Software Project Timeline

```mermaid
gantt
    title Software Development Project
    dateFormat YYYY-MM-DD

    section Planning
    Requirements Gathering    :done,    req1, 2025-01-01, 2025-01-15
    System Design            :done,    des1, 2025-01-10, 2025-01-30

    section Development
    Database Schema          :active,  dev1, 2025-01-25, 30d
    Backend API              :         dev2, after dev1, 45d
    Frontend Core            :         dev3, 2025-02-10, 50d
    Integration              :         dev4, after dev2, 20d

    section Testing
    Unit Testing             :         test1, 2025-02-15, 60d
    Integration Testing      :         test2, after dev4, 15d
    QA Testing              :crit,     test3, after test2, 20d

    section Deployment
    Staging Deploy           :         dep1, after test3, 5d
    Production Deploy        :crit,    dep2, after dep1, 3d
    Launch                   :milestone, after dep2, 1d
```

## Gantt Chart: Sprint Planning

```mermaid
gantt
    title Sprint 5 - Two Week Sprint
    dateFormat YYYY-MM-DD

    section Backend
    User Authentication API  :done,    be1, 2025-01-15, 5d
    Order Management API     :active,  be2, 2025-01-20, 7d

    section Frontend
    Login UI                 :done,    fe1, 2025-01-15, 4d
    Dashboard Components     :active,  fe2, 2025-01-19, 6d
    Order Management UI      :         fe3, 2025-01-22, 5d

    section DevOps
    CI/CD Pipeline          :done,    ops1, 2025-01-15, 3d
    Monitoring Setup        :         ops2, 2025-01-25, 3d

    section Review
    Sprint Review           :milestone, 2025-01-29, 1d
    Sprint Retrospective    :milestone, 2025-01-29, 1d
```

## Pie Chart: System Resource Usage

```mermaid
pie title System Resource Distribution
    "Database" : 35
    "API Server" : 25
    "Cache Layer" : 15
    "Background Jobs" : 12
    "Static Assets" : 8
    "Other Services" : 5
```

## Component Diagram: Microservices Architecture

```mermaid
graph TB
    subgraph "Client Layer"
        Web[Web App]
        Mobile[Mobile App]
    end

    subgraph "API Gateway"
        Gateway[API Gateway]
    end

    subgraph "Services"
        Auth[Auth Service]
        User[User Service]
        Order[Order Service]
        Payment[Payment Service]
        Inventory[Inventory Service]
    end

    subgraph "Data Layer"
        UserDB[(User DB)]
        OrderDB[(Order DB)]
        Cache[(Redis Cache)]
    end

    subgraph "External"
        PaymentGW[Payment Gateway]
        EmailSvc[Email Service]
    end

    Web --> Gateway
    Mobile --> Gateway

    Gateway --> Auth
    Gateway --> User
    Gateway --> Order

    Order --> Payment
    Order --> Inventory

    Auth --> UserDB
    User --> UserDB
    Order --> OrderDB

    User --> Cache
    Order --> Cache

    Payment --> PaymentGW
    Order --> EmailSvc
```

## User Journey: Online Shopping

```mermaid
journey
    title Online Shopping Experience
    section Discovery
      Browse Products: 5: Customer
      Search for Item: 4: Customer
      View Details: 5: Customer
    section Decision
      Compare Options: 3: Customer
      Read Reviews: 4: Customer
      Add to Cart: 5: Customer
    section Checkout
      Review Cart: 5: Customer
      Enter Shipping: 3: Customer
      Enter Payment: 2: Customer
      Place Order: 5: Customer
    section Post-Purchase
      Receive Confirmation: 5: Customer, System
      Track Shipment: 4: Customer
      Receive Package: 5: Customer
```

## Git Workflow

```mermaid
gitGraph
    commit id: "Initial commit"
    branch develop
    checkout develop
    commit id: "Add user model"
    commit id: "Add authentication"
    branch feature/orders
    checkout feature/orders
    commit id: "Order model"
    commit id: "Order controller"
    checkout develop
    merge feature/orders
    checkout main
    merge develop tag: "v1.0.0"
    checkout develop
    commit id: "Bug fix"
    checkout main
    merge develop tag: "v1.0.1"
```

## Network Diagram: System Architecture

```mermaid
graph LR
    User([User]) -->|HTTPS| LB[Load Balancer]
    LB --> Web1[Web Server 1]
    LB --> Web2[Web Server 2]

    Web1 --> App1[App Server 1]
    Web2 --> App2[App Server 2]

    App1 --> Primary[(Primary DB)]
    App2 --> Primary

    Primary -.->|Replication| Replica1[(Replica 1)]
    Primary -.->|Replication| Replica2[(Replica 2)]

    App1 --> Cache{Redis}
    App2 --> Cache

    App1 --> Queue[Message Queue]
    App2 --> Queue

    Worker1[Worker 1] --> Queue
    Worker2[Worker 2] --> Queue
```
