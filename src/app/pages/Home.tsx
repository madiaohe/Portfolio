import { useEffect, useRef, useState, useMemo, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { gsap } from 'gsap';
import { Logo } from '@/app/components/Logo';
import { Navigation } from '@/app/components/Navigation';
import { useLocale } from '@/app/providers/LocaleProvider';
import { getCategories, getProjects } from '@/data/projects';
import { homeContent, pageSeo } from '@/content/pages';
import { usePageMetadata } from '@/app/hooks/usePageMetadata';
import { siteConfig } from '@/content/site';

const ITEM_HEIGHT = 96;
const HOVER_RADIUS = 5;
const MAX_WIDTH = 340;
const NEIGHBOUR_MAX = 160;
const MIN_WIDTH = 96;
const SCROLL_LERP = 0.08;
const WIDTH_LERP = 0.04;

function getTargetWidth(hoveredIdx: number | null, index: number): number {
  if (hoveredIdx === null) return MIN_WIDTH;
  const distance = Math.abs(index - hoveredIdx);
  if (distance === 0) return MAX_WIDTH;
  if (distance > HOVER_RADIUS) return MIN_WIDTH;
  const t = 1 - (distance - 1) / (HOVER_RADIUS - 1);
  return MIN_WIDTH + (NEIGHBOUR_MAX - MIN_WIDTH) * t * t;
}

function EyeClosed() {
  return (
    <svg width="36" height="20" viewBox="0 0 36 20" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M3 8 Q18 18 33 8" stroke="#AFAEA7" strokeWidth="1.2" fill="none" strokeLinecap="round" />
      <line x1="9" y1="12" x2="7" y2="17" stroke="#AFAEA7" strokeWidth="1" strokeLinecap="round" />
      <line x1="18" y1="14.5" x2="18" y2="19.5" stroke="#AFAEA7" strokeWidth="1" strokeLinecap="round" />
      <line x1="27" y1="12" x2="29" y2="17" stroke="#AFAEA7" strokeWidth="1" strokeLinecap="round" />
    </svg>
  );
}

function EyeOpen() {
  return (
    <svg width="36" height="24" viewBox="0 0 36 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M3 12 Q18 2 33 12 Q18 22 3 12Z" stroke="#AFAEA7" strokeWidth="1.2" fill="none" strokeLinecap="round" />
      <circle cx="18" cy="12" r="3.5" fill="#AFAEA7" />
      <circle cx="18" cy="12" r="1.5" fill="white" />
    </svg>
  );
}

export default function Home() {
  const { locale, t } = useLocale();
  const navigate = useNavigate();
  const containerRef = useRef<HTMLDivElement>(null);
  const wrapperRef = useRef<HTMLDivElement>(null);
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const [eyeOpen, setEyeOpen] = useState(false);
  const mouseRef = useRef({ x: 0, y: 0, inside: false });
  const hoveredIdxRef = useRef<number | null>(null);
  const scrollState = useRef({ current: 0, target: 0 });
  const containerTopRef = useRef(0);
  const containerCenterXRef = useRef(0);
  const blockColorRefs = useRef<(HTMLDivElement | null)[]>([]);
  const blockInfoRefs = useRef<(HTMLDivElement | null)[]>([]);
  const overlayRefs = useRef<(HTMLDivElement | null)[]>([]);
  const blockWidths = useRef<number[]>([]);
  const prevWrappedYRef = useRef(0);
  const animatingRef = useRef(false);

  const projects = useMemo(() => getProjects(locale), [locale]);
  const categories = useMemo(() => getCategories(locale), [locale]);
  const displayProjects = useMemo(() => [...projects, ...projects, ...projects, ...projects], [projects]);
  const totalBlocks = displayProjects.length;
  const singleSetHeight = projects.length * ITEM_HEIGHT;
  const wrapRange = 2 * singleSetHeight;

  if (blockWidths.current.length !== totalBlocks) {
    blockWidths.current = new Array(totalBlocks).fill(MIN_WIDTH);
  }

  const realIndex = hoveredIndex !== null ? hoveredIndex % projects.length : null;
  const hoveredProject = realIndex !== null ? projects[realIndex] : null;

  usePageMetadata({
    title: t(pageSeo.home.title),
    description: t(pageSeo.home.description),
  });

  const handleEyeToggle = useCallback(() => {
    if (animatingRef.current) return;
    animatingRef.current = true;

    const opening = !eyeOpen;
    setEyeOpen(opening);

    const wrappedY = gsap.utils.wrap(-wrapRange, 0, scrollState.current.current);
    const items = overlayRefs.current
      .map((el, i) => ({ el, y: wrappedY + i * ITEM_HEIGHT }))
      .filter((item): item is { el: HTMLDivElement; y: number } => item.el !== null)
      .sort((a, b) => a.y - b.y);

    gsap.to(items.map((item) => item.el), {
      x: opening ? '100%' : '0%',
      duration: 0.45,
      stagger: 0.022,
      ease: 'power2.inOut',
      onComplete: () => {
        animatingRef.current = false;
      },
    });
  }, [eyeOpen, wrapRange]);

  useEffect(() => {
    const wrapper = wrapperRef.current;
    const container = containerRef.current;
    if (!wrapper || !container || projects.length === 0) return;

    gsap.set(wrapper, { y: 0 });

    const cacheBounds = () => {
      const r = container.getBoundingClientRect();
      containerTopRef.current = r.top;
      containerCenterXRef.current = r.left + r.width / 2;
    };
    cacheBounds();

    const onWheel = (e: WheelEvent) => {
      e.preventDefault();
      e.stopPropagation();
      scrollState.current.target -= e.deltaY * 0.5;
    };

    const onMouseMove = (e: MouseEvent) => {
      mouseRef.current.x = e.clientX;
      mouseRef.current.y = e.clientY;
      mouseRef.current.inside = true;
    };

    const onMouseLeave = () => {
      mouseRef.current.inside = false;
    };

    const onClick = (e: MouseEvent) => {
      const centerX = containerCenterXRef.current;
      const rightEdge = centerX + 48;
      const leftEdge = hoveredIdxRef.current !== null ? rightEdge - MAX_WIDTH - 20 : centerX - 48;
      if (e.clientX < leftEdge || e.clientX > rightEdge + 10) return;

      const wrappedY = gsap.utils.wrap(-wrapRange, 0, scrollState.current.current);
      const relY = e.clientY - containerTopRef.current - wrappedY;
      const idx = Math.floor(relY / ITEM_HEIGHT);
      if (idx >= 0 && idx < totalBlocks) {
        navigate(`/project/${projects[idx % projects.length].id}`);
      }
    };

    const tickerFn = () => {
      const s = scrollState.current;
      s.current += (s.target - s.current) * SCROLL_LERP;
      const wrappedY = gsap.utils.wrap(-wrapRange, 0, s.current);
      wrapper.style.transform = `translate3d(0, ${wrappedY}px, 0)`;

      const prevWY = prevWrappedYRef.current;
      prevWrappedYRef.current = wrappedY;
      const jump = wrappedY - prevWY;

      if (Math.abs(jump) > wrapRange * 0.5) {
        const shift = Math.round(jump / ITEM_HEIGHT);
        const old = [...blockWidths.current];
        const w = blockWidths.current;
        for (let i = 0; i < totalBlocks; i++) {
          const src = i + shift;
          w[i] = src >= 0 && src < totalBlocks ? old[src] : MIN_WIDTH;
        }
        for (let i = 0; i < totalBlocks; i++) {
          const el = blockColorRefs.current[i];
          if (el) el.style.width = `${w[i]}px`;
        }
      }

      let newIdx: number | null = null;
      if (mouseRef.current.inside) {
        const centerX = containerCenterXRef.current;
        const mx = mouseRef.current.x;
        const rightEdge = centerX + 48;
        const leftEdge = hoveredIdxRef.current !== null ? rightEdge - MAX_WIDTH - 20 : centerX - 48;

        if (mx >= leftEdge && mx <= rightEdge + 10) {
          const relY = mouseRef.current.y - containerTopRef.current - wrappedY;
          const idx = Math.floor(relY / ITEM_HEIGHT);
          if (idx >= 0 && idx < totalBlocks) {
            newIdx = idx;
          }
        }
      }

      if (newIdx !== hoveredIdxRef.current) {
        hoveredIdxRef.current = newIdx;
        setHoveredIndex(newIdx);
      }

      const w = blockWidths.current;
      const colorRefs = blockColorRefs.current;
      const infoRefs = blockInfoRefs.current;
      const hIdx = hoveredIdxRef.current;

      for (let i = 0; i < totalBlocks; i++) {
        const target = getTargetWidth(hIdx, i);
        const diff = target - w[i];
        w[i] = Math.abs(diff) < 0.3 ? target : w[i] + diff * WIDTH_LERP;

        const colorEl = colorRefs[i];
        if (colorEl) colorEl.style.width = `${w[i]}px`;

        const infoEl = infoRefs[i];
        if (infoEl) {
          if (i === hIdx) {
            infoEl.style.opacity = '1';
            infoEl.style.visibility = 'visible';
          } else {
            infoEl.style.opacity = '0';
            infoEl.style.visibility = 'hidden';
          }
        }
      }
    };

    gsap.ticker.add(tickerFn);
    container.addEventListener('wheel', onWheel, { passive: false });
    container.addEventListener('mousemove', onMouseMove);
    container.addEventListener('mouseleave', onMouseLeave);
    container.addEventListener('click', onClick);
    window.addEventListener('resize', cacheBounds);

    return () => {
      gsap.ticker.remove(tickerFn);
      container.removeEventListener('wheel', onWheel);
      container.removeEventListener('mousemove', onMouseMove);
      container.removeEventListener('mouseleave', onMouseLeave);
      container.removeEventListener('click', onClick);
      window.removeEventListener('resize', cacheBounds);
    };
  }, [navigate, projects, totalBlocks, wrapRange]);

  const setColorRef = useCallback(
    (index: number) => (el: HTMLDivElement | null) => {
      blockColorRefs.current[index] = el;
    },
    [],
  );

  const setInfoRef = useCallback(
    (index: number) => (el: HTMLDivElement | null) => {
      blockInfoRefs.current[index] = el;
    },
    [],
  );

  const setOverlayRef = useCallback(
    (index: number) => (el: HTMLDivElement | null) => {
      overlayRefs.current[index] = el;
    },
    [],
  );

  return (
    <div className="h-screen bg-white relative overflow-hidden font-sans select-none">
      <Logo />
      <Navigation />

      <div className="fixed left-8 top-1/2 -translate-y-1/2 z-40 hidden lg:flex flex-col gap-0.5">
        {categories.map((cat) => {
          const isActive = hoveredProject?.category === cat;
          return (
            <span
              key={cat}
              className="text-[11px] leading-snug transition-all duration-200"
              style={{ color: isActive ? '#000' : '#AFAEA7', fontWeight: isActive ? 700 : 400 }}
            >
              {cat}
            </span>
          );
        })}
      </div>

      <button
        onClick={handleEyeToggle}
        className="fixed right-8 top-1/2 -translate-y-1/2 z-50 cursor-pointer p-2 hover:opacity-70 transition-opacity"
        aria-label={eyeOpen ? 'Hide project covers' : 'Show project covers'}
      >
        {eyeOpen ? <EyeOpen /> : <EyeClosed />}
      </button>

      <div className="absolute inset-0 flex justify-center overflow-hidden" ref={containerRef}>
        <div ref={wrapperRef} className="flex flex-col items-center" style={{ willChange: 'transform' }}>
          {displayProjects.map((project, index) => {
            const realIdx = index % projects.length;
            const realProj = projects[realIdx];

            return (
              <div key={`${project.id}-${index}`} className="relative flex-shrink-0 cursor-pointer" style={{ height: ITEM_HEIGHT, width: 96 }}>
                <div ref={setColorRef(index)} className="absolute top-0 right-0 h-full overflow-hidden" style={{ width: MIN_WIDTH }}>
                  <img
                    src={realProj.coverImage}
                    alt={realProj.title}
                    className="absolute inset-0 w-full h-full object-cover"
                    loading="lazy"
                    draggable={false}
                  />

                  <div ref={setOverlayRef(index)} className="absolute inset-0 will-change-transform" style={{ backgroundColor: project.color }}>
                    {project.isNew && (
                      <div className="absolute top-1/2 -translate-y-1/2 right-3 bg-black px-1.5 py-0.5 pointer-events-none">
                        <span className="text-[10px] text-white tracking-widest block leading-none uppercase" style={{ fontWeight: 700 }}>
                          {t({ zh: 'NEW', en: 'NEW' })}
                        </span>
                      </div>
                    )}
                  </div>
                </div>

                <div
                  ref={setInfoRef(index)}
                  className="absolute top-1/2 pointer-events-none"
                  style={{ left: 'calc(100% + 16px)', transform: 'translateY(-50%)', whiteSpace: 'nowrap', zIndex: 3, opacity: 0, visibility: 'hidden' }}
                >
                  <div className="text-[11px] text-black mb-0.5 bg-[#AFAEA7] inline-block px-1.5 py-0.5">
                    {realProj.title}
                  </div>
                  <div className="text-[13px] text-black">{realProj.tagline}</div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      <div className="fixed bottom-8 left-8 z-40 flex flex-col gap-2">
        <div className="w-5 h-5 border border-[#AFAEA7] flex items-center justify-center">
          <div className="w-2.5 h-2.5 bg-black" />
        </div>
        {hoveredProject && (
          <span className="text-[10px] text-[#1060B6] whitespace-nowrap">
            {homeContent.archivePrefix[locale]}{hoveredProject.slug}
          </span>
        )}
      </div>

      <div className="fixed bottom-8 right-8 z-40">
        <span className="text-xs text-[#AFAEA7] tracking-wide" style={{ fontWeight: 500 }}>
          {t(siteConfig.footerTagline)}
        </span>
      </div>
    </div>
  );
}
