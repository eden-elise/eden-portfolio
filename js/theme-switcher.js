/**
 * theme-switcher.js — Theme Switching Logic
 *
 * Applies themes via data-theme attribute on <html>,
 * persists choice in localStorage across page reloads.
 * Without JS, the site falls back to the Rose Garden
 * defaults defined in tokens.css.
 */

(function () {
    var STORAGE_KEY = "eden-portfolio-theme";
    var DEFAULT_THEME = "rose-garden";

    function getStoredTheme() {
        try {
            return localStorage.getItem(STORAGE_KEY) || DEFAULT_THEME;
        } catch (e) {
            return DEFAULT_THEME;
        }
    }

    function setTheme(theme) {
        document.documentElement.setAttribute("data-theme", theme);

        try {
            localStorage.setItem(STORAGE_KEY, theme);
        } catch (e) {
            /* localStorage unavailable — theme still works for this session */
        }

        var buttons = document.querySelectorAll(".theme-btn");
        for (var i = 0; i < buttons.length; i++) {
            if (buttons[i].getAttribute("data-theme") === theme) {
                buttons[i].classList.add("active");
                buttons[i].setAttribute("aria-pressed", "true");
            } else {
                buttons[i].classList.remove("active");
                buttons[i].setAttribute("aria-pressed", "false");
            }
        }
    }

    /* Apply stored theme immediately to prevent flash of default */
    setTheme(getStoredTheme());

    /* Once DOM is ready, wire up button click handlers */
    document.addEventListener("DOMContentLoaded", function () {
        var buttons = document.querySelectorAll(".theme-btn");
        for (var i = 0; i < buttons.length; i++) {
            buttons[i].addEventListener("click", function () {
                setTheme(this.getAttribute("data-theme"));
            });
        }
    });
})();
