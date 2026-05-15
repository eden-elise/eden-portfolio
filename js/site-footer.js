/**
 * <site-footer>
 *
 * A custom element that renders a consistent footer across every page.
 * The copyright year is generated at runtime so it never goes stale.
 *
 * Usage:
 *   <site-footer></site-footer>
 *
 * Replace the static <footer> on every page with this element.
 * The surrounding <footer> tag is no longer needed — this component
 * renders it internally.
 */
class SiteFooter extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: 'open' });
    }

    connectedCallback() {
        this._render();
    }

    _render() {
        // Generate the year at runtime — never needs manual updating
        const year = new Date().getFullYear();

        this.shadowRoot.innerHTML = `
            <style>
                :host {
                    display: block;
                }

                footer {
                    background-color: var(--color-footer-bg);
                    color: var(--color-footer-text);
                    text-align: center;
                    padding: var(--spacing-md) var(--spacing-lg);
                    font-size: var(--font-size-sm);
                    margin-top: auto;
                }

                p {
                    margin: 0;
                    line-height: var(--line-height-base);
                    color: var(--color-footer-text);
                }

                .separator {
                    opacity: 0.6;
                    margin: 0 0.4em;
                }
            </style>

            <footer>
                <p>
                    <span>&copy; <time datetime="${year}">${year}</time> Eden Tripp</span>
                    <span class="separator" aria-hidden="true">&middot;</span>
                    <span>CS &amp; Mathematics, University of San Diego</span>
                </p>
            </footer>`;
    }
}

customElements.define('site-footer', SiteFooter);