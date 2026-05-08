import { createContext, useContext, useState, useEffect } from 'react';
import { saveToStorage, loadFromStorage, STORAGE_KEYS } from '../utils/storage';

// ── Context ────────────────────────────────────────────
export const ThemeContext = createContext(null);

// ── Provider ───────────────────────────────────────────
export function ThemeProvider({ children }) {
  const [isDark, setIsDark] = useState(() => {
    const saved = loadFromStorage(STORAGE_KEYS.THEME);
    return saved !== null ? saved : true; // default dark
  });

  useEffect(() => {
    document.documentElement.classList.toggle('dark', isDark);
    saveToStorage(STORAGE_KEYS.THEME, isDark);
  }, [isDark]);

  const toggleTheme = () => setIsDark((v) => !v);

  return (
    <ThemeContext.Provider value={{ isDark, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

// ── Hook (separate named export - satisfies Fast Refresh) ─
export function useTheme() {
  return useContext(ThemeContext);
}
