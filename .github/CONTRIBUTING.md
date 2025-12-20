# Contributing to The Agentic Coding Playbook

Thank you for your interest in contributing! This book aims to democratize product development by teaching anyone—from vibecoders to CTOs—how to build and ship software using agentic coding. Your contributions help make this resource better for everyone.

## How You Can Contribute

### 1. Report Issues

Found an error, broken link, or technical inaccuracy? Please [open a bug report](https://github.com/testaco/agentic-coding-book/issues/new?template=bug_report.md).

**Common issues to report**:
- Typos, grammar, or formatting errors
- Broken internal or external links
- Technical inaccuracies
- Unclear explanations
- Missing or broken diagrams
- PDF generation issues

### 2. Suggest Content

Have an idea for improvement or new content? [Open a content suggestion](https://github.com/testaco/agentic-coding-book/issues/new?template=content_suggestion.md).

**Great suggestions include**:
- Additional patterns or techniques
- Real-world examples or case studies
- Clarifications of complex concepts
- Missing topics that fit the book's scope
- Alternative approaches or perspectives

### 3. Join Discussions

Share experiences, ask questions, or discuss agentic coding in [GitHub Discussions](https://github.com/testaco/agentic-coding-book/discussions).

**Discussion topics**:
- Share your 6-week MVP journey
- Ask questions about patterns or approaches
- Discuss tool experiences and workflows
- Suggest improvements to the book
- Connect with other practitioners

### 4. Submit Pull Requests

For direct content contributions, you can submit pull requests. **Please open an issue first** to discuss significant changes.

---

## Contribution Guidelines

### Writing Style

To maintain consistency with the book's voice:

- **First principles approach**: Assume zero prior knowledge, explain from basics
- **Teach principles, not tutorials**: Focus on "why" and "what," not step-by-step clicking
- **Inclusive language**: Accessible to vibecoders through CTOs
- **Practical focus**: Balance theory with actionable application
- **Clear and concise**: Short sentences, active voice, scannable structure
- **Examples**: Use pseudocode or config files (YAML/JSON), not full implementations

### Technical Standards

- **Markdown format**: Follow [CommonMark](https://commonmark.org/) specification
- **Frontmatter**: Include YAML frontmatter in all chapter files (see existing chapters)
- **Diagrams**: Use Mermaid syntax for all diagrams
- **Links**: Use relative links for internal cross-references
- **Requirements traceability**: Reference relevant REQ-* identifiers where applicable

### File Organization

Follow the established structure in `design.md` Section 2.1:

```
book/
├── part1-foundations/
├── part2-playbook/
├── part3-patterns-tools/
└── part4-example/

diagrams/
├── architecture/
├── workflows/
└── examples/
```

### Code of Conduct

This project is committed to providing a welcoming and inclusive environment:

- **Be respectful**: Treat all contributors with respect and kindness
- **Be constructive**: Provide helpful, actionable feedback
- **Be inclusive**: Welcome people of all backgrounds and skill levels
- **Be patient**: Remember that contributors have varying experience levels
- **Assume good intent**: Approach disagreements with curiosity and openness

**Unacceptable behavior**: Harassment, discrimination, personal attacks, or anything that creates an unwelcoming environment will not be tolerated.

---

## Pull Request Process

### Before Submitting

1. **Open an issue first** to discuss significant changes
2. **Fork the repository** and create a branch from `main`
3. **Follow the style guide** and technical standards
4. **Test locally**: Preview markdown, validate links, check PDF build (when scripts exist)
5. **Update related files**: Keep glossary, cross-references, and TOC current

### Pull Request Checklist

- [ ] Issue exists discussing this change (for non-trivial changes)
- [ ] Branch is up-to-date with `main`
- [ ] Changes follow the writing style guidelines
- [ ] All links are valid (internal and external)
- [ ] YAML frontmatter is complete and correct
- [ ] Mermaid diagrams render correctly
- [ ] Glossary updated for new terms
- [ ] Cross-references updated if needed
- [ ] PR description clearly explains changes and motivation

### Review Process

1. **Submit PR** with clear title and description
2. **Author reviews** (typically within 7 days per REQ-P011)
3. **Feedback provided** if changes needed
4. **Revisions made** based on feedback
5. **Approval and merge** when ready
6. **Automatic deployment** via GitHub Actions (when CI/CD is configured)

---

## Development Setup

### Prerequisites

- Git (2.40+)
- Node.js (18+) for Mermaid CLI
- Pandoc (3.0+) for PDF generation
- VS Code (recommended) with Markdown extensions
- Claude Code extension (optional, but helpful!)

### Local Development

```bash
# Clone your fork
git clone https://github.com/YOUR_USERNAME/agentic-coding-book.git
cd agentic-coding-book

# Install dependencies (when package.json exists)
npm install

# Preview changes
# Option 1: VS Code Markdown Preview (built-in)
# Option 2: Local server
npx http-server book/

# Validate links (when script exists)
./scripts/validate-links.sh

# Build PDF locally (when script exists)
./scripts/build-pdf.sh
```

### Making Changes

```bash
# Create a feature branch
git checkout -b feature/your-contribution

# Make your changes
# Edit files in book/, diagrams/, or other directories

# Test your changes locally
# Preview in VS Code or browser

# Commit with clear messages
git add .
git commit -m "Add clear description of changes"

# Push to your fork
git push origin feature/your-contribution

# Open PR on GitHub
```

---

## Content Lifecycle

### Status Levels

Content goes through these stages (tracked in frontmatter):

- **draft**: Initial writing, not reviewed
- **review**: Ready for feedback
- **published**: Reviewed, approved, live on GitHub Pages

### Review Criteria

Content is considered publication-ready when:

- [ ] Technically accurate
- [ ] Clearly written for target audience
- [ ] Examples are functional and relevant
- [ ] Diagrams are clear and accurate
- [ ] Links work correctly
- [ ] Follows style guidelines
- [ ] Fits within scope (brief.md)

---

## Questions?

- **Technical questions**: Open a [Discussion](https://github.com/testaco/agentic-coding-book/discussions)
- **Contribution questions**: Comment on your issue or PR
- **General inquiries**: See README.md or open a Discussion

---

## License

By contributing, you agree that your contributions will be licensed under the same [Creative Commons Attribution 4.0 International (CC BY 4.0)](../LICENSE) license that covers the project.

You retain copyright to your contributions, but grant the same freedoms to others that the CC BY 4.0 license provides.

---

## Recognition

All contributors will be acknowledged in the book's acknowledgments section. Significant contributions may be highlighted specifically.

---

**Thank you for helping democratize product development!** Your contributions make it possible for more people to build and ship software products using agentic coding.
