# Agent Rules — company-website

Project-specific rules for agents editing this site. Read before making changes.

## 1. What this project is

Static marketing site for **Harbourline E&M Engineering Limited** (港匯機電工程有限公司), a fictional Hong Kong E&M / cable-trunking contractor. No build tooling, no framework, no backend. Everything ships as plain HTML, CSS and vanilla JS.

| Path | Role |
| --- | --- |
| `index.html` | Single-page company site (8 sections) |
| `blog.html` | Insights page: 6 article summaries + 9-question FAQ |
| `assets/css/style.css` | All styling, design tokens and responsive rules |
| `assets/js/main.js` | All behaviour, one IIFE, strict mode |
| `assets/images/` | Generated imagery (JPEG) |
| `company-website.zip` | Deliverable archive, must stay in sync |
| `preview-*.png` | Verification screenshots — **do not delete** |

## 2. Page structure

Sections on `index.html` use these IDs and are linked from the nav:
`home`, `profile`, `submissions`, `cable`, `floor`, `projects`, `certification`, `contact`.

Nav order: Profile, Submissions, Cable Trunking, Floor Trunking, Projects, ISO, Blog, Contact, then the "Enquire now" CTA.

- On `index.html`, nav hrefs are in-page anchors (`#profile`).
- On `blog.html`, nav hrefs point back (`index.html#profile`); `blog.html` gets `is-active` and `aria-current="page"`.
- Every page repeats the same topbar, header, footer and back-to-top button. Copy them from the existing page rather than inventing variants.

## 3. Design system

Use the existing tokens in `:root`. Never hard-code new colours.

- Navy `--navy-900: #07111f` (dark sections, header, footer)
- Accent amber `#f2a541` (`--accent`), deeper text amber `--accent-deep`
- Display font `--font-display` (Archivo), body `--font-body` (Inter), Chinese `--font-zh` (Noto Sans TC)
- Headings: uppercase, tight tracking, `text-wrap: balance`
- Chinese sub-labels use `<p class="section-zh" lang="zh-Hant">`

Reusable classes: `.container`, `.section`, `.section--dark`, `.section--paper`, `.section-head`, `.eyebrow`, `.btn` / `.btn-accent` / `.btn-ghost`, `.reveal`, `.chip`, `.post-card`, `.faq-item`, `.cta-band`.

Responsive breakpoints in use: 1100, 980 (mobile nav), 900, 760, 520. Do not add new breakpoints without reason.

## 4. JavaScript rules

`assets/js/main.js` runs on every page, so every optional feature must be null-safe.

- Wrap page-specific behaviour in an existence check (`if (form && formNote) { ... }`).
- New blocks that touch a missing element must be guarded the same way.
- Keep the IIFE + `'use strict'` structure; no frameworks, no bundler.
- Reveal animations rely on `document.documentElement.classList.add('js')` in each page `<head>` before CSS loads.

## 5. SEO policy

**Primary keyword: `E&M contractor Hong Kong`.**

Secondary terms: `cable trunking Hong Kong`, `floor trunking Hong Kong`, `material submission`, `ISO 9001 / 14001 / 45001 contractor`, `electrical installation Hong Kong`.

Rules:
- One primary keyword per page; do not repeat the same title/H1 across pages.
- Required placements per page: `<title>`, meta description, `og:title`, `og:description`, one H1, at least one H2 or lead paragraph, image alt text where natural.
- Use "E&M contractor in Hong Kong" as the natural in-sentence variant. Exact-match phrasing belongs in metadata and headings, not stuffed into prose.
- Keep title ≤ 60 characters and description ≤ 160 where practical.
- Structured data: `GeneralContractor` on the home page, `FAQPage` on the blog page. FAQ JSON-LD must match the visible answers word for word.

## 6. Content rules

- British English spelling and terminology (programme, metre, galvanised, aluminium).
- Hong Kong context: EMSD, R.E.C., BS EN standards, Kowloon, Kwun Tong, MTR, HA projects.
- Tone: technical, specific, understated. Prefer concrete numbers over adjectives.
- No fake client names, no unverifiable certifications beyond the ISO 9001 / 14001 / 45001 already stated.
- Do not invent contact details: use `+852 2899 6800` and `enquiries@harbourline-em.com.hk`.

## 7. Accessibility

- Keep the skip link, visible focus states and `aria-expanded` / `aria-controls` on the nav toggle.
- FAQ uses native `<details>` / `<summary>` — do not replace with scripted accordions.
- Images need meaningful `alt` text; decorative images use `alt=""` plus `aria-hidden`.
- Respect `prefers-reduced-motion` (already handled in CSS and JS).

## 8. Preview and verification

The site is served locally at `http://localhost:8080/` by a PowerShell `HttpListener` script in `%TEMP%` (`harbourline-serve.ps1`). Restart it if the connection is refused.

Verify visual changes with the CDP scripts in `%TEMP%` (`hl-cdp-desktop.ps1`, `hl-cdp-mobile.ps1`, `hl-cdp-blog.ps1`, `hl-cdp-blog-m.ps1`) — they drive headless Chrome, set real device metrics, run checks and write `preview-*.png`.

Check at minimum:
- 1440×1000 desktop and 390×844 mobile.
- `innerWidth === scrollWidth` (no horizontal overflow).
- Nav, project filter, FAQ accordion and enquiry form still work.

## 9. Packaging rule

After any edit to `index.html`, `blog.html`, `assets/css/style.css` or `assets/js/main.js`, refresh the ZIP:

```powershell
Add-Type -AssemblyName System.IO.Compression.FileSystem
$z = [IO.Compression.ZipFile]::Open($zip, 'Update')
$e = $z.GetEntry('blog.html'); if ($e) { $e.Delete() }
[IO.Compression.ZipFileExtensions]::CreateEntryFromFile($z, $src, 'blog.html') | Out-Null
$z.Dispose()
```

- Entry names inside the archive use backslashes (`assets\css\style.css`, `assets\js\main.js`). A forward-slash path creates a duplicate entry — always check `GetEntry` first.
- Expected archive contents: 14 entries (2 HTML, 2 assets, 10 images). Verify the count after every update.
- Never include `preview-*.png`, `.screenshots`, `.trae-html-share-packages` or the ZIP itself in the archive.

## 10. Do not

- Do not add frameworks, CDNs, analytics, cookies or a build step.
- Do not delete or rename `preview-*.png` files; they were explicitly kept.
- Do not re-run destructive shell deletes on `assets/images` — earlier clean-ups were rejected.
- Do not claim the enquiry form sends email; it is client-side validation only.
