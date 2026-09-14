import Link from 'next/link';
import { CornerUpLeft } from 'lucide-react';
import { HookSidebar } from '@/components/ui/hook-sidebar';

/**
 * Reusable left sidebar for an article page: a back link plus a
 * scroll-linked section directory (HookSidebar). The directory only
 * appears on wide viewports; the back link is always visible.
 */
export function ArticleDirectory({
  backHref,
  backLabel,
  tocLabel,
  items,
  value,
  onChange,
}: {
  backHref: string;
  backLabel: string;
  tocLabel?: string;
  items: string[];
  value: number;
  onChange: (index: number) => void;
}) {
  return (
    <div className="article-directory">
      <Link
        className="inline-flex items-center gap-1 text-[14px] leading-5 text-muted-foreground transition-colors hover:text-foreground"
        href={backHref}
      >
        <CornerUpLeft
          size={14}
          strokeWidth={1.35}
          aria-hidden="true"
          className="shrink-0"
        />
        {backLabel}
      </Link>
      <div className="article-directory__toc mt-6 hidden min-[1081px]:block">
        <HookSidebar
          items={items}
          value={value}
          onChange={onChange}
          aria-label={tocLabel}
        />
      </div>
    </div>
  );
}
