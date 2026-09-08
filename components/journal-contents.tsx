'use client';

import { useEffect, useRef, useState } from 'react';
import type { JournalHeading } from '../lib/journal';

export function JournalContents({ headings }: { headings: JournalHeading[] }) {
  const [active, setActive] = useState(headings[0]?.id ?? '');
  const mobile = useRef<HTMLDetailsElement>(null);
  const requested = useRef<string | null>(null);

  useEffect(() => {
    let frame = 0;
    const nodes = headings.map(({ id }) => document.getElementById(id));
    const update = () => {
      frame = 0;
      if (requested.current) {
        setActive(requested.current);
        return;
      }
      let id = headings[0]?.id ?? '';
      for (const node of nodes) {
        if (node && node.getBoundingClientRect().top <= 190) id = node.id;
      }
      setActive(id);
    };
    const schedule = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };
    const resume = () => {
      requested.current = null;
      schedule();
    };
    const key = (event: KeyboardEvent) => {
      if (
        [
          'ArrowDown',
          'ArrowUp',
          'PageDown',
          'PageUp',
          'Home',
          'End',
          ' ',
        ].includes(event.key)
      )
        resume();
    };
    const hash = () => {
      const id = window.location.hash.slice(1);
      requested.current = headings.some((heading) => heading.id === id)
        ? id
        : null;
      schedule();
    };
    hash();
    const observer = new ResizeObserver(schedule);
    const article = document.querySelector('.journal-prose');
    if (article) observer.observe(article);
    window.addEventListener('scroll', schedule, { passive: true });
    window.addEventListener('resize', schedule);
    window.addEventListener('hashchange', hash);
    window.addEventListener('wheel', resume, { passive: true });
    window.addEventListener('touchstart', resume, { passive: true });
    window.addEventListener('pointerdown', resume, { passive: true });
    window.addEventListener('keydown', key);
    return () => {
      cancelAnimationFrame(frame);
      observer.disconnect();
      window.removeEventListener('scroll', schedule);
      window.removeEventListener('resize', schedule);
      window.removeEventListener('hashchange', hash);
      window.removeEventListener('wheel', resume);
      window.removeEventListener('touchstart', resume);
      window.removeEventListener('pointerdown', resume);
      window.removeEventListener('keydown', key);
    };
  }, [headings]);

  function links() {
    return headings.map((heading, index) => (
      <a
        key={heading.id}
        href={`#${heading.id}`}
        aria-current={active === heading.id ? 'location' : undefined}
        onClick={() => {
          requested.current = heading.id;
          setActive(heading.id);
          if (mobile.current) mobile.current.open = false;
        }}
      >
        <span aria-hidden="true">{String(index + 1).padStart(2, '0')}</span>
        <span>{heading.label}</span>
      </a>
    ));
  }
  return (
    <aside className="journal-contents">
      <nav className="journal-contents__desktop" aria-label="Article contents">
        <p>On this page</p>
        {links()}
      </nav>
      <details className="journal-contents__mobile" ref={mobile}>
        <summary>
          On this page <span aria-hidden="true">＋</span>
        </summary>
        <nav aria-label="Article contents">{links()}</nav>
      </details>
    </aside>
  );
}
