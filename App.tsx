import React, { useState, useEffect, Suspense } from 'react';
import { HashRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { Home } from './pages/Home';
import { About } from './pages/About';
import { Work } from './pages/Work';
import { ProjectsPage } from './pages/ProjectsPage';
import { Overview } from './pages/Overview';
import { AIScreen } from './pages/AIScreen';
import { ChatOverlay } from './components/ChatOverlay';
import { MessageSquare, Loader2 } from 'lucide-react';

// Lazy Load heavy components
const ProjectDetail = React.lazy(() => import('./pages/ProjectDetail').then(module => ({ default: module.ProjectDetail })));
const CodeVault = React.lazy(() => import('./pages/CodeVault').then(module => ({ default: module.CodeVault })));
const CertsPage = React.lazy(() => import('./pages/CertsPage').then(module => ({ default: module.CertsPage })));
const Automation = React.lazy(() => import('./pages/Automation').then(module => ({ default: module.Automation })));

const ScrollToTop = () => {
  const { pathname } = useLocation();
  React.useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
};

// Optimized Boot Sequence — Fast initial paint for low LCP
const BootSequence = ({ onComplete }: { onComplete: () => void }) => {
  useEffect(() => {
    // Instant boot sequence trigger to optimize LCP
    const timer = setTimeout(onComplete, 120);
    return () => clearTimeout(timer);
  }, [onComplete]);

  return (
    <div className="fixed inset-0 bg-black z-[1000] flex flex-col items-center justify-center font-mono text-accent">
       <div className="w-64">
          <div className="flex justify-between items-center mb-4 border-b border-accent/30 pb-2">
             <span className="text-xs tracking-widest">BOOT_SEQ_FAST_V2</span>
             <Loader2 className="animate-spin text-accent" size={14} />
          </div>
          <div className="text-sm typing-effect opacity-90">&gt; INITIALIZING_KERNEL...</div>
          <div className="mt-4 h-1 w-full bg-surface relative overflow-hidden">
             <div className="absolute inset-0 bg-accent animate-progress-bar"></div>
          </div>
       </div>
    </div>
  );
};

// Minimal loading fallback
const PageLoader = () => (
    <div className="min-h-[50vh] flex items-center justify-center text-accent">
        <Loader2 className="animate-spin" size={32} />
    </div>
);

function App() {
  const [isLoading, setIsLoading] = useState(true);
  const [isChatOpen, setIsChatOpen] = useState(false);

  if (isLoading) {
    return <BootSequence onComplete={() => setIsLoading(false)} />;
  }

  return (
    <Router>
        <div className="min-h-screen bg-black text-textMain font-sans selection:bg-accent selection:text-black relative">
          
          {/* Subtle Top Ambient Lighting */}
          <div className="fixed top-0 left-1/2 -translate-x-1/2 w-[800px] h-[350px] bg-accent/5 blur-[140px] pointer-events-none z-0"></div>
          
          <ScrollToTop />
          <Navbar onOpenTerminal={() => setIsChatOpen(true)} />
          
          <main className="relative z-10 pl-0 transition-opacity duration-700 animate-fade-in w-full overflow-x-clip">
            <Suspense fallback={<PageLoader />}>
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/overview" element={<Overview />} />
                    <Route path="/ai" element={<AIScreen />} />
                    <Route path="/about" element={<About />} />
                    <Route path="/work" element={<Work />} />
                    <Route path="/projects" element={<ProjectsPage />} />
                    <Route path="/project/:id" element={<ProjectDetail />} />
                    <Route path="/code" element={<CodeVault />} />
                    <Route path="/certs" element={<CertsPage />} />
                    <Route path="/automation" element={<Automation />} />
                </Routes>
            </Suspense>
          </main>
          
          <Footer />

          {/* Global Terminal Overlay */}
          <ChatOverlay isOpen={isChatOpen} onClose={() => setIsChatOpen(false)} />

          {/* Floating Action Button - Toggles Terminal with Safe Mobile Insets */}
          <button 
            onClick={() => setIsChatOpen(prev => !prev)}
            className="fixed bottom-5 right-5 sm:bottom-8 sm:right-8 z-40 w-12 h-12 sm:w-14 sm:h-14 bg-accent rounded-full flex items-center justify-center shadow-[0_0_25px_rgba(76,169,255,0.4)] active:scale-95 sm:hover:scale-110 transition-transform group"
            aria-label="Open Terminal"
          >
              <div className="absolute inset-0 rounded-full border border-white/30 animate-ping opacity-25 pointer-events-none"></div>
              <MessageSquare size={22} className="text-background group-hover:text-white transition-colors" />
          </button>
        </div>
    </Router>
  );
}

export default App;