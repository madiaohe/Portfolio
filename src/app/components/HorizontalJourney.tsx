import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { aboutContent } from '@/content/pages';
import { useLocale } from '@/app/providers/LocaleProvider';

gsap.registerPlugin(ScrollTrigger);

export function HorizontalJourney() {
  const { locale, t } = useLocale();
  const wrapperRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const progressRef = useRef<HTMLDivElement>(null);
  const counterRef = useRef<HTMLSpanElement>(null);
  const milestones = aboutContent.milestones;
  const total = milestones.length;

  useEffect(() => {
    if (!wrapperRef.current || !trackRef.current) return;

    const track = trackRef.current;
    const panels = gsap.utils.toArray<HTMLElement>('.hj-panel', track);

    const ctx = gsap.context(() => {
      const scrollTween = gsap.to(track, {
        x: () => -(track.scrollWidth - window.innerWidth),
        ease: 'none',
        scrollTrigger: {
          trigger: wrapperRef.current,
          pin: true,
          scrub: 0.8,
          end: () => `+=${track.scrollWidth - window.innerWidth}`,
          invalidateOnRefresh: true,
          onUpdate: (self) => {
            if (progressRef.current) {
              progressRef.current.style.transform = `scaleX(${self.progress})`;
            }
            if (counterRef.current) {
              const idx = Math.min(total, Math.max(1, Math.round(self.progress * (total - 1)) + 1));
              counterRef.current.textContent = String(idx).padStart(2, '0');
            }
          },
        },
      });

      panels.forEach((panel) => {
        const year = panel.querySelector('.hj-year');
        const keyword = panel.querySelector('.hj-keyword');
        const title = panel.querySelector('.hj-title');
        const desc = panel.querySelector('.hj-desc');
        const idx = panel.querySelector('.hj-idx');

        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: panel,
            containerAnimation: scrollTween,
            start: 'left 75%',
            end: 'left 25%',
            scrub: true,
          },
        });

        if (year) {
          tl.fromTo(year, { yPercent: 30, opacity: 0 }, { yPercent: 0, opacity: 0.06, duration: 1 }, 0);
        }
        if (keyword) {
          tl.fromTo(keyword, { xPercent: 20, opacity: 0 }, { xPercent: 0, opacity: 0.08, duration: 1 }, 0.1);
        }
        if (idx) {
          tl.fromTo(idx, { opacity: 0 }, { opacity: 1, duration: 0.6 }, 0.15);
        }
        if (title) {
          tl.fromTo(title, { y: 40, opacity: 0 }, { y: 0, opacity: 1, duration: 0.8 }, 0.2);
        }
        if (desc) {
          tl.fromTo(desc, { y: 30, opacity: 0 }, { y: 0, opacity: 1, duration: 0.8 }, 0.35);
        }
      });
    }, wrapperRef);

    return () => ctx.revert();
  }, [total]);

  return (
    <div ref={wrapperRef} className="relative overflow-hidden bg-white">
      <div className="absolute top-8 left-8 z-20 flex items-center gap-4">
        <span className="text-[11px] tracking-[0.25em] uppercase" style={{ color: '#AFAEA7' }}>
          {t({ zh: 'Journey', en: 'Journey' })}
        </span>
        <span className="text-[11px]" style={{ color: '#AFAEA7' }}>
          <span ref={counterRef}>01</span>
          <span className="opacity-40"> / {String(total).padStart(2, '0')}</span>
        </span>
      </div>

      <div className="absolute bottom-0 left-0 right-0 h-px z-20" style={{ backgroundColor: 'rgba(175,174,167,0.15)' }}>
        <div
          ref={progressRef}
          className="h-full origin-left"
          style={{ backgroundColor: '#AFAEA7', transform: 'scaleX(0)' }}
        />
      </div>

      <div ref={trackRef} className="flex h-screen will-change-transform">
        {milestones.map((m) => (
          <div key={m.year} className="hj-panel relative flex-shrink-0 w-screen h-screen flex items-center justify-center">
            <span
              className="hj-year absolute select-none pointer-events-none"
              style={{
                fontSize: 'clamp(180px, 28vw, 360px)',
                fontWeight: 200,
                color: '#AFAEA7',
                opacity: 0.06,
                lineHeight: 1,
                letterSpacing: '-0.04em',
                top: '50%',
                left: '50%',
                transform: 'translate(-50%, -50%)',
              }}
            >
              {m.year}
            </span>

            <span
              className="hj-keyword absolute select-none pointer-events-none"
              style={{
                fontSize: 'clamp(60px, 10vw, 140px)',
                fontWeight: 300,
                color: '#AFAEA7',
                opacity: 0.08,
                letterSpacing: '0.15em',
                bottom: '12%',
                right: '8%',
                transform: 'rotate(-90deg)',
                transformOrigin: 'bottom right',
              }}
            >
              {m.keyword}
            </span>

            <div className="relative z-10 px-8 md:px-16 max-w-[560px]" style={{ marginRight: 'auto', marginLeft: '12vw' }}>
              <span className="hj-idx text-[11px] tracking-[0.3em] uppercase block mb-6" style={{ color: '#AFAEA7' }}>
                {m.index}
              </span>

              <span className="block text-[clamp(2.5rem,5vw,4rem)] tracking-tight" style={{ color: '#AFAEA7', fontWeight: 200, lineHeight: 1 }}>
                {m.year}
              </span>

              <h3 className="hj-title mt-4 text-[clamp(1.2rem,2.5vw,1.8rem)] text-black" style={{ fontWeight: 500, lineHeight: 1.2 }}>
                {m.title[locale]}
              </h3>

              <p className="hj-desc mt-4 text-[13px] leading-relaxed max-w-[400px]" style={{ color: '#999' }}>
                {m.description[locale]}
              </p>

              <div className="mt-8 w-12 h-px" style={{ backgroundColor: '#AFAEA7', opacity: 0.4 }} />
            </div>

            <div className="absolute right-0 top-[20%] h-[60%] w-px" style={{ backgroundColor: '#AFAEA7', opacity: 0.08 }} />
          </div>
        ))}
      </div>
    </div>
  );
}
