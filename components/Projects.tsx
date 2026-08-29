import React from 'react';
import { PROJECTS } from '../constants';
import { Section } from './Section';
import { ExternalLink, ArrowRight, Layers, Cpu, Globe, Code2 } from 'lucide-react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

export const Projects: React.FC = () => {
  return (
    <Section id="projects" title="Operations">
      {/* 2-Column Technical Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 bg-black border border-border overflow-hidden">
        {PROJECTS.map((project, index) => (
          <motion.div 
            key={index} 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.1 }}
            whileHover="cardHover"
            className="group relative bg-black border-b md:border-r border-border p-6 md:p-10 flex flex-col overflow-hidden hover:bg-[#070707] transition-colors"
          >
            {/* Top Border Scan */}
            <motion.div 
              initial={{ scaleX: 0 }}
              whileHover={{ scaleX: 1 }}
              transition={{ duration: 0.5, ease: "easeInOut" }}
              className="absolute top-0 left-0 w-full h-0.5 bg-accent origin-left z-20"
            ></motion.div>

            {/* Header with Folder Tab & Reticle */}
            <div className="flex justify-between items-start mb-6 relative z-10">
               <div className="flex flex-col min-w-0">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="font-mono text-[10px] text-accent uppercase tracking-widest flex items-center gap-1.5 bg-accent/10 px-2 py-0.5 border border-accent/30 rounded-sm">
                       <Cpu size={10} />
                       OP-0{index + 1} // [ ⌖ ]
                    </span>
                    <div className="w-8 h-2 text-accent/40 tech-barcode hidden sm:block"></div>
                  </div>
                  <h3 className="text-2xl md:text-3xl font-display font-bold text-textMain uppercase leading-none group-hover:text-accent transition-colors truncate">
                    {project.title}
                  </h3>
               </div>
               
               {/* HUD Crosshair Corner */}
               <div className="flex items-center gap-1 font-mono text-[10px] text-textMuted group-hover:text-accent transition-colors shrink-0 ml-2">
                  <span>✦</span>
                  <span>EST.2025</span>
               </div>
            </div>

            {/* Metrics Block with Bracket Lines */}
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
                          className="px-2.5 py-1 bg-[#0a0a0a] border border-border text-[10px] font-mono text-textMuted uppercase group-hover:text-textMain group-hover:border-accent/40 transition-colors cursor-default chamfer-card-tr"
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
            <div className="flex items-center gap-4 relative z-10 pt-4 border-t border-border/60">
                <Link 
                  to={`/project/${project.id}`}
                  className="flex-1 py-2.5 px-4 bg-accent text-black font-display font-bold text-sm uppercase flex items-center justify-center gap-2 hover:bg-white transition-colors chamfer-card-tr shadow-[0_0_15px_rgba(76,169,255,0.2)]"
                >
                  Inspect Spec <ArrowRight size={14} />
                </Link>
                {project.repoUrl && (
                  <a 
                    href={project.repoUrl} 
                    target="_blank" 
                    rel="noreferrer"
                    className="p-2.5 border border-border text-textMuted hover:text-accent hover:border-accent transition-colors chamfer-card-tr"
                    title="Source Code"
                  >
                    <ExternalLink size={16} />
                  </a>
                )}
            </div>
          </motion.div>
        ))}
        
        {/* Empty Slot Filler for even grid */}
        {PROJECTS.length % 2 !== 0 && (
           <div className="hidden md:flex bg-black items-center justify-center p-10 opacity-50 relative overflow-hidden border-b border-border">
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
