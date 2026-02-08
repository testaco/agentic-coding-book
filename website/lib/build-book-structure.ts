import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'

export type Section = {
  title: string
  slug: string
  filePath: string
  number: string
}

export type Chapter = {
  title: string
  slug: string
  sections: Section[]
  dirPath: string
}

export type Part = {
  title: string
  slug: string
  available: boolean
  chapters: Chapter[]
  dirPath: string
}

/**
 * Convert a title to a URL-friendly slug
 */
function slugify(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')
}

/**
 * Build the complete book structure from the actual markdown files
 */
export function buildBookStructure(): Part[] {
  const bookDir = path.join(process.cwd(), '..', 'book')

  if (!fs.existsSync(bookDir)) {
    console.warn('Book directory not found:', bookDir)
    return []
  }

  const parts: Part[] = []

  // Part mapping
  const partDirs = [
    { dir: 'part1-foundations', title: 'Foundations', slug: 'foundations', available: true },
    { dir: 'part2-playbook', title: 'The Playbook', slug: 'playbook', available: false },
    { dir: 'part3-patterns-tools', title: 'Patterns & Tools', slug: 'patterns-tools', available: false },
    { dir: 'part4-example', title: 'Complete Example', slug: 'complete-example', available: false },
  ]

  for (const partInfo of partDirs) {
    const partPath = path.join(bookDir, partInfo.dir)

    if (!fs.existsSync(partPath)) {
      continue
    }

    const part: Part = {
      title: partInfo.title,
      slug: partInfo.slug,
      available: partInfo.available,
      chapters: [],
      dirPath: partPath,
    }

    // Read chapter directories
    const entries = fs.readdirSync(partPath, { withFileTypes: true })
    const chapterDirs = entries
      .filter(e => e.isDirectory() && /^\d{2}-/.test(e.name))
      .sort((a, b) => a.name.localeCompare(b.name))

    for (const chapterDir of chapterDirs) {
      const chapterPath = path.join(partPath, chapterDir.name)
      const chapterFiles = fs.readdirSync(chapterPath)
        .filter(f => f.endsWith('.md'))
        .sort()

      if (chapterFiles.length === 0) {
        continue
      }

      // Get chapter title from first section's frontmatter
      const firstFile = path.join(chapterPath, chapterFiles[0])
      let chapterTitle = chapterDir.name.replace(/^\d{2}-/, '').replace(/-/g, ' ')

      try {
        const { data } = matter(fs.readFileSync(firstFile, 'utf-8'))
        if (data.chapter_title) {
          chapterTitle = data.chapter_title
        }
      } catch (error) {
        console.warn(`Error reading ${firstFile}:`, error)
      }

      // Create chapter slug from directory name
      const chapterSlug = chapterDir.name.replace(/^\d{2}-/, '')

      const chapter: Chapter = {
        title: chapterTitle,
        slug: chapterSlug,
        sections: [],
        dirPath: chapterPath,
      }

      // Read sections
      for (const fileName of chapterFiles) {
        const filePath = path.join(chapterPath, fileName)

        try {
          const { data } = matter(fs.readFileSync(filePath, 'utf-8'))

          if (!data.title) {
            console.warn(`Missing title in ${filePath}`)
            continue
          }

          // Create section slug from filename
          const sectionSlug = fileName
            .replace('.md', '')
            .replace(/^\d{2}-/, '')

          const section: Section = {
            title: data.title,
            slug: sectionSlug,
            filePath: filePath,
            number: `${data.part}.${data.chapter}.${data.section}`,
          }

          chapter.sections.push(section)
        } catch (error) {
          console.warn(`Error reading ${filePath}:`, error)
        }
      }

      if (chapter.sections.length > 0) {
        part.chapters.push(chapter)
      }
    }

    if (part.chapters.length > 0 || partInfo.available) {
      parts.push(part)
    }
  }

  return parts
}

/**
 * Build a flat list of all navigable sections with prev/next links
 */
export type FlatSection = {
  partTitle: string
  partSlug: string
  chapterTitle: string
  chapterSlug: string
  sectionTitle: string
  sectionSlug: string
  href: string
  number: string
  filePath: string
}

export function getFlatSections(parts: Part[]): FlatSection[] {
  const sections: FlatSection[] = []

  parts.forEach((part) => {
    part.chapters.forEach((chapter) => {
      chapter.sections.forEach((section) => {
        sections.push({
          partTitle: part.title,
          partSlug: part.slug,
          chapterTitle: chapter.title,
          chapterSlug: chapter.slug,
          sectionTitle: section.title,
          sectionSlug: section.slug,
          href: `/book/${part.slug}/${chapter.slug}/${section.slug}`,
          number: section.number,
          filePath: section.filePath,
        })
      })
    })
  })

  return sections
}
