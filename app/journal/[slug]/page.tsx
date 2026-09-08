import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import Markdown from 'react-markdown';
import { getJournalArticle } from '../../../lib/journal';
import { journalDate, journalEntries } from '../../../lib/journal-meta';
import '../journal.css';

type Props = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return journalEntries.map(({ slug }) => ({ slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const article = getJournalArticle(slug);
  if (!article) return { title: 'Article not found — XIANYU' };
  return {
    title: `${article.title} — Journal — XIANYU`,
    description: article.description,
  };
}

export default async function JournalArticlePage({ params }: Props) {
  const { slug } = await params;
  const article = getJournalArticle(slug);
  if (!article) notFound();
  const index = journalEntries.findIndex((entry) => entry.slug === slug);
  const next = journalEntries[index + 1];
  const previous = journalEntries[index - 1];
  return (
    <main className="journal-article" id="article-top">
      <article aria-labelledby="article-title">
        <h1 id="article-title">{article.title}</h1>
        <div className="journal-prose">
          <Markdown
            components={{
              h2: ({ node, children }) => {
                const heading = article.headings.find(
                  (item) => item.line === node?.position?.start.line,
                );
                const showFigure =
                  article.image && heading?.id === article.headings[1]?.id;
                return (
                  <>
                    {showFigure && article.image && (
                      <figure className="journal-reading-figure">
                        <Image
                          src={article.image.src}
                          alt={article.image.alt}
                          width={1254}
                          height={1254}
                          unoptimized
                          loading="lazy"
                        />
                        <figcaption>{article.image.caption}</figcaption>
                      </figure>
                    )}
                    <h2 id={heading?.id}>
                      <a href={heading ? `#${heading.id}` : undefined}>
                        {children}
                      </a>
                    </h2>
                  </>
                );
              },
              a: ({ href, children }) =>
                href?.startsWith('/') ? (
                  <Link href={href}>{children}</Link>
                ) : (
                  <a href={href}>{children}</a>
                ),
            }}
          >
            {article.body}
          </Markdown>
        </div>
        <footer className="journal-reading-end">
          <div className="journal-reading-note">
            <p>
              Sample article ·{' '}
              <time dateTime={article.date}>{journalDate(article.date)}</time>
            </p>
            {article.relatedProject && (
              <p>
                Related work:{' '}
                <Link href={article.relatedProject.href}>
                  {article.relatedProject.title}
                </Link>
              </p>
            )}
          </div>
          <nav
            className="journal-reading-pagination"
            aria-label="Article navigation"
          >
            {previous ? (
              <Link href={`/journal/${previous.slug}`}>
                <span>Previous</span>
                {previous.title}
              </Link>
            ) : (
              <Link href="/journal">
                <span>Journal</span>All articles
              </Link>
            )}
            {next ? (
              <Link href={`/journal/${next.slug}`}>
                <span>Next</span>
                {next.title}
              </Link>
            ) : (
              <Link href="/journal">
                <span>Journal</span>All articles
              </Link>
            )}
          </nav>
        </footer>
      </article>
    </main>
  );
}
