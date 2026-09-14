'use client';

import { writingArticles, type WritingArticle as Article } from '@/lib/writing';
import { DetailPage } from '@/components/blocks/detail-page';

export function WritingArticle({ article }: { article: Article }) {
  return (
    <DetailPage
      item={article}
      backHref="/#writing-heading"
      backLabel={{ zh: '返回', en: 'Back' }}
      tocLabel={{ zh: '文章目录', en: 'Table of contents' }}
      collection={writingArticles}
      hrefPrefix="/writing/"
    />
  );
}
