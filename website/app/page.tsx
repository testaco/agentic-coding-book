import { ArrowRight, Github, Terminal, BookOpen } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { EmailSignup } from "@/components/email-signup"
import { ThemeToggle } from "@/components/theme-toggle"

const KEY_IDEAS = [
  {
    title: "The Renaissance Developer",
    description:
      "Breadth over depth. The new competitive advantage is being good enough at everything.",
  },
  {
    title: "The Acceleration Paradox",
    description:
      "When coding gets 5-10x faster, five new bottlenecks emerge that nobody talks about.",
  },
  {
    title: "The Digestibility Principle",
    description:
      "Human working memory and AI context windows have the same constraints. Design for both.",
  },
  {
    title: "Specification-Driven Development",
    description:
      "The quality of your descriptions determines the quality of your product.",
  },
  {
    title: 'The "Good Enough at Everything" Principle',
    description:
      "Why 70% competency across 5 domains beats 95% in one.",
  },
]

const TESTIMONIALS = [
  {
    quote:
      "Finally, a book that treats AI coding as a real engineering discipline, not a party trick.",
    author: "Coming soon",
  },
  {
    quote:
      "The Renaissance Developer chapter changed how I think about my role as a senior engineer.",
    author: "Coming soon",
  },
  {
    quote:
      "Practical, opinionated, and exactly the playbook my team needed to adopt agentic workflows.",
    author: "Coming soon",
  },
]

export default function Home() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Header */}
      <header className="border-b border-border">
        <div className="max-w-5xl mx-auto px-6 py-4 flex items-center justify-between">
          <a href="/" className="flex items-center gap-2">
            <Terminal className="h-5 w-5 text-primary" />
            <span className="font-mono text-sm">agentic-coding</span>
          </a>
          <nav className="flex items-center gap-2">
            <a
              href="/book/foundations/renaissance-developer/introduction-the-specialist-s-dilemma"
              className="text-sm text-muted-foreground hover:text-foreground transition-colors"
            >
              Read
            </a>
            <Button variant="outline" size="sm" asChild className="bg-transparent">
              <a
                href="https://github.com/testaco/agentic-coding-book"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Github className="h-4 w-4 mr-2" />
                GitHub
              </a>
            </Button>
            <ThemeToggle />
          </nav>
        </div>
      </header>

      <main>
        {/* Hero */}
        <section className="relative pt-12 pb-16 sm:pt-16 sm:pb-20 px-6 overflow-hidden">
          {/* Book cover faded in background */}
          <div className="absolute top-6 right-0 lg:right-[10%] opacity-[0.06] pointer-events-none select-none hidden sm:block">
            <div className="w-[300px] lg:w-[360px] aspect-[3/4] rounded-lg border border-border bg-card flex flex-col items-center justify-between p-10">
              <div className="flex-1 flex flex-col items-center justify-center gap-4 text-center">
                <Terminal className="h-12 w-12 text-foreground" />
                <div>
                  <p className="text-sm uppercase tracking-widest text-foreground mb-2">
                    The
                  </p>
                  <h3 className="text-2xl font-bold leading-tight text-foreground">
                    Agentic Coding Playbook
                  </h3>
                </div>
                <div className="w-16 h-px bg-foreground" />
                <p className="text-sm text-foreground leading-snug">
                  From Idea to Production
                  <br />
                  in 6 Weeks
                </p>
              </div>
              <p className="text-sm text-foreground font-mono">Chris Testa</p>
            </div>
          </div>

          <div className="relative max-w-3xl mx-auto text-center">
            <Badge variant="outline" className="mb-6 font-mono text-xs">
              Part 1: Foundations -- available now
            </Badge>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-balance mb-4 leading-[1.1]">
              The bottleneck isn&apos;t{" "}
              <span className="text-primary">code</span> anymore.
            </h1>

            <p className="text-xl sm:text-2xl text-muted-foreground mb-3 text-pretty leading-relaxed">
              It&apos;s knowing what to build.
            </p>

            <p className="text-base text-muted-foreground max-w-xl mx-auto mb-8 leading-relaxed">
              The definitive playbook for building software products with AI
              agents — written by a CTO who&apos;s done it. For vibecoders
              and CTOs alike.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
              <Button size="lg" asChild>
                <a href="/book/foundations/renaissance-developer/introduction-the-specialist-s-dilemma">
                  <BookOpen className="mr-2 h-4 w-4" />
                  Start Reading Part 1
                </a>
              </Button>
              <Button
                variant="outline"
                size="lg"
                asChild
                className="bg-transparent"
              >
                <a href="#notify">Get notified for Part 2</a>
              </Button>
            </div>

            <p className="mt-4 text-xs text-muted-foreground">
              Free to read. Creative Commons (CC BY).
            </p>
          </div>
        </section>

        {/* Big Ideas */}
        <section className="py-16 px-6 border-t border-border">
          <div className="max-w-4xl mx-auto">
            <p className="text-center text-xs text-muted-foreground uppercase tracking-widest mb-2">
              What you&apos;ll learn
            </p>
            <h2 className="text-2xl sm:text-3xl font-bold text-center mb-4 text-balance">
              Five ideas that will change how you build software
            </h2>
            <p className="text-center text-muted-foreground max-w-xl mx-auto mb-12 leading-relaxed">
              These aren&apos;t AI hype takes. They&apos;re frameworks forged
              from shipping real products with agentic workflows.
            </p>

            <div className="space-y-4">
              {KEY_IDEAS.map((idea, i) => (
                <div
                  key={idea.title}
                  className="flex gap-5 p-5 rounded-lg border border-border bg-card"
                >
                  <span className="text-2xl font-bold text-primary font-mono shrink-0 leading-none mt-0.5">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <div>
                    <h3 className="font-semibold text-foreground mb-1">
                      {idea.title}
                    </h3>
                    <p className="text-sm text-muted-foreground leading-relaxed">
                      {idea.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Social Proof */}
        <section className="py-16 px-6 border-t border-border">
          <div className="max-w-4xl mx-auto">
            <p className="text-center text-xs text-muted-foreground uppercase tracking-widest mb-8">
              What readers are saying
            </p>
            <div className="grid sm:grid-cols-3 gap-6">
              {TESTIMONIALS.map((item) => (
                <figure
                  key={item.quote}
                  className="p-5 rounded-lg border border-border bg-card"
                >
                  <blockquote className="text-sm leading-relaxed mb-4 text-foreground">
                    &ldquo;{item.quote}&rdquo;
                  </blockquote>
                  <figcaption className="text-xs text-muted-foreground font-mono">
                    &mdash; {item.author}
                  </figcaption>
                </figure>
              ))}
            </div>
          </div>
        </section>

        {/* Table of Contents */}
        <section className="py-16 px-6 border-t border-border">
          <div className="max-w-2xl mx-auto">
            <h2 className="text-2xl font-bold mb-2 text-center">
              Table of Contents
            </h2>
            <p className="text-sm text-muted-foreground text-center mb-8">
              Four parts. One playbook. Idea to production in six weeks.
            </p>

            <div className="space-y-4">
              {/* Part 1 - Available */}
              <a
                href="/book/foundations/renaissance-developer/introduction-the-specialist-s-dilemma"
                className="group flex items-start gap-4 p-5 rounded-lg border border-primary/30 bg-card hover:border-primary/60 transition-colors"
              >
                <span className="text-sm font-mono text-primary mt-0.5">
                  01
                </span>
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <h3 className="font-semibold group-hover:text-primary transition-colors">
                      Foundations
                    </h3>
                    <Badge variant="default" className="text-[10px] px-1.5 py-0">
                      Available
                    </Badge>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    The Renaissance Developer mindset, what agentic coding
                    really means, and first principles of software architecture.
                  </p>
                </div>
                <ArrowRight className="h-4 w-4 text-muted-foreground group-hover:text-primary transition-colors mt-1 shrink-0" />
              </a>

              {/* Parts 2-4 - Coming Soon */}
              {[
                {
                  num: "02",
                  title: "The Playbook",
                  desc: "The complete 6-week journey: idea, brainstorm, brief, requirements, design, implementation, testing, and deployment.",
                },
                {
                  num: "03",
                  title: "Patterns & Tools",
                  desc: "Architecture patterns, interface design, testing strategies, and the agent-friendly toolchain.",
                },
                {
                  num: "04",
                  title: "Complete Example",
                  desc: "A real, non-trivial product built using the entire playbook -- proving the 6-week promise.",
                },
              ].map((part) => (
                <div
                  key={part.num}
                  className="flex items-start gap-4 p-5 rounded-lg border border-border bg-card opacity-50"
                >
                  <span className="text-sm font-mono text-muted-foreground mt-0.5">
                    {part.num}
                  </span>
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <h3 className="font-semibold">{part.title}</h3>
                      <Badge
                        variant="outline"
                        className="text-[10px] px-1.5 py-0 text-muted-foreground"
                      >
                        Soon
                      </Badge>
                    </div>
                    <p className="text-sm text-muted-foreground">{part.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Email Capture */}
        <section id="notify" className="py-20 px-6 border-t border-border">
          <div className="max-w-xl mx-auto text-center">
            <h2 className="text-2xl font-bold mb-3">
              Get notified when Part 2 drops
            </h2>
            <p className="text-sm text-muted-foreground mb-8 leading-relaxed">
              No spam. Just a single email when new chapters go live.
            </p>
            <div className="flex justify-center">
              <EmailSignup />
            </div>
          </div>
        </section>

        {/* Final CTA */}
        <section className="py-16 px-6 border-t border-border">
          <div className="max-w-2xl mx-auto text-center">
            <p className="text-lg text-muted-foreground mb-6 text-pretty leading-relaxed">
              AI can write code faster than you can type. The question
              isn&apos;t whether to use it — it&apos;s whether you know
              how to direct it.
            </p>
            <Button size="lg" asChild>
              <a href="/book/foundations/renaissance-developer/introduction-the-specialist-s-dilemma">
                <BookOpen className="mr-2 h-4 w-4" />
                Start Reading Part 1
                <ArrowRight className="ml-2 h-4 w-4" />
              </a>
            </Button>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="border-t border-border py-8 px-6">
        <div className="max-w-5xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4 text-sm text-muted-foreground">
          <p>
            By Chris Testa. Creative Commons Attribution (CC BY).
          </p>
          <div className="flex items-center gap-4">
            <a
              href="https://github.com/testaco/agentic-coding-book"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-foreground transition-colors"
            >
              GitHub
            </a>
            <span>The Agentic Coding Playbook</span>
          </div>
        </div>
      </footer>
    </div>
  )
}
