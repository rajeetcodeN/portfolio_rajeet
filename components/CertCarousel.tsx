import React from 'react';
import { CERTIFICATIONS } from '../constants';
import { Award, Hash } from 'lucide-react';
import { Link } from 'react-router-dom';

export const CertCarousel: React.FC = () => {
  const content = (
    <>
      {CERTIFICATIONS.map((cert, index) => (
        <div 
            key={index} 
            className="flex-shrink-0 w-[85vw] md:w-[300px] bg-background p-8 group/card hover:bg-surface/20 transition-colors relative"
        >
            <div className="absolute top-4 right-4 opacity-20 group-hover/card:opacity-100 transition-opacity">
                <Award className="text-accent" size={20} />
            </div>
            
            <div className="mb-6">
                <div className="text-[10px] font-mono text-accentDim uppercase tracking-widest mb-1">
                    Issued By
                </div>
                <div className="text-sm font-mono text-textMuted uppercase">
                    {cert.issuer}
                </div>
            </div>

            <h4 className="font-display font-bold text-2xl text-textMain leading-none mb-6 group-hover/card:text-accent transition-colors min-h-[48px] whitespace-normal">
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
      <Link to="/certs" className="flex-shrink-0 w-[40vw] md:w-[150px] bg-surface/5 flex flex-col justify-center items-center hover:bg-surface/20 transition-colors cursor-pointer group/link relative">
           <div className="absolute inset-0 bg-stripe-pattern opacity-5"></div>
          <span className="text-4xl font-display font-bold text-textMuted group-hover/link:text-accent">+</span>
          <span className="font-mono text-xs text-textMuted mt-2 uppercase tracking-widest group-hover/link:text-textMain">View All</span>
      </Link>
    </>
  );

  return (
    <div className="relative w-full border-b border-border bg-surface/5 overflow-hidden">
      {/* Background Stripes */}
      <div className="absolute top-0 right-0 w-64 h-full bg-stripe-pattern opacity-10 pointer-events-none"></div>

      <div className="px-6 py-4 flex justify-between items-center border-b border-border bg-background relative z-10">
        <div className="flex items-center gap-2 text-accent">
            <Hash size={14} />
            <span className="font-mono text-xs uppercase tracking-widest">Sys_Certifications // Module_View</span>
        </div>
      </div>

      <div className="flex overflow-hidden bg-border group">
        <div className="flex w-max flex-shrink-0 animate-marquee group-hover:[animation-play-state:paused] gap-px pr-px">
          {content}
        </div>
        <div className="flex w-max flex-shrink-0 animate-marquee group-hover:[animation-play-state:paused] gap-px pr-px" aria-hidden="true">
          {content}
        </div>
        <div className="flex w-max flex-shrink-0 animate-marquee group-hover:[animation-play-state:paused] gap-px pr-px" aria-hidden="true">
          {content}
        </div>
        <div className="flex w-max flex-shrink-0 animate-marquee group-hover:[animation-play-state:paused] gap-px pr-px" aria-hidden="true">
          {content}
        </div>
      </div>
    </div>
  );
};
