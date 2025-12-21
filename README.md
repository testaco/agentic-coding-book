# The Agentic Coding Playbook: From Idea to Production in 6 Weeks

[![License: CC BY 4.0](https://img.shields.io/badge/License-CC%20BY%204.0-lightgrey.svg)](https://creativecommons.org/licenses/by/4.0/)
[![Status: In Development](https://img.shields.io/badge/status-in%20development-yellow.svg)]()
[![Deploy Pages](https://github.com/testaco/agentic-coding-book/actions/workflows/deploy-pages.yml/badge.svg)](https://github.com/testaco/agentic-coding-book/actions/workflows/deploy-pages.yml)
[![Build PDF](https://github.com/testaco/agentic-coding-book/actions/workflows/build-pdf.yml/badge.svg)](https://github.com/testaco/agentic-coding-book/actions/workflows/build-pdf.yml)
[![Validate PR](https://github.com/testaco/agentic-coding-book/actions/workflows/validate-pr.yml/badge.svg)](https://github.com/testaco/agentic-coding-book/actions/workflows/validate-pr.yml)

## About This Book

**Transform any product idea into a production-ready MVP in 6 weeks.**

This book is the definitive playbook for building software products in the age of AI. It democratizes product development, enabling anyone—from vibecoders to CTOs—to build and ship software using agentic coding. Rather than teaching programming, it teaches *product building* in an era where AI agents handle the mechanical coding work.

The book promotes the **Renaissance Developer** model: becoming "good enough at everything" to successfully ship products by combining systems thinking, product vision, design sensibility, and strategic judgment while AI agents handle implementation details.

**Key Promise:** Use proven patterns from battle-tested CTO experience to go from idea to production in 6 weeks.

## How to Read This Book

**🌐 Online (Web):** [Read on GitHub Pages](https://testaco.github.io/agentic-coding-book/)

**📄 PDF Download:** [Latest Release](https://github.com/testaco/agentic-coding-book/releases/latest)

**📖 Source:** Browse the Markdown source in the `book/` directory (currently in development)

**📋 Planning Artifacts:** See how this book was built using its own methodology in the `planning/` directory

## Book Structure

**Part 1: Foundations** - Core concepts including the Renaissance Developer mindset, what agentic coding is, architecture principles for AI-friendly systems, digestible interfaces, and understanding new bottlenecks when coding accelerates 5-10x.

**Part 2: The Playbook** - Complete 6-week workflow from idea to production: brainstorming, product brief, requirements in EARS notation, technical design, implementation planning, testing strategies, deployment pipelines, environment progression, managing AI agents, and post-MVP iteration.

**Part 3: Patterns & Tools** - Reusable patterns and tools including architecture patterns, specification patterns (EARS, OpenAPI, AsyncAPI), testing strategies for AI-generated code, and the agentic development toolchain (MCP servers, Claude Code skills, code review patterns).

**Part 4: Complete Example** - Real 6-week project documented end-to-end demonstrating all patterns and validating the timeline with actual code, decisions, and lessons learned.

## Target Audience

This book serves a wide spectrum:

- **Vibecoders** - Zero technical background, want to build software products
- **Aspiring Founders** - Non-technical founders with product ideas
- **Solo Developers** - Individual developers shipping complete products
- **Small Teams** - Startups maximizing velocity and reducing time-to-market
- **Engineering Leaders & CTOs** - Technical leaders adapting organizations to agentic coding
- **Product Managers** - PMs wanting to prototype and validate ideas faster

If you want to ship software products faster using AI assistance, this book is for you.

## Development Status

**Current Milestone:** MVP (Week 2) - Infrastructure setup and Part 1: Foundations

**Upcoming Milestones:**
- Week 6: v1.0 - Complete first pass of all 4 parts
- Week 12: v1.1 - Refinements, advanced patterns, print-ready

See [`planning/roadmap.md`](planning/roadmap.md) for detailed timeline and [`CHANGELOG.md`](CHANGELOG.md) for version history.

## Planning Process - Practicing What We Preach

This book was created using the very workflow it teaches! The `planning/` directory contains the complete genesis workflow artifacts:

- **[`genesis.md`](planning/genesis.md)** - The master workflow definition (T001-T006)
- **[`idea.md`](planning/idea.md)** → **[`brainstorm.md`](planning/brainstorm.md)** → **[`brief.md`](planning/brief.md)** - Ideation to product definition
- **[`requirements.md`](planning/requirements.md)** - Requirements in EARS notation
- **[`design.md`](planning/design.md)** - Technical architecture and design decisions
- **[`tasks.md`](planning/tasks.md)** - Implementation task breakdown (~81 tasks)
- **[`roadmap.md`](planning/roadmap.md)** - MVP roadmap, environment progression, and gantt chart

This transparency demonstrates the methodology works and provides a real reference implementation.

## How to Build Locally

### Prerequisites

**Required Tools:**
- **Git** - Version control
- **Node.js** (v18+) and npm - For build tools and Mermaid diagram rendering
- **Pandoc** (v3.0+) - For PDF generation
- **Claude Code** (optional) - For contributing using the agentic workflow

### Setup Instructions

**1. Clone the repository:**
```bash
git clone https://github.com/[username]/agentic-coding-book.git
cd agentic-coding-book
```

**2. Install Node.js dependencies:**
```bash
npm install
```

**3. Verify Pandoc installation:**
```bash
pandoc --version
# Should show v3.0 or higher
```

**4. Install Pandoc (if needed):**

*Debian/Ubuntu:*
```bash
wget https://github.com/jgm/pandoc/releases/download/3.1.11/pandoc-3.1.11-1-amd64.deb
sudo dpkg -i pandoc-3.1.11-1-amd64.deb
```

*macOS:*
```bash
brew install pandoc
```

*Other platforms:* See [Pandoc installation guide](https://pandoc.org/installing.html)

### Build Commands

**Generate PDF:**
```bash
npm run build:pdf
# Output: output/agentic-coding-book.pdf
```

**Render Mermaid diagrams:**
```bash
npm run build:mermaid
# Converts .mmd files to PNG in diagrams/
```

**Validate links:**
```bash
npm run validate:links
# Checks for broken internal and external links
```

**Validate frontmatter:**
```bash
npm run validate:frontmatter
# Validates YAML frontmatter against schema
```

**Check requirements traceability:**
```bash
npm run validate:traceability
# Ensures all requirements are traced to content
```

**Run all validations:**
```bash
npm test
```

### Reading the Content

**Web (GitHub Pages):** [Coming Soon]

**PDF:** Generate locally with `npm run build:pdf`

**Markdown:** Browse `book/` directory with any Markdown viewer

**Note:** Build scripts will be fully implemented in INFRA-004

## Contributing

Contributions are welcome! See [`.github/CONTRIBUTING.md`](.github/CONTRIBUTING.md) (coming in INFRA-002) for:
- How to report issues
- Content suggestions
- Improvement proposals
- Community guidelines

## Repository Structure

```
agentic-coding-book/
├── planning/          # Genesis workflow artifacts
├── book/              # Book content (Parts 1-4)
├── diagrams/          # Mermaid diagram sources
├── assets/            # Images, styles, templates
├── scripts/           # Build and automation scripts
├── .github/           # GitHub workflows and templates
└── .claude/           # Claude Code skills for book writing
```

## License

This work is licensed under [Creative Commons Attribution 4.0 International (CC BY 4.0)](LICENSE).

**You are free to:**
- **Share** — Copy and redistribute the material in any medium or format
- **Adapt** — Remix, transform, and build upon the material for any purpose, even commercially

**Under the following terms:**
- **Attribution** — You must give appropriate credit, provide a link to the license, and indicate if changes were made

See the [LICENSE](LICENSE) file for the complete legal text.

## Author

[Author information - TBD]

## Acknowledgments

Built with [Claude Code](https://claude.ai/claude-code), demonstrating the agentic coding principles taught in this book.

Special thanks to the Claude Code team at Anthropic for creating tools that make this new way of building software possible.

---

**Status:** 🚧 **In Development** - Infrastructure setup complete, Part 1 content in progress

**Next Milestone:** Week 2 MVP with Part 1: Foundations complete
