import { useEffect, useRef, useState, useCallback, useMemo } from 'react';
import { gsap } from 'gsap';
import { Logo } from '@/app/components/Logo';
import { Navigation } from '@/app/components/Navigation';
import { useLocale } from '@/app/providers/LocaleProvider';
import { usePageMetadata } from '@/app/hooks/usePageMetadata';
import { contactContent, pageSeo } from '@/content/pages';
import { siteConfig } from '@/content/site';

const ROW_HEIGHT = 22;
const SCROLL_LERP = 0.08;
const AVOIDANCE_LERP = 0.08;
const AVOIDANCE_RADIUS = 120;
const MAX_DISPLACEMENT = 55;
const LABEL_WIDTH = 260;
const GAP_WIDTH = 18;

interface RowData {
  label: string;
  height: number;
  type: 'text' | 'clock' | 'email' | 'phone' | 'link';
  value?: string;
  href?: string;
}

function avoidanceFactor(dist: number): number {
  const d = Math.abs(dist);
  if (d >= AVOIDANCE_RADIUS) return 0;
  const t = d / AVOIDANCE_RADIUS;
  return 0.5 * (1 + Math.cos(Math.PI * t));
}

function DecoIcon() {
  return (
    <svg width="44" height="62" viewBox="0 0 40 56" fill="none" xmlns="http://www.w3.org/2000/svg">
      <circle cx="20" cy="8" r="6" fill="#AFAEA7" />
      <path d="M14 16 h12 v18 h-12 z" fill="#AFAEA7" />
      <path d="M14 18 L6 28 L9 30 L14 22" fill="#AFAEA7" />
      <path d="M26 18 L34 28 L31 30 L26 22" fill="#AFAEA7" />
      <rect x="14" y="34" width="5" height="16" fill="#AFAEA7" />
      <rect x="21" y="34" width="5" height="16" fill="#AFAEA7" />
      <rect x="7" y="26" width="4" height="5" fill="#AFAEA7" />
    </svg>
  );
}

function useClock() {
  const [time, setTime] = useState(() => fmtTime());
  useEffect(() => {
    const id = setInterval(() => setTime(fmtTime()), 1000);
    return () => clearInterval(id);
  }, []);
  return time;
}

function fmtTime() {
  const n = new Date();
  const h = String(n.getHours()).padStart(2, '0');
  const m = String(n.getMinutes()).padStart(2, '0');
  const s = String(n.getSeconds()).padStart(2, '0');
  const off = -n.getTimezoneOffset() / 60;
  return `${h}:${m}:${s} (GMT${off >= 0 ? '+' : ''}${off})`;
}

export default function Contact() {
  const { locale, t } = useLocale();
  const containerRef = useRef<HTMLDivElement>(null);
  const wrapperRef = useRef<HTMLDivElement>(null);
  const iconRef = useRef<HTMLDivElement>(null);
  const labelRefs = useRef<(HTMLDivElement | null)[]>([]);
  const valueRefs = useRef<(HTMLDivElement | null)[]>([]);
  const scrollState = useRef({ current: 0, target: 0 });
  const time = useClock();

  const contactRows: RowData[] = useMemo(
    () => contactContent.rows.map((row) => ({
      label: row.label[locale],
      height: ROW_HEIGHT,
      type: row.type,
      value: row.type === 'email' && row.href?.startsWith('mailto:') ? siteConfig.contactEmail : row.value?.[locale],
      href: row.type === 'email' && row.href?.startsWith('mailto:') ? `mailto:${siteConfig.contactEmail}` : row.href,
    })),
    [locale],
  );

  const contentHeight = useMemo(() => contactRows.reduce((sum, row) => sum + row.height, 0), [contactRows]);
  const rowOffsets = useMemo(() => contactRows.map((_, index) => index * ROW_HEIGHT), [contactRows]);
  const dispCurrent = useRef(new Float64Array(contactRows.length));

  useEffect(() => {
    dispCurrent.current = new Float64Array(contactRows.length);
  }, [contactRows.length]);

  usePageMetadata({
    title: t(pageSeo.contact.title),
    description: t(pageSeo.contact.description),
  });

  const setLabelRef = useCallback((i: number) => (el: HTMLDivElement | null) => {
    labelRefs.current[i] = el;
  }, []);

  const setValueRef = useCallback((i: number) => (el: HTMLDivElement | null) => {
    valueRefs.current[i] = el;
  }, []);

  useEffect(() => {
    const container = containerRef.current;
    const wrapper = wrapperRef.current;
    if (!container || !wrapper) return;

    const initY = window.innerHeight * 0.62;
    scrollState.current.current = initY;
    scrollState.current.target = initY;

    const onWheel = (e: WheelEvent) => {
      e.preventDefault();
      e.stopPropagation();
      scrollState.current.target -= e.deltaY * 0.5;
    };

    const tickerFn = () => {
      const s = scrollState.current;
      const wh = window.innerHeight;

      s.current += (s.target - s.current) * SCROLL_LERP;
      const wrappedY = gsap.utils.wrap(-contentHeight, wh, s.current);
      const xOffset = -(LABEL_WIDTH + GAP_WIDTH / 2);
      wrapper.style.transform = `translate3d(${xOffset}px, ${wrappedY}px, 0)`;

      const iconCY = wh / 2;
      const disp = dispCurrent.current;

      for (let i = 0; i < contactRows.length; i++) {
        const rowCenterScreen = wrappedY + rowOffsets[i] + contactRows[i].height / 2;
        const dist = rowCenterScreen - iconCY;
        const targetDisp = avoidanceFactor(dist) * MAX_DISPLACEMENT;

        disp[i] += (targetDisp - disp[i]) * AVOIDANCE_LERP;
        const d = disp[i];

        const lbl = labelRefs.current[i];
        const val = valueRefs.current[i];
        if (lbl) lbl.style.transform = `translateX(${-d}px)`;
        if (val) val.style.transform = `translateX(${d}px)`;
      }
    };

    gsap.ticker.add(tickerFn);
    container.addEventListener('wheel', onWheel, { passive: false });

    return () => {
      gsap.ticker.remove(tickerFn);
      container.removeEventListener('wheel', onWheel);
    };
  }, [contactRows, contentHeight, rowOffsets]);

  useEffect(() => {
    const icon = iconRef.current;
    if (!icon) return;

    gsap.fromTo(icon, { opacity: 0, scale: 0.6 }, {
      opacity: 1,
      scale: 1,
      duration: 1,
      ease: 'power3.out',
    });
  }, []);

  const renderValue = (row: RowData) => {
    if (row.type === 'text') return <span>{row.value}</span>;
    if (row.type === 'clock') return <span>{time}</span>;
    if (row.href) {
      return <a href={row.href} className="text-[#AFAEA7] hover:text-black transition-colors">{row.value}</a>;
    }
    return <span>{row.value}</span>;
  };

  return (
    <div className="h-screen bg-white relative overflow-hidden font-sans select-none">
      <Logo />
      <Navigation />

      <div className="fixed z-30 pointer-events-none" style={{ top: '50%', left: '50%', transform: 'translate(-50%, -50%)' }}>
        <div ref={iconRef}>
          <DecoIcon />
        </div>
      </div>

      <div ref={containerRef} className="absolute inset-0 overflow-hidden">
        <div ref={wrapperRef} className="absolute flex flex-col" style={{ left: '50%', willChange: 'transform' }}>
          {contactRows.map((row, i) => (
            <div key={`${i}-${row.value || row.type}`} className="flex items-start shrink-0" style={{ height: row.height }}>
              <div
                ref={setLabelRef(i)}
                className="shrink-0 text-right text-black will-change-transform"
                style={{ width: LABEL_WIDTH, fontSize: 13, paddingTop: 2 }}
              >
                {row.label}
              </div>

              <div className="shrink-0" style={{ width: GAP_WIDTH }} />

              <div
                ref={setValueRef(i)}
                className="text-[#AFAEA7] will-change-transform"
                style={{ fontSize: 13, paddingTop: 2 }}
              >
                {renderValue(row)}
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="fixed bottom-8 left-8 z-40">
        <div className="w-5 h-5 border border-[#AFAEA7] flex items-center justify-center">
          <div className="w-2.5 h-2.5 bg-black" />
        </div>
      </div>

      <div className="fixed bottom-8 right-8 z-40">
        <span className="text-xs text-[#AFAEA7] tracking-wide" style={{ fontWeight: 500 }}>
          {t(siteConfig.footerTagline)}
        </span>
      </div>
    </div>
  );
}
