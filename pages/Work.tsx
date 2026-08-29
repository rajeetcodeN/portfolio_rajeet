import React from 'react';
import { Section } from '../components/Section';
import { JOBS } from '../constants';
import { Briefcase } from 'lucide-react';

export const Work: React.FC = () => {
  return (
    <div className="min-h-screen pt-12 pb-24">
      <Section title="Career_Log" noBorder>
        <div className="p-4 md:p-12">
             <div className="flex items-end justify-between mb-20 border-b border-border pb-8">
                <h1 className="text-6xl md:text-9xl font-display font-bold text-textMain uppercase leading-[0.8]">
                    Work <span className="text-outline-accent">Log</span>
                </h1>
                <div className="hidden md:flex items-center gap-2 font-mono text-xs text-textMuted uppercase tracking-widest">
                    <div className="w-2 h-2 bg-accent animate-pulse"></div>
                    Syncing Data...
                </div>
            </div>

            <div className="relative border-l border-border ml-4 md:ml-12 pl-8 md:pl-16 space-y-20">
                {JOBS.map((job, index) => (
                    <div key={index} className="relative group">
                        {/* Timeline Node */}
                        <div className="absolute -left-[40px] md:-left-[72px] top-0 w-4 h-4 bg-black border-2 border-accent rounded-full group-hover:bg-accent transition-colors z-10"></div>
                        
                        <div className="border border-border bg-black p-6 md:p-12 hover:bg-[#070707] hover:border-accent transition-all duration-300 relative overflow-hidden">
                            <div className="flex flex-col md:flex-row md:items-start justify-between gap-6 mb-8">
                                <div>
                                    <div className="font-mono text-xs text-accent uppercase tracking-widest mb-2 flex items-center gap-2">
                                        <Briefcase size={14} />
                                        {job.type}
                                    </div>
                                    <h2 className="text-4xl md:text-5xl font-display font-bold text-textMain uppercase leading-none mb-2">
                                        {job.role}
                                    </h2>
                                    <div className="text-xl font-sans text-textMuted">{job.company}</div>
                                </div>
                                <div className="md:text-right">
                                    <div className="inline-block border border-border px-4 py-2 bg-[#0a0a0a] font-mono text-sm text-accent uppercase">
                                        {job.period}
                                    </div>
                                </div>
                            </div>
                            
                            <p className="text-lg text-textMuted font-sans leading-relaxed max-w-4xl mb-8 border-l border-border pl-6">
                                {job.description}
                            </p>

                            <div className="flex flex-wrap gap-2">
                                 {job.tools.map(tool => (
                                    <span key={tool} className="px-3 py-1 bg-[#0a0a0a] border border-border text-xs font-mono text-textMain uppercase tracking-wide group-hover:border-accent/30 transition-colors">
                                        {tool}
                                    </span>
                                 ))}
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
      </Section>
    </div>
  );
};