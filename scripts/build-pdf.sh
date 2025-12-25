#!/bin/bash
# Build PDF from markdown content

set -e

# Support dry-run mode for CI validation
DRY_RUN=false
if [ "$1" = "--dry-run" ]; then
  DRY_RUN=true
  echo "Running in dry-run mode (validation only)"
fi

echo "Building PDF..."

# Check Pandoc version
PANDOC_VERSION=$(pandoc --version | head -1 | awk '{print $2}')
REQUIRED_VERSION="3.0"

if [ "$(printf '%s\n' "$REQUIRED_VERSION" "$PANDOC_VERSION" | sort -V | head -n1)" != "$REQUIRED_VERSION" ]; then
  echo "ERROR: Pandoc v3.0+ required, found v$PANDOC_VERSION"
  echo "Please upgrade Pandoc: https://pandoc.org/installing.html"
  exit 1
fi

# Create output directory
mkdir -p output

# Step 1: Render Mermaid diagrams
echo "Step 1/4: Rendering diagrams..."
npm run build:mermaid

# Step 2: Concatenate markdown files in order
echo "Step 2/4: Concatenating content..."

# Start with index if it exists
if [ -f "book/index.md" ]; then
  cat book/index.md > output/combined.md
else
  echo "" > output/combined.md
fi

# Add preface if it exists
[ -f "book/preface.md" ] && cat book/preface.md >> output/combined.md

# Add part 1 (foundations)
find book/part1-foundations -name "*.md" -type f 2>/dev/null | sort | xargs cat >> output/combined.md || true

# Add part 2 (playbook)
find book/part2-playbook -name "*.md" -type f 2>/dev/null | sort | xargs cat >> output/combined.md || true

# Add part 3 (patterns & tools)
find book/part3-patterns-tools -name "*.md" -type f 2>/dev/null | sort | xargs cat >> output/combined.md || true

# Add part 4 (example)
find book/part4-example -name "*.md" -type f 2>/dev/null | sort | xargs cat >> output/combined.md || true

# Add conclusion and glossary if they exist
[ -f "book/conclusion.md" ] && cat book/conclusion.md >> output/combined.md
[ -f "book/glossary.md" ] && cat book/glossary.md >> output/combined.md

# Verify we have content
if [ ! -s output/combined.md ]; then
  echo "ERROR: No content found to build PDF"
  exit 1
fi

echo "✓ Combined $(wc -l < output/combined.md) lines from book chapters"

# Skip full PDF build in dry-run mode
if [ "$DRY_RUN" = "true" ]; then
  echo "✓ Dry run complete: All validations passed"
  exit 0
fi

# Step 3: Build PDF with Pandoc
echo "Step 3/4: Building PDF..."

# Determine syntax highlighting flag based on Pandoc version
PANDOC_MAJOR=$(pandoc --version | head -1 | awk '{print $2}' | cut -d. -f1)
PANDOC_MINOR=$(pandoc --version | head -1 | awk '{print $2}' | cut -d. -f2)

# Pandoc 3.4+ uses --syntax-highlighting, older versions use --highlight-style
if [ "$PANDOC_MAJOR" -gt 3 ] || [ "$PANDOC_MAJOR" -eq 3 -a "$PANDOC_MINOR" -ge 4 ]; then
  SYNTAX_FLAG="--syntax-highlighting=tango"
else
  SYNTAX_FLAG="--highlight-style=tango"
fi

pandoc output/combined.md \
  --from=markdown+smart \
  --to=pdf \
  --output=output/agentic-coding-book.pdf \
  $([ -f assets/templates/pandoc-template.tex ] && echo "--template=assets/templates/pandoc-template.tex") \
  --toc \
  --toc-depth=3 \
  --number-sections \
  $SYNTAX_FLAG \
  --pdf-engine=xelatex \
  --metadata title="The Agentic Coding Playbook" \
  --metadata author="Author Name" \
  --metadata date="$(date +%Y-%m-%d)" \
  $([ -f assets/styles/print.css ] && echo "--css=assets/styles/print.css")

# Step 4: Validate PDF size
echo "Step 4/4: Validating PDF size..."
if [ "$(uname)" = "Darwin" ]; then
  PDF_SIZE=$(stat -f%z output/agentic-coding-book.pdf)
else
  PDF_SIZE=$(stat -c%s output/agentic-coding-book.pdf)
fi

MAX_SIZE=$((50 * 1024 * 1024))  # 50MB
if [ "$PDF_SIZE" -gt "$MAX_SIZE" ]; then
  echo "ERROR: PDF exceeds 50MB limit ($(( PDF_SIZE / 1024 / 1024 ))MB)"
  exit 1
fi

echo "✓ PDF built successfully: output/agentic-coding-book.pdf"
echo "  Size: $(( PDF_SIZE / 1024 / 1024 ))MB"
