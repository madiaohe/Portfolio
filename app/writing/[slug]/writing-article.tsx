'use client';

import { useEffect, useMemo, useState } from 'react';
import Link from 'next/link';
import { useReducedMotion } from 'motion/react';
import { writingArticles, type WritingArticle as Article } from '@/lib/writing';
import { MinimalHeader } from '@/components/blocks/minimal-header';
import { useSiteLanguage } from '@/lib/hooks/use-site-language';
import { ArticleDirectory } from '@/components/blocks/article-directory';

export function WritingArticle({ article }: { article: Article }) {
  const { language, changeLanguage } = useSiteLanguage();
  const headings = useMemo(
    () => article.blocks.filter((block) => block.type === 'heading'),
    [article.blocks],
  );
  const [activeHeading, setActiveHeading] = useState(headings[0]?.id ?? '');
  const reduced = useReducedMotion() ?? false;
  const articleIndex = writingArticles.findIndex(
    (item) => item.slug === article.slug,
  );
  const prevArticle =
    articleIndex > 0 ? writingArticles[articleIndex - 1] : undefined;
  const nextArticle =
    articleIndex >= 0 && articleIndex < writingArticles.length - 1
      ? writingArticles[articleIndex + 1]
      : undefined;

  const activeIndex = Math.max(
    0,
    headings.findIndex((heading) => heading.id === activeHeading),
  );

  const handleHeadingChange = (index: number) => {
    const heading = headings[index];
    if (!heading) return;
    setActiveHeading(heading.id);
    document
      .getElementById(heading.id)
      ?.scrollIntoView({ behavior: reduced ? 'auto' : 'smooth', block: 'start' });
    history.replaceState(null, '', `#${heading.id}`);
  };

  useEffect(() => {
    document.title = `${article.title[language]} — Xu Xianyu`;
  }, [article, language]);

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

  const publicationDate = new Date(`${article.publishedAt}T00:00:00Z`);
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
      className="minimal-site writing-site"
      lang={language === 'zh' ? 'zh-CN' : 'en'}
    >
      <MinimalHeader
        language={language}
        onLanguageChange={changeLanguage}
        showIdentity={false}
      />
      <div className="writing-shell">
        <aside className="writing-aside">
          <ArticleDirectory
            backHref="/#writing-heading"
            backLabel={language === 'zh' ? '返回' : 'Back'}
            tocLabel={language === 'zh' ? '文章目录' : 'Table of contents'}
            items={headings.map((heading) => heading.text[language])}
            value={activeIndex}
            onChange={handleHeadingChange}
          />
        </aside>
        <main id="main-content">
          <article className="writing-prose" aria-labelledby="article-title">
            <header className="writing-article-header">
              <h1 id="article-title" tabIndex={-1}>
                {article.title[language]}
              </h1>
              <time dateTime={article.publishedAt}>{formattedDate}</time>
            </header>
            {article.blocks.map((block, index) => {
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
                      className="writing-block writing-statement"
                      key={index}
                      aria-label={language === 'zh' ? '核心想法' : 'Key idea'}
                    >
                      <p className="writing-block-placeholder">
                        {language === 'zh' ? '内容占位' : 'Placeholder'}
                      </p>
                    </aside>
                  );
                case 'observations':
                  return (
                    <figure
                      className="writing-block writing-observations"
                      key={index}
                    >
                      <p className="writing-block-placeholder">
                        {language === 'zh' ? '内容占位' : 'Placeholder'}
                      </p>
                    </figure>
                  );
                case 'exercise':
                  return (
                    <aside className="writing-block writing-exercise" key={index}>
                      <p className="writing-block-placeholder">
                        {language === 'zh' ? '内容占位' : 'Placeholder'}
                      </p>
                    </aside>
                  );
              }
            })}
            {article.references ? (
              <section className="writing-references">
                <ol>
                  {article.references[language].map((ref, i) => (
                    <li key={i}>{ref}</li>
                  ))}
                </ol>
              </section>
            ) : null}
          </article>
          {prevArticle || nextArticle ? (
            <nav
              className="writing-navigation"
              aria-label={
                language === 'zh' ? '文章导航' : 'Article navigation'
              }
            >
              <div className="writing-pager-side writing-pager-prev">
                {prevArticle ? (
                  <Link href={`/writing/${prevArticle.slug}`}>
                    <span className="writing-pager-label">
                      {language === 'zh' ? '上一篇' : 'Previous'}
                    </span>
                    <span className="writing-pager-title">
                      {prevArticle.title[language]}
                    </span>
                  </Link>
                ) : null}
              </div>
              <div className="writing-pager-side writing-pager-next">
                {nextArticle ? (
                  <Link href={`/writing/${nextArticle.slug}`}>
                    <span className="writing-pager-label">
                      {language === 'zh' ? '下一篇' : 'Next'}
                    </span>
                    <span className="writing-pager-title">
                      {nextArticle.title[language]}
                    </span>
                  </Link>
                ) : null}
              </div>
            </nav>
          ) : null}
        </main>
      </div>
    </div>
  );
}
