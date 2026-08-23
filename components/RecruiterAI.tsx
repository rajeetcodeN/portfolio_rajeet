import React, { useState } from 'react';
import { Section } from './Section';
import { Bot, Sparkles, AlertCircle, CheckCircle } from 'lucide-react';
import { analyzeJobMatch } from '../utils/gemini';

export const RecruiterAI: React.FC = () => {
  const [jd, setJd] = useState('');
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [result, setResult] = useState<any>(null);

  const handleAnalyze = async () => {
    if (!jd.trim()) return;
    setIsAnalyzing(true);
    setResult(null);

    const analysis = await analyzeJobMatch(jd);
    setResult(analysis);
    setIsAnalyzing(false);
  };

  return (
    <Section title="AI_Recruiter_Agent" className="bg-background">
      <div className="p-6 md:p-12">
        <div className="grid lg:grid-cols-2 gap-12 items-start">
            
            {/* Input Section */}
            <div>
                <div className="flex items-center gap-3 mb-6">
                    <div className="p-2 bg-accent/10 border border-accent/20 rounded-md">
                        <Bot className="text-accent" size={24} />
                    </div>
                    <div>
                        <h3 className="text-xl font-display font-bold text-textMain uppercase">Candidate Fit Analyzer</h3>
                        <p className="text-xs font-mono text-textMuted uppercase tracking-wider">Powered by Gemini Pro</p>
                    </div>
                </div>
                
                <p className="text-textMuted mb-6 text-sm">
                    Paste a Job Description (JD) below. This Agent will analyze Rajeet's portfolio data against your requirements to determine fit percentage and highlight key matches.
                </p>

                <div className="relative group">
                    <div className="absolute inset-0 bg-gradient-to-r from-accent/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity rounded-lg pointer-events-none"></div>
                    <textarea 
                        className="w-full h-64 bg-surface/30 border border-border p-4 text-sm font-mono text-textMain focus:border-accent focus:outline-none resize-none rounded-sm transition-colors"
                        placeholder="PASTE JOB DESCRIPTION HERE..."
                        value={jd}
                        onChange={(e) => setJd(e.target.value)}
                    ></textarea>
                </div>

                <button 
                    onClick={handleAnalyze}
                    disabled={isAnalyzing || !jd}
                    className="mt-4 w-full py-4 bg-accent text-background font-display font-bold text-xl uppercase hover:bg-white transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                >
                    {isAnalyzing ? (
                        <>
                            <Sparkles className="animate-spin" size={20} /> Analyzing Vector Matches...
                        </>
                    ) : (
                        "Analyze Fit Protocol"
                    )}
                </button>
            </div>

            {/* Output Section */}
            <div className="bg-surface/5 border border-border min-h-[400px] relative overflow-hidden flex flex-col">
                <div className="absolute top-0 right-0 w-32 h-32 bg-stripe-pattern opacity-10 pointer-events-none"></div>
                
                {!result && !isAnalyzing && (
                    <div className="flex-grow flex flex-col items-center justify-center text-textMuted opacity-50 p-8 text-center">
                        <Bot size={48} className="mb-4" />
                        <span className="font-mono text-xs uppercase tracking-widest">Awaiting Input Data...</span>
                    </div>
                )}

                {isAnalyzing && (
                    <div className="flex-grow flex flex-col items-center justify-center p-8">
                        <div className="w-16 h-16 border-4 border-border border-t-accent rounded-full animate-spin mb-6"></div>
                        <div className="font-mono text-xs text-accent uppercase tracking-widest animate-pulse">Processing Semantic Match...</div>
                    </div>
                )}

                {result && (
                    <div className="p-8 animate-fade-in relative z-10">
                        <div className="flex items-center justify-between mb-8 border-b border-border pb-6">
                            <span className="font-mono text-xs text-textMuted uppercase tracking-widest">Match Probability</span>
                            <div className="text-6xl font-display font-bold text-accent">
                                {result.matchPercentage}%
                            </div>
                        </div>

                        <div className="space-y-6">
                            <div>
                                <h4 className="font-mono text-xs text-textMain uppercase tracking-widest mb-3 flex items-center gap-2">
                                    <CheckCircle size={14} className="text-green-500" /> Key Alignments
                                </h4>
                                <ul className="space-y-2">
                                    {result.keyMatches?.map((m: string, i: number) => (
                                        <li key={i} className="text-sm text-textMuted pl-4 border-l border-green-500/30">
                                            {m}
                                        </li>
                                    ))}
                                </ul>
                            </div>

                            {result.missingSkills && result.missingSkills.length > 0 && (
                                <div>
                                    <h4 className="font-mono text-xs text-textMain uppercase tracking-widest mb-3 flex items-center gap-2">
                                        <AlertCircle size={14} className="text-yellow-500" /> Potential Gaps
                                    </h4>
                                    <ul className="space-y-2">
                                        {result.missingSkills.map((m: string, i: number) => (
                                            <li key={i} className="text-sm text-textMuted pl-4 border-l border-yellow-500/30">
                                                {m}
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            )}

                            <div className="bg-surface/20 p-4 border-l-2 border-accent mt-6">
                                <span className="font-mono text-[10px] text-accent uppercase tracking-widest block mb-1">System Summary</span>
                                <p className="text-sm text-white leading-relaxed">
                                    {result.summary}
                                </p>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
      </div>
    </Section>
  );
};