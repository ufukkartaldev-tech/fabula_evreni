'use client';

import { useTheme } from '@/contexts/ThemeContext';

export default function ThemeToggle() {
    const themeContext = useTheme();

    // Return null during SSR or if context is not available
    if (!themeContext) {
        return null;
    }

    const { theme, toggleTheme } = themeContext;

    return (
        <button
            className="theme-toggle"
            onClick={toggleTheme}
            title={theme === 'light' ? 'Karanlık moda geç' : 'Aydınlık moda geç'}
            aria-label="Tema değiştir"
        >
            <span className="theme-icon">
                {theme === 'light' ? '🌙' : '☀️'}
            </span>
        </button>
    );
}
