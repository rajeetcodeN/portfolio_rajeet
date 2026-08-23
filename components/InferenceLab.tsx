import React, { useState, useEffect, useMemo } from 'react';
import { motion } from 'framer-motion';
import { Thermometer, Cpu, BrainCircuit, Zap, ChevronRight } from 'lucide-react';

const TOKEN_CANDIDATES: [string, number][] = [
  ["model", 4.2],
  ["agent", 3.9],
  ["def", 3.6],
  ["return", 3.2],
  ["import", 2.8],
  ["class", 2.4],
];

function softmax(logits: number[], temp: number): number[] {
  const t = Math.max(temp, 0.05);
  const scaled = logits.map((l) => l / t);
  const max = Math.max(...scaled);
  const exps = scaled.map((l) => Math.exp(l - max));
  const sum = exps.reduce((a, b) => a + b, 0);
  return exps.map((e) => e / sum);
}

function entropyBits(probs: number[]): number {
  return -probs.reduce((acc, p) => acc + (p > 0 ? p * Math.log2(p) : 0), 0);
}

const STAGES = [
  { name: "TOKENIZE", detail: "prompt → token ids", ms: 700 },
  { name: "PREFILL", detail: "parallel KV cache fill", ms: 1000 },
  { name: "DECODE", detail: "autoregressive loop", ms: 1600 },
  { name: "STREAM", detail: "detokenize → client", ms: 800 },
];

const TemperatureCard: React.FC = () => {
  const [temp, setTemp] = useState(0.7);

  const probs = useMemo(
    () => softmax(TOKEN_CANDIDATES.map(([, l]) => l), temp),
    [temp]
  );
  const entropy = useMemo(() => entropyBits(probs), [probs]);
  const topIdx = probs.indexOf(Math.max(...probs));

  return (
    <div className="bg-surface/30 border border-border corner-brackets p-6 flex flex-col">
      <div className="flex items-center justify-between mb-1">
        <h3 className="font-mono text-xs text-accent tracking-widest uppercase flex items-center gap-2">
          <Thermometer size={14} />
          // temperature.sampling
        </h3>
        <span className="font-mono text-[10px] text-textMuted">softmax(z/T)</span>
      </div>
      <p className="text-xs text-textMuted mb-5">Next-token distribution over a fixed logit vector.</p>

      <div className="flex items-baseline justify-between mb-3">
        <span className="font-display text-4xl font-bold text-white">
          {temp.toFixed(2)}
        </span>
        <div className="text-right font-mono text-[10px] text-textMuted leading-relaxed">
          <div>entropy: <span className="text-accent">{entropy.toFixed(2)}</span> bits</div>
          <div>argmax: <span className="text-accent">&quot;{TOKEN_CANDIDATES[topIdx][0]}&quot;</span></div>
        </div>
      </div>

      <input
        type="range"
        min={0.05}
        max={2}
        step={0.05}
        value={temp}
        onChange={(e) => setTemp(parseFloat(e.target.value))}
        className="w-full h-1 mb-1 cursor-pointer"
        style={{ accentColor: 'var(--color-accent)' }}
        aria-label="Sampling temperature"
      />
      <div className="flex justify-between font-mono text-[9px] text-textMuted uppercase mb-5">
        <span>0.05 · deterministic</span>
        <span>2.0 · chaos</span>
      </div>

      <div className="space-y-2 flex-grow">
        {TOKEN_CANDIDATES.map(([token], i) => (
          <div key={token} className="flex items-center gap-2">
            <span className={`font-mono text-xs w-16 shrink-0 ${i === topIdx ? 'text-accent' : 'text-textMuted'}`}>
              {token}
            </span>
            <div className="flex-grow h-4 bg-background/60 overflow-hidden">
              <motion.div
                className={`h-full ${i === topIdx ? 'bg-accent' : 'bg-accentDim'}`}
                animate={{ width: `${(probs[i] * 100).toFixed(1)}%` }}
                transition={{ type: 'spring', stiffness: 120, damping: 20 }}
              />
            </div>
            <span className="font-mono text-[10px] text-textMuted w-12 text-right">
              {(probs[i] * 100).toFixed(1)}%
            </span>
          </div>
        ))}
      </div>

      <div className="mt-4 pt-3 border-t border-border/50 font-mono text-[10px] text-textMuted leading-relaxed">
        {temp < 0.3 && "> T→0 · distribution collapses to greedy argmax."}
        {temp >= 0.3 && temp <= 1.1 && "> balanced regime · coherent sampling."}
        {temp > 1.1 && "> high T · flattened logits, creative noise."}
      </div>
    </div>
  );
};

const HarnessCard: React.FC = () => {
  const [stage, setStage] = useState(0);
  const [tokens, setTokens] = useState(0);

  useEffect(() => {
    const t = setTimeout(() => setStage((s) => (s + 1) % STAGES.length), STAGES[stage].ms);
    return () => clearTimeout(t);
  }, [stage]);

  const decoding = stage === 2;

  useEffect(() => {
    if (!decoding) return;
    const iv = setInterval(() => setTokens((n) => n + 1), 90);
    return () => clearInterval(iv);
  }, [decoding]);

  return (
    <div className="bg-surface/30 border border-border corner-brackets p-6 flex flex-col">
      <div className="flex items-center justify-between mb-1">
        <h3 className="font-mono text-xs text-accent tracking-widest uppercase flex items-center gap-2">
          <Cpu size={14} />
          // inference.harness
        </h3>
        <span className={`w-2 h-2 rounded-full ${decoding ? 'bg-accent animate-pulse' : 'bg-accentDim'}`}></span>
      </div>
      <p className="text-xs text-textMuted mb-5">Request lifecycle through the serving stack.</p>

      <div className="space-y-3 mb-5">
        {STAGES.map((s, i) => {
          const active = i === stage;
          const done = i < stage;
          return (
            <div
              key={s.name}
              className={`flex items-center gap-3 p-2.5 border transition-all duration-300 ${
                active
                  ? 'border-accent/50 bg-accent/10 neon-border'
                  : done
                  ? 'border-border bg-surface/40 opacity-70'
                  : 'border-border/40 opacity-40'
              }`}
            >
              <ChevronRight
                size={14}
                className={`${active ? 'text-accent' : 'text-textMuted'} ${active ? 'animate-pulse' : ''}`}
              />
              <div className="flex-grow">
                <div className={`font-mono text-xs tracking-wider ${active ? 'text-accent' : 'text-textMain'}`}>
                  {s.name}
                </div>
                <div className="font-mono text-[9px] text-textMuted">{s.detail}</div>
              </div>
              {active && (
                <motion.div
                  className="flex gap-0.5"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                >
                  {[0, 1, 2].map((d) => (
                    <span
                      key={d}
                      className="w-1 h-1 bg-accent rounded-full animate-pulse"
                      style={{ animationDelay: `${d * 150}ms` }}
                    ></span>
                  ))}
                </motion.div>
              )}
            </div>
          );
        })}
      </div>

      <div className="mt-auto grid grid-cols-2 gap-3">
        <div className="border border-border/50 p-2.5">
          <div className="font-mono text-[9px] text-textMuted uppercase mb-1">TTFT</div>
          <div className="font-display text-xl text-white">42<span className="text-xs text-textMuted ml-1">ms</span></div>
        </div>
        <div className="border border-border/50 p-2.5">
          <div className="font-mono text-[9px] text-textMuted uppercase mb-1">tokens out</div>
          <div className="font-display text-xl text-accent">{tokens}</div>
        </div>
      </div>
    </div>
  );
};

const DistillationCard: React.FC = () => {
  const packets = [0, 1, 2, 3, 4];

  return (
    <div className="bg-surface/30 border border-border corner-brackets p-6 flex flex-col relative overflow-hidden">
      <div className="flex items-center justify-between mb-1">
        <h3 className="font-mono text-xs text-accent tracking-widest uppercase flex items-center gap-2">
          <BrainCircuit size={14} />
          // knowledge.distillation
        </h3>
      </div>
      <p className="text-xs text-textMuted mb-5">Compressing capability from teacher into student.</p>

      <div className="relative h-36 mb-4">
        <div className="absolute inset-x-[15%] top-1/2 -translate-y-1/2 h-px bg-gradient-to-r from-accentDim to-accent"></div>

        {packets.map((p) => (
          <motion.div
            key={p}
            className="absolute top-1/2 -translate-y-1/2 w-2 h-2 bg-accent rounded-full shadow-[0_0_8px_var(--color-accent)]"
            style={{ left: '18%' }}
            animate={{ left: ['18%', '78%'], opacity: [0, 1, 1, 0] }}
            transition={{
              duration: 2.4,
              repeat: Infinity,
              delay: p * 0.48,
              ease: 'linear',
            }}
          />
        ))}

        <div className="absolute left-0 top-1/2 -translate-y-1/2 w-16 h-16 border-2 border-accent/60 rounded-lg bg-surface/80 flex flex-col items-center justify-center animate-flicker">
          <Zap size={16} className="text-accent" />
          <span className="font-mono text-[9px] text-textMuted mt-0.5">70B</span>
        </div>

        <div className="absolute right-0 top-1/2 -translate-y-1/2 w-14 h-14 border-2 border-accent rounded-lg bg-accent/10 flex flex-col items-center justify-center neon-border">
          <BrainCircuit size={16} className="text-accent" />
          <span className="font-mono text-[9px] text-accent mt-0.5">7B</span>
        </div>

        <div className="absolute left-1/2 top-0 -translate-x-1/2 font-mono text-[9px] text-textMuted uppercase tracking-widest">
          soft targets
        </div>
      </div>

      <div className="space-y-3 mt-auto">
        <div>
          <div className="flex justify-between font-mono text-[10px] mb-1">
            <span className="text-textMuted uppercase">teacher · MMLU</span>
            <span className="text-white">86.4%</span>
          </div>
          <div className="h-1.5 bg-background/60">
            <motion.div className="h-full bg-accentDim" initial={{ width: 0 }} whileInView={{ width: '86.4%' }} viewport={{ once: true }} transition={{ duration: 1 }} />
          </div>
        </div>
        <div>
          <div className="flex justify-between font-mono text-[10px] mb-1">
            <span className="text-textMuted uppercase">student · MMLU</span>
            <span className="text-accent">82.1%</span>
          </div>
          <div className="h-1.5 bg-background/60">
            <motion.div className="h-full bg-accent" initial={{ width: 0 }} whileInView={{ width: '82.1%' }} viewport={{ once: true }} transition={{ duration: 1.4, delay: 0.3 }} />
          </div>
        </div>
      </div>

      <div className="mt-4 pt-3 border-t border-border/50 font-mono text-[10px] text-textMuted leading-relaxed">
        &gt; 10x smaller · ~40ms CPU latency · near-parity on task.
      </div>
    </div>
  );
};

export const InferenceLab: React.FC = () => {
  return (
    <section id="inference-lab" className="py-20 md:py-28 border-b border-border relative overflow-hidden">
      <div className="absolute inset-0 dot-pattern opacity-[0.03] pointer-events-none"></div>
      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="mb-12">
          <div className="inline-flex items-center gap-2 border border-accent/30 bg-accent/5 px-3 py-1 font-mono text-[10px] text-accent uppercase tracking-widest mb-4">
            <Zap size={12} />
            Live Concepts
          </div>
          <h2 className="text-5xl md:text-7xl font-display font-bold uppercase tracking-tighter text-textMain leading-none">
            The <span className="neon-text text-accent">Inference</span> Lab
          </h2>
          <p className="text-textMuted mt-3 max-w-xl">
            Core LLM mechanics — temperature scaling, serving pipelines, distillation — running live with real math. Because I don't just call APIs, I understand them.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <TemperatureCard />
          <HarnessCard />
          <DistillationCard />
        </div>
      </div>
    </section>
  );
};
