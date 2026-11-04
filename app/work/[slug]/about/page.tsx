import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { getProject, publishedProjects } from '@/lib/projects';

type Props = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return publishedProjects
    .filter((project) => project.prototype)
    .map(({ slug }) => ({ slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const project = getProject((await params).slug);
  if (!project?.prototype) return { title: 'Project not found — Xu Xianyu' };
  return {
    title: `${project.title.en} — Project notes — Xu Xianyu`,
    description: project.description?.en,
    robots: { index: false, follow: false },
  };
}

export default async function ProjectAboutPage({ params }: Props) {
  const project = getProject((await params).slug);
  if (!project?.prototype) notFound();
  // The shared layout supplies both views so switching never remounts the iframe.
  return null;
}
