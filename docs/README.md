# Eden Tripp — Personal Portfolio

A personal portfolio site built with plain HTML, CSS, and vanilla JavaScript. No frameworks, no build step, no dependencies.

🔗 **Live site:** [eden-elise.github.io/portfolio](https://eden-elise.github.io/portfolio)  
📁 **Repository:** [github.com/eden-elise/portfolio](https://github.com/eden-elise/portfolio)

---

## Stack

| Concern | Choice | Why |
|---|---|---|
| Markup | Semantic HTML5 | Hand-authored, validates at W3C |
| Styling | Vanilla CSS | Custom properties, flexbox, grid, `clamp()` — no frameworks |
| Behavior | Vanilla JavaScript | Progressive enhancement — site works without it |
| Contact form | [Formspree](https://formspree.io) | Free tier, no server needed, works without JS |
| Deployment | GitHub Pages | Simple static hosting from the `main` branch |

---

## Running Locally

No build step required. Clone the repo and open `index.html` directly in your browser:

```bash
git clone https://github.com/eden-elise/portfolio.git
cd portfolio
open index.html
```

Or serve it with any local static server if you want accurate relative paths:

```bash
# Python (built into macOS/Linux)
python3 -m http.server 8080

# Node (if you have npx available)
npx serve .
```

Then visit `http://localhost:8080` in your browser.

---

## Project Structure

```
portfolio/
├── index.html          # Home / About
├── resume.html         # Résumé (HTML page, not just a PDF)
├── projects.html       # Projects + weather widget demo
├── contact.html        # Contact form
├── css/
│   ├── tokens.css      # Design tokens (colors, spacing, type)
│   ├── main.css        # Global styles and layout
│   └── themes.css      # Light / dark theme overrides
├── js/
│   ├── theme.js        # Theme switcher + localStorage persistence
│   ├── weather.js      # Weather widget custom element
│   └── flower.js       # Interactive flower bloom
├── assets/
│   └── ...             # Images and SVGs
├── DESIGN_BRIEF.md     # Design decisions and goals
└── README.md
```

---

## Pages

- **`/`** — Home and about: name, school, degree, interests, quick intro
- **`/resume.html`** — Full résumé as a real HTML page with a PDF download option
- **`/projects.html`** — Project listing including the weather widget demo
- **`/contact.html`** — Working contact form (submits via Formspree)

---

## Application Demonstration

**What it does:** A `<weather-card>` custom element on the Projects page fetches current weather conditions for a given city and displays temperature, conditions, and location name.

**API:** [Open-Meteo](https://open-meteo.com/) — free, open-source, no API key required. The widget uses the geocoding endpoint to resolve a city name to coordinates, then fetches current weather from the forecast endpoint.

**What it demonstrates:**
- Custom element (`customElements.define`)
- `fetch` with `async/await`
- JSON parsing and error handling
- Loading, success, and error states
- No API key — nothing sensitive in the client-side code

**Progressive enhancement:** The Projects page displays static project descriptions without JavaScript. The weather widget is an additive enhancement — if the fetch fails or JS is disabled, the rest of the page is unaffected.

---

## Features

### Theme Switcher
Toggles between light and dark themes using a `data-theme` attribute on the `<html>` element. The chosen theme is saved to `localStorage` and restored on the next visit. An inline `<script>` in `<head>` applies the saved theme before first paint to prevent a flash of the wrong theme. Without JavaScript, the site respects the visitor's `prefers-color-scheme` media query.

### Interactive Flower Bloom
An SVG flower on the home page blooms on click or hover using CSS animations triggered by JavaScript. It is purely decorative — marked `aria-hidden="true"` so screen readers skip it, and it has no effect on any page content.

---

## Accessibility

- Keyboard navigable throughout
- Skip-to-content link on every page
- WCAG AA color contrast on all text and UI elements
- Logical heading order on every page (no skipped levels)
- `aria-live` region on the weather widget for screen reader announcements
- All images have descriptive `alt` text
- All form inputs have associated `<label>` elements
- HTML validated at [validator.w3.org](https://validator.w3.org)

---

## Progressive Enhancement

Every page is fully readable and navigable with JavaScript disabled. JavaScript adds:

- Theme switching and persistence
- The weather widget
- The flower bloom animation

To verify: open any page in your browser, disable JavaScript in DevTools, and reload.

---

## License

MIT — feel free to use this as a reference or starting point.