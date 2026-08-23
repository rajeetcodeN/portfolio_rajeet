import React from 'react';
import { Section } from '../components/Section';
import { AUTOMATIONS, N8N_PROFILE_URL } from '../constants';
import { Share2, Zap, ArrowUpRight, Cpu, Eye, BadgeCheck } from 'lucide-react';

export const Automation: React.FC = () => {
  const totalViews = AUTOMATIONS.reduce((sum, a) => sum + (a.views || 0), 0);

  return (
    <div className="min-h-screen pt-12 pb-24">
      <Section title="Workflow_Hub" noBorder>
        <div className="p-4 md:p-12">
            <div className="flex items-center gap-4 mb-8">
                 <div className="w-8 h-8 border border-accent flex items-center justify-center text-accent">
                    <Share2 size={16} />
                 </div>
                 <span className="font-mono text-sm text-accent uppercase tracking-[0.2em]">n8n / Agentic Pipelines</span>
            </div>

            <h1 className="text-5xl md:text-8xl font-display font-bold text-textMain uppercase mb-6 leading-[0.8]">
                Automation <span className="text-outline-accent">Library</span>
            </h1>

            <div className="flex flex-col sm:flex-row sm:items-center gap-4 mb-12 flex-wrap">
                <a
                  href={N8N_PROFILE_URL}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-2 border border-accent/40 bg-accent/5 px-4 py-2 font-mono text-xs text-accent hover:bg-accent hover:text-background transition-colors"
                >
                  <BadgeCheck size={14} />
                  Verified n8n Creator — View Profile
                  <ArrowUpRight size={12} />
                </a>
                <div className="font-mono text-xs text-textMuted tracking-wider">
                    {AUTOMATIONS.length} published templates · <span className="text-accent">{totalViews.toLocaleString()}+</span> total views · used by thousands in the community
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {AUTOMATIONS.map((auto, index) => (
                    <div
                        key={index}
                        className="bg-background border border-border p-8 group hover:border-accent transition-all duration-300 relative flex flex-col h-full hover:bg-surface/5"
                    >
                        {/* Connecting Dot Top */}
                        <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 w-3 h-3 bg-background border border-border rounded-full group-hover:border-accent group-hover:bg-accent transition-colors z-20"></div>

                        {/* Card Header */}
                        <div className="flex justify-between items-start mb-6">
                            <div className="font-mono text-[10px] text-textMuted uppercase tracking-widest border border-border px-2 py-1 group-hover:text-accent transition-colors">
                                ID: AUTO_{String(index + 1).padStart(2, '0')}
                            </div>
                            {typeof auto.views === 'number' && (
                              <div className="flex items-center gap-1.5 font-mono text-[10px] text-textMuted group-hover:text-accent transition-colors">
                                <Eye size={12} />
                                {auto.views.toLocaleString()}
                              </div>
                            )}
                        </div>

                        {/* Title */}
                        <h3 className="text-xl font-display font-bold text-textMain leading-tight mb-6 group-hover:text-white transition-colors flex-grow">
                            {auto.title}
                        </h3>

                        {/* Stack Nodes */}
                        <div className="mt-auto">
                            <div className="flex items-center gap-2 mb-4">
                                <Cpu size={14} className="text-textMuted" />
                                <span className="font-mono text-[10px] text-textMuted uppercase tracking-widest">Active Nodes</span>
                            </div>
                            <div className="flex flex-wrap gap-2 mb-8">
                                {auto.stack.map((node, i) => (
                                    <span key={i} className="px-2 py-1 bg-surface/50 border border-border text-[10px] font-mono text-textMuted uppercase rounded-sm group-hover:border-accent/30 group-hover:text-textMain transition-colors">
                                        {node}
                                    </span>
                                ))}
                            </div>

                            {/* Action Area */}
                            <a
                                href={auto.link}
                                target="_blank"
                                rel="noreferrer"
                                className="w-full flex items-center justify-between px-4 py-3 border border-border bg-background text-textMuted hover:bg-accent hover:border-accent hover:text-background transition-colors font-mono text-xs uppercase font-bold tracking-widest"
                            >
                                <span>View Workflow</span>
                                <ArrowUpRight size={14} />
                            </a>
                        </div>

                        {/* Connecting Dot Bottom */}
                        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-1/2 w-3 h-3 bg-background border border-border rounded-full group-hover:border-accent group-hover:bg-accent transition-colors z-20"></div>
                    </div>
                ))}
            </div>

            {/* Bottom Connector Line */}
            <div className="hidden lg:block w-full h-px bg-border mt-12 relative opacity-50">
                <div className="absolute left-1/4 top-1/2 -translate-y-1/2 w-full h-[1px] bg-gradient-to-r from-transparent via-accent to-transparent opacity-20"></div>
            </div>

        </div>
      </Section>
    </div>
  );
};