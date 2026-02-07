#!/usr/bin/env node

/**
 * Generate OG image PNG using Chrome headless
 * Run with: node generate-og-png.js
 */

const { spawn } = require('child_process');
const fs = require('fs');
const path = require('path');

const htmlFile = path.join(__dirname, 'generate-og-image.html');
const outputFile = path.join(__dirname, '../public/og-image.png');

// Check if chromium is available
const chromiumPath = process.env.CHROMIUM || 'chromium';

console.log('Generating OG image PNG...');
console.log(`Input: ${htmlFile}`);
console.log(`Output: ${outputFile}`);

// Use chromium headless to screenshot the HTML canvas
const chromium = spawn(chromiumPath, [
  '--headless',
  '--disable-gpu',
  '--screenshot=' + outputFile,
  '--window-size=1200,630',
  '--default-background-color=00000000',
  'file://' + htmlFile
]);

chromium.on('close', (code) => {
  if (code === 0) {
    console.log('✓ OG image generated successfully at', outputFile);
  } else {
    console.error('✗ Failed to generate OG image. Error code:', code);
    console.log('\nManual alternative:');
    console.log(`1. Open ${htmlFile} in a browser`);
    console.log('2. Right-click the canvas and "Save Image As"');
    console.log(`3. Save as ${outputFile}`);
    process.exit(1);
  }
});

chromium.stderr.on('data', (data) => {
  console.error(`stderr: ${data}`);
});
