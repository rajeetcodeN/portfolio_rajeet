import React, { useState, useEffect, useRef } from 'react';
import { X, Terminal as TerminalIcon } from 'lucide-react';
import { Link } from 'react-router-dom';
import { createChatSession } from '../utils/gemini';
import { GenerateContentResponse } from '@google/genai';

export const Chat: React.FC = () => {
  const [history, setHistory] = useState<{type: 'system' | 'user' | 'ai', content: string}[]>([
    { type: 'system', content: 'INITIALIZING UPLINK...' },
    { type: 'system', content: 'CONNECTION ESTABLISHED.' },
    { type: 'ai', content: 'Welcome to the Rajeet Nair Interface Terminal (v2.4.0).' },
    { type: 'ai', content: 'Type "help" for available commands or simply ask a question.' }
  ]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const chatSessionRef = useRef<any>(null);

  // Initialize session
  useEffect(() => {
    if (!chatSessionRef.current) {
        chatSessionRef.current = createChatSession();
    }
  }, []);

  // Auto-scroll to bottom
  useEffect(() => {
    scrollRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [history, isTyping]);

  // Focus input on mount
  useEffect(() => {
    setTimeout(() => {
        inputRef.current?.focus();
    }, 100);
  }, []);

  const handleCommand = async (cmd: string) => {
    const cleanCmd = cmd.trim();
    if (!cleanCmd) return;

    setHistory(prev => [...prev, { type: 'user', content: cleanCmd }]);
    setInput('');
    setIsTyping(true);

    const lowerCmd = cleanCmd.toLowerCase();

    // Client Logic
    if (lowerCmd === 'clear') {
        setHistory([]);
        setIsTyping(false);
        return;
    } else if (lowerCmd === 'exit') {
        window.location.hash = '/';
        return;
    } else if (lowerCmd === 'help') {
        setHistory(prev => [...prev, { type: 'ai', content: 'Try asking about:\n- Experience\n- Projects\n- Automations\n- Contact Info' }]);
        setIsTyping(false);
        return;
    }

    // AI Logic
    try {
        const result = await chatSessionRef.current.sendMessageStream({ message: cleanCmd });
        
        let fullText = '';
        setHistory(prev => [...prev, { type: 'ai', content: '' }]);

        for await (const chunk of result) {
            const c = chunk as GenerateContentResponse;
            const text = c.text || '';
            fullText += text;
            
            setHistory(prev => {
                const newHistory = [...prev];
                newHistory[newHistory.length - 1].content = fullText;
                return newHistory;
            });
        }
    } catch (error) {
        setHistory(prev => [...prev, { type: 'system', content: 'ERROR: NETWORK_FAILURE' }]);
    } finally {
        setIsTyping(false);
    }
  };

  return (
    <div className="fixed inset-0 z-[60] text-[#EAEAEA] font-mono flex flex-col p-4 md:p-8 overflow-hidden selection:bg-accent selection:text-black touch-manipulation">
      {/* CRT Scanline Effect */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.25)_50%),linear-gradient(90deg,rgba(255,0,0,0.06),rgba(0,255,0,0.02),rgba(0,0,255,0.06))] z-10 pointer-events-none bg-[length:100%_2px,3px_100%] opacity-20 transform-gpu"></div>
      
      {/* Header */}
      <div className="flex justify-between items-center mb-4 border-b border-white/10 pb-2 z-20 shrink-0">
        <div className="flex items-center gap-2 text-accent">
          <TerminalIcon size={16} />
          <span className="text-xs tracking-widest uppercase">Bash // Remote_Session</span>
        </div>
        <Link to="/" className="text-textMuted hover:text-accent transition-colors p-2 -mr-2">
          <X size={20} />
        </Link>
      </div>

      {/* Terminal Output */}
      <div className="flex-grow overflow-y-auto no-scrollbar space-y-2 mb-4 relative z-20 font-mono text-sm md:text-base overscroll-y-contain" onClick={() => inputRef.current?.focus()}>
        {history.map((entry, idx) => (
          <div key={idx} className={`${entry.type === 'system' ? 'text-accentDim text-xs mt-4 mb-2' : entry.type === 'user' ? 'text-textMain mt-4' : 'text-accent/90'} whitespace-pre-wrap leading-relaxed`}>
            {entry.type === 'user' ? (
              <span className="flex gap-2">
                <span className="text-accent select-none">visitor@nair:~$</span>
                <span>{entry.content}</span>
              </span>
            ) : entry.type === 'system' ? (
               <span>{`>> ${entry.content}`}</span>
            ) : (
              <span className="block">{entry.content}</span>
            )}
          </div>
        ))}
        {isTyping && (
           <div className="text-accentDim text-xs animate-pulse mt-2">_ Processing...</div>
        )}
        <div ref={scrollRef}></div>
      </div>

      {/* Input Line */}
      <div className="flex items-center gap-2 relative z-20 border-t border-white/10 pt-4 shrink-0">
        <span className="text-accent select-none font-bold text-base md:text-lg">visitor@nair:~$</span>
        <input 
          ref={inputRef}
          type="text" 
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === 'Enter') handleCommand(input);
          }}
          className="flex-grow bg-transparent border-none outline-none text-textMain caret-accent font-mono text-base md:text-lg"
          autoFocus
          spellCheck={false}
          autoComplete="off"
        />
      </div>
    </div>
  );
};