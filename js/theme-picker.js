/**
 * theme-picker.js
 *
 * A Web Component (<theme-picker>) that lets visitors switch between
 * the four portfolio themes.  Mirrors the structure of the instructor's
 * example: shadow DOM, separate style/template/i18n modules, custom events,
 * and localStorage persistence.
 *
 * Usage in HTML:
 *   <script type="module" src="js/theme-picker.js"></script>
 *   <theme-picker></theme-picker>
 *
 * Progressive enhancement:
 *   Without JS the site still renders using the Rose Garden defaults
 *   declared in tokens.css, so the page is never broken.
 *
 * Custom events dispatched (bubble + composed so they cross shadow boundaries):
 *   'theme-changed'  — detail: { theme, previousTheme, source }
 *   'debug-log'      — detail: { source, type, message, data }
 */

import { styles }       from './theme-picker-styles.js';
import { template }     from './theme-picker-template.js';
import { translations } from './theme-picker-i18n.js';

const STORAGE_KEY   = 'eden-portfolio-theme';
const DEFAULT_THEME = 'rose-garden';

class ThemePicker extends HTMLElement {
    // -----------------------------------------------------------------
    // Observed attributes — re-render when the host page changes 'lang'
    // -----------------------------------------------------------------
    static get observedAttributes() {
        return ['lang'];
    }

    constructor() {
        super();
        // Open shadow root: styles are scoped, markup is encapsulated
        this.attachShadow({ mode: 'open' });

        // Track system dark-mode preference
        this._darkQuery = window.matchMedia('(prefers-color-scheme: dark)');
        this._handleSystemChange = this._onSystemPreferenceChange.bind(this);
    }

    // -----------------------------------------------------------------
    // Public getters
    // -----------------------------------------------------------------

    /** Current language: checks the element itself, then ancestors, then <html> */
    get lang() {
        return (
            this.getAttribute('lang') ||
            this.closest('[lang]')?.getAttribute('lang') ||
            document.documentElement.lang ||
            'en'
        );
    }

    /** Resolved translation bundle */
    get translations() {
        return translations[this.lang] ?? translations.en;
    }

    /**
     * Current active theme.
     * Priority: localStorage → system preference → hard default.
     */
    get currentTheme() {
        try {
            const stored = localStorage.getItem(STORAGE_KEY);
            if (stored) return stored;
        } catch {
            /* localStorage blocked (e.g. private browsing with strict settings) */
        }
        return this._darkQuery.matches ? 'dark' : DEFAULT_THEME;
    }

    // -----------------------------------------------------------------
    // Lifecycle callbacks
    // -----------------------------------------------------------------

    connectedCallback() {
        // Apply the stored/default theme before anything renders
        this._applyTheme(this.currentTheme, 'init');

        this._render();

        // Watch for system dark-mode changes
        this._darkQuery.addEventListener('change', this._handleSystemChange);

        // Watch for lang attribute changes anywhere on the page
        // (the instructor's lang-picker mutates document.documentElement)
        this._langObserver = new MutationObserver(() => this._render());
        this._langObserver.observe(document.documentElement, {
            attributes: true,
            attributeFilter: ['lang']
        });

        this._logDebug('connected', 'ThemePicker connected', {
            theme: this.currentTheme,
            lang: this.lang
        });
    }

    disconnectedCallback() {
        this._darkQuery.removeEventListener('change', this._handleSystemChange);
        this._langObserver?.disconnect();
        this._logDebug('disconnected', 'ThemePicker removed from DOM');
    }

    attributeChangedCallback(name, oldValue, newValue) {
        // Re-render when the lang attribute on *this element* changes
        if (name === 'lang' && oldValue !== newValue) {
            this._render();
        }
    }

    // -----------------------------------------------------------------
    // Private methods
    // -----------------------------------------------------------------

    /** Build (or rebuild) the shadow DOM */
    _render() {
        this.shadowRoot.innerHTML = `
            <style>${styles}</style>
            ${template(this.translations)}
        `;

        // Mark the active button
        this._updateButtons(this.currentTheme);

        // Wire up click handlers
        this.shadowRoot.querySelectorAll('.theme-btn').forEach(btn => {
            btn.addEventListener('click', () => {
                this._handleClick(btn.dataset.theme);
            });
        });

        this._logDebug('render', 'Shadow DOM rendered', { lang: this.lang });
    }

    /** Called when a swatch button is clicked */
    _handleClick(newTheme) {
        const previousTheme = this.currentTheme;
        this._applyTheme(newTheme, 'user-click');

        // ---- Custom event (bubbles through shadow boundary) ----
        this.dispatchEvent(new CustomEvent('theme-changed', {
            detail: { theme: newTheme, previousTheme, source: 'user-click' },
            bubbles: true,
            composed: true   // crosses shadow DOM boundary
        }));

        this._logDebug('theme-change', 'User selected theme', {
            from: previousTheme,
            to: newTheme
        });
    }

    /**
     * Apply a theme:
     *  1. Write data-theme to <html> (CSS reacts automatically)
     *  2. Persist to localStorage
     *  3. Sync button pressed states
     */
    _applyTheme(theme, source) {
        document.documentElement.setAttribute('data-theme', theme);

        if (source !== 'init') {
            try {
                localStorage.setItem(STORAGE_KEY, theme);
            } catch {
                /* Silently ignore if storage is unavailable */
            }
        }

        this._updateButtons(theme);
    }

    /** Sync aria-pressed on every swatch button */
    _updateButtons(activeTheme) {
        this.shadowRoot?.querySelectorAll('.theme-btn').forEach(btn => {
            const isActive = btn.dataset.theme === activeTheme;
            btn.setAttribute('aria-pressed', String(isActive));
        });
    }

    /** React to OS dark/light toggle — only if the user hasn't set a preference */
    _onSystemPreferenceChange(e) {
        try {
            if (localStorage.getItem(STORAGE_KEY)) return; // user already chose
        } catch { /* ignore */ }

        const systemTheme = e.matches ? 'dark' : DEFAULT_THEME;
        this._applyTheme(systemTheme, 'system');

        this._logDebug('system-change', 'OS color scheme changed', {
            isDark: e.matches,
            appliedTheme: systemTheme
        });
    }

    /** Emit a debug-log custom event — the same pattern as the instructor's components */
    _logDebug(type, message, data = null) {
        this.dispatchEvent(new CustomEvent('debug-log', {
            bubbles: true,
            composed: true,
            detail: { source: 'theme-picker', type, message, data }
        }));
    }
}

// Register the custom element
customElements.define('theme-picker', ThemePicker);