import type { Metadata } from 'next';
import { DesignPrinciples } from '../components/design-principles';
import { FluidFooter } from '../components/fluid-footer';
import { HeroVideo } from '../components/hero-video';
import { WorkCategories } from '../components/work-category-motion';

export const metadata: Metadata = {
  title: 'Home',
};

export default function HomePage() {
  return (
    <>
      <main className="home">
        <HeroVideo />

        <WorkCategories />

        <DesignPrinciples />
      </main>

      <FluidFooter />
    </>
  );
}
