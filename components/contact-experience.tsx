'use client';

import { useCallback, useEffect, useMemo, useRef, useState } from 'react';

const ROW_HEIGHT = 22;
const LABEL_WIDTH = 260;
const COLUMN_GAP = 18;
const AVOIDANCE_RADIUS = 120;
const MAX_DISPLACEMENT = 55;
const SCROLL_EASING = 0.08;
const AVOIDANCE_EASING = 0.08;
const ICON_SCROLL_STEP = 72;

type ContactRow = {
  label: string;
  value?: string;
  type: 'text' | 'clock' | 'link';
  href?: string;
};

const CONTACT_ROWS: ContactRow[] = [
  {
    label: 'Location',
    value: 'China / Remote-friendly',
    type: 'text',
  },
  {
    label: '',
    value: 'Currently running an independent design practice',
    type: 'text',
  },
  {
    label: 'Current Time',
    type: 'clock',
  },
  {
    label: 'Email',
    value: 'hello@example.com',
    type: 'link',
    href: 'mailto:hello@example.com',
  },
  {
    label: 'Project Enquiries',
    value: 'projects@example.com',
    type: 'link',
    href: 'mailto:projects@example.com',
  },
  {
    label: 'Phone',
    value: '+86 138 0000 0000',
    type: 'link',
    href: 'tel:+8613800000000',
  },
  {
    label: 'Social',
    value: 'Instagram',
    type: 'link',
    href: 'https://instagram.com/',
  },
  {
    label: '',
    value: 'LinkedIn',
    type: 'link',
    href: 'https://linkedin.com/',
  },
];

function formatTime() {
  const now = new Date();
  const hours = String(now.getHours()).padStart(2, '0');
  const minutes = String(now.getMinutes()).padStart(2, '0');
  const seconds = String(now.getSeconds()).padStart(2, '0');
  const offsetInMinutes = -now.getTimezoneOffset();
  const sign = offsetInMinutes >= 0 ? '+' : '-';
  const offsetHours = Math.floor(Math.abs(offsetInMinutes) / 60);
  const offsetMinutes = Math.abs(offsetInMinutes) % 60;
  const offset = offsetMinutes
    ? `${offsetHours}:${String(offsetMinutes).padStart(2, '0')}`
    : String(offsetHours);

  return `${hours}:${minutes}:${seconds} (GMT${sign}${offset})`;
}

function wrap(value: number, min: number, max: number) {
  const range = max - min;
  return ((((value - min) % range) + range) % range) + min;
}

function getAvoidanceFactor(distance: number) {
  const absoluteDistance = Math.abs(distance);

  if (absoluteDistance >= AVOIDANCE_RADIUS) {
    return 0;
  }

  return 0.5 * (1 + Math.cos(Math.PI * (absoluteDistance / AVOIDANCE_RADIUS)));
}

function PersonIcon() {
  return (
    <svg
      width="44"
      height="62"
      viewBox="0 0 40 56"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <circle cx="20" cy="8" r="6" fill="currentColor" />
      <path d="M14 16h12v18H14z" fill="currentColor" />
      <path d="m14 18-8 10 3 2 5-8M26 18l8 10-3 2-5-8" fill="currentColor" />
      <path
        d="M14 34h5v16h-5zM21 34h5v16h-5zM7 26h4v5H7z"
        fill="currentColor"
      />
    </svg>
  );
}

function EnvelopeIcon() {
  return (
    <svg width="44" height="62" viewBox="0 0 40 56" fill="none">
      <rect x="4" y="14" width="32" height="26" rx="2" fill="currentColor" />
      <path d="m7 17 13 11 13-11" stroke="black" strokeWidth="2.4" />
      <path d="m7 37 10-9M33 37l-10-9" stroke="black" strokeWidth="2" />
    </svg>
  );
}

function PhoneIcon() {
  return (
    <svg width="44" height="62" viewBox="0 0 40 56" fill="none">
      <path
        d="M11 8h7l3 12-5 3c2 7 6 11 13 14l3-5 8 5c-1 7-5 11-11 10C15 44 6 35 3 21 2 14 5 9 11 8Z"
        fill="currentColor"
      />
    </svg>
  );
}

function PinIcon() {
  return (
    <svg width="44" height="62" viewBox="0 0 40 56" fill="none">
      <path
        d="M20 4C11.7 4 5 10.7 5 19c0 12 15 32 15 32s15-20 15-32C35 10.7 28.3 4 20 4Z"
        fill="currentColor"
      />
      <circle cx="20" cy="19" r="6" fill="black" />
    </svg>
  );
}

function GlobeIcon() {
  return (
    <svg width="44" height="62" viewBox="0 0 40 56" fill="none">
      <circle cx="20" cy="28" r="17" fill="currentColor" />
      <path
        d="M4 28h32M20 11c5 5 7 10.7 7 17s-2 12-7 17c-5-5-7-10.7-7-17s2-12 7-17Z"
        stroke="black"
        strokeWidth="2"
      />
    </svg>
  );
}

function MessageIcon() {
  return (
    <svg width="44" height="62" viewBox="0 0 40 56" fill="none">
      <path d="M4 9h32v30H17L8 48v-9H4V9Z" fill="currentColor" />
      <circle cx="12" cy="24" r="2" fill="black" />
      <circle cx="20" cy="24" r="2" fill="black" />
      <circle cx="28" cy="24" r="2" fill="black" />
    </svg>
  );
}

function SparkIcon() {
  return (
    <svg width="44" height="62" viewBox="0 0 40 56" fill="none">
      <path
        d="m20 3 4.2 15.8L37 10l-8.8 12.8L44 27l-15.8 4.2L37 44l-12.8-8.8L20 51l-4.2-15.8L3 44l8.8-12.8L-4 27l15.8-4.2L3 10l12.8 8.8L20 3Z"
        fill="currentColor"
      />
    </svg>
  );
}

function EyeIcon() {
  return (
    <svg width="44" height="62" viewBox="0 0 40 56" fill="none">
      <path
        d="M1 28S8 15 20 15s19 13 19 13-7 13-19 13S1 28 1 28Z"
        fill="currentColor"
      />
      <circle cx="20" cy="28" r="7" fill="black" />
      <circle cx="20" cy="28" r="3.5" fill="currentColor" />
    </svg>
  );
}

const CENTER_ICONS = [
  PersonIcon,
  EnvelopeIcon,
  PhoneIcon,
  PinIcon,
  GlobeIcon,
  MessageIcon,
  SparkIcon,
  EyeIcon,
] as const;

export function ContactExperience() {
  const viewportRef = useRef<HTMLDivElement>(null);
  const listRef = useRef<HTMLDivElement>(null);
  const labelRefs = useRef<(HTMLDivElement | null)[]>([]);
  const valueRefs = useRef<(HTMLDivElement | null)[]>([]);
  const scrollPosition = useRef({ current: 0, target: 0 });
  const displacements = useRef(new Float64Array(CONTACT_ROWS.length));
  const touchPosition = useRef<number | null>(null);
  const activeIconRef = useRef(0);
  const [time, setTime] = useState('--:--:--');
  const [activeIcon, setActiveIcon] = useState(0);
  const contentHeight = CONTACT_ROWS.length * ROW_HEIGHT;

  const renderedRows = useMemo(
    () =>
      CONTACT_ROWS.map((row) => ({
        ...row,
        renderedValue: row.type === 'clock' ? time : row.value,
      })),
    [time],
  );

  const moveBy = useCallback((distance: number) => {
    scrollPosition.current.target -= distance;
  }, []);

  useEffect(() => {
    const updateTime = () => setTime(formatTime());
    const initialFrame = window.requestAnimationFrame(updateTime);
    const timer = window.setInterval(updateTime, 1000);

    return () => {
      window.cancelAnimationFrame(initialFrame);
      window.clearInterval(timer);
    };
  }, []);

  useEffect(() => {
    const viewport = viewportRef.current;
    const list = listRef.current;

    if (!viewport || !list) {
      return;
    }

    const prefersReducedMotion = window.matchMedia(
      '(prefers-reduced-motion: reduce)',
    ).matches;
    const initialPosition = window.innerHeight * 0.62;
    scrollPosition.current = {
      current: initialPosition,
      target: initialPosition,
    };

    const onWheel = (event: WheelEvent) => {
      moveBy(event.deltaY * 0.5);
    };

    const onTouchStart = (event: TouchEvent) => {
      touchPosition.current = event.touches[0]?.clientY ?? null;
    };

    const onTouchMove = (event: TouchEvent) => {
      const nextPosition = event.touches[0]?.clientY;

      if (touchPosition.current === null || nextPosition === undefined) {
        return;
      }

      moveBy(touchPosition.current - nextPosition);
      touchPosition.current = nextPosition;
    };

    const onTouchEnd = () => {
      touchPosition.current = null;
    };

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'ArrowDown') {
        moveBy(ROW_HEIGHT);
      } else if (event.key === 'ArrowUp') {
        moveBy(-ROW_HEIGHT);
      } else if (event.key === 'PageDown' || event.key === ' ') {
        moveBy(ROW_HEIGHT * 3);
      } else if (event.key === 'PageUp') {
        moveBy(-ROW_HEIGHT * 3);
      }
    };

    let frame = 0;
    const animate = () => {
      const scroll = scrollPosition.current;
      const viewportHeight = window.innerHeight;
      const easing = prefersReducedMotion ? 1 : SCROLL_EASING;
      scroll.current += (scroll.target - scroll.current) * easing;

      const wrappedY = wrap(scroll.current, -contentHeight, viewportHeight);
      list.style.transform = `translate3d(${-LABEL_WIDTH - COLUMN_GAP / 2}px, ${wrappedY}px, 0)`;

      const iconProgress = Math.round(
        (initialPosition - scroll.current) / ICON_SCROLL_STEP,
      );
      const nextIcon = wrap(iconProgress, 0, CENTER_ICONS.length);

      if (nextIcon !== activeIconRef.current) {
        activeIconRef.current = nextIcon;
        setActiveIcon(nextIcon);
      }

      for (let index = 0; index < CONTACT_ROWS.length; index += 1) {
        const rowCenter = wrappedY + index * ROW_HEIGHT + ROW_HEIGHT / 2;
        const targetDisplacement = prefersReducedMotion
          ? 0
          : getAvoidanceFactor(rowCenter - viewportHeight / 2) *
            MAX_DISPLACEMENT;
        const displacement = displacements.current[index];
        const nextDisplacement =
          displacement + (targetDisplacement - displacement) * AVOIDANCE_EASING;
        displacements.current[index] = nextDisplacement;

        const label = labelRefs.current[index];
        const value = valueRefs.current[index];

        if (label) {
          label.style.transform = `translate3d(${-nextDisplacement}px, 0, 0)`;
        }
        if (value) {
          value.style.transform = `translate3d(${nextDisplacement}px, 0, 0)`;
        }
      }

      frame = window.requestAnimationFrame(animate);
    };

    frame = window.requestAnimationFrame(animate);
    viewport.addEventListener('wheel', onWheel, { passive: true });
    viewport.addEventListener('touchstart', onTouchStart, { passive: true });
    viewport.addEventListener('touchmove', onTouchMove, { passive: true });
    viewport.addEventListener('touchend', onTouchEnd);
    window.addEventListener('keydown', onKeyDown);

    return () => {
      window.cancelAnimationFrame(frame);
      viewport.removeEventListener('wheel', onWheel);
      viewport.removeEventListener('touchstart', onTouchStart);
      viewport.removeEventListener('touchmove', onTouchMove);
      viewport.removeEventListener('touchend', onTouchEnd);
      window.removeEventListener('keydown', onKeyDown);
    };
  }, [contentHeight, moveBy]);

  return (
    <>
      <main className="contact-page">
        <h1 className="visually-hidden">Contact</h1>
      </main>

      <div className="contact-page__overlay">
        <div className="contact-page__figure" aria-hidden="true">
          {CENTER_ICONS.map((Icon, index) => (
            <span
              className="contact-page__figure-icon"
              data-active={index === activeIcon ? 'true' : 'false'}
              key={Icon.name}
            >
              <Icon />
            </span>
          ))}
        </div>

        <div
          ref={viewportRef}
          className="contact-page__viewport"
          aria-label="Contact details. Scroll, swipe, or use the arrow keys to explore."
        >
          <div ref={listRef} className="contact-page__list">
            {renderedRows.map((row, index) => (
              <div
                className="contact-row"
                key={`${row.label}-${row.value ?? row.type}`}
              >
                <div
                  ref={(element) => {
                    labelRefs.current[index] = element;
                  }}
                  className="contact-row__label"
                >
                  {row.label}
                </div>

                <div className="contact-row__gap" />

                <div
                  ref={(element) => {
                    valueRefs.current[index] = element;
                  }}
                  className="contact-row__value"
                >
                  {row.href ? (
                    <a
                      href={row.href}
                      target={
                        row.href.startsWith('http') ? '_blank' : undefined
                      }
                      rel={
                        row.href.startsWith('http') ? 'noreferrer' : undefined
                      }
                    >
                      {row.renderedValue}
                    </a>
                  ) : (
                    <span>{row.renderedValue}</span>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}
