import Link from 'next/link';
import '../../minimal.css';

export default function WritingNotFound() {
  return (
    <main className="minimal-site">
      <div className="minimal-shell">
        <h1 className="minimal-heading">Article not found / 文章未找到</h1>
        <Link href="/#writing-heading">All writing / 所有文章</Link>
      </div>
    </main>
  );
}
