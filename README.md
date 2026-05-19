Here is your fully updated README with all the changes from this session incorporated. Just copy and paste the whole thing:

```markdown
# Eden Tripp — Personal Portfolio

A personal portfolio site built with plain HTML, CSS, and vanilla JavaScript. No frameworks, no build step, no dependencies.

🔗 **Live site:** [eden-portfolio-3fs.pages.dev](https://eden-portfolio-3fs.pages.dev)  
📁 **Repository:** [github.com/eden-elise/eden-portfolio](https://github.com/eden-elise/eden-portfolio)

---

## Stack

| Concern | Choice | Why |
|---|---|---|
| Markup | Semantic HTML5 | Hand-authored, validates at W3C |
| Styling | Vanilla CSS | Custom properties, flexbox, grid, `clamp()` — no frameworks |
| Behavior | Vanilla JavaScript | Progressive enhancement — site works without it |
| Contact form | [Formspree](https://formspree.io) | Free tier, no server needed, works without JS |
| Deployment | Cloudflare Pages | Fast global CDN, auto-deploys from `main` branch |

---

## Deployment Note

The HTML pages live in a `frame/` subdirectory rather than the repo root. Cloudflare Pages requires an `index.html` at the root to serve as an entry point, so a minimal redirect file lives at the root and forwards visitors to `frame/home.html` using a `<meta http-equiv="refresh">` tag. The redirect uses an absolute path (`/frame/home.html`) to prevent relative path loops.

## Running Locally

No build step required. Clone the repo and open any page directly in your browser:

```bash
git clone https://github.com/eden-elise/eden-portfolio.git
cd eden-portfolio
open frame/home.html
```

Or serve it with any local static server for accurate relative paths:

```bash
# Python (built into macOS/Linux)
python3 -m http.server 8080

# Node (if you have npx available)
npx serve .
```

Then visit `http://localhost:8080/frame/home.html` in your browser.

---

## Project Structure

```
eden-portfolio/
├── index.html              # Root redirect to frame/home.html
├── frame/
│   ├── home.html           # Home page with time-based greeting
│   ├── about.html          # About me
│   ├── resume.html         # Résumé as a real HTML page (+ PDF download)
│   ├── projects.html       # Projects + GitHub Activity widget
│   ├── contact.html        # Working contact form via Formspree
│   └── building_pc.html    # PC build log (in progress)
├── css/
│   ├── main.css            # Entry point — imports everything in order
│   ├── reset.css           # Cross-browser normalisation
│   ├── tokens.css          # Design tokens (colors, spacing, typography)
│   ├── layout.css          # Page shell, header, nav, main, footer
│   ├── components.css      # Reusable UI patterns (links, skip link, etc.)
│   ├── theme-switcher.css  # Positioning for the theme-picker widget
│   ├── pages/
│   │   ├── home.css        # Home page two-column layout
│   │   ├── resume.css      # Résumé cards, masthead, skills pills
│   │   ├── projects.css    # Project card grid
│   │   └── contacts.css    # Contact two-column layout and form styles
│   └── themes/
│       ├── rose-garden.css  # Default theme — soft pinks and purples
│       ├── forest-floor.css # Earthy greens and browns
│       ├── coastal-fog.css  # Cool blues and greys
│       └── desert-dawn.css  # Warm terracotta and sand
├── js/
│   ├── theme-picker.js          # ThemePicker custom element
│   ├── theme-picker-styles.js   # Scoped styles for the widget
│   ├── theme-picker-template.js # HTML template for the widget
│   ├── theme-picker-i18n.js     # Translation strings
│   ├── github-card.js           # GitHubCard custom element (API demo)
│   ├── site-footer.js           # SiteFooter custom element
│   ├── bloom-flower.js          # BloomFlower custom element (decorative header animation)
│   └── home.js                  # Time-based greeting enhancement
└── assets/
    ├── images/             # Photos and graphics
    └── resume/             # Downloadable PDF résumé and research pr0ject
```

---

## Pages

- **`/frame/home.html`** — Landing page with a time-aware greeting and a summary of interests
- **`/frame/about.html`** — Personal introduction, interests, and life beyond the code
- **`/frame/resume.html`** — Full résumé as a real HTML page with semantic structure; PDF download available
- **`/frame/projects.html`** — Project cards including the live GitHub Activity widget
- **`/frame/contact.html`** — Working contact form (submits via Formspree) plus direct contact links
- **`/frame/building_pc.html`** — Ongoing PC build log (entries added as the build progresses)

---

## Application Demonstration

**What it does:** A `<github-card>` custom element on the Projects page fetches live data from the GitHub API and displays the profile name, bio, follower count, public repo count, and the three most recently updated non-fork repositories with their language and star count.

**API:** [GitHub REST API](https://docs.github.com/en/rest) — public endpoints, no API key required. Two requests are made in parallel using `Promise.all`:
- `https://api.github.com/users/eden-elise` — profile data
- `https://api.github.com/users/eden-elise/repos?sort=updated` — repository list

**What it demonstrates:**
- Four coordinated custom elements (`<theme-picker>`, `<github-card>`, `<site-footer>`, `<bloom-flower>`) across all pages
- Custom element lifecycle callbacks (`connectedCallback`, `attributeChangedCallback`, `disconnectedCallback`)
- Shadow DOM encapsulation with CSS custom properties inheriting through the boundary
- `fetch` with `async/await` and `Promise.all` for parallel requests
- JSON parsing and structured error handling
- Loading, success, and error states with appropriate ARIA
- Safe DOM construction — API data via `textContent` and DOM methods, never `innerHTML`

**Progressive enhancement:** The Projects page displays static project descriptions without JavaScript. The GitHub widget is an additive enhancement — if the fetch fails or JS is disabled, the rest of the page is unaffected and a direct GitHub link remains visible in the card footer.

---

## Features

### Theme Switcher
A `<theme-picker>` custom element fixed to the bottom-right corner of every page. Clicking a swatch applies one of four themes by writing a `data-theme` attribute to `<html>`. All theme styles are defined as CSS custom property overrides, so every element on the page responds automatically. The chosen theme is saved to `localStorage` and restored on the next visit. Without JavaScript the site renders using the Rose Garden defaults declared in `tokens.css`.

### Four Themes
| Theme | Vibe |
|---|---|
| Rose Garden | Soft pinks and purples, italic serif headings, gentle shadows |
| Forest Floor | Earthy greens, bark browns, textured background, wavy link underlines |
| Coastal Fog | Cool blues and greys, wide airy spacing, animated fade-up sections |
| Desert Dawn | Warm terracotta, bold Impact headings, geometric borders |

### Bloom Flower
A `<bloom-flower>` custom element that renders a purely decorative CSS flower in the top-left corner of the header on every page. Six petals animate outward sequentially on page load using `@keyframes` and staggered `animation-delay`, followed by the center circle popping in. Petal and center colors reference `--color-text-heading` and `--color-bg-accent` respectively, so the flower automatically recolors whenever the visitor switches themes — no JavaScript required for the color change. The element is marked `aria-hidden="true"` so screen readers ignore it entirely. The animation is suppressed for visitors who have `prefers-reduced-motion` enabled, showing the flower in its final bloomed state instead.

### Time-Based Greeting
The home page `<h2>` reads "Good morning / afternoon / evening" based on the visitor's local time. Without JavaScript it falls back to "Hello!" — a clean example of progressive enhancement.

### Site Footer
A `<site-footer>` custom element that renders a consistent footer across every page. The copyright year is generated at runtime via JavaScript so it never needs manual updating. A `<noscript>` fallback renders a plain `<footer>` for visitors with JavaScript disabled so the page is never left without a footer. Combined with `<theme-picker>`, `<github-card>`, and `<bloom-flower>`, the site uses four coordinated custom elements across all pages — each demonstrating shadow DOM encapsulation, CSS custom property inheritance through the shadow boundary, and the custom elements lifecycle API.

---

## Accessibility

- Keyboard navigable throughout
- Skip-to-main-content link on every page
- Logical heading order on every page — no skipped levels
- `aria-current="page"` on the active navigation link
- `aria-labelledby` connecting section headings to their `<section>` elements
- `aria-live` region on the GitHub widget for screen reader announcements
- All images have descriptive `alt` text
- All form inputs have associated `<label>` elements
- Native HTML5 form validation (`required`, `type="email"`, `minlength`) before any JavaScript
- WCAG AA color contrast on all four themes
- Decorative elements marked `aria-hidden="true"` to avoid screen reader noise
- `prefers-reduced-motion` respected — the bloom flower skips its animation for users who prefer reduced motion

---

## Progressive Enhancement

Every page is fully readable and navigable with JavaScript disabled. JavaScript adds:

- Theme switching and persistence
- The GitHub Activity widget
- The time-based greeting
- The site footer with dynamic copyright year (a `<noscript>` fallback footer is always present)
- The bloom flower header animation

To verify: open any page in your browser, disable JavaScript in DevTools (Settings → Debugger → Disable JavaScript), and reload.

---

## License

MIT — feel free to use this as a reference or starting point.
```