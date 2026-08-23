import React, { useRef, useEffect, useState } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

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
  const [progressPercent, setProgressPercent] = useState(0);

  // Track scroll progress within this specific section
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"]
  });

  const railScaleY = useTransform(scrollYProgress, [0.1, 0.9], [0, 1]);
  const glowOpacity = useTransform(scrollYProgress, [0.15, 0.5, 0.85], [0.3, 1, 0.3]);

  useEffect(() => {
    const unsubscribe = scrollYProgress.on('change', (v) => {
      // Map 0.1-0.9 scroll threshold to 0%-100%
      const clamped = Math.min(Math.max((v - 0.1) / 0.8, 0), 1);
      setProgressPercent(Math.round(clamped * 100));
    });

    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsVisible(entry.isIntersecting);
      },
      { threshold: 0.05 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => {
      unsubscribe();
      observer.disconnect();
    };
  }, [scrollYProgress]);

  return (
    <section id={id} ref={sectionRef} className={`w-full relative ${className}`}>
      {/* Decorative Side Rules */}
      <div className="absolute left-0 top-0 bottom-0 w-px bg-border hidden lg:block ml-12 z-0"></div>
      <div className="absolute right-0 top-0 bottom-0 w-px bg-border hidden lg:block mr-12 z-0"></div>

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
          {/* Title Column (Left) - Sliding Rail */}
          {title && (
            <div className="md:col-span-3 lg:col-span-2 p-6 md:p-8 border-b md:border-b-0 md:border-r border-border relative overflow-hidden">
              {/* Static Background Rail Line */}
              <div className="absolute right-0 top-0 bottom-0 w-px bg-accent/20 hidden md:block"></div>

              {/* Dynamic Active Glowing Rail Progress Bar */}
              <motion.div 
                className="absolute right-0 top-0 bottom-0 w-[2px] bg-gradient-to-b from-cyan-400 via-accent to-emerald-400 origin-top shadow-[0_0_12px_rgba(56,189,248,0.8)] hidden md:block z-20"
                style={{ scaleY: railScaleY, opacity: glowOpacity }}
              />
              
              {/* Sticky Container - Slides in on scroll, glides down until section end */}
              <motion.div 
                className="sticky top-24"
                initial={{ opacity: 0, x: -40 }}
                animate={isVisible ? { opacity: 1, x: 0 } : { opacity: 0, x: -40 }}
                transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
              >
                  {/* Cyberpunk Section & Progress Tracker Header */}
                  <div className="flex items-center justify-between mb-3 text-accent">
                     <div className="flex items-center gap-2">
                       <span className="text-[10px] font-mono tracking-widest uppercase text-cyan-400 font-bold">Sec.</span>
                       <span className="h-px w-6 bg-cyan-400/60"></span>
                     </div>
                     <span className="text-[9px] font-mono tracking-wider px-1.5 py-0.5 rounded bg-cyan-950/80 border border-cyan-500/30 text-cyan-300 font-semibold shadow-inner">
                       {progressPercent}%
                     </span>
                  </div>

                  <h2 className="text-3xl xl:text-4xl font-display font-bold uppercase text-white leading-[0.95] tracking-wide relative">
                  {title.split('_').map((part, i, arr) => (
                    <React.Fragment key={i}>
                      {part}
                      {i < arr.length - 1 && <span className="text-accent">_</span>}
                      {i < arr.length - 1 && <br />}
                    </React.Fragment>
                  ))}
                  </h2>

                  {/* Active Laser Node Dot on Sticky Header */}
                  <div className="mt-4 flex items-center gap-2">
                    <div className="relative flex h-2 w-2">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan-400 opacity-75"></span>
                      <span className="relative inline-flex rounded-full h-2 w-2 bg-cyan-500"></span>
                    </div>
                    <span className="text-[9px] font-mono uppercase tracking-widest text-textMuted/70">
                      TRACKING_ACTIVE
                    </span>
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