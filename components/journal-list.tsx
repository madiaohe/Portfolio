'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';
import type { JournalListEntry } from '../lib/journal-list-entries';

export function JournalList({ entries }: { entries: JournalListEntry[] }) {
  const [activeSlug, setActiveSlug] = useState(entries[0]?.slug);
  const activeImage = entries.find((entry) => entry.slug === activeSlug)
    ?.preview.src;
  const previews = Array.from(
    new Map(
      entries.map((entry) => [entry.preview.src, entry.preview]),
    ).values(),
  );

  return (
    <main className="journal-index" id="journal-top">
      <h1 className="visually-hidden">Journal</h1>
      <div className="journal-preview">
        <div className="journal-preview__frame">
          {previews.map((preview, index) => (
            <Image
              key={preview.src}
              className="journal-preview__image"
              data-active={activeImage === preview.src}
              src={preview.src}
              alt={preview.alt}
              aria-hidden={activeImage !== preview.src}
              width={1254}
              height={1254}
              unoptimized
              loading="eager"
              fetchPriority={index === 0 ? 'high' : 'low'}
              draggable="false"
            />
          ))}
        </div>
      </div>
      <ol className="journal-rows" aria-label="Articles">
        {entries.map((entry) => {
          const content = (
            <>
              <span className="journal-row__title">{entry.title}</span>
              <span className="journal-row__tag">{entry.category}</span>
            </>
          );
          const props = {
            className: 'journal-row',
            'data-active': activeSlug === entry.slug,
            onPointerEnter: () => setActiveSlug(entry.slug),
            onFocus: () => setActiveSlug(entry.slug),
          };
          return (
            <li key={entry.slug}>
              {entry.href ? (
                <Link {...props} href={entry.href}>
                  {content}
                </Link>
              ) : (
                <button
                  {...props}
                  type="button"
                  onClick={() => setActiveSlug(entry.slug)}
                  aria-label={`${entry.title} ${entry.category}. Preview image.`}
                >
                  {content}
                </button>
              )}
            </li>
          );
        })}
      </ol>
    </main>
  );
}
