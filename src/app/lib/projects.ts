import { projectCategories, projectEntries } from '@/content/projects';
import type { Locale, ProjectType } from '@/content/types';

export interface LocalizedProjectView {
  id: string;
  slug: string;
  type: ProjectType;
  year: string;
  title: string;
  tagline: string;
  category: string;
  categoryKey: string;
  color: string;
  description: string;
  client: string;
  role: string;
  location: string;
  tags: string[];
  body: string[];
  images: string[];
  coverImage: string;
  isNew?: boolean;
}

export function getCategories(locale: Locale) {
  return projectCategories.map((category) => category.label[locale]);
}

export function getCategoryLabel(categoryKey: string, locale: Locale) {
  return projectCategories.find((category) => category.key === categoryKey)?.label[locale] || categoryKey;
}

export function getProjects(locale: Locale): LocalizedProjectView[] {
  return projectEntries.map((project) => ({
    id: project.id,
    slug: project.slug,
    type: project.type,
    year: project.year,
    title: project.title[locale],
    tagline: project.tagline[locale],
    category: getCategoryLabel(project.categoryKey, locale),
    categoryKey: project.categoryKey,
    color: project.color,
    description: project.description[locale],
    client: project.client[locale],
    role: project.role[locale],
    location: project.location,
    tags: project.tags,
    body: project.body[locale],
    images: project.detailImages,
    coverImage: project.coverImage,
    isNew: project.isNew,
  }));
}

export function getProjectById(id: string, locale: Locale) {
  return getProjects(locale).find((project) => project.id === id);
}
