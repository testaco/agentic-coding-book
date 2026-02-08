import { MermaidDiagram } from "@/components/mermaid-diagram"
import { ChevronLeft, ChevronRight } from "lucide-react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { getFlatSections } from "@/lib/book-data-server"
import { getMarkdownPath, parseMarkdownFile, extractMermaidDiagrams } from "@/lib/markdown"
import { notFound } from "next/navigation"

interface PageProps {
  params: Promise<{
    part: string
    chapter: string
    section: string
  }>
}

export default async function BookSectionPage({ params }: PageProps) {
  const { part, chapter, section } = await params

  // Get the flat section list for navigation
  const flat = getFlatSections()
  const currentHref = `/book/${part}/${chapter}/${section}`
  const currentIdx = flat.findIndex((s) => s.href === currentHref)

  if (currentIdx === -1) {
    notFound()
  }

  const currentSection = flat[currentIdx]
  const prev = currentIdx > 0 ? flat[currentIdx - 1] : null
  const next = currentIdx < flat.length - 1 ? flat[currentIdx + 1] : null

  // Load and parse markdown
  let markdownData
  try {
    const filePath = getMarkdownPath(part, chapter, section)
    markdownData = await parseMarkdownFile(filePath)
  } catch (error) {
    console.error('Error loading markdown:', error)
    notFound()
  }

  const { frontmatter, content, htmlContent } = markdownData

  // Extract mermaid diagrams from original content
  const mermaidDiagrams = extractMermaidDiagrams(content)

  // Split HTML by mermaid diagram placeholders
  // The markdown processor replaced ```mermaid blocks with <!--MERMAID_DIAGRAM_N--> comments
  const htmlParts = htmlContent.split(/<!--MERMAID_DIAGRAM_\d+-->/)

  return (
    <article className="py-12 px-6 lg:px-12 max-w-3xl">
      {/* Breadcrumb */}
      <div className="flex items-center gap-2 text-sm text-muted-foreground mb-8">
        <Link href="/" className="hover:text-foreground transition-colors">
          Home
        </Link>
        <span>/</span>
        <span>{currentSection.partTitle}</span>
        <span>/</span>
        <span>{currentSection.chapterTitle}</span>
      </div>

      {/* Header */}
      <header className="mb-12">
        <p className="text-sm font-mono text-primary mb-2">
          Section {frontmatter.part}.{frontmatter.chapter}.{frontmatter.section}
        </p>
        <h1 className="text-3xl sm:text-4xl font-bold tracking-tight mb-4 text-balance">
          {frontmatter.title}
        </h1>
        <p className="text-lg text-muted-foreground">
          {frontmatter.chapter_title || currentSection.chapterTitle}
        </p>
      </header>

      {/* Content with inline mermaid diagrams */}
      <div className="prose prose-invert prose-green max-w-none">
        {htmlParts.map((htmlPart, index) => (
          <div key={`content-${index}`}>
            {/* Render HTML content chunk */}
            <div dangerouslySetInnerHTML={{ __html: htmlPart }} />

            {/* Render mermaid diagram if there's one after this chunk */}
            {index < mermaidDiagrams.length && (
              <MermaidDiagram
                chart={mermaidDiagrams[index]}
                caption={`Figure ${frontmatter.part}.${frontmatter.chapter}.${index + 1}`}
              />
            )}
          </div>
        ))}
      </div>

      {/* Navigation */}
      <nav className="mt-16 pt-8 border-t border-border flex items-center justify-between">
        {prev ? (
          <Button variant="ghost" asChild>
            <Link href={prev.href} className="flex items-center gap-2">
              <ChevronLeft className="h-4 w-4" />
              <span className="hidden sm:inline">{prev.sectionTitle}</span>
              <span className="sm:hidden">Previous</span>
            </Link>
          </Button>
        ) : (
          <Button variant="ghost" disabled className="text-muted-foreground">
            <ChevronLeft className="h-4 w-4 mr-2" />
            Previous
          </Button>
        )}
        {next ? (
          <Button variant="ghost" asChild>
            <Link href={next.href} className="flex items-center gap-2">
              <span className="hidden sm:inline">{next.sectionTitle}</span>
              <span className="sm:hidden">Next</span>
              <ChevronRight className="h-4 w-4" />
            </Link>
          </Button>
        ) : (
          <Button variant="ghost" disabled className="text-muted-foreground">
            Next
            <ChevronRight className="h-4 w-4 ml-2" />
          </Button>
        )}
      </nav>
    </article>
  )
}

export async function generateMetadata({ params }: PageProps) {
  const { part, chapter, section } = await params

  try {
    const filePath = getMarkdownPath(part, chapter, section)
    const { frontmatter } = await parseMarkdownFile(filePath)

    return {
      title: `${frontmatter.title} | ${frontmatter.chapter_title} | Agentic Coding Playbook`,
      description: frontmatter.abstract || `Learn about ${frontmatter.title}`,
    }
  } catch (error) {
    return {
      title: 'Section Not Found | Agentic Coding Playbook',
    }
  }
}

// Generate static params for all book sections at build time
export async function generateStaticParams() {
  const flat = getFlatSections()

  return flat.map((section) => {
    const parts = section.href.split('/').filter(Boolean).slice(1) // Remove 'book' prefix
    return {
      part: parts[0],
      chapter: parts[1],
      section: parts[2],
    }
  })
}
