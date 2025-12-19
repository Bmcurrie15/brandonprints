import React, { Suspense } from 'react';
import { HashRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Layout from './components/Layout';
import ThreeBackground from './components/ThreeBackground';
import Home from './pages/Home';
import Gallery from './pages/Gallery';
import PrintDetail from './pages/PrintDetail';
import Materials from './pages/Materials';
import About from './pages/About';

// ScrollToTop component to fix scroll position on route change
const ScrollToTop = () => {
    const { pathname } = React.useMemo(() => window.location, []);
    React.useEffect(() => {
        window.scrollTo(0, 0);
    }, [pathname]);
    return null;
}

const App: React.FC = () => {
  return (
    <Router>
      {/* Background is independent of layout flow */}
      <ThreeBackground />
      
      <Layout>
        <Suspense fallback={<div className="p-10 text-center">Loading...</div>}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/gallery" element={<Gallery />} />
            <Route path="/materials" element={<Materials />} />
            <Route path="/prints/:slug" element={<PrintDetail />} />
            <Route path="/about" element={<About />} />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </Suspense>
      </Layout>
    </Router>
  );
};

export default App;