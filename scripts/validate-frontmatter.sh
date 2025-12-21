#!/bin/bash
# Validate YAML frontmatter in all book chapters

set -e

echo "Validating frontmatter..."

# Use Node.js + js-yaml for parsing
node -e '
const fs = require("fs");
const yaml = require("js-yaml");
const glob = require("glob");

const files = glob.sync("book/**/*.md").filter(f => !f.includes("TABLE_OF_CONTENTS"));
let errors = 0;

const requiredFields = ["title", "part", "chapter", "version", "date", "status", "author", "tags", "abstract"];

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

    requiredFields.forEach(field => {
      if (!frontmatter[field]) {
        console.error(`ERROR: ${file} - Missing field: ${field}`);
        errors++;
      }
    });

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
