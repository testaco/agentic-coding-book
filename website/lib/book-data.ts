import bookStructureData from './book-structure.json'
import type { Part, Section, Chapter, FlatSection, FrontMatterItem, BookData } from './book-types'

/**
 * Book structure loaded from pre-generated JSON
 * This can be safely used in both client and server components
 */
const data = bookStructureData as BookData

export const bookStructure: Part[] = data.parts
export const frontMatter: FrontMatterItem[] = data.frontMatter

export type { Part, Section, Chapter, FlatSection, FrontMatterItem, BookData }

/**
 * Build a flat list of all navigable sections with prev/next links
 */
export function getFlatSections(): FlatSection[] {
  const sections: FlatSection[] = []

  bookStructure.forEach((part) => {
    part.chapters.forEach((chapter) => {
      chapter.sections.forEach((section) => {
        sections.push({
          partTitle: part.title,
          chapterTitle: chapter.title,
          sectionTitle: section.title,
          href: `/book/${part.slug}/${chapter.slug}/${section.slug}`,
          number: section.number || '',
        })
      })
    })
  })

  return sections
}
