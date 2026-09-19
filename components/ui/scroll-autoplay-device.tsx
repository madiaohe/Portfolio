'use client';

import Image from 'next/image';
import {
  ScrollAutoplay,
  ScrollAutoplayContainer,
  ScrollAutoplayItem,
} from './scroll-autoplay';
import './scroll-autoplay-device.css';

export type ScrollAutoplayImage = {
  src: string;
  alt: string;
};

/**
 * All-in-one scroll-driven image player wrapped in a skeuomorphic
 * touchscreen device frame. Encapsulates the scroll container, sticky
 * stage, device shell, screen bezel and per-image crossfade so callers
 * only provide the images and an optional aspect ratio.
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
        {caption ? (
          <p className="scroll-autoplay-device__caption">{caption}</p>
        ) : null}
      </ScrollAutoplayContainer>
    </ScrollAutoplay>
  );
}
