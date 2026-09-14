'use client';

import { useEffect, useState } from 'react';
import type { HomeLanguage } from '@/lib/home-copy';

const languageKey = 'xianyu-language';

export function useSiteLanguage() {
  const [language, setLanguage] = useState<HomeLanguage>('en');

  useEffect(() => {
    const frame = requestAnimationFrame(() => {
      try {
        const saved = localStorage.getItem(languageKey);
        if (saved === 'zh' || saved === 'en') setLanguage(saved);
      } catch {
        // Language switching still works without storage.
      }
    });
    return () => cancelAnimationFrame(frame);
  }, []);

  useEffect(() => {
    const previous = document.documentElement.lang;
    document.documentElement.lang = language === 'zh' ? 'zh-CN' : 'en';
    return () => {
      document.documentElement.lang = previous;
    };
  }, [language]);

  function changeLanguage(next: HomeLanguage) {
    setLanguage(next);
    try {
      localStorage.setItem(languageKey, next);
    } catch {
      // Persistence is optional.
    }
  }

  return { language, changeLanguage };
}
