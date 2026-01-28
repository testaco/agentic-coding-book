#!/bin/bash
# Migrate chapter files to section-based directory structure
#
# Usage: ./migrate-to-sections.sh <chapter-file.md>
# Example: ./migrate-to-sections.sh book/part1-foundations/01-renaissance-developer.md

set -e

if [ $# -ne 1 ]; then
  echo "Usage: $0 <chapter-file.md>"
  exit 1
fi

CHAPTER_FILE="$1"

if [ ! -f "$CHAPTER_FILE" ]; then
  echo "Error: File not found: $CHAPTER_FILE"
  exit 1
fi

# Extract directory and filename
DIR=$(dirname "$CHAPTER_FILE")
FILENAME=$(basename "$CHAPTER_FILE" .md)

# Create chapter directory
CHAPTER_DIR="${DIR}/${FILENAME}"
mkdir -p "$CHAPTER_DIR"

echo "Migrating $CHAPTER_FILE to $CHAPTER_DIR/"

# Use Node.js to parse and split the file
node -e "
const fs = require('fs');
const yaml = require('js-yaml');

const content = fs.readFileSync('$CHAPTER_FILE', 'utf8');

// Extract frontmatter
const match = content.match(/^---\n([\s\S]*?)\n---\n([\s\S]*)$/);
if (!match) {
  console.error('Error: No frontmatter found');
  process.exit(1);
}

const frontmatter = yaml.load(match[1]);
const body = match[2];

// Split body by ## headings (level 2)
const sections = [];
const lines = body.split('\n');
let currentSection = null;

for (const line of lines) {
  if (line.match(/^## /)) {
    if (currentSection) {
      sections.push(currentSection);
    }
    // Start new section
    const title = line.replace(/^## /, '').trim();
    currentSection = {
      title: title,
      content: []
    };
  } else if (currentSection) {
    currentSection.content.push(line);
  }
}

// Push last section
if (currentSection) {
  sections.push(currentSection);
}

console.log(\`Found \${sections.length} sections\`);

// Generate section files
sections.forEach((section, index) => {
  const sectionNum = index + 1;
  const sectionSlug = section.title
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '')
    .substring(0, 50);

  const filename = \`\${sectionNum.toString().padStart(2, '0')}-\${sectionSlug}.md\`;
  const filepath = '$CHAPTER_DIR/' + filename;

  // Create section frontmatter
  const sectionFrontmatter = {
    title: section.title,
    chapter_title: frontmatter.title,
    part: frontmatter.part,
    chapter: frontmatter.chapter,
    section: sectionNum,
    version: frontmatter.version,
    date: frontmatter.date,
    status: frontmatter.status,
    author: frontmatter.author,
    tags: frontmatter.tags,
    related: frontmatter.related || [],
    requirements: frontmatter.requirements || [],
    abstract: \`Section \${sectionNum} of \${frontmatter.title}\`
  };

  // Generate file content
  const fileContent = '---\n' +
    yaml.dump(sectionFrontmatter) +
    '---\n\n' +
    section.content.join('\n').trim() + '\n';

  fs.writeFileSync(filepath, fileContent);
  console.log(\`✓ Created: \${filename}\`);
});
"

echo "✓ Migration complete"
echo ""
echo "Next steps:"
echo "1. Review section files in $CHAPTER_DIR/"
echo "2. Update cross-references in related files"
echo "3. Delete original file: rm $CHAPTER_FILE"
