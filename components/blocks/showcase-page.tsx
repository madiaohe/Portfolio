'use client';

import Image from 'next/image';
import { useEffect, useMemo, useState } from 'react';
import { useReducedMotion } from 'motion/react';
import { useSiteLanguage } from '@/lib/hooks/use-site-language';
import { MinimalHeader } from '@/components/blocks/minimal-header';
import { ArticleDirectory } from '@/components/blocks/article-directory';
import { DetailPager } from '@/components/blocks/detail-pager';
import type { DetailPagerItem } from '@/lib/reference-home';
import type {
  LocalizedText,
  ShowcaseChapter,
  ShowcaseCover,
  ShowcaseFact,
  ShowcaseGalleryAspect,
  ShowcaseGalleryImage,
  ShowcaseLogo,
} from '@/lib/writing';
import { ScrollAutoplayDevice } from '@/components/ui/scroll-autoplay-device';

export type ShowcaseItem = {
  slug: string;
  publishedAt: string;
  title: LocalizedText;
  description?: LocalizedText;
  logo?: ShowcaseLogo;
  cover?: ShowcaseCover;
  facts?: ShowcaseFact[];
  gallery?: ShowcaseGalleryImage[];
  galleryAspect?: ShowcaseGalleryAspect;
  chapters?: ShowcaseChapter[];
};

/**
 * Image-led template shared by projects and writing articles: a scroll-linked
 * chapter directory on the left (fixed on wide viewports, like DetailPage),
 * then title, cover, facts and image-led chapters, then the always visible
 * pager. No references or 4:3 blocks. Swap `layout` back to 'article' in the
 * data source to use the full DetailPage template. Styles: app/showcase.css.
 */
export function ShowcasePage({
  item,
  backHref,
  backLabel,
  tocLabel,
  collection,
  hrefPrefix,
}: {
  item: ShowcaseItem;
  backHref: string;
  backLabel: LocalizedText;
  tocLabel: LocalizedText;
  collection: readonly DetailPagerItem[];
  hrefPrefix: string;
}) {
  const { language } = useSiteLanguage();
  const reduced = useReducedMotion() ?? false;
  const chapters = useMemo(() => item.chapters ?? [], [item.chapters]);
  const headings = chapters.map((chapter) => chapter.heading);
  const [activeIndex, setActiveIndex] = useState(0);

  const handleChapterChange = (index: number) => {
    const chapter = chapters[index];
    if (!chapter) return;
    setActiveIndex(index);
    document.getElementById(chapter.id)?.scrollIntoView({
      behavior: reduced ? 'auto' : 'smooth',
      block: 'start',
    });
    history.replaceState(null, '', `#${chapter.id}`);
  };

  useEffect(() => {
    document.title = `${item.title[language]} — Xu Xianyu`;
  }, [item, language]);

  useEffect(() => {
    if (!chapters.length) return;
    let frame = 0;
    const updateActiveChapter = () => {
      window.cancelAnimationFrame(frame);
      frame = window.requestAnimationFrame(() => {
        const targets = chapters
          .map(({ id }) => document.getElementById(id))
          .filter((node): node is HTMLElement => node !== null);
        if (!targets.length) return;

        const threshold = window.scrollY + 160;
        const current = targets.reduce(
          (active, node) => (node.offsetTop <= threshold ? node : active),
          targets[0],
        );
        setActiveIndex(
          Math.max(
            0,
            targets.findIndex((node) => node === current),
          ),
        );
      });
    };

    updateActiveChapter();
    window.addEventListener('scroll', updateActiveChapter, { passive: true });
    window.addEventListener('resize', updateActiveChapter);
    return () => {
      window.cancelAnimationFrame(frame);
      window.removeEventListener('scroll', updateActiveChapter);
      window.removeEventListener('resize', updateActiveChapter);
    };
  }, [chapters]);

  return (
    <div
      className="minimal-site showcase-site"
      lang={language === 'zh' ? 'zh-CN' : 'en'}
    >
      <MinimalHeader showIdentity={false} />
      <div className="detail-shell showcase-shell">
        <aside className="detail-aside">
          <ArticleDirectory
            backHref={backHref}
            backLabel={backLabel[language]}
            tocLabel={tocLabel[language]}
            items={headings.map((heading) => heading[language])}
            value={activeIndex}
            onChange={handleChapterChange}
          />
        </aside>
        <main id="main-content">
          <header className="showcase-header">
            {item.logo ? (
              <Image
                className="showcase-logo"
                src={item.logo.src}
                alt={item.logo.alt}
                width={200}
                height={40}
                unoptimized
              />
            ) : null}
            <h1 id="showcase-title">{item.title[language]}</h1>
            {item.description ? (
              <p className="showcase-deck">{item.description[language]}</p>
            ) : null}
            <time className="showcase-date" dateTime={item.publishedAt}>
              {new Intl.DateTimeFormat(language === 'zh' ? 'zh-CN' : 'en-GB', {
                year: 'numeric',
                month: 'long',
                timeZone: 'UTC',
              }).format(new Date(`${item.publishedAt}T00:00:00Z`))}
            </time>
          </header>

          {item.cover ? (
            <figure className="showcase-cover">
              <Image
                src={item.cover.src}
                alt={item.cover.alt}
                width={1254}
                height={1254}
                fetchPriority="high"
                unoptimized
              />
              {item.cover.caption ? (
                <figcaption>{item.cover.caption[language]}</figcaption>
              ) : null}
            </figure>
          ) : null}

          {item.facts && item.facts.length > 0 ? (
            <dl className="showcase-facts">
              {item.facts.map((fact, index) => (
                <div key={index} className="showcase-fact">
                  <dt>{fact.label[language]}</dt>
                  <dd>{fact.value[language]}</dd>
                </div>
              ))}
            </dl>
          ) : null}

          {item.gallery && item.gallery.length > 1 ? (
            <ScrollAutoplayDevice
              images={item.gallery}
              aspect={item.galleryAspect ?? '4:3'}
            />
          ) : null}

          {chapters.length > 0 ? (
            <div className="showcase-chapters">
              {chapters.map((chapter) => (
                <section
                  key={chapter.id}
                  id={chapter.id}
                  className="showcase-chapter"
                >
                  <h2 className="showcase-chapter__heading">
                    <a href={`#${chapter.id}`}>{chapter.heading[language]}</a>
                  </h2>
                  <div className="showcase-chapter__body">
                    {chapter.blocks.map((block, index) => {
                      switch (block.type) {
                        case 'paragraph':
                          return <p key={index}>{block.text[language]}</p>;
                        case 'heading':
                          return (
                            <h3 key={index} id={block.id}>
                              {block.text[language]}
                            </h3>
                          );
                        case 'image':
                          return (
                            <figure
                              key={index}
                              className="showcase-chapter__image"
                            >
                              <Image
                                src={block.src}
                                alt={block.alt}
                                width={1254}
                                height={1254}
                                unoptimized
                              />
                              {block.caption ? (
                                <figcaption>
                                  {block.caption[language]}
                                </figcaption>
                              ) : null}
                            </figure>
                          );
                      }
                    })}
                  </div>
                </section>
              ))}
            </div>
          ) : null}

          <DetailPager
            collection={collection}
            currentSlug={item.slug}
            hrefPrefix={hrefPrefix}
          />
        </main>
      </div>
    </div>
  );
}
