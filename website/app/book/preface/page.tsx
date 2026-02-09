import { MermaidDiagram } from "@/components/mermaid-diagram"
import { ChevronRight } from "lucide-react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { getFlatSections } from "@/lib/book-data-server"
import { parseMarkdownFile, extractMermaidDiagrams } from "@/lib/markdown"
import { notFound } from "next/navigation"
import path from "path"

export default async function PrefacePage() {
  // Get the flat section list for navigation to first chapter
  const flat = getFlatSections()
  const next = flat.length > 0 ? flat[0] : null

  // Load and parse markdown
  let markdownData
  try {
    const filePath = path.join(process.cwd(), '..', 'book', 'preface.md')
    markdownData = await parseMarkdownFile(filePath)
  } catch (error) {
    console.error('Error loading preface:', error)
    notFound()
  }

  const { frontmatter, content, htmlContent } = markdownData

  // Extract mermaid diagrams
  const mermaidDiagrams = extractMermaidDiagrams(content)

  return (
    <article className="py-12 px-6 lg:px-12 max-w-3xl">
      {/* Breadcrumb */}
      <div className="flex items-center gap-2 text-sm text-muted-foreground mb-8">
        <Link href="/" className="hover:text-foreground transition-colors">
          Home
        </Link>
        <span>/</span>
        <span>Preface</span>
      </div>

      {/* Header */}
      <header className="mb-12">
        <h1 className="text-3xl sm:text-4xl font-bold tracking-tight mb-4 text-balance">
          {frontmatter.title || 'Preface'}
        </h1>
        {frontmatter.abstract && (
          <p className="text-lg text-muted-foreground">
            {frontmatter.abstract}
          </p>
        )}
      </header>

      {/* Content */}
      <div
        className="prose prose-invert prose-green max-w-none"
        dangerouslySetInnerHTML={{ __html: htmlContent }}
      />

      {/* Mermaid diagrams */}
      {mermaidDiagrams.map((diagram, index) => (
        <div key={index} className="my-8">
          <MermaidDiagram
            chart={diagram}
            caption={`Figure ${index + 1}`}
          />
        </div>
      ))}

      {/* Navigation */}
      <nav className="mt-16 pt-8 border-t border-border flex items-center justify-between">
        <Button variant="ghost" disabled className="text-muted-foreground">
          Previous
        </Button>
        {next ? (
          <Button variant="ghost" asChild>
            <Link href={next.href} className="flex items-center gap-2">
              <span className="hidden sm:inline">Start Reading: {next.sectionTitle}</span>
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

export async function generateMetadata() {
  try {
    const filePath = path.join(process.cwd(), '..', 'book', 'preface.md')
    const { frontmatter } = await parseMarkdownFile(filePath)

    return {
      title: `${frontmatter.title || 'Preface'} | Agentic Coding Playbook`,
      description: frontmatter.abstract || 'Preface to the Agentic Coding Playbook',
    }
  } catch (error) {
    return {
      title: 'Preface | Agentic Coding Playbook',
    }
  }
}
