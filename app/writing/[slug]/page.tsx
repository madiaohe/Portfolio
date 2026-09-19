import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { WritingArticle } from './writing-article';
import { WritingShowcase } from './writing-showcase';
import {
  getWritingArticle,
  publishedWritingArticles,
} from '../../../lib/writing';
import '../../minimal.css';
import '../../detail.css';
import '../../showcase.css';

type Props = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return publishedWritingArticles.map(({ slug }) => ({ slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const article = getWritingArticle(slug);
  if (!article) return { title: 'Article not found — Xu Xianyu' };
  return {
    title: `${article.title.en} — Xu Xianyu`,
    description: article.description.en,
    robots: { index: false, follow: false },
  };
}

export default async function WritingPage({ params }: Props) {
  const { slug } = await params;
  const article = getWritingArticle(slug);
  if (!article) notFound();
  return article.layout === 'showcase' ? (
    <WritingShowcase article={article} />
  ) : (
    <WritingArticle article={article} />
  );
}
