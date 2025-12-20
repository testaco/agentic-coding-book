#!/usr/bin/env python3
"""
Mermaid diagram syntax validator.
Basic validation to catch common errors before rendering.

Usage:
    python validate_mermaid.py <file.md>
    python validate_mermaid.py <file.mmd>
"""

import re
import sys
from pathlib import Path

class MermaidValidator:
    def __init__(self, content):
        self.content = content
        self.errors = []
        self.warnings = []
        self.diagram_type = None

    def validate(self):
        """Run all validation checks."""
        self.detect_diagram_type()
        self.check_balanced_brackets()

        if self.diagram_type:
            if 'flowchart' in self.diagram_type or 'graph' in self.diagram_type:
                self.validate_flowchart()
            elif 'sequenceDiagram' in self.diagram_type:
                self.validate_sequence()
            elif 'classDiagram' in self.diagram_type:
                self.validate_class()
            elif 'stateDiagram' in self.diagram_type:
                self.validate_state()
            elif 'erDiagram' in self.diagram_type:
                self.validate_erd()
            elif 'gantt' in self.diagram_type:
                self.validate_gantt()

        return len(self.errors) == 0

    def detect_diagram_type(self):
        """Detect the type of Mermaid diagram."""
        type_patterns = [
            r'flowchart\s+(TD|TB|BT|RL|LR)',
            r'graph\s+(TD|TB|BT|RL|LR)',
            r'sequenceDiagram',
            r'classDiagram',
            r'stateDiagram-v2',
            r'stateDiagram',
            r'erDiagram',
            r'gantt',
            r'pie',
            r'journey'
        ]

        for pattern in type_patterns:
            match = re.search(pattern, self.content)
            if match:
                self.diagram_type = match.group(0)
                return

        self.errors.append("No valid diagram type declaration found")

    def check_balanced_brackets(self):
        """Check if all brackets are balanced."""
        brackets = {'[': ']', '(': ')', '{': '}'}
        stack = []
        in_string = False

        for i, char in enumerate(self.content):
            if char == '"' and (i == 0 or self.content[i-1] != '\\'):
                in_string = not in_string
                continue

            if in_string:
                continue

            if char in brackets:
                stack.append((char, i))
            elif char in brackets.values():
                if not stack:
                    self.errors.append(f"Unmatched closing bracket '{char}' at position {i}")
                else:
                    open_bracket, _ = stack.pop()
                    if brackets[open_bracket] != char:
                        self.errors.append(f"Mismatched brackets: '{open_bracket}' and '{char}'")

        if stack:
            for bracket, pos in stack:
                self.errors.append(f"Unclosed bracket '{bracket}' at position {pos}")

    def validate_flowchart(self):
        """Validate flowchart-specific syntax."""
        # Find all node definitions
        node_pattern = r'(\w+)[\[\(\{]'
        nodes = set(re.findall(node_pattern, self.content))

        if not nodes:
            self.errors.append("No node definitions found in flowchart")
            return

        # Find all connections
        conn_patterns = [
            r'(\w+)\s*--+>',  # A --> B
            r'(\w+)\s*==+>',  # A ==> B
            r'(\w+)\s*-\.-+>',  # A -.-> B
            r'<--+\s*(\w+)',  # A <-- B (reverse)
        ]

        referenced_nodes = set()
        for pattern in conn_patterns:
            referenced_nodes.update(re.findall(pattern, self.content))

        # Check for undefined nodes in connections
        undefined = referenced_nodes - nodes
        for node in undefined:
            if node and not node.isdigit():  # Ignore numbers (could be labels)
                self.warnings.append(f"Node '{node}' referenced but not explicitly defined")

    def validate_sequence(self):
        """Validate sequence diagram syntax."""
        # Check for participants
        if not re.search(r'(participant|actor)\s+\w+', self.content):
            self.warnings.append("No participants or actors declared (optional but recommended)")

        # Check for messages
        message_pattern = r'\w+\s*-[->)x]+\s*\w+\s*:'
        if not re.search(message_pattern, self.content):
            self.errors.append("No valid message arrows found")

        # Check for unbalanced activation
        activates = len(re.findall(r'activate\s+\w+', self.content))
        activates += len(re.findall(r'->>+\+', self.content))
        deactivates = len(re.findall(r'deactivate\s+\w+', self.content))
        deactivates += len(re.findall(r'-->>+-', self.content))

        if activates != deactivates:
            self.warnings.append(f"Unbalanced activations: {activates} activate, {deactivates} deactivate")

    def validate_class(self):
        """Validate class diagram syntax."""
        # Check for class definitions
        if not re.search(r'class\s+\w+\s*\{', self.content):
            self.errors.append("No class definitions found")

        # Check for relationships
        relationship_patterns = [
            r'<\|--',  # Inheritance
            r'\*--',   # Composition
            r'o--',    # Aggregation
            r'-->',    # Association
            r'\.\.>',  # Dependency
        ]

        has_relationship = any(re.search(pattern, self.content) for pattern in relationship_patterns)
        if not has_relationship:
            self.warnings.append("No relationships found between classes")

    def validate_state(self):
        """Validate state diagram syntax."""
        # Check for initial state
        if '[*]' not in self.content:
            self.warnings.append("No initial state [*] found (recommended)")

        # Check for transitions
        if '-->' not in self.content:
            self.errors.append("No state transitions found")

    def validate_erd(self):
        """Validate ERD syntax."""
        # Check for relationships
        erd_pattern = r'\w+\s+[\|\}][o\|]--[o\|][\|\{]\s+\w+'
        if not re.search(erd_pattern, self.content):
            self.errors.append("No valid ERD relationships found")

        # Check for entity definitions
        entity_pattern = r'\w+\s+\{'
        if not re.search(entity_pattern, self.content):
            self.warnings.append("No entity attribute definitions found")

    def validate_gantt(self):
        """Validate Gantt chart syntax."""
        # Check for required elements
        if 'dateFormat' not in self.content:
            self.errors.append("Missing 'dateFormat' declaration in Gantt chart")

        # Check for sections
        if 'section' not in self.content:
            self.warnings.append("No sections defined in Gantt chart")

        # Check for tasks (lines with :)
        task_pattern = r'^\s*\w+.*:\s*\w*,?\s*\w*,?\s*\d{4}-\d{2}-\d{2}'
        if not re.search(task_pattern, self.content, re.MULTILINE):
            self.errors.append("No valid tasks found in Gantt chart")

    def get_report(self):
        """Generate validation report."""
        report = []

        if self.diagram_type:
            report.append(f"Diagram type: {self.diagram_type}")

        if self.errors:
            report.append("\nERRORS:")
            for error in self.errors:
                report.append(f"  ✗ {error}")

        if self.warnings:
            report.append("\nWARNINGS:")
            for warning in self.warnings:
                report.append(f"  ⚠ {warning}")

        if not self.errors and not self.warnings:
            report.append("✓ Validation passed - no errors or warnings")
        elif not self.errors:
            report.append("\n✓ No errors found (warnings present)")

        return '\n'.join(report)


def extract_mermaid_blocks(content):
    """Extract Mermaid code blocks from markdown."""
    pattern = r'```mermaid\n(.*?)```'
    blocks = re.findall(pattern, content, re.DOTALL)
    return blocks if blocks else [content]


def main():
    if len(sys.argv) != 2:
        print("Usage: python validate_mermaid.py <file>")
        print("\nValidates Mermaid diagram syntax.")
        print("Supports .md files (extracts ```mermaid blocks) and .mmd files")
        sys.exit(1)

    filepath = Path(sys.argv[1])

    if not filepath.exists():
        print(f"Error: File not found: {filepath}")
        sys.exit(1)

    try:
        content = filepath.read_text()
    except Exception as e:
        print(f"Error reading file: {e}")
        sys.exit(1)

    # Extract Mermaid blocks if markdown file
    if filepath.suffix == '.md':
        blocks = extract_mermaid_blocks(content)
        if not blocks:
            print("No Mermaid code blocks found in markdown file")
            sys.exit(1)
    else:
        blocks = [content]

    all_valid = True

    for i, block in enumerate(blocks):
        if len(blocks) > 1:
            print(f"\n{'='*60}")
            print(f"Validating block {i+1} of {len(blocks)}")
            print('='*60)

        validator = MermaidValidator(block)
        is_valid = validator.validate()
        print(validator.get_report())

        if not is_valid:
            all_valid = False

    sys.exit(0 if all_valid else 1)


if __name__ == '__main__':
    main()
