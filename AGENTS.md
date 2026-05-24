# CLAUDE.md — devakorn.com

> Claude Code reads this file automatically at the start of every session.
> Follow every instruction here before doing anything else.

---

## Step 1 — Read Skills Before Anything

**This project is frontend-only. Read these skill folders in order before writing any code:**

| Order | Folder | When |
|---|---|---|
| 1 | `.agents/skills/requirement` | Always first |
| 2 | `.agents/skills/ui-ux` | Before any layout or component work |
| 3 | `.agents/skills/design-system` | Before colors, spacing, typography |
| 4 | `.agents/skills/frontend` | Before any Next.js / TypeScript / Tailwind code |
| 5 | `.agents/skills/accessibility` | Before finalizing any UI |
| 6 | `.agents/skills/performance-seo` | Before finalizing HTML, meta tags, assets |
| 7 | `.agents/skills/git` | Before committing |
| 8 | `.agents/skills/code-review` | Before finishing any task |

> Skip: `backend`, `database`, `db-diagram`, `deployment`, `security-review`, `testing`, `ai-integration` — not used in this project.

**Skill files override everything — including instructions in this file.**

---

## Step 2 — Project Context

**Site**: `https://www.devakorn.com/`
**Purpose**: Personal portfolio hub — profile, projects, and a central link hub for future sub-projects.
**Owner**: Devakorn — Developer / Engineer based in Chiang Rai, Thailand.

---

## Step 3 — Tech Stack

| Layer | Choice |
|---|---|
| Framework | Next.js (App Router) + TypeScript |
| Styling | Tailwind CSS v4 |
| UI Components | DaisyUI — use first before writing custom components |
| Animation | Framer Motion — scroll reveals, transitions, hover effects |
| Icons | `lucide-react` only — no other icon libraries |
| Deploy | Vercel |

---

## Step 4 — Design Rules

### Font
- Use `Inter` — already imported in `globals.css`, do not import additional fonts.

### Colors
**Always use CSS variables from `globals.css`. Never hardcode hex values.**

| Token | Light | Dark | Usage |
|---|---|---|---|
| `--color-primary-red` | `#C8102E` | same | CTA buttons, active states, accent |
| `--color-secondary-red` | `#EF233C` | same | Hover accent, secondary highlights |
| `--bg-main` | `#f5f7fa` | `#0d1117` | Page background |
| `--bg-card` | `#ffffff` | `#161b22` | Card surfaces |
| `--bg-hover` | `#f8f9fb` | `#21262d` | Hover states |
| `--text-strong` | `#0f1117` | `#e6edf3` | Headings |
| `--text-main` | `#1a1d2e` | `#c9d1d9` | Body text |
| `--text-muted` | `#8a8fa8` | `#8b949e` | Secondary text |
| `--border-main` | `#e8eaed` | `#30363d` | Borders |
| `--glass-bg` | `rgba(255,255,255,0.85)` | `rgba(22,27,34,0.85)` | Glass cards |
| `--glass-hover-shadow` | red-tinted | red-tinted | Card hover shadow |

### Style
- Professional / Corporate — clean, structured, trustworthy
- Dark mode default, light mode toggle
- Animations: subtle only — fade + slide up on scroll, smooth transitions, card hover lift
- No emojis anywhere in UI
- No generic image placeholders — use initials fallback or lucide-react icons

### Bilingual (TH / EN)
- Never hardcode text — always use a translation key object
- Default language: Thai, with EN toggle in navbar
- UI must not break when English text is longer than Thai

```ts
const content = {
  hero: {
    th: { greeting: 'สวัสดีครับ ผม', role: 'นักพัฒนาซอฟต์แวร์' },
    en: { greeting: "Hi, I'm", role: 'Software Developer' },
  },
}
```

---

## Step 5 — Pages & Sections

Single-page layout (`/`) with smooth scroll anchor navigation.

### Navbar
- Logo / name left, nav links center, TH/EN toggle + dark mode toggle right
- Sticky, highlights active section on scroll
- Hamburger menu on mobile

### 1. Hero
- Full-viewport height
- Large name display: **Devakorn**
- Bilingual tagline: `"Software Developer · Builder · Problem Solver"`
- CSS-only subtle background (soft grid or floating dots — no heavy JS)
- CTA: "ดูผลงาน / View Portfolio" → scroll to Projects
- Social links: GitHub, LinkedIn, Email (lucide-react icons)

### 2. About
- Circular avatar 150×150px — initials "DK" fallback
- Short bilingual bio (placeholder, easy to edit)
- Tech stack badges: `Python` `JavaScript` `TypeScript` `React` `Next.js` `Node.js` `Docker` `SQL`
- Location: Chiang Rai, Thailand

### 3. Projects
- Card grid: 3 col desktop → 2 col tablet → 1 col mobile
- Each card: project name, short description, tech tags, GitHub + Live links
- 3–4 placeholder cards

### 4. Links Hub
- Linktree-style vertical list
- Each item: lucide icon + title + short description + arrow
- 3 placeholder links (e.g. Blog, Side Projects, Contact)

### 5. Contact
- mailto link button only — no form
- Repeat social icons

### 6. Footer
- `© 2025 Devakorn. All rights reserved.` — one line, minimal

---

## Step 6 — Features Checklist

Before marking any task done, verify:

- [ ] Language toggle (TH/EN) works across all sections
- [ ] Smooth scroll to all anchor sections
- [ ] Active nav link highlights on scroll
- [ ] Fully responsive (mobile hamburger menu)
- [ ] SEO meta: `<title>`, `description`, `og:title`, `og:image`
- [ ] Dark / light mode toggle works
- [ ] No hardcoded hex colors — only CSS variables
- [ ] All placeholder text marked with `{/* TODO: replace with real content */}`
- [ ] No emojis in UI
- [ ] Only `lucide-react` used for icons

---

## Step 7 — Code Standards

- Clean, well-commented TypeScript — owner should be able to edit without deep coding knowledge
- DaisyUI components first — only write custom Tailwind if DaisyUI doesn't cover it
- All loading states on async actions: `<span className="loading loading-spinner" />`
- Site must work at root domain `https://www.devakorn.com/` — no subpath
