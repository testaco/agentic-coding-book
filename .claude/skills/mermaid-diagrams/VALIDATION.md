# Mermaid Diagram Validation Reference

## Comprehensive Validation Checklist

### Universal Syntax Rules

All Mermaid diagrams must follow these rules:

1. **Bracket Balancing**
   - [ ] Every `[` has a matching `]`
   - [ ] Every `(` has a matching `)`
   - [ ] Every `{` has a matching `}`
   - [ ] Every `"` has a matching `"`

2. **Node IDs**
   - [ ] Unique within the diagram
   - [ ] Alphanumeric characters only (plus `-` and `_`)
   - [ ] No spaces in IDs
   - [ ] Case-sensitive

3. **Labels**
   - [ ] Special characters are escaped or quoted
   - [ ] No unescaped colons, semicolons, or pipes
   - [ ] Use `["Label with special chars"]` for complex labels

4. **Connections**
   - [ ] Reference only defined nodes
   - [ ] Use valid arrow syntax for diagram type
   - [ ] No dangling connections

### Flowchart Validation

```
flowchart TD
```

**Required Elements:**
- Diagram declaration: `flowchart TD` (or TB, LR, RL, BT)
- At least one node definition

**Node Syntax:**
```
id[Rectangle]           ✓ Valid
id([Rounded])          ✓ Valid
id{Decision}           ✓ Valid
id[(Database)]         ✓ Valid
id((Circle))           ✓ Valid
id[Label with space]   ✓ Valid (automatic handling)
id["Complex: label"]   ✓ Valid (explicit quoting)
```

**Connection Syntax:**
```
A --> B                ✓ Valid
A -->|Label| B         ✓ Valid
A -.-> B               ✓ Valid (dotted)
A ==> B                ✓ Valid (thick)
A <--> B               ✓ Valid (bidirectional)
A -- Text --> B        ✓ Valid (text on line)
```

**Common Errors:**
```
A -> B                 ✗ Invalid (use -->)
A => B                 ✗ Invalid (use ==>)
A -|Label|- B          ✗ Invalid (use -->|Label|)
[Label]                ✗ Invalid (missing ID)
```

### Sequence Diagram Validation

```
sequenceDiagram
```

**Required Elements:**
- Diagram declaration: `sequenceDiagram`
- At least two participants
- At least one message

**Participant Syntax:**
```
participant Alice          ✓ Valid
participant B as Bob       ✓ Valid
actor User                 ✓ Valid
actor A as Admin           ✓ Valid
```

**Message Syntax:**
```
Alice->>Bob: Message       ✓ Valid (solid arrow)
Alice-->>Bob: Response     ✓ Valid (dotted arrow)
Alice-)Bob: Async          ✓ Valid (async)
Alice-xBob: Destroy        ✓ Valid (destroy)
```

**Activation:**
```
activate Alice             ✓ Valid
Alice->>+Bob: Message      ✓ Valid (activate on message)
Bob-->>-Alice: Response    ✓ Valid (deactivate on message)
deactivate Alice           ✓ Valid
```

**Common Errors:**
```
Alice->Bob: Message        ✗ Invalid (use ->>)
Alice-->Bob: Message       ✗ Invalid (use -->>)
Alice->>: Message          ✗ Invalid (no recipient)
```

### Class Diagram Validation

```
classDiagram
```

**Class Syntax:**
```
class ClassName {
    +publicField: type
    -privateField: type
    #protectedField: type
    +method() returnType
    +method(param: type) returnType
}
```

**Relationship Syntax:**
```
ClassA <|-- ClassB         ✓ Inheritance
ClassA *-- ClassB          ✓ Composition
ClassA o-- ClassB          ✓ Aggregation
ClassA --> ClassB          ✓ Association
ClassA -- ClassB           ✓ Link (solid)
ClassA ..> ClassB          ✓ Dependency
ClassA ..|> ClassB         ✓ Realization
```

**Cardinality:**
```
ClassA "1" --> "many" ClassB
ClassA "1..n" --> "0..1" ClassB
```

**Common Errors:**
```
class ClassName            ✗ Invalid (missing braces)
ClassName {                ✗ Invalid (missing "class" keyword)
+method                    ✗ Invalid (missing parentheses)
ClassA -> ClassB           ✗ Invalid (use -->)
```

### State Diagram Validation

```
stateDiagram-v2
```

**State Syntax:**
```
[*] --> State1             ✓ Initial state
State1 --> State2          ✓ Transition
State2 --> [*]             ✓ Final state
State1: Description        ✓ State with description
```

**Composite States:**
```
state CompositeName {
    [*] --> SubState1
    SubState1 --> SubState2
    SubState2 --> [*]
}
```

**Common Errors:**
```
State1 -> State2           ✗ Invalid (use -->)
* --> State1               ✗ Invalid (use [*])
```

### ERD Validation

```
erDiagram
```

**Relationship Syntax:**
```
EntityA ||--|| EntityB     ✓ One to one
EntityA ||--o{ EntityB     ✓ One to many
EntityA }o--o{ EntityB     ✓ Many to many
EntityA }|--|{ EntityB     ✓ One or more to one or more
```

**Entity Attributes:**
```
EntityName {
    type field_name PK
    type field_name FK
    type field_name UK
    type field_name
}
```

**Cardinality Symbols:**
- `||` : exactly one
- `o|` : zero or one
- `}o` : zero or more
- `}|` : one or more

**Common Errors:**
```
EntityA -> EntityB         ✗ Invalid (use proper ERD notation)
EntityA -- EntityB         ✗ Invalid (missing cardinality)
```

### Gantt Chart Validation

```
gantt
    title Project Name
    dateFormat YYYY-MM-DD
```

**Required Elements:**
- Diagram declaration: `gantt`
- Date format declaration
- At least one section
- At least one task

**Task Syntax:**
```
Task Name :done, id1, 2025-01-01, 30d        ✓ Valid
Task Name :active, id2, after id1, 2025-02-01  ✓ Valid
Task Name :crit, id3, 2025-01-15, 15d        ✓ Valid
Task Name :milestone, after id2, 1d          ✓ Valid
```

**Status Options:**
- `done` : Completed task
- `active` : In progress
- `crit` : Critical task
- `milestone` : Milestone marker

**Common Errors:**
```
Task Name : 2025-01-01     ✗ Invalid (missing duration)
Task Name                  ✗ Invalid (missing : and parameters)
```

## Validation Process

### Step 1: Structural Validation
1. Check diagram type declaration
2. Verify all required elements present
3. Check for balanced brackets/quotes

### Step 2: Syntax Validation
1. Verify node/entity definitions
2. Check connection syntax
3. Validate labels and special characters

### Step 3: Reference Validation
1. Ensure all connections reference existing nodes
2. Check all node IDs are unique
3. Verify all dependencies (in Gantt charts)

### Step 4: Logical Validation
1. Check for unreachable nodes (flowcharts)
2. Verify relationship cardinality makes sense (ERD)
3. Check date logic (Gantt charts)

## Testing Strategies

### Manual Testing
1. **Copy to Mermaid Live Editor**: https://mermaid.live
2. **Check rendering**: Does it display correctly?
3. **Verify content**: Are all elements visible?
4. **Test responsiveness**: Does it scale well?

### Automated Validation
Use the validation script:
```bash
python .claude/skills/mermaid-diagrams/scripts/validate_mermaid.py diagram.md
```

### Common Validation Errors

| Error Message | Cause | Solution |
|--------------|-------|----------|
| `Unexpected token` | Special char in label | Quote the label: `["Label: value"]` |
| `Parse error on line N` | Syntax error | Check syntax for diagram type |
| `Node not found` | Reference before definition | Define node before using in connection |
| `Unclosed string` | Missing closing quote | Add closing `"` or `]` |
| `Invalid arrow type` | Wrong arrow for diagram | Use correct arrow: `-->` for flowchart, `->>` for sequence |

## Quick Validation Command Reference

### Bracket Check (bash)
```bash
# Check if brackets are balanced
grep -o "[\[\](){}]" diagram.md | head -100
```

### Node ID Check (bash)
```bash
# Find all node IDs in flowchart
grep -oP '\w+(?=[\[\(\{])' diagram.md
```

### Connection Check (bash)
```bash
# Find all connections
grep -oP '\w+\s*(?:-->|->|==>)' diagram.md
```

## Best Practices for Validation

1. **Validate Early**: Check syntax as you build, not at the end
2. **Use Comments**: Add Mermaid comments with `%%` for complex diagrams
3. **Test Incrementally**: Build and test in stages
4. **Keep Backups**: Save working versions before major changes
5. **Use Templates**: Start from validated examples
6. **Automate**: Use validation scripts in CI/CD

## Mermaid Version Compatibility

Current skill targets Mermaid v10+:
- `stateDiagram-v2` (preferred over v1)
- `erDiagram` (newer syntax)
- `flowchart` (preferred over `graph`)

If using older Mermaid versions, adjust syntax accordingly.
