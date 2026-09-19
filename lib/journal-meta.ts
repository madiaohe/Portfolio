export type JournalEntry = {
  slug: string;
  title: string;
  description: string;
  category: 'Thinking' | 'Making' | 'Notes';
  date: string;
  preview: { src: string; alt: string };
  image?: { src: string; alt: string; caption: string };
  relatedProject?: { title: string; href: string; description: string };
};

// Preview content. Replace these entries and the corresponding Markdown before publishing.
export const journalEntries: JournalEntry[] = [
  {
    slug: 'leave-a-little-space',
    title: 'Leave a little space.',
    description:
      'On giving an object, a sentence, or an idea enough room to be noticed.',
    category: 'Notes',
    date: '2026-08-28',
    preview: {
      src: '/media/work-categories/experiments.png',
      alt: 'A softly illuminated sculptural lamp, surrounded by open space.',
    },
  },
];

export function journalDate(date: string) {
  return new Intl.DateTimeFormat('en-GB', {
    day: '2-digit',
    month: 'short',
    year: 'numeric',
    timeZone: 'UTC',
  }).format(new Date(`${date}T00:00:00Z`));
}
