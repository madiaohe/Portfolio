import Link from 'next/link';
import { AmbientDialCover } from './ambient-dial-cover';

const projects = [
  {
    id: 'ambient-dial',
    title: 'Ambient Dial',
    tag: 'NEW',
  },
  {
    id: 'resonance-one',
    title: 'Resonance One',
    tag: 'NEW',
  },
  {
    id: 'fold-light',
    title: 'Fold Light',
    tag: 'OBJECT',
  },
  {
    id: 'field-console',
    title: 'Field Console',
    tag: 'SYSTEM',
  },
  {
    id: 'air-index',
    title: 'Air Index',
    tag: 'NEW',
  },
  {
    id: 'field-note',
    title: 'Field Note',
    tag: 'NEW',
  },
  {
    id: 'tempo-clock',
    title: 'Tempo Clock',
    tag: 'OBJECT',
  },
  {
    id: 'beam-fold',
    title: 'Beam Fold',
    tag: 'CONCEPT',
  },
] as const;

export function WorkMatrix() {
  return (
    <div className="work-matrix" aria-label="Project matrix">
      <div className="work-matrix__projects">
        {projects.map((project) => (
          <article
            key={project.id}
            className={`work-card${project.id === 'ambient-dial' ? ' work-card--interactive' : ''}`}
          >
            {project.id === 'ambient-dial' && <AmbientDialCover />}
            <span className="work-card__tag">{project.tag}</span>
            <h3>
              {project.id === 'ambient-dial' ? (
                <Link className="work-card__link" href="/work/ambient-dial">
                  {project.title}
                  <span className="work-card__arrow" aria-hidden="true">
                    ↗
                  </span>
                </Link>
              ) : (
                project.title
              )}
            </h3>
          </article>
        ))}
      </div>
    </div>
  );
}
