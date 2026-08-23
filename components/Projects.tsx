import React from 'react';
import { PROJECTS } from '../constants';
import { Section } from './Section';
import { ExternalLink, ArrowRight, Layers, Cpu, Globe, Code2 } from 'lucide-react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

export const Projects: React.FC = () => {
  return (
    <Section id="projects" title="Operations">
      {/* 2-Column Technical Grid for High Performance & Density */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-px bg-border border border-border overflow-hidden">
        {PROJECTS.map((project, index) => (
          <motion.div 
            key={index} 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.1 }}
            whileHover="cardHover"
            className="group relative bg-background p-6 md:p-10 flex flex-col overflow-hidden"
          >
            {/* Accent gradient wash on hover */}
            <motion.div
              className="absolute inset-0 pointer-events-none"
              style={{
                background: 'linear-gradient(135deg, color-mix(in srgb, var(--color-accent) 9%, transparent), transparent 55%)',
              }}
              initial={{ opacity: 0, x: '-100%' }}
              variants={{ cardHover: { opacity: 1, x: 0 } }}
              transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
            />

            {/* Sliding Tech Stripe on Hover - Schematic Glitch */}
            <div className="absolute inset-0 bg-stripe-pattern opacity-0 group-hover:opacity-5 transition-opacity duration-300 pointer-events-none animate-grid-scroll"></div>
            
            {/* Top Border Scan */}
            <motion.div 
              initial={{ scaleX: 0 }}
              whileHover={{ scaleX: 1 }}
              transition={{ duration: 0.5, ease: "easeInOut" }}
              className="absolute top-0 left-0 w-full h-1 bg-accent origin-left z-20"
            ></motion.div>

            {/* Header */}
            <div className="flex justify-between items-start mb-6 relative z-10">
               <div className="flex flex-col">
                  <span className="font-mono text-[10px] text-accent uppercase tracking-widest mb-2 flex items-center gap-2">
                     <Cpu size={10} />
                     OP-0{index + 1} // {project.id.toUpperCase()}
                  </span>
                  <h3 className="text-2xl md:text-3xl font-display font-bold text-textMain uppercase leading-none group-hover:text-accent transition-colors">
                    {project.title}
                  </h3>
               </div>
               {/* Status Dot */}
               <div className="relative">
                  <div className="w-2 h-2 bg-textMuted group-hover:bg-accent rounded-full transition-colors mt-2 group-hover:shadow-[0_0_10px_#4CA9FF]"></div>
                  <div className="absolute inset-0 w-2 h-2 bg-accent rounded-full animate-ping opacity-0 group-hover:opacity-40 mt-2"></div>
               </div>
            </div>

            {/* Metrics Block */}
            <div className="mb-8 border-l-2 border-border pl-4 group-hover:border-accent transition-colors relative z-10">
                <div className="mb-4">
                    <span className="font-mono text-[10px] text-textMuted uppercase tracking-widest flex items-center gap-2 mb-1">
                      <Globe size={10} />
                      Target Problem
                    </span>
                    <p className="text-sm text-textMuted leading-relaxed line-clamp-2">{project.problem}</p>
                </div>
                <div>
                    <span className="font-mono text-[10px] text-accent uppercase tracking-widest flex items-center gap-2 mb-1">
                      <Code2 size={10} />
                      Outcome
                    </span>
                    <p className="text-sm text-textMain font-bold leading-relaxed">{project.result}</p>
                </div>
            </div>

            {/* Stack Tags */}
            <div className="mt-auto mb-8 relative z-10">
                <div className="flex flex-wrap gap-2">
                    {project.stack.slice(0, 4).map(tech => (
                        <motion.span 
                          key={tech} 
                          whileHover={{ scale: 1.05, borderColor: "var(--color-accent)" }}
                          className="px-2 py-1 bg-surface border border-border text-[10px] font-mono text-textMuted uppercase group-hover:text-textMain transition-colors cursor-default"
                        >
                            {tech}
                        </motion.span>
                    ))}
                    {project.stack.length > 4 && (
                        <span className="px-2 py-1 text-[10px] font-mono text-textMuted uppercase">+</span>
                    )}
                </div>
            </div>

            {/* Actions */}
            <div className="flex items-center gap-4 pt-6 border-t border-border group-hover:border-accent/30 transition-colors relative z-10">
                <Link 
                    to={`/project/${project.id}`} 
                    className="flex items-center gap-2 font-display font-bold text-lg text-textMain uppercase hover:text-accent transition-colors tracking-wide group/btn"
                >
                    Details <ArrowRight size={16} className="group-hover/btn:translate-x-1 transition-transform" />
                </Link>
                
                <div className="flex-grow"></div>
                
                {project.demoUrl && (
                  <motion.a 
                    whileHover={{ scale: 1.2, color: "var(--color-accent)" }}
                    href={project.demoUrl} 
                    target="_blank" 
                    rel="noreferrer" 
                    className="text-textMuted hover:text-textMain transition-colors"
                    title="Live Demo"
                  >
                    <ExternalLink size={18} />
                  </motion.a>
                )}
            </div>
          </motion.div>
        ))}
        
        {/* Empty Slot Filler for even grid */}
        {PROJECTS.length % 2 !== 0 && (
           <div className="hidden md:flex bg-surface/5 items-center justify-center p-10 opacity-50 relative overflow-hidden">
               <div className="absolute inset-0 bg-grid-pattern opacity-5"></div>
               <div className="text-center relative z-10">
                   <Layers size={48} className="mx-auto text-border mb-4" />
                   <div className="font-mono text-xs text-textMuted uppercase tracking-widest">Awaiting New Modules</div>
               </div>
           </div>
        )}
      </div>
    </Section>
  );
};
