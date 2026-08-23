import express from 'express';
import cors from 'cors';
import fs from 'fs';
import path from 'path';
import { Readable } from 'stream';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

const PORT = process.env.PORT || 10000;
const ORIGIN = process.env.ALLOWED_ORIGIN || 'https://rajeetnair.dev';
// Sub-1GB quantized model — swap the URL to any GGUF you prefer:
// Qwen2.5-0.5B-Instruct Q4_K_M (~400MB)  [default, best quality/size ratio]
// SmolLM2-360M-Instruct Q8_0   (~380MB)  [fastest]
// TinyLlama-1.1B Q4 needs ~800MB+ — do NOT use on a 512MB tier
const MODEL_URL =
  process.env.MODEL_URL ||
  'https://huggingface.co/bartowski/Qwen2.5-0.5B-Instruct-GGUF/resolve/main/Qwen2.5-0.5B-Instruct-Q4_K_M.gguf';
const MODEL_PATH = path.join(__dirname, 'models', path.basename(MODEL_URL));

const SYSTEM_PROMPT = `You are "EDGE-LLM", the on-device AI assistant embedded in Rajeet Nair's portfolio site.
Answer ONLY questions about Rajeet using the facts below. Be brief (max 120 words), terminal-style.

FACTS:
- Rajeet Nair: AI Engineer & Full-Stack Developer, Mumbai India (remote). Open to AI engineering roles.
- Email: rajeet9653@gmail.com | GitHub: github.com/rajeetcodeN
- Role: AI Software Developer at Digital Biz Tech (Apr 2025-present): production RAG systems, document intelligence, OCR invoice processing, multimodal blueprint analysis, ML warehouse optimization.
- Flagship projects: Industrial RFQ Cost Calculation API (FastAPI + pgvector HNSW hybrid search + manufacturing physics rules like 0.3mm milling/grinding threshold); AI Vision Blueprint Analyzer (Gemini/Mistral vision extraction of GD&T, DIN standards synthesis); Manufacturing Capacity Planning SaaS; Athletix hybrid multi-LLM sports platform.
- Stack: Python, FastAPI, LangChain, LangGraph, RAG, LLM agents, OCR, Supabase, PostgreSQL, pgvector/Qdrant/Pinecone/Oracle Vector, React, TypeScript, n8n (Verified Creator, 33 templates), Docker, AWS S3, Vercel.
- Certifications: OCI GenAI Professional (2024+2025), Oracle Multicloud Architect, Oracle AI Vector Search, Salesforce Agentforce Specialist, n8n Level 1, NVIDIA CUDA C++, DataCamp AI Engineer, Dataiku GenAI, Apache Airflow 3.
- Education: B.E. Computer Engineering, Mumbai University — First Class, rank 3rd in college.
If asked anything unrelated, redirect politely to Rajeet's work.`;

let session = null;
let loadingPromise = null;

async function downloadModel() {
  if (fs.existsSync(MODEL_PATH)) return;
  fs.mkdirSync(path.dirname(MODEL_PATH), { recursive: true });
  console.log(`[model] downloading ${MODEL_URL} ...`);
  const res = await fetch(MODEL_URL, { redirect: 'follow' });
  if (!res.ok || !res.body) throw new Error(`model download failed: ${res.status}`);
  const tmp = MODEL_PATH + '.part';
  await new Promise((resolve, reject) => {
    const file = fs.createWriteStream(tmp);
    res.body.pipe(file);
    res.body.on('error', reject);
    file.on('finish', () => file.close(resolve));
    file.on('error', reject);
  });
  fs.renameSync(tmp, MODEL_PATH);
  console.log('[model] download complete');
}

async function getSession() {
  if (session) return session;
  if (!loadingPromise) {
    loadingPromise = (async () => {
      console.log('[llm] booting...');
      const { getLlama, LlamaChatSession } = await import('node-llama-cpp');
      await downloadModel();
      const llama = await getLlama({ gpu: false });
      const model = await llama.loadModel({ modelPath: MODEL_PATH });
      const context = await model.createContext({ contextSize: 2048 });
      session = {
        // one shared context sequence; requests are serialized by the queue below
        seq: context.getSequence(),
        LlamaChatSession,
      };
      console.log('[llm] ready');
    })();
  }
  return loadingPromise;
}

// Serialize inference — mandatory on a 0.1 vCPU tier
let chain = Promise.resolve();

const app = express();
app.use(express.json({ limit: '1kb' }));
app.use(cors({ origin: (o, cb) => cb(null, true) })); // tighten to ORIGIN list in prod

app.get('/health', (_req, res) =>
  res.json({ ok: true, model_loaded: !!session, model: path.basename(MODEL_URL) })
);

app.post('/chat', async (req, res) => {
  const message = String(req.body?.message || '').slice(0, 500);
  if (!message.trim()) return res.status(400).json({ error: 'empty message' });

  chain = chain.then(async () => {
    try {
      const s = await getSession();
      const chat = new s.LlamaChatSession({
        contextSequence: s.seq,
        systemPrompt: SYSTEM_PROMPT,
      });
      const reply = await chat.prompt(message, { maxTokens: 220, temperature: 0.6 });
      res.json({ reply, engine: 'edge-qwen05b' });
    } catch (e) {
      console.error(e);
      res.status(503).json({ error: 'model busy/booting' });
    }
  });
});

app.listen(PORT, () => {
  console.log(`[server] listening on ${PORT}`);
  getSession().catch((e) => console.error('[boot]', e.message));
});
