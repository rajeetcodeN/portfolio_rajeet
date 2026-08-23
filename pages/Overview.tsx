import React, { useState } from 'react';
import { Download, Github, Mail, Linkedin, ArrowUpRight, Disc, MapPin, Calendar, ChevronDown, Zap, Code2, Sparkles, ExternalLink } from 'lucide-react';
import { JOBS, PROJECTS, STATS } from '../constants';
import { ProfilePhoto } from '../components/ProfilePhoto';

interface AccordionProps {
  title: string;
  defaultOpen?: boolean;
  children: React.ReactNode;
}

const AccordionSection: React.FC<AccordionProps> = ({ title, defaultOpen = false, children }) => {
  const [isOpen, setIsOpen] = useState(defaultOpen);

  return (
    <div className="border-b border-white/10">
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className="w-full py-6 flex items-center justify-between group cursor-pointer"
      >
        <div className="flex items-center gap-4">
            <span className={`font-mono text-xs uppercase tracking-widest transition-colors ${isOpen ? 'text-accent' : 'text-textMuted group-hover:text-white'}`}>
            {title}
            </span>
        </div>
        <div className={`p-1 rounded-full border border-transparent group-hover:border-white/10 transition-all duration-300 ${isOpen ? 'rotate-180 text-accent' : 'text-textMuted'}`}>
            <ChevronDown size={16} />
        </div>
      </button>
      
      <div 
        className={`grid transition-[grid-template-rows] duration-500 ease-[cubic-bezier(0.87,0,0.13,1)] ${isOpen ? 'grid-rows-[1fr] pb-8' : 'grid-rows-[0fr]'}`}
      >
        <div className="overflow-hidden">
           {children}
        </div>
      </div>
    </div>
  );
};

const ConnectCard: React.FC<{ href: string; icon: React.ReactNode; title: string; subtitle: string; accent?: string }> = ({ href, icon, title, subtitle, accent }) => (
  <a 
    href={href} 
    target="_blank" 
    rel="noreferrer"
    className="group relative bg-surface/20 border border-white/5 rounded-2xl p-5 hover:bg-surface/40 hover:border-accent/30 transition-all duration-300 overflow-hidden"
  >
    <div className="absolute inset-0 bg-gradient-to-br from-accent/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
    <div className="relative flex items-center gap-4">
      <div className={`w-12 h-12 rounded-xl flex items-center justify-center transition-colors ${accent ? '' : 'bg-white/5 group-hover:bg-accent/10'}`}
        style={accent ? { backgroundColor: accent } : undefined}
      >
        <span className={accent ? 'text-black' : 'text-textMuted group-hover:text-accent transition-colors'}>
          {icon}
        </span>
      </div>
      <div className="flex-grow">
        <span className="block font-bold text-base text-white group-hover:text-accent transition-colors">{title}</span>
        <span className="text-xs text-textMuted group-hover:text-accent/70 transition-colors">{subtitle}</span>
      </div>
      <ExternalLink size={16} className="text-textMuted/50 group-hover:text-accent transition-colors" />
    </div>
  </a>
);

export const Overview: React.FC = () => {
  const contributionDays = Array.from({ length: 14 * 5 }).map((_, i) => ({
    opacity: Math.random() > 0.6 ? Math.random() * 0.8 + 0.2 : 0.1
  }));

  return (
    <div className="min-h-screen text-[#EAEAEA] font-sans pt-24 pb-20 flex justify-center selection:bg-accent selection:text-black">
      <div className="w-full max-w-2xl px-6">
        
        <header className="mb-12">
          <div className="flex items-center gap-4 mb-6">
            <ProfilePhoto size={72} />
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-green-500/10 border border-green-500/20">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
                </span>
                <span className="text-[10px] font-mono font-bold tracking-widest text-green-400 uppercase">Open to Work</span>
              </div>
              <div className="font-mono text-[10px] text-textMuted mt-2 tracking-wider">Mumbai, India · Remote</div>
            </div>
          </div>
          <div className="flex gap-2 mb-6">
            {STATS.map((stat) => (
              <div key={stat.label} className="text-center px-3 py-1.5 bg-surface/20 rounded-lg border border-white/5">
                <div className="text-lg font-bold text-white">{stat.value}</div>
                <div className="text-[10px] text-textMuted uppercase tracking-wider">{stat.label}</div>
              </div>
            ))}
          </div>

          <div className="space-y-3">
            <h1 className="text-4xl md:text-5xl font-display font-bold tracking-tight">
              Rajeet <span className="text-accent">Nair</span>
            </h1>
            <div className="flex items-center gap-3">
              <Zap size={18} className="text-accent" />
              <p className="text-lg md:text-xl text-textMuted">
                Generative AI Engineer building LLM-powered products
              </p>
            </div>
          </div>

          <div className="mt-6 bg-surface/30 border border-white/5 rounded-2xl p-4 flex items-center gap-4">
            <div className="w-14 h-14 bg-accent/20 rounded-xl flex items-center justify-center relative shrink-0 overflow-hidden">
              <Disc className="text-accent animate-spin-slow" size={28} />
            </div>
            <div className="flex-grow min-w-0">
              <div className="flex items-center gap-2 mb-1">
                <span className="text-xs font-mono text-green-500 uppercase tracking-widest">Now Playing</span>
                <div className="flex gap-0.5 items-end h-3">
                  <span className="w-0.5 h-full bg-green-500 animate-[music_1s_ease-in-out_infinite]"></span>
                  <span className="w-0.5 h-2 bg-green-500 animate-[music_1.2s_ease-in-out_infinite]"></span>
                  <span className="w-0.5 h-4 bg-green-500 animate-[music_0.8s_ease-in-out_infinite]"></span>
                </div>
              </div>
              <h3 className="text-base font-bold leading-none mb-0.5 text-white truncate">Deep Focus: Lo-fi Beats</h3>
              <p className="text-xs text-textMuted truncate">Productive Coding Mix</p>
            </div>
            <a href="https://open.spotify.com" target="_blank" rel="noreferrer" className="w-9 h-9 rounded-full bg-[#1DB954] flex items-center justify-center text-black hover:scale-110 transition-transform shrink-0">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M12 0C5.4 0 0 5.4 0 12s5.4 12 12 12 12-5.4 12-12S18.66 0 12 0zm5.521 17.34c-.24.359-.66.48-1.021.24-2.82-1.74-6.36-2.101-10.561-1.141-.418.122-.779-.179-.899-.539-.12-.421.18-.78.54-.9 4.56-1.021 8.52-.6 11.64 1.32.42.18.48.66.301 1.02zm1.44-3.3c-.301.42-.841.6-1.262.3-3.239-1.98-8.159-2.58-11.939-1.38-.479.12-1.02-.12-1.14-.6-.12-.48.12-1.021.6-1.141C9.6 9.9 15 10.561 18.72 12.84c.361.181.54.72.24 1.2zm.12-3.36C15.24 8.4 8.82 8.16 5.16 9.301c-.6.179-1.2-.181-1.38-.721-.18-.601.18-1.2.72-1.381 4.26-1.26 11.4-1.02 15.6 1.44.539.3.719.96.418 1.5-.239.478-.899.66-1.439.36z"/></svg>
            </a>
          </div>
        </header>

        <div className="border-t border-white/10">
            
            <div className="py-8 border-b border-white/10">
                <div className="flex items-center gap-2 mb-5">
                  <span className="font-mono text-xs text-accent uppercase tracking-widest">01</span>
                  <h2 className="font-mono text-xs text-textMuted uppercase tracking-widest">Connect</h2>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <ConnectCard href="/resume.pdf" icon={<Download size={22} />} title="Resume" subtitle="Download PDF" />
                    <ConnectCard href="mailto:rajeet9653@gmail.com" icon={<Mail size={22} />} title="Email" subtitle="Get in touch" />
                    <ConnectCard href="https://github.com/rajeetcodeN" target="_blank" rel="noreferrer" icon={<Github size={22} />} title="GitHub" subtitle="View code" />
                    <ConnectCard href="https://linkedin.com" target="_blank" rel="noreferrer" icon={<Linkedin size={22} />} title="LinkedIn" subtitle="Let's connect" />
                </div>
            </div>

            <AccordionSection title="02 Current Work" defaultOpen={true}>
                <div className="space-y-3">
                    {JOBS.slice(0, 1).map((job, idx) => (
                        <div key={idx} className="bg-surface/10 border border-white/5 rounded-xl p-4 flex items-center gap-4 hover:bg-surface/20 transition-colors group">
                            <div className="w-10 h-10 rounded-lg bg-accent/10 flex items-center justify-center text-accent font-bold">
                            {job.company.charAt(0)}
                            </div>
                            <div className="flex-grow min-w-0">
                            <h3 className="text-sm font-bold text-white group-hover:text-accent transition-colors truncate">{job.company}</h3>
                            <p className="text-xs text-textMuted truncate">{job.role}</p>
                            </div>
                            <span className="text-xs font-mono text-accent shrink-0">Current</span>
                        </div>
                    ))}
                    <div className="bg-gradient-to-r from-accent/10 to-transparent border border-accent/20 rounded-xl p-4 flex items-center gap-4 hover:from-accent/20 transition-colors group cursor-pointer">
                        <div className="w-10 h-10 rounded-lg bg-accent/20 flex items-center justify-center text-accent">
                          <Code2 size={20} />
                        </div>
                        <div className="flex-grow min-w-0">
                          <h3 className="text-sm font-bold text-white group-hover:text-accent transition-colors truncate">{PROJECTS[0].title}</h3>
                          <p className="text-xs text-textMuted">Featured Project</p>
                        </div>
                        <ArrowUpRight size={16} className="text-accent shrink-0" />
                    </div>
                </div>
            </AccordionSection>

            <AccordionSection title="03 Skills" defaultOpen={false}>
                <div className="flex flex-wrap gap-2">
                  {['Python', 'LLMs', 'RAG', 'LangChain', 'FastAPI', 'React', 'Node.js', 'PostgreSQL', 'AWS', 'Docker'].map((skill) => (
                    <span key={skill} className="px-3 py-1.5 bg-surface/30 border border-white/5 rounded-lg text-xs font-mono text-textMuted hover:text-accent hover:border-accent/30 transition-colors cursor-default">
                      {skill}
                    </span>
                  ))}
                </div>
            </AccordionSection>

            <div className="py-8 border-b border-white/10">
                <div className="flex items-center gap-2 mb-5">
                  <span className="font-mono text-xs text-accent uppercase tracking-widest">04</span>
                  <h2 className="font-mono text-xs text-textMuted uppercase tracking-widest">Location</h2>
                </div>
                <div className="bg-surface/10 border border-white/5 rounded-2xl p-5 flex items-center justify-between">
                    <div className="flex items-center gap-3">
                        <div className="bg-accent/10 p-2.5 rounded-xl">
                            <MapPin size={20} className="text-accent" />
                        </div>
                        <div>
                            <div className="text-white font-bold">Mumbai, India</div>
                            <div className="text-xs text-textMuted">Working remotely</div>
                        </div>
                    </div>
                    <div className="text-right">
                        <div className="text-white font-mono font-bold">IST</div>
                        <div className="text-xs text-textMuted">UTC+05:30</div>
                    </div>
                </div>
            </div>

            <div className="py-8 border-b border-white/10">
                <div className="flex items-center gap-2 mb-5">
                  <span className="font-mono text-xs text-accent uppercase tracking-widest">05</span>
                  <h2 className="font-mono text-xs text-textMuted uppercase tracking-widest">Activity</h2>
                </div>
                <div className="bg-surface/10 border border-white/5 rounded-2xl p-5">
                    <div className="flex justify-between items-end mb-4">
                        <div>
                            <div className="text-xs text-textMuted mb-0.5">Contributions</div>
                            <div className="text-2xl font-display font-bold text-white">1,144 <span className="text-sm text-textMuted font-sans font-normal">total</span></div>
                        </div>
                        <div className="text-xs text-textMuted font-mono">Last 90 days</div>
                    </div>
                    
                    <div className="flex gap-[3px] justify-between overflow-hidden">
                        {contributionDays.map((day, i) => (
                            <div 
                                key={i} 
                                className="w-full aspect-square rounded-[2px] bg-accent transition-all hover:scale-125"
                                style={{ opacity: day.opacity }}
                            />
                        ))}
                    </div>
                    <div className="mt-4 text-[10px] text-textMuted flex justify-between items-center">
                        <span>Less</span>
                        <div className="flex gap-1 items-center">
                            <div className="w-2 h-2 rounded-[2px] bg-accent opacity-20"></div>
                            <div className="w-2 h-2 rounded-[2px] bg-accent opacity-50"></div>
                            <div className="w-2 h-2 rounded-[2px] bg-accent opacity-80"></div>
                            <div className="w-2 h-2 rounded-[2px] bg-accent"></div>
                        </div>
                        <span>More</span>
                    </div>
                </div>
            </div>

            <div className="py-8">
                 <div className="flex items-center gap-2 mb-5">
                  <span className="font-mono text-xs text-accent uppercase tracking-widest">06</span>
                  <h2 className="font-mono text-xs text-textMuted uppercase tracking-widest">Get in Touch</h2>
                </div>
                 <div className="bg-gradient-to-br from-surface/40 to-surface/10 border border-white/10 rounded-3xl p-8 text-center relative overflow-hidden">
                    <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-accent to-transparent"></div>
                    <div className="absolute -top-12 -right-12 w-32 h-32 bg-accent/5 rounded-full blur-3xl"></div>
                    <div className="absolute -bottom-12 -left-12 w-32 h-32 bg-accent/5 rounded-full blur-3xl"></div>
                    
                    <div className="relative z-10">
                      <Sparkles size={24} className="text-accent mx-auto mb-3" />
                      <h3 className="text-2xl md:text-3xl font-display font-bold text-white mb-2">
                          Let's build something
                      </h3>
                      <p className="text-textMuted mb-6 max-w-sm mx-auto">
                          Interested in AI automation, LLM pipelines, or just want to chat? I'd love to hear from you.
                      </p>
                    </div>
                    
                    <div className="relative z-10 flex flex-col sm:flex-row gap-3 justify-center">
                      <a 
                          href="mailto:rajeet9653@gmail.com" 
                          className="inline-flex items-center justify-center gap-2 bg-white text-black font-bold px-6 py-3 rounded-full hover:scale-105 transition-transform"
                      >
                          <Mail size={16} /> Send Email
                      </a>
                      <a 
                          href="https://calendly.com" 
                          target="_blank"
                          rel="noreferrer"
                          className="inline-flex items-center justify-center gap-2 bg-accent/10 border border-accent/30 text-accent font-bold px-6 py-3 rounded-full hover:bg-accent/20 transition-colors"
                      >
                          <Calendar size={16} /> Book a Call
                      </a>
                    </div>
                </div>
            </div>

        </div>
      </div>
    </div>
  );
};