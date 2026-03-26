import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { applyMetadata } from '@/app/lib/seo';
import { useLocale } from '@/app/providers/LocaleProvider';

interface PageMetadataInput {
  title: string;
  description: string;
  image?: string;
  type?: 'website' | 'article';
}

export function usePageMetadata({ title, description, image, type }: PageMetadataInput) {
  const { locale } = useLocale();
  const location = useLocation();

  useEffect(() => {
    applyMetadata({
      title,
      description,
      image,
      type,
      locale,
      path: `${location.pathname}${location.search}`,
    });
  }, [description, image, locale, location.pathname, location.search, title, type]);
}
