// src/app/theme-switcher.ts

/**
 * Switch between light and dark themes (color modes)
 * Copyright 2023 Createx Studio
 */

export function initializeThemeSwitcher() {
    const getStoredTheme = (): string | null => localStorage.getItem('theme');
    const setStoredTheme = (theme: string): void => localStorage.setItem('theme', theme);

    const getPreferredTheme = (): string => {
        const storedTheme = getStoredTheme();
        if (storedTheme) {
            return storedTheme;
        }
        return 'dark';
    };

    const setTheme = (theme: string): void => {
        if (theme === 'auto' && window.matchMedia('(prefers-color-scheme: dark)').matches) {
            document.documentElement.setAttribute('data-bs-theme', 'dark');
        } else {
            document.documentElement.setAttribute('data-bs-theme', theme);
        }
    };

    setTheme(getPreferredTheme());

    const showActiveTheme = (theme: string): void => {
        const themeSwitcher = document.querySelector('[data-bs-toggle="mode"]');

        if (!themeSwitcher) {
            return;
        }

        const themeSwitcherCheck = themeSwitcher.querySelector('input[type="checkbox"]');

        if (theme === 'dark') {
            (themeSwitcherCheck as HTMLInputElement).checked = true;
        } else {
            (themeSwitcherCheck as HTMLInputElement).checked = false;
        }
    };

    window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', () => {
        const storedTheme = getStoredTheme();
        if (storedTheme !== 'light' && storedTheme !== 'dark') {
            setTheme(getPreferredTheme());
        }
    });

    showActiveTheme(getPreferredTheme());
    document.querySelectorAll('[data-bs-toggle="mode"]').forEach((toggle) => {
        toggle.addEventListener('click', () => {
            const theme = (toggle.querySelector('input[type="checkbox"]') as HTMLInputElement).checked ? 'dark' : 'light';
            setStoredTheme(theme);
            setTheme(theme);
            showActiveTheme(theme);
        });
    });
}
