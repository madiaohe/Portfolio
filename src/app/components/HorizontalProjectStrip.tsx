import { useEffect, useRef, useState, useMemo, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { gsap } from 'gsap';
import { getProjects } from '@/data/projects';
import { useLocale } from '@/app/providers/LocaleProvider';

const ITEM_SIZE = 96;
const HOVER_RADIUS = 5;
const MAX_HEIGHT = 220;
const NEIGHBOUR_MAX = 140;
const MIN_HEIGHT = ITEM_SIZE;
const SCROLL_LERP = 0.08;
const HEIGHT_LERP = 0.04;

function getTargetHeight(hoveredIdx: number | null, index: number): number {
  if (hoveredIdx === null) return MIN_HEIGHT;
  const distance = Math.abs(index - hoveredIdx);
  if (distance === 0) return MAX_HEIGHT;
  if (distance > HOVER_RADIUS) return MIN_HEIGHT;
  const t = 1 - (distance - 1) / (HOVER_RADIUS - 1);
  return MIN_HEIGHT + (NEIGHBOUR_MAX - MIN_HEIGHT) * t * t;
}

export function HorizontalProjectStrip({ currentProjectId }: { currentProjectId?: string }) {
  const { locale } = useLocale();
  const navigate = useNavigate();
  const containerRef = useRef<HTMLDivElement>(null);
  const wrapperRef = useRef<HTMLDivElement>(null);
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const mouseRef = useRef({ x: 0, y: 0, inside: false });
  const hoveredIdxRef = useRef<number | null>(null);
  const scrollState = useRef({ current: 0, target: 0 });
  const containerLeftRef = useRef(0);
  const blockColorRefs = useRef<(HTMLDivElement | null)[]>([]);
  const blockHeights = useRef<number[]>([]);
  const prevWrappedXRef = useRef(0);
  const projects = useMemo(() => getProjects(locale), [locale]);
  const displayProjects = useMemo(() => [...projects, ...projects, ...projects, ...projects], [projects]);
  const totalBlocks = displayProjects.length;
  const singleSetWidth = projects.length * ITEM_SIZE;
  const wrapRange = 2 * singleSetWidth;

  if (blockHeights.current.length !== totalBlocks) {
    blockHeights.current = new Array(totalBlocks).fill(MIN_HEIGHT);
  }

  const realIndex = hoveredIndex !== null ? hoveredIndex % projects.length : null;
  const hoveredProject = realIndex !== null ? projects[realIndex] : null;

  useEffect(() => {
    const wrapper = wrapperRef.current;
    const container = containerRef.current;
    if (!wrapper || !container || projects.length === 0) return;

    gsap.set(wrapper, { x: 0 });

    const cacheBounds = () => {
      const r = container.getBoundingClientRect();
      containerLeftRef.current = r.left;
    };
    cacheBounds();

    const onWheel = (e: WheelEvent) => {
      e.preventDefault();
      e.stopPropagation();
      const delta = Math.abs(e.deltaX) > Math.abs(e.deltaY) ? e.deltaX : e.deltaY;
      scrollState.current.target -= delta * 0.5;
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
      const containerRect = container.getBoundingClientRect();
      if (e.clientY < containerRect.top || e.clientY > containerRect.bottom) return;

      const wrappedX = gsap.utils.wrap(-wrapRange, 0, scrollState.current.current);
      const relX = e.clientX - containerLeftRef.current - wrappedX;
      const idx = Math.floor(relX / ITEM_SIZE);
      if (idx >= 0 && idx < totalBlocks) {
        const targetProject = projects[idx % projects.length];
        if (targetProject.id !== currentProjectId) {
          navigate(`/project/${targetProject.id}`);
        }
      }
    };

    const tickerFn = () => {
      const s = scrollState.current;
      s.current += (s.target - s.current) * SCROLL_LERP;
      const wrappedX = gsap.utils.wrap(-wrapRange, 0, s.current);
      wrapper.style.transform = `translate3d(${wrappedX}px, 0, 0)`;

      const prevWX = prevWrappedXRef.current;
      prevWrappedXRef.current = wrappedX;
      const jump = wrappedX - prevWX;

      if (Math.abs(jump) > wrapRange * 0.5) {
        const shift = Math.round(jump / ITEM_SIZE);
        const old = [...blockHeights.current];
        const h = blockHeights.current;
        for (let i = 0; i < totalBlocks; i++) {
          const src = i + shift;
          h[i] = src >= 0 && src < totalBlocks ? old[src] : MIN_HEIGHT;
        }
        for (let i = 0; i < totalBlocks; i++) {
          const el = blockColorRefs.current[i];
          if (el) el.style.height = `${h[i]}px`;
        }
      }

      let newIdx: number | null = null;
      if (mouseRef.current.inside) {
        const containerRect = container.getBoundingClientRect();
        const my = mouseRef.current.y;

        if (my >= containerRect.top && my <= containerRect.bottom) {
          const relX = mouseRef.current.x - containerLeftRef.current - wrappedX;
          const idx = Math.floor(relX / ITEM_SIZE);
          if (idx >= 0 && idx < totalBlocks) {
            newIdx = idx;
          }
        }
      }

      if (newIdx !== hoveredIdxRef.current) {
        hoveredIdxRef.current = newIdx;
        setHoveredIndex(newIdx);
      }

      const h = blockHeights.current;
      const colorRefs = blockColorRefs.current;
      const hIdx = hoveredIdxRef.current;

      for (let i = 0; i < totalBlocks; i++) {
        const target = getTargetHeight(hIdx, i);
        const diff = target - h[i];
        h[i] = Math.abs(diff) < 0.3 ? target : h[i] + diff * HEIGHT_LERP;

        const colorEl = colorRefs[i];
        if (colorEl) colorEl.style.height = `${h[i]}px`;
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
  }, [currentProjectId, navigate, projects, totalBlocks, wrapRange]);

  const setColorRef = useCallback(
    (index: number) => (el: HTMLDivElement | null) => {
      blockColorRefs.current[index] = el;
    },
    [],
  );

  return (
    <div className="w-full relative">
      <div className="flex justify-center items-end h-16 mb-6">
        {hoveredProject && (
          <div className="text-center pointer-events-none">
            <div className="text-[12px] text-black mb-0.5" style={{ fontWeight: 500 }}>
              {hoveredProject.client}
            </div>
            <div className="text-[13px] text-black">{hoveredProject.tagline}</div>
          </div>
        )}
      </div>

      <div ref={containerRef} className="w-full cursor-pointer relative" style={{ height: MAX_HEIGHT, overflowX: 'hidden', overflowY: 'visible' }}>
        <div ref={wrapperRef} className="absolute bottom-0 left-0 flex items-end" style={{ willChange: 'transform', height: MAX_HEIGHT }}>
          {displayProjects.map((project, index) => (
            <div key={`strip-${project.id}-${index}`} className="flex-shrink-0 flex items-end" style={{ width: ITEM_SIZE, height: MAX_HEIGHT }}>
              <div ref={setColorRef(index)} className="w-full" style={{ height: MIN_HEIGHT, backgroundColor: project.color }} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
