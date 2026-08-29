import React, { useState } from 'react';
import { Section } from './Section';
import { Bot, Sparkles, Send, Terminal, CheckCircle2, CornerDownLeft } from 'lucide-react';
import { queryAIAgent } from '../utils/gemini';

export const RecruiterAI: React.FC = () => {
  const [prompt, setPrompt] = useState('');
  const [isExecuting, setIsExecuting] = useState(false);
  const [response, setResponse] = useState<string | null>(null);

  const quickPrompts = [
    "Explain the RAG hybrid search pipeline",
    "How does the Blueprint Vision OCR work?",
    "Summarize n8n automation workflows",
    "What is Rajeet's core tech stack?"
  ];

  const handleExecute = async (queryToRun?: string) => {
    const textToSubmit = (queryToRun || prompt).trim();
    if (!textToSubmit) return;
    
    if (queryToRun) setPrompt(queryToRun);
    setIsExecuting(true);
    setResponse(null);

    const result = await queryAIAgent(textToSubmit);
    setResponse(result);
    setIsExecuting(false);
  };

  return (
    <Section title="AI_Agent" className="bg-black">
      <div className="p-6 md:p-10">
        <div className="grid lg:grid-cols-12 gap-8 items-start">
            
            {/* Input & Control Panel */}
            <div className="lg:col-span-6 space-y-4">
                <div className="flex items-center justify-between border-b border-border/80 pb-3">
                  <div className="flex items-center gap-3">
                    <div className="w-9 h-9 bg-accent/10 border border-accent/30 flex items-center justify-center text-accent chamfer-card-tr">
                      <Bot size={20} />
                    </div>
                    <div>
                      <h3 className="text-xl font-display font-bold text-white uppercase leading-none">
                        Interactive AI Agent
                      </h3>
                      <p className="text-xs font-mono text-textMuted uppercase tracking-wider mt-1">
                        Inference Sandbox // Gemini Flash
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-10 h-2 text-accent/40 tech-barcode hidden sm:block"></div>
                    <span className="text-[10px] font-mono text-accent border border-accent/30 px-1.5 py-0.5 bg-accent/5">
                      LIVE
                    </span>
                  </div>
                </div>

                <p className="text-textMuted text-xs sm:text-sm leading-relaxed">
                  Direct inference endpoint. Query technical architecture, examine pipeline logic, or test agentic responses in real-time.
                </p>

                {/* Quick Prompts */}
                <div>
                  <div className="font-mono text-[10px] text-textMuted uppercase tracking-widest mb-2 flex items-center gap-1.5">
                    <span>✦</span> Quick Prompts
                  </div>
                  <div className="flex flex-wrap gap-1.5">
                    {quickPrompts.map((qp, idx) => (
                      <button
                        key={idx}
                        onClick={() => handleExecute(qp)}
                        disabled={isExecuting}
                        className="text-left text-[11px] font-mono text-textMuted hover:text-accent hover:border-accent/40 bg-[#0a0a0a] border border-border px-2.5 py-1 transition-colors cursor-pointer chamfer-card-tr disabled:opacity-50"
                      >
                        » {qp}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Prompt Textarea */}
                <div className="relative">
                    <textarea 
                        className="w-full h-36 bg-[#0a0a0a] border border-border p-3.5 text-xs sm:text-sm font-mono text-white focus:border-accent focus:outline-none resize-none transition-colors rounded-none placeholder:text-textMuted/50"
                        placeholder="ENTER INSTRUCTION OR QUERY FOR AI AGENT..."
                        value={prompt}
                        onChange={(e) => setPrompt(e.target.value)}
                        onKeyDown={(e) => {
                          if (e.key === 'Enter' && (e.metaKey || e.ctrlKey)) {
                            handleExecute();
                          }
                        }}
                    ></textarea>
                    <div className="absolute bottom-2 right-2 font-mono text-[9px] text-textMuted">
                      Ctrl + Enter to run
                    </div>
                </div>

                <button 
                    onClick={() => handleExecute()}
                    disabled={isExecuting || !prompt.trim()}
                    className="w-full py-3 px-6 bg-accent text-black font-display font-bold text-base uppercase hover:bg-white transition-colors disabled:opacity-40 disabled:cursor-not-allowed flex items-center justify-center gap-2 chamfer-card-tr shadow-[0_0_15px_rgba(76,169,255,0.25)]"
                >
                    {isExecuting ? (
                        <>
                            <Sparkles className="animate-spin" size={16} /> Executing Agent Pipeline...
                        </>
                    ) : (
                        <>
                            <Send size={15} /> Execute Agent Instruction ↗
                        </>
                    )}
                </button>
            </div>

            {/* Output Terminal Console */}
            <div className="lg:col-span-6 bg-black border border-border min-h-[380px] flex flex-col relative overflow-hidden chamfer-card-tr">
                {/* Console Top Bar */}
                <div className="p-3 bg-[#0a0a0a] border-b border-border flex items-center justify-between font-mono text-[10px]">
                  <div className="flex items-center gap-2">
                    <Terminal size={13} className="text-accent" />
                    <span className="text-white font-bold uppercase">AGENT_CONSOLE // OUTPUT</span>
                  </div>
                  <div className="flex items-center gap-2 text-textMuted">
                    <span>[ ⌖ ]</span>
                    <span className="text-green-400">READY</span>
                  </div>
                </div>

                {/* State: Awaiting Input */}
                {!response && !isExecuting && (
                    <div className="flex-grow flex flex-col items-center justify-center text-textMuted p-8 text-center opacity-40">
                        <Bot size={40} className="mb-3 text-accent" />
                        <span className="font-mono text-xs uppercase tracking-widest">Awaiting Prompt Instruction...</span>
                        <p className="text-[11px] font-mono text-textMuted mt-1">Select a quick prompt or type your query</p>
                    </div>
                )}

                {/* State: Executing */}
                {isExecuting && (
                    <div className="flex-grow flex flex-col items-center justify-center p-8">
                        <div className="w-12 h-12 border-2 border-border border-t-accent rounded-full animate-spin mb-4"></div>
                        <div className="font-mono text-xs text-accent uppercase tracking-widest animate-pulse flex items-center gap-2">
                          <span>[ + ] INGESTING &amp; SYNTHESIZING...</span>
                        </div>
                    </div>
                )}

                {/* State: Resolved Response */}
                {response && (
                    <div className="p-5 sm:p-6 flex-grow flex flex-col justify-between font-mono">
                        <div>
                          <div className="flex items-center justify-between mb-4 border-b border-border/60 pb-2">
                            <span className="text-[10px] text-accent uppercase tracking-widest flex items-center gap-1.5">
                              <CheckCircle2 size={12} className="text-green-400" />
                              <span>INFERENCE_COMPLETE</span>
                            </span>
                            <span className="text-[9px] text-textMuted">LATENCY: ~160MS</span>
                          </div>

                          <div className="text-xs sm:text-sm text-textMain leading-relaxed whitespace-pre-wrap font-mono">
                            {response}
                          </div>
                        </div>

                        <div className="mt-6 pt-3 border-t border-border/40 flex items-center justify-between text-[10px] text-textMuted">
                          <span>STATUS: 200 OK</span>
                          <span>SYS.ID // RN-AGENT-01</span>
                        </div>
                    </div>
                )}
            </div>
        </div>
      </div>
    </Section>
  );
};