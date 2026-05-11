# AGENTS.md — Portfolio / Resume Website

## Project Overview
Static personal portfolio website for Amiz Azad (Senior Software Engineer). Dark-modern design optimized for ATS parsing, SEO, and accessibility. No build system — plain HTML/CSS/JS deployed to GitHub Pages.

## File Structure
- `index.html` — Single-page portfolio; semantic HTML with `aria-labelledby`, structured data (JSON-LD), Open Graph metadata
- `css/styles.css` — CSS custom properties design system; dark palette; responsive (768px tablet, 480px mobile) + print styles
- `js/script.js` — Vanilla JS: slide-out mobile nav with backdrop, smooth scroll, scrollspy, back-to-top, IntersectionObserver reveal animations
- `images/` — Profile picture, favicon set
- `pdf/` — Downloadable CV and certification PDFs

## Content Sections (in order)
`#about` → `#skills` → `#experience` → `#education` → `#projects` → `#certifications` → `#achievements` → `#volunteer`

## Key Patterns
- **Dual navigation**: Desktop `<nav class="primary-nav">` + mobile `<nav class="mobile-nav">` — keep both in sync when adding sections
- **Skills grid**: 3-column CSS grid of `.skill-category` cards; each has `<h3>` category + `<ul>` items
- **Experience entries**: `.experience-entry` with `.entry-header` (flex: title left, `<time>` right), bullet list, `.tech-tags`
- **Project entries**: `.project-entry` with Problem/Solution/Impact paragraphs + `.tech-tags`
- **Tech tags**: `<div class="tech-tags"><span>Tag</span>...</div>` — mono font, pill style
- **CSS variables**: All colors/spacing/radii in `:root`; change palette by editing custom properties only

## Design System (CSS Custom Properties)
- Background: `--color-bg: #0f1117`, Surface: `--color-surface: #161922`
- Accent: `--color-accent: #60a5fa` (blue)
- Fonts: Inter (sans) + JetBrains Mono (code/tags/dates)
- Spacing scale: `--space-xs` (4px) through `--space-3xl` (64px)
- Max content width: `--max-width: 820px`

## ATS Compatibility Rules
- All content is real text (no image-only information)
- Standard section titles recognized by ATS parsers
- Semantic HTML: `<article>`, `<section>`, `<address>`, `<time>`, `<main>`, `<header>`, `<footer>`
- Schema.org JSON-LD structured data in `<head>`
- No progress bars or visual-only skill indicators

## No Build / Deployment
Open `index.html` in a browser. Deploy by pushing to GitHub Pages branch. No npm, no bundler.

