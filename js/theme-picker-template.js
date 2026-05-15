/**
 * theme-picker-template.js
 *
 * Pure function: receives the translations object, returns an HTML string.
 * Keeping the template separate means we can swap languages or layouts
 * without touching component logic.
 */
export const template = (t) => `
    <div class="theme-switcher" role="group" aria-label="${t.label}">
        <span class="visually-hidden">${t.label}</span>

        ${t.themes.map(({ value, label }) => `
            <button
                class="theme-btn"
                type="button"
                data-theme="${value}"
                data-label="${label}"
                aria-label="${label} ${t.themeSuffix}"
                aria-pressed="false"
            ></button>
        `).join('')}
    </div>
`;