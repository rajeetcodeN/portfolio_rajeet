import React from 'react';
import { motion } from 'framer-motion';
import { JOBS } from '../constants';
import { Section } from './Section';
import { Briefcase, GraduationCap, Terminal } from 'lucide-react';

const getJobIcon = (type: string) => {
  switch (type.toLowerCase()) {
    case 'production': return <Briefcase className="w-4 h-4" />;
    case 'education': return <GraduationCap className="w-4 h-4" />;
    default: return <Terminal className="w-4 h-4" />;
  }
};

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15
    }
  }
};

const itemVariants = {
  hidden: { x: -20, opacity: 0 },
  visible: {
    x: 0,
    opacity: 1,
    transition: {
      duration: 0.5,
      ease: "easeOut"
    }
  }
};

export const Experience: React.FC = () => {
  return (
    <Section id="experience" title="Job_Logs">
      <motion.div 
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        className="grid grid-cols-1"
      >
        {JOBS.map((job, index) => (
          <motion.div 
            key={index} 
            variants={itemVariants}
            className="grid grid-cols-1 md:grid-cols-12 border-b border-border bg-black hover:bg-[#070707] group relative overflow-hidden transition-colors"
          >
            {/* Active Highlight Scan Line */}
            <div className="absolute left-0 top-0 bottom-0 w-1 bg-accent transform -translate-x-full group-hover:translate-x-0 transition-transform duration-300"></div>

            {/* Period Column */}
            <div className="md:col-span-3 p-6 md:p-8 border-b md:border-b-0 md:border-r border-border font-mono text-xs text-accent uppercase tracking-wider flex items-center relative z-10">
               <span className="mr-2 opacity-50 group-hover:opacity-100 text-textMuted group-hover:text-accent transition-all">[</span>
               {job.period}
               <span className="ml-2 opacity-50 group-hover:opacity-100 text-textMuted group-hover:text-accent transition-all">]</span>
            </div>

            {/* Role & Details Column */}
            <div className="md:col-span-9 p-6 md:p-8 relative z-10">
              <div className="flex flex-col md:flex-row md:items-baseline justify-between mb-4">
                 <div className="flex items-center gap-3">
                   <div className="p-1.5 bg-[#0a0a0a] border border-border group-hover:border-accent group-hover:text-accent transition-all duration-300 shrink-0">
                     {getJobIcon(job.type)}
                   </div>
                   <h3 className="text-xl sm:text-2xl md:text-3xl font-display font-bold text-white uppercase tracking-tight group-hover:text-accent transition-colors">
                     {job.role}
                   </h3>
                 </div>
                 <span className="font-mono text-sm text-textMuted group-hover:text-white transition-colors">{job.company}</span>
              </div>
              
              <div className="mb-6">
                   <span className={`
                       inline-block text-[10px] font-mono uppercase tracking-widest px-2 py-1 border
                       ${job.type === 'Production' ? 'border-accent text-accent bg-accent/10' : 
                         job.type === 'Education' ? 'border-textMuted text-textMuted group-hover:border-white group-hover:text-white transition-colors' : 
                         'border-border text-textMuted'}
                   `}>
                       TYPE: {job.type}
                   </span>
              </div>

              <p className="text-textMuted text-sm font-sans leading-relaxed max-w-3xl mb-6 group-hover:text-textMain transition-colors">
                {job.description}
              </p>

              <div className="flex flex-wrap gap-2">
                  {job.tools.map(tool => (
                      <motion.span 
                        key={tool} 
                        whileHover={{ scale: 1.05, borderColor: 'var(--color-accent)', color: 'white' }}
                        className="text-[10px] font-mono text-textMuted border border-border px-2 py-0.5 rounded-sm transition-colors cursor-default"
                      >
                          {tool}
                      </motion.span>
                  ))}
              </div>
            </div>
          </motion.div>
        ))}
      </motion.div>
    </Section>
  );
};