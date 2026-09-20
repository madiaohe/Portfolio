'use client';

import { ChevronLeft, ChevronRight, Maximize, Minimize } from 'lucide-react';
import Image from 'next/image';
import {
  useCallback,
  useEffect,
  useId,
  useRef,
  useState,
  type CSSProperties,
  type RefObject,
} from 'react';
import { createPortal } from 'react-dom';
import {
  motion,
  MotionValue,
  useReducedMotion,
  useTransform,
} from 'motion/react';
import { useSiteLanguage } from '@/lib/hooks/use-site-language';
import { cn } from '@/lib/utils';
import {
  ScrollAutoplay,
  ScrollAutoplayContainer,
  ScrollAutoplayItem,
  useScrollAutoplayIndex,
  useScrollAutoplayProgress,
} from './scroll-autoplay';
import './scroll-autoplay-device.css';

export type ScrollAutoplayImage = {
  src: string;
  alt: string;
};

type FullscreenCopy = {
  title: string;
  open: string;
  close: string;
  previous: string;
  next: string;
  images: string;
  showImage: string;
};

function getAspectStyle(aspect: string) {
  const normalized = aspect.replace(':', ' / ');
  const [width, height] = normalized.split('/').map(Number);
  const ratio =
    Number.isFinite(width) && Number.isFinite(height) && height > 0
      ? width / height
      : 4 / 3;

  return {
    '--gallery-aspect': normalized,
    '--gallery-ratio': ratio,
  } as CSSProperties;
}

/**
 * One thumbnail. All thumbnails start clustered at the device's right edge
 * (bottom-right corner). Each thumbnail owns its own progress slot and, during
 * that slot, slides to its final position in the left-aligned row, so the
 * thumbnails "deal out" one by one from right to left.
 */
function Thumb({
  image,
  index,
  count,
  wrapWidth,
  progress,
  size,
}: {
  image: ScrollAutoplayImage;
  index: number;
  count: number;
  wrapWidth: number;
  progress: MotionValue<number>;
  size: number;
}) {
  const start = index / count;
  const end = (index + 1) / count;
  // Both the clustered (right edge) and expanded (left row) states share a
  // uniform 4px gap, so one step drives both positions (size + 4).
  const step = size + 4;
  // Full cluster span: (count - 1) steps plus the first thumbnail, so the
  // cluster's right edge stays flush with the rail regardless of the gap.
  const clusterWidth = (count - 1) * step + size;
  const startX = wrapWidth - clusterWidth + index * step;
  const endX = index * step;
  const x = useTransform(progress, [start, end], [startX, endX]);
  return (
    <motion.div className="scroll-autoplay-device__thumb" style={{ x }}>
      <Image
        src={image.src}
        alt={image.alt}
        width={size}
        height={size}
        className="scroll-autoplay-device__thumb-image"
      />
    </motion.div>
  );
}

function ThumbnailRail({
  images,
  size,
}: {
  images: ScrollAutoplayImage[];
  size: number;
}) {
  const progress = useScrollAutoplayProgress();
  const wrapRef = useRef<HTMLDivElement>(null);
  const [wrapWidth, setWrapWidth] = useState(0);

  useEffect(() => {
    const wrap = wrapRef.current;
    if (!wrap) return;
    const measure = () => setWrapWidth(wrap.clientWidth);
    measure();
    const ro = new ResizeObserver(measure);
    ro.observe(wrap);
    return () => ro.disconnect();
  }, [images.length]);

  return (
    <div ref={wrapRef} className="scroll-autoplay-device__thumbs">
      {images.map((image, index) => (
        <Thumb
          key={image.src}
          image={image}
          index={index}
          count={images.length}
          wrapWidth={wrapWidth}
          progress={progress}
          size={size}
        />
      ))}
    </div>
  );
}

function getFullscreenThumbnailX({
  index,
  count,
  wrapWidth,
  activeIndex,
  size,
}: {
  index: number;
  count: number;
  wrapWidth: number;
  activeIndex: number;
  size: number;
}) {
  // Same uniform 4px gap as the inline rail: one step drives both states.
  const step = size + 4;
  const clusterWidth = (count - 1) * step + size;
  const startX = wrapWidth - clusterWidth + index * step;
  const endX = index * step;
  if (count <= 1) return endX;

  const progress = activeIndex / (count - 1);
  const start = index / count;
  const end = (index + 1) / count;
  const localProgress = Math.max(
    0,
    Math.min(1, (progress - start) / (end - start)),
  );

  return startX + (endX - startX) * localProgress;
}

function FullscreenThumbnailRail({
  images,
  activeIndex,
  reduceMotion,
  copy,
  onSelect,
  size,
}: {
  images: ScrollAutoplayImage[];
  activeIndex: number;
  reduceMotion: boolean;
  copy: FullscreenCopy;
  onSelect: (index: number) => void;
  size: number;
}) {
  const wrapRef = useRef<HTMLFieldSetElement>(null);
  const [wrapWidth, setWrapWidth] = useState(0);

  useEffect(() => {
    const wrap = wrapRef.current;
    if (!wrap) return;
    const measure = () => setWrapWidth(wrap.clientWidth);
    measure();
    const ro = new ResizeObserver(measure);
    ro.observe(wrap);
    return () => ro.disconnect();
  }, [images.length]);

  return (
    <fieldset
      ref={wrapRef}
      className="scroll-autoplay-fullscreen__thumbs"
      aria-label={copy.images}
    >
      {images.map((image, index) => (
        <motion.button
          key={image.src}
          type="button"
          className="scroll-autoplay-fullscreen__thumb"
          initial={false}
          animate={{
            x: getFullscreenThumbnailX({
              index,
              count: images.length,
              wrapWidth,
              activeIndex,
              size,
            }),
          }}
          transition={
            reduceMotion
              ? { duration: 0 }
              : { duration: 0.2, ease: [0.22, 1, 0.36, 1] }
          }
          aria-label={`${copy.showImage} ${index + 1}: ${image.alt}`}
          aria-current={index === activeIndex ? 'true' : undefined}
          title={image.alt}
          onClick={() => onSelect(index)}
        >
          <Image fill src={image.src} alt="" sizes={`${size}px`} />
        </motion.button>
      ))}
    </fieldset>
  );
}

function FullscreenPreview({
  id,
  images,
  aspect,
  initialIndex,
  imageClassName,
  copy,
  returnFocusRef,
  onClose,
  thumbnailSize = 24,
}: {
  id: string;
  images: ScrollAutoplayImage[];
  aspect: string;
  initialIndex: number;
  imageClassName?: string;
  copy: FullscreenCopy;
  returnFocusRef: RefObject<HTMLButtonElement | null>;
  onClose: () => void;
  thumbnailSize?: number;
}) {
  const reduceMotion = useReducedMotion() ?? false;
  const layerRef = useRef<HTMLDivElement>(null);
  const surfaceRef = useRef<HTMLDialogElement>(null);
  const closeRef = useRef<HTMLButtonElement>(null);
  const wheelDeltaRef = useRef(0);
  const lastWheelTimeRef = useRef(0);
  const wheelBlockedUntilRef = useRef(0);
  const swipeStartYRef = useRef<number | null>(null);
  const lastIndex = images.length - 1;
  const [activeIndex, setActiveIndex] = useState(() =>
    Math.max(0, Math.min(initialIndex, lastIndex)),
  );
  const activeImage = images[activeIndex];

  const selectIndex = useCallback(
    (nextIndex: number) => {
      setActiveIndex((currentIndex) => {
        const clampedIndex = Math.max(0, Math.min(nextIndex, lastIndex));
        if (clampedIndex === currentIndex) return currentIndex;
        return clampedIndex;
      });
    },
    [lastIndex],
  );

  const step = useCallback(
    (delta: number) => {
      setActiveIndex((currentIndex) => {
        const nextIndex = Math.max(
          0,
          Math.min(currentIndex + delta, lastIndex),
        );
        if (nextIndex === currentIndex) return currentIndex;
        return nextIndex;
      });
    },
    [lastIndex],
  );

  const handleWheel = useCallback(
    (event: globalThis.WheelEvent) => {
      const delta =
        Math.abs(event.deltaY) >= Math.abs(event.deltaX)
          ? event.deltaY
          : event.deltaX;
      if (!delta) return;
      event.preventDefault();

      const now = performance.now();
      if (now - lastWheelTimeRef.current > 180) wheelDeltaRef.current = 0;
      if (
        wheelDeltaRef.current !== 0 &&
        Math.sign(wheelDeltaRef.current) !== Math.sign(delta)
      ) {
        wheelDeltaRef.current = 0;
      }
      lastWheelTimeRef.current = now;
      wheelDeltaRef.current += delta;

      if (
        Math.abs(wheelDeltaRef.current) < 60 ||
        now < wheelBlockedUntilRef.current
      ) {
        return;
      }

      step(wheelDeltaRef.current > 0 ? 1 : -1);
      wheelDeltaRef.current = 0;
      wheelBlockedUntilRef.current = now + 420;
    },
    [step],
  );

  useEffect(() => {
    const layer = layerRef.current;
    const surface = surfaceRef.current;
    if (!layer || !surface) return;
    const returnFocusTarget = returnFocusRef.current;

    const focusFrame = requestAnimationFrame(() =>
      closeRef.current?.focus({ preventScroll: true }),
    );
    const previousOverflow = document.body.style.overflow;
    const siblings = Array.from(document.body.children)
      .filter(
        (element): element is HTMLElement =>
          element instanceof HTMLElement && element !== layer,
      )
      .map((element) => ({
        element,
        inert: element.inert,
        ariaHidden: element.getAttribute('aria-hidden'),
      }));

    document.body.style.overflow = 'hidden';
    for (const sibling of siblings) {
      sibling.element.inert = true;
      sibling.element.setAttribute('aria-hidden', 'true');
    }

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.isComposing || event.defaultPrevented) return;

      if (event.key === 'Escape') {
        event.preventDefault();
        onClose();
        return;
      }

      if (event.key === 'ArrowLeft' || event.key === 'ArrowUp') {
        event.preventDefault();
        step(-1);
        return;
      }

      if (event.key === 'ArrowRight' || event.key === 'ArrowDown') {
        event.preventDefault();
        step(1);
        return;
      }

      if (event.key !== 'Tab') return;
      const surface = surfaceRef.current;
      if (!surface) return;
      const focusable = Array.from(
        surface.querySelectorAll<HTMLElement>(
          'button:not([disabled]), [href], [tabindex]:not([tabindex="-1"])',
        ),
      ).filter((element) => element.offsetParent !== null);
      const first = focusable[0];
      const last = focusable.at(-1);
      if (!first || !last) return;

      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    surface.addEventListener('wheel', handleWheel, { passive: false });
    return () => {
      cancelAnimationFrame(focusFrame);
      window.removeEventListener('keydown', handleKeyDown);
      surface.removeEventListener('wheel', handleWheel);
      document.body.style.overflow = previousOverflow;
      for (const sibling of siblings) {
        sibling.element.inert = sibling.inert;
        if (sibling.ariaHidden === null) {
          sibling.element.removeAttribute('aria-hidden');
        } else {
          sibling.element.setAttribute('aria-hidden', sibling.ariaHidden);
        }
      }
      requestAnimationFrame(() =>
        returnFocusTarget?.focus({ preventScroll: true }),
      );
    };
  }, [handleWheel, onClose, returnFocusRef, step]);

  return createPortal(
    <div
      ref={layerRef}
      className="ui-scope scroll-autoplay-fullscreen"
      style={{ '--thumb-size': `${thumbnailSize}px` } as CSSProperties}
    >
      <button
        type="button"
        tabIndex={-1}
        className="scroll-autoplay-fullscreen__backdrop"
        aria-label={copy.close}
        onClick={onClose}
      />
      <motion.dialog
        ref={surfaceRef}
        id={id}
        open
        aria-modal="true"
        aria-label={copy.title}
        className="scroll-autoplay-fullscreen__surface"
        initial={reduceMotion ? false : { opacity: 0, scale: 0.985 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={
          reduceMotion
            ? { duration: 0 }
            : { type: 'spring', stiffness: 360, damping: 34, mass: 0.7 }
        }
      >
        <header className="scroll-autoplay-fullscreen__header">
          <p className="scroll-autoplay-fullscreen__status" aria-live="polite">
            {activeIndex + 1} / {images.length} · {activeImage.alt}
          </p>
          <button
            ref={closeRef}
            type="button"
            data-slot="scroll-autoplay-fullscreen-control"
            className="scroll-autoplay-fullscreen__icon-button"
            aria-label={copy.close}
            title={copy.close}
            onClick={onClose}
          >
            <Minimize aria-hidden="true" size={16} strokeWidth={1.6} />
          </button>
        </header>

        <div className="scroll-autoplay-fullscreen__viewer">
          <button
            type="button"
            data-slot="scroll-autoplay-fullscreen-control"
            className="scroll-autoplay-fullscreen__icon-button scroll-autoplay-fullscreen__previous"
            aria-label={copy.previous}
            title={copy.previous}
            disabled={activeIndex === 0}
            onClick={() => step(-1)}
          >
            <ChevronLeft aria-hidden="true" size={16} strokeWidth={1.6} />
          </button>

          {/* oxlint-disable-next-line jsx-a11y/no-noninteractive-element-interactions -- dedicated pointer swipe surface */}
          <motion.div
            className="scroll-autoplay-fullscreen__device"
            style={getAspectStyle(aspect)}
            onPointerDown={(event) => {
              swipeStartYRef.current = event.clientY;
              event.currentTarget.setPointerCapture(event.pointerId);
            }}
            onPointerUp={(event) => {
              const startY = swipeStartYRef.current;
              swipeStartYRef.current = null;
              if (event.currentTarget.hasPointerCapture(event.pointerId)) {
                event.currentTarget.releasePointerCapture(event.pointerId);
              }
              if (startY === null || Math.abs(startY - event.clientY) < 48)
                return;
              step(startY > event.clientY ? 1 : -1);
            }}
            onPointerCancel={() => {
              swipeStartYRef.current = null;
            }}
          >
            <div className="scroll-autoplay-fullscreen__screen">
              {/* All frames sit side by side; the strip slides so consecutive
                  images stay joined during the transition, mirroring the
                  inline scroll player (no fade, no dark gap between pages). */}
              <motion.div
                className="scroll-autoplay-fullscreen__strip"
                animate={{ x: `-${activeIndex * 100}%` }}
                transition={
                  reduceMotion
                    ? { duration: 0 }
                    : {
                        type: 'spring',
                        stiffness: 300,
                        damping: 34,
                        mass: 0.7,
                      }
                }
              >
                {images.map((image) => (
                  <div
                    key={image.src}
                    className="scroll-autoplay-fullscreen__frame"
                  >
                    <Image
                      fill
                      src={image.src}
                      alt={image.alt}
                      draggable={false}
                      sizes="(max-width: 640px) 92vw, 90vw"
                      className={cn(
                        'scroll-autoplay-fullscreen__image',
                        imageClassName,
                      )}
                    />
                  </div>
                ))}
              </motion.div>
            </div>
          </motion.div>

          <button
            type="button"
            data-slot="scroll-autoplay-fullscreen-control"
            className="scroll-autoplay-fullscreen__icon-button scroll-autoplay-fullscreen__next"
            aria-label={copy.next}
            title={copy.next}
            disabled={activeIndex === lastIndex}
            onClick={() => step(1)}
          >
            <ChevronRight aria-hidden="true" size={16} strokeWidth={1.6} />
          </button>
        </div>

        <FullscreenThumbnailRail
          images={images}
          activeIndex={activeIndex}
          reduceMotion={reduceMotion}
          copy={copy}
          onSelect={selectIndex}
          size={thumbnailSize}
        />
      </motion.dialog>
    </div>,
    document.body,
  );
}

function ScrollAutoplayDeviceStage({
  images,
  aspect,
  caption,
  imageClassName,
  fullscreenPreview,
  thumbnailSize,
}: {
  images: ScrollAutoplayImage[];
  aspect: string;
  caption?: string;
  imageClassName?: string;
  fullscreenPreview: boolean;
  thumbnailSize: number;
}) {
  const { language } = useSiteLanguage();
  const activeIndex = useScrollAutoplayIndex();
  const [fullscreenOpen, setFullscreenOpen] = useState(false);
  const fullscreenTriggerRef = useRef<HTMLButtonElement>(null);
  const fullscreenId = useId();
  const copy: FullscreenCopy =
    language === 'zh'
      ? {
          title: '全屏预览',
          open: '打开全屏预览',
          close: '关闭全屏预览',
          previous: '上一张',
          next: '下一张',
          images: '预览缩略图',
          showImage: '查看图片',
        }
      : {
          title: 'Fullscreen preview',
          open: 'Open fullscreen preview',
          close: 'Close fullscreen preview',
          previous: 'Previous image',
          next: 'Next image',
          images: 'Preview thumbnails',
          showImage: 'Show image',
        };
  const closeFullscreen = useCallback(() => setFullscreenOpen(false), []);

  return (
    <>
      <ScrollAutoplayContainer className="scroll-autoplay-device__stage">
        <div className="scroll-autoplay-device" style={getAspectStyle(aspect)}>
          <div className="scroll-autoplay-device__screen">
            {images.map((image, index) => (
              <ScrollAutoplayItem key={image.src} index={index}>
                <Image
                  fill
                  src={image.src}
                  alt={image.alt}
                  className={cn(
                    'scroll-autoplay-device__image',
                    imageClassName,
                  )}
                  priority={index === 0}
                />
              </ScrollAutoplayItem>
            ))}
          </div>
          {fullscreenPreview ? (
            <button
              ref={fullscreenTriggerRef}
              type="button"
              data-slot="scroll-autoplay-fullscreen-trigger"
              className="scroll-autoplay-device__fullscreen-trigger"
              aria-label={copy.open}
              aria-haspopup="dialog"
              aria-expanded={fullscreenOpen}
              aria-controls={fullscreenId}
              title={copy.open}
              onClick={() => setFullscreenOpen(true)}
            >
              <Maximize aria-hidden="true" size={16} strokeWidth={1.6} />
            </button>
          ) : null}
        </div>
        <ThumbnailRail images={images} size={thumbnailSize} />
        {caption ? (
          <p className="scroll-autoplay-device__caption">{caption}</p>
        ) : null}
      </ScrollAutoplayContainer>

      {fullscreenOpen ? (
        <FullscreenPreview
          id={fullscreenId}
          images={images}
          aspect={aspect}
          initialIndex={activeIndex}
          imageClassName={imageClassName}
          copy={copy}
          returnFocusRef={fullscreenTriggerRef}
          onClose={closeFullscreen}
          thumbnailSize={thumbnailSize}
        />
      ) : null}
    </>
  );
}

/**
 * All-in-one scroll-driven image player wrapped in a skeuomorphic
 * touchscreen device frame. Encapsulates the scroll container, sticky
 * stage, device shell, screen bezel, per-image snap transition and a 24px
 * thumbnail rail whose thumbnails deal out one by one, right to left.
 */
export function ScrollAutoplayDevice({
  images,
  aspect = '4:3',
  scrollHeight = '200vh',
  caption,
  className,
  imageClassName,
  fullscreenPreview = false,
  deviceWidth = 640,
  thumbnailSize = 24,
}: {
  images: ScrollAutoplayImage[];
  aspect?: string;
  scrollHeight?: string;
  caption?: string;
  className?: string;
  imageClassName?: string;
  fullscreenPreview?: boolean;
  /** Max device shell width (number = px, or any CSS length). */
  deviceWidth?: number | string;
  /** Square thumbnail edge length in px; also drives the deal-out rail. */
  thumbnailSize?: number;
}) {
  if (!images.length) return null;

  const widthValue =
    typeof deviceWidth === 'number' ? `${deviceWidth}px` : deviceWidth;

  return (
    <ScrollAutoplay
      className={className}
      totalItems={images.length}
      style={
        {
          height: scrollHeight,
          '--device-width': widthValue,
          '--thumb-size': `${thumbnailSize}px`,
        } as CSSProperties
      }
    >
      <ScrollAutoplayDeviceStage
        images={images}
        aspect={aspect}
        caption={caption}
        imageClassName={imageClassName}
        fullscreenPreview={fullscreenPreview}
        thumbnailSize={thumbnailSize}
      />
    </ScrollAutoplay>
  );
}
