'use client';

import { type PublishedWritingArticle } from '@/lib/writing';
import { writingPagerItems } from '@/lib/reference-home';
import { DetailPage } from '@/components/blocks/detail-page';

export function WritingArticle({
  article,
}: {
  article: PublishedWritingArticle;
}) {
  return (
    <DetailPage
      item={article}
      backHref="/#writing-heading"
      backLabel={{ zh: '返回', en: 'Back' }}
      tocLabel={{ zh: '文章目录', en: 'Table of contents' }}
      collection={writingPagerItems}
      hrefPrefix="/writing/"
    />
  );
}
