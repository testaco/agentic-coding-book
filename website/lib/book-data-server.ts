import 'server-only'
import { buildBookStructure, getFlatSections as getFlatSectionsFromParts } from './build-book-structure'
import type { Part, Chapter, Section, BookData, FrontMatterItem } from './book-types'

/**
 * Server-side function to get book structure
 * This uses fs and can only be called from server components
 */
export function getBookStructure(): BookData {
  try {
    return buildBookStructure()
  } catch (error) {
    console.error('Error building book structure:', error)
    // Fallback to minimal structure
    return {
      frontMatter: [],
      parts: [
        {
          title: "Foundations",
          slug: "foundations",
          available: true,
          chapters: [],
        },
      ],
    }
  }
}

/**
 * Server-side function to get flat sections
 */
export type FlatSection = {
  partTitle: string
  chapterTitle: string
  sectionTitle: string
  href: string
  number: string
  filePath?: string
}

export function getFlatSections(): FlatSection[] {
  const structure = getBookStructure()
  return getFlatSectionsFromParts(structure.parts).map(section => ({
    partTitle: section.partTitle,
    chapterTitle: section.chapterTitle,
    sectionTitle: section.sectionTitle,
    href: section.href,
    number: section.number,
    filePath: section.filePath,
  }))
}

/**
 * Server-side function to get front matter items
 */
export function getFrontMatter(): FrontMatterItem[] {
  const structure = getBookStructure()
  return structure.frontMatter
}
