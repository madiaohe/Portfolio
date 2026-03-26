import { Link } from 'react-router-dom';

export function Logo() {
  return (
    <Link 
      to="/" 
      className="fixed top-8 left-8 z-50 text-sm font-bold tracking-widest uppercase transition-opacity hover:opacity-70"
      style={{ color: '#AFAEA7' }}
    >
      XIANYU
    </Link>
  );
}
