import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { ComponentGallery } from './component-gallery';
import '../minimal.css';
import './preview.css';

export const metadata: Metadata = {
  title: 'Components — Xu Xianyu',
  robots: { index: false, follow: false },
};

export default function ComponentsPage() {
  if (process.env.NODE_ENV !== 'development') notFound();
  return <ComponentGallery />;
}
