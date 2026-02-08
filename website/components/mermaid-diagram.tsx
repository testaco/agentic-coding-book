"use client"

import { useEffect, useRef } from "react"
import { useTheme } from "next-themes"
import mermaid from "mermaid"

interface MermaidDiagramProps {
  chart: string
  caption?: string
}

export function MermaidDiagram({ chart, caption }: MermaidDiagramProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const { theme, systemTheme } = useTheme()

  // Determine the actual theme being used (handles "system" theme)
  const currentTheme = theme === "system" ? systemTheme : theme

  useEffect(() => {
    const renderDiagram = async () => {
      if (containerRef.current && currentTheme) {
        // Configure mermaid with theme-specific settings
        const isDark = currentTheme === "dark"

        mermaid.initialize({
          startOnLoad: false,
          theme: isDark ? "dark" : "default",
          themeVariables: isDark ? {
            // Dark theme colors
            primaryColor: "#22c55e",
            primaryTextColor: "#fafaf9",
            primaryBorderColor: "#22c55e",
            lineColor: "#3f3f46",
            secondaryColor: "#18181b",
            tertiaryColor: "#27272a",
            background: "#0c0d10",
            mainBkg: "#18181b",
            nodeBorder: "#3f3f46",
            clusterBkg: "#18181b",
            clusterBorder: "#3f3f46",
            titleColor: "#fafaf9",
            edgeLabelBackground: "#18181b",
          } : {
            // Light theme colors
            primaryColor: "#22c55e",
            primaryTextColor: "#18181b",
            primaryBorderColor: "#22c55e",
            lineColor: "#d4d4d8",
            secondaryColor: "#fafaf9",
            tertiaryColor: "#f4f4f5",
            background: "#ffffff",
            mainBkg: "#fafaf9",
            nodeBorder: "#d4d4d8",
            clusterBkg: "#fafaf9",
            clusterBorder: "#d4d4d8",
            titleColor: "#18181b",
            edgeLabelBackground: "#fafaf9",
          },
          flowchart: {
            curve: "basis",
            padding: 20,
          },
        })

        containerRef.current.innerHTML = ""
        try {
          const { svg } = await mermaid.render(
            `mermaid-${Math.random().toString(36).substr(2, 9)}`,
            chart
          )
          containerRef.current.innerHTML = svg
        } catch (error) {
          console.error("Mermaid rendering error:", error)
          containerRef.current.innerHTML = `<pre class="text-sm text-destructive">${chart}</pre>`
        }
      }
    }
    renderDiagram()
  }, [chart, currentTheme])

  return (
    <figure className="my-8">
      <div
        ref={containerRef}
        className="bg-card border border-border rounded-lg p-6 overflow-x-auto"
      />
      {caption && (
        <figcaption className="mt-3 text-sm text-muted-foreground text-center italic">
          {caption}
        </figcaption>
      )}
    </figure>
  )
}
