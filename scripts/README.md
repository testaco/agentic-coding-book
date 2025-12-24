# Scripts

This directory contains build and validation scripts for the Agentic Coding Book.

## Quick Start

**Run all validations:**

```bash
npm run validate
# or
npm test
```

**Build PDF:**

```bash
npm run build:pdf
```

## Validation Scripts

### Unified Validation (`validate.sh`)

**Primary script** that runs all validation checks in one command.

```bash
./scripts/validate.sh

# Or via npm:
npm run validate
npm test
```

**Features:**
- ✅ Runs all checks with colored output
- ✅ Shows summary of passed/failed checks
- ✅ Continues through failures to show all issues
- ✅ Returns non-zero exit code if any check fails

**Environment variables:**
- `CHECK_EXTERNAL=true` - Enable external link checking (default: false)
- `CHECK_TRACEABILITY=true` - Enable traceability checking (default: false)

**Checks performed:**
1. Markdown linting (markdownlint)
2. Frontmatter schema validation
3. Link validation (internal only by default)
4. Mermaid diagram rendering
5. Requirements traceability (optional)

### Individual Validation Scripts

You can still run individual checks if needed:

**`validate-links.sh`** - Check for broken links

```bash
npm run validate:links

# Check external links too:
CHECK_EXTERNAL=true npm run validate:links
```

**`validate-frontmatter.sh`** - Validate YAML frontmatter

```bash
npm run validate:frontmatter
```

**`check-traceability.py`** - Check requirement traceability

```bash
npm run validate:traceability
```

## Build Scripts

**`build-pdf.sh`** - Build PDF from markdown

```bash
npm run build:pdf

# Dry run (validation only, no PDF):
./scripts/build-pdf.sh --dry-run
```

**`render-mermaid.js`** - Render Mermaid diagrams to PNG

```bash
npm run build:mermaid
```

**`generate-toc.sh`** - Generate table of contents

```bash
npm run generate:toc
```

## Pre-commit Hook

A pre-commit hook is installed at `.git/hooks/pre-commit` that automatically runs all validations before each commit.

**To install manually:**

```bash
cp scripts/install-hooks.sh .git/hooks/
./scripts/install-hooks.sh
```

**To bypass (not recommended):**

```bash
git commit --no-verify
```

## CI/CD Integration

GitHub Actions workflows use the unified validation script:

- **`validate.yml`** - Runs on push to main
- **`validate-pr.yml`** - Runs on pull requests
- **`build-pdf.yml`** - Builds and releases PDF

All workflows use `npm run validate` for consistency.

## Troubleshooting

**Markdownlint failures:**

```bash
# Auto-fix formatting issues:
npx markdownlint --config .markdownlint.json 'book/**/*.md' --fix
```

**Link check failures:**

Check the reported file and line number. Common issues:
- Links to non-existent files
- Broken anchor links
- Typos in file paths

**Frontmatter failures:**

Ensure all chapter files have valid YAML frontmatter with required fields:
- title, part, chapter, version, date, status, author, tags, abstract

**Mermaid rendering failures:**

Ensure Chrome/Chromium is installed:

```bash
# Ubuntu/Debian:
sudo apt-get install chromium-browser libgbm1

# macOS:
brew install chromium
```
