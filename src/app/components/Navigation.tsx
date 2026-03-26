import { Link, useLocation } from 'react-router-dom';
import { useLocale } from '@/app/providers/LocaleProvider';
import { siteConfig } from '@/content/site';

export function Navigation() {
  const location = useLocation();
  const { locale, toggleLocale, t } = useLocale();

  const navItems = [
    { path: '/about', label: t(siteConfig.nav.about) },
    { path: '/contact', label: t(siteConfig.nav.contact) },
  ];

  return (
    <nav className="fixed top-8 right-8 z-50 flex items-center gap-2">
      <button
        className="h-[24px] w-[24px] flex items-center justify-center bg-[#AFAEA7] hover:bg-[#999892] transition-colors"
        aria-label={locale === 'zh' ? 'Switch to English' : '切换到中文'}
        onClick={toggleLocale}
      >
        <span className="text-[10px] font-medium text-black">
          {siteConfig.localeLabel[locale]}
        </span>
      </button>

      {navItems.map((item) => {
        const isActive = location.pathname === item.path;
        return (
          <Link
            key={item.path}
            to={item.path}
            aria-current={isActive ? 'page' : undefined}
            className="h-[24px] px-3 flex items-center justify-center text-[13px] font-medium transition-colors bg-[#AFAEA7] text-black hover:bg-[#999892]"
            style={{ fontFamily: 'Arial, sans-serif' }}
          >
            {item.label}
          </Link>
        );
      })}
    </nav>
  );
}
