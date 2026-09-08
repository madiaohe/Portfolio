'use client';

import { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { referenceSections } from '../lib/reference-home';

const bannerKey = 'emil-study-banner-dismissed';

export function ReferenceHome() {
  const [bannerHidden, setBannerHidden] = useState(false);
  const [formState, setFormState] = useState<'idle' | 'submitting' | 'preview'>(
    'idle',
  );
  const submitTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    const frame = requestAnimationFrame(() => {
      try {
        setBannerHidden(localStorage.getItem(bannerKey) === 'true');
      } catch {
        // Dismissal still works when browser storage is unavailable.
      }
    });
    return () => {
      cancelAnimationFrame(frame);
      if (submitTimer.current) clearTimeout(submitTimer.current);
    };
  }, []);

  function dismissBanner() {
    setBannerHidden(true);
    try {
      localStorage.setItem(bannerKey, 'true');
    } catch {
      // Storage is an optional enhancement.
    }
  }

  return (
    <div className="minimal-site">
      <aside
        className="minimal-announcement"
        data-hidden={bannerHidden}
        aria-label="Announcement"
        aria-hidden={bannerHidden}
        inert={bannerHidden}
      >
        <div className="minimal-announcement__inner">
          <p>
            <a href="https://aiforui.dev/" target="_blank" rel="noreferrer">
              My new course called aiforui.dev is in early access!
            </a>{' '}
            <span>2 days left to join.</span>
          </p>
          <button type="button" aria-label="Close" onClick={dismissBanner}>
            <Image
              src="/icons/reference-close.svg"
              width={16}
              height={16}
              alt=""
              unoptimized
            />
          </button>
        </div>
      </aside>

      <div className="minimal-shell">
        <header className="minimal-header">
          <Link href="/">Emil Kowalski</Link>
          <span>Design Engineer</span>
        </header>

        <main id="main-content">
          <section aria-labelledby="today-heading">
            <h1 id="today-heading" className="minimal-heading">
              Today
            </h1>
            <p className="minimal-intro">
              I work on the Web team at Linear. I like to build things for
              designers and developers, think deeply about the user interface,
              how it looks, feels, behaves.
            </p>
            <p className="minimal-intro minimal-intro--previous">
              Previously, I worked on the design team at Vercel.
            </p>
          </section>

          {referenceSections.map((section) => (
            <section
              className="minimal-section minimal-directory"
              key={section.title}
              aria-labelledby={`${section.title.toLowerCase()}-heading`}
            >
              <h2
                className="minimal-heading"
                id={`${section.title.toLowerCase()}-heading`}
              >
                {section.title}
              </h2>
              <ul className="minimal-links">
                {section.items.map((item) => (
                  <li key={item.href}>
                    <a
                      className="minimal-link"
                      href={item.href}
                      target={
                        section.title === 'Projects' ? '_blank' : undefined
                      }
                      rel={
                        section.title === 'Projects' ? 'noreferrer' : undefined
                      }
                    >
                      <span>{item.title}</span>
                      <span className="minimal-muted">{item.description}</span>
                    </a>
                  </li>
                ))}
              </ul>
            </section>
          ))}

          <section
            className="minimal-section minimal-newsletter"
            aria-labelledby="newsletter-heading"
          >
            <h2 className="minimal-heading" id="newsletter-heading">
              Newsletter
            </h2>
            <div className="minimal-muted">
              Exclusive, newsletter-only content once a month. No spam, no
              nonsense.
            </div>
            <form
              className="minimal-form"
              aria-busy={formState === 'submitting'}
              onSubmit={(event) => {
                event.preventDefault();
                if (formState === 'submitting') return;
                setFormState('submitting');
                submitTimer.current = setTimeout(
                  () => setFormState('preview'),
                  550,
                );
              }}
            >
              <label className="visually-hidden" htmlFor="newsletter-email">
                Email
              </label>
              <input
                id="newsletter-email"
                name="email"
                type="email"
                autoComplete="email"
                required
                placeholder="Enter your email"
                onChange={() => {
                  if (submitTimer.current) clearTimeout(submitTimer.current);
                  setFormState('idle');
                }}
              />
              <button type="submit" disabled={formState === 'submitting'}>
                <span key={formState}>
                  {formState === 'submitting' ? 'Sending…' : 'Subscribe'}
                </span>
              </button>
            </form>
            {formState === 'preview' && (
              <output className="minimal-form-note">
                This is a local preview. Your email has not been submitted.{' '}
                <a
                  href="https://emilkowal.ski/"
                  target="_blank"
                  rel="noreferrer"
                >
                  Subscribe on Emil’s website.
                </a>
              </output>
            )}
          </section>

          <footer
            className="minimal-section minimal-more"
            aria-labelledby="more-heading"
          >
            <h2 className="minimal-heading" id="more-heading">
              More
            </h2>
            <div className="minimal-muted">
              You can see more of my work on{' '}
              <a
                href="https://twitter.com/emilkowalski"
                target="_blank"
                rel="noreferrer"
              >
                Twitter
              </a>{' '}
              and more of my code on{' '}
              <a
                href="https://github.com/emilkowalski"
                target="_blank"
                rel="noreferrer"
              >
                GitHub
              </a>
              .
            </div>
          </footer>
        </main>
      </div>
    </div>
  );
}
