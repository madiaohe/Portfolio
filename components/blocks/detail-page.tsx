'use client';

import { useEffect, useMemo, useState } from 'react';
import { useReducedMotion } from 'motion/react';
import Markdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import type { LocalizedText, WritingBlock } from '@/lib/writing';
import type { HomeLanguage } from '@/lib/home-copy';
import { markdownHeadings } from '@/lib/markdown-headings';
import { MinimalHeader } from '@/components/blocks/minimal-header';
import { useSiteLanguage } from '@/lib/hooks/use-site-language';
import { ArticleDirectory } from '@/components/blocks/article-directory';
import { DetailPager } from '@/components/blocks/detail-pager';
import type { DetailPagerItem } from '@/lib/reference-home';

export type DetailItem = {
  slug: string;
  publishedAt: string;
  title: LocalizedText;
  blocks: WritingBlock[];
  markdown?: { body: string; language: HomeLanguage };
  references?: { en: string[]; zh: string[] };
};

/**
 * Shared detail-page template (used by writing articles and project pages):
 * back link + scroll-linked directory on the left, prose with unified
 * headings, 4:3 component blocks, references, and a previous/next pager.
 * Styles come from app/detail.css.
 */
export function DetailPage({
  item,
  backHref,
  backLabel,
  tocLabel,
  collection,
  hrefPrefix,
  clientBackNavigation = false,
}: {
  item: DetailItem;
  backHref: string;
  backLabel: LocalizedText;
  tocLabel: LocalizedText;
  collection: readonly DetailPagerItem[];
  hrefPrefix: string;
  clientBackNavigation?: boolean;
}) {
  const { language } = useSiteLanguage();
  const bodyHeadings = useMemo(
    () => (item.markdown ? markdownHeadings(item.markdown.body) : []),
    [item.markdown],
  );
  const headings = useMemo(
    () =>
      item.markdown
        ? bodyHeadings.map(({ id, label }) => ({
            id,
            text: { zh: label, en: label },
          }))
        : item.blocks.filter((block) => block.type === 'heading'),
    [item.blocks, item.markdown, bodyHeadings],
  );
  const [activeHeading, setActiveHeading] = useState(headings[0]?.id ?? '');
  const reduced = useReducedMotion() ?? false;

  const activeIndex = Math.max(
    0,
    headings.findIndex((heading) => heading.id === activeHeading),
  );

  const handleHeadingChange = (index: number) => {
    const heading = headings[index];
    if (!heading) return;
    setActiveHeading(heading.id);
    document.getElementById(heading.id)?.scrollIntoView({
      behavior: reduced ? 'auto' : 'smooth',
      block: 'start',
    });
    history.replaceState(null, '', `#${heading.id}`);
  };

  useEffect(() => {
    document.title = `${item.title[language]} — Xu Xianyu`;
  }, [item, language]);

  useEffect(() => {
    let frame = 0;
    const updateActiveHeading = () => {
      window.cancelAnimationFrame(frame);
      frame = window.requestAnimationFrame(() => {
        const targets = headings
          .map(({ id }) => document.getElementById(id))
          .filter((heading): heading is HTMLElement => heading !== null);
        if (!targets.length) return;

        const threshold = window.scrollY + 160;
        const current = targets.reduce(
          (active, heading) =>
            heading.offsetTop <= threshold ? heading : active,
          targets[0],
        );
        setActiveHeading(current.id);
      });
    };

    updateActiveHeading();
    window.addEventListener('scroll', updateActiveHeading, { passive: true });
    window.addEventListener('resize', updateActiveHeading);
    return () => {
      window.cancelAnimationFrame(frame);
      window.removeEventListener('scroll', updateActiveHeading);
      window.removeEventListener('resize', updateActiveHeading);
    };
  }, [headings]);

  const publicationDate = new Date(`${item.publishedAt}T00:00:00Z`);
  const formattedDate =
    language === 'zh'
      ? new Intl.DateTimeFormat('zh-CN', {
          year: 'numeric',
          month: 'long',
          day: 'numeric',
          timeZone: 'UTC',
        }).format(publicationDate)
      : `${publicationDate.getUTCDate()} ${new Intl.DateTimeFormat('en-GB', {
          month: 'long',
          timeZone: 'UTC',
        }).format(publicationDate)}, ${publicationDate.getUTCFullYear()}`;

  return (
    <div
      className="minimal-site detail-site"
      lang={language === 'zh' ? 'zh-CN' : 'en'}
    >
      <MinimalHeader showIdentity={false} />
      <div className="detail-shell">
        <aside className="detail-aside">
          <ArticleDirectory
            clientBackNavigation={clientBackNavigation}
            backHref={backHref}
            backLabel={backLabel[language]}
            tocLabel={tocLabel[language]}
            items={headings.map((heading) => heading.text[language])}
            value={activeIndex}
            onChange={handleHeadingChange}
          />
        </aside>
        <main id="main-content">
          <article
            className="detail-prose"
            aria-labelledby="article-title"
            lang={
              item.markdown?.language === 'zh'
                ? 'zh-CN'
                : item.markdown?.language
            }
          >
            <header className="detail-article-header">
              <h1 id="article-title" tabIndex={-1}>
                {item.title[language]}
              </h1>
              <time dateTime={item.publishedAt}>{formattedDate}</time>
            </header>
            {item.markdown ? (
              <div className="detail-markdown">
                <Markdown
                  remarkPlugins={[remarkGfm]}
                  components={{
                    h2: ({ node, children }) => {
                      const heading = bodyHeadings.find(
                        ({ line }) => line === node?.position?.start.line,
                      );
                      return (
                        <h2 id={heading?.id}>
                          <a href={heading ? `#${heading.id}` : undefined}>
                            {children}
                          </a>
                        </h2>
                      );
                    },
                    table: ({ children }) => (
                      <section
                        className="detail-table-scroll"
                        aria-label={
                          language === 'zh' ? '文章表格' : 'Article table'
                        }
                        // Keyboard users need focus here to scroll wide tables.
                        // oxlint-disable-next-line jsx-a11y/no-noninteractive-tabindex
                        tabIndex={0}
                      >
                        <table>{children}</table>
                      </section>
                    ),
                  }}
                >
                  {item.markdown.body}
                </Markdown>
              </div>
            ) : (
              item.blocks.map((block, index) => {
                switch (block.type) {
                  case 'paragraph':
                    return <p key={index}>{block.text[language]}</p>;
                  case 'heading':
                    return (
                      <h2 key={block.id} id={block.id}>
                        <a href={`#${block.id}`}>{block.text[language]}</a>
                      </h2>
                    );
                  case 'statement':
                    return (
                      <aside
                        className="detail-block detail-statement"
                        key={index}
                        aria-label={language === 'zh' ? '核心想法' : 'Key idea'}
                      >
                        <p className="detail-block-placeholder">
                          {language === 'zh' ? '内容占位' : 'Placeholder'}
                        </p>
                      </aside>
                    );
                  case 'observations':
                    return (
                      <figure
                        className="detail-block detail-observations"
                        key={index}
                      >
                        <p className="detail-block-placeholder">
                          {language === 'zh' ? '内容占位' : 'Placeholder'}
                        </p>
                      </figure>
                    );
                  case 'exercise':
                    return (
                      <aside
                        className="detail-block detail-exercise"
                        key={index}
                      >
                        <p className="detail-block-placeholder">
                          {language === 'zh' ? '内容占位' : 'Placeholder'}
                        </p>
                      </aside>
                    );
                }
              })
            )}
            {item.references ? (
              <section className="detail-references">
                <ol>
                  {item.references[language].map((ref, i) => (
                    <li key={i}>{ref}</li>
                  ))}
                </ol>
              </section>
            ) : null}
          </article>
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
