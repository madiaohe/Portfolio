import type { Metadata } from 'next';
import { AboutTimeline } from './about-timeline';
import './about.css';

export const metadata: Metadata = {
  title: 'About',
  description:
    'The people, projects and experiences behind my design practice.',
};

export default function AboutPage() {
  return <AboutTimeline />;
}
