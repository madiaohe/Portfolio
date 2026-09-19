'use client';

import { useSiteLanguage } from '@/lib/hooks/use-site-language';
import type { DetailPagerItem } from '@/lib/reference-home';

/**
 * Previous / next pager shared by the article and showcase templates.
 * The navigation always renders: when a neighbour is missing it shows a
 * disabled label instead of hiding the whole pager.
 */
export function DetailPager({
  collection,
  currentSlug,
  hrefPrefix,
}: {
  collection: readonly DetailPagerItem[];
  currentSlug: string;
  hrefPrefix: string;
}) {
  const { language } = useSiteLanguage();
  const currentIndex = collection.findIndex(
    (entry) => entry.status === 'published' && entry.slug === currentSlug,
  );
  const prev = currentIndex > 0 ? collection[currentIndex - 1] : undefined;
  const next =
    currentIndex >= 0 && currentIndex < collection.length - 1
      ? collection[currentIndex + 1]
      : undefined;

  const prevLabel = language === 'zh' ? '上一篇' : 'Previous';
  const nextLabel = language === 'zh' ? '下一篇' : 'Next';

  return (
    <nav
      className="detail-navigation"
      aria-label={language === 'zh' ? '文章导航' : 'Article navigation'}
    >
      <div className="detail-pager-side detail-pager-prev">
        {prev ? (
          prev.status === 'draft' ? (
            <div className="detail-pager-disabled" aria-disabled="true">
              <span className="detail-pager-label">{prevLabel}</span>
              <span className="detail-pager-title">{prev.title[language]}</span>
            </div>
          ) : (
            <a href={`${hrefPrefix}${prev.slug}`}>
              <span className="detail-pager-label">{prevLabel}</span>
              <span className="detail-pager-title">{prev.title[language]}</span>
            </a>
          )
        ) : (
          <div className="detail-pager-disabled" aria-disabled="true">
            <span className="detail-pager-label">{prevLabel}</span>
          </div>
        )}
      </div>
      <div className="detail-pager-side detail-pager-next">
        {next ? (
          next.status === 'draft' ? (
            <div className="detail-pager-disabled" aria-disabled="true">
              <span className="detail-pager-label">{nextLabel}</span>
              <span className="detail-pager-title">{next.title[language]}</span>
            </div>
          ) : (
            <a href={`${hrefPrefix}${next.slug}`}>
              <span className="detail-pager-label">{nextLabel}</span>
              <span className="detail-pager-title">{next.title[language]}</span>
            </a>
          )
        ) : (
          <div className="detail-pager-disabled" aria-disabled="true">
            <span className="detail-pager-label">{nextLabel}</span>
          </div>
        )}
      </div>
    </nav>
  );
}
