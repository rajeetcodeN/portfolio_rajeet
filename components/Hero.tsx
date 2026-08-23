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
    <div className="relative bg-transparent text-textMain overflow-hidden">
      {/* Hero Body */}
      <div className="relative border-b border-border overflow-hidden">
         {/* Animated Scrolling Grid */}
         <div className="absolute inset-0 bg-grid-pattern animate-grid-scroll opacity-[0.08] pointer-events-none z-10"></div>

         {/* Ambient Glow */}
         <div className="absolute -top-32 -left-32 w-[500px] h-[500px] rounded-full bg-accent/10 blur-[120px] pointer-events-none z-0"></div>
         <div className="absolute bottom-0 right-0 w-[400px] h-[400px] rounded-full bg-accent/5 blur-[100px] pointer-events-none z-0"></div>

         {/* Scanline sweep — hero only */}
         <div className="absolute inset-x-0 top-0 h-20 scanline-sweep pointer-events-none z-30 overflow-hidden"></div>

         <motion.div 
            initial="hidden"
            animate="visible"
            variants={containerVariants}
            className="grid grid-cols-1 lg:grid-cols-12 min-h-[85vh] relative z-20"
         >
            {/* Left: Typography Attack */}
            <div className="lg:col-span-8 p-6 md:p-12 lg:p-20 flex flex-col justify-center relative border-r border-border bg-background/90">
               {/* Decorative "Warning" Strip */}
               <motion.div 
                 initial={{ scaleX: 0 }}
                 animate={{ scaleX: 1 }}
                 transition={{ duration: 0.8, ease: "easeInOut" }}
                 className="absolute top-0 left-0 w-full h-1 bg-accent origin-left"
               ></motion.div>
               
               <motion.div variants={itemVariants} className="mb-4 flex items-center gap-4">
                  <div className="bg-surface border border-accent/30 neon-border px-3 py-1 text-[10px] md:text-xs font-mono text-accent uppercase tracking-widest flex items-center gap-2">
                     <Terminal size={12} />
                     // AI Engineer
                  </div>
                  <div className="h-px flex-grow bg-border"></div>
                  <div className="text-[10px] md:text-xs font-mono text-textMuted flex items-center gap-2">
                     <div className="w-1.5 h-1.5 bg-green-500 rounded-full animate-pulse"></div>
                     Open to AI Engineering Roles
                  </div>
               </motion.div>

                <div className="relative w-fit">
                    <motion.h1 
                      variants={itemVariants}
                      className="text-6xl sm:text-8xl md:text-[10rem] leading-[0.85] font-display font-bold uppercase tracking-tighter break-words select-none relative z-20 animate-flicker"
                    >
                      <span className="glitch" data-text="Rajeet">Rajeet</span><br />
                      <span className="glitch text-transparent bg-clip-text bg-gradient-to-r from-accent via-accent to-white drop-shadow-[0_0_20px_rgba(76,169,255,0.4)]" data-text="Nair">Nair</span>
                    </motion.h1>
                   
                   {/* QR Code Resume Trigger */}
                   <motion.a 
                     variants={itemVariants}
                     whileHover={{ scale: 1.05, rotate: 3 }}
                     href="/resume.pdf" 
                     download="Rajeet_Nair_Resume.pdf"
                     className="absolute bottom-2 -right-24 md:bottom-8 md:-right-32 w-20 h-20 md:w-24 md:h-24 bg-white border-2 border-accent neon-border p-1 cursor-pointer group z-30 hidden sm:flex flex-col items-center justify-center"
                     title="Scan to Download Resume"
                   >
                      <QrCode className="text-black w-full h-full" strokeWidth={1.5} />
                      <div className="absolute -bottom-5 left-0 w-full text-center font-mono text-[9px] text-accent uppercase tracking-widest bg-background/90 px-1 border border-accent/20">
                        Resume_DL
                      </div>
                      {/* Corner markers for the QR box */}
                      <div className="absolute top-0 left-0 w-2 h-2 border-t-2 border-l-2 border-black"></div>
                      <div className="absolute top-0 right-0 w-2 h-2 border-t-2 border-r-2 border-black"></div>
                      <div className="absolute bottom-0 left-0 w-2 h-2 border-b-2 border-l-2 border-black"></div>
                      <div className="absolute bottom-0 right-0 w-2 h-2 border-b-2 border-r-2 border-black"></div>
                   </motion.a>
               </div>
               
               <motion.p variants={itemVariants} className="mt-8 text-xl md:text-3xl font-sans text-textMain font-bold max-w-2xl leading-snug">
                  {HERO_DATA.headline}
               </motion.p>
               <motion.p variants={itemVariants} className="mt-4 text-base md:text-lg font-sans text-textMuted max-w-2xl leading-relaxed">
                  I design and ship <span className="text-textMain">RAG applications, document-intelligence pipelines, multimodal vision systems</span> and <span className="text-textMain">automation workflows</span> — using Python, LLMs, vector databases and cloud infrastructure.
               </motion.p>
               <motion.p variants={itemVariants} className="mt-4 text-xs md:text-sm font-mono text-accentDim">
                  {HERO_DATA.proof}
               </motion.p>

               {/* Capability Rows */}
               <motion.div variants={itemVariants} className="mt-8 space-y-2 border-l border-border pl-5">
                  {CAPABILITY_ROWS.map((row) => (
                     <div key={row.domain} className="flex flex-col sm:flex-row sm:items-baseline gap-1 sm:gap-4">
                        <span className="font-mono text-[10px] text-accent uppercase tracking-widest w-40 shrink-0">{row.domain}</span>
                        <span className="font-mono text-xs text-textMuted">{row.items}</span>
                     </div>
                  ))}
               </motion.div>

               <motion.div variants={itemVariants} className="mt-12 flex flex-col sm:flex-row gap-4">
                  <Link to="/projects" className="bg-accent text-background font-display font-bold text-lg md:text-xl uppercase px-8 py-4 md:py-3 hover:bg-white hover:text-black transition-colors flex items-center justify-center gap-2 text-center shadow-[0_0_20px_rgba(76,169,255,0.3)] hover:shadow-[0_0_30px_rgba(76,169,255,0.6)]">
                     Explore Systems <ArrowDown size={20} />
                  </Link>
                  <a href="https://github.com/rajeetcodeN" target="_blank" rel="noreferrer" className="border border-border bg-surface/30 text-textMain font-display font-bold text-lg md:text-xl uppercase px-8 py-4 md:py-3 hover:border-accent hover:text-accent transition-colors text-center">
                      GitHub
                  </a>
                  <a href="/resume.pdf" className="border border-border bg-surface/30 text-textMain font-display font-bold text-lg md:text-xl uppercase px-8 py-4 md:py-3 hover:border-accent hover:text-accent transition-colors text-center">
                      Resume
                  </a>
               </motion.div>
            </div>

            {/* Right: Technical Stats / HUD */}
            <div className="flex lg:col-span-4 bg-surface/10 flex-col relative overflow-hidden border-t md:border-t-0 border-border">
               {/* HUD Overlay Elements */}
               <div className="absolute bottom-4 right-4 font-mono text-[10px] text-accent/40 hidden md:block">
                  LOC: MUMBAI, IN
               </div>

               {/* Operative Profile */}
               <motion.div 
                 variants={itemVariants}
                 className="p-6 md:p-8 border-b border-border relative overflow-hidden"
               >
                  <div className="absolute top-0 left-0 w-1 h-0 bg-accent group-hover:h-full transition-all duration-300"></div>
                  <div className="flex items-center gap-5">
                     <ProfilePhoto size={104} />
                     <div className="min-w-0">
                        <div className="font-mono text-[9px] text-accent uppercase tracking-widest mb-1 flex items-center gap-1.5">
                           <ScanFace size={11} />
                           operative_profile
                        </div>
                        <h3 className="font-display font-bold text-textMain uppercase text-lg leading-none">Rajeet Nair</h3>
                        <p className="font-mono text-[10px] text-textMuted mt-1.5 leading-relaxed">
                           AI Engineer<br />
                           Mumbai, India · Remote
                        </p>
                     </div>
                  </div>
               </motion.div>

               {/* Stat Block 1 */}
               <motion.div 
                 variants={itemVariants}
                 whileHover={{ backgroundColor: "rgba(18, 18, 18, 0.5)" }}
                 className="flex-1 p-6 md:p-8 border-b border-border flex flex-col justify-center group relative overflow-hidden"
               >
                  <div className="absolute top-0 left-0 w-1 h-0 bg-accent group-hover:h-full transition-all duration-300"></div>
                  <ScanFace className="text-textMuted group-hover:text-accent mb-2 md:mb-4 transition-colors" size={28} />
                  <h3 className="text-2xl md:text-3xl font-display font-bold text-textMain uppercase flex items-center gap-2">
                    Agentic Systems
                    <Shield size={16} className="opacity-0 group-hover:opacity-100 transition-opacity" />
                  </h3>
                  <p className="font-mono text-xs text-textMuted mt-1 md:mt-2">Autonomous Workflow Design</p>
                  <div className="absolute right-4 top-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-opacity text-accent font-mono text-xs">01</div>
               </motion.div>
               
               {/* Stat Block 2 */}
               <motion.div 
                 variants={itemVariants}
                 whileHover={{ backgroundColor: "rgba(18, 18, 18, 0.5)" }}
                 className="flex-1 p-6 md:p-8 border-b border-border flex flex-col justify-center group relative overflow-hidden"
               >
                  <div className="absolute top-0 left-0 w-1 h-0 bg-accent group-hover:h-full transition-all duration-300"></div>
                  <Database className="text-textMuted group-hover:text-accent mb-2 md:mb-4 transition-colors" size={28} />
                  <h3 className="text-2xl md:text-3xl font-display font-bold text-textMain uppercase flex items-center gap-2">
                    Production RAG
                    <Cpu size={16} className="opacity-0 group-hover:opacity-100 transition-opacity" />
                  </h3>
                  <p className="font-mono text-xs text-textMuted mt-1 md:mt-2">Semantic Retrieval & Vector DBs</p>
                  <div className="absolute right-4 top-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-opacity text-accent font-mono text-xs">02</div>
               </motion.div>

               {/* Stat Block 3 */}
               <motion.div 
                 variants={itemVariants}
                 whileHover={{ backgroundColor: "rgba(18, 18, 18, 0.5)" }}
                 className="flex-1 p-6 md:p-8 flex flex-col justify-center group relative overflow-hidden"
               >
                  <div className="absolute top-0 left-0 w-1 h-0 bg-accent group-hover:h-full transition-all duration-300"></div>
                  <Zap className="text-textMuted group-hover:text-accent mb-2 md:mb-4 transition-colors" size={28} />
                  <h3 className="text-2xl md:text-3xl font-display font-bold text-textMain uppercase flex items-center gap-2">
                    Automation
                    <Terminal size={16} className="opacity-0 group-hover:opacity-100 transition-opacity" />
                  </h3>
                  <p className="font-mono text-xs text-textMuted mt-1 md:mt-2">n8n & Enterprise Integration</p>
                  <div className="absolute right-4 top-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-opacity text-accent font-mono text-xs">03</div>
               </motion.div>
            </div>
         </motion.div>
      </div>
      
      {/* Marquee / Banner */}
      <div className="bg-accent text-background overflow-hidden py-2 border-b border-border relative z-20 shadow-[0_0_20px_rgba(76,169,255,0.2)]">
         <div className="flex gap-8 items-center font-display font-bold text-xl md:text-2xl uppercase tracking-widest whitespace-nowrap opacity-90 animate-marquee">
            <span>Generative AI Engineer</span>
            <span>+</span>
            <span>Production RAG</span>
            <span>+</span>
            <span>Agentic Systems</span>
            <span>+</span>
            <span>Python & LangChain</span>
            <span>+</span>
            <span>n8n Verified Creator</span>
            <span>+</span>
            <span>Full-Stack Integration</span>
            <span>+</span>
            <span>Generative AI Engineer</span>
            <span>+</span>
            <span>Production RAG</span>
            <span>+</span>
            <span>Agentic Systems</span>
            <span>+</span>
            <span>Python & LangChain</span>
            <span>+</span>
            <span>n8n Verified Creator</span>
            <span>+</span>
            <span>Full-Stack Integration</span>
         </div>
      </div>
    </div>
  );
};
