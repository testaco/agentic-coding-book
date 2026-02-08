import bookStructureData from './book-structure.json'
import type { Part, Section, Chapter, FlatSection } from './book-types'

/**
 * Book structure loaded from pre-generated JSON
 * This can be safely used in both client and server components
 */
export const bookStructure: Part[] = bookStructureData as Part[]

export type { Part, Section, Chapter, FlatSection }

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
