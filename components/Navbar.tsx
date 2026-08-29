import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { Terminal, Activity, Settings, Menu, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface NavbarProps {
    onOpenTerminal?: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ onOpenTerminal }) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // Prevent background body scroll when mobile menu is open
  React.useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isMobileMenuOpen]);

  const linkClass = ({ isActive }: { isActive: boolean }) => 
    `relative font-mono tracking-wider transition-colors hover:text-accent whitespace-nowrap px-2 py-1 ${isActive ? 'text-accent font-bold' : 'text-textMuted'}`;

  const THEMES = [
    { name: 'Titanium Grey', color: '#E0E0E0', dim: '#666666', bg: 'bg-[#E0E0E0]' },
    { name: 'Electric Cyan', color: '#4CA9FF', dim: '#2B5C8A', bg: 'bg-[#4CA9FF]' },
    { name: 'Cyber Amber', color: '#FFD700', dim: '#B89B00', bg: 'bg-[#FFD700]' },
    { name: 'Matrix Lime', color: '#00FF9D', dim: '#065F46', bg: 'bg-[#00FF9D]' },
    { name: 'Hazard Orange', color: '#FF7A00', dim: '#994400', bg: 'bg-[#FF7A00]' },
    { name: 'Neon Crimson', color: '#FF4C4C', dim: '#990000', bg: 'bg-[#FF4C4C]' },
    { name: 'Synth Purple', color: '#A855F7', dim: '#581C87', bg: 'bg-[#A855F7]' },
  ];

  const [activeColor, setActiveColor] = useState('#4CA9FF');

  React.useEffect(() => {
    const savedColor = localStorage.getItem('theme_accent');
    const savedDim = localStorage.getItem('theme_accent_dim');
    if (savedColor && savedDim) {
      document.documentElement.style.setProperty('--color-accent', savedColor);
      document.documentElement.style.setProperty('--color-accent-dim', savedDim);
      setActiveColor(savedColor);
    }
  }, []);

  const toggleTheme = (color: string, dimColor: string) => {
    document.documentElement.style.setProperty('--color-accent', color);
    document.documentElement.style.setProperty('--color-accent-dim', dimColor);
    localStorage.setItem('theme_accent', color);
    localStorage.setItem('theme_accent_dim', dimColor);
    setActiveColor(color);
  };

  const navLinks = [
    { path: '/', label: 'HOME' },
    { path: '/overview', label: 'OVERVIEW' },
    { path: '/ai', label: 'AI' },
    { path: '/work', label: 'WORK' },
    { path: '/projects', label: 'SYSTEMS' },
    { path: '/automation', label: 'AUTOMATION' },
    { path: '/about', label: 'ABOUT' },
    { path: '/certs', label: 'CERTS' }
  ];

  return (
    <header className="border-b border-border flex items-center justify-between gap-4 bg-black sticky top-0 z-50 px-4 sm:px-6 py-3">
        {/* Animated background line */}
        <motion.div 
          initial={{ x: "-100%" }}
          animate={{ x: "100%" }}
          transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
          className="absolute bottom-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-accent to-transparent opacity-30 pointer-events-none"
        />
        
        <div className="flex items-center gap-3 shrink-0">
          <NavLink to="/" onClick={() => setIsMobileMenuOpen(false)} className="group relative">
            <div className="w-9 h-9 bg-accent flex items-center justify-center font-display font-bold text-background text-xl hover:bg-white transition-colors relative z-10 neon-border">
              RN
            </div>
            <div className="absolute -inset-1 bg-accent/20 blur-sm group-hover:bg-accent/50 transition-colors pointer-events-none"></div>
          </NavLink>
          <span className="hidden lg:flex font-mono text-[10px] text-textMuted tracking-widest uppercase items-center gap-2">
            <Activity size={10} className="text-accent animate-pulse" />
            Online
          </span>
        </div>
        
        {/* Mobile Menu Toggle */}
        <div className="md:hidden flex items-center gap-2.5">
            <a href="/resume.pdf" download="Rajeet_Nair_Resume.pdf" className="bg-accent text-background font-mono text-[10px] font-bold uppercase px-2.5 py-1.5 active:bg-white transition-colors">
              Resume
            </a>
            <button 
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="text-textMuted hover:text-accent p-2 rounded focus:outline-none"
              aria-label="Toggle menu"
              aria-expanded={isMobileMenuOpen}
            >
              {isMobileMenuOpen ? <X size={24} className="text-accent" /> : <Menu size={24} />}
            </button>
        </div>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center">
            <div className="flex gap-3 xl:gap-5 text-xs md:text-sm font-mono tracking-wider min-w-max items-center">
                {navLinks.map((link) => (
                  <NavLink key={link.path} to={link.path} className={linkClass}>
                    {({ isActive }) => (
                      <>
                        <span className="relative z-10">[{link.label}]</span>
                        {isActive && (
                          <motion.div 
                            layoutId="nav-active"
                            className="absolute inset-0 bg-accent/10 border-b-2 border-accent z-0"
                            transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                          />
                        )}
                      </>
                    )}
                  </NavLink>
                ))}
            </div>

            {/* Terminal & Resume */}
            <div className="flex items-center gap-4 pl-4 ml-2 border-l border-border">
                <motion.button 
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={onOpenTerminal} 
                    className="flex items-center gap-1.5 font-mono text-xs text-textMuted hover:text-accent transition-colors group"
                >
                    <Terminal size={13} className="group-hover:animate-pulse" />
                    [TERMINAL]
                </motion.button>

                <a 
                  href="/resume.pdf" 
                  download="Rajeet_Nair_Resume.pdf"
                  className="bg-accent text-background font-mono text-xs font-bold uppercase tracking-wider px-4 py-1.5 hover:bg-white transition-colors"
                >
                  Resume
                </a>

                <div className="flex items-center gap-2 pl-2">
                    <Settings size={12} className="text-textMuted animate-spin-slow" />
                    <div className="flex items-center gap-1.5 p-1 bg-[#0a0a0a] border border-border rounded-full">
                        {THEMES.map((theme) => (
                          <button 
                            key={theme.name}
                            onClick={() => toggleTheme(theme.color, theme.dim)} 
                            className={`w-3 h-3 ${theme.bg} rounded-full transition-all duration-200 hover:scale-125 ${activeColor === theme.color ? 'ring-2 ring-white scale-125' : 'opacity-60 hover:opacity-100'}`} 
                            title={theme.name}
                            aria-label={`${theme.name} theme`}
                          />
                        ))}
                    </div>
                </div>
            </div>
        </div>

        {/* Mobile Navigation Drawer Modal with dvh screen handling */}
        <AnimatePresence>
          {isMobileMenuOpen && (
            <motion.div 
              initial={{ opacity: 0, y: -8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.2, ease: "easeOut" }}
              className="md:hidden fixed inset-x-0 top-[57px] h-[calc(100dvh-57px)] z-[100] bg-black p-5 flex flex-col justify-between overflow-y-auto border-b border-border shadow-2xl touch-scroll"
            >
              <div className="flex flex-col gap-1.5 font-mono text-sm tracking-wider">
                <div className="text-[10px] text-textMuted uppercase tracking-widest mb-2 border-b border-border pb-2 flex justify-between items-center">
                  <span>// NAVIGATION_SYSTEM</span>
                  <span className="text-accent text-[9px] flex items-center gap-1.5">
                    <Activity size={9} className="animate-pulse" /> LIVE
                  </span>
                </div>
                {navLinks.map((link, idx) => (
                  <NavLink 
                    key={link.path} 
                    to={link.path} 
                    onClick={() => setIsMobileMenuOpen(false)}
                    className={({ isActive }) => `p-3 rounded border-l-2 flex items-center justify-between text-sm ${isActive ? 'border-accent text-accent bg-accent/10 font-bold' : 'border-transparent text-textMuted active:text-white active:bg-surface/50'}`}
                  >
                    <span>[{link.label}]</span>
                    <span className="text-[10px] opacity-60">0{idx + 1}</span>
                  </NavLink>
                ))}
                <NavLink 
                  to="/code" 
                  onClick={() => setIsMobileMenuOpen(false)}
                  className={({ isActive }) => `p-3 rounded border-l-2 flex items-center justify-between text-sm ${isActive ? 'border-accent text-accent bg-accent/10 font-bold' : 'border-transparent text-textMuted active:text-white active:bg-surface/50'}`}
                >
                  <span>[CODE VAULT]</span>
                  <span className="text-[10px] opacity-60">0{navLinks.length + 1}</span>
                </NavLink>
              </div>
              
              <div className="flex flex-col gap-4 border-t border-border pt-4 mt-6 pb-6">
                <div className="flex flex-col sm:flex-row gap-3 items-center justify-between">
                  <button 
                      onClick={() => {
                        setIsMobileMenuOpen(false);
                        setTimeout(() => onOpenTerminal?.(), 150);
                      }} 
                      className="w-full sm:w-auto flex items-center justify-center gap-2 font-mono text-xs text-textMain active:text-accent transition-colors bg-[#0a0a0a] px-4 py-2.5 border border-border"
                  >
                      <Terminal size={14} className="text-accent" />
                      [LAUNCH TERMINAL]
                  </button>

                  <div className="flex items-center gap-2">
                      <Settings size={13} className="text-textMuted" />
                      <div className="flex items-center gap-2 p-1.5 bg-[#0a0a0a] border border-border rounded-full">
                          {THEMES.map((theme) => (
                            <button 
                              key={theme.name}
                              onClick={() => toggleTheme(theme.color, theme.dim)} 
                              className={`w-5 h-5 ${theme.bg} rounded-full transition-all active:scale-90 ${activeColor === theme.color ? 'ring-2 ring-white scale-110' : 'opacity-60'}`} 
                              title={theme.name}
                              aria-label={`${theme.name} theme`}
                            />
                          ))}
                      </div>
                  </div>
                </div>

                <a 
                  href="/resume.pdf" 
                  download="Rajeet_Nair_Resume.pdf"
                  className="w-full text-center bg-accent text-background font-mono text-xs font-bold uppercase py-3 active:bg-white transition-colors"
                >
                  Download Dossier / Resume
                </a>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
    </header>
  );
};
