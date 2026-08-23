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
    <Section id="skills" title="Tech Specs" className="bg-background">
      <motion.div 
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3"
      >
        {SKILL_GROUPS.map((group, index) => (
          <motion.div 
            key={group.category}
            variants={itemVariants}
            whileHover="cardHover"
            className={`
              p-6 md:p-8 border-b border-border 
              ${index % 3 !== 2 ? 'lg:border-r' : ''} 
              ${index % 2 !== 1 ? 'md:border-r lg:border-r-0' : ''}
              min-h-[240px] flex flex-col
              group relative overflow-hidden
            `}
          >
            {/* Accent gradient wash slides in on hover */}
            <motion.div
              className="absolute inset-0 pointer-events-none"
              style={{
                background: 'linear-gradient(135deg, color-mix(in srgb, var(--color-accent) 10%, transparent), transparent 55%)',
              }}
              variants={{
                cardHover: { opacity: 1, x: 0 },
              }}
              initial={{ opacity: 0, x: '-100%' }}
              transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
            />

            {/* Accent edge glow */}
            <motion.div
              className="absolute inset-0 pointer-events-none"
              style={{ boxShadow: 'inset 0 0 40px color-mix(in srgb, var(--color-accent) 7%, transparent)' }}
              variants={{ cardHover: { opacity: 1 } }}
              initial={{ opacity: 0 }}
              transition={{ duration: 0.4 }}
            />
              
            {/* Active Grid Scan on Hover */}
            <div className="absolute inset-0 bg-grid-pattern opacity-0 group-hover:opacity-10 transition-opacity duration-300 pointer-events-none animate-grid-scroll"></div>
            
            {/* Corner Scanlines */}
            <div className="absolute top-0 right-0 w-8 h-8 border-t border-r border-accent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            <div className="absolute bottom-0 left-0 w-8 h-8 border-b border-l border-accent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>

            <div className="relative z-10">
                <div className="flex justify-between items-start mb-6">
                    <div className="flex items-center gap-3">
                      <motion.div
                        className="p-2 bg-surface border border-border shrink-0"
                        variants={{
                          cardHover: {
                            borderColor: 'var(--color-accent)',
                            backgroundColor: 'color-mix(in srgb, var(--color-accent) 12%, #121212)',
                            rotate: -4,
                            scale: 1.08,
                          },
                        }}
                        transition={{ type: 'spring', stiffness: 260, damping: 18 }}
                      >
                        <span className="text-textMuted group-hover:text-accent transition-colors inline-flex">
                          {getIcon(group.category)}
                        </span>
                      </motion.div>
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
                      whileHover={{ x: 8 }}
                      transition={{ type: 'spring', stiffness: 300, damping: 20 }}
                      className="flex items-center gap-3 cursor-default"
                    >
                        <motion.div
                          className="h-1.5 w-1.5 bg-textMuted"
                          whileHover={{ scale: 2 }}
                          style={{ willChange: 'transform' }}
                        />
                        <span className="font-mono text-sm text-textMuted hover:text-accent transition-colors tracking-wide">
                            {skill.toUpperCase()}
                        </span>
                        {/* Dot leader for print look */}
                        <div className="flex-grow border-b border-dotted border-border opacity-30"></div>
                    </motion.div>
                ))}
                </div>
            </div>
          </motion.div>
        ))}
        
        {/* Decorative Filler - Technical Empty State */}
        <motion.div 
          variants={itemVariants}
          className="hidden lg:flex p-6 md:p-8 border-b border-border items-center justify-center bg-surface/10 opacity-50 relative overflow-hidden"
        >
             <div className="absolute inset-0 bg-stripe-pattern opacity-5"></div>
            <div className="text-center relative z-10">
                <div className="text-6xl font-display font-bold text-border">NULL</div>
                <div className="font-mono text-xs text-border mt-2">// AWAITING DATA</div>
            </div>
        </motion.div>
      </motion.div>
    </Section>
  );
};