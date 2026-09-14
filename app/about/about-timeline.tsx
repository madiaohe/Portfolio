'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useEffect, useRef } from 'react';
import { experiences, type ExperienceProject } from '@/lib/about-experiences';

function TimelineNode({ company = false }: { company?: boolean }) {
  return (
    <span
      className={`about-node about-node--${company ? 'company' : 'project'}`}
      aria-hidden="true"
    >
      <span className="about-node__halo" />
    </span>
  );
}

function ProjectDetail({ project }: { project: ExperienceProject }) {
  return (
    <li className="about-project" data-timeline-node>
      <TimelineNode />
      <details>
        <summary
          className="about-project__summary"
          aria-label={`${project.name}: project details`}
        >
          <Image
            className="about-project__thumbnail"
            src={project.image}
            alt=""
            width={76}
            height={76}
            loading="lazy"
          />
          <span className="about-project__text">
            <span className="about-project__heading">
              <span>{project.name}</span>
              <span className="about-project__year">{project.year}</span>
            </span>
            <span className="about-project__description">
              {project.summary}
            </span>
            <span className="about-project__action">
              <span className="about-project__open-label">Explore project</span>
              <span className="about-project__close-label">Close project</span>
            </span>
          </span>
        </summary>
        <div className="about-project__detail">
          <dl>
            <div>
              <dt>The context</dt>
              <dd>{project.context}</dd>
            </div>
            <div>
              <dt>My contribution</dt>
              <dd>{project.contribution}</dd>
            </div>
            <div>
              <dt>The outcome</dt>
              <dd>{project.outcome}</dd>
            </div>
          </dl>
          <figure>
            <Image
              src={project.image}
              alt={project.imageAlt}
              width={1254}
              height={1254}
              sizes="(max-width: 760px) 80vw, 540px"
              loading="lazy"
            />
            <figcaption>Concept imagery / Illustrative project</figcaption>
          </figure>
          {project.id === 'ambient-dial' ? (
            <Link href="/work/ambient-dial" className="about-project__case-link">
              Read the full case study <span aria-hidden="true">↗</span>
            </Link>
          ) : null}
        </div>
      </details>
    </li>
  );
}

export function AboutTimeline() {
  const timelineRef = useRef<HTMLDivElement>(null);
  const railRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const timeline = timelineRef.current;
    const rail = railRef.current;
    if (!timeline || !rail) return;

    const nodes = Array.from(
      timeline.querySelectorAll<HTMLElement>('[data-timeline-node]'),
    );
    const motionPreference = window.matchMedia(
      '(prefers-reduced-motion: reduce)',
    );
    let frame = 0;
    let scrolled = false;
    const crossedSides = new Map<HTMLElement, boolean>();
    const runningAnimations = new Set<Animation>();
    const nodeAnimations = new Map<HTMLElement, Animation[]>();

    const pulseNode = (node: HTMLElement, marker: HTMLElement) => {
      nodeAnimations.get(node)?.forEach((animation) => animation.cancel());
      const animations: Animation[] = [];
      const animate = (
        element: HTMLElement | null,
        keyframes: Keyframe[],
        duration: number,
      ) => {
        if (!element) return;
        const animation = element.animate(keyframes, {
          duration,
          easing: 'cubic-bezier(0.22, 1, 0.36, 1)',
        });
        animations.push(animation);
        runningAnimations.add(animation);
        animation.onfinish = animation.oncancel = () =>
          runningAnimations.delete(animation);
      };
      const company = node.hasAttribute('data-experience');
      animate(
        marker,
        [
          { transform: 'scale(1)', offset: 0 },
          { transform: `scale(${company ? 1.65 : 2.4})`, offset: 0.24 },
          { transform: 'scale(0.9)', offset: 0.58 },
          { transform: 'scale(1)', offset: 1 },
        ],
        720,
      );
      animate(
        marker.querySelector('.about-node__halo'),
        [
          { transform: 'scale(0.65)', opacity: 0.65 },
          { transform: `scale(${company ? 3.2 : 4})`, opacity: 0 },
        ],
        950,
      );
      const title =
        node.querySelector<HTMLElement>(
          company ? '.about-experience__title' : '.about-project__heading',
        ) ?? node.querySelector<HTMLElement>(':scope > p');
      if (title) {
        const color = getComputedStyle(title).color;
        animate(
          title,
          [
            { transform: 'translateX(0)', color, offset: 0 },
            { transform: 'translateX(6px)', color: '#e94f18', offset: 0.24 },
            { transform: 'translateX(0)', color, offset: 1 },
          ],
          900,
        );
      }
      animate(
        node.querySelector('.about-experience__date'),
        [{ opacity: 1 }, { opacity: 0.5, offset: 0.2 }, { opacity: 1 }],
        650,
      );
      if (!company) {
        animate(
          node.querySelector('.about-project__thumbnail'),
          [
            { transform: 'translateY(0) rotate(0deg)' },
            { transform: 'translateY(-5px) rotate(-4deg)', offset: 0.28 },
            { transform: 'translateY(0) rotate(0deg)' },
          ],
          800,
        );
      }
      nodeAnimations.set(node, animations);
    };

    const update = () => {
      frame = 0;
      const animateCrossings = scrolled && !motionPreference.matches;
      scrolled = false;
      if (motionPreference.matches) {
        runningAnimations.forEach((animation) => animation.cancel());
        runningAnimations.clear();
      }
      const readingLine = window.innerHeight * 0.64;
      const endMarker = timeline.querySelector<HTMLElement>(
        '.about-ending .about-node',
      );
      if (endMarker) {
        const endBounds = endMarker.getBoundingClientRect();
        rail.style.height = `${Math.max(0, endBounds.top + endBounds.height / 2 - rail.getBoundingClientRect().top)}px`;
      }
      const bounds = rail.getBoundingClientRect();
      const progress = Math.min(
        Math.max(readingLine - bounds.top, 0),
        bounds.height,
      );
      const fill = motionPreference.matches ? bounds.height : progress;
      rail.style.setProperty(
        '--timeline-progress',
        String(fill / Math.max(bounds.height, 1)),
      );
      rail.style.setProperty('--timeline-head', `${fill}px`);

      for (const node of nodes) {
        const marker = node.querySelector<HTMLElement>('.about-node');
        if (!marker) continue;
        const position = marker.getBoundingClientRect();
        const center = position.top + position.height / 2;
        const passed = center <= readingLine;
        const previousSide = crossedSides.get(node);
        // A small dead zone prevents repeated pulses from tiny scroll reversals.
        const crossed =
          previousSide === undefined ||
          (previousSide ? center > readingLine + 4 : center < readingLine - 4);
        if (!animateCrossings || crossed) {
          crossedSides.set(node, passed);
          if (
            !motionPreference.matches &&
            ((previousSide === undefined && passed) ||
              (animateCrossings &&
                previousSide !== undefined &&
                previousSide !== passed)) &&
            center > 0 &&
            center < window.innerHeight
          ) {
            pulseNode(node, marker);
          }
        }
        node.dataset.passed = String(motionPreference.matches || passed);
      }

    };

    const scheduleUpdate = () => {
      if (!frame) frame = window.requestAnimationFrame(update);
    };
    const handleScroll = () => {
      scrolled = true;
      scheduleUpdate();
    };
    const observer = new ResizeObserver(scheduleUpdate);
    observer.observe(timeline);
    window.addEventListener('scroll', handleScroll, { passive: true });
    window.addEventListener('resize', scheduleUpdate);
    motionPreference.addEventListener('change', scheduleUpdate);
    update();

    return () => {
      observer.disconnect();
      window.cancelAnimationFrame(frame);
      runningAnimations.forEach((animation) => animation.cancel());
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', scheduleUpdate);
      motionPreference.removeEventListener('change', scheduleUpdate);
    };
  }, []);

  return (
    <main className="about-page" id="about-top">
      <div className="about-layout">
        <div className="about-story">
          <div className="about-timeline" ref={timelineRef}>
            <div className="about-rail" ref={railRef} aria-hidden="true">
              <span className="about-rail__fill" />
              <span className="about-rail__head" />
            </div>
            <ol className="about-experiences">
              {experiences.map((experience) => (
                <li
                  className="about-experience"
                  id={experience.id}
                  key={experience.id}
                  data-experience
                  data-timeline-node
                >
                  <div className="about-experience__date">
                    {experience.end === 'Present' ? (
                      <span>NOW</span>
                    ) : (
                      <time dateTime={experience.end}>{experience.end}</time>
                    )}
                  </div>
                  <TimelineNode company />
                  <article aria-labelledby={`${experience.id}-title`}>
                    <header>
                      <div className="about-experience__title">
                        <h2 id={`${experience.id}-title`}>
                          {experience.company}
                        </h2>
                        {experience.end === 'Present' ? (
                          <span className="about-current">Current</span>
                        ) : null}
                      </div>
                      <p className="about-experience__role">
                        {experience.role}
                      </p>
                    </header>
                    <p className="about-experience__introduction">
                      {experience.introduction}
                    </p>
                    <div className="about-experience__responsibilities">
                      <h3>My focus</h3>
                      <p>{experience.responsibilities}</p>
                    </div>
                    {experience.projects.length ? (
                      <ul
                        className="about-projects"
                        aria-label={`Projects at ${experience.company}`}
                      >
                        {experience.projects.map((project) => (
                          <ProjectDetail key={project.id} project={project} />
                        ))}
                      </ul>
                    ) : null}
                  </article>
                </li>
              ))}
            </ol>
            <div className="about-ending" data-timeline-node>
              <TimelineNode />
              <p>Still curious. Still making.</p>
              <Link href="/contact">Let’s start a conversation</Link>
            </div>
          </div>
          <footer className="about-bottom">
            <span>Experience is a work in progress.</span>
            <a href="#about-top">Back to top</a>
          </footer>
        </div>
      </div>
    </main>
  );
}
