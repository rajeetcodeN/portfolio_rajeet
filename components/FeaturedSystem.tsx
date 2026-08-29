import React from 'react';
import { motion } from 'framer-motion';
import { FileText, ScanText, ShieldCheck, BrainCircuit, Database, ArrowRight, GitBranch, FlaskConical } from 'lucide-react';
import { Link } from 'react-router-dom';
import { CURRENTLY_EXPLORING } from '../constants';

const PIPELINE = [
  {
    icon: FileText,
    title: "INGESTION",
    detail: "Technical PDFs · Engineering drawings · Specifications",
    tech: ["PDF Parser", "Image Preprocessing"],
  },
  {
    icon: ScanText,
    title: "OCR EXTRACTION",
    detail: "Dimensions, tolerances, GD&T frames, surface specs (Ra/Rz)",
    tech: ["Mistral OCR", "Gemini Vision"],
  },
  {
    icon: ShieldCheck,
    title: "VALIDATION",
    detail: "PII masking, hallucination control, confidence scoring",
    tech: ["OpenCV Redaction", "Rules Engine"],
  },
  {
    icon: BrainCircuit,
    title: "AI REASONING",
    detail: "LLM extraction grounded in retrieval — not free-form guessing",
    tech: ["RAG", "Structured JSON Output"],
  },
  {
    icon: Database,
    title: "KNOWLEDGE LAYER",
    detail: "Material database, DIN/ISO standards, vector search",
    tech: ["Supabase", "pgvector", "DIN Standards"],
  },
];

const OUTPUTS = ["RFQ Intelligence", "Cost Calculation", "Material Alternatives", "AI Assistant"];

const nodeVariants = {
  hidden: { opacity: 0, x: -24 },
  visible: { opacity: 1, x: 0 },
};

export const FeaturedSystem: React.FC = () => {
  return (
    <section id="featured-system" className="py-14 sm:py-20 md:py-28 border-b border-border bg-black relative overflow-hidden">
      <div className="absolute -top-40 right-0 w-[500px] h-[500px] rounded-full bg-accent/5 blur-[120px] pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 relative z-10">
        <div className="mb-10 sm:mb-12 flex flex-col md:flex-row md:items-end justify-between gap-4 sm:gap-6">
          <div>
            <span className="font-mono text-xs text-accent tracking-widest uppercase">01 / Featured System</span>
            <h2 className="text-4xl sm:text-6xl md:text-7xl font-display font-bold uppercase tracking-tighter text-textMain leading-[0.9] mt-2">
              Manufacturing<br />
              <span className="neon-text text-accent">Intelligence</span>
            </h2>
          </div>
          <p className="text-textMuted max-w-md text-sm leading-relaxed">
            A multimodal AI platform for manufacturing RFQs — extracting structured engineering data from technical documents and turning it into quotes, cost models and material decisions.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Pipeline */}
          <div className="lg:col-span-7">
            <div className="font-mono text-[10px] text-textMuted uppercase tracking-widest mb-4 flex items-center justify-between border-b border-border/80 pb-2">
              <div className="flex items-center gap-2">
                <GitBranch size={12} className="text-accent" />
                <span>system.architecture // [ ⌖ ]</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-10 h-2 text-accent/50 tech-barcode"></div>
                <span className="text-accent font-bold">STAGE 01-05</span>
              </div>
            </div>

            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-80px" }}
              transition={{ staggerChildren: 0.15 }}
            >
              {PIPELINE.map((node, i) => (
                <div key={node.title}>
                  <motion.div
                    variants={nodeVariants}
                    transition={{ duration: 0.5 }}
                    whileHover={{ borderColor: 'var(--color-accent)' }}
                    className="group bg-black border border-border p-4 flex items-start gap-4 hover:bg-[#070707] transition-colors relative chamfer-card-tr"
                  >
                    <div className="w-10 h-10 shrink-0 border border-accent/30 bg-accent/5 flex items-center justify-center group-hover:bg-accent group-hover:border-accent transition-colors">
                      <node.icon size={18} className="text-accent group-hover:text-black transition-colors" />
                    </div>
                    <div className="flex-grow min-w-0">
                      <div className="flex items-center justify-between gap-3">
                        <h3 className="font-mono text-sm font-bold text-textMain tracking-wider flex items-center gap-1.5">
                          <span>{node.title}</span>
                          <span className="text-[10px] text-accent/60">✦</span>
                        </h3>
                        <span className="font-mono text-[9px] text-accent border border-accent/30 px-1 py-0.2 bg-accent/5">STAGE_{String(i + 1).padStart(2, '0')}</span>
                      </div>
                      <p className="text-xs text-textMuted mt-1">{node.detail}</p>
                      <div className="flex flex-wrap gap-1.5 mt-2">
                        {node.tech.map((t) => (
                          <span key={t} className="px-2 py-0.5 border border-border bg-[#0a0a0a] font-mono text-[9px] text-textMuted group-hover:border-accent/30 group-hover:text-accent transition-colors">
                            {t}
                          </span>
                        ))}
                      </div>
                    </div>
                  </motion.div>

                  {i < PIPELINE.length && (
                    <div className="flex justify-start pl-[38px] py-0.5">
                      <ArrowRight size={14} className="text-accent/50 rotate-90" />
                    </div>
                  )}
                </div>
              ))}

              {/* Outputs fan-out */}
              <motion.div variants={nodeVariants} transition={{ duration: 0.5 }} className="mt-2 bg-black border border-accent/40 p-5 chamfer-card-tr">
                <div className="flex items-center justify-between mb-3 font-mono text-[10px] text-accent uppercase tracking-widest">
                  <span>// SYSTEM_OUTPUTS</span>
                  <span>▲▽▲▽▲</span>
                </div>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                  {OUTPUTS.map((out) => (
                    <div key={out} className="border border-border bg-[#0a0a0a] p-2.5 text-center font-mono text-[10px] text-textMain hover:text-accent hover:border-accent/50 transition-colors cursor-default chamfer-card-tr">
                      {out}
                    </div>
                  ))}
                </div>
              </motion.div>
            </motion.div>
          </div>

          {/* Side panel */}
          <div className="lg:col-span-5 space-y-6">
            <div className="bg-black border border-border p-6 corner-brackets relative chamfer-card-tr">
              <div className="flex justify-between items-center mb-4">
                <h3 className="font-mono text-xs text-accent uppercase tracking-widest">// WHY_IT_MATTERS</h3>
                <span className="text-[10px] font-mono text-textMuted">[ + ]</span>
              </div>
              <p className="text-sm text-textMuted leading-relaxed mb-4">
                Manufacturing RFQs require reading technical drawings, standards and specs — work that took engineers hours per document.
              </p>
              <div className="space-y-3 font-mono text-xs">
                <div className="flex justify-between border-b border-border/50 pb-2">
                  <span className="text-textMuted">INPUT</span>
                  <span className="text-textMain">Technical PDF / Blueprint</span>
                </div>
                <div className="flex justify-between border-b border-border/50 pb-2">
                  <span className="text-textMuted">PROCESS</span>
                  <span className="text-accent">OCR → extract → validate</span>
                </div>
                <div className="flex justify-between border-b border-border/50 pb-2">
                  <span className="text-textMuted">OUTPUT</span>
                  <span className="text-textMain">Structured data + quote</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-textMuted">HUMAN WORK</span>
                  <span className="text-green-400">Review exceptions only</span>
                </div>
              </div>
              <div className="mt-6 flex flex-wrap gap-3">
                <Link
                  to="/project/rfq-quote-platform"
                  className="inline-flex items-center gap-2 bg-accent text-background font-display font-bold uppercase px-5 py-2.5 hover:bg-white transition-colors text-sm"
                >
                  Explore Case Study <ArrowRight size={16} />
                </Link>
                <Link
                  to="/project/industrial-rfq-cost-api"
                  className="inline-flex items-center gap-2 border border-accent/50 text-accent font-mono text-xs uppercase tracking-wider px-4 py-2.5 hover:bg-accent hover:text-background transition-colors"
                >
                  Pricing API Engine <ArrowRight size={14} />
                </Link>
                <Link
                  to="/project/rfq-vision-analyzer"
                  className="inline-flex items-center gap-2 border border-accent/50 text-accent font-mono text-xs uppercase tracking-wider px-4 py-2.5 hover:bg-accent hover:text-background transition-colors"
                >
                  Vision Analyzer <ArrowRight size={14} />
                </Link>
              </div>
            </div>

            {/* Currently Exploring */}
            <div className="bg-black border border-border p-6">
              <h3 className="font-mono text-xs text-accent uppercase tracking-widest mb-4 flex items-center gap-2">
                <FlaskConical size={14} />
                currently exploring
              </h3>
              <div className="flex flex-wrap gap-2">
                {CURRENTLY_EXPLORING.map((topic) => (
                  <span key={topic} className="px-3 py-1.5 border border-border bg-[#0a0a0a] font-mono text-[10px] text-textMuted hover:text-accent hover:border-accent/40 transition-colors cursor-default">
                    → {topic}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
