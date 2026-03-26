import type { LocalizedText } from '@/content/types';

const siteName: LocalizedText = {
  zh: 'XIANYU 作品集',
  en: 'XIANYU Portfolio',
};

export const siteConfig = {
  name: siteName,
  shortName: 'XIANYU',
  defaultLocale: 'zh' as const,
  localeStorageKey: 'portfolio-locale',
  titleSeparator: ' | ',
  url: import.meta.env.VITE_SITE_URL || 'https://portfolio.example.com',
  contactEmail: import.meta.env.VITE_CONTACT_EMAIL || 'hello@example.com',
  contactFormEndpoint: import.meta.env.VITE_CONTACT_FORM_ENDPOINT || '',
  analyticsEnabled: import.meta.env.VITE_ENABLE_ANALYTICS === 'true',
  seo: {
    title: siteName,
    description: {
      zh: '一个可持续打磨、可上线部署的个人设计师作品集网站。',
      en: 'A production-ready portfolio site for a designer, built to be iterated over time.',
    },
    image: '/og-default.svg',
  },
  nav: {
    about: { zh: '关于', en: 'About' },
    contact: { zh: '联系', en: 'Contact' },
  },
  localeLabel: {
    zh: 'EN',
    en: '中',
  },
  footerTagline: {
    zh: '个人设计实践',
    en: 'Independent Design Practice',
  },
};
