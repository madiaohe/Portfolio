import { journalEntries, type JournalEntry } from './journal-meta';

export type JournalListEntry = Pick<
  JournalEntry,
  'slug' | 'title' | 'category' | 'preview'
> & { href?: string };

// Extra rows are local layout samples only. They do not create article routes.
const samples: {
  slug: string;
  title: string;
  category: JournalEntry['category'];
  image: number;
}[] = [
  {
    slug: 'the-shape-of-a-small-decision',
    title: 'The shape of a small decision.',
    category: 'Thinking',
    image: 0,
  },
  {
    slug: 'learning-through-materials',
    title: 'Learning through materials.',
    category: 'Making',
    image: 0,
  },
  {
    slug: 'objects-that-quietly-belong',
    title: 'Objects that quietly belong.',
    category: 'Notes',
    image: 0,
  },
  {
    slug: 'one-less-step',
    title: 'One less step.',
    category: 'Thinking',
    image: 0,
  },
  {
    slug: 'before-the-first-prototype',
    title: 'Before the first prototype.',
    category: 'Making',
    image: 0,
  },
  {
    slug: 'a-softer-kind-of-light',
    title: 'A softer kind of light.',
    category: 'Notes',
    image: 0,
  },
  {
    slug: 'where-an-interaction-begins',
    title: 'Where an interaction begins.',
    category: 'Thinking',
    image: 0,
  },
  {
    slug: 'working-with-a-constraint',
    title: 'Working with a constraint.',
    category: 'Making',
    image: 0,
  },
  {
    slug: 'noticing-the-ordinary',
    title: 'Noticing the ordinary.',
    category: 'Notes',
    image: 0,
  },
  {
    slug: 'what-a-detail-can-do',
    title: 'What a detail can do.',
    category: 'Thinking',
    image: 0,
  },
  {
    slug: 'from-a-sketch-to-something-real',
    title: 'From a sketch to something real.',
    category: 'Making',
    image: 0,
  },
  {
    slug: 'knowing-when-to-stop',
    title: 'Knowing when to stop.',
    category: 'Notes',
    image: 0,
  },
];

export const journalListEntries: JournalListEntry[] = [
  ...journalEntries.map(({ slug, title, category, preview }) => ({
    slug,
    title,
    category,
    preview,
    href: `/journal/${slug}`,
  })),
  ...samples.map(({ slug, title, category, image }) => ({
    slug,
    title,
    category,
    preview: journalEntries[image].preview,
  })),
];
