# Journal

The Journal is local preview content. All three articles are illustrative samples, with a visible sample notice on each detail page. Replace both the writing and the notices before treating the articles as published personal writing.

## Editing articles

- Metadata and newest-first order: `lib/journal-meta.ts`.
- Markdown bodies: `content/journal/*.md`.
- Body imports and slug mapping: `lib/journal.ts`.
- Index: `app/journal/page.tsx`.
- Additional list-only sample rows: `lib/journal-list-entries.ts`. The index has 15 rows: 3 existing article links and 12 image-preview buttons, with no additional detail routes. Images are reused and deduplicated in the preview stage.
- Detail route: `app/journal/[slug]/page.tsx`.
- Shared Journal styles: `app/journal/journal.css`.

To add an article, create its Markdown file, add metadata with a unique URL-safe slug, and import/map the body in `lib/journal.ts`. Add the newest entry first. Previous/next links follow this order, with an index link at each end instead of looping.

Use `## Plain section titles` for heading anchors. The reading layout is a centered 640px column with 16px body text and compact headings. There is no visible table of contents. Clicking a section heading updates its URL hash. Regular Markdown paragraphs, emphasis, links, lists, blockquotes, images and code blocks are supported. Raw HTML and MDX components are not enabled.

Article pages use a small XIANYU / Journal header in normal document flow, rather than the global fixed navigation. Metadata and the sample notice appear at the end. The index retains its own fixed-image layout.

Required `preview` metadata supplies the pinned index image for each entry. Hovering or focusing a row crossfades to its preview, which remains selected on pointer exit. Rows contain only the title and category. The centered index column is 640px wide, with 15px medium-weight titles, 11px uppercase monospace tags, and 40px rows without dividers. On small screens titles are 14px, tags are 10px, and rows retain a 44px touch target. Long titles truncate to keep each entry on one line. The index owns its scroll container; a sticky opaque image region and scroll padding keep rows and focused links below the image. Optional `image` metadata inserts a supporting figure after the first section, before the second heading. Omit it for text-only articles. It is not a hero image. Optional `relatedProject` adds a link to a portfolio case. Reading time is estimated from body word count at 220 words per minute, with a minimum of one minute.

Routes include article titles and descriptions, support direct loading, and return 404 for unknown slugs. No CMS, search, analytics, signup or external publishing has been added.

## Validation

- TypeScript, lint and the production build passed.
- Local HTTP checks: index and all three articles return 200; an unknown slug returns 404.
- Reading-layout update: native browser checks covered desktop, 320px and 390px layouts, section anchors, next article, and return-to-index navigation. Evidence and comparison limits are recorded in `design-qa.md`.
