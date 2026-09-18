'use client';

import { type PublishedProject } from '@/lib/projects';
import { projectPagerItems } from '@/lib/reference-home';
import { DetailPage } from '@/components/blocks/detail-page';

export function ProjectDetail({ project }: { project: PublishedProject }) {
  return (
    <DetailPage
      item={project}
      backHref="/#projects-heading"
      backLabel={{ zh: '返回', en: 'Back' }}
      tocLabel={{ zh: '项目目录', en: 'Contents' }}
      collection={projectPagerItems}
      hrefPrefix="/work/"
    />
  );
}
