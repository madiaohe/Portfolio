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
    slug: 'a-place-for-the-everyday',
    title: 'A place for the everyday.',
    description:
      'What a physical dial can teach us about attention, familiarity, and the small decisions inside an interface.',
    category: 'Thinking',
    date: '2026-09-05',
    preview: {
      src: '/media/work-categories/digital-products.png',
      alt: 'Ambient Dial, a silver controller with a black screen and an aluminium dial.',
    },
    image: {
      src: '/media/work-categories/digital-products.png',
      alt: 'A silver Ambient Dial controller with a black display and a circular aluminium control.',
      caption:
        'Ambient Dial — an exploratory product concept, used here to think through a familiar interaction.',
    },
    relatedProject: {
      title: 'Ambient Dial',
      href: '/work/ambient-dial',
      description: 'A physical controller for everyday room adjustments.',
    },
  },
  {
    slug: 'make-it-move-to-understand-it',
    title: 'Make it move to understand it.',
    description:
      'A few notes on using an interactive prototype to ask better questions about a product.',
    category: 'Making',
    date: '2026-09-02',
    preview: {
      src: '/media/work-categories/selected-objects.png',
      alt: 'A product concept with a circular pale surface and a small dark rotary control.',
    },
  },
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
