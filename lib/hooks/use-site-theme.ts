'use client';

import { useEffect, useRef, useState } from 'react';

type Theme = 'light' | 'dark';
const themeKey = 'xianyu-theme';

export function useSiteTheme() {
  const [theme, setTheme] = useState<Theme>('light');
  const preference = useRef<Theme | null>(null);

  useEffect(() => {
    const systemTheme = window.matchMedia('(prefers-color-scheme: dark)');
    function applyTheme(next: Theme) {
      document.documentElement.dataset.minimalTheme = next;
      setTheme(next);
    }
    function readPreference() {
      try {
        const saved = localStorage.getItem(themeKey);
        preference.current =
          saved === 'light' || saved === 'dark' ? saved : null;
      } catch {
        // The in-memory preference still works when storage is unavailable.
      }
      applyTheme(
        preference.current ?? (systemTheme.matches ? 'dark' : 'light'),
      );
    }
    const frame = requestAnimationFrame(readPreference);
    function onSystemChange() {
      if (!preference.current)
        applyTheme(systemTheme.matches ? 'dark' : 'light');
    }
    function onStorage(event: StorageEvent) {
      if (event.key === themeKey || event.key === null) readPreference();
    }
    systemTheme.addEventListener('change', onSystemChange);
    window.addEventListener('storage', onStorage);
    return () => {
      cancelAnimationFrame(frame);
      systemTheme.removeEventListener('change', onSystemChange);
      window.removeEventListener('storage', onStorage);
    };
  }, []);

  function toggleTheme() {
    const next =
      document.documentElement.dataset.minimalTheme === 'dark'
        ? 'light'
        : 'dark';
    preference.current = next;
    document.documentElement.dataset.minimalTheme = next;
    setTheme(next);
    try {
      localStorage.setItem(themeKey, next);
    } catch {
      // Persistence is optional.
    }
  }

  return { theme, toggleTheme };
}
