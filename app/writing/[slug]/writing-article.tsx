'use client';

import { useEffect, useMemo, useState } from 'react';
import Link from 'next/link';
import { CornerUpLeft } from 'lucide-react';
import type { WritingArticle as Article } from '@/lib/writing';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { MinimalHeader } from '@/components/blocks/minimal-header';
import { useSiteLanguage } from '@/lib/hooks/use-site-language';

export function WritingArticle({ article }: { article: Article }) {
  const { language, changeLanguage } = useSiteLanguage();
  const headings = useMemo(
    () => article.blocks.filter((block) => block.type === 'heading'),
    [article.blocks],
  );
  const [activeHeading, setActiveHeading] = useState(headings[0]?.id ?? '');

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
          <Link className="writing-back" href="/#writing-heading">
            <CornerUpLeft size={14} strokeWidth={1.35} aria-hidden="true" />
            {language === 'zh' ? '返回' : 'Back'}
          </Link>
          {headings.length ? (
            <nav
              className="writing-toc"
              aria-label={language === 'zh' ? '文章目录' : 'Table of contents'}
            >
              <ul>
                {headings.map((heading) => (
                  <li key={heading.id}>
                    <a
                      href={`#${heading.id}`}
                      aria-current={
                        activeHeading === heading.id ? 'location' : undefined
                      }
                    >
                      {heading.text[language]}
                    </a>
                  </li>
                ))}
              </ul>
            </nav>
          ) : null}
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
                      className="writing-statement"
                      key={index}
                      aria-label={language === 'zh' ? '核心想法' : 'Key idea'}
                    >
                      <p>{block.text[language]}</p>
                    </aside>
                  );
                case 'observations':
                  return (
                    <figure className="writing-observations" key={index}>
                      <Tabs defaultValue="0">
                        <TabsList
                          className="writing-tabs"
                          aria-label={
                            language === 'zh'
                              ? '选择观察对象'
                              : 'Choose an observation'
                          }
                        >
                          {block.items.map((item, i) => (
                            <TabsTrigger key={i} value={String(i)}>
                              {item.title[language]}
                            </TabsTrigger>
                          ))}
                        </TabsList>
                        {block.items.map((item, i) => (
                          <TabsContent key={i} value={String(i)}>
                            <dl className="writing-observation-body">
                              {(
                                [
                                  'observation',
                                  'interpretation',
                                  'application',
                                ] as const
                              ).map((field, j) => (
                                <div key={field}>
                                  <dt>
                                    {
                                      (language === 'zh'
                                        ? ['看见什么', '如何理解', '带回设计']
                                        : ['Observe', 'Interpret', 'Apply'])[j]
                                    }
                                  </dt>
                                  <dd>{item[field][language]}</dd>
                                </div>
                              ))}
                            </dl>
                          </TabsContent>
                        ))}
                      </Tabs>
                      <figcaption>{block.caption[language]}</figcaption>
                    </figure>
                  );
                case 'exercise':
                  return (
                    <aside className="writing-exercise" key={index}>
                      <h3>{block.title[language]}</h3>
                      <ol>
                        {block.steps.map((step, i) => (
                          <li key={i}>{step[language]}</li>
                        ))}
                      </ol>
                    </aside>
                  );
              }
            })}
          </article>
          <nav
            className="writing-navigation"
            aria-label={language === 'zh' ? '文章导航' : 'Article navigation'}
          >
            <Link href="/#writing-heading">
              {language === 'zh' ? '所有文章' : 'All writing'}
            </Link>
            <a href="#article-title">
              {language === 'zh' ? '回到顶部' : 'Back to top'}
            </a>
          </nav>
        </main>
      </div>
    </div>
  );
}
