import React from 'react';
import { CERTIFICATIONS } from '../constants';
import { Award, Hash } from 'lucide-react';
import { Link } from 'react-router-dom';

export const CertCarousel: React.FC = () => {
  const content = (
    <div className="flex shrink-0">
      {CERTIFICATIONS.map((cert, index) => (
        <div 
            key={index} 
            className="flex-shrink-0 w-[270px] sm:w-[300px] bg-black border-r border-border p-6 sm:p-8 group/card hover:bg-[#0a0a0a] transition-colors relative"
        >
            <div className="absolute top-4 right-4 opacity-25 group-hover/card:opacity-100 transition-opacity">
                <Award className="text-accent" size={20} />
            </div>
            
            <div className="mb-4 sm:mb-6">
                <div className="text-[10px] font-mono text-accent uppercase tracking-widest mb-1">
                    Issued By
                </div>
                <div className="text-xs sm:text-sm font-mono text-textMuted uppercase">
                    {cert.issuer}
                </div>
            </div>

            <h4 className="font-display font-bold text-xl sm:text-2xl text-textMain leading-none mb-4 sm:mb-6 group-hover/card:text-accent transition-colors min-h-[44px] whitespace-normal">
                {cert.name}
            </h4>

            <div className="flex items-center gap-2 pt-4 border-t border-border/50">
                <div className="w-2 h-2 bg-accent rounded-full"></div>
                <span className="font-mono text-xs text-textMuted uppercase">Verified: {cert.year}</span>
            </div>
            
            {/* Hover bracket */}
            <div className="absolute bottom-0 left-0 w-full h-1 bg-accent transform scale-x-0 group-hover/card:scale-x-100 transition-transform origin-left"></div>
        </div>
      ))}
      {/* View All Card */}
      <Link to="/certs" className="flex-shrink-0 w-[140px] sm:w-[150px] bg-black border-r border-border flex flex-col justify-center items-center hover:bg-[#0a0a0a] active:bg-[#121212] transition-colors cursor-pointer group/link relative">
          <span className="text-3xl sm:text-4xl font-display font-bold text-textMuted group-hover/link:text-accent">+</span>
          <span className="font-mono text-[10px] sm:text-xs text-textMuted mt-2 uppercase tracking-widest group-hover/link:text-textMain">View All</span>
      </Link>
    </div>
  );

  return (
    <div className="relative w-full border-b border-border bg-black overflow-hidden">
      <div className="px-4 sm:px-6 py-3 sm:py-3.5 flex justify-between items-center border-b border-border bg-black relative z-10">
        <div className="flex items-center gap-2 text-accent">
            <Hash size={14} />
            <span className="font-mono text-xs uppercase tracking-widest font-bold">Sys_Certifications // Module_View</span>
            <span className="text-[10px] text-accent/60 font-mono hidden sm:inline-block">[ ⌖ ]</span>
        </div>
        <div className="flex items-center gap-3">
          <div className="w-16 h-2 text-accent/40 tech-barcode hidden sm:block"></div>
          <span className="text-[10px] font-mono text-accent/60 tracking-wider">XXXXXXXX</span>
        </div>
      </div>

      {/* Seamless 2-set Marquee on Solid Black with Slow Smooth Speed */}
      <div className="flex overflow-hidden bg-black group touch-scroll">
        <div className="flex w-max flex-shrink-0 animate-marquee-slow">
          {content}
          {content}
        </div>
      </div>
    </div>
  );
};
