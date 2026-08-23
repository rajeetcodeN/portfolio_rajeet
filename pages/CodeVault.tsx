import React, { useState } from 'react';
import { Section } from '../components/Section';
import { CODE_SNIPPETS } from '../constants';
import { Code, FileCode, Folder, ChevronRight, Terminal } from 'lucide-react';

export const CodeVault: React.FC = () => {
  const [activeSnippetId, setActiveSnippetId] = useState(CODE_SNIPPETS[0].id);
  const activeSnippet = CODE_SNIPPETS.find(s => s.id === activeSnippetId) || CODE_SNIPPETS[0];

  return (
    <div className="min-h-screen pt-12 pb-24">
      <Section title="Source_Vault" noBorder>
        <div className="p-4 md:p-12">
             <div className="flex flex-col md:flex-row md:items-center justify-between mb-8 gap-4">
                <h1 className="text-4xl md:text-6xl font-display font-bold text-textMain uppercase leading-none">
                    Code <span className="text-outline-accent">Repository</span>
                </h1>
                <div className="font-mono text-xs text-accent uppercase tracking-widest border border-accent px-3 py-1 bg-accent/10 animate-pulse w-fit">
                    Live Connection
                </div>
             </div>

             <div className="grid grid-cols-1 lg:grid-cols-12 border border-border bg-[#0D0D0D] min-h-[600px] shadow-2xl">
                {/* Sidebar Explorer - Stacked on Mobile with Max Height */}
                <div className="lg:col-span-3 border-b lg:border-b-0 lg:border-r border-border bg-surface/5 p-4 md:p-6 max-h-[200px] lg:max-h-none overflow-y-auto">
                    <div className="font-mono text-xs text-textMuted uppercase tracking-widest mb-4 md:mb-6 flex items-center gap-2 sticky top-0 bg-[#161616] py-2 z-10">
                        <Folder size={14} /> Root/Modules
                    </div>
                    <div className="space-y-1">
                        {CODE_SNIPPETS.map(snippet => (
                            <button
                                key={snippet.id}
                                onClick={() => setActiveSnippetId(snippet.id)}
                                className={`w-full text-left px-3 py-2 font-mono text-xs flex items-center gap-2 transition-colors ${activeSnippetId === snippet.id ? 'bg-accent text-background font-bold' : 'text-textMuted hover:text-textMain hover:bg-white/5'}`}
                            >
                                <FileCode size={14} />
                                {snippet.filename}
                            </button>
                        ))}
                    </div>
                </div>

                {/* Main Code View */}
                <div className="lg:col-span-9 flex flex-col min-h-[400px]">
                    {/* Tab Bar */}
                    <div className="flex items-center border-b border-border bg-surface/5">
                        <div className="px-6 py-3 border-r border-border bg-[#0D0D0D] text-textMain font-mono text-xs flex items-center gap-2">
                             <div className="w-2 h-2 bg-accent rounded-full"></div>
                             {activeSnippet.filename}
                        </div>
                    </div>

                    {/* Editor Area */}
                    <div className="flex-grow p-4 md:p-8 overflow-x-auto relative font-mono text-sm leading-relaxed scrollbar-thin scrollbar-thumb-border scrollbar-track-transparent">
                         {/* Description Header */}
                         <div className="mb-6 pb-6 border-b border-white/10 text-textMuted">
                             <span className="text-accent">// </span>
                             {activeSnippet.description}
                         </div>

                        <pre className="text-gray-300">
                            <code>
{activeSnippet.code.split('\n').map((line, i) => (
    <div key={i} className="table-row">
        <span className="table-cell text-right pr-6 select-none opacity-30 text-xs w-8 border-r border-white/10 mr-4">{i + 1}</span>
        <span className="table-cell pl-4 whitespace-pre">{line}</span>
    </div>
))}
                            </code>
                        </pre>
                    </div>

                    {/* Status Bar */}
                    <div className="border-t border-border bg-surface/5 px-4 py-2 flex justify-between font-mono text-[10px] text-textMuted uppercase tracking-widest">
                        <div className="flex gap-4">
                            <span>Ln {activeSnippet.code.split('\n').length}, Col 0</span>
                            <span className="hidden md:inline">UTF-8</span>
                            <span>{activeSnippet.language.toUpperCase()}</span>
                        </div>
                        <div className="flex items-center gap-2">
                             <Terminal size={10} />
                             Read Only
                        </div>
                    </div>
                </div>
             </div>
        </div>
      </Section>
    </div>
  );
};