'use client';
import { cn } from '@/lib/utils';
import {
  motion,
  HTMLMotionProps,
  MotionValue,
  useMotionValueEvent,
  useReducedMotion,
  useScroll,
  UseScrollOptions,
} from 'motion/react';
import React from 'react';

interface ScrollAutoplayProps extends HTMLMotionProps<'div'> {
  offset?: UseScrollOptions['offset'];
  totalItems: number;
}
interface ScrollAutoPlayItemProps extends HTMLMotionProps<'div'> {
  index: number;
}
interface ScrollAutoplayContextValue {
  activeIndex: number;
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

/** Expose the currently snapped frame for controls such as fullscreen preview. */
export function useScrollAutoplayIndex() {
  return useScrollAutoplayContext().activeIndex;
}

export function ScrollAutoplay({
  offset = ['start start', 'end end'],
  totalItems,
  className,
  ...props
}: ScrollAutoplayProps) {
  const scrollRef = React.useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: scrollRef,
    offset: offset,
  });
  const lastIndex = Math.max(totalItems - 1, 0);
  const initialIndex = Math.round(scrollYProgress.get() * lastIndex);
  const activeIndexRef = React.useRef(initialIndex);
  const [activeIndex, setActiveIndex] = React.useState(initialIndex);
  const visibleIndex = Math.min(activeIndex, lastIndex);

  useMotionValueEvent(scrollYProgress, 'change', (progress) => {
    const exactIndex = Math.max(0, Math.min(1, progress)) * lastIndex;
    let nextIndex = activeIndexRef.current;

    // A small hysteresis band prevents rapid toggling when the scroll position
    // hovers around the midpoint between two images.
    while (nextIndex < lastIndex && exactIndex >= nextIndex + 0.55) {
      nextIndex += 1;
    }
    while (nextIndex > 0 && exactIndex <= nextIndex - 0.55) {
      nextIndex -= 1;
    }

    if (nextIndex !== activeIndexRef.current) {
      activeIndexRef.current = nextIndex;
      setActiveIndex(nextIndex);
    }
  });

  return (
    <ScrollAutoplayContext.Provider
      value={{ activeIndex: visibleIndex, scrollYProgress }}
    >
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
  className,
  style,
  ...props
}: ScrollAutoPlayItemProps) {
  const { activeIndex } = useScrollAutoplayContext();
  const reduceMotion = useReducedMotion();

  return (
    <motion.div
      className={cn('absolute inset-y-0 left-0 size-full', className)}
      style={{
        left: `${index * 100}%`,
        willChange: 'transform',
        ...style,
      }}
      animate={{ x: `${-activeIndex * 100}%` }}
      transition={
        reduceMotion
          ? { duration: 0 }
          : { type: 'spring', stiffness: 300, damping: 34, mass: 0.7 }
      }
      {...props}
    />
  );
}
