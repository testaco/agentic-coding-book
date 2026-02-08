import matter from 'gray-matter'
import { unified } from 'unified'
import remarkParse from 'remark-parse'
import remarkGfm from 'remark-gfm'
import remarkHtml from 'remark-html'
import fs from 'fs'
import path from 'path'

// @ts-ignore - remark types can be complex
const processor = unified().use(remarkParse).use(remarkGfm).use(remarkHtml, { sanitize: false })

export interface BookFrontmatter {
  title: string
  chapter_title?: string
  part: number
  chapter: number
  section: number
  version?: string
  date?: string
  status?: string
  author?: string
  tags?: string[]
  related?: string[]
  requirements?: string[]
  abstract?: string
}

export interface ParsedMarkdown {
  frontmatter: BookFrontmatter
  content: string
  htmlContent: string
}

/**
 * Parse a markdown file with frontmatter
 */
export async function parseMarkdownFile(filePath: string): Promise<ParsedMarkdown> {
  const fileContent = fs.readFileSync(filePath, 'utf-8')
  const { data, content } = matter(fileContent)

  // Process markdown to HTML
  const processedContent = await processor.process(content)

  return {
    frontmatter: data as BookFrontmatter,
    content,
    htmlContent: String(processedContent),
  }
}

/**
 * Get the file path for a given book section
 */
export function getMarkdownPath(part: string, chapter: string, section: string): string {
  const bookDir = path.join(process.cwd(), '..', 'book')

  // Map URL slugs to actual directory structure
  const partMap: Record<string, string> = {
    'foundations': 'part1-foundations',
    'playbook': 'part2-playbook',
    'patterns-tools': 'part3-patterns-tools',
    'complete-example': 'part4-example',
  }

  const partDir = partMap[part]
  if (!partDir) {
    throw new Error(`Unknown part: ${part}`)
  }

  // Try to find the chapter directory
  const partPath = path.join(bookDir, partDir)
  if (!fs.existsSync(partPath)) {
    throw new Error(`Part directory not found: ${partPath}`)
  }

  // Find chapter directory by matching the slug (after removing number prefix)
  const chapters = fs.readdirSync(partPath, { withFileTypes: true })
    .filter(dirent => dirent.isDirectory())

  const chapterDir = chapters.find(dir => {
    // Remove number prefix from directory name to get slug
    const dirSlug = dir.name.replace(/^\d{2}-/, '')
    return dirSlug === chapter
  })

  if (!chapterDir) {
    throw new Error(`Chapter not found: ${chapter} in ${partPath}`)
  }

  const chapterPath = path.join(partPath, chapterDir.name)

  // Find section file by matching the slug (after removing number prefix)
  const files = fs.readdirSync(chapterPath)
    .filter(f => f.endsWith('.md'))

  const sectionFile = files.find(file => {
    // Remove number prefix and .md extension to get slug
    const fileSlug = file.replace(/^\d{2}-/, '').replace('.md', '')
    return fileSlug === section
  })

  if (!sectionFile) {
    throw new Error(`Section file not found: ${section} in ${chapterPath}`)
  }

  return path.join(chapterPath, sectionFile)
}

/**
 * Extract Mermaid diagrams from markdown content
 */
export function extractMermaidDiagrams(content: string): string[] {
  const mermaidRegex = /```mermaid\n([\s\S]*?)```/g
  const diagrams: string[] = []
  let match

  while ((match = mermaidRegex.exec(content)) !== null) {
    diagrams.push(match[1].trim())
  }

  return diagrams
}
