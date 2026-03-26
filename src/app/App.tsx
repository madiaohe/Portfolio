import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from '@/app/pages/Home';
import About from '@/app/pages/About';
import Contact from '@/app/pages/Contact';
import ProjectDetail from '@/app/pages/ProjectDetail';
import NotFound from '@/app/pages/NotFound';
import { SmoothScroll } from '@/app/components/SmoothScroll';
import { LocaleProvider } from '@/app/providers/LocaleProvider';

export default function App() {
  return (
    <Router>
      <LocaleProvider>
        <SmoothScroll>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/project/:id" element={<ProjectDetail />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </SmoothScroll>
      </LocaleProvider>
    </Router>
  );
}
