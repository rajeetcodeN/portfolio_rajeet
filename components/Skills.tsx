import React from 'react';
import { motion } from 'framer-motion';
import { SKILL_GROUPS } from '../constants';
import { Section } from './Section';
import { Cpu, Database, Layout, Shield, Terminal, Zap } from 'lucide-react';

const getIcon = (category: string) => {
  switch (category.toLowerCase()) {
    case 'frontend': return <Layout className="w-5 h-5" />;
    case 'backend': return <Database className="w-5 h-5" />;
    case 'ai & ml': return <Cpu className="w-5 h-5" />;
    case 'devops': return <Terminal className="w-5 h-5" />;
    case 'security': return <Shield className="w-5 h-5" />;
    default: return <Zap className="w-5 h-5" />;
  }
};

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1
    }
  }
};

const itemVariants = {
  hidden: { y: 20, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: {
      duration: 0.5,
      ease: "easeOut"
    }
  }
};

export const Skills: React.FC = () => {
  return (
    <Section id="skills" title="Tech Specs" className="bg-black">
      <motion.div 
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 bg-black"
      >
        {SKILL_GROUPS.map((group, index) => (
          <motion.div 
            key={group.category}
            variants={itemVariants}
            className={`
              p-6 md:p-8 border-b border-border bg-black hover:bg-[#070707] transition-colors
              ${index % 3 !== 2 ? 'lg:border-r' : ''} 
              ${index % 2 !== 1 ? 'md:border-r lg:border-r-0' : ''}
              min-h-[240px] flex flex-col
              group relative overflow-hidden
            `}
          >
            <div className="relative z-10">
                <div className="flex justify-between items-start mb-6">
                    <div className="flex items-center gap-3">
                      <div className="p-2 bg-[#0a0a0a] border border-border shrink-0 group-hover:border-accent transition-colors">
                        <span className="text-textMuted group-hover:text-accent transition-colors inline-flex">
                          {getIcon(group.category)}
                        </span>
                      </div>
                      <h3 className="text-xl sm:text-2xl md:text-3xl font-display font-bold text-textMain uppercase tracking-tight group-hover:text-accent transition-colors">
                        {group.category}
                      </h3>
                    </div>
                    <span className="text-[10px] font-mono text-accent border border-accent/30 px-1 py-0.5 group-hover:bg-accent group-hover:text-black transition-colors shrink-0 ml-2">
                        MOD.0{index + 1}
                    </span>
                </div>
                
                <div className="space-y-3">
                {group.skills.map((skill) => (
                    <motion.div 
                      key={skill} 
                      whileHover={{ x: 6 }}
                      transition={{ type: 'spring', stiffness: 300, damping: 20 }}
                      className="flex items-center gap-3 cursor-default"
                    >
                        <div className="h-1.5 w-1.5 bg-textMuted group-hover:bg-accent transition-colors" />
                        <span className="font-mono text-sm text-textMuted group-hover:text-textMain transition-colors tracking-wide">
                            {skill.toUpperCase()}
                        </span>
                        {/* Dot leader for print look */}
                        <div className="flex-grow border-b border-dotted border-border opacity-20"></div>
                    </motion.div>
                ))}
                </div>
            </div>
          </motion.div>
        ))}
        
        {/* Decorative Filler - Technical Wireframe HUD Module */}
        <motion.div 
          variants={itemVariants}
          className="hidden lg:flex p-6 md:p-8 border-b border-border items-center justify-center bg-black relative overflow-hidden group"
        >
            <div className="text-center relative z-10 font-mono">
                <div className="flex justify-center mb-3">
                  {/* Isometric Cube Wireframe Accent */}
                  <div className="w-12 h-12 border border-accent/40 rotate-45 flex items-center justify-center relative shadow-[0_0_15px_rgba(76,169,255,0.15)] group-hover:rotate-90 transition-transform duration-700">
                    <div className="w-6 h-6 border border-accent/60"></div>
                    <span className="absolute text-[8px] text-accent">✦</span>
                  </div>
                </div>
                <div className="text-sm font-display font-bold text-white uppercase tracking-widest">
                  SYS_TELEMETRY // OK
                </div>
                <div className="font-mono text-[9px] text-textMuted mt-1 flex items-center justify-center gap-2">
                  <span>[ + ] LATENCY &lt; 200MS</span>
                  <div className="w-8 h-2 text-accent/40 tech-barcode"></div>
                </div>
            </div>
        </motion.div>
      </motion.div>
    </Section>
  );
};