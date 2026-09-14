'use client';

import { projects } from '@/lib/projects';
import { DetailPage } from '@/components/blocks/detail-page';
import type { Project } from '@/lib/projects';

export function ProjectDetail({ project }: { project: Project }) {
  return (
    <DetailPage
      item={project}
      backHref="/#projects-heading"
      backLabel={{ zh: '返回', en: 'Back' }}
      tocLabel={{ zh: '项目目录', en: 'Contents' }}
      collection={projects}
      hrefPrefix="/work/"
    />
  );
}
