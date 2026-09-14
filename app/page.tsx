import type { Metadata } from 'next';
import { ReferenceHome } from './reference-home';
import './minimal.css';

export const metadata: Metadata = {
  title: 'Xu Xianyu',
  robots: { index: false, follow: false },
};

export default function HomePage() {
  return <ReferenceHome />;
}
