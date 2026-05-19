class BloomFlower extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: 'open' });
    }

    connectedCallback() {
        this._render();
    }

    _render() {
        this.shadowRoot.innerHTML = `
            <style>
                /*
                 * :host styles the <bloom-flower> element itself.
                 * position: absolute works here because the <header>
                 * already has position: relative in layout.css.
                 * CSS custom properties inherit through the shadow
                 * boundary, so all --color-* and --spacing-* tokens
                 * update automatically when the theme changes.
                 */
                :host {
                    display: block;
                    position: absolute;
                    top: 50%;
                    left: var(--spacing-lg);
                    transform: translateY(-50%);
                    width: clamp(2rem, 4vw, 3rem);
                    height: clamp(2rem, 4vw, 3rem);
                    pointer-events: none;
                }

                .petal {
                    position: absolute;
                    width: 33%;
                    height: 55%;
                    background-color: var(--color-text-heading);
                    border-radius: 50%;
                    bottom: 50%;
                    left: 33.5%;
                    transform-origin: bottom center;
                    opacity: 0;
                    animation: petal-bloom 0.45s ease-out forwards;
                }

                .petal:nth-child(1) { --r: 0deg;   animation-delay: 0.05s; }
                .petal:nth-child(2) { --r: 60deg;  animation-delay: 0.15s; }
                .petal:nth-child(3) { --r: 120deg; animation-delay: 0.25s; }
                .petal:nth-child(4) { --r: 180deg; animation-delay: 0.35s; }
                .petal:nth-child(5) { --r: 240deg; animation-delay: 0.45s; }
                .petal:nth-child(6) { --r: 300deg; animation-delay: 0.55s; }

                @keyframes petal-bloom {
                    0%   { opacity: 0; transform: rotate(var(--r)) scaleY(0); }
                    60%  { opacity: 1; }
                    100% { opacity: 0.9; transform: rotate(var(--r)) scaleY(1); }
                }

                .center {
                    position: absolute;
                    width: 30%;
                    height: 30%;
                    background-color: var(--color-bg-accent);
                    border-radius: 50%;
                    top: 50%;
                    left: 50%;
                    transform: translate(-50%, -50%) scale(0);
                    animation: center-bloom 0.25s ease-out 0.65s forwards;
                }

                @keyframes center-bloom {
                    to { transform: translate(-50%, -50%) scale(1); }
                }

                @media (max-width: 600px) {
                    :host {
                        left: var(--spacing-md);
                    }
                }

                @media (prefers-reduced-motion: reduce) {
                    .petal {
                        animation: none;
                        opacity: 0.9;
                        transform: rotate(var(--r)) scaleY(1);
                    }
                    .center {
                        animation: none;
                        transform: translate(-50%, -50%) scale(1);
                    }
                }
            </style>

            <div class="petal"></div>
            <div class="petal"></div>
            <div class="petal"></div>
            <div class="petal"></div>
            <div class="petal"></div>
            <div class="petal"></div>
            <div class="center"></div>
        `;
    }
}

customElements.define('bloom-flower', BloomFlower);