'use client';

import { useEffect, useRef, useState } from 'react';

const chapters = [
  { id: 'overview', number: '01', label: 'Project' },
  { id: 'approach', number: '02', label: 'Problem' },
  { id: 'details', number: '03', label: 'Design decisions' },
  { id: 'reflection', number: '04', label: 'Outcome' },
] as const;

export function ProjectIndex() {
  const [activeChapter, setActiveChapter] = useState<string>('overview');
  const requestedChapter = useRef<string | null>(null);

  useEffect(() => {
    let frame = 0;
    const sections = chapters.map(({ id }) => document.getElementById(id));
    const update = () => {
      frame = 0;
      // Keep an explicit destination selected when a short page cannot scroll
      // its heading all the way to the reading line. Manual scrolling resumes
      // the normal section tracking.
      if (requestedChapter.current) {
        setActiveChapter(requestedChapter.current);
        return;
      }
      const readingLine = Math.min(180, window.innerHeight * 0.25);
      let current: string = chapters[0].id;
      for (const section of sections) {
        if (section && section.getBoundingClientRect().top <= readingLine) {
          current = section.id;
        }
      }
      if (
        window.scrollY > 0 &&
        window.scrollY + window.innerHeight >=
          document.documentElement.scrollHeight - 4
      ) {
        current = chapters[chapters.length - 1].id;
      }
      setActiveChapter(current);
    };
    const schedule = () => {
      if (!frame) frame = window.requestAnimationFrame(update);
    };
    const resumeTracking = () => {
      requestedChapter.current = null;
      schedule();
    };
    const onKeyDown = (event: KeyboardEvent) => {
      if (
        [
          'ArrowUp',
          'ArrowDown',
          'PageUp',
          'PageDown',
          'Home',
          'End',
          ' ',
        ].includes(event.key)
      )
        resumeTracking();
    };
    const onHashChange = () => {
      const id = window.location.hash.slice(1);
      requestedChapter.current = chapters.some((chapter) => chapter.id === id)
        ? id
        : null;
      schedule();
    };
    onHashChange();
    update();
    const observer = new ResizeObserver(schedule);
    sections.forEach((section) => {
      if (section) observer.observe(section);
    });
    window.addEventListener('scroll', schedule, { passive: true });
    window.addEventListener('resize', schedule);
    window.addEventListener('hashchange', onHashChange);
    window.addEventListener('wheel', resumeTracking, { passive: true });
    window.addEventListener('touchstart', resumeTracking, { passive: true });
    window.addEventListener('pointerdown', resumeTracking, { passive: true });
    window.addEventListener('keydown', onKeyDown);
    return () => {
      observer.disconnect();
      window.cancelAnimationFrame(frame);
      window.removeEventListener('scroll', schedule);
      window.removeEventListener('resize', schedule);
      window.removeEventListener('hashchange', onHashChange);
      window.removeEventListener('wheel', resumeTracking);
      window.removeEventListener('touchstart', resumeTracking);
      window.removeEventListener('pointerdown', resumeTracking);
      window.removeEventListener('keydown', onKeyDown);
    };
  }, []);

  return (
    <aside className="project-sidebar">
      <nav className="project-index" aria-label="Project chapters">
        {chapters.map((chapter) => (
          <a
            key={chapter.id}
            href={`#${chapter.id}`}
            onClick={() => {
              requestedChapter.current = chapter.id;
              setActiveChapter(chapter.id);
            }}
            aria-current={activeChapter === chapter.id ? 'location' : undefined}
          >
            <span className="project-index__number">{chapter.number}</span>
            <span>{chapter.label}</span>
            <span className="project-index__marker" aria-hidden="true" />
          </a>
        ))}
      </nav>
    </aside>
  );
}
