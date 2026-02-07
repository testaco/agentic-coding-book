"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { ChevronDown, ChevronRight } from "lucide-react"
import { useState, useEffect } from "react"
import { cn } from "@/lib/utils"
import { bookStructure } from "@/lib/book-data"

export function BookNav({ onNavigate }: { onNavigate?: () => void }) {
  const pathname = usePathname()

  const getInitialExpanded = () => {
    const parts: string[] = []
    const chapters: string[] = []
    for (const part of bookStructure) {
      for (const chapter of part.chapters) {
        for (const section of chapter.sections) {
          if (pathname === `/book/${part.slug}/${chapter.slug}/${section.slug}`) {
            parts.push(part.slug)
            chapters.push(chapter.slug)
          }
        }
      }
    }
    return {
      parts: parts.length > 0 ? parts : ["foundations"],
      chapters: chapters.length > 0 ? chapters : [],
    }
  }

  const initial = getInitialExpanded()
  const [expandedParts, setExpandedParts] = useState<string[]>(initial.parts)
  const [expandedChapters, setExpandedChapters] = useState<string[]>(initial.chapters)

  useEffect(() => {
    const updated = getInitialExpanded()
    setExpandedParts((prev) => Array.from(new Set([...prev, ...updated.parts])))
    setExpandedChapters((prev) => Array.from(new Set([...prev, ...updated.chapters])))
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathname])

  const togglePart = (slug: string) => {
    setExpandedParts((prev) =>
      prev.includes(slug) ? prev.filter((s) => s !== slug) : [...prev, slug],
    )
  }

  const toggleChapter = (slug: string) => {
    setExpandedChapters((prev) =>
      prev.includes(slug) ? prev.filter((s) => s !== slug) : [...prev, slug],
    )
  }

  return (
    <nav className="space-y-0.5 text-sm" aria-label="Table of contents">
      <p className="mb-3 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
        Table of Contents
      </p>

      {bookStructure.map((part, partIndex) => {
        const isPartAvailable = part.available
        return (
          <div key={part.slug}>
            {/* Part heading */}
            <button
              type="button"
              onClick={() => togglePart(part.slug)}
              className="flex items-center gap-1.5 w-full text-left py-1.5 px-2 rounded-md hover:bg-muted transition-colors"
            >
              {expandedParts.includes(part.slug) ? (
                <ChevronDown className="h-3.5 w-3.5 text-muted-foreground shrink-0" />
              ) : (
                <ChevronRight className="h-3.5 w-3.5 text-muted-foreground shrink-0" />
              )}
              <span
                className={cn(
                  "font-medium truncate",
                  !isPartAvailable && "text-muted-foreground",
                )}
              >
                Part {partIndex + 1}: {part.title}
              </span>
              {!isPartAvailable && (
                <span className="ml-auto text-[10px] font-mono text-muted-foreground/60 uppercase shrink-0">
                  Soon
                </span>
              )}
            </button>

            {/* Chapters */}
            {expandedParts.includes(part.slug) &&
              part.chapters.map((chapter, chapterIndex) => (
                <div key={chapter.slug}>
                  {/* Chapter heading */}
                  <button
                    type="button"
                    onClick={() => toggleChapter(chapter.slug)}
                    className="flex items-center gap-1.5 w-full text-left py-1.5 pl-4 pr-2 rounded-md hover:bg-muted transition-colors"
                  >
                    {chapter.sections.length > 0 ? (
                      expandedChapters.includes(chapter.slug) ? (
                        <ChevronDown className="h-3 w-3 text-muted-foreground shrink-0" />
                      ) : (
                        <ChevronRight className="h-3 w-3 text-muted-foreground shrink-0" />
                      )
                    ) : (
                      <span className="w-3 shrink-0" />
                    )}
                    <span className="text-muted-foreground truncate">
                      Ch. {chapterIndex + 1}: {chapter.title}
                    </span>
                  </button>

                  {/* Sections -- flat list, minimal indent */}
                  {expandedChapters.includes(chapter.slug) &&
                    chapter.sections.map((section) => {
                      const href = `/book/${part.slug}/${chapter.slug}/${section.slug}`
                      const isActive = pathname === href
                      return (
                        <Link
                          key={section.slug}
                          href={href}
                          onClick={onNavigate}
                          className={cn(
                            "block py-1 pl-9 pr-2 rounded-md truncate transition-colors",
                            isActive
                              ? "bg-primary/10 text-primary font-medium"
                              : isPartAvailable
                                ? "text-muted-foreground hover:bg-muted hover:text-foreground"
                                : "text-muted-foreground/50 pointer-events-none",
                          )}
                          aria-current={isActive ? "page" : undefined}
                          title={section.title}
                        >
                          {section.title}
                        </Link>
                      )
                    })}
                </div>
              ))}
          </div>
        )
      })}
    </nav>
  )
}
