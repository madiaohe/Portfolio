'use client';

import { publishedProjects, type PublishedProject } from '@/lib/projects';
import { DetailPage } from '@/components/blocks/detail-page';

export function ProjectDetail({ project }: { project: PublishedProject }) {
  return (
    <DetailPage
      item={project}
      backHref="/#projects-heading"
      backLabel={{ zh: '返回', en: 'Back' }}
      tocLabel={{ zh: '项目目录', en: 'Contents' }}
      collection={publishedProjects}
      hrefPrefix="/work/"
    />
  );
}
