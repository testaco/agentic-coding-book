#!/bin/bash
# Generate table of contents from chapter and section frontmatter

set -e

OUTPUT="book/TABLE_OF_CONTENTS.md"

echo "Generating table of contents..."

# Use Node.js to parse frontmatter and generate nested TOC
node -e '
const fs = require("fs");
const yaml = require("js-yaml");
const glob = require("glob");

const files = glob.sync("book/**/*.md").filter(f => !f.includes("TABLE_OF_CONTENTS"));

// Parse frontmatter from each file
const items = files.map(file => {
  const content = fs.readFileSync(file, "utf8");
  const match = content.match(/^---\n([\s\S]*?)\n---/);
  if (!match) return null;

  const frontmatter = yaml.load(match[1]);
  return {
    ...frontmatter,
    path: file
  };
}).filter(Boolean);

// Sort by part, chapter, then section
items.sort((a, b) => {
  if (a.part !== b.part) return a.part - b.part;
  if (a.chapter !== b.chapter) return a.chapter - b.chapter;
  return (a.section || 0) - (b.section || 0);
});

// Group items by part and chapter
const parts = {};
const frontMatter = []; // For preface, index, etc.

items.forEach(item => {
  if (!item.part || !item.chapter) return; // Skip book-level files without part/chapter

  // Skip test chapters (part 99+) and non-numeric parts
  const partNum = parseInt(item.part);
  if (isNaN(partNum) || partNum >= 99 || partNum === 0) {
    // Store front matter separately if it has content
    if (item.part === "front" || item.part === 0) {
      frontMatter.push(item);
    }
    return;
  }

  // Skip non-numeric chapters (like "index", "specifications")
  const chapterNum = parseInt(item.chapter);
  if (isNaN(chapterNum)) {
    return;
  }

  if (!parts[item.part]) parts[item.part] = {};
  if (!parts[item.part][item.chapter]) {
    parts[item.part][item.chapter] = {
      title: item.chapter_title || item.title,
      sections: []
    };
  }

  if (item.section) {
    // Section file
    parts[item.part][item.chapter].sections.push(item);
  } else {
    // Chapter file (legacy or chapter-level)
    parts[item.part][item.chapter].chapterFile = item;
  }
});

// Generate nested markdown TOC
let toc = "# Table of Contents\n";

// Sort parts numerically
const sortedParts = Object.keys(parts).sort((a, b) => parseInt(a) - parseInt(b));

sortedParts.forEach(partNum => {
  toc += `\n## Part ${partNum}\n\n`;

  // Sort chapters numerically
  const sortedChapters = Object.keys(parts[partNum]).sort((a, b) => parseInt(a) - parseInt(b));

  sortedChapters.forEach(chapterNum => {
    const chapter = parts[partNum][chapterNum];

    // Chapter heading
    toc += `### Chapter ${chapterNum}: ${chapter.title}\n\n`;

    // If there are sections, list them
    if (chapter.sections.length > 0) {
      toc += "\n";
      chapter.sections.forEach(section => {
        const relativePath = section.path.replace(/^book\//, "./");
        toc += `- [${section.title}](${relativePath})\n`;
      });
      toc += "\n";
    } else if (chapter.chapterFile) {
      // Legacy chapter file (no sections)
      const relativePath = chapter.chapterFile.path.replace(/^book\//, "./");
      toc += `*[View Chapter](${relativePath})*\n\n`;
      if (chapter.chapterFile.abstract) {
        toc += `${chapter.chapterFile.abstract.trim()}\n`;
      }
    }
  });
});

fs.writeFileSync("book/TABLE_OF_CONTENTS.md", toc);
console.log(`✓ Generated TOC with ${items.length} items (chapters and sections)`);
'
