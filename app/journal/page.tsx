import type { Metadata } from 'next';
import { JournalList } from '../../components/journal-list';
import { journalListEntries } from '../../lib/journal-list-entries';
import './journal.css';

export const metadata: Metadata = {
  title: 'Journal — XIANYU',
  description: 'Notes on design, making, and everyday observations.',
};

export default function JournalPage() {
  return <JournalList entries={journalListEntries} />;
}
