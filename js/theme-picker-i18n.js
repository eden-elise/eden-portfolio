/**
 * theme-picker-i18n.js
 *
 * Translation strings for the ThemePicker component.
 * 'themes' is an array (not an object) so insertion order is guaranteed
 * and each entry carries both its CSS value and its display label.
 */
export const translations = {
    en: {
        label: 'Choose a theme',
        themeSuffix: 'theme',
        themes: [
            { value: 'rose-garden',  label: 'Rose Garden'  },
            { value: 'forest-floor', label: 'Forest Floor' },
            { value: 'coastal-fog',  label: 'Coastal Fog'  },
            { value: 'desert-dawn',  label: 'Desert Dawn'  },
        ]
    },
    es: {
        label: 'Elige un tema',
        themeSuffix: 'tema',
        themes: [
            { value: 'rose-garden',  label: 'Jardín de Rosas' },
            { value: 'forest-floor', label: 'Suelo del Bosque' },
            { value: 'coastal-fog',  label: 'Niebla Costera'   },
            { value: 'desert-dawn',  label: 'Amanecer Desértico' },
        ]
    }
    // Add more locales as needed — same shape as 'en'
};