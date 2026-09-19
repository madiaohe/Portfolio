'use client';
import { cn } from '@/lib/utils';
import {
  motion,
  HTMLMotionProps,
  MotionValue,
  useScroll,
  useTransform,
  UseScrollOptions,
} from 'motion/react';
import React from 'react';

interface ScrollAutoplayProps extends HTMLMotionProps<'div'> {
  offset?: UseScrollOptions['offset'];
}
interface ScrollAutoPlayItemProps extends HTMLMotionProps<'div'> {
  index: number;
  totalImages: number;
}
interface ScrollAutoplayContextValue {
  scrollYProgress: MotionValue<number>;
}
const ScrollAutoplayContext = React.createContext<
  ScrollAutoplayContextValue | undefined
>(undefined);
function useScrollAutoplayContext() {
  const context = React.useContext(ScrollAutoplayContext);
  if (context === undefined) {
    throw new Error(
      'useScrollAutoplayContext must be used within a ScrollAutoplayContextProvider',
    );
  }
  return context;
}

/** Expose the shared scroll progress for consumers like thumbnail rails. */
export function useScrollAutoplayProgress() {
  return useScrollAutoplayContext().scrollYProgress;
}

export function ScrollAutoplay({
  offset = ['start start', 'end end'],
  className,
  ...props
}: ScrollAutoplayProps) {
  const scrollRef = React.useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: scrollRef,
    offset: offset,
  });

  return (
    <ScrollAutoplayContext.Provider value={{ scrollYProgress }}>
      <motion.div
        ref={scrollRef}
        className={cn('relative min-h-screen', className)}
        {...props}
      />
    </ScrollAutoplayContext.Provider>
  );
}

export function ScrollAutoplayContainer({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn('sticky top-0 left-0 w-full min-h-fit', className)}
      {...props}
    />
  );
}

export function ScrollAutoplayItem({
  index,
  totalImages,
  className,
  style,
  ...props
}: ScrollAutoPlayItemProps) {
  const { scrollYProgress } = useScrollAutoplayContext();

  // Horizontal rail: images sit side by side (left: index * 100%) and the
  // whole rail translates left as the page scrolls, so each frame slides in
  // from the right and out to the left — a right-to-left carousel.
  const x = useTransform(
    scrollYProgress,
    [0, 1],
    ['0%', `${-(totalImages - 1) * 100}%`],
  );

  return (
    <motion.div
      className={cn('absolute inset-y-0 left-0 size-full', className)}
      style={{
        left: `${index * 100}%`,
        x,
        willChange: 'transform',
        ...style,
      }}
      {...props}
    />
  );
}
