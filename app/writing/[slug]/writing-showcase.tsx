'use client';

import { ShowcasePage } from '@/components/blocks/showcase-page';
import { writingPagerItems } from '@/lib/reference-home';
import type { PublishedWritingArticle } from '@/lib/writing';

export function WritingShowcase({
  article,
}: {
  article: PublishedWritingArticle;
}) {
  return (
    <ShowcasePage
      item={article}
      backHref="/#writing-heading"
      backLabel={{ zh: '返回', en: 'Back' }}
      collection={writingPagerItems}
      hrefPrefix="/writing/"
    />
  );
}
