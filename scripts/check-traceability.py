#!/usr/bin/env python3
"""Verify requirement traceability"""

import re
import sys
from pathlib import Path

def extract_requirements(file_path):
    """Extract all REQ-* references from a file"""
    content = Path(file_path).read_text()
    return set(re.findall(r'REQ-[A-Z]\d{3}', content))

def main():
    # Source of truth: requirements.md
    req_file = Path("planning/requirements.md")
    if not req_file.exists():
        print("ERROR: requirements.md not found")
        return 1

    all_reqs = extract_requirements(req_file)
    print(f"Found {len(all_reqs)} requirements in requirements.md")

    # Check coverage in design and tasks
    design_reqs = extract_requirements("planning/design.md")
    tasks_reqs = extract_requirements("planning/tasks.md")

    covered_reqs = design_reqs | tasks_reqs
    uncovered = all_reqs - covered_reqs

    if uncovered:
        print(f"\n❌ ERROR: {len(uncovered)} requirement(s) not addressed:")
        for req in sorted(uncovered):
            print(f"  - {req}")
        return 1

    print(f"✓ All {len(all_reqs)} requirements addressed")
    return 0

if __name__ == "__main__":
    sys.exit(main())
