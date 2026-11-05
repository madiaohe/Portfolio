import { markdownHeadings as articleHeadings } from './markdown-headings';
import space from '../content/journal/leave-a-little-space.md?raw';
import { journalEntries } from './journal-meta';

export {
  markdownHeadings as articleHeadings,
  type MarkdownHeading as JournalHeading,
} from './markdown-headings';

const bodies: Record<string, string> = {
  'leave-a-little-space': space,
};

export function getJournalArticle(slug: string) {
  const entry = journalEntries.find((item) => item.slug === slug);
  if (!entry || !bodies[slug]) return undefined;
  const body = bodies[slug];
  return {
    ...entry,
    body,
    headings: articleHeadings(body),
    readingMinutes: Math.max(
      1,
      Math.ceil(body.trim().split(/\s+/).length / 220),
    ),
  };
}
