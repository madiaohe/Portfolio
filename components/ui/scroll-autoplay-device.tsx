'use client';

import Image from 'next/image';
import { useEffect, useRef, useState } from 'react';
import { motion, MotionValue, useTransform } from 'motion/react';
import {
  ScrollAutoplay,
  ScrollAutoplayContainer,
  ScrollAutoplayItem,
  useScrollAutoplayProgress,
} from './scroll-autoplay';
import './scroll-autoplay-device.css';

export type ScrollAutoplayImage = {
  src: string;
  alt: string;
};

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
}: {
  image: ScrollAutoplayImage;
  index: number;
  count: number;
  wrapWidth: number;
  progress: MotionValue<number>;
}) {
  const start = index / count;
  const end = (index + 1) / count;
  // Initial: right-aligned horizontal row with a 2px gap (24 + 2 = 26 step).
  const clusterWidth = count * 26 - 2;
  const startX = wrapWidth - clusterWidth + index * 26;
  // Final: left-aligned row with the standard 8px gap (24 + 8 = 32 step).
  const endX = index * 32;
  const x = useTransform(progress, [start, end], [startX, endX]);
  return (
    <motion.div className="scroll-autoplay-device__thumb" style={{ x }}>
      <Image
        src={image.src}
        alt={image.alt}
        width={24}
        height={24}
        className="scroll-autoplay-device__thumb-image"
      />
    </motion.div>
  );
}

function ThumbnailRail({ images }: { images: ScrollAutoplayImage[] }) {
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
        />
      ))}
    </div>
  );
}

/**
 * All-in-one scroll-driven image player wrapped in a skeuomorphic
 * touchscreen device frame. Encapsulates the scroll container, sticky
 * stage, device shell, screen bezel, per-image crossfade and a 24px
 * thumbnail rail whose thumbnails deal out one by one, right to left.
 */
export function ScrollAutoplayDevice({
  images,
  aspect = '4:3',
  scrollHeight = '200vh',
  caption,
  className,
  imageClassName,
}: {
  images: ScrollAutoplayImage[];
  aspect?: string;
  scrollHeight?: string;
  caption?: string;
  className?: string;
  imageClassName?: string;
}) {
  if (!images.length) return null;

  return (
    <ScrollAutoplay className={className} style={{ height: scrollHeight }}>
      <ScrollAutoplayContainer className="scroll-autoplay-device__stage">
        <div
          className="scroll-autoplay-device"
          style={
            {
              '--gallery-aspect': aspect.replace(':', ' / '),
            } as React.CSSProperties
          }
        >
          <div className="scroll-autoplay-device__screen">
            {images.map((image, index) => (
              <ScrollAutoplayItem
                key={image.src}
                index={index}
                totalImages={images.length}
              >
                <Image
                  fill
                  src={image.src}
                  alt={image.alt}
                  className={`scroll-autoplay-device__image${imageClassName ? ` ${imageClassName}` : ''}`}
                  priority={index === 0}
                />
              </ScrollAutoplayItem>
            ))}
          </div>
        </div>
        <ThumbnailRail images={images} />
        {caption ? (
          <p className="scroll-autoplay-device__caption">{caption}</p>
        ) : null}
      </ScrollAutoplayContainer>
    </ScrollAutoplay>
  );
}
