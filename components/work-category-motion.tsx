'use client';

import Image from 'next/image';
import { type KeyboardEvent, useEffect, useRef, useState } from 'react';
import { WorkMatrix } from './work-matrix';

const categories = [
  {
    id: 'digital-products',
    label: 'Digital Products',
    image: '/media/work-categories/digital-products.png',
  },
  {
    id: 'brand-systems',
    label: 'Brand Systems',
    image: '/media/work-categories/brand-systems.png',
  },
  {
    id: 'experiments',
    label: 'Experiments',
    image: '/media/work-categories/experiments.png',
  },
  {
    id: 'selected-objects',
    label: 'Selected Objects',
    image: '/media/work-categories/selected-objects.png',
  },
] as const;

function clamp(value: number, min = 0, max = 1) {
  return Math.min(max, Math.max(min, value));
}

function smooth(value: number) {
  const bounded = clamp(value);
  return bounded * bounded * (3 - 2 * bounded);
}

function mix(from: number, to: number, progress: number) {
  return from + (to - from) * progress;
}

export function WorkCategories() {
  const sectionRef = useRef<HTMLElement>(null);
  const stageRef = useRef<HTMLDivElement>(null);
  const imageRowRef = useRef<HTMLDivElement>(null);
  const tabRowRef = useRef<HTMLDivElement>(null);
  const interactiveRef = useRef(false);
  const [activeCategory, setActiveCategory] = useState<
    (typeof categories)[number]['id']
  >(categories[0].id);
  const [isInteractive, setIsInteractive] = useState(false);

  const moveSelection = (
    event: KeyboardEvent<HTMLButtonElement>,
    currentIndex: number,
  ) => {
    if (
      event.key !== 'ArrowRight' &&
      event.key !== 'ArrowLeft' &&
      event.key !== 'ArrowDown' &&
      event.key !== 'ArrowUp'
    ) {
      return;
    }

    event.preventDefault();
    const direction =
      event.key === 'ArrowRight' || event.key === 'ArrowDown' ? 1 : -1;
    const nextIndex =
      (currentIndex + direction + categories.length) % categories.length;
    const nextCategory = categories[nextIndex];

    setActiveCategory(nextCategory.id);
    document.getElementById(`work-category-${nextCategory.id}`)?.focus();
  };

  useEffect(() => {
    const section = sectionRef.current;
    const stage = stageRef.current;
    const imageRow = imageRowRef.current;
    const tabRow = tabRowRef.current;

    if (!section || !stage || !imageRow || !tabRow) {
      return;
    }

    const imageNodes = Array.from(
      imageRow.querySelectorAll<HTMLElement>('[data-category-image]'),
    );
    const labelNodes = Array.from(
      tabRow.querySelectorAll<HTMLElement>('[data-category-label]'),
    );
    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
    let animationFrame = 0;

    const update = () => {
      animationFrame = 0;

      const bounds = section.getBoundingClientRect();
      const sectionDocumentTop = window.scrollY + bounds.top;
      const entryScrollY = Math.max(
        sectionDocumentTop - window.innerHeight,
        0,
      );
      const motionRange = Math.min(
        Math.max(window.innerHeight * 0.42, 220),
        360,
      );
      const progress = reduceMotion.matches
        ? 1
        : clamp((window.scrollY - entryScrollY) / motionRange);
      const stageWidth = stage.clientWidth;
      const imageGap = 8;
      const imageSize = 24;
      const imageRowWidth =
        imageNodes.length * imageSize +
        Math.max(imageNodes.length - 1, 0) * imageGap;

      imageNodes.forEach((node, index) => {
        const itemProgress = reduceMotion.matches
          ? 1
          : smooth((progress - index * 0.18) / 0.36);
        const fadeProgress = smooth((itemProgress - 0.55) / 0.45);
        const startX =
          stageWidth - imageRowWidth + index * (imageSize + imageGap);
        const endX = labelNodes[index]?.offsetLeft ?? 0;

        node.style.opacity = String(1 - fadeProgress);
        node.style.transform = `translate3d(${mix(startX, endX, itemProgress)}px, 0, 0)`;
      });

      labelNodes.forEach((node, index) => {
        const itemProgress = reduceMotion.matches
          ? 1
          : smooth((progress - index * 0.18) / 0.36);
        const fadeProgress = smooth((itemProgress - 0.55) / 0.45);

        node.style.opacity = String(fadeProgress);
        node.style.transform = `translate3d(${mix(6, 0, fadeProgress)}px, 0, 0)`;
      });

      const nextInteractive = reduceMotion.matches || progress >= 0.88;

      if (interactiveRef.current !== nextInteractive) {
        interactiveRef.current = nextInteractive;
        setIsInteractive(nextInteractive);
      }

    };

    const requestUpdate = () => {
      if (!animationFrame) {
        animationFrame = window.requestAnimationFrame(update);
      }
    };

    update();
    window.addEventListener('scroll', requestUpdate, { passive: true });
    window.addEventListener('resize', requestUpdate);
    reduceMotion.addEventListener('change', requestUpdate);

    return () => {
      window.removeEventListener('scroll', requestUpdate);
      window.removeEventListener('resize', requestUpdate);
      reduceMotion.removeEventListener('change', requestUpdate);
      window.cancelAnimationFrame(animationFrame);
    };
  }, []);

  return (
    <section
      id="work"
      ref={sectionRef}
      className="home-section home-section--work work-categories"
      aria-labelledby="work-categories-title"
      data-settled={isInteractive ? 'true' : 'false'}
    >
      <h2 id="work-categories-title" className="visually-hidden">
        Work categories
      </h2>

      <div className="work-categories__content">
        <div ref={stageRef} className="work-categories__stage">
          <div
            ref={imageRowRef}
            className="work-categories__images"
            aria-hidden="true"
          >
            {categories.map((category) => (
              <figure
                key={category.id}
                className="work-category-image"
                data-category-image
              >
                <Image
                  src={category.image}
                  alt=""
                  width={1254}
                  height={1254}
                  sizes="24px"
                  draggable="false"
                />
              </figure>
            ))}
          </div>

          <div
            ref={tabRowRef}
            className="work-categories__tabs"
            role="tablist"
            aria-label="Work categories"
          >
            {categories.map((category, index) => (
              <div
                key={category.id}
                className="work-category-label"
                data-category-label
              >
                <button
                  id={`work-category-${category.id}`}
                  type="button"
                  role="tab"
                  aria-selected={activeCategory === category.id}
                  tabIndex={
                    isInteractive && activeCategory === category.id ? 0 : -1
                  }
                  onClick={() => setActiveCategory(category.id)}
                  onKeyDown={(event) => moveSelection(event, index)}
                >
                  {category.label}
                </button>
              </div>
            ))}
          </div>
        </div>

        <WorkMatrix />
      </div>
    </section>
  );
}
