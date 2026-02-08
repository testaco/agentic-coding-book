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

# Step 2: Concatenate markdown files in order with proper headings
echo "Step 2/4: Concatenating content..."

# Function to extract a field from YAML frontmatter
get_frontmatter_field() {
  local file="$1"
  local field="$2"
  # Handle both quoted and unquoted values, including multi-word titles
  awk -v field="$field" '
    /^---$/ { in_fm = !in_fm; next }
    in_fm && $0 ~ "^" field ":" {
      # Remove field name and colon
      sub(/^[^:]+:[ \t]*/, "")
      # Remove surrounding quotes if present
      gsub(/^[\047"]|[\047"]$/, "")
      # Unescape YAML single-quote escaping ('"'"''"'"' -> '"'"')
      gsub(/\047\047/, "\047")
      print
      exit
    }
  ' "$file"
}

# Function to strip frontmatter from a file and output content only
strip_frontmatter() {
  local file="$1"
  awk '
    /^---$/ { fm_count++; next }
    fm_count >= 2 { print }
  ' "$file"
}

# Function to shift markdown headings down by one level (## -> ###, ### -> ####, etc.)
# This ensures content headings are subordinate to section headings
shift_headings() {
  sed 's/^#/##/'
}

# Initialize combined.md with book metadata for Pandoc
cat > output/combined.md << 'METADATA'
---
title: "The Agentic Coding Playbook"
subtitle: "From Idea to Production in 6 Weeks"
author: "Chris Testa"
---

METADATA

# Add preface content (without its frontmatter, with a heading)
# Preface is a top-level section so we don't shift its headings
if [ -f "book/preface.md" ]; then
  echo "" >> output/combined.md
  echo "# Preface" >> output/combined.md
  echo "" >> output/combined.md
  strip_frontmatter "book/preface.md" >> output/combined.md
fi

# Part titles mapping
declare -A PART_TITLES
PART_TITLES["part1-foundations"]="Foundations"
PART_TITLES["part2-playbook"]="The Playbook"
PART_TITLES["part3-patterns-tools"]="Patterns & Tools"
PART_TITLES["part4-example"]="Complete Example"

part_number=0

# Process each part directory
for part_dir in book/part1-foundations book/part2-playbook book/part3-patterns-tools book/part4-example; do
  [ ! -d "$part_dir" ] && continue

  part_name=$(basename "$part_dir")
  part_title="${PART_TITLES[$part_name]}"

  # Check if this part has any chapter directories with content
  has_chapters=false
  for chapter_dir in $(find "$part_dir" -maxdepth 1 -type d -name '[0-9][0-9]-*' 2>/dev/null | sort); do
    if find "$chapter_dir" -maxdepth 1 -name '*.md' -type f 2>/dev/null | grep -q .; then
      has_chapters=true
      break
    fi
  done

  [ "$has_chapters" = "false" ] && continue

  part_number=$((part_number + 1))

  # Add Part heading
  echo "" >> output/combined.md
  echo "# Part ${part_number}: ${part_title}" >> output/combined.md
  echo "" >> output/combined.md

  chapter_number=0

  # Find chapter directories (e.g., 01-renaissance-developer/)
  for chapter_dir in $(find "$part_dir" -maxdepth 1 -type d -name '[0-9][0-9]-*' 2>/dev/null | sort); do
    # Get first section file to extract chapter title
    first_section=$(find "$chapter_dir" -maxdepth 1 -name '*.md' -type f 2>/dev/null | sort | head -1)
    [ -z "$first_section" ] && continue

    chapter_number=$((chapter_number + 1))
    chapter_title=$(get_frontmatter_field "$first_section" "chapter_title")
    [ -z "$chapter_title" ] && chapter_title="Chapter ${chapter_number}"

    # Add Chapter heading
    echo "" >> output/combined.md
    echo "## Chapter ${chapter_number}: ${chapter_title}" >> output/combined.md
    echo "" >> output/combined.md

    # Build sorted list of section files
    temp_file=$(mktemp)
    find "$chapter_dir" -maxdepth 1 -name '*.md' -type f 2>/dev/null | while read -r section_file; do
      section_num=$(get_frontmatter_field "$section_file" "section")
      if [ -n "$section_num" ]; then
        echo "$section_num:$section_file" >> "$temp_file"
      else
        echo "999:$section_file" >> "$temp_file"
      fi
    done

    # Sort by section number and process each section
    if [ -s "$temp_file" ]; then
      sort -n -t: -k1 "$temp_file" | cut -d: -f2 | while read -r section_file; do
        section_title=$(get_frontmatter_field "$section_file" "title")
        [ -z "$section_title" ] && section_title="Section"

        # Add Section heading
        echo "" >> output/combined.md
        echo "### ${section_title}" >> output/combined.md
        echo "" >> output/combined.md

        # Add section content (without frontmatter, with headings shifted down one level)
        strip_frontmatter "$section_file" | shift_headings >> output/combined.md
      done
    fi
    rm -f "$temp_file"
  done

  # Also handle legacy chapter files (direct .md files in part dir)
  find "$part_dir" -maxdepth 1 -name "*.md" -type f ! -name "README.md" 2>/dev/null | sort | while read -r chapter_file; do
    chapter_title=$(get_frontmatter_field "$chapter_file" "title")
    [ -z "$chapter_title" ] && chapter_title="Chapter"

    echo "" >> output/combined.md
    echo "## ${chapter_title}" >> output/combined.md
    echo "" >> output/combined.md
    strip_frontmatter "$chapter_file" | shift_headings >> output/combined.md
  done
done

# Add conclusion and glossary if they exist
# These are top-level sections so we don't shift their headings
if [ -f "book/conclusion.md" ]; then
  echo "" >> output/combined.md
  echo "# Conclusion" >> output/combined.md
  echo "" >> output/combined.md
  strip_frontmatter "book/conclusion.md" >> output/combined.md
fi

if [ -f "book/glossary.md" ]; then
  echo "" >> output/combined.md
  echo "# Glossary" >> output/combined.md
  echo "" >> output/combined.md
  strip_frontmatter "book/glossary.md" >> output/combined.md
fi

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

# Check if framed.sty is available for syntax highlighting
if kpsewhich framed.sty >/dev/null 2>&1; then
  SYNTAX_FLAG="--highlight-style=tango"
else
  echo "  Note: Syntax highlighting disabled (framed.sty not available)"
  SYNTAX_FLAG="--no-highlight"
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
  --metadata author="Chris Testa" \
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
