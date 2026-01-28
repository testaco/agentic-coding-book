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

  // Create puppeteer config for CI environments and Nix shells
  let puppeteerConfigFile = null;
  if (process.env.CI || process.env.PUPPETEER_EXECUTABLE_PATH) {
    puppeteerConfigFile = path.join(outputDir, 'puppeteer-config.json');
    const config = {
      args: ['--no-sandbox', '--disable-setuid-sandbox']
    };

    // Use Nix-provided Chromium if available
    if (process.env.PUPPETEER_EXECUTABLE_PATH) {
      config.executablePath = process.env.PUPPETEER_EXECUTABLE_PATH;
    }

    fs.writeFileSync(puppeteerConfigFile, JSON.stringify(config));
  }

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
      const puppeteerArgs = puppeteerConfigFile ? `-p "${puppeteerConfigFile}"` : '';
      execSync(`npx mmdc -i "${file}" -o "${outputPath}" -b white -w 1200 -H 800 ${puppeteerArgs}`, {
        stdio: 'inherit'
      });

      rendered++;
    } catch (e) {
      console.error(`ERROR: Failed to render ${file}: ${e.message}`);
      errors++;
    }
  }

  console.log(`✓ Rendered ${rendered} diagram(s)${errors > 0 ? `, ${errors} error(s)` : ''}`);

  // Clean up temporary puppeteer config
  if (puppeteerConfigFile && fs.existsSync(puppeteerConfigFile)) {
    fs.unlinkSync(puppeteerConfigFile);
  }

  if (errors > 0) {
    process.exit(1);
  }
}

renderDiagrams();
