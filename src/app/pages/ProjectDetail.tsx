import { useEffect, useRef, useState, useCallback, useMemo } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { gsap } from 'gsap';
import { getCategories, getProjectById } from '@/data/projects';
import { ImageWithFallback } from '@/app/components/figma/ImageWithFallback';
import { HorizontalProjectStrip } from '@/app/components/HorizontalProjectStrip';
import { useLocale } from '@/app/providers/LocaleProvider';
import { usePageMetadata } from '@/app/hooks/usePageMetadata';
import { siteConfig } from '@/content/site';

const GAP_PX = 2.5;

function NavButton({
  children,
  onClick,
  as,
  to,
  expand = 'center',
}: {
  children: React.ReactNode;
  onClick?: () => void;
  as?: 'link';
  to?: string;
  expand?: 'center' | 'left';
}) {
  const charsRef = useRef<(HTMLSpanElement | null)[]>([]);
  const text = typeof children === 'string' ? children : '';
  const chars = useMemo(() => text.split(''), [text]);
  const n = chars.length;

  const handleEnter = () => {
    charsRef.current.forEach((el, i) => {
      if (!el) return;
      gsap.killTweensOf(el);
      const target = expand === 'center' ? (i - (n - 1) / 2) * GAP_PX : -(n - 1 - i) * GAP_PX;
      gsap.to(el, { x: target, duration: 0.45, ease: 'power3.out', overwrite: true });
    });
  };

  const handleLeave = () => {
    charsRef.current.forEach((el) => {
      if (!el) return;
      gsap.killTweensOf(el);
      gsap.to(el, { x: 0, duration: 0.35, ease: 'power3.inOut', overwrite: true });
    });
  };

  const inner = (
    <div
      className="relative cursor-pointer overflow-hidden"
      style={{ backgroundColor: '#AFAEA7', color: '#000', padding: '4px 20px', fontSize: '13px', lineHeight: '1.4' }}
      onMouseEnter={handleEnter}
      onMouseLeave={handleLeave}
    >
      <span className="inline-flex whitespace-nowrap" style={{ willChange: 'transform' }}>
        {chars.map((char, i) => (
          <span key={i} ref={(el) => { charsRef.current[i] = el; }} style={{ display: 'inline-block', willChange: 'transform' }}>
            {char}
          </span>
        ))}
      </span>
    </div>
  );

  if (as === 'link' && to) {
    return <Link to={to} className="no-underline">{inner}</Link>;
  }

  return <div onClick={onClick}>{inner}</div>;
}

const mockCredits: Record<string, { role: string; name: string }[]> = {
  'project-1': [
    { role: 'Creative Director', name: 'Alex Chen' },
    { role: 'Art Director', name: 'Maria Silva' },
    { role: 'Designer', name: 'James Park' },
    { role: 'Developer', name: 'Sarah Kim' },
    { role: 'Copywriter', name: 'Tom Wilson' },
  ],
  'project-2': [
    { role: 'Creative Director', name: 'Nina Zhao' },
    { role: 'Designer', name: 'Leo Zhang' },
    { role: 'Motion Designer', name: 'Yuki Tanaka' },
  ],
  'project-3': [
    { role: 'Art Director', name: 'David Lee' },
    { role: 'Photographer', name: 'Emma Stone' },
    { role: 'Retoucher', name: 'Carlos Rivera' },
  ],
  'project-4': [
    { role: 'Creative Director', name: 'Sophie Laurent' },
    { role: 'Art Director', name: 'Marco Rossi' },
    { role: 'Cinematographer', name: 'Hana Ito' },
    { role: 'Editor', name: 'Jake Morrison' },
  ],
  'project-5': [
    { role: 'Strategy Lead', name: 'Priya Sharma' },
    { role: 'Designer', name: 'Erik Lindqvist' },
    { role: 'Sound Designer', name: 'Amara Osei' },
  ],
  'project-6': [
    { role: 'Creative Director', name: 'Luca Bianchi' },
    { role: 'Industrial Designer', name: 'Yves Morel' },
    { role: 'Photographer', name: 'Rina Hayashi' },
  ],
  'project-7': [
    { role: 'Art Director', name: 'Victoria Reed' },
    { role: 'Designer', name: 'Daniel Kwon' },
    { role: 'Stylist', name: 'Isabelle Fontaine' },
  ],
  'project-8': [
    { role: 'Creative Director', name: 'Mia Thompson' },
    { role: 'Brand Strategist', name: 'Rachel Liu' },
    { role: 'Photographer', name: 'Nadia Petrova' },
  ],
  'project-9': [
    { role: 'Art Director', name: 'Kai Müller' },
    { role: 'Motion Designer', name: 'Tomás Herrera' },
    { role: 'Developer', name: 'Sven Johansson' },
  ],
  'project-10': [
    { role: 'Creative Director', name: 'Olivia Hart' },
    { role: 'Designer', name: 'Felix Nguyen' },
    { role: 'Copywriter', name: 'Eleanor Cross' },
  ],
  'project-11': [
    { role: 'Art Director', name: 'Camille Dubois' },
    { role: 'Fashion Director', name: 'Léa Martin' },
    { role: 'Photographer', name: 'Antoine Bernard' },
    { role: 'Set Designer', name: 'Clara Mercier' },
  ],
};

export default function ProjectDetail() {
  const { locale, t, toggleLocale } = useLocale();
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const contentRef = useRef<HTMLDivElement>(null);
  const navRef = useRef<HTMLDivElement>(null);
  const project = id ? getProjectById(id, locale) : undefined;
  const categories = useMemo(() => getCategories(locale), [locale]);
  const [creditsOpen, setCreditsOpen] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const menuBtnRef = useRef<HTMLDivElement>(null);
  const menuItemsRef = useRef<HTMLDivElement>(null);
  const isAnimating = useRef(false);

  const openMenu = useCallback(() => {
    if (isAnimating.current) return;
    isAnimating.current = true;
    setMenuOpen(true);

    const btn = menuBtnRef.current;
    const items = menuItemsRef.current;
    if (!btn || !items) {
      isAnimating.current = false;
      return;
    }

    const tl = gsap.timeline({ onComplete: () => { isAnimating.current = false; } });
    tl.to(btn, {
      opacity: 0,
      scale: 0.85,
      duration: 0.25,
      ease: 'power3.in',
      onComplete: () => { btn.style.pointerEvents = 'none'; },
    });

    tl.set(items, { visibility: 'visible', pointerEvents: 'auto' });
    tl.fromTo(items.children, { opacity: 0, x: 24, scale: 0.92 }, {
      opacity: 1,
      x: 0,
      scale: 1,
      duration: 0.35,
      stagger: 0.06,
      ease: 'power3.out',
    }, '-=0.05');
  }, []);

  const closeMenu = useCallback(() => {
    if (isAnimating.current) return;
    isAnimating.current = true;

    const btn = menuBtnRef.current;
    const items = menuItemsRef.current;
    if (!btn || !items) {
      isAnimating.current = false;
      return;
    }

    const children = Array.from(items.children);
    const tl = gsap.timeline({
      onComplete: () => {
        isAnimating.current = false;
        setMenuOpen(false);
      },
    });

    tl.to([...children].reverse(), { opacity: 0, x: 24, scale: 0.92, duration: 0.25, stagger: 0.04, ease: 'power3.in' });
    tl.set(items, { visibility: 'hidden', pointerEvents: 'none' });
    tl.to(btn, {
      opacity: 1,
      scale: 1,
      duration: 0.35,
      ease: 'power3.out',
      onStart: () => { btn.style.pointerEvents = 'auto'; },
    }, '-=0.1');
  }, []);

  useEffect(() => {
    let lastY = window.scrollY;
    let visible = true;
    const THRESHOLD = 8;

    const onScroll = () => {
      const y = window.scrollY;
      const delta = y - lastY;

      if (delta > THRESHOLD && visible && y > 80) {
        visible = false;
        gsap.to(navRef.current, { y: -120, duration: 0.45, ease: 'power3.inOut' });
      } else if (delta < -THRESHOLD && !visible) {
        visible = true;
        gsap.to(navRef.current, { y: 0, duration: 0.45, ease: 'power3.out' });
      }
      lastY = y;
    };

    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    if (!contentRef.current) return;
    gsap.fromTo(contentRef.current.children, { opacity: 0, y: 60 }, { opacity: 1, y: 0, duration: 0.8, stagger: 0.15, ease: 'power3.out' });
  }, []);

  const handleClose = useCallback(() => {
    navigate('/');
  }, [navigate]);

  usePageMetadata({
    title: project?.title || 'Project',
    description: project?.description || siteConfig.seo.description[locale],
    image: project?.coverImage,
    type: 'article',
  });

  if (!project) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <p className="text-[#AFAEA7]">{t({ zh: '项目不存在', en: 'Project not found' })}</p>
      </div>
    );
  }

  const credits = mockCredits[project.id] || [];
  const images = project.images;

  return (
    <div className="min-h-screen bg-white relative select-none">
      <div ref={navRef} className="fixed top-0 left-0 right-0 z-50 px-8 pt-4" style={{ willChange: 'transform' }}>
        <div className="flex items-center justify-between h-12 px-6">
          <Link to="/" className="text-sm tracking-widest uppercase transition-opacity hover:opacity-70" style={{ color: '#AFAEA7', fontWeight: 700 }}>
            XIANYU
          </Link>

          <div className="absolute left-1/2 -translate-x-1/2">
            <NavButton onClick={handleClose}>{t({ zh: '关闭', en: 'Close' })}</NavButton>
          </div>

          <div className="relative flex items-center">
            <div ref={menuBtnRef}>
              <NavButton onClick={openMenu}>{t({ zh: '菜单', en: 'Menu' })}</NavButton>
            </div>

            <div ref={menuItemsRef} className="flex items-center gap-1.5" style={{ visibility: 'hidden', pointerEvents: 'none', position: 'absolute', right: 0, top: '50%', transform: 'translateY(-50%)' }}>
              <div className="h-[28px] w-[28px] flex items-center justify-center" style={{ backgroundColor: '#AFAEA7' }}>
                <div className="w-2.5 h-2.5 bg-black" />
              </div>
              <div onClick={toggleLocale} className="h-[28px] min-w-[36px] px-2 flex items-center justify-center cursor-pointer" style={{ backgroundColor: '#AFAEA7' }}>
                <span className="text-[11px] text-black">{siteConfig.localeLabel[locale]}</span>
              </div>
              <NavButton as="link" to="/">Work</NavButton>
              <NavButton as="link" to="/about">{t({ zh: '关于', en: 'About' })}</NavButton>
              <NavButton as="link" to="/contact">{t({ zh: '联系', en: 'Contact' })}</NavButton>
              <div onClick={closeMenu} className="cursor-pointer flex items-center justify-center transition-opacity hover:opacity-70" style={{ backgroundColor: '#AFAEA7', width: '28px', height: '28px' }}>
                <svg width="10" height="10" viewBox="0 0 10 10" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M1 1L9 9M9 1L1 9" stroke="#000" strokeWidth="1.5" />
                </svg>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div ref={contentRef} className="pt-[72px] px-8 pb-0">
        <div className="grid grid-cols-12 gap-x-4 mt-6 mb-14 h-[360px] items-start overflow-hidden">
          <div className="col-start-1 col-span-2 flex flex-col gap-0.5">
            {categories.map((cat) => {
              const isActive = cat === project.category;
              return (
                <span key={cat} className="text-[12px] leading-snug transition-colors cursor-default whitespace-nowrap" style={{ color: isActive ? '#000' : '#AFAEA7', fontWeight: isActive ? 700 : 400 }}>
                  {cat}
                </span>
              );
            })}
          </div>

          <div className="col-start-4 col-span-3">
            <button onClick={() => setCreditsOpen(!creditsOpen)} className="text-[13px] text-black cursor-pointer hover:opacity-70 transition-opacity flex items-center gap-1">
              <span className="inline-block w-3 text-center">{creditsOpen ? '✕' : '+'}</span>
              {t({ zh: 'Credits', en: 'Credits' })}
            </button>

            {creditsOpen && (
              <div className="mt-4 flex gap-8">
                <div className="flex flex-col gap-1">
                  {credits.map((c, i) => (
                    <span key={`role-${i}`} className="text-[12px] text-black whitespace-nowrap" style={{ fontWeight: 500 }}>
                      {c.role}
                    </span>
                  ))}
                </div>
                <div className="flex flex-col gap-1">
                  {credits.map((c, i) => (
                    <span key={`name-${i}`} className="text-[12px] text-[#AFAEA7] whitespace-nowrap">
                      {c.name}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </div>

          <div className="col-start-7 col-span-6">
            <div className="flex justify-between items-start">
              <span className="text-[13px] text-black" style={{ fontWeight: 500 }}>
                {project.client}
              </span>
              <span className="text-[13px] text-black" style={{ fontWeight: 500 }}>
                {project.year} / {project.location}
              </span>
            </div>
            <h1 className="mt-3 text-[clamp(1.8rem,3.5vw,3.2rem)] leading-[1.1] tracking-tight text-black" style={{ fontWeight: 400 }}>
              {project.tagline}
            </h1>
          </div>
        </div>

        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <ImageWithFallback src={images[0] || project.coverImage} alt={project.title} className="w-full aspect-[4/3] object-cover" />
            <ImageWithFallback src={images[1] || project.coverImage} alt={project.title} className="w-full aspect-[4/3] object-cover" />
          </div>

          <div className="grid grid-cols-1 gap-6">
            <ImageWithFallback src={images[2] || project.coverImage} alt={project.title} className="w-full aspect-[16/9] object-cover" />
          </div>
        </div>

        <div className="max-w-2xl mt-16 space-y-6">
          <p className="text-[15px] text-neutral-600 leading-relaxed">{project.description}</p>
          {project.body.map((paragraph) => (
            <p key={paragraph} className="text-[15px] text-neutral-600 leading-relaxed">
              {paragraph}
            </p>
          ))}
        </div>
      </div>

      <div className="mt-32 px-0">
        <HorizontalProjectStrip currentProjectId={project.id} />
      </div>

      <div className="fixed bottom-8 left-8 z-40">
        <div className="w-5 h-5 border border-[#AFAEA7] flex items-center justify-center">
          <div className="w-2.5 h-2.5 bg-black" />
        </div>
      </div>
    </div>
  );
}
