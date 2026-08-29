import React from 'react';
import { Section } from './Section';
import { ArrowRight, Terminal } from 'lucide-react';

const FlowItem = ({ label, last = false }: { label: string; last?: boolean }) => (
  <div className="relative group">
    <div className="flex items-center">
      <div className="
        bg-[#0a0a0a] border border-border text-textMain 
        px-6 py-4 text-sm md:text-base font-display font-bold uppercase tracking-widest
        group-hover:border-accent group-hover:text-accent group-hover:shadow-[0_0_15px_rgba(76,169,255,0.2)]
        transition-all duration-300 relative z-10
      ">
        {/* Tiny corner markers - Solid */}
        <div className="absolute top-0 left-0 w-1 h-1 bg-textMuted group-hover:bg-accent transition-colors"></div>
        <div className="absolute bottom-0 right-0 w-1 h-1 bg-textMuted group-hover:bg-accent transition-colors"></div>
        {label}
      </div>
      {!last && (
        <div className="px-4 md:px-6 flex items-center">
          <div className="h-px w-8 md:w-16 bg-border group-hover:bg-accent transition-colors"></div>
          <ArrowRight size={16} className="text-border group-hover:text-accent transition-colors -ml-2" />
        </div>
      )}
    </div>
  </div>
);

export const Architecture: React.FC = () => {
  return (
    <Section title="Sys_Logic" className="bg-black">
      <div className="p-6 md:p-12">
        <div className="flex items-center gap-3 mb-12 font-mono text-xs uppercase tracking-widest text-textMuted">
            <Terminal size={14} className="text-accent" />
            <span>Architecture_Map_v1.0</span>
            <span className="flex-grow border-b border-dotted border-border ml-4"></span>
        </div>

        <div className="bg-black border border-border p-8 md:p-16 relative overflow-hidden group">
          <div className="flex flex-wrap gap-y-12 items-center justify-center relative z-10">
            <FlowItem label="Ingest" />
            <FlowItem label="OCR" />
            <FlowItem label="Validate" />
            <FlowItem label="Vector DB" />
            <div className="basis-full h-0 md:hidden"></div>
            <FlowItem label="RAG Core" />
            <FlowItem label="LLM" />
            <FlowItem label="Output" last />
          </div>
          
          <div className="mt-16 pt-6 border-t border-border flex justify-between items-end font-mono text-[10px] text-textMuted uppercase tracking-widest relative z-10">
             <div>
                STATUS: OPTIMIZED
             </div>
             <div>
                LATENCY: &lt;200ms
             </div>
          </div>
        </div>
      </div>
    </Section>
  );
};