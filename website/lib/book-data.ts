export type Section = {
  title: string
  slug: string
}

export type Chapter = {
  title: string
  slug: string
  sections: Section[]
}

export type Part = {
  title: string
  slug: string
  available: boolean
  chapters: Chapter[]
}

export const bookStructure: Part[] = [
  {
    title: "Foundations",
    slug: "foundations",
    available: true,
    chapters: [
      {
        title: "The Renaissance Developer",
        slug: "renaissance-developer",
        sections: [
          { title: "The Specialist's Dilemma", slug: "specialists-dilemma" },
          { title: "The Renaissance Developer Model", slug: "renaissance-developer-model" },
          { title: "What Changes, What Doesn't", slug: "what-changes-what-doesnt" },
          { title: "The 'Good Enough at Everything' Principle", slug: "good-enough-at-everything" },
          { title: "From Coder to Builder: A Mindset Shift", slug: "from-coder-to-builder" },
          { title: "Practical Example: Building a Feature Alone", slug: "practical-example" },
          { title: "Common Pitfalls", slug: "common-pitfalls" },
          { title: "Why This Matters Now", slug: "why-this-matters-now" },
          { title: "Summary", slug: "summary" },
          { title: "Further Reading", slug: "further-reading" },
        ],
      },
      {
        title: "What Is Agentic Coding?",
        slug: "what-is-agentic-coding",
        sections: [
          { title: "Introduction", slug: "introduction" },
          { title: "Defining Agentic Coding", slug: "defining-agentic-coding" },
          { title: "The Spectrum of Agentic Coding", slug: "spectrum-of-agentic-coding" },
          { title: "How They Work Together", slug: "how-they-work-together" },
          { title: "What Agentic Coding Is NOT", slug: "what-agentic-coding-is-not" },
          { title: "The Agentic Coding Mindset", slug: "agentic-coding-mindset" },
          { title: "Practical Example: Building a REST API", slug: "practical-example-rest-api" },
          { title: "Common Pitfalls", slug: "common-pitfalls" },
          { title: "Summary", slug: "summary" },
          { title: "Further Reading", slug: "further-reading" },
        ],
      },
    ],
  },
  {
    title: "The Playbook",
    slug: "playbook",
    available: false,
    chapters: [
      {
        title: "Idea to Vision",
        slug: "idea-to-vision",
        sections: [],
      },
    ],
  },
  {
    title: "Patterns & Tools",
    slug: "patterns-tools",
    available: false,
    chapters: [],
  },
  {
    title: "Complete Example",
    slug: "complete-example",
    available: false,
    chapters: [],
  },
]

/**
 * Build a flat list of all navigable sections with prev/next links
 */
export type FlatSection = {
  partTitle: string
  chapterTitle: string
  sectionTitle: string
  href: string
  number: string
}

export function getFlatSections(): FlatSection[] {
  const sections: FlatSection[] = []
  bookStructure.forEach((part, pi) => {
    part.chapters.forEach((chapter, ci) => {
      chapter.sections.forEach((section, si) => {
        sections.push({
          partTitle: part.title,
          chapterTitle: chapter.title,
          sectionTitle: section.title,
          href: `/book/${part.slug}/${chapter.slug}/${section.slug}`,
          number: `${pi + 1}.${ci + 1}.${si + 1}`,
        })
      })
    })
  })
  return sections
}
