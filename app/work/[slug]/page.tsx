import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { ProjectDetail } from './project-detail';
import { ProjectShowcase } from './project-showcase';
import { getProject, publishedProjects } from '../../../lib/projects';
import '../../minimal.css';
import '../../detail.css';
import '../../showcase.css';

type Props = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return publishedProjects.map(({ slug }) => ({ slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const project = getProject(slug);
  if (!project) return { title: 'Project not found — Xu Xianyu' };
  return {
    title: `${project.title.en} — Xu Xianyu`,
    description: project.description?.en ?? '',
    robots: { index: false, follow: false },
  };
}

export default async function ProjectPage({ params }: Props) {
  const { slug } = await params;
  const project = getProject(slug);
  if (!project) notFound();
  return project.layout === 'showcase' ? (
    <ProjectShowcase project={project} />
  ) : (
    <ProjectDetail project={project} />
  );
}
