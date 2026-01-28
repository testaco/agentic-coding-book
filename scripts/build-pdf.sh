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

# Function to extract section number from frontmatter
get_section_number() {
  local file="$1"
  # Extract section field from YAML frontmatter
  awk '/^---$/,/^---$/ { if (/^section:/) { print $2; exit } }' "$file"
}

# Process each part directory
for part_dir in book/part1-foundations book/part2-playbook book/part3-patterns-tools book/part4-example; do
  [ ! -d "$part_dir" ] && continue

  # Find chapter directories (e.g., 01-renaissance-developer/)
  for chapter_dir in $(find "$part_dir" -maxdepth 1 -type d -name '[0-9][0-9]-*' 2>/dev/null | sort); do
    # Find section files within chapter and sort by section number
    temp_file=$(mktemp)

    # Use find instead of glob to avoid syntax issues
    find "$chapter_dir" -maxdepth 1 -name '*.md' -type f 2>/dev/null | while read -r section_file; do
      section_num=$(get_section_number "$section_file")
      if [ -n "$section_num" ]; then
        echo "$section_num:$section_file" >> "$temp_file"
      else
        # If no section number, use filename as fallback
        echo "999:$section_file" >> "$temp_file"
      fi
    done

    # Sort by section number and concatenate
    if [ -s "$temp_file" ]; then
      sort -n -t: -k1 "$temp_file" | cut -d: -f2 | while read -r section_file; do
        cat "$section_file" >> output/combined.md
      done
    fi
    rm -f "$temp_file"
  done

  # Also handle legacy chapter files (direct .md files in part dir)
  # Backward compatibility for non-directory structure
  find "$part_dir" -maxdepth 1 -name "*.md" -type f ! -name "README.md" 2>/dev/null | sort | while read -r chapter_file; do
    cat "$chapter_file" >> output/combined.md
  done
done

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
