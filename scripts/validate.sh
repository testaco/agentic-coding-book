#!/bin/bash
# Unified validation script for the Agentic Coding Book
# Runs all validation checks in one command

set -e

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
PROJECT_ROOT="$(cd "$SCRIPT_DIR/.." && pwd)"
cd "$PROJECT_ROOT"

# Color output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Track failures
FAILED_CHECKS=()

# Helper function to run a check
run_check() {
  local name="$1"
  local command="$2"

  echo -e "\n${BLUE}==>${NC} ${name}..."

  if eval "$command"; then
    echo -e "${GREEN}✓${NC} ${name} passed"
  else
    echo -e "${RED}✗${NC} ${name} failed"
    FAILED_CHECKS+=("$name")
    # Don't exit immediately, continue with other checks
    return 1
  fi
}

echo -e "${BLUE}========================================${NC}"
echo -e "${BLUE}Running all validation checks...${NC}"
echo -e "${BLUE}========================================${NC}"

# 1. Markdown linting
run_check "Markdown linting" \
  "npx markdownlint --config .markdownlint.json 'book/**/*.md'" || true

# 2. Frontmatter validation
run_check "Frontmatter schema validation" \
  "./scripts/validate-frontmatter.sh" || true

# 3. Generate diagrams BEFORE validating links
run_check "Mermaid diagram rendering" \
  "npm run build:mermaid" || true

# 4. Link validation (internal only by default)
# Note: Runs AFTER diagram generation so we can validate generated diagram links
export CHECK_EXTERNAL=${CHECK_EXTERNAL:-false}
run_check "Link validation" \
  "./scripts/validate-links.sh" || true

# 5. Traceability check (optional - only if enabled)
if [ "$CHECK_TRACEABILITY" = "true" ]; then
  if [ -f "./scripts/check-traceability.py" ]; then
    run_check "Requirements traceability" \
      "python3 ./scripts/check-traceability.py" || true
  else
    echo -e "${YELLOW}⚠${NC} Traceability check skipped (script not found)"
  fi
else
  echo -e "${YELLOW}⚠${NC} Traceability check skipped (set CHECK_TRACEABILITY=true to enable)"
fi

# Summary
echo -e "\n${BLUE}========================================${NC}"
echo -e "${BLUE}Validation Summary${NC}"
echo -e "${BLUE}========================================${NC}"

if [ ${#FAILED_CHECKS[@]} -eq 0 ]; then
  echo -e "${GREEN}✓ All validation checks passed!${NC}"
  exit 0
else
  echo -e "${RED}✗ ${#FAILED_CHECKS[@]} check(s) failed:${NC}"
  for check in "${FAILED_CHECKS[@]}"; do
    echo -e "  ${RED}-${NC} $check"
  done
  exit 1
fi
