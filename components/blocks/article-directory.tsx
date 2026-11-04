'use client';

import { useContext } from 'react';
import { ProjectNavigationContext } from '@/lib/project-navigation-context';
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
  clientBackNavigation = false,
  tocLabel,
  items,
  value,
  onChange,
}: {
  backHref: string;
  backLabel: string;
  clientBackNavigation?: boolean;
  tocLabel?: string;
  items: string[];
  value: number;
  onChange: (index: number) => void;
}) {
  const navigate = useContext(ProjectNavigationContext);
  return (
    <div className="article-directory">
      {/* Preserve native navigation by default; prototype notes use the persistent client layout. */}
      <a
        className="inline-flex items-center gap-1 text-[14px] leading-5"
        href={backHref}
        onClick={(event) => {
          if (
            clientBackNavigation &&
            navigate &&
            !event.metaKey &&
            !event.ctrlKey &&
            !event.shiftKey &&
            !event.altKey &&
            event.button === 0
          ) {
            event.preventDefault();
            navigate(backHref);
          }
        }}
      >
        <CornerUpLeft
          size={14}
          strokeWidth={1.35}
          aria-hidden="true"
          className="shrink-0"
        />
        {backLabel}
      </a>
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
