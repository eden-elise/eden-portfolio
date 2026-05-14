# Eden Tripp — Portfolio Design Brief
**v1.0 · May 2026 · Personal portfolio + coding demo**

---

## Primary Goals

Establish a professional online presence that communicates who Eden is quickly and credibly — for recruiters, classmates, and collaborators — while also being a genuine demonstration of clean, modern web development craft.

- Professional credibility
- Clear navigation
- Showcase coding skills
- Practice good craft

---

## Non-Goals

- Not trying to be a massive, hard-to-navigate portfolio
- Not overly cute or whimsical at the cost of professionalism
- Not dependent on CSS/JS frameworks or libraries
- No single-dump commit history

---

## Site Map

| Route | Page | Status | Notes |
|---|---|---|---|
| `/` | Home / About | Required | Name, photo, brief intro. School, degree, interests. First impression in 10 seconds. |
| `/resume` | Résumé | Required | Full résumé as a real HTML page — not just a PDF link. Semantic structure: education, experience, skills as proper lists. Optional PDF download as enhancement. |
| `/projects` | Projects | Required | Lists projects. Must include the weather widget demo component. Each entry: title, description, tech stack, link. |
| `/contact` | Contact | Required | Working contact form via Formspree (free). HTML5 native validation first. Works without JS. |

---

## Signature Features

### Interactive Flower Bloom
- SVG flower(s) that bloom on click or hover
- Built with vanilla JS + CSS animations
- Progressive enhancement only — decorative, no core content behind it
- `aria-hidden="true"` and `role="presentation"` on the SVG — screen readers skip it entirely
- Trigger on both `click` and `keydown` if placed on a focusable element
- **Extra credit candidate**

### Theme Switcher
- Light / dark at minimum (optional: sepia or a third theme)
- CSS custom properties and `data-theme` attribute on the `<html>` element
- Persists to `localStorage`
- Falls back gracefully to `prefers-color-scheme` without JS
- Inline `<script>` in `<head>` (not deferred) reads localStorage and sets the attribute before paint — prevents flash of wrong theme
- **Extra credit candidate**

### Weather Widget
- Custom element `<weather-card>` that fetches from Open-Meteo (free, no API key needed — no secrets to accidentally commit)
- Shows temperature, weather conditions, city name
- Handles loading state, empty state, and errors gracefully
- Core of the required web app demo component
- **Required demo — 20% of grade**

### Accessibility-First
- Keyboard navigable throughout
- WCAG AA color contrast on all text
- Proper heading order (h1 → h2 → h3, no skipping)
- Skip-to-content link at the top of every page
- `aria-live` regions for dynamic content (weather widget updates)
- Every image has meaningful `alt` text
- Every form input has an associated `<label>`
- **10% of grade**

---

## Technical Constraints

| Concern | Requirement |
|---|---|
| Layer order | Semantic HTML first → CSS enhancement → JS last. Every page must be useful with JS disabled. |
| CSS | Hand-authored only. Custom properties for all design tokens. Flexbox + grid for layout. `clamp()` for fluid sizing. No Bootstrap, no Tailwind. |
| JavaScript | Vanilla only. No React, Vue, or Svelte. Web Components (custom elements) preferred for the weather widget. |
| Tooling | Hand-written HTML or Astro / 11ty SSG. No app framework scaffolds. |
| Deployment | Cloudflare Pages (preferred) or GitHub Pages. Public GitHub repo. Sensible commit history. |
| Contact form | Must actually deliver messages. Formspree free tier recommended. Works without JS — native HTML5 validation as the first line of defense. |

---

## Coding Craft Standards

### Defensive JavaScript
- Always check that DOM elements exist before using them
- Wrap all `fetch` calls in `try/catch`
- Validate API responses before attempting to render them
- Provide fallback content if the API is unavailable

### Security
- Never use `innerHTML` with user-supplied or API-supplied data — use `textContent` or DOM methods instead
- No API secrets or keys in client-side JavaScript
- Sanitize any dynamic output before inserting into the DOM

### Consistency
- One CSS naming convention throughout — pick BEM or kebab-case and stick to it
- Consistent indentation (2 spaces recommended)
- CSS custom properties for all repeated values: colors, spacing, border-radii, font sizes

### Validation
- HTML validates at [validator.w3.org](https://validator.w3.org)
- No stray `<div>` elements where semantic elements belong
- Headings in logical order — never skip a level

---

## Success Criteria

A visitor lands on the home page and within 10 seconds knows:
- Your name
- What you study and where
- How to reach you

Additionally:
- The site is fully usable with JavaScript disabled
- Navigation is clear and consistent on every page
- The weather widget loads real data, handles errors gracefully, and shows a loading state
- The flower blooms on click/hover interaction
- The theme switcher persists the chosen theme between visits
- The contact form delivers messages and validates without JS