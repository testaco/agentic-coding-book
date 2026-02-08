import 'server-only'
import { buildBookStructure, getFlatSections as getFlatSectionsFromParts } from './build-book-structure'
import type { Part, Chapter, Section } from './book-types'

/**
 * Server-side function to get book structure
 * This uses fs and can only be called from server components
 */
export function getBookStructure(): Part[] {
  try {
    return buildBookStructure()
  } catch (error) {
    console.error('Error building book structure:', error)
    // Fallback to minimal structure
    return [
      {
        title: "Foundations",
        slug: "foundations",
        available: true,
        chapters: [],
      },
    ]
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
  return getFlatSectionsFromParts(structure).map(section => ({
    partTitle: section.partTitle,
    chapterTitle: section.chapterTitle,
    sectionTitle: section.sectionTitle,
    href: section.href,
    number: section.number,
    filePath: section.filePath,
  }))
}
