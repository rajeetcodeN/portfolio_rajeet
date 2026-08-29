import React from 'react';
import { Mail, Linkedin, Github, Download, ArrowUp, MapPin } from 'lucide-react';

export const Footer: React.FC = () => {
  return (
    <footer id="contact" className="bg-black border-t border-border relative overflow-hidden">
      {/* Ambient footer glow */}
      <div className="absolute -bottom-40 left-1/4 w-[600px] h-[400px] rounded-full bg-accent/5 blur-[120px] pointer-events-none"></div>
      
      <div className="grid grid-cols-1 md:grid-cols-12 min-h-[400px] relative z-10">
        
        {/* Contact Block */}
        <div className="md:col-span-8 border-b md:border-b-0 md:border-r border-border p-6 md:p-10 flex flex-col justify-between bg-black">
          <div>
            <div className="flex items-center gap-2 mb-4">
              <div className="inline-block bg-accent text-black font-mono text-[10px] font-bold uppercase px-2.5 py-0.5 chamfer-card-tr">
                  Initiate Contact Sequence // [ + ]
              </div>
              <div className="w-16 h-2.5 text-accent/50 tech-barcode hidden sm:block"></div>
            </div>
            <h2 className="text-4xl md:text-5xl font-display font-bold mb-6 uppercase leading-[0.9]">
              Ready to <br/><span className="text-transparent bg-clip-text bg-gradient-to-r from-accent to-white">Deploy?</span>
            </h2>
            <div className="space-y-4">
                <div className="flex items-center gap-4 group">
                    <div className="w-10 h-10 flex items-center justify-center border border-border bg-[#0a0a0a] group-hover:bg-accent group-hover:border-accent transition-all chamfer-card-tr">
                        <MapPin className="text-textMain group-hover:text-black transition-colors" size={18} />
                    </div>
                    <div>
                        <span className="block text-[9px] font-mono text-textMuted uppercase tracking-widest mb-0.5">Base of Operations</span>
                        <span className="text-base font-display font-bold text-textMain tracking-wide">19.0760° N, 72.8777° E · Mumbai, India</span>
                    </div>
                </div>

                <a href="mailto:rajeet9653@gmail.com" className="flex items-center gap-4 group">
                    <div className="w-10 h-10 flex items-center justify-center border border-border bg-[#0a0a0a] group-hover:bg-accent group-hover:border-accent transition-all chamfer-card-tr">
                        <Mail className="text-textMain group-hover:text-black transition-colors" size={18} />
                    </div>
                    <div>
                        <span className="block text-[9px] font-mono text-textMuted uppercase tracking-widest mb-0.5">Direct Line</span>
                        <span className="text-base font-display font-bold text-textMain group-hover:text-accent transition-colors tracking-wide">rajeet9653@gmail.com</span>
                    </div>
                </a>
                
                <a href="/resume.pdf" download="Rajeet_Nair_Resume.pdf" className="flex items-center gap-4 group">
                    <div className="w-10 h-10 flex items-center justify-center border border-border bg-[#0a0a0a] group-hover:bg-accent group-hover:border-accent transition-all chamfer-card-tr">
                        <Download className="text-textMain group-hover:text-black transition-colors" size={18} />
                    </div>
                    <div>
                        <span className="block text-[9px] font-mono text-textMuted uppercase tracking-widest mb-0.5">Dossier</span>
                        <span className="text-base font-display font-bold text-textMain group-hover:text-accent transition-colors tracking-wide">Download Resume PDF (ATS-Friendly)</span>
                    </div>
                </a>
            </div>
          </div>
        </div>

        {/* Links & Meta Block */}
        <div className="md:col-span-4 bg-black p-6 md:p-10 flex flex-col justify-between relative overflow-hidden">
            <div className="relative z-10 flex gap-3">
                <a href="https://linkedin.com/in/rajeet-nair" target="_blank" rel="noreferrer" aria-label="LinkedIn" className="w-12 h-12 flex items-center justify-center border border-border bg-[#0a0a0a] hover:bg-accent hover:border-accent hover:shadow-[0_0_20px_rgba(76,169,255,0.4)] group transition-all chamfer-card-tr">
                   <Linkedin size={20} className="text-textMuted group-hover:text-black transition-colors" />
                </a>
                <a href="https://github.com/rajeetcodeN" target="_blank" rel="noreferrer" aria-label="GitHub" className="w-12 h-12 flex items-center justify-center border border-border bg-[#0a0a0a] hover:bg-accent hover:border-accent hover:shadow-[0_0_20px_rgba(76,169,255,0.4)] group transition-all chamfer-card-tr">
                   <Github size={20} className="text-textMuted group-hover:text-black transition-colors" />
                </a>
                <a href="mailto:rajeet9653@gmail.com" aria-label="Email" className="w-12 h-12 flex items-center justify-center border border-border bg-[#0a0a0a] hover:bg-accent hover:border-accent hover:shadow-[0_0_20px_rgba(76,169,255,0.4)] group transition-all chamfer-card-tr">
                   <Mail size={20} className="text-textMuted group-hover:text-black transition-colors" />
                </a>
            </div>

           <div className="relative z-10 flex flex-col items-end">
             <button 
               onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
               className="mb-4 w-12 h-12 border border-border bg-[#0a0a0a] flex items-center justify-center hover:bg-accent hover:text-black text-textMain transition-colors chamfer-card-tr"
               aria-label="Scroll to top"
             >
                <ArrowUp size={20} />
             </button>
             <div className="flex items-center gap-1 text-[9px] font-mono text-accent/60 mb-1">
               <span>EST. 2025 // [ ⌖ ]</span>
             </div>
             <p className="text-[9px] font-mono text-textMuted text-right uppercase tracking-widest">
                SYSTEM ID: RN-2025<br />
                ALL SYSTEMS NOMINAL ✦
             </p>
           </div>
        </div>
      </div>
    </footer>
  );
};