import { Link } from 'react-router-dom';
import { usePageMetadata } from '@/app/hooks/usePageMetadata';
import { useLocale } from '@/app/providers/LocaleProvider';
import { pageSeo } from '@/content/pages';

export default function NotFound() {
  const { t } = useLocale();

  usePageMetadata({
    title: t(pageSeo.notFound.title),
    description: t(pageSeo.notFound.description),
  });

  return (
    <div className="min-h-screen bg-white flex items-center justify-center px-8">
      <div className="text-center">
        <p className="text-xs tracking-[0.3em] uppercase text-[#AFAEA7]">404</p>
        <h1 className="mt-4 text-3xl text-black">{t(pageSeo.notFound.title)}</h1>
        <p className="mt-3 text-sm text-[#AFAEA7] max-w-md">
          {t(pageSeo.notFound.description)}
        </p>
        <Link
          to="/"
          className="inline-flex mt-8 items-center justify-center h-[32px] px-4 bg-[#AFAEA7] text-black text-sm hover:bg-[#999892] transition-colors"
        >
          {t({ zh: '返回首页', en: 'Back Home' })}
        </Link>
      </div>
    </div>
  );
}
