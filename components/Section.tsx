import React, { useRef, useEffect, useState } from 'react';
import { motion } from 'framer-motion';

interface SectionProps {
  id?: string;
  title?: string;
  children: React.ReactNode;
  className?: string;
  noBorder?: boolean;
}

export const Section: React.FC<SectionProps> = ({ id, title, children, className = "", noBorder = false }) => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsVisible(entry.isIntersecting);
      },
      { threshold: 0.05 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <section id={id} ref={sectionRef} className={`w-full relative ${className}`}>
      {/* Motion.dev Inspired Muted Animated Grid Overlay */}
      <div className="absolute inset-0 bg-grid-motion-muted pointer-events-none z-0"></div>
      <div className="absolute inset-0 bg-gradient-to-b from-cyan-500/2 via-transparent to-blue-500/2 pointer-events-none z-0 animate-grid-shimmer"></div>

      {/* Decorative Side Rules */}
      <div className="absolute left-0 top-0 bottom-0 w-px bg-border hidden lg:block ml-12 z-0 pointer-events-none"></div>
      <div className="absolute right-0 top-0 bottom-0 w-px bg-border hidden lg:block mr-12 z-0 pointer-events-none"></div>

      {/* Parallax Watermark Title */}
      {title && (
        <div 
          className="absolute top-16 left-0 w-full font-display font-bold text-[7rem] md:text-[11rem] uppercase text-center pointer-events-none select-none overflow-hidden z-0 opacity-0 transition-opacity duration-1000 will-change-transform"
          style={{ 
             color: 'transparent', 
             WebkitTextStroke: '1.5px rgba(255,255,255,0.02)',
             opacity: isVisible ? 1 : 0,
             transform: 'translateY(30px)' 
          }}
        >
          {title.split('_')[0]}
        </div>
      )}

      <div className="max-w-[1920px] mx-auto relative z-10 border-b border-border">
        <div className="grid grid-cols-1 md:grid-cols-12 min-h-[80px]">
          {/* Title Column (Left) - Sticky Sliding Rail */}
          {title && (
            <div className="md:col-span-3 lg:col-span-2 p-5 md:p-6 border-b md:border-b-0 md:border-r border-border relative">
              {/* Vertical Guide Rail Line */}
              <div className="absolute right-0 top-0 bottom-0 w-px bg-accent/20 hidden md:block"></div>
              
              {/* Sticky Container */}
              <motion.div 
                className="sticky top-24"
                initial={{ opacity: 0, x: -30 }}
                animate={isVisible ? { opacity: 1, x: 0 } : { opacity: 0, x: -30 }}
                transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
              >
                  {/* Clean SEC. header line */}
                  <div className="flex items-center gap-2 mb-1.5 text-accent">
                     <span className="text-[9px] font-mono tracking-widest uppercase">SEC.</span>
                     <span className="h-px w-6 bg-accent"></span>
                  </div>

                  {/* Section Title */}
                  <h2 className="text-2xl xl:text-3xl font-display font-bold uppercase text-white leading-[0.95] tracking-wide">
                  {title.split('_').map((part, i, arr) => (
                    <React.Fragment key={i}>
                      {part}
                      {i < arr.length - 1 && <span className="text-accent">_</span>}
                      {i < arr.length - 1 && <br />}
                    </React.Fragment>
                  ))}
                  </h2>

                  {/* Clean 3-dot footer indicator */}
                  <div className="mt-3 flex gap-1">
                    <div className="w-1 h-1 bg-textMuted/50"></div>
                    <div className="w-1 h-1 bg-textMuted/50"></div>
                    <div className="w-1 h-1 bg-textMuted/50"></div>
                  </div>
              </motion.div>
            </div>
          )}
          
          {/* Content Column (Right) - Transparent background so grid animation shows through */}
          <div className={`${title ? 'md:col-span-9 lg:col-span-10' : 'md:col-span-12'} relative bg-transparent`}>
             {/* Motion.dev Tech Corner Markers */}
             <div className="absolute top-0 right-0 w-4 h-4 border-t border-r border-cyan-400/40"></div>
             <div className="absolute bottom-0 left-0 w-4 h-4 border-b border-l border-cyan-400/40"></div>
             {children}
          </div>
        </div>
      </div>
    </section>
  );
};