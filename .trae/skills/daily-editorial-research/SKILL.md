---
name: daily-editorial-research
description: Editorial research and blog maintenance for Harbourline — finds candidate topics, checks them against existing content, scores practical value and evidence, and only then decides to publish, update or reject. Use for daily editorial passes, content audits, topic research, duplicate detection and blog updates.
---

# Daily Editorial Research & Blog Update

## Role

You are the content editor for Harbourline.

## Objective

Your objective is NOT to publish a new article every day.

Your objective is to improve the website's usefulness and authority by identifying genuinely valuable topics and maintaining existing content.

## Most Important Rule

Never publish content solely because:

- it is new
- it is AI-related
- it is trending

Only publish content that:

- helps somebody complete a real task,
- make a decision,
- avoid a mistake,
- or understand a meaningful change.

---

## Daily Workflow

Before Step 1, load `.company-rules/agent-rules.md` — it governs structure, design tokens, JS patterns, SEO policy and packaging.

### Step 1 — Research Candidate Topics

Research potential topics from the following tiers.

#### Priority A (Highest)

Topics that solve a specific user problem. Examples:

- How to choose floor trunking for offices
- Common failures in cable trunking installations
- Fire-rated cable containment requirements
- Data centre cable pathway planning
- Raised floor vs floor trunking

Question:

> Will this article help someone perform a real task?

If YES → **Priority Score = High**.

#### Priority B

Official updates released within **72 hours to 7 days** from:

Google Search Central, Google Ads, Google Analytics, Google Business Profile, Microsoft Ads, Microsoft Clarity, LinkedIn, Meta, X, YouTube, OpenAI, Anthropic, Google AI, Perplexity, Cloudflare, WordPress.

Only consider updates that **change practical behaviour**.

Reject:

- marketing announcements
- branding news
- funding news

Prefer:

- ranking changes
- ads changes
- indexing changes
- AI search changes
- content guidelines

Harbourline applicability note: for an E&M contractor site, Priority B only matters when it changes how the site is found or read (e.g. Search Central indexing/structured-data guidance, AI search summaries, Business Profile rules). Ads, social and CMS release notes are normally **not actionable** — record them as "monitor only" and move on.

#### Priority C

Industry developments in:

BIM · Building Services · MEP · Electrical Engineering · Mechanical Engineering · Data Centres

Only if supported by reliable sources.

---

### Step 2 — Check Existing Website Content

Before writing anything, scan:

- `blog.html`
- `blogs/*`
- `services/*`
- product pages
- project pages

Determine:

> Does a similar article already exist?

If similar content exists: **DO NOT create a new article.** Update the existing article.

Examples:

| Existing article | New topic found | Action |
| --- | --- | --- |
| Cable Trunking Guide | Cable Trunking Inspection Checklist | Merge into existing guide |

Current site inventory (no `blogs/`, `services/`, product or project pages exist):

- `index.html` sections act as the service pages: `profile`, `submissions`, `cable`, `floor`, `projects`, `certification`, `contact`
- `blog.html`: six article summaries — cable trunking specification, pre-galvanised vs hot-dip, in-screed setting out, first-pass submission, fire-rated containment, live-station delivery — plus nine FAQs

Treat an index section as the canonical page for its topic; treat a blog summary as an article stub, not a separate service page.

---

### Step 3 — Duplicate Detection

Calculate similarity. Compare:

- title
- keywords
- intent
- questions answered

If overlap exceeds **60%**:

- Treat as duplicate.
- Output: **UPDATE EXISTING ARTICLE**, not **CREATE NEW ARTICLE**.

---

### Step 4 — Practical Value Assessment

**Question 1 — Does this solve a real work problem?**

Good: *How much space should be left in a floor trunking system?*

Bad: *Why innovation matters in construction.*

**Question 2 — Would an engineer, contractor or consultant search for it?**

Must be answerable by one of: Google search intent, customer enquiry, site coordination issue, procurement decision.

**Question 3 — Can the article provide a clear answer?**

If the answer is vague → **reject**.

---

### Step 5 — Evidence Assessment

Verify whether enough evidence exists. Accepted sources:

- Government sources
- Standards bodies
- Manufacturer documentation
- Official platform documentation
- Academic papers
- Industry associations

Rejected sources:

- Forum speculation
- Unknown blogs
- AI-generated sources

If evidence is insufficient, output:

```
DO NOT PUBLISH
Reason: Insufficient evidence.
```

---

### Step 6 — Content Decision Matrix

For every candidate topic:

| Test | Result |
| --- | --- |
| Solves a work problem? | Yes / No |
| Search intent exists? | Yes / No |
| Existing article found? | Yes / No |
| Duplicate > 60%? | Yes / No |
| Evidence sufficient? | Yes / No |
| Worth publishing? | Yes / No |

---

## Publishing Rules

Publish **ONLY** if:

- Real problem solved
- **AND** evidence sufficient
- **AND** not substantially duplicated

Otherwise: update existing content, or reject.

---

## Output Format

Produce a recommendation block for every candidate:

```
RECOMMENDATION

Topic:
XXX

Priority:
A / B / C

Reason:
- Specific user problem identified
- Search demand likely
- Evidence available

Duplicate Check:
Existing Article: XXX
Similarity: XX%
Decision: Update Existing / Create New

Evidence Sources:
1.
2.
3.

Final Decision:
Publish / Update Existing / Reject
```

---

## Article Generation Rules

If publishing is approved, generate:

1. SEO Title
2. Meta Description
3. Slug
4. Outline
5. Article
6. FAQ
7. Internal Links
8. Suggested Existing Articles To Link

Apply the site's SEO policy from `.company-rules/agent-rules.md`:

- One primary keyword per page (`E&M contractor Hong Kong` on the site, issued per page)
- Exact-match keyword in title, meta, OG and one H1 only; natural variants in prose
- British English, Hong Kong terminology, understated technical tone
- FAQ JSON-LD must match visible answers word for word
- No invented clients, projects, approvals, certifications, statistics or dates

---

## Harbourline guardrails

- No daily publishing quota; "no change today" is a valid, documented outcome.
- One meaningful editorial change per run — correct → refresh → expand → consolidate → add.
- Do not change existing page titles, H1s or primary keywords without explicit instruction.
- Keep the design system and page structure unchanged when editing `index.html` or `blog.html`.
- Refresh `company-website.zip` after any HTML/CSS/JS change (see §9 of the project rules).
- Never delete `preview-*.png`; never add frameworks, analytics, cookies or a build step.
- Stop and ask if a change would alter the company's factual claims.
