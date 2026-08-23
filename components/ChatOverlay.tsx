import React, { useState, useEffect, useRef } from 'react';
import { X, Terminal as TerminalIcon, Send } from 'lucide-react';
import { createChatSession, hasGeminiKey } from '../utils/gemini';
import { localAnswer } from '../utils/profileBrain';
import { GenerateContentResponse } from '@google/genai';

interface ChatOverlayProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ChatOverlay: React.FC<ChatOverlayProps> = ({ isOpen, onClose }) => {
  const [history, setHistory] = useState<{type: 'system' | 'user' | 'ai', content: string}[]>([
    { type: 'system', content: 'INITIALIZING UPLINK...' },
    { type: 'system', content: 'CONNECTION ESTABLISHED.' },
    { type: 'ai', content: 'Welcome to the Rajeet Nair Interface Terminal (v2.4.0).' },
    { type: 'ai', content: 'Type "help" for commands or ask a question about my work.' }
  ]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const chatSessionRef = useRef<any>(null);

  // Initialize Chat Session only when a real key exists
  useEffect(() => {
    if (hasGeminiKey() && !chatSessionRef.current) {
        try {
            chatSessionRef.current = createChatSession();
        } catch {
            chatSessionRef.current = null;
        }
    }
  }, []);

  useEffect(() => {
    if (isOpen) {
        setTimeout(() => inputRef.current?.focus(), 100);
    }
  }, [isOpen]);

  useEffect(() => {
    scrollRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [history, isOpen, isTyping]);

  const handleCommand = async () => {
    const cmd = input.trim();
    if (!cmd) return;

    setHistory(prev => [...prev, { type: 'user', content: cmd }]);
    setInput('');
    setIsTyping(true);

    // Client-side commands
    const lowerCmd = cmd.toLowerCase();
    if (lowerCmd === 'clear') {
        setHistory([]);
        setIsTyping(false);
        return;
    } else if (lowerCmd === 'exit') {
        onClose();
        setIsTyping(false);
        return;
    } else if (lowerCmd === 'quick') {
         window.location.hash = '#/overview';
         setHistory(prev => [...prev, { type: 'system', content: 'Navigating to Dashboard...' }]);
         setIsTyping(false);
         return;
    } else if (lowerCmd === 'help') {
        const helpText = `AVAILABLE COMMANDS:
  - clear       : Clear terminal history
  - exit        : Close terminal session
  - quick       : Go to Quick View
  
  OR simply ask questions like:
  - "What is your tech stack?"
  - "Tell me about the OCR project"
  - "How can I contact you?"`;
        setHistory(prev => [...prev, { type: 'ai', content: helpText }]);
        setIsTyping(false);
        return;
    }

    // Gemini API Call (only when a real key exists), else local tiny-LM
    if (!hasGeminiKey() || !chatSessionRef.current) {
        const { text, confidence } = localAnswer(cmd);
        setHistory(prev => [...prev, { type: 'system', content: `LOCAL_PROFILE_LM · CONF ${(confidence * 100).toFixed(0)}%` }]);
        setHistory(prev => [...prev, { type: 'ai', content: text }]);
        setIsTyping(false);
        return;
    }

    try {
        const result = await chatSessionRef.current.sendMessageStream({ message: cmd });
        
        let fullText = '';
        setHistory(prev => [...prev, { type: 'ai', content: '' }]); // Placeholder

        for await (const chunk of result) {
            const c = chunk as GenerateContentResponse;
            const text = c.text || '';
            fullText += text;
            
            // Update last message with streaming content
            setHistory(prev => {
                const newHistory = [...prev];
                newHistory[newHistory.length - 1].content = fullText;
                return newHistory;
            });
        }
    } catch (error) {
        setHistory(prev => [...prev, { type: 'system', content: 'ERROR: UPLINK_TIMEOUT. Please check network or try again.' }]);
    } finally {
        setIsTyping(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 sm:inset-auto sm:bottom-24 sm:right-8 w-full sm:w-[450px] h-full sm:h-[600px] z-[100] flex flex-col font-mono text-sm animate-fade-in shadow-[0_0_50px_rgba(0,0,0,0.8)]">
        {/* Terminal Container */}
        <div className="flex-grow bg-[#050505]/95 backdrop-blur-md border border-border sm:border-accent/30 flex flex-col relative overflow-hidden sm:rounded-lg">
            
            {/* Scanline & Glow Effects */}
            <div className="absolute inset-0 bg-scanline opacity-5 pointer-events-none z-10"></div>
            <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-accent/50 to-transparent z-20"></div>

            {/* Header */}
            <div className="bg-surface/80 p-3 flex justify-between items-center border-b border-white/10 shrink-0 relative z-30">
                <div className="flex items-center gap-2 text-accent px-1">
                    <TerminalIcon size={14} />
                    <span className="text-xs uppercase tracking-widest font-bold">Terminal_Uplink</span>
                </div>
                <button onClick={onClose} className="hover:text-accent text-textMuted transition-colors p-1">
                    <X size={16}/>
                </button>
            </div>

            {/* Output Area */}
            <div className="flex-grow p-4 overflow-y-auto no-scrollbar relative z-20" onClick={() => inputRef.current?.focus()}>
                {history.map((entry, idx) => (
                    <div key={idx} className={`mb-3 leading-relaxed break-words ${entry.type === 'user' ? 'text-white' : entry.type === 'system' ? 'text-textMuted text-xs' : 'text-accent'}`}>
                        {entry.type === 'user' ? (
                            <span className="flex gap-2">
                                <span className="text-accent/50 select-none">$</span>
                                <span>{entry.content}</span>
                            </span>
                        ) : entry.type === 'system' ? (
                            <span className="uppercase tracking-wider">&gt;&gt; {entry.content}</span>
                        ) : (
                            <span className="whitespace-pre-wrap">{entry.content}</span>
                        )}
                    </div>
                ))}
                {isTyping && (
                    <div className="flex gap-1 items-center text-accent/50 text-xs mt-2">
                        <span className="w-1.5 h-1.5 bg-accent animate-pulse"></span>
                        PROCESSING
                    </div>
                )}
                <div ref={scrollRef}></div>
            </div>

            {/* Input Area */}
            <div className="p-3 bg-surface/30 border-t border-white/10 shrink-0 relative z-30">
                <div className="flex items-center gap-2">
                    <span className="text-accent font-bold animate-pulse">&gt;</span>
                    <input 
                        ref={inputRef}
                        type="text" 
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                        onKeyDown={(e) => e.key === 'Enter' && handleCommand()}
                        className="flex-grow bg-transparent border-none outline-none text-white font-mono placeholder-white/20"
                        placeholder="Enter command..."
                        autoComplete="off"
                    />
                    <button onClick={handleCommand} className="text-accent hover:text-white transition-colors">
                        <Send size={14} />
                    </button>
                </div>
            </div>
        </div>
    </div>
  );
};