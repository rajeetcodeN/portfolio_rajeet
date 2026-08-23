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
      { threshold: 0.1 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <section id={id} ref={sectionRef} className={`w-full relative ${className}`}>
      {/* Decorative Side Rules */}
      <div className="absolute left-0 top-0 bottom-0 w-px bg-border hidden lg:block ml-12 z-0"></div>
      <div className="absolute right-0 top-0 bottom-0 w-px bg-border hidden lg:block mr-12 z-0"></div>

      {/* Parallax Watermark Title - Optimized with will-change */}
      {title && (
        <div 
          className="absolute top-20 left-0 w-full font-display font-bold text-[12rem] md:text-[20rem] uppercase text-center pointer-events-none select-none overflow-hidden z-0 opacity-0 transition-opacity duration-1000 will-change-transform"
          style={{ 
             color: 'transparent', 
             WebkitTextStroke: '2px rgba(255,255,255,0.02)',
             opacity: isVisible ? 1 : 0,
             transform: 'translateY(50px)' 
          }}
        >
          {title.split('_')[0]}
        </div>
      )}

      <div className="max-w-[1920px] mx-auto relative z-10 border-b border-border">
        <div className="grid grid-cols-1 md:grid-cols-12 min-h-[100px]">
          {/* Title Column (Left) - Sliding Rail */}
          {title && (
            <div className="md:col-span-3 lg:col-span-2 p-6 md:p-8 border-b md:border-b-0 md:border-r border-border relative overflow-hidden">
              {/* Visual Guide Rail for Sliding Text */}
              <div className="absolute right-0 top-0 bottom-0 w-px bg-accent/20 hidden md:block"></div>
              
              {/* Sticky Container - Slides in on scroll, glides down until section end */}
              <motion.div 
                className="sticky top-24"
                initial={{ opacity: 0, x: -40 }}
                animate={isVisible ? { opacity: 1, x: 0 } : { opacity: 0, x: -40 }}
                transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
              >
                  <div className="flex items-center gap-2 mb-2 text-accent">
                     <span className="text-[10px] font-mono tracking-widest uppercase">Sec.</span>
                     <span className="h-px w-8 bg-accent"></span>
                  </div>
                  <h2 className="text-3xl xl:text-4xl font-display font-bold uppercase text-white leading-[0.95] tracking-wide">
                  {title.split('_').map((part, i, arr) => (
                    <React.Fragment key={i}>
                      {part}
                      {i < arr.length - 1 && <span className="text-accent">_</span>}
                      {i < arr.length - 1 && <br />}
                    </React.Fragment>
                  ))}
                  </h2>
                  <div className="mt-2 flex gap-1">
                    <div className="w-1 h-1 bg-textMuted/50"></div>
                    <div className="w-1 h-1 bg-textMuted/50"></div>
                    <div className="w-1 h-1 bg-textMuted/50"></div>
                  </div>
              </motion.div>
            </div>
          )}
          
          {/* Content Column (Right) - Removed blur for performance */}
          <div className={`${title ? 'md:col-span-9 lg:col-span-10' : 'md:col-span-12'} relative bg-background/70`}>
             {/* Tech Corner Marker Top-Right of content area */}
             <div className="absolute top-0 right-0 w-4 h-4 border-t border-r border-white/20"></div>
             {children}
          </div>
        </div>
      </div>
    </section>
  );
};