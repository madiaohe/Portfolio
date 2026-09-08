import type { Metadata } from 'next';
import { ReferenceHome } from '../components/reference-home';
import './minimal.css';

export const metadata: Metadata = {
  title: 'Emil Kowalski — Local study',
  robots: { index: false, follow: false },
};

export default function HomePage() {
  return <ReferenceHome />;
}
