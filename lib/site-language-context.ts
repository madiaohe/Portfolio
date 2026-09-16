import { createContext } from 'react';
import type { HomeLanguage } from '@/lib/home-copy';

export type SiteLanguageValue = {
  language: HomeLanguage;
  changeLanguage: (language: HomeLanguage) => void;
};

export const SiteLanguageContext = createContext<SiteLanguageValue | null>(
  null,
);
