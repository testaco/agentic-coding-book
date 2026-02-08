/**
 * Generate static book structure JSON for client-side use
 * Run this script before building: node -r esbuild-register scripts/generate-book-data.ts
 */
import fs from 'fs'
import path from 'path'
import { buildBookStructure } from '../lib/build-book-structure'

const outputPath = path.join(__dirname, '../lib/book-structure.json')

const structure = buildBookStructure()

// Write to JSON file
fs.writeFileSync(outputPath, JSON.stringify(structure, null, 2))

console.log(`Generated book structure with ${structure.length} parts`)
console.log(`Saved to: ${outputPath}`)
