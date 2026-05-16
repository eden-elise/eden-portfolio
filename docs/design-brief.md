# Eden Tripp — Portfolio Design Brief
**v2.0 · May 2026 · Personal portfolio + coding demo**

---

## Primary Goals

- Expressive of my personality
- Professional credibility but not too serious
- Clear navigation
- Showcase coding skills(class)
- Practice good craft(future)

---

## Non-Goals

- Not trying to be a massive, hard-to-navigate portfolio
- Not overly cute or whimsical at the cost of professionalism
- Not dependent on CSS/JS frameworks or libraries
- No single-dump commit history

---

## Site Map

| Route | Page | Notes |
|---|---|---|
| `/pages/home.html` | Home | Name, interests, time-based greeting. First impression in 10 seconds. |
| `/pages/about.html` | About | Personal intro, interests, life beyond the code, PDF résumé link. |
| `/pages/resume.html` | Résumé | Full résumé as a real HTML page — semantic structure throughout. Optional PDF download. |
| `/pages/projects.html` | Projects | Project cards including the live GitHub Activity widget demo. |
| `/pages/contact.html` | Contact | Working form via Formspree. HTML5 native validation. Works without JS. |
| `/pages/building_pc.html` | Building My PC | Ongoing build log — entries added as the build progresses. |

---

## Signature Features

### Theme Switcher
- Four themes: Rose Garden, Forest Floor, Coastal Fog, Desert Dawn
- Implemented as a `<theme-picker>` custom element with shadow DOM
- Split into four modules: component logic, styles, template, i18n strings
- CSS custom properties and `data-theme` attribute on `<html>`
- Persists to `localStorage`; falls back to Rose Garden defaults without JS
- Swatch buttons with tooltips, `aria-pressed` state, `aria-label` for screen readers

### GitHub Activity Widget
- `<github-card>` custom element on the Projects page
- Fetches from the GitHub REST API — no API key, nothing sensitive in client code
- `Promise.all` for parallel profile + repos requests
- Loading state, error state, and success state all handled
- API data inserted via `textContent` and DOM methods — never `innerHTML`
- CSS custom properties inherit through the shadow boundary — all four themes restyle it automatically
- **Required web app demo — 20% of grade**

### Time-Based Greeting
- Home page `<h2>` updates to "Good morning / afternoon / evening" via `home.js`
- Falls back to "Hello!" without JS — textbook progressive enhancement
- Loaded as `type="module"` so it defers automatically without needing placement tricks

---

## Technical Constraints

| Concern | Requirement |
|---|---|
| Layer order | Semantic HTML first → CSS enhancement → JS last. Every page useful with JS disabled. |
| CSS | Hand-authored only. Custom properties for all design tokens. Flexbox + grid for layout. `clamp()` for fluid sizing. No Bootstrap, no Tailwind. |
| JavaScript | Vanilla only. No React, Vue, or Svelte. Web Components (custom elements) for the theme picker and GitHub widget. |
| Deployment | GitHub Pages. Public repo with sensible commit history. |
| Contact form | Delivers messages via Formspree. HTML5 native validation as first line of defence. Works without JS. |
| Root redirect | `index.html` at repo root uses `<meta http-equiv="refresh">` to forward to `frame/home.html` — required by Cloudflare Pages which expects an entry point at the root |
---

## CSS Architecture

```
tokens.css        ← all design values live here
reset.css         ← browser normalisation
layout.css        ← page shell, header, nav, main, footer
components.css    ← reusable patterns (links, skip link, headings)
pages/*.css       ← page-specific overrides
themes/*.css      ← token overrides per theme
theme-switcher.css ← positioning for the widget
main.css          ← imports everything in the correct cascade order
```

All values reference tokens. No hardcoded colours, spacing, or font sizes outside `tokens.css` and the theme files.

---

## Coding Craft Standards

### Defensive JavaScript
- Always check DOM elements exist before using them (`if (greeting)`)
- Wrap all `fetch` calls in `try/catch`
- Validate API responses (`if (!res.ok) throw new Error(...)`) before rendering
- Provide fallback content if the API is unavailable

### Security
- API data inserted via `textContent` or DOM methods — never `innerHTML`
- No API keys in client-side code
- `rel="noopener noreferrer"` on all external links

### Consistency
- kebab-case class names throughout
- CSS custom properties for all repeated values
- 4-space indentation in HTML, consistent formatting in JS and CSS

---

## Accessibility Checklist

- [x] Skip-to-main-content link on every page
- [x] `aria-current="page"` on active nav link
- [x] `aria-labelledby` on major sections
- [x] `aria-live` on GitHub widget loading/error states
- [x] Logical heading order — no skipped levels
- [x] All images have `alt` text
- [x] All form inputs have associated `<label>` elements
- [x] Keyboard navigable throughout
- [x] Native HTML5 form validation before JS intervenes

---

## Progressive Enhancement Verification

Open any page, disable JavaScript in DevTools, and reload. You should see:

- All content readable and navigable
- Navigation working
- Contact form submittable (Formspree handles it server-side)
- Rose Garden theme applied via `tokens.css` defaults
- Home page greeting reads "Hello!" (JS fallback)
- Projects page shows static project descriptions; GitHub widget area is empty but the footer link to GitHub remains

---

## Success Criteria

A visitor lands on the home page and within 10 seconds knows:
- my name
- basic info about me
- how to reach me

Additionally:
- The site is fully usable with JavaScript disabled for progressive enhancement
- Navigation is clear and consistent on every page
- The GitHub widget loads real data, handles errors gracefully, and shows a loading state
- The theme switcher persists between visits
- The contact form delivers messages and validates without JS