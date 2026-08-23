import React from 'react';
import { Mail, Linkedin, Github, Download, ArrowUp, MapPin } from 'lucide-react';

export const Footer: React.FC = () => {
  return (
    <footer id="contact" className="bg-background border-t border-border relative overflow-hidden">
      {/* Ambient footer glow */}
      <div className="absolute -bottom-40 left-1/4 w-[600px] h-[400px] rounded-full bg-accent/5 blur-[120px] pointer-events-none"></div>
      
      <div className="grid grid-cols-1 md:grid-cols-12 min-h-[400px] relative z-10">
        
        {/* Contact Block */}
        <div className="md:col-span-8 border-b md:border-b-0 md:border-r border-border p-8 md:p-20 flex flex-col justify-between">
          <div>
            <div className="inline-block bg-accent text-background font-mono text-xs font-bold uppercase px-2 py-1 mb-8">
                Initiate Contact Sequence
            </div>
            <h2 className="text-6xl md:text-8xl font-display font-bold mb-12 uppercase leading-[0.8]">
              Ready to <br/><span className="text-transparent bg-clip-text bg-gradient-to-r from-accent to-white">Deploy?</span>
            </h2>
            <div className="space-y-6">
                <div className="flex items-center gap-6 group">
                    <div className="w-12 h-12 flex items-center justify-center border border-border group-hover:bg-accent group-hover:border-accent transition-all">
                        <MapPin className="text-textMain group-hover:text-background transition-colors" size={20} />
                    </div>
                    <div>
                        <span className="block text-[10px] font-mono text-textMuted uppercase tracking-widest mb-1">Base of Operations</span>
                        <span className="text-xl font-display font-bold text-textMain tracking-wide">Mumbai, India (Remote Available)</span>
                    </div>
                </div>

                <a href="mailto:rajeet9653@gmail.com" className="flex items-center gap-6 group">
                    <div className="w-12 h-12 flex items-center justify-center border border-border group-hover:bg-accent group-hover:border-accent transition-all">
                        <Mail className="text-textMain group-hover:text-background transition-colors" size={20} />
                    </div>
                    <div>
                        <span className="block text-[10px] font-mono text-textMuted uppercase tracking-widest mb-1">Direct Line</span>
                        <span className="text-xl font-display font-bold text-textMain group-hover:text-accent transition-colors tracking-wide">rajeet9653@gmail.com</span>
                    </div>
                </a>
                
                <a href="/resume.pdf" className="flex items-center gap-6 group">
                    <div className="w-12 h-12 flex items-center justify-center border border-border group-hover:bg-accent group-hover:border-accent transition-all">
                        <Download className="text-textMain group-hover:text-background transition-colors" size={20} />
                    </div>
                    <div>
                        <span className="block text-[10px] font-mono text-textMuted uppercase tracking-widest mb-1">Dossier</span>
                        <span className="text-xl font-display font-bold text-textMain group-hover:text-accent transition-colors tracking-wide">Download Resume PDF</span>
                    </div>
                </a>
            </div>
          </div>
        </div>

        {/* Links & Meta Block */}
        <div className="md:col-span-4 bg-surface/10 p-8 md:p-20 flex flex-col justify-between relative overflow-hidden">
           <div className="absolute inset-0 bg-grid-pattern opacity-10"></div>
           
            <div className="relative z-10 flex gap-4">
                <a href="https://linkedin.com" target="_blank" rel="noreferrer" aria-label="LinkedIn" className="w-16 h-16 flex items-center justify-center border border-border bg-background hover:bg-accent hover:border-accent hover:shadow-[0_0_20px_rgba(76,169,255,0.4)] group transition-all hover:-translate-y-1">
                   <Linkedin size={24} className="text-textMuted group-hover:text-background transition-colors" />
                </a>
                <a href="https://github.com/rajeetcodeN" target="_blank" rel="noreferrer" aria-label="GitHub" className="w-16 h-16 flex items-center justify-center border border-border bg-background hover:bg-accent hover:border-accent hover:shadow-[0_0_20px_rgba(76,169,255,0.4)] group transition-all hover:-translate-y-1">
                   <Github size={24} className="text-textMuted group-hover:text-background transition-colors" />
                </a>
                <a href="mailto:rajeet9653@gmail.com" aria-label="Email" className="w-16 h-16 flex items-center justify-center border border-border bg-background hover:bg-accent hover:border-accent hover:shadow-[0_0_20px_rgba(76,169,255,0.4)] group transition-all hover:-translate-y-1">
                   <Mail size={24} className="text-textMuted group-hover:text-background transition-colors" />
                </a>
            </div>

           <div className="relative z-10 flex flex-col items-end">
             <button 
               onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
               className="mb-8 w-16 h-16 border border-border bg-background flex items-center justify-center hover:bg-textMain hover:text-background text-textMain transition-colors"
             >
                <ArrowUp size={24} />
             </button>
             <p className="text-[10px] font-mono text-textMuted text-right uppercase tracking-widest">
                SYSTEM ID: RN-2025<br />
                ALL SYSTEMS NOMINAL
             </p>
           </div>
        </div>
      </div>
    </footer>
  );
};