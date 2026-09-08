import Link from 'next/link';
import '../journal.css';

export default function ArticleNotFound() {
  return (
    <main className="journal-page journal-missing">
      <p className="journal-entry__category">Journal / 404</p>
      <h1>This page is still unwritten.</h1>
      <p>The article may have moved, or this address may be incomplete.</p>
      <Link href="/journal">← Back to Journal</Link>
    </main>
  );
}
