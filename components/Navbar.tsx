import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { Terminal, Activity, Settings, Menu, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface NavbarProps {
    onOpenTerminal?: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ onOpenTerminal }) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const linkClass = ({ isActive }: { isActive: boolean }) => 
    `relative font-mono tracking-wider transition-colors hover:text-accent whitespace-nowrap px-2 py-1 ${isActive ? 'text-accent font-bold' : 'text-textMuted'}`;

  const toggleTheme = (color: string, dimColor: string) => {
    document.documentElement.style.setProperty('--color-accent', color);
    document.documentElement.style.setProperty('--color-accent-dim', dimColor);
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
    <div className="border-b border-border flex items-center justify-between gap-4 bg-background/80 backdrop-blur-xl sticky top-0 z-50 px-6 py-3">
        {/* Animated background line */}
        <motion.div 
          initial={{ x: "-100%" }}
          animate={{ x: "100%" }}
          transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
          className="absolute bottom-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-accent to-transparent opacity-30"
        />
        
        <div className="flex items-center gap-3 shrink-0">
          <NavLink to="/" className="group relative">
            <div className="w-9 h-9 bg-accent flex items-center justify-center font-display font-bold text-background text-xl hover:bg-white transition-colors relative z-10 neon-border">
              RN
            </div>
            <div className="absolute -inset-1 bg-accent/20 blur-sm group-hover:bg-accent/50 transition-colors"></div>
          </NavLink>
          <span className="hidden lg:flex font-mono text-[10px] text-textMuted tracking-widest uppercase items-center gap-2">
            <Activity size={10} className="text-accent animate-pulse" />
            Online
          </span>
        </div>
        
        {/* Mobile Menu Toggle */}
        <div className="md:hidden flex items-center gap-3">
            <a href="/resume.pdf" className="bg-accent text-background font-mono text-[10px] font-bold uppercase px-3 py-1.5">Resume</a>
            <button 
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="text-textMuted hover:text-accent transition-colors p-1"
              aria-label="Toggle menu"
            >
              {isMobileMenuOpen ? <X size={22} /> : <Menu size={22} />}
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
                  className="bg-accent text-background font-mono text-xs font-bold uppercase tracking-wider px-4 py-1.5 hover:bg-white transition-colors"
                >
                  Resume
                </a>

                <div className="flex items-center gap-2.5">
                    <Settings size={12} className="text-textMuted animate-spin-slow" />
                    <div className="flex gap-2">
                        <button onClick={() => toggleTheme('#4CA9FF', '#2B5C8A')} className="w-3 h-3 bg-[#4CA9FF] rounded-full hover:scale-150 transition-transform shadow-[0_0_5px_rgba(76,169,255,0.5)]" title="Blue"></button>
                        <button onClick={() => toggleTheme('#FFD700', '#B89B00')} className="w-3 h-3 bg-[#FFD700] rounded-full hover:scale-150 transition-transform shadow-[0_0_5px_rgba(255,215,0,0.5)]" title="Yellow"></button>
                        <button onClick={() => toggleTheme('#FF4C4C', '#990000')} className="w-3 h-3 bg-[#FF4C4C] rounded-full hover:scale-150 transition-transform shadow-[0_0_5px_rgba(255,76,76,0.5)]" title="Red"></button>
                    </div>
                </div>
            </div>
        </div>

        {/* Mobile Navigation Drawer Modal */}
        <AnimatePresence>
          {isMobileMenuOpen && (
            <motion.div 
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.2 }}
              className="md:hidden fixed inset-x-0 top-[57px] bottom-0 z-50 bg-background/95 backdrop-blur-2xl p-6 flex flex-col justify-between overflow-y-auto border-b border-border shadow-2xl"
            >
              <div className="flex flex-col gap-2 font-mono text-sm tracking-wider">
                <div className="text-[10px] text-textMuted uppercase tracking-widest mb-2 border-b border-border pb-1">
                  // NAVIGATION_SYSTEM
                </div>
                <NavLink 
                  to="/overview" 
                  onClick={() => setIsMobileMenuOpen(false)}
                  className={({ isActive }) => `p-3.5 rounded border-l-2 flex items-center justify-between ${isActive ? 'border-accent text-accent bg-accent/10 font-bold' : 'border-transparent text-textMuted hover:text-white hover:bg-surface/50'}`}
                >
                  <span>[QUICK VIEW]</span>
                  <span className="text-[10px] opacity-60">00</span>
                </NavLink>
                {navLinks.map((link, idx) => (
                  <NavLink 
                    key={link.path} 
                    to={link.path} 
                    onClick={() => setIsMobileMenuOpen(false)}
                    className={({ isActive }) => `p-3.5 rounded border-l-2 flex items-center justify-between ${isActive ? 'border-accent text-accent bg-accent/10 font-bold' : 'border-transparent text-textMuted hover:text-white hover:bg-surface/50'}`}
                  >
                    <span>[{link.label}]</span>
                    <span className="text-[10px] opacity-60">0{idx + 1}</span>
                  </NavLink>
                ))}
                <NavLink 
                  to="/code" 
                  onClick={() => setIsMobileMenuOpen(false)}
                  className={({ isActive }) => `p-3.5 rounded border-l-2 flex items-center justify-between ${isActive ? 'border-accent text-accent bg-accent/10 font-bold' : 'border-transparent text-textMuted hover:text-white hover:bg-surface/50'}`}
                >
                  <span>[CODE]</span>
                  <span className="text-[10px] opacity-60">09</span>
                </NavLink>
              </div>
              
              <div className="flex items-center justify-between border-t border-border pt-4 mt-6">
                <button 
                    onClick={() => {
                      onOpenTerminal?.();
                      setIsMobileMenuOpen(false);
                    }} 
                    className="flex items-center gap-2 font-mono text-xs text-textMuted hover:text-accent transition-colors bg-surface px-3 py-2 border border-border"
                >
                    <Terminal size={14} className="text-accent" />
                    [TERMINAL]
                </button>

                <div className="flex items-center gap-3">
                    <Settings size={14} className="text-textMuted animate-spin-slow" />
                    <div className="flex gap-2.5">
                        <button onClick={() => toggleTheme('#4CA9FF', '#2B5C8A')} className="w-5 h-5 bg-[#4CA9FF] rounded-full shadow-[0_0_8px_rgba(76,169,255,0.5)]" title="Blue"></button>
                        <button onClick={() => toggleTheme('#FFD700', '#B89B00')} className="w-5 h-5 bg-[#FFD700] rounded-full shadow-[0_0_8px_rgba(255,215,0,0.5)]" title="Yellow"></button>
                        <button onClick={() => toggleTheme('#FF4C4C', '#990000')} className="w-5 h-5 bg-[#FF4C4C] rounded-full shadow-[0_0_8px_rgba(255,76,76,0.5)]" title="Red"></button>
                    </div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
    </div>
  );
};
