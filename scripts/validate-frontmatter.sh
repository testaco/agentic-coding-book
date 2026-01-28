#!/bin/bash
# Validate YAML frontmatter in all book chapters and sections
#
# Frontmatter Schema:
# - Chapter files (e.g., book/part1-foundations/README.md): Standard chapter fields
# - Section files (e.g., book/part1-foundations/01-chapter/01-section.md): Chapter fields + section, chapter_title
# - Book-level files (e.g., book/preface.md, book/glossary.md): No chapter/section required

set -e

echo "Validating frontmatter..."

# Use Node.js + js-yaml for parsing
node -e '
const fs = require("fs");
const yaml = require("js-yaml");
const glob = require("glob");

const files = glob.sync("book/**/*.md").filter(f => !f.includes("TABLE_OF_CONTENTS") && !f.includes("index.md"));
let errors = 0;

// Base fields required for all content files
const baseFields = ["title", "version", "date", "status", "author", "tags", "abstract"];

// Determine file type based on path
function getFileType(filepath) {
  // Section file: part/NN-chapter/NN-section.md
  if (filepath.match(/part\d+-[^\/]+\/\d+-[^\/]+\/\d+-[^\/]+\.md$/)) {
    return "section";
  }
  // Chapter file: part/NN-chapter.md (NOT README.md)
  if (filepath.match(/part\d+-[^\/]+\/\d+-[^\/]+\.md$/)) {
    return "chapter";
  }
  // Book-level file: book/preface.md, book/glossary.md, README.md files, etc.
  return "book";
}

files.forEach(file => {
  const content = fs.readFileSync(file, "utf8");
  const match = content.match(/^---\n([\s\S]*?)\n---/);

  if (!match) {
    console.error(`ERROR: ${file} - No frontmatter found`);
    errors++;
    return;
  }

  try {
    const frontmatter = yaml.load(match[1]);
    const fileType = getFileType(file);

    // Validate base fields
    baseFields.forEach(field => {
      if (!frontmatter[field]) {
        console.error(`ERROR: ${file} - Missing field: ${field}`);
        errors++;
      }
    });

    // Validate type-specific fields
    if (fileType === "section") {
      // Section files require: part, chapter, section, chapter_title
      if (!frontmatter.part || typeof frontmatter.part !== "number") {
        console.error(`ERROR: ${file} - Missing or invalid field: part (must be number)`);
        errors++;
      }
      if (!frontmatter.chapter || typeof frontmatter.chapter !== "number") {
        console.error(`ERROR: ${file} - Missing or invalid field: chapter (must be number)`);
        errors++;
      }
      if (!frontmatter.section || typeof frontmatter.section !== "number") {
        console.error(`ERROR: ${file} - Missing or invalid field: section (must be number)`);
        errors++;
      }
      if (!frontmatter.chapter_title) {
        console.error(`ERROR: ${file} - Missing field: chapter_title`);
        errors++;
      }
    } else if (fileType === "chapter") {
      // Chapter files require: part, chapter (no section)
      if (!frontmatter.part || typeof frontmatter.part !== "number") {
        console.error(`ERROR: ${file} - Missing or invalid field: part (must be number)`);
        errors++;
      }
      if (!frontmatter.chapter || typeof frontmatter.chapter !== "number") {
        console.error(`ERROR: ${file} - Missing or invalid field: chapter (must be number)`);
        errors++;
      }
    }
    // Book-level files: no chapter/section required

    // Validate status enum
    const validStatuses = ["draft", "review", "published", "test"];
    if (!validStatuses.includes(frontmatter.status)) {
      console.error(`ERROR: ${file} - Invalid status: ${frontmatter.status}`);
      errors++;
    }

  } catch (e) {
    console.error(`ERROR: ${file} - Invalid YAML: ${e.message}`);
    errors++;
  }
});

if (errors > 0) {
  console.error(`\nValidation failed with ${errors} error(s)`);
  process.exit(1);
}

console.log(`✓ Validated ${files.length} file(s)`);
'
