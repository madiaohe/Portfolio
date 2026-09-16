'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect, useRef, useState } from 'react';

const navigationItems = [
  { href: '/about', label: 'About' },
  { href: '/contact', label: 'Contact' },
  { href: '/journal', label: 'Journal' },
] as const;

export function SiteHeader() {
  const pathname = usePathname();
  const isReading = pathname.startsWith('/journal/');
  const isMinimal =
    pathname === '/' ||
    pathname === '/components' ||
    pathname.startsWith('/work/') ||
    pathname.startsWith('/writing/');
  const [isVisible, setIsVisible] = useState(true);
  const scrollAnchorRef = useRef(0);

  useEffect(() => {
    if (isReading || isMinimal) return;
    const directionThreshold = 6;
    const topThreshold = 8;
    let animationFrame = 0;

    scrollAnchorRef.current = window.scrollY;

    const updateVisibility = () => {
      animationFrame = 0;
      const currentScrollY = Math.max(window.scrollY, 0);
      const distanceFromAnchor = currentScrollY - scrollAnchorRef.current;

      if (currentScrollY <= topThreshold) {
        setIsVisible(true);
        scrollAnchorRef.current = currentScrollY;
        return;
      }

      if (Math.abs(distanceFromAnchor) >= directionThreshold) {
        setIsVisible(distanceFromAnchor < 0);
        scrollAnchorRef.current = currentScrollY;
      }
    };

    const handleScroll = () => {
      if (!animationFrame) {
        animationFrame = window.requestAnimationFrame(updateVisibility);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });

    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.cancelAnimationFrame(animationFrame);
    };
  }, [isReading, isMinimal, pathname]);

  if (isMinimal) return null;

  if (isReading) {
    return (
      <header className="reading-header">
        <Link href="/" aria-label="XIANYU, home">
          XIANYU
        </Link>
        <Link href="/journal">Journal</Link>
      </header>
    );
  }

  return (
    <header className="site-header" data-visible={isVisible ? 'true' : 'false'}>
      <div className="site-header__inner">
        <Link className="site-header__logo" href="/" aria-label="XIANYU, home">
          XIANYU
        </Link>

        <nav className="site-header__nav" aria-label="Primary navigation">
          {navigationItems.map((item) => (
            <Link key={item.href} href={item.href}>
              {item.label}
            </Link>
          ))}
        </nav>
      </div>
    </header>
  );
}
