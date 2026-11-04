'use client';

import { createContext } from 'react';

// Only prototype layouts provide this: ordinary detail links stay native anchors.
export const ProjectNavigationContext = createContext<
  ((href: string) => void) | null
>(null);
