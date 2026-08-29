import React from 'react';
import { Section } from '../components/Section';
import { MapPin, Target, Zap, User } from 'lucide-react';

export const About: React.FC = () => {
  return (
    <div className="min-h-screen pt-12 pb-24">
      <Section title="Data_Dossier" noBorder>
        <div className="p-4 md:p-12 relative">
            {/* Massive Background Typography */}
            <div className="absolute top-0 right-0 font-display font-bold text-[15rem] leading-none text-surface opacity-50 pointer-events-none select-none overflow-hidden hidden xl:block">
                PROFILE
            </div>

            <div className="relative z-10">
                <div className="flex items-center gap-4 mb-8">
                    <div className="h-px w-16 bg-accent"></div>
                    <span className="font-mono text-sm text-accent uppercase tracking-[0.2em]">Personnel File</span>
                </div>
                
                <h1 className="text-6xl sm:text-7xl md:text-9xl font-display font-bold text-textMain uppercase mb-16 leading-[0.8]">
                    Rajeet <span className="text-outline-accent">Nair</span>
                </h1>

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-24">
                    {/* Left Column: Stats Grid */}
                    <div className="lg:col-span-4 bg-black border border-border">
                        <div className="bg-black p-6 border-b border-border group hover:bg-[#070707] transition-colors">
                            <div className="flex items-center gap-3 mb-2 text-textMuted group-hover:text-accent">
                                <MapPin size={18} />
                                <span className="font-mono text-xs uppercase tracking-widest">Base Loc</span>
                            </div>
                            <div className="text-xl md:text-2xl font-display font-bold">Mumbai, India</div>
                        </div>
                        <div className="bg-black p-6 border-b border-border group hover:bg-[#070707] transition-colors">
                            <div className="flex items-center gap-3 mb-2 text-textMuted group-hover:text-accent">
                                <Target size={18} />
                                <span className="font-mono text-xs uppercase tracking-widest">Focus</span>
                            </div>
                            <div className="text-xl md:text-2xl font-display font-bold">Agentic Systems</div>
                        </div>
                        <div className="bg-black p-6 border-b border-border group hover:bg-[#070707] transition-colors">
                            <div className="flex items-center gap-3 mb-2 text-textMuted group-hover:text-accent">
                                <Zap size={18} />
                                <span className="font-mono text-xs uppercase tracking-widest">Status</span>
                            </div>
                            <div className="text-xl md:text-2xl font-display font-bold text-accent">Remote Ready</div>
                        </div>
                         <div className="bg-black p-6 group hover:bg-[#070707] transition-colors relative overflow-hidden">
                            <div className="flex items-center gap-3 mb-2 text-textMuted group-hover:text-accent">
                                <User size={18} />
                                <span className="font-mono text-xs uppercase tracking-widest">Experience</span>
                            </div>
                            <div className="text-xl md:text-2xl font-display font-bold">Mid-Senior Level</div>
                        </div>
                    </div>

                    {/* Right Column: Bio Content */}
                    <div className="lg:col-span-8">
                        <div className="prose prose-invert max-w-none">
                            <p className="text-lg md:text-2xl font-sans text-textMuted leading-relaxed border-l-2 border-accent pl-6 md:pl-8 mb-8">
                                I am a <strong className="text-textMain">Generative AI Engineer</strong> focused on building production-grade agentic systems and RAG pipelines. My work blends AI, cloud, and automation to transform unstructured data into actionable intelligence.
                            </p>
                            
                            <div className="grid md:grid-cols-2 gap-8 mb-12">
                                <div className="bg-black p-6 md:p-8 border border-border corner-brackets">
                                    <h3 className="font-display font-bold text-2xl text-textMain mb-4 uppercase">The Mission</h3>
                                    <p className="text-sm font-mono text-textMuted leading-relaxed">
                                        To replace manual, repetitive business workflows with fault-tolerant AI pipelines. I don't just build demos; I build systems that run 24/7, handling complex tasks like invoice OCR and social media automation.
                                    </p>
                                </div>
                                <div className="bg-black p-6 md:p-8 border border-border corner-brackets">
                                    <h3 className="font-display font-bold text-2xl text-textMain mb-4 uppercase">The Stack</h3>
                                    <p className="text-sm font-mono text-textMuted leading-relaxed">
                                        Specialized in Python, LangChain, and n8n for orchestration. Expert in RAG systems using Qdrant/pgvector, and full-stack integration with Supabase and React. n8n Verified Creator.
                                    </p>
                                </div>
                            </div>

                             <div className="border-t border-border pt-8 flex items-center gap-4">
                                <div className="bg-accent text-background px-3 py-1 font-mono text-xs font-bold uppercase">System_Check</div>
                                <p className="font-mono text-xs text-textMuted uppercase">
                                    Data Verification Complete // All Skills Verified
                                </p>
                             </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
      </Section>
    </div>
  );
};