import type { ReactNode } from 'react';
import { getProject } from '@/lib/projects';
import { ProjectShowcase } from './project-showcase';
import { ProjectDetail } from './project-detail';
import { ProjectExperience } from './project-experience';
import '../../minimal.css';
import '../../detail.css';
import '../../showcase.css';
import './project-experience.css';

export default async function ProjectLayout({
  children,
  params,
}: {
  children: ReactNode;
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const project = getProject(slug);
  if (!project?.prototype) return children;
  return (
    <ProjectExperience
      slug={slug}
      title={project.title}
      prototype={project.prototype}
    >
      {project.layout === 'showcase' ? (
        <ProjectShowcase project={project} />
      ) : (
        <ProjectDetail project={project} />
      )}
    </ProjectExperience>
  );
}
