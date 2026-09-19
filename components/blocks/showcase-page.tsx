'use client';

import Image from 'next/image';
import { useSiteLanguage } from '@/lib/hooks/use-site-language';
import { DetailPager } from '@/components/blocks/detail-pager';
import type { DetailPagerItem } from '@/lib/reference-home';
import type {
  LocalizedText,
  ShowcaseChapter,
  ShowcaseCover,
  ShowcaseFact,
} from '@/lib/writing';

export type ShowcaseItem = {
  slug: string;
  publishedAt: string;
  title: LocalizedText;
  description?: LocalizedText;
  cover?: ShowcaseCover;
  facts?: ShowcaseFact[];
  chapters?: ShowcaseChapter[];
};

/**
 * Image-led template shared by projects and writing articles: back link,
 * title, optional cover, facts and image-led chapters, then the always
 * visible pager. No directory or references. Swap `layout` back to
 * 'article' in the data source to use the full DetailPage template.
 * Styles come from app/showcase.css.
 */
export function ShowcasePage({
  item,
  backHref,
  backLabel,
  collection,
  hrefPrefix,
}: {
  item: ShowcaseItem;
  backHref: string;
  backLabel: LocalizedText;
  collection: readonly DetailPagerItem[];
  hrefPrefix: string;
}) {
  const { language } = useSiteLanguage();

  return (
    <div
      className="minimal-site showcase-site"
      lang={language === 'zh' ? 'zh-CN' : 'en'}
    >
      <div className="showcase-shell">
        <a className="showcase-back" href={backHref}>
          <span aria-hidden="true">←</span> {backLabel[language]}
        </a>

        <main id="main-content">
          <header className="showcase-header">
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

          {item.chapters && item.chapters.length > 0 ? (
            <div className="showcase-chapters">
              {item.chapters.map((chapter) => (
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
