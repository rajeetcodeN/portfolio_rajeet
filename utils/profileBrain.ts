import { PROJECTS, JOBS, SKILL_GROUPS, AUTOMATIONS, CERTIFICATIONS, HERO_DATA } from '../constants';

/**
 * LOCAL_PROFILE_LM — a tiny retrieval-based answer engine.
 * Scores keyword overlap over indexed knowledge chunks built from
 * portfolio constants and composes terminal-styled answers.
 * Zero network, zero API keys — a working fallback for the Gemini uplink.
 */

interface Chunk {
  id: string;
  keywords: string[];
  answer: string;
}

const buildChunks = (): Chunk[] => {
  const chunks: Chunk[] = [
    {
      id: 'identity',
      keywords: ['who', 'you', 'rajeet', 'about', 'yourself', 'intro', 'bio', 'name', 'engineer'],
      answer:
        `[IDENTITY]\n` +
        `> ${HERO_DATA.headline}\n\n` +
        `I design and ship RAG applications, document-intelligence pipelines,\n` +
        `multimodal vision systems and automation workflows — Python, LLMs,\n` +
        `vector databases, cloud infrastructure.\n\n` +
        `Currently building manufacturing AI systems at Digital Biz Tech.`,
    },
    {
      id: 'stack',
      keywords: ['stack', 'skills', 'tech', 'technologies', 'tools', 'languages', 'know', 'use', 'python', 'react'],
      answer:
        `[CORE STACK]\n` +
        SKILL_GROUPS.map((g) => `> ${g.category}: ${g.skills.slice(0, 6).join(' · ')}`).join('\n') +
        `\n\nQuery resolved. Full matrix available in TECH SPECS section.`,
    },
    {
      id: 'experience',
      keywords: ['experience', 'work', 'job', 'career', 'company', 'digital', 'freelance', 'history', 'role', 'position'],
      answer:
        `[EXPERIENCE LOG]\n` +
        JOBS.map(
          (j) =>
            `> ${j.company} — ${j.period}\n  ${j.description.split('.').slice(0, 2).join('.')}.`
        ).join('\n\n'),
    },
    {
      id: 'contact',
      keywords: ['contact', 'email', 'reach', 'hire', 'talk', 'call', 'connect', 'linkedin', 'github', 'available'],
      answer:
        `[COMMUNICATION CHANNELS]\n` +
        `> EMAIL    : rajeet9653@gmail.com\n` +
        `> GITHUB   : github.com/rajeetcodeN\n` +
        `> LINKEDIN : linkedin.com/in/rajeet-nair\n` +
        `> STATUS   : OPEN TO AI ENGINEERING ROLES`,
    },
    {
      id: 'n8n',
      keywords: ['n8n', 'automation', 'workflow', 'templates', 'creator', 'make'],
      answer:
        `[AUTOMATION DIVISION]\n` +
        `> Verified n8n Creator with ${AUTOMATIONS.length} published templates.\n` +
        `> Top workflows: invoice OCR + QuickBooks (1.6K+ views),\n` +
        `  email classification w/ Groq+Pinecone (1.1K+ views),\n` +
        `  SEO/GEO optimizer (2K+ views).\n` +
        `> Production stack: n8n · Make · Webhooks · Salesforce · APIs.\n\n` +
        `Full library live in the AUTOMATION section.`,
    },
    {
      id: 'certs',
      keywords: ['certification', 'certified', 'certificates', 'oracle', 'salesforce', 'credential'],
      answer:
        `[CREDENTIAL MATRIX] (${CERTIFICATIONS.length} entries)\n` +
        CERTIFICATIONS.slice(0, 8)
          .map((c) => `> ${c.name} — ${c.issuer}${c.year ? ` (${c.year})` : ''}`)
          .join('\n') +
        `\n> ...and more. Full list in CERTS section.`,
    },
  ];

  // Per-project chunks — deep answers for flagship systems
  const flagships = new Set([
    'industrial-rfq-cost-api',
    'rfq-vision-analyzer',
    'blueprint-vision-ai',
    'rfq-quote-platform',
    'capacity-planning-saas',
    'athletix-platform',
  ]);
  PROJECTS.forEach((p) => {
    chunks.push({
      id: p.id,
      keywords: p.title.toLowerCase().split(/[\s:&-]+/).concat(p.stack.map((s) => s.toLowerCase())).filter(Boolean),
      answer:
        `[SYSTEM FILE: ${p.id.toUpperCase().replace(/-/g, '_')}]\n` +
        `> PROBLEM : ${p.problem.split('.').slice(0, 2).join('.')}.\n\n` +
        `> SOLUTION: ${p.solution}\n\n` +
        `> RESULT  : ${p.result}\n\n` +
        `> STACK   : ${p.stack.join(' · ')}`,
    });
    if (flagships.has(p.id)) {
      chunks[chunks.length - 1].keywords.push('rag', 'ocr', 'vision', 'pricing', 'cost', 'manufacturing', 'api', 'fastapi', 'pgvector');
    }
  });

  return chunks;
};

const CHUNKS = buildChunks();

const tokenize = (q: string): string[] =>
  q
    .toLowerCase()
    .replace(/[^a-z0-9\s]/g, ' ')
    .split(/\s+/)
    .filter((w) => w.length > 2);

export const localAnswer = (query: string): { text: string; confidence: number } => {
  const tokens = tokenize(query);

  if (/help|command/.test(query.toLowerCase())) {
    return {
      text:
        `[LOCAL_PROFILE_LM v1.0]\n` +
        `Ask me anything about Rajeet. Try:\n` +
        `> "what's your tech stack?"\n` +
        `> "tell me about the RFQ pricing engine"\n` +
        `> "how do I contact you?"\n` +
        `> "what certifications do you have?"\n` +
        `> "who are you?"`,
      confidence: 1,
    };
  }

  let best: Chunk | null = null;
  let bestScore = 0;
  for (const chunk of CHUNKS) {
    let score = 0;
    for (const kw of chunk.keywords) {
      if (tokens.some((t) => kw === t || (kw.length > 4 && t.includes(kw)) || (t.length > 4 && kw.includes(t)))) {
        score += 1;
      }
    }
    if (score > bestScore) {
      bestScore = score;
      best = chunk;
    }
  }

  if (!best || bestScore === 0) {
    return {
      text:
        `[LOW CONFIDENCE QUERY]\n` +
        `No direct match in my knowledge index. I can answer questions about:\n` +
        `Rajeet's skills, projects, experience, automation work,\n` +
        `certifications, or contact channels.`,
      confidence: 0.2,
    };
  }

  const confidence = Math.min(0.99, 0.55 + bestScore * 0.08);
  return { text: best.answer, confidence };
};
