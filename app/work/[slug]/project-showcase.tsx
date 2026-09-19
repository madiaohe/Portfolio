'use client';

import { ShowcasePage } from '@/components/blocks/showcase-page';
import { projectPagerItems } from '@/lib/reference-home';
import type { PublishedProject } from '@/lib/projects';

export function ProjectShowcase({ project }: { project: PublishedProject }) {
  return (
    <ShowcasePage
      item={project}
      backHref="/#projects-heading"
      backLabel={{ zh: '返回', en: 'Back' }}
      tocLabel={{ zh: '章节', en: 'Chapters' }}
      collection={projectPagerItems}
      hrefPrefix="/work/"
    />
  );
}
