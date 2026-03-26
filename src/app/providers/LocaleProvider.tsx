import {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
} from 'react';
import type { PropsWithChildren } from 'react';
import { siteConfig } from '@/content/site';
import type { Locale, LocalizedText } from '@/content/types';

interface LocaleContextValue {
  locale: Locale;
  toggleLocale: () => void;
  t: (value: LocalizedText) => string;
}

const LocaleContext = createContext<LocaleContextValue | null>(null);

function getInitialLocale(): Locale {
  if (typeof window === 'undefined') {
    return siteConfig.defaultLocale;
  }

  const query = new URLSearchParams(window.location.search).get('lang');
  if (query === 'zh' || query === 'en') {
    return query;
  }

  const stored = window.localStorage.getItem(siteConfig.localeStorageKey);
  if (stored === 'zh' || stored === 'en') {
    return stored;
  }

  return window.navigator.language.toLowerCase().startsWith('zh') ? 'zh' : 'en';
}

export function LocaleProvider({ children }: PropsWithChildren) {
  const [locale, setLocale] = useState<Locale>(getInitialLocale);

  useEffect(() => {
    window.localStorage.setItem(siteConfig.localeStorageKey, locale);
    const url = new URL(window.location.href);
    url.searchParams.set('lang', locale);
    window.history.replaceState({}, '', url.toString());
  }, [locale]);

  const value = useMemo(
    () => ({
      locale,
      toggleLocale: () => setLocale((prev) => (prev === 'zh' ? 'en' : 'zh')),
      t: (value: LocalizedText) => value[locale] || value[siteConfig.defaultLocale],
    }),
    [locale],
  );

  return <LocaleContext.Provider value={value}>{children}</LocaleContext.Provider>;
}

export function useLocale() {
  const context = useContext(LocaleContext);
  if (!context) {
    throw new Error('useLocale must be used within LocaleProvider');
  }

  return context;
}
