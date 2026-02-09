export type Section = {
  title: string
  slug: string
  filePath?: string
  number?: string
}

export type Chapter = {
  title: string
  slug: string
  sections: Section[]
  dirPath?: string
}

export type Part = {
  title: string
  slug: string
  available: boolean
  chapters: Chapter[]
  dirPath?: string
}

export type FrontMatterItem = {
  title: string
  slug: string
  filePath?: string
}

export type BookData = {
  frontMatter: FrontMatterItem[]
  parts: Part[]
}

export type FlatSection = {
  partTitle: string
  chapterTitle: string
  sectionTitle: string
  href: string
  number: string
}
