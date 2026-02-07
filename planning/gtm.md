# Go-to-Market Strategy: Agentic Coding Playbook

**Created**: 2026-02-06
**Author**: Chris Testa
**Goal**: Establish credibility and thought leadership in agentic coding by shipping Part 1: Foundations as a polished, free release — then build an audience for Parts 2-4.

---

## Brand Identity

**Brand Name**: Agentic Coding Playbook
**Positioning**: The definitive guide to building software products with AI agents — written by a CTO who's done it.
**Voice**: Authoritative but accessible. Opinionated but practical. Talks to vibecoders and CTOs in the same sentence without condescending to either.
**Core Message**: The bottleneck isn't code anymore. It's knowing what to build.

### Key Concepts to Lead With

These are the book's most original, shareable ideas — they become the brand's intellectual property:

1. **The Renaissance Developer** — Breadth over depth. The new competitive advantage is being good enough at everything.
2. **The Acceleration Paradox** — When coding gets 5-10x faster, five new bottlenecks emerge that nobody talks about.
3. **The Digestibility Principle** — Human working memory and AI context windows have the same constraints. Design for both.
4. **Specification-Driven Development** — The quality of your descriptions determines the quality of your product.
5. **The "Good Enough at Everything" Principle** — Why 70% competency across 5 domains beats 95% in one.

---

## Launch Strategy

### Phase 1: Polish the Product

Ship Part 1 as a professional, polished reading experience — not a repo README.

#### Website

- [x] Export v0 design and adapt for GitHub Pages deployment (2026-02-07)
  - [x] Updated deploy-pages.yml to build Next.js site with pnpm
  - [x] Configured NEXT_PUBLIC_BASE_PATH for GitHub Pages
  - [x] Fixed GitHub links to point to testaco/agentic-coding-book
  - [x] Added .nojekyll to prevent Jekyll processing
  - [x] Test deployment (triggered 2026-02-07 via push to go-to-market branch)
- [x] Build a landing page that sells the book's ideas (v0 design complete)
  - [x] Hero: "The bottleneck isn't code anymore"
  - [x] Social proof section (placeholder testimonials ready)
  - [x] Email capture: "Get notified when Part 2 drops"
  - [x] Clear CTA to start reading Part 1
  - [x] Five key ideas prominently featured
- [ ] Integrate actual book content into website
  - [ ] Set up dynamic routing for book chapters (`/book/[part]/[chapter]/[section]`)
  - [ ] Build markdown processing pipeline (frontmatter + content)
  - [ ] Map URL slugs to actual markdown files in `book/` directory
  - [ ] Implement chapter navigation (previous/next, breadcrumbs, sidebar)
  - [ ] Use real TABLE_OF_CONTENTS.md for site navigation structure
  - [ ] Render Mermaid diagrams client-side (mermaid.js)
  - [ ] Add reading progress indicator and estimated reading time
  - [ ] Test all Part 1 chapter links work (50+ sections across 5 chapters)
- [ ] Polish the reading experience — clean typography, chapter navigation, mobile-friendly
  - [ ] Typography optimized for long-form reading
  - [ ] Mobile-responsive design tested on multiple devices
  - [ ] Syntax highlighting for code blocks
  - [ ] Mermaid diagram rendering in browser
- [x] Add proper meta tags (OpenGraph, Twitter cards) so links look good when shared (2026-02-07)
  - [x] Comprehensive OpenGraph metadata for Facebook, LinkedIn
  - [x] Twitter Card metadata with large image
  - [x] Generated 1200x630 OG image PNG with brand styling
  - [x] Created favicon.svg and site.webmanifest
  - [x] Added SEO keywords, author info, robots directives
- [ ] Set up a custom domain (optional but more professional than testaco.github.io)

#### Content Cleanup

- [x] Update author to "Chris Testa" across all frontmatter (50+ files)
- [x] Change `status: draft` to `status: published` in all Part 1 files
- [x] Fix placeholder text in Chapter 1 Further Reading (6 instances)
- [x] Clean up TABLE_OF_CONTENTS.md — remove Part 2-4 stub entries
- [x] Update navigation.yml — remove broken Part 2-4 chapter links
- [x] Update preface.md — frame as Part 1 release, Parts 2-4 coming
- [x] Update index.md — status table shows Part 1 as Published
- [x] Update README.md — author, status, links

#### PDF

- [x] Generate a clean PDF of Part 1 (via GitHub Actions)
- [ ] Add a cover page / title page (v1.1 enhancement)
- [x] Verify formatting, code blocks, and diagrams render properly (via CI/CD)
- [x] Create a GitHub Release with the PDF attached (v0.1.0 tagged, release building)

#### Email Capture

- [ ] Set up an email list (Buttondown, Substack, ConvertKit, or similar)
- [ ] Embed signup form on the landing page
- [ ] Create a welcome email: "Here's Part 1 + what's coming in Parts 2-4"

---

### Phase 2: Seed the Brand

Before the "launch day," establish the brand presence and start putting ideas out there. This builds an audience that's primed when the site goes live.

#### Brand Accounts

- [ ] Create X/Twitter account for Agentic Coding Playbook (or use personal + brand hashtag)
- [ ] Create LinkedIn page or start posting from personal with brand framing
- [ ] Set up Substack or newsletter (doubles as blog + email list)
- [ ] Create GitHub org or ensure repo is public and polished

#### Content Seeding (Pre-Launch)

The book has 70K words of content. Extract the best ideas as standalone posts:

- [ ] **Thread 1: The Renaissance Developer** — "The most valuable developer in 2026 isn't a specialist. Here's why..." Pull from Chapter 1.
- [ ] **Thread 2: The 5 New Bottlenecks** — "When AI makes coding 5-10x faster, 5 new bottlenecks emerge that nobody talks about." Pull from Chapter 5.
- [ ] **Thread 3: The Digestibility Principle** — "Your brain and GPT-4 have the same architectural constraint. Here's how to design for both." Pull from Chapter 4.
- [ ] **Thread 4: What Agentic Coding Actually Is** — "Everyone's talking about AI coding tools. Almost nobody understands what 'agentic coding' actually means." Pull from Chapter 2.
- [ ] **Thread 5: Architecture for the AI Era** — "Most codebases are designed for humans to write. Here's how to design them for AI to write and humans to review." Pull from Chapter 3.
- [ ] **Blog post**: Expand one thread into a long-form article (best candidate: Renaissance Developer or 5 New Bottlenecks)

#### Community Presence

- [ ] Join and lurk in relevant communities before posting (authenticity matters):
  - Indie Hackers
  - r/SideProject, r/programming, r/artificial
  - Hacker News
  - Dev.to
  - Claude/Anthropic Discord or community spaces
- [ ] Contribute value first — answer questions about agentic coding, share insights without linking the book
- [ ] Build a list of 10-20 relevant community threads where the book's ideas would genuinely add value

---

### Phase 3: Launch

Coordinate a launch window where the site goes live and content hits multiple channels simultaneously.

#### Launch Day Checklist

- [ ] Site is live, polished, and tested on mobile
- [ ] PDF is downloadable from GitHub Releases
- [ ] Email capture is working
- [ ] OpenGraph/Twitter card previews tested and looking good
- [ ] All social accounts are set up and have some prior content (not brand new empty accounts)

#### Launch Posts

- [ ] **Hacker News**: "Show HN: The Agentic Coding Playbook — free book on building products with AI agents"
  - Best if posted mid-morning US time, Tuesday-Thursday
  - Title should emphasize "free" and "playbook" — HN values substance
  - Have a top comment ready explaining the meta story (book built with its own methodology)
- [ ] **Reddit**: Post to r/programming, r/SideProject, r/ChatGPTCoding, r/ClaudeAI
  - Different framing for each subreddit
  - Focus on value, not promotion
- [ ] **Indie Hackers**: Launch post with the story — CTO writing a book using AI about using AI
- [ ] **X/Twitter**: Launch thread from brand account + personal amplification
- [ ] **LinkedIn**: Article or post targeting engineering leaders and CTOs
- [ ] **Dev.to**: Publish the best blog post (Renaissance Developer or New Bottlenecks) with link to full book
- [ ] **Substack/Newsletter**: Send launch announcement to any early subscribers

#### The Meta Story (Your Secret Weapon)

The most compelling marketing angle: **this book was built using its own methodology**. The planning docs are visible. The git history shows the process. The AI assistance is transparent. This is the proof that the approach works — and it's a story that communities love.

Lead with: "I'm a CTO. I wrote a book about building products with AI. The book itself was built using the workflow it teaches. Here's Part 1 — free."

---

### Phase 4: Sustain and Build to Parts 2-4

After launch, keep momentum while writing the rest.

#### Ongoing Content

- [ ] Weekly or biweekly posts pulling ideas from Part 1 (you have months of content to extract)
- [ ] "Behind the scenes" posts about writing Parts 2-4 using the methodology
- [ ] Respond to comments and discussions — thought leadership is built in conversations, not broadcasts
- [ ] Guest posts or podcast appearances if opportunities arise (don't chase these, let them come from visibility)

#### Audience Building

- [ ] Track email signups — this is the core metric for Part 2 launch readiness
- [ ] Engage with people who share or comment on the content
- [ ] Collect feedback on Part 1 — what resonated, what's missing, what should Part 2 prioritize

#### Parts 2-4 Teasers

- [ ] Monthly update to email list: "Here's what I'm working on in Part 2"
- [ ] Share draft excerpts from Part 2 as they're written — builds anticipation and gets feedback
- [ ] When Part 2 is ready, repeat Phase 3 launch process with the built-in audience

---

## Success Metrics

### Launch (First 30 Days)

| Metric | Target | How to Measure |
|--------|--------|----------------|
| Unique site visitors | 5,000+ | GitHub Pages analytics or added analytics |
| Email signups | 500+ | Email platform dashboard |
| GitHub stars | 200+ | Repository stats |
| Social impressions | 50,000+ | Platform analytics |
| Community engagement | 3+ substantive discussions | HN comments, Reddit threads, etc. |

### Credibility Indicators (First 90 Days)

| Indicator | What It Looks Like |
|-----------|-------------------|
| Thought leadership | People reference "Renaissance Developer" or "Digestibility Principle" unprompted |
| Inbound interest | Speaking invitations, podcast requests, collaboration offers |
| Community recognition | Recognized name in agentic coding discussions |
| Content resonance | Posts get shared and discussed organically |

---

## Timeline

| Week | Focus | Key Deliverable |
|------|-------|-----------------|
| 1 | Polish product | Site live with v0 design, content cleaned up |
| 1 | Brand setup | Accounts created, first 2 seed posts published |
| 2 | Content seeding | 3-5 threads/posts published, community presence established |
| 3 | Launch | Coordinated launch across all channels |
| 4+ | Sustain | Weekly content, audience engagement, start Part 2 |

---

## Anti-Patterns to Avoid

**Don't**: Post "check out my book" with a link and nothing else. Communities hate this.
**Do**: Share a genuinely useful insight, and mention the book as context.

**Don't**: Post the same content everywhere simultaneously. It looks like spam.
**Do**: Adapt the message for each channel's culture and audience.

**Don't**: Obsess over metrics in the first week. Launches are noisy.
**Do**: Focus on whether the ideas resonate in conversations.

**Don't**: Wait until everything is perfect. Part 1 is good. Ship it.
**Do**: Iterate the site and marketing based on what you learn post-launch.

**Don't**: Burn out trying to be everywhere. Consistency beats intensity.
**Do**: Pick 2 channels that feel natural and go deep there. Expand later.

---

## Open Questions

- [ ] Custom domain? (e.g., agenticcodingplaybook.com)
- [ ] Monetization for Parts 2-4? (Free, paid, freemium with Part 1 free?)
- [ ] Analytics setup? (Simple analytics, Plausible, or just GitHub traffic stats?)
- [ ] Will Parts 2-4 also be open source / CC BY 4.0, or shift to paid?
