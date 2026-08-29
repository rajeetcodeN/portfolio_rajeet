import React, { useState, useEffect } from 'react';
import { 
  Download, 
  Github, 
  Mail, 
  Linkedin, 
  ArrowUpRight, 
  Disc, 
  MapPin, 
  Calendar, 
  ChevronDown, 
  Zap, 
  Code2, 
  Sparkles, 
  ExternalLink,
  Award,
  Cpu,
  Layers,
  Database,
  Terminal,
  Workflow,
  Clock
} from 'lucide-react';
import { JOBS, PROJECTS, STATS, CERTIFICATIONS, N8N_PROFILE_URL } from '../constants';
import { ProfilePhoto } from '../components/ProfilePhoto';
import { Link } from 'react-router-dom';

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
        className="w-full py-4 flex items-center justify-between group cursor-pointer text-left transition-colors"
      >
        <div className="flex items-center gap-3">
          <span className={`font-mono text-xs uppercase tracking-widest transition-colors ${isOpen ? 'text-accent font-bold' : 'text-textMuted group-hover:text-white'}`}>
            {title}
          </span>
        </div>
        <div className={`p-1 rounded-full border border-transparent group-hover:border-white/10 transition-all duration-300 ${isOpen ? 'rotate-180 text-accent' : 'text-textMuted'}`}>
          <ChevronDown size={15} />
        </div>
      </button>
      
      <div 
        className={`grid transition-[grid-template-rows] duration-500 ease-[cubic-bezier(0.87,0,0.13,1)] ${isOpen ? 'grid-rows-[1fr] pb-5' : 'grid-rows-[0fr]'}`}
      >
        <div className="overflow-hidden">
          {children}
        </div>
      </div>
    </div>
  );
};

const ConnectCard: React.FC<{ 
  href: string; 
  icon: React.ReactNode; 
  title: string; 
  subtitle: string; 
  download?: string; 
}> = ({ href, icon, title, subtitle, download }) => (
  <a 
    href={href} 
    download={download}
    target={download ? undefined : "_blank"} 
    rel={download ? undefined : "noreferrer"}
    className="group relative bg-[#0a0a0a] border border-white/5 rounded-2xl p-4 hover:bg-[#111111] hover:border-accent/30 transition-all duration-200 overflow-hidden"
  >
    <div className="absolute inset-0 bg-gradient-to-br from-accent/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
    <div className="relative flex items-center gap-3.5">
      <div className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center text-textMuted group-hover:text-accent group-hover:bg-accent/10 transition-colors shrink-0">
        {icon}
      </div>
      <div className="flex-grow min-w-0">
        <span className="block font-bold text-sm text-white group-hover:text-accent transition-colors truncate">{title}</span>
        <span className="text-xs text-textMuted group-hover:text-accent/70 transition-colors truncate">{subtitle}</span>
      </div>
      <ExternalLink size={14} className="text-textMuted/40 group-hover:text-accent transition-colors shrink-0" />
    </div>
  </a>
);

const RADIOHEAD_LYRICS = [
  "Faith, you're driving me away...",
  "You do it to yourself, you do...",
  "This, this is our new song...",
  "Just like the last one, a total waste of time...",
  "My iron lung...",
  "The headshrinkers, they want everything...",
  "My brain says I'm receiving pain, a lack of oxygen...",
  "We scratch our heads and wonder what went wrong..."
];

export const Overview: React.FC = () => {
  const [lyricIndex, setLyricIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setLyricIndex((prev) => (prev + 1) % RADIOHEAD_LYRICS.length);
    }, 3800);
    return () => clearInterval(interval);
  }, []);

  const contributionDays = Array.from({ length: 14 * 5 }).map((_, i) => ({
    opacity: Math.random() > 0.6 ? Math.random() * 0.8 + 0.2 : 0.1
  }));

  const topCerts = CERTIFICATIONS.slice(0, 6);

  const extendedStats = [
    { label: 'AI Systems Shipped', value: '6+' },
    { label: 'Production Workflows', value: '16+' },
    { label: 'LLMs Integrated', value: '10+' },
    { label: 'Vector Query Latency', value: '<200ms' },
  ];

  return (
    <div className="min-h-screen bg-black text-[#EAEAEA] font-sans pt-16 pb-16 flex justify-center selection:bg-accent selection:text-black">
      <div className="w-full max-w-6xl px-4 sm:px-6 lg:px-8">
        
        {/* Responsive 2-Column Grid: Fills Side Space on Desktop */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* ========================================================================= */}
          {/* LEFT MAIN COLUMN: Profile, Pitch, Connect, Work, Stack, Certs (7 cols) */}
          {/* ========================================================================= */}
          <div className="lg:col-span-7 space-y-6">
            
            {/* Top Header */}
            <header>
              <div className="flex items-center gap-4 mb-4">
                <ProfilePhoto size={68} />
                <div>
                  <div className="inline-flex items-center gap-2 px-2.5 py-1 rounded-full bg-green-500/10 border border-green-500/20">
                    <span className="relative flex h-2 w-2">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                      <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
                    </span>
                    <span className="text-[10px] font-mono font-bold tracking-widest text-green-400 uppercase">Open to Work</span>
                  </div>
                  <div className="font-mono text-[10px] text-textMuted mt-1.5 tracking-wider">
                    Mumbai, India · Remote Ready (19.0760° N, 72.8777° E)
                  </div>
                </div>
              </div>

              {/* Stats Bar */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 mb-4">
                {extendedStats.map((stat) => (
                  <div key={stat.label} className="text-center px-2 py-2 bg-[#0a0a0a] rounded-xl border border-white/5">
                    <div className="text-lg font-bold text-white leading-tight">{stat.value}</div>
                    <div className="text-[9px] font-mono text-textMuted uppercase tracking-wider mt-0.5">{stat.label}</div>
                  </div>
                ))}
              </div>

              {/* Title & Pitch */}
              <div className="space-y-2">
                <h1 className="text-4xl sm:text-5xl font-display font-bold tracking-tight text-white leading-none">
                  Rajeet <span className="text-accent">Nair</span>
                </h1>
                <div className="flex items-start gap-2.5">
                  <Zap size={18} className="text-accent shrink-0 mt-0.5" />
                  <p className="text-sm sm:text-base text-textMuted leading-relaxed">
                    Generative AI &amp; Software Engineer building production <span className="text-white font-semibold">RAG pipelines</span>, <span className="text-white font-semibold">multimodal vision analyzers</span>, and <span className="text-white font-semibold">autonomous LLM workflows</span>.
                  </p>
                </div>
              </div>
            </header>

            {/* Stream Sections */}
            <div className="border-t border-white/10">
              
              {/* 01 CONNECT */}
              <div className="py-5 border-b border-white/10">
                <div className="flex items-center gap-2 mb-3.5">
                  <span className="font-mono text-xs text-accent uppercase tracking-widest font-bold">01</span>
                  <h2 className="font-mono text-xs text-textMuted uppercase tracking-widest">Connect</h2>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                  <ConnectCard href="/resume.pdf" download="Rajeet_Nair_Resume.pdf" icon={<Download size={18} />} title="Resume" subtitle="Download PDF (ATS-Ready)" />
                  <ConnectCard href="mailto:rajeet9653@gmail.com" icon={<Mail size={18} />} title="Email" subtitle="rajeet9653@gmail.com" />
                  <ConnectCard href="https://github.com/rajeetcodeN" icon={<Github size={18} />} title="GitHub" subtitle="@rajeetcodeN" />
                  <ConnectCard href="https://linkedin.com/in/rajeet-nair" icon={<Linkedin size={18} />} title="LinkedIn" subtitle="Let's connect" />
                </div>
              </div>

              {/* 02 CURRENT WORK */}
              <AccordionSection title="02 Current Work" defaultOpen={true}>
                <div className="space-y-2.5">
                  {JOBS.slice(0, 1).map((job, idx) => (
                    <div key={idx} className="bg-[#0a0a0a] border border-white/5 rounded-xl p-4 hover:bg-[#111111] transition-colors group">
                      <div className="flex items-center justify-between gap-2 mb-1.5">
                        <div className="flex items-center gap-3 min-w-0">
                          <div className="w-8 h-8 rounded-lg bg-accent/10 flex items-center justify-center text-accent font-bold text-sm shrink-0">
                            {job.company.charAt(0)}
                          </div>
                          <div className="min-w-0">
                            <h3 className="text-sm font-bold text-white group-hover:text-accent transition-colors truncate">{job.company}</h3>
                            <p className="text-xs text-textMuted truncate">{job.role}</p>
                          </div>
                        </div>
                        <span className="text-xs font-mono text-accent shrink-0">Current</span>
                      </div>
                      <p className="text-xs text-textMuted leading-relaxed mt-2">
                        Building production Generative AI systems, RAG pipelines with pgvector/Qdrant, and enterprise automation with n8n.
                      </p>
                      <div className="flex flex-wrap gap-1.5 mt-2.5">
                        {job.tools.slice(0, 8).map(tool => (
                          <span key={tool} className="text-[9px] font-mono text-textMuted border border-white/5 px-2 py-0.5 rounded bg-black">
                            {tool}
                          </span>
                        ))}
                      </div>
                    </div>
                  ))}

                  {/* Featured System 1 */}
                  <Link 
                    to={`/project/${PROJECTS[0].id}`} 
                    className="bg-[#0a0a0a] border border-accent/20 rounded-xl p-3.5 flex items-center gap-3.5 hover:bg-[#111111] hover:border-accent/40 transition-all group cursor-pointer block"
                  >
                    <div className="w-9 h-9 rounded-lg bg-accent/15 flex items-center justify-center text-accent shrink-0">
                      <Code2 size={18} />
                    </div>
                    <div className="flex-grow min-w-0">
                      <div className="flex items-center gap-2">
                        <h3 className="text-sm font-bold text-white group-hover:text-accent transition-colors truncate">{PROJECTS[0].title}</h3>
                        <span className="text-[9px] font-mono text-accent bg-accent/10 px-1.5 py-0.2 rounded hidden sm:inline">RAG API</span>
                      </div>
                      <p className="text-xs text-textMuted truncate">FastAPI + pgvector HNSW pricing estimation engine (9.3/10 score)</p>
                    </div>
                    <ArrowUpRight size={15} className="text-accent shrink-0" />
                  </Link>

                  {/* Featured System 2 */}
                  <Link 
                    to={`/project/${PROJECTS[1].id}`} 
                    className="bg-[#0a0a0a] border border-white/5 rounded-xl p-3.5 flex items-center gap-3.5 hover:bg-[#111111] hover:border-accent/30 transition-all group cursor-pointer block"
                  >
                    <div className="w-9 h-9 rounded-lg bg-white/5 flex items-center justify-center text-accent shrink-0">
                      <Cpu size={18} />
                    </div>
                    <div className="flex-grow min-w-0">
                      <div className="flex items-center gap-2">
                        <h3 className="text-sm font-bold text-white group-hover:text-accent transition-colors truncate">{PROJECTS[1].title}</h3>
                        <span className="text-[9px] font-mono text-textMuted bg-white/5 px-1.5 py-0.2 rounded hidden sm:inline">Vision OCR</span>
                      </div>
                      <p className="text-xs text-textMuted truncate">300 DPI blueprint extraction with Gemini Vision &amp; DIN normalizer</p>
                    </div>
                    <ArrowUpRight size={15} className="text-textMuted group-hover:text-accent transition-colors shrink-0" />
                  </Link>
                </div>
              </AccordionSection>

              {/* 03 AI STACK */}
              <AccordionSection title="03 AI Engineering Stack" defaultOpen={true}>
                <div className="space-y-3">
                  <div>
                    <span className="text-[10px] font-mono text-accent uppercase tracking-widest block mb-1.5 font-bold">AI &amp; GenAI</span>
                    <div className="flex flex-wrap gap-1.5">
                      {['Agentic Systems', 'RAG Pipelines', 'LangChain', 'LangGraph', 'OpenAI / Mistral / Gemini', 'Local LLMs (Phi/Gemma)', 'Fine-tuning'].map((skill) => (
                        <span key={skill} className="px-2.5 py-1 bg-[#0a0a0a] border border-white/5 rounded-lg text-xs font-mono text-textMuted hover:text-accent hover:border-accent/30 transition-colors">
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div>
                    <span className="text-[10px] font-mono text-accent uppercase tracking-widest block mb-1.5 font-bold">Vector &amp; Data</span>
                    <div className="flex flex-wrap gap-1.5">
                      {['pgvector', 'Qdrant', 'Pinecone', 'Oracle Vector DB', 'PostgreSQL', 'Supabase'].map((skill) => (
                        <span key={skill} className="px-2.5 py-1 bg-[#0a0a0a] border border-white/5 rounded-lg text-xs font-mono text-textMuted hover:text-accent hover:border-accent/30 transition-colors">
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div>
                    <span className="text-[10px] font-mono text-accent uppercase tracking-widest block mb-1.5 font-bold">Backend &amp; Automation</span>
                    <div className="flex flex-wrap gap-1.5">
                      {['Python 3.11', 'FastAPI', 'Docker', 'AsyncIO', 'n8n (Ranked Creator)', 'Make', 'Webhooks', 'AWS S3', 'Vercel'].map((skill) => (
                        <span key={skill} className="px-2.5 py-1 bg-[#0a0a0a] border border-white/5 rounded-lg text-xs font-mono text-textMuted hover:text-accent hover:border-accent/30 transition-colors">
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </AccordionSection>

              {/* 04 VERIFIED CERTIFICATIONS */}
              <AccordionSection title="04 Verified Certifications" defaultOpen={true}>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {topCerts.map((cert, idx) => (
                    <div key={idx} className="p-3 bg-[#0a0a0a] border border-white/5 rounded-xl flex items-start gap-2.5">
                      <Award size={16} className="text-accent shrink-0 mt-0.5" />
                      <div className="min-w-0">
                        <h4 className="text-xs font-bold text-white leading-snug truncate">{cert.name}</h4>
                        <div className="flex items-center gap-2 mt-0.5 font-mono text-[10px] text-textMuted">
                          <span>{cert.issuer}</span>
                          {cert.id && <span className="text-accent/70">· ID: {cert.id}</span>}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
                <div className="mt-2.5 text-right">
                  <Link to="/certs" className="font-mono text-xs text-accent hover:underline inline-flex items-center gap-1">
                    View All 17 Certifications <ArrowUpRight size={12} />
                  </Link>
                </div>
              </AccordionSection>

            </div>
          </div>

          {/* ========================================================================= */}
          {/* RIGHT SIDEBAR STREAM: Radiohead Player, Location, Activity, Contact (5 cols) */}
          {/* ========================================================================= */}
          <div className="lg:col-span-5 space-y-4 lg:sticky lg:top-20">
            
            {/* Premium Radiohead Music Player Widget */}
            <div className="bg-[#0a0a0a] border border-white/10 rounded-2xl p-4 sm:p-5 relative overflow-hidden group hover:border-accent/30 transition-all duration-300 shadow-[0_4px_20px_rgba(0,0,0,0.5)]">
              <div className="absolute top-0 left-0 w-full h-[2px] bg-gradient-to-r from-transparent via-accent/40 to-transparent"></div>
              
              {/* Top Row: Track Meta + Equalizer + Spotify CTA */}
              <div className="flex items-center justify-between gap-3 mb-3.5">
                <div className="flex items-center gap-3 min-w-0">
                  <div className="w-12 h-12 bg-black border border-accent/30 rounded-xl flex items-center justify-center relative shrink-0 overflow-hidden shadow-[0_0_12px_rgba(76,169,255,0.15)] group-hover:border-accent transition-colors">
                    <Disc className="text-accent animate-spin-slow" size={24} />
                    <div className="absolute inset-0 bg-accent/5 pointer-events-none"></div>
                  </div>

                  <div className="min-w-0">
                    <div className="flex items-center gap-2 mb-0.5">
                      <span className="text-[10px] font-mono text-green-400 uppercase tracking-widest font-bold flex items-center gap-1.5">
                        <span className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse"></span>
                        Now Playing
                      </span>
                      <span className="text-[10px] font-mono text-textMuted">· Focus</span>
                    </div>
                    
                    <h3 className="text-base font-bold leading-none text-white truncate">
                      <span className="text-accent">My Iron Lung</span>
                    </h3>
                    <p className="text-[11px] font-mono text-textMuted mt-1 truncate">
                      Radiohead · The Bends (1995)
                    </p>
                  </div>
                </div>

                <a 
                  href="https://open.spotify.com/search/radiohead%20my%20iron%20lung" 
                  target="_blank" 
                  rel="noreferrer" 
                  className="flex items-center gap-1.5 bg-[#1DB954]/10 border border-[#1DB954]/30 text-[#1DB954] hover:bg-[#1DB954] hover:text-black font-mono font-bold text-xs px-3 py-2 rounded-xl transition-all duration-200 shadow-[0_0_12px_rgba(29,185,84,0.15)] shrink-0"
                  title="Listen on Spotify"
                >
                  <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor"><path d="M12 0C5.4 0 0 5.4 0 12s5.4 12 12 12 12-5.4 12-12S18.66 0 12 0zm5.521 17.34c-.24.359-.66.48-1.021.24-2.82-1.74-6.36-2.101-10.561-1.141-.418.122-.779-.179-.899-.539-.12-.421.18-.78.54-.9 4.56-1.021 8.52-.6 11.64 1.32.42.18.48.66.301 1.02zm1.44-3.3c-.301.42-.841.6-1.262.3-3.239-1.98-8.159-2.58-11.939-1.38-.479.12-1.02-.12-1.14-.6-.12-.48.12-1.021.6-1.141C9.6 9.9 15 10.561 18.72 12.84c.361.181.54.72.24 1.2zm.12-3.36C15.24 8.4 8.82 8.16 5.16 9.301c-.6.179-1.2-.181-1.38-.721-.18-.601.18-1.2.72-1.381 4.26-1.26 11.4-1.02 15.6 1.44.539.3.719.96.418 1.5-.239.478-.899.66-1.439.36z"/></svg>
                  <span>Spotify</span>
                </a>
              </div>

              {/* Bottom Row: Dynamic Flowing Lyrics Bar */}
              <div className="pt-3 border-t border-white/5 space-y-2">
                <div className="flex items-center gap-2 min-w-0">
                  <span className="text-[9px] font-mono text-accent bg-accent/10 border border-accent/30 px-1.5 py-0.5 rounded uppercase font-bold shrink-0">
                    LYRICS
                  </span>
                  
                  <div className="h-5 overflow-hidden relative flex-grow min-w-0">
                    <div 
                      key={lyricIndex} 
                      className="text-xs font-mono text-accent animate-fade-in flex items-center gap-1.5 truncate font-medium"
                    >
                      <span>♪</span>
                      <span className="italic">&ldquo;{RADIOHEAD_LYRICS[lyricIndex]}&rdquo;</span>
                    </div>
                  </div>
                </div>

                {/* Audio Timeline */}
                <div className="flex items-center justify-between font-mono text-[10px] text-textMuted pt-1">
                  <span>02:41</span>
                  <div className="flex-grow mx-2.5 h-1 bg-white/10 rounded-full overflow-hidden relative">
                    <div className="h-full bg-accent w-[62%] rounded-full shadow-[0_0_8px_var(--color-accent)]"></div>
                  </div>
                  <span>04:36</span>
                </div>
              </div>
            </div>

            {/* Location & Real-Time IST Clock Widget */}
            <div className="bg-[#0a0a0a] border border-white/5 rounded-2xl p-4 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="bg-accent/10 p-2.5 rounded-xl text-accent">
                  <MapPin size={18} />
                </div>
                <div>
                  <div className="text-white font-bold text-sm">Mumbai, India</div>
                  <div className="text-xs text-textMuted font-mono">19.0760° N, 72.8777° E</div>
                </div>
              </div>
              <div className="text-right">
                <div className="text-white font-mono font-bold text-sm">IST</div>
                <div className="text-xs text-textMuted font-mono">UTC+05:30 · Remote</div>
              </div>
            </div>

            {/* 90-Day Contribution Heatmap Activity */}
            <div className="bg-[#0a0a0a] border border-white/5 rounded-2xl p-4">
              <div className="flex justify-between items-end mb-3">
                <div>
                  <div className="text-xs text-textMuted mb-0.5">Contributions</div>
                  <div className="text-2xl font-display font-bold text-white">1,144 <span className="text-sm text-textMuted font-sans font-normal">total</span></div>
                </div>
                <div className="text-xs text-accent font-mono">Last 90 days</div>
              </div>
              
              <div className="flex gap-[3px] justify-between overflow-hidden py-1">
                {contributionDays.map((day, i) => (
                  <div 
                    key={i} 
                    className="w-full aspect-square rounded-[2px] bg-accent transition-all hover:scale-125"
                    style={{ opacity: day.opacity }}
                  />
                ))}
              </div>
              <div className="mt-3 text-[10px] text-textMuted flex justify-between items-center">
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

            {/* Get In Touch CTA Card */}
            <div className="bg-[#0a0a0a] border border-white/10 rounded-2xl p-5 text-center relative overflow-hidden">
              <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-accent to-transparent"></div>
              
              <Sparkles size={20} className="text-accent mx-auto mb-2" />
              <h3 className="text-lg font-display font-bold text-white mb-1">
                Let's build something
              </h3>
              <p className="text-xs text-textMuted mb-4 leading-relaxed">
                Interested in AI automation, LLM pipelines, or full-time roles?
              </p>
              
              <div className="flex flex-col sm:flex-row gap-2 justify-center">
                <a 
                  href="mailto:rajeet9653@gmail.com" 
                  className="inline-flex items-center justify-center gap-1.5 bg-white text-black font-bold text-xs px-4 py-2.5 rounded-full hover:scale-105 transition-transform"
                >
                  <Mail size={14} /> Send Email
                </a>
                <a 
                  href="https://linkedin.com/in/rajeet-nair" 
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center justify-center gap-1.5 bg-accent/10 border border-accent/30 text-accent font-bold text-xs px-4 py-2.5 rounded-full hover:bg-accent/20 transition-colors"
                >
                  <Calendar size={14} /> Book a Call
                </a>
              </div>
            </div>

          </div>

        </div>

      </div>
    </div>
  );
};