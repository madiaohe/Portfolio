import { Logo } from '@/app/components/Logo';
import { Navigation } from '@/app/components/Navigation';
import { IconSphere } from '@/app/components/IconSphere';
import { HorizontalJourney } from '@/app/components/HorizontalJourney';
import { useLocale } from '@/app/providers/LocaleProvider';
import { usePageMetadata } from '@/app/hooks/usePageMetadata';
import { aboutContent, pageSeo } from '@/content/pages';

export default function About() {
  const { t } = useLocale();

  usePageMetadata({
    title: t(pageSeo.about.title),
    description: t(pageSeo.about.description),
  });

  return (
    <div className="min-h-screen bg-white relative">
      <Logo />
      <Navigation />

      <section className="relative h-screen w-full overflow-hidden">
        <IconSphere />

        <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 z-10" style={{ color: '#AFAEA7' }}>
          <span className="text-[11px] tracking-[0.2em] uppercase">{t(aboutContent.scrollHint)}</span>
          <div className="w-px h-8 bg-[#AFAEA7] opacity-40 animate-pulse" />
        </div>
      </section>

      <HorizontalJourney />

      <div className="h-32" />
    </div>
  );
}
