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
  const watermarkY = useTransform(scrollYProgress, [0, 1], [-40, 40]);

  useEffect(() => {
    const unsubscribe = scrollYProgress.on('change', (v) => {
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
    <section id={id} ref={sectionRef} className={`w-full relative bg-black ${className}`}>
      {/* Decorative Side Rules */}
      <div className="absolute left-0 top-0 bottom-0 w-px bg-border hidden lg:block ml-12 z-0 pointer-events-none"></div>
      <div className="absolute right-0 top-0 bottom-0 w-px bg-border hidden lg:block mr-12 z-0 pointer-events-none"></div>

      {/* Ambient Watermark Title */}
      {title && (
        <div 
          className="absolute top-10 left-0 w-full font-display font-bold text-6xl sm:text-8xl md:text-[10rem] uppercase text-center pointer-events-none select-none overflow-hidden z-0 max-w-full opacity-30"
          style={{ 
             color: 'transparent', 
             WebkitTextStroke: '1px rgba(255,255,255,0.02)',
          }}
        >
          {title.split('_')[0]}
        </div>
      )}

      <div className="max-w-[1920px] mx-auto relative z-10 border-b border-border">
        <div className="grid grid-cols-1 md:grid-cols-12 min-h-[80px]">
          {/* Title Column (Left) - Sticky Sliding Rail that glides smoothly */}
          {title && (
            <div className="md:col-span-3 lg:col-span-2 p-4 sm:p-5 md:p-6 border-b md:border-b-0 md:border-r border-border relative bg-black">
              {/* Static Background Rail Line */}
              <div className="absolute right-0 top-0 bottom-0 w-px bg-accent/20 hidden md:block"></div>

              {/* Dynamic Active Glowing Rail Progress Bar */}
              <motion.div 
                className="absolute right-0 top-0 bottom-0 w-[2px] bg-accent origin-top shadow-[0_0_10px_var(--color-accent)] hidden md:block z-20"
                style={{ scaleY: railScaleY, opacity: glowOpacity }}
              />
              
              {/* Sticky Container - Glides continuously and renders immediately without flash */}
              <div 
                className="sticky top-24 z-10 bg-black"
              >
                  {/* Clean SEC. header line matching screenshot */}
                  <div className="flex items-center justify-between mb-2 text-accent">
                     <div className="flex items-center gap-2">
                       <span className="text-[10px] font-mono tracking-widest uppercase text-accent font-bold">SEC.</span>
                       <span className="h-px w-6 bg-accent"></span>
                     </div>
                     <span className="text-[9px] font-mono tracking-wider px-1.5 py-0.5 rounded bg-black border border-accent/30 text-accent font-semibold">
                       {progressPercent}%
                     </span>
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

                  {/* Cyber micro-status 3-block dots matching screenshot */}
                  <div className="mt-3 flex items-center gap-1.5">
                    <div className="w-1.5 h-1.5 bg-accent"></div>
                    <div className="w-1.5 h-1.5 bg-textMuted/40"></div>
                    <div className="w-1.5 h-1.5 bg-textMuted/40"></div>
                    <span className="font-mono text-[8px] text-textMuted uppercase tracking-widest ml-1">// SYS.OK</span>
                  </div>
              </div>
            </div>
          )}
          
          {/* Content Column (Right) */}
          <div className={`${title ? 'md:col-span-9 lg:col-span-10' : 'md:col-span-12'} relative bg-black`}>
             <div className="absolute top-0 right-0 w-3 h-3 border-t border-r border-accent/20"></div>
             <div className="absolute bottom-0 left-0 w-3 h-3 border-b border-l border-accent/20"></div>
             {children}
          </div>
        </div>
      </div>
    </section>
  );
};