'use client';

import { useEffect, useRef } from 'react';

export function HeroVideo() {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const video = videoRef.current;
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');

    if (!video) {
      return;
    }

    const syncPlayback = () => {
      if (reducedMotion.matches) {
        video.pause();
        video.currentTime = 0;
        return;
      }

      void video.play().catch(() => undefined);
    };

    syncPlayback();
    reducedMotion.addEventListener('change', syncPlayback);

    return () => reducedMotion.removeEventListener('change', syncPlayback);
  }, []);

  return (
    <section className="hero" aria-label="Featured visual">
      <div className="hero__frame">
        <video
          ref={videoRef}
          className="hero__video"
          autoPlay
          loop
          muted
          playsInline
          preload="metadata"
          poster="/media/hero-cornfield-poster.jpg"
          aria-hidden="true"
        >
          <source src="/media/hero-cornfield.mp4" type="video/mp4" />
        </video>
      </div>
    </section>
  );
}
