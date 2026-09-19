import { writingArticles, type LocalizedText } from './writing';
import { projects } from './projects';

type PublishedReferenceItem = {
  status?: 'published';
  href: string;
  title: LocalizedText;
  description?: LocalizedText;
  // Projects use a full date; writing entries currently use a publication month.
  date: string;
};

type DraftReferenceItem = {
  status: 'draft';
  // Draft rows keep source metadata for later, but the homepage ignores links/dates.
  href?: string;
  title: LocalizedText;
  description?: LocalizedText;
  date?: string;
};

type ExternalReferenceItem = {
  status: 'external';
  href: string;
  title: LocalizedText;
  description?: LocalizedText;
  date: string;
};

export type ReferenceItem =
  | PublishedReferenceItem
  | DraftReferenceItem
  | ExternalReferenceItem;

export type DetailPagerItem =
  | { status: 'draft'; title: LocalizedText }
  | { status: 'published'; slug: string; title: LocalizedText };

type ReferenceSection = {
  id: 'projects' | 'writing';
  title: LocalizedText;
  items: readonly ReferenceItem[];
};

// Published project and writing entries link to local detail pages or external
// references. Draft entries stay in the list as non-interactive placeholders.
export const referenceSections: readonly ReferenceSection[] = [
  {
    id: 'projects',
    title: { en: 'Projects', zh: '项目' },
    items: projects.map((project) =>
      project.status === 'draft'
        ? {
            status: 'draft' as const,
            title: project.title,
            date: project.publishedAt,
          }
        : project.status === 'external'
          ? {
              status: 'external' as const,
              href: project.href,
              title: project.title,
              description: project.description,
              date: project.publishedAt,
            }
          : {
              status: 'published' as const,
              href: `/work/${project.slug}`,
              title: project.title,
              description: project.description,
              date: project.publishedAt,
            },
    ),
  },
  {
    id: 'writing',
    title: { en: 'Writing', zh: '文章' },
    items: writingArticles.map((article) =>
      article.status === 'draft'
        ? {
            status: 'draft' as const,
            title: article.title,
          }
        : {
            status: 'published' as const,
            href: `/writing/${article.slug}`,
            title: article.title,
            description: article.description,
            date: article.publishedAt.slice(0, 7),
          },
    ),
  },
];

function toDetailPagerItems(
  items: readonly ReferenceItem[],
  hrefPrefix: string,
): DetailPagerItem[] {
  return items.flatMap((item): DetailPagerItem[] => {
    if (item.status === 'draft') {
      return [{ status: 'draft', title: item.title }];
    }
    if (item.status === 'published' && item.href.startsWith(hrefPrefix)) {
      return [
        {
          status: 'published',
          slug: item.href.slice(hrefPrefix.length),
          title: item.title,
        },
      ];
    }
    return [];
  });
}

export const projectPagerItems = toDetailPagerItems(
  referenceSections.find((section) => section.id === 'projects')?.items ?? [],
  '/work/',
);

export const writingPagerItems = toDetailPagerItems(
  referenceSections.find((section) => section.id === 'writing')?.items ?? [],
  '/writing/',
);
