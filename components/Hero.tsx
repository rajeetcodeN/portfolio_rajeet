import React from 'react';
import { ArrowDown, ScanFace, Database, Zap, QrCode, Terminal, Shield, Cpu } from 'lucide-react';
import { HERO_DATA, CAPABILITY_ROWS } from '../constants';
import { ProfilePhoto } from './ProfilePhoto';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { cn } from '../utils/cn';

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.3,
    },
  },
};

const itemVariants = {
  hidden: { y: 20, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: { duration: 0.5, ease: "easeOut" },
  },
};

export const Hero: React.FC = () => {
  return (
    <div className="relative bg-black text-textMain overflow-hidden">
      {/* Hero Body */}
      <div className="relative border-b border-border overflow-hidden bg-black">
         {/* Subtle Ambient Glow */}
         <div className="absolute -top-32 -left-32 w-[500px] h-[500px] rounded-full bg-accent/5 blur-[140px] pointer-events-none z-0"></div>
         <div className="absolute bottom-0 right-0 w-[400px] h-[400px] rounded-full bg-accent/5 blur-[120px] pointer-events-none z-0"></div>

         <motion.div 
            initial="hidden"
            animate="visible"
            variants={containerVariants}
            className="grid grid-cols-1 lg:grid-cols-12 min-h-[85vh] relative z-20"
         >
            {/* Left: Typography Attack */}
            <div className="lg:col-span-8 p-5 sm:p-8 md:p-10 lg:p-14 flex flex-col justify-center relative border-b lg:border-b-0 lg:border-r border-border bg-black">
               {/* Top Cyber Accent Rail with Hazard Stripes */}
               <div className="absolute top-0 left-0 w-full flex items-center justify-between pointer-events-none">
                 <motion.div 
                   initial={{ scaleX: 0 }}
                   animate={{ scaleX: 1 }}
                   transition={{ duration: 0.8, ease: "easeInOut" }}
                   className="h-1 bg-accent flex-grow origin-left"
                 />
                 <div className="w-24 h-1 hazard-stripes opacity-80 shrink-0"></div>
               </div>
               
               <motion.div variants={itemVariants} className="mb-4 flex flex-wrap items-center gap-2.5 sm:gap-3">
                  <div className="bg-black border border-accent/40 px-3 py-1 text-[10px] sm:text-xs font-mono text-accent uppercase tracking-widest flex items-center gap-2 chamfer-card-tr shadow-[0_0_12px_rgba(76,169,255,0.15)]">
                     <Terminal size={12} />
                     // GENAI_CORE :: v4.2
                  </div>
                  <div className="w-12 h-2 hazard-stripes opacity-60 hidden sm:block"></div>
                  <div className="h-px flex-grow bg-border hidden sm:block"></div>
                  <div className="text-[10px] sm:text-xs font-mono text-textMuted flex items-center gap-2 border border-border/80 px-2.5 py-0.5 rounded-full bg-black">
                     <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse shadow-[0_0_8px_rgba(34,197,94,0.6)]"></div>
                     <span className="text-white font-medium">OPEN TO ROLES</span>
                     <span className="text-textMuted">· Mumbai / Remote</span>
                  </div>
               </motion.div>

                <div className="relative w-full max-w-2xl">
                    <motion.h1 
                      variants={itemVariants}
                      className="text-5xl sm:text-7xl md:text-[6.5rem] lg:text-[7.5rem] leading-[0.85] font-display font-bold uppercase tracking-tighter break-words select-none relative z-20"
                    >
                      <div className="flex items-center gap-4">
                        <span>Rajeet</span>
                        <span className="text-xs font-mono font-normal tracking-widest text-accent border border-accent/30 px-2 py-0.5 self-start mt-2 hidden sm:inline-block">
                          SYS_ID // 096
                        </span>
                      </div>
                      <span className="text-transparent bg-clip-text bg-gradient-to-r from-accent via-accent to-white drop-shadow-[0_0_20px_rgba(76,169,255,0.4)]">Nair</span>
                    </motion.h1>
                   
                   {/* QR Code Resume Trigger - Chamfered Frame */}
                   <motion.a 
                     variants={itemVariants}
                     whileHover={{ scale: 1.05, rotate: 1 }}
                     href="/resume.pdf" 
                     download="Rajeet_Nair_Resume.pdf"
                     className="absolute bottom-2 right-0 md:bottom-4 md:right-2 w-20 h-20 md:w-24 md:h-24 bg-black border-2 border-accent p-1.5 cursor-pointer group z-30 hidden md:flex flex-col items-center justify-center shadow-[0_0_20px_rgba(76,169,255,0.25)] chamfer-card"
                     title="Scan to Download Resume"
                   >
                      <QrCode className="text-accent group-hover:text-white w-full h-full transition-colors" strokeWidth={1.5} />
                      <div className="absolute -bottom-5 left-0 w-full text-center font-mono text-[9px] text-accent uppercase tracking-widest bg-black px-1 border border-accent/30">
                        GET_RESUME ↗
                      </div>
                      {/* Corner markers */}
                      <div className="absolute top-0 left-0 w-1.5 h-1.5 bg-accent"></div>
                      <div className="absolute bottom-0 right-0 w-1.5 h-1.5 bg-accent"></div>
                   </motion.a>
                </div>
                
                <motion.p variants={itemVariants} className="mt-6 sm:mt-8 text-lg sm:text-2xl md:text-3xl font-sans text-textMain font-bold max-w-2xl leading-snug">
                   {HERO_DATA.headline}
                </motion.p>
                <motion.p variants={itemVariants} className="mt-3 sm:mt-4 text-sm sm:text-base md:text-lg font-sans text-textMuted max-w-2xl leading-relaxed">
                   I design and ship <span className="text-textMain font-semibold">RAG applications, document-intelligence pipelines, multimodal vision systems</span> and <span className="text-textMain font-semibold">automation workflows</span> — using Python, LLMs, vector databases and cloud infrastructure.
                </motion.p>

                {/* Capsule Pills & HUD Telemetry */}
                <motion.div variants={itemVariants} className="mt-5 flex flex-wrap gap-2 items-center">
                  <div className="tech-capsule text-accent border-accent/40 bg-accent/5">
                    <span className="w-1.5 h-1.5 rounded-full bg-accent animate-ping"></span>
                    <span>PROMPT ✦ RUN ✦ SHIP</span>
                  </div>
                  <div className="tech-capsule text-textMuted hover:text-white">
                    <span>INSTANT RAG</span>
                  </div>
                  <div className="tech-capsule text-textMuted hover:text-white">
                    <span>AGENTIC SYSTEMS</span>
                  </div>
                  <div className="tech-capsule text-textMuted hover:text-white">
                    <span>N8N VERIFIED</span>
                  </div>
                  <div className="flex items-center gap-1 text-[10px] font-mono text-accent/60 pl-1">
                    <span>▲▽▲</span>
                    <div className="w-12 h-2.5 text-accent/50 tech-barcode"></div>
                  </div>
                </motion.div>

                {/* Capability Rows */}
                <motion.div variants={itemVariants} className="mt-6 sm:mt-8 space-y-2 border-l-2 border-accent/40 pl-4 sm:pl-5 relative">
                   <div className="absolute -left-[5px] top-0 w-2 h-2 bg-accent"></div>
                   <div className="absolute -left-[5px] bottom-0 w-2 h-2 bg-accent"></div>
                   {CAPABILITY_ROWS.map((row) => (
                      <div key={row.domain} className="flex flex-col sm:flex-row sm:items-baseline gap-0.5 sm:gap-4">
                         <span className="font-mono text-[10px] sm:text-xs text-accent uppercase tracking-widest sm:w-36 shrink-0 flex items-center gap-1.5">
                           <span className="text-accent/60">»</span> {row.domain}
                         </span>
                         <span className="font-mono text-xs text-textMuted">{row.items}</span>
                      </div>
                   ))}
                </motion.div>

                <motion.div variants={itemVariants} className="mt-8 sm:mt-10 flex flex-col sm:flex-row gap-3 sm:gap-4">
                   <Link to="/projects" className="bg-accent text-black font-display font-bold text-lg sm:text-xl uppercase px-6 sm:px-8 py-3.5 sm:py-3 active:scale-[0.98] hover:bg-white hover:text-black transition-all flex items-center justify-center gap-2 text-center shadow-[0_0_20px_rgba(76,169,255,0.35)] chamfer-card-tr">
                      Explore Systems <ArrowDown size={18} />
                   </Link>
                   <div className="grid grid-cols-2 gap-3 sm:flex sm:gap-4">
                     <a href="https://github.com/rajeetcodeN" target="_blank" rel="noreferrer" className="border border-border bg-black text-textMain font-display font-bold text-base sm:text-xl uppercase px-4 sm:px-8 py-3 sm:py-3 hover:border-accent hover:text-accent active:bg-surface transition-all text-center chamfer-card-tr flex items-center justify-center gap-1">
                         GitHub ↗
                     </a>
                     <a href="/resume.pdf" download="Rajeet_Nair_Resume.pdf" className="border border-border bg-black text-textMain font-display font-bold text-base sm:text-xl uppercase px-4 sm:px-8 py-3 sm:py-3 hover:border-accent hover:text-accent active:bg-surface transition-all text-center chamfer-card-tr flex items-center justify-center gap-1">
                         Resume ↗
                     </a>
                   </div>
                </motion.div>
            </div>

            {/* Right: Technical Stats / HUD */}
            <div className="flex lg:col-span-4 bg-black flex-col relative overflow-hidden border-t md:border-t-0 border-border">
               {/* HUD Overlay Top Bar with Reticle Markers */}
               <div className="p-3 border-b border-border bg-black flex items-center justify-between font-mono text-[10px] text-textMuted">
                  <div className="flex items-center gap-2">
                    <span className="text-accent font-bold">[ + ]</span>
                    <span className="text-accent uppercase tracking-widest">SYS_METRICS // ACTIVE</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-14 h-2.5 text-accent/60 tech-barcode"></div>
                    <div className="w-8 h-2 hazard-stripes opacity-60"></div>
                  </div>
               </div>

               {/* Operative Profile Card */}
               <motion.div 
                 variants={itemVariants}
                 className="p-6 md:p-8 border-b border-border relative overflow-hidden bg-black hover:bg-[#070707] transition-colors group"
               >
                  <div className="absolute top-0 left-0 w-1 h-0 bg-accent group-hover:h-full transition-all duration-300"></div>
                  <div className="flex items-center gap-5">
                     <div className="relative">
                       <ProfilePhoto size={100} />
                       <div className="absolute -bottom-1 -right-1 px-1.5 py-0.5 bg-black border border-accent text-[9px] font-mono text-accent uppercase tracking-widest">
                         M/01
                       </div>
                     </div>
                     <div className="min-w-0">
                        <div className="font-mono text-[9px] text-accent uppercase tracking-widest mb-1 flex items-center gap-1.5">
                           <ScanFace size={11} />
                           operative_profile
                        </div>
                        <h3 className="font-display font-bold text-textMain uppercase text-xl leading-none">Rajeet Nair</h3>
                        <p className="font-mono text-[10px] text-textMuted mt-2 leading-relaxed">
                           AI Software Engineer<br />
                           Mumbai, India · Remote
                        </p>
                        {/* Geo Coordinates (Latitude & Longitude) */}
                        <div className="mt-3 inline-flex items-center gap-1.5 font-mono text-[9px] text-accent tracking-wider bg-[#0a0a0a] px-2.5 py-1 border border-border/80 rounded">
                          <span className="w-1.5 h-1.5 rounded-full bg-accent animate-pulse shadow-[0_0_8px_rgba(76,169,255,0.6)]"></span>
                          <span className="text-textMuted uppercase">GEO:</span>
                          <span className="text-white font-medium">19.0760° N, 72.8777° E</span>
                        </div>
                     </div>
                  </div>
               </motion.div>

               {/* Stat Block 1 */}
               <motion.div 
                 variants={itemVariants}
                 className="flex-1 p-6 md:p-8 border-b border-border flex flex-col justify-center group relative overflow-hidden bg-black hover:bg-[#070707] transition-colors"
               >
                  <div className="absolute top-0 left-0 w-1 h-0 bg-accent group-hover:h-full transition-all duration-300"></div>
                  <div className="flex items-center justify-between mb-2">
                    <ScanFace className="text-textMuted group-hover:text-accent transition-colors" size={26} />
                    <span className="font-mono text-[10px] text-textMuted border border-border px-1.5 py-0.5 group-hover:border-accent/40 group-hover:text-accent transition-colors">
                      M/02
                    </span>
                  </div>
                  <h3 className="text-2xl md:text-3xl font-display font-bold text-textMain uppercase flex items-center gap-2">
                    Agentic Systems
                    <Shield size={16} className="opacity-0 group-hover:opacity-100 text-accent transition-opacity" />
                  </h3>
                  <p className="font-mono text-xs text-textMuted mt-1 md:mt-2">Autonomous Workflow Design & Orchestration</p>
                  <div className="absolute right-4 bottom-4 opacity-0 group-hover:opacity-100 transition-opacity text-accent font-mono text-xs">01 »»</div>
               </motion.div>
               
               {/* Stat Block 2 */}
               <motion.div 
                 variants={itemVariants}
                 className="flex-1 p-6 md:p-8 border-b border-border flex flex-col justify-center group relative overflow-hidden bg-black hover:bg-[#070707] transition-colors"
               >
                  <div className="absolute top-0 left-0 w-1 h-0 bg-accent group-hover:h-full transition-all duration-300"></div>
                  <div className="flex items-center justify-between mb-2">
                    <Database className="text-textMuted group-hover:text-accent transition-colors" size={26} />
                    <span className="font-mono text-[10px] text-textMuted border border-border px-1.5 py-0.5 group-hover:border-accent/40 group-hover:text-accent transition-colors">
                      M/03
                    </span>
                  </div>
                  <h3 className="text-2xl md:text-3xl font-display font-bold text-textMain uppercase flex items-center gap-2">
                    Production RAG
                    <Cpu size={16} className="opacity-0 group-hover:opacity-100 text-accent transition-opacity" />
                  </h3>
                  <p className="font-mono text-xs text-textMuted mt-1 md:mt-2">Semantic Retrieval & Vector DBs (Qdrant/Pinecone)</p>
                  <div className="absolute right-4 bottom-4 opacity-0 group-hover:opacity-100 transition-opacity text-accent font-mono text-xs">02 »»</div>
               </motion.div>

               {/* Stat Block 3 */}
               <motion.div 
                 variants={itemVariants}
                 className="flex-1 p-6 md:p-8 flex flex-col justify-center group relative overflow-hidden bg-black hover:bg-[#070707] transition-colors"
               >
                  <div className="absolute top-0 left-0 w-1 h-0 bg-accent group-hover:h-full transition-all duration-300"></div>
                  <div className="flex items-center justify-between mb-2">
                    <Zap className="text-textMuted group-hover:text-accent transition-colors" size={26} />
                    <span className="font-mono text-[10px] text-textMuted border border-border px-1.5 py-0.5 group-hover:border-accent/40 group-hover:text-accent transition-colors">
                      M/04
                    </span>
                  </div>
                  <h3 className="text-2xl md:text-3xl font-display font-bold text-textMain uppercase flex items-center gap-2">
                    Automation
                    <Terminal size={16} className="opacity-0 group-hover:opacity-100 text-accent transition-opacity" />
                  </h3>
                  <p className="font-mono text-xs text-textMuted mt-1 md:mt-2">n8n Verified Creator & Enterprise Integration</p>
                  <div className="absolute right-4 bottom-4 opacity-0 group-hover:opacity-100 transition-opacity text-accent font-mono text-xs">03 »»</div>
               </motion.div>
            </div>
         </motion.div>
      </div>
      
      {/* Cyber Marquee with Diamond Separators & Hazard Striping */}
      <div className="bg-accent text-black overflow-hidden py-2.5 border-b border-border relative z-20 shadow-[0_0_25px_rgba(76,169,255,0.3)]">
         <div className="flex gap-8 items-center font-display font-bold text-xl md:text-2xl uppercase tracking-widest whitespace-nowrap animate-marquee">
            <span className="flex items-center gap-2">Generative AI Engineer</span>
            <span className="text-black/60">✦</span>
            <span>Production RAG</span>
            <span className="text-black/60">✦</span>
            <span>Agentic Systems</span>
            <span className="text-black/60">✦</span>
            <span>Python & LangChain</span>
            <span className="text-black/60">✦</span>
            <span>n8n Verified Creator</span>
            <span className="text-black/60">✦</span>
            <span>Multimodal Vision</span>
            <span className="text-black/60">✦</span>
            <span>Generative AI Engineer</span>
            <span className="text-black/60">✦</span>
            <span>Production RAG</span>
            <span className="text-black/60">✦</span>
            <span>Agentic Systems</span>
            <span className="text-black/60">✦</span>
            <span>Python & LangChain</span>
            <span className="text-black/60">✦</span>
            <span>n8n Verified Creator</span>
            <span className="text-black/60">✦</span>
            <span>Multimodal Vision</span>
         </div>
      </div>
    </div>
  );
};
