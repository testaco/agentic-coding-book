#!/bin/bash
# Build PDF from markdown content

set -e

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
cat \
  book/preface.md \
  book/part1-foundations/*.md \
  book/part2-playbook/*.md \
  book/part3-patterns-tools/**/*.md \
  book/part4-example/*.md \
  book/conclusion.md \
  book/glossary.md \
  2>/dev/null > output/combined.md || echo "# Placeholder" > output/combined.md

# Step 3: Build PDF with Pandoc
echo "Step 3/4: Building PDF..."
pandoc output/combined.md \
  --from=markdown+smart \
  --to=pdf \
  --output=output/agentic-coding-book.pdf \
  $([ -f assets/templates/pandoc-template.tex ] && echo "--template=assets/templates/pandoc-template.tex") \
  --toc \
  --toc-depth=3 \
  --number-sections \
  --syntax-highlighting=tango \
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
