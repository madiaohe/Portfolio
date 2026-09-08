import type { Metadata } from 'next';
import { ContactExperience } from '../../components/contact-experience';
import { FluidFooter } from '../../components/fluid-footer';

export const metadata: Metadata = {
  title: 'Contact',
  description: 'Start a conversation via email and social channels.',
};

export default function ContactPage() {
  return (
    <div className="contact-scene">
      <ContactExperience />
      <FluidFooter showControls={false} />
    </div>
  );
}
