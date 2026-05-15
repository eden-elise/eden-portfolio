/**
 * theme-picker-styles.js
 *
 * Styles for the ThemePicker custom element.
 * Injected into the shadow root so they're scoped to the component.
 * Uses CSS custom properties from the host document where appropriate,
 * but falls back to concrete values so the widget always renders.
 */
export const styles = `
    :host {
        display: inline-block;
        /* Position is controlled by the host page's CSS,
           but we give a sensible inline default */
    }

    .theme-switcher {
        display: flex;
        align-items: center;
        gap: 0.5rem;
        background-color: var(--color-bg-secondary, #f5ebe6);
        border: 1px solid var(--color-border, #917f88);
        border-radius: 9999px;
        padding: 0.25rem 0.5rem;
        box-shadow: 0 4px 8px rgba(131, 104, 113, 0.15);
        transition:
            box-shadow 0.3s ease,
            background-color 0.3s ease,
            border-color 0.3s ease;
    }

    .theme-switcher:hover {
        box-shadow: 0 10px 25px rgba(131, 104, 113, 0.2);
    }

    /* Visually hidden label — accessible but invisible */
    .visually-hidden {
        position: absolute;
        width: 1px;
        height: 1px;
        overflow: hidden;
        clip: rect(0, 0, 0, 0);
        white-space: nowrap;
    }

    .theme-btn {
        width: 28px;
        height: 28px;
        border-radius: 50%;
        border: 2px solid transparent;
        cursor: pointer;
        transition:
            transform 0.15s ease,
            border-color 0.15s ease,
            box-shadow 0.15s ease;
        position: relative;
        /* Each button's background is set inline via data-theme below */
    }

    .theme-btn:hover {
        transform: scale(1.15);
    }

    .theme-btn:focus-visible {
        outline: 2px solid var(--color-accent, #917f88);
        outline-offset: 2px;
    }

    /* active = currently selected theme */
    .theme-btn[aria-pressed="true"] {
        border-color: var(--color-text-primary, #4a4148);
        box-shadow: 0 0 0 2px var(--color-bg-secondary, #f5ebe6);
    }

    /* Swatch gradients — one per theme */
    .theme-btn[data-theme="rose-garden"]  { background: linear-gradient(135deg, #cdadab 50%, #836871 50%); }
    .theme-btn[data-theme="forest-floor"] { background: linear-gradient(135deg, #5C7A5E 50%, #8B7355 50%); }
    .theme-btn[data-theme="coastal-fog"]  { background: linear-gradient(135deg, #7A9BAE 50%, #C4B9A8 50%); }
    .theme-btn[data-theme="desert-dawn"]  { background: linear-gradient(135deg, #C27B4A 50%, #D9C4A1 50%); }

    /* Tooltip via ::after pseudo-element */
    .theme-btn::after {
        content: attr(data-label);
        position: absolute;
        bottom: calc(100% + 8px);
        left: 50%;
        transform: translateX(-50%);
        background-color: var(--color-text-primary, #4a4148);
        color: var(--color-bg-primary, #ebd7ce);
        font-size: 0.75rem;
        font-family: sans-serif;
        padding: 0.25rem 0.5rem;
        border-radius: 4px;
        white-space: nowrap;
        opacity: 0;
        pointer-events: none;
        transition: opacity 0.15s ease;
    }

    .theme-btn:hover::after,
    .theme-btn:focus-visible::after {
        opacity: 1;
    }

    /* On small screens, flip tooltip to the left of the button */
    @media (max-width: 600px) {
        .theme-btn::after {
            bottom: auto;
            left: auto;
            right: calc(100% + 8px);
            top: 50%;
            transform: translateY(-50%);
        }
    }
`;