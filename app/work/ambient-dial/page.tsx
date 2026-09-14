import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { ProjectIndex } from './project-index';
import './project.css';

export const metadata: Metadata = {
  title: 'Ambient Dial — XIANYU',
  description:
    'A physical controller for everyday room adjustments. An independent product and interaction concept.',
};

const image = '/media/work-categories/digital-products.png';

// The pilot stays self-contained until its layout and real project content settle.
export default function AmbientDialPage() {
  return (
    <main className="project-page" id="project-top">
      <ProjectIndex />
      <div className="project-story">
        <section
          className="project-chapter project-intro"
          id="overview"
          aria-labelledby="project-title"
        >
          <p className="project-label">01 — Project</p>
          <h1 id="project-title">Ambient Dial</h1>
          <p className="project-deck">
            A physical controller for everyday room adjustments.
          </p>
          <ul className="project-meta" aria-label="Project information">
            <li>Product & interaction</li>
            <li>Independent concept</li>
            <li>2025</li>
          </ul>
          <figure className="project-cover">
            <div className="project-cover__image">
              <Image
                src={image}
                alt="Ambient Dial concept: a silver room controller with a dark display and a physical aluminium dial."
                width={1254}
                height={1254}
                fetchPriority="high"
                unoptimized
              />
            </div>
            <figcaption>Product concept — form and primary control</figcaption>
          </figure>
        </section>

        <section
          className="project-chapter"
          id="approach"
          aria-labelledby="problem-title"
        >
          <p className="project-label">02 — Problem</p>
          <h2 id="problem-title">A simple adjustment takes too many steps.</h2>
          <p className="project-copy">
            Room controls are often spread across apps and menus. This concept
            asks whether one physical control could make the most frequent
            adjustment easier to find and understand.
          </p>
        </section>

        <section
          className="project-chapter"
          id="details"
          aria-labelledby="decisions-title"
        >
          <p className="project-label">03 — Design decisions</p>
          <h2 id="decisions-title">Put the primary action in your hand.</h2>
          <p className="project-copy">
            A physical dial gives the main action a consistent place. The
            display responds nearby, keeping the adjustment and its feedback
            together.
          </p>
          <figure className="project-detail">
            <div className="project-detail__image">
              <Image
                src={image}
                alt="Detail of the brushed aluminium dial, directly below the controller’s display."
                width={1254}
                height={1254}
                loading="lazy"
                unoptimized
              />
            </div>
            <figcaption>Physical control and immediate feedback</figcaption>
          </figure>
        </section>

        <section
          className="project-chapter"
          id="reflection"
          aria-labelledby="outcome-title"
        >
          <p className="project-label">04 — Outcome</p>
          <h2 id="outcome-title">A concept ready for the next question.</h2>
          <p className="project-copy">
            The direction brings a compact form, a physical control and a
            focused display together. It remains a concept: the next step is to
            test whether people understand what the dial changes and how to undo
            an adjustment.
          </p>
          <p className="project-note">
            Illustrative concept study. Product imagery and narrative are
            exploratory.
          </p>
        </section>

        <footer className="project-ending">
          <Link href="/#work">All work</Link>
          <a href="#project-top">Back to top</a>
        </footer>
      </div>
    </main>
  );
}
