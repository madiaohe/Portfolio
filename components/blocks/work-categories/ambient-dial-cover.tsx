'use client';

/* oxlint-disable jsx-a11y/no-noninteractive-element-interactions, jsx-a11y/no-noninteractive-tabindex -- This focusable 3D application implements arrow-key rotation and Home reset; its controls are described in the accessible name. */

import { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import type { createAmbientDialScene } from './ambient-dial-scene';

type Scene = ReturnType<typeof createAmbientDialScene>;

export function AmbientDialCover() {
  const host = useRef<HTMLDivElement>(null);
  const scene = useRef<Scene | null>(null);
  const rotation = useRef({ x: 0.1, y: -0.32 });
  const drag = useRef<{
    id: number;
    x: number;
    y: number;
    startX: number;
    startY: number;
  } | null>(null);
  const [ready, setReady] = useState(false);
  const [value, setValue] = useState(28);

  useEffect(() => {
    const element = host.current;
    if (!element) return;
    let cancelled = false;
    let initializing = false;
    function onContextLost(event: Event) {
      event.preventDefault();
      setReady(false);
      scene.current?.dispose();
      scene.current = null;
    }
    async function initialize() {
      if (initializing) return;
      initializing = true;
      try {
        const { createAmbientDialScene } = await import('./ambient-dial-scene');
        if (cancelled) return;
        scene.current = createAmbientDialScene(element!);
        element!
          .querySelector('canvas')
          ?.addEventListener('webglcontextlost', onContextLost);
        setReady(true);
      } catch {
        // Original product photograph remains available when WebGL is unavailable.
        element!.querySelector('canvas')?.remove();
      }
    }
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          observer.disconnect();
          void initialize();
        }
      },
      { rootMargin: '250px' },
    );
    observer.observe(element);
    return () => {
      cancelled = true;
      observer.disconnect();
      element
        .querySelector('canvas')
        ?.removeEventListener('webglcontextlost', onContextLost);
      scene.current?.dispose();
      scene.current = null;
    };
  }, []);

  function reset() {
    rotation.current = { x: 0.1, y: -0.32 };
    scene.current?.reset();
  }
  return (
    <div className="ambient-cover" data-ready={ready}>
      <Image
        className="ambient-cover__fallback"
        src="/media/work-categories/digital-products.png"
        alt="Ambient Dial: silver controller with a black screen and aluminium dial."
        width={1254}
        height={1254}
        unoptimized
        loading="lazy"
        draggable="false"
      />
      <div
        ref={host}
        className="ambient-cover__viewport"
        role="application"
        aria-label="Ambient Dial 3D preview. Drag or use arrow keys to rotate. Press Home to reset."
        tabIndex={ready ? 0 : -1}
        onPointerDown={(event) => {
          if (!ready || !event.isPrimary || event.button !== 0) return;
          drag.current = {
            id: event.pointerId,
            x: event.clientX,
            y: event.clientY,
            startX: rotation.current.x,
            startY: rotation.current.y,
          };
          event.currentTarget.setPointerCapture(event.pointerId);
        }}
        onPointerMove={(event) => {
          const current = drag.current;
          if (!current || current.id !== event.pointerId) return;
          const scale = 3 / Math.max(event.currentTarget.clientWidth, 1);
          rotation.current = {
            x: Math.max(
              -0.32,
              Math.min(
                0.38,
                current.startX + (event.clientY - current.y) * scale,
              ),
            ),
            y: Math.max(
              -1.15,
              Math.min(
                1.15,
                current.startY + (event.clientX - current.x) * scale,
              ),
            ),
          };
          scene.current?.rotate(rotation.current.x, rotation.current.y);
        }}
        onPointerUp={(event) => {
          if (drag.current?.id !== event.pointerId) return;
          drag.current = null;
          if (event.currentTarget.hasPointerCapture(event.pointerId))
            event.currentTarget.releasePointerCapture(event.pointerId);
        }}
        onPointerCancel={() => {
          drag.current = null;
        }}
        onLostPointerCapture={() => {
          drag.current = null;
        }}
        onKeyDown={(event) => {
          if (event.key === 'Home') {
            event.preventDefault();
            reset();
            return;
          }
          if (
            !['ArrowLeft', 'ArrowRight', 'ArrowUp', 'ArrowDown'].includes(
              event.key,
            )
          )
            return;
          event.preventDefault();
          const current = rotation.current;
          current.x = Math.max(
            -0.32,
            Math.min(
              0.38,
              current.x +
                (event.key === 'ArrowUp'
                  ? -0.12
                  : event.key === 'ArrowDown'
                    ? 0.12
                    : 0),
            ),
          );
          current.y = Math.max(
            -1.15,
            Math.min(
              1.15,
              current.y +
                (event.key === 'ArrowLeft'
                  ? -0.2
                  : event.key === 'ArrowRight'
                    ? 0.2
                    : 0),
            ),
          );
          scene.current?.rotate(current.x, current.y);
        }}
      />
      {ready && (
        <>
          <button
            className="ambient-cover__reset"
            type="button"
            onClick={reset}
            aria-label="Reset product view"
            title="Reset view"
          >
            ↺
          </button>
          <div className="ambient-cover__controls">
            <span className="ambient-cover__hint">Drag to explore</span>
            <label className="ambient-cover__dial">
              <span>Turn dial</span>
              <input
                type="range"
                min="0"
                max="100"
                value={value}
                aria-valuetext={`${value} percent`}
                onChange={(event) => {
                  const next = Number(event.currentTarget.value);
                  setValue(next);
                  scene.current?.setValue(next);
                }}
              />
            </label>
          </div>
        </>
      )}
    </div>
  );
}
