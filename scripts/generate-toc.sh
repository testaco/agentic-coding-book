#!/bin/bash
# Generate table of contents from chapter frontmatter

set -e

OUTPUT="book/TABLE_OF_CONTENTS.md"

echo "Generating table of contents..."

# Use Node.js to parse frontmatter and generate TOC
node -e '
const fs = require("fs");
const yaml = require("js-yaml");
const glob = require("glob");

const files = glob.sync("book/**/*.md").filter(f => !f.includes("TABLE_OF_CONTENTS"));

// Parse frontmatter from each file
const chapters = files.map(file => {
  const content = fs.readFileSync(file, "utf8");
  const match = content.match(/^---\n([\s\S]*?)\n---/);
  if (!match) return null;

  const frontmatter = yaml.load(match[1]);
  return {
    ...frontmatter,
    path: file
  };
}).filter(Boolean);

// Sort by part, then chapter
chapters.sort((a, b) => {
  if (a.part !== b.part) return a.part - b.part;
  return a.chapter - b.chapter;
});

// Generate markdown TOC
let toc = "# Table of Contents\n\n";
let currentPart = null;

chapters.forEach(ch => {
  if (ch.part !== currentPart) {
    currentPart = ch.part;
    toc += `\n## Part ${ch.part}\n\n`;
  }

  // Make path relative to book directory
  const relativePath = ch.path.replace(/^book\//, "./");
  toc += `- [Chapter ${ch.chapter}: ${ch.title}](${relativePath})\n`;
  if (ch.abstract) {
    toc += `  *${ch.abstract.trim()}*\n`;
  }
});

fs.writeFileSync("book/TABLE_OF_CONTENTS.md", toc);
console.log(`✓ Generated TOC with ${chapters.length} chapters`);
'
