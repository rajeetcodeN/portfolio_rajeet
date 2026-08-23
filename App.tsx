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
import { NeatBackground } from './components/NeatBackground';
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
    <div className="fixed inset-0 bg-background z-[1000] flex flex-col items-center justify-center font-mono text-accent">
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
        <div className="min-h-screen bg-background text-textMain font-sans selection:bg-accent selection:text-black relative">
          
          {/* WebGL Breathing Gradient Background */}
          <NeatBackground />

          {/* Global Muted Neon Grid Overlay Across All Pages */}
          <div className="fixed inset-0 bg-cyber-grid z-[1] pointer-events-none opacity-50"></div>
          <div className="fixed inset-0 bg-radial-vignette z-[2] pointer-events-none"></div>

          <div className="fixed inset-0 bg-noise z-50 mix-blend-overlay pointer-events-none opacity-30"></div>

          {/* Cyberpunk CRT Layer */}
          <div className="fixed inset-0 scanlines-overlay z-[60] pointer-events-none opacity-20"></div>
          
          <ScrollToTop />
          <Navbar onOpenTerminal={() => setIsChatOpen(true)} />
          
          <main className="relative z-10 pl-0 transition-opacity duration-1000 animate-fade-in">
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

          {/* Floating Action Button - Toggles Terminal */}
          <button 
            onClick={() => setIsChatOpen(prev => !prev)}
            className="fixed bottom-6 right-6 md:bottom-8 md:right-8 z-[90] w-14 h-14 bg-accent rounded-full flex items-center justify-center shadow-[0_0_20px_rgba(76,169,255,0.4)] hover:scale-110 transition-transform group"
            aria-label="Open Terminal"
          >
              <div className="absolute inset-0 rounded-full border border-white/20 animate-ping opacity-20"></div>
              <MessageSquare size={24} className="text-background group-hover:text-white transition-colors" />
          </button>
        </div>
    </Router>
  );
}

export default App;