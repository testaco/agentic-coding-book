import { MermaidDiagram } from "@/components/mermaid-diagram"
import { ChevronLeft, ChevronRight } from "lucide-react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { getFlatSections } from "@/lib/book-data"

export const metadata = {
  title: "The Specialist's Dilemma | The Renaissance Developer | Agentic Coding Playbook",
  description:
    "When AI agents can handle implementation, deep specialization in coding becomes less valuable. Learn about the shift from coding to knowing what to build.",
}

const mermaidChart = `graph TB
    subgraph "Traditional Development (Pre-AI)"
        T1[Product Idea] --> T2[Write Code<br/>⏱️ BOTTLENECK]
        T2 --> T3[Debug & Test<br/>⏱️ Time-consuming]
        T3 --> T4[Deploy]
    end

    subgraph "AI-Era Development (2024+)"
        A1[Product Idea] --> A2[Define What to Build<br/>⏱️ BOTTLENECK]
        A2 --> A3[AI Implements Code<br/>⚡ Minutes]
        A3 --> A4[Review & Validate]
        A4 --> A5[Deploy]
    end

    style T2 fill:#ff6b6b,stroke:#c92a2a,color:#fff
    style A2 fill:#ff6b6b,stroke:#c92a2a,color:#fff
    style A3 fill:#51cf66,stroke:#2f9e44,color:#fff`

export default function SpecialistsDilemmaPage() {
  const flat = getFlatSections()
  const currentHref = "/book/foundations/renaissance-developer/specialists-dilemma"
  const currentIdx = flat.findIndex((s) => s.href === currentHref)
  const prev = currentIdx > 0 ? flat[currentIdx - 1] : null
  const next = currentIdx < flat.length - 1 ? flat[currentIdx + 1] : null

  return (
    <article className="py-12 px-6 lg:px-12 max-w-3xl">
      {/* Breadcrumb */}
      <div className="flex items-center gap-2 text-sm text-muted-foreground mb-8">
        <Link href="/" className="hover:text-foreground transition-colors">
          Home
        </Link>
        <span>/</span>
        <span>Part 1: Foundations</span>
        <span>/</span>
        <span>Chapter 1</span>
      </div>

      {/* Header */}
      <header className="mb-12">
        <p className="text-sm font-mono text-primary mb-2">Section 1.1.1</p>
        <h1 className="text-3xl sm:text-4xl font-bold tracking-tight mb-4 text-balance">
          The Specialist&apos;s Dilemma
        </h1>
        <p className="text-lg text-muted-foreground">
          Chapter 1: The Renaissance Developer
        </p>
      </header>

      {/* Content */}
      <div className="prose prose-invert prose-green max-w-none">
        <p className="text-lg leading-relaxed">
          You&apos;ve spent five years becoming an expert React developer. You know the framework
          inside and out—hooks, context, performance optimization, the works. You can debug the
          gnarliest state management issues and architect scalable component hierarchies in your
          sleep. You&apos;re valuable because you&apos;re deep.
        </p>

        <p className="text-lg leading-relaxed font-semibold text-foreground">
          But something changed in 2024.
        </p>

        <p className="leading-relaxed text-muted-foreground">
          You ask Claude Code to &quot;build a React component for user authentication with social
          login,&quot; and it generates production-ready code in 30 seconds. Code that would have
          taken you an hour. Code that&apos;s clean, well-structured, and follows best practices.
          Sometimes it&apos;s better than what you would have written.
        </p>

        <p className="text-xl font-medium text-foreground">So what&apos;s your role now?</p>

        <p className="leading-relaxed text-muted-foreground">
          This is the specialist&apos;s dilemma:{" "}
          <strong className="text-foreground">
            when AI agents can handle implementation, deep specialization in coding becomes less
            valuable
          </strong>
          . The bottleneck in software development is shifting from &quot;writing code&quot; to
          &quot;knowing what to build and why.&quot; The Renaissance Developer recognizes this shift
          and adapts accordingly.
        </p>

        <h2 className="text-2xl font-bold mt-12 mb-6">Why Specialization Made Sense</h2>

        <p className="leading-relaxed text-muted-foreground">
          For the past two decades, the software industry rewarded depth. Companies needed backend
          experts who could optimize database queries, frontend specialists who mastered browser
          quirks, DevOps engineers who understood infrastructure at scale. This made perfect sense
          when:
        </p>

        <ul className="space-y-3 text-muted-foreground">
          <li>
            <strong className="text-foreground">Coding was the bottleneck</strong>: Writing and
            debugging code consumed most project time
          </li>
          <li>
            <strong className="text-foreground">Tools were primitive</strong>: No AI assistance,
            minimal automation, steep learning curves
          </li>
          <li>
            <strong className="text-foreground">Teams were siloed</strong>: Backend, frontend,
            design, and product were separate departments
          </li>
          <li>
            <strong className="text-foreground">Time-to-market was measured in months or years</strong>
            : Speed wasn&apos;t the primary competitive advantage
          </li>
        </ul>

        <p className="leading-relaxed text-muted-foreground">
          In that world, being a 10x engineer meant writing code 10x faster, knowing your domain 10x
          deeper, debugging 10x more efficiently. Specialization delivered real value.
        </p>

        <p className="text-lg font-semibold text-foreground">But the world changed.</p>

        <h2 className="text-2xl font-bold mt-12 mb-6">The New Reality</h2>

        <p className="leading-relaxed text-muted-foreground">Today, AI agents can:</p>

        <ul className="space-y-2 text-muted-foreground">
          <li>Generate boilerplate code instantly</li>
          <li>Implement APIs from specifications in minutes</li>
          <li>Write tests automatically</li>
          <li>Refactor codebases while maintaining behavior</li>
          <li>Translate designs into working UIs</li>
          <li>Debug issues by analyzing stack traces and suggesting fixes</li>
        </ul>

        <p className="leading-relaxed text-muted-foreground">
          What used to take a specialized engineer hours or days now takes minutes.{" "}
          <strong className="text-foreground">
            The bottleneck is no longer coding—it&apos;s knowing what to code
          </strong>
          .
        </p>

        <MermaidDiagram
          chart={mermaidChart}
          caption="Figure 1.1: The bottleneck has shifted from implementation to decision-making. In the AI era, coding happens in minutes while strategic thinking remains the constraint."
        />

        <p className="leading-relaxed text-muted-foreground">
          This creates a paradox for specialists: your expertise in <em>how to code</em> is
          increasingly commoditized, while your expertise in <em>what to build</em> becomes more
          valuable. But traditional specialization focused on the former, not the latter.
        </p>

        <p className="leading-relaxed text-muted-foreground">
          <strong className="text-foreground">
            The question isn&apos;t &quot;can you write React better than Claude?&quot;
          </strong>{" "}
          (you probably can&apos;t, and that&apos;s fine).{" "}
          <strong className="text-foreground">
            The question is &quot;can you decide what to build, architect the system, and validate
            that the AI-generated code actually solves the right problem?&quot;
          </strong>
        </p>

        <p className="leading-relaxed text-muted-foreground">
          This is where the Renaissance Developer emerges—not as someone who codes less, but as
          someone who <em>builds</em> more by orchestrating AI agents to handle implementation while
          you focus on the thinking that AI can&apos;t (yet) do: product vision, architectural
          decisions, user experience, and strategic tradeoffs.
        </p>

        <p className="leading-relaxed text-muted-foreground">
          The rest of this chapter introduces the Renaissance Developer model and explains how to
          thrive in this new paradigm.
        </p>
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
