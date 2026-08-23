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
      {/* Decorative Side Rules */}
      <div className="absolute left-0 top-0 bottom-0 w-px bg-border hidden lg:block ml-12 z-0 pointer-events-none"></div>
      <div className="absolute right-0 top-0 bottom-0 w-px bg-border hidden lg:block mr-12 z-0 pointer-events-none"></div>

      {/* Parallax Watermark Title */}
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
          {/* Title Column (Left) - Sticky Sliding Rail (NO overflow-hidden to allow CSS sticky) */}
          {title && (
            <div className="md:col-span-3 lg:col-span-2 p-6 md:p-8 border-b md:border-b-0 md:border-r border-border relative">
              {/* Vertical Guide Rail Line */}
              <div className="absolute right-0 top-0 bottom-0 w-px bg-accent/20 hidden md:block"></div>
              
              {/* Sticky Container - Pins to screen and glides down the section track */}
              <motion.div 
                className="sticky top-24"
                initial={{ opacity: 0, x: -30 }}
                animate={isVisible ? { opacity: 1, x: 0 } : { opacity: 0, x: -30 }}
                transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
              >
                  {/* Clean SEC. header line matching design spec */}
                  <div className="flex items-center gap-2 mb-2 text-accent">
                     <span className="text-[10px] font-mono tracking-widest uppercase">SEC.</span>
                     <span className="h-px w-8 bg-accent"></span>
                  </div>

                  {/* Section Title */}
                  <h2 className="text-3xl xl:text-4xl font-display font-bold uppercase text-white leading-[0.95] tracking-wide">
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
          
          {/* Content Column (Right) */}
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