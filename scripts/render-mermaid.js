#!/usr/bin/env node
/**
 * Render Mermaid diagrams to PNG
 */

const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');
const glob = require('glob');

const diagramsDir = 'diagrams';
const outputDir = 'output/diagrams';

function renderDiagrams() {
  console.log('Rendering Mermaid diagrams...');

  // Create output directory
  fs.mkdirSync(outputDir, { recursive: true });

  // Find all .mmd files
  const mmdFiles = glob.sync(`${diagramsDir}/**/*.mmd`);

  if (mmdFiles.length === 0) {
    console.log('No diagrams found, skipping');
    return;
  }

  let rendered = 0;
  let errors = 0;

  for (const file of mmdFiles) {
    const relativePath = path.relative(diagramsDir, file);
    const outputPath = path.join(outputDir, relativePath.replace('.mmd', '.png'));

    // Create subdirectories
    fs.mkdirSync(path.dirname(outputPath), { recursive: true });

    try {
      console.log(`  ${file} → ${outputPath}`);

      // Use mmdc command-line tool
      execSync(`npx mmdc -i "${file}" -o "${outputPath}" -b white -w 1200 -H 800`, {
        stdio: 'inherit'
      });

      rendered++;
    } catch (e) {
      console.error(`ERROR: Failed to render ${file}: ${e.message}`);
      errors++;
    }
  }

  console.log(`✓ Rendered ${rendered} diagram(s)${errors > 0 ? `, ${errors} error(s)` : ''}`);

  if (errors > 0) {
    process.exit(1);
  }
}

renderDiagrams();
