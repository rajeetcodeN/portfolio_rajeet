import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { BrainCircuit, Send, Cpu, Zap } from 'lucide-react';
import { createChatSession, hasGeminiKey } from '../utils/gemini';
import { localAnswer } from '../utils/profileBrain';

const EDGE_URL = import.meta.env.VITE_LLM_API_URL || '';

type Entry = { type: 'system' | 'user' | 'ai' | 'meta'; content: string };

const askEdge = async (message: string): Promise<string> => {
  const res = await fetch(`${EDGE_URL}/chat`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ message }),
  });
  if (!res.ok) throw new Error(`edge ${res.status}`);
  const data = await res.json();
  return data.reply as string;
};

const SUGGESTIONS = [
  "What's your tech stack?",
  'Tell me about the RFQ pricing engine',
  'Show your n8n automation achievements',
  'Who are you?',
  'How can I contact you?',
];

export const AIScreen: React.FC = () => {
  const [history, setHistory] = useState<Entry[]>([
    { type: 'system', content: 'NEURAL UPLINK v3.0 — BOOT SEQUENCE COMPLETE.' },
    {
      type: 'system',
      content: EDGE_URL
        ? 'ENGINE CHAIN: EDGE-LLM (self-hosted tiny model) → GEMINI-FLASH → LOCAL_PROFILE_LM.'
        : hasGeminiKey()
        ? 'ENGINE: GEMINI-FLASH (remote inference) · FALLBACK: LOCAL_PROFILE_LM.'
        : 'ENGINE: LOCAL_PROFILE_LM (on-device retrieval) — no API key detected.',
    },
    {
      type: 'ai',
      content:
        'I am Rajeet Nair\'s portfolio intelligence. I hold his full profile —\nprojects, skills, experience, automation work.\n\nAsk me anything. Type "help" for examples.',
    },
  ]);
  const [input, setInput] = useState('');
  const [busy, setBusy] = useState(false);
  const [engine, setEngine] = useState<string>(
    hasGeminiKey() ? 'GEMINI-FLASH' : 'LOCAL_PROFILE_LM'
  );

  const scrollRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const sessionRef = useRef<any>(null);

  useEffect(() => {
    if (hasGeminiKey()) {
      try {
        sessionRef.current = createChatSession();
      } catch {
        setEngine('LOCAL_PROFILE_LM');
      }
    }
  }, []);

  useEffect(() => {
    scrollRef.current?.scrollIntoView({ behavior: 'smooth', block: 'end' });
  }, [history, busy]);

  const pushLocalWithTyping = (text: string) => {
    setHistory((prev) => [...prev, { type: 'ai', content: '' }]);
    let i = 0;
    const speed = Math.max(4, Math.floor(24 / Math.max(1, text.length / 400)));
    const iv = setInterval(() => {
      i += speed;
      setHistory((prev) => {
        const next = [...prev];
        next[next.length - 1] = { type: 'ai', content: text.slice(0, i) };
        return next;
      });
      if (i >= text.length) clearInterval(iv);
    }, 12);
  };

  const runCommand = async (raw: string) => {
    const cmd = raw.trim();
    if (!cmd || busy) return;
    setInput('');
    setBusy(true);

    const lower = cmd.toLowerCase();
    if (lower === 'clear') {
      setHistory([]);
      setBusy(false);
      return;
    }

    setHistory((prev) => [...prev, { type: 'user', content: cmd }]);

    // Priority 1: self-hosted edge LLM (tiny model on Render)
    if (EDGE_URL) {
      try {
        setHistory((prev) => [...prev, { type: 'meta', content: 'ROUTED → EDGE-LLM (self-hosted · sub-1GB)' }]);
        const reply = await askEdge(cmd);
        pushLocalWithTyping(reply);
        setTimeout(() => setBusy(false), reply.length * 4);
        return;
      } catch {
        setHistory((prev) => [
          ...prev,
          { type: 'meta', content: 'EDGE NODE COLD/BUSY → FALLING BACK' },
        ]);
      }
    }

    if (hasGeminiKey() && sessionRef.current) {
      try {
        setHistory((prev) => [...prev, { type: 'meta', content: `ROUTED → ${engine}` }]);
        const result = await sessionRef.current.sendMessageStream({ message: cmd });
        let fullText = '';
        setHistory((prev) => [...prev, { type: 'ai', content: '' }]);
        for await (const chunk of result) {
          fullText += chunk.text || '';
          setHistory((prev) => {
            const next = [...prev];
            next[next.length - 1].content = fullText;
            return next;
          });
        }
        setBusy(false);
        return;
      } catch {
        setEngine('LOCAL_PROFILE_LM');
        setHistory((prev) => [
          ...prev,
          { type: 'meta', content: 'REMOTE UPLINK FAILED → SWITCHING TO ON-DEVICE ENGINE' },
        ]);
      }
    }

    // Local tiny-LM path
    const { text, confidence } = localAnswer(cmd);
    setHistory((prev) => [...prev, { type: 'meta', content: `LOCAL_PROFILE_LM · CONF ${(confidence * 100).toFixed(0)}%` }]);
    pushLocalWithTyping(text);
    setTimeout(() => setBusy(false), text.length * 6);
  };

  const handleCommand = () => runCommand(input);

  return (
    <div className="min-h-screen pt-[76px] flex justify-center">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-4xl px-4 md:px-6 py-10"
      >
        {/* Header */}
        <div className="flex items-center gap-4 mb-6 flex-wrap">
          <div className="w-10 h-10 border border-accent neon-border flex items-center justify-center text-accent shrink-0">
            <BrainCircuit size={20} />
          </div>
          <div>
            <h1 className="text-3xl md:text-5xl font-display font-bold uppercase leading-none">
              AI <span className="text-accent">Uplink</span>
            </h1>
            <div className="font-mono text-[10px] text-textMuted tracking-widest mt-1 flex items-center gap-2 flex-wrap">
              <span className="flex items-center gap-1"><Cpu size={10} className="text-accent" /> ACTIVE ENGINE:</span>
              <span className="text-accent border border-accent/30 px-1.5">{engine}</span>
              {!hasGeminiKey() && (
                <span className="flex items-center gap-1 text-textMuted/60">
                  <Zap size={9} /> zero-key · on-device retrieval
                </span>
              )}
            </div>
          </div>
        </div>

        {/* Terminal Window */}
        <div className="border border-border bg-surface/40 corner-brackets relative overflow-hidden">
          {/* Header bar */}
          <div className="bg-background/70 px-4 py-3 border-b border-border flex items-center justify-between relative z-20">
            <span className="font-mono text-xs text-accent uppercase tracking-widest">// profile_query_terminal</span>
            <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></span>
          </div>

          {/* Output */}
          <div
            className="h-[55vh] overflow-y-auto p-4 md:p-6 font-mono text-sm cursor-text"
            onClick={() => inputRef.current?.focus()}
          >
            {history.map((entry, idx) =>
              entry.type === 'user' ? (
                <div key={idx} className="mb-3 text-white break-words">
                  <span className="text-accent select-none">$ </span>
                  {entry.content}
                </div>
              ) : entry.type === 'meta' ? (
                <div key={idx} className="mb-3 text-[10px] text-textMuted/60 uppercase tracking-widest">
                  &gt;&gt; {entry.content}
                </div>
              ) : entry.type === 'system' ? (
                <div key={idx} className="mb-3 text-xs text-textMuted/70 uppercase tracking-wider">
                  &gt;&gt; {entry.content}
                </div>
              ) : (
                <div key={idx} className="mb-4 whitespace-pre-wrap text-accent/90 leading-relaxed break-words">
                  {entry.content}
                  {idx === history.length - 1 && busy && <span className="inline-block w-2 h-4 bg-accent ml-1 animate-pulse align-middle"></span>}
                </div>
              )
            )}
            {busy && history[history.length - 1]?.type !== 'ai' && (
              <div className="flex items-center gap-2 text-accent/60 text-xs animate-pulse">PROCESSING QUERY...</div>
            )}
            <div ref={scrollRef} />
          </div>

          {/* Suggestions */}
          <div className="px-4 pb-3 flex flex-wrap gap-2 border-t border-border/50 pt-3 relative z-20">
            {SUGGESTIONS.map((s) => (
              <button
                key={s}
                onMouseDown={(e) => {
                  e.preventDefault();
                  runCommand(s);
                }}
                className="px-2.5 py-1 border border-border bg-background/50 font-mono text-[10px] text-textMuted hover:text-accent hover:border-accent/50 transition-colors"
              >
                {s}
              </button>
            ))}
          </div>

          {/* Input */}
          <div className="border-t border-border p-4 flex items-center gap-3 bg-background/70 relative z-20">
            <span className="text-accent font-bold animate-pulse">&gt;</span>
            <input
              ref={inputRef}
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleCommand()}
              className="flex-grow bg-transparent outline-none text-white font-mono placeholder-white/20"
              placeholder="query the profile..."
              autoComplete="off"
            />
            <button onClick={handleCommand} disabled={busy} className="text-accent hover:text-white transition-colors disabled:opacity-30">
              <Send size={16} />
            </button>
          </div>
        </div>

        <p className="mt-4 font-mono text-[10px] text-textMuted/60 text-center">
          Hybrid architecture: Gemini streaming when a key is present · automatic fallback to an on-device retrieval engine.
        </p>
      </motion.div>
    </div>
  );
};
