'use client';

import { useContext } from 'react';
import { SiteLanguageContext } from '@/lib/site-language-context';

export function useSiteLanguage() {
  const context = useContext(SiteLanguageContext);

  if (!context) {
    throw new Error(
      'useSiteLanguage must be used within a SiteLanguageProvider.',
    );
  }

  return context;
}
