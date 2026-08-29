import { GoogleGenAI } from "@google/genai";
import { PROJECTS, JOBS, SKILL_GROUPS, AUTOMATIONS, CERTIFICATIONS, HERO_DATA } from '../constants';

// Lazy-initialized Gemini Client — never throws at import time when no key is set
const rawKey = (process.env.API_KEY || process.env.GEMINI_API_KEY || '').trim();
const isValidKey = !!rawKey && !/placeholder|your[_-]?key|xxx/i.test(rawKey);
export const hasGeminiKey = (): boolean => isValidKey;

let _client: GoogleGenAI | null = null;
const getClient = (): GoogleGenAI => {
  if (!_client) _client = new GoogleGenAI({ apiKey: rawKey });
  return _client;
};

/**
 * Generates the system prompt containing all portfolio data.
 * This teaches the AI who 'Rajeet' is.
 */
export const getSystemContext = () => {
  const context = `
    You are an advanced AI Assistant for Rajeet Nair's portfolio website. 
    Your persona is "System_Uplink", a helpful, professional, slightly technical/cyberpunk interface.
    
    Here is Rajeet's Full Profile Data:
    
    HEADLINE: ${HERO_DATA.headline}
    SUMMARY: ${HERO_DATA.subheadline}
    
    SKILLS:
    ${JSON.stringify(SKILL_GROUPS, null, 2)}
    
    PROJECTS:
    ${JSON.stringify(PROJECTS.map(p => ({ title: p.title, description: p.longDescription, stack: p.stack, result: p.result })), null, 2)}
    
    EXPERIENCE:
    ${JSON.stringify(JOBS, null, 2)}
    
    AUTOMATION WORKFLOWS (n8n/AI):
    ${JSON.stringify(AUTOMATIONS, null, 2)}
    
    CERTIFICATIONS:
    ${JSON.stringify(CERTIFICATIONS, null, 2)}
    
    INSTRUCTIONS:
    1. Answer questions about Rajeet's experience, stack, or specific projects clearly.
    2. If asked about contact info, provide: rajeet9653@gmail.com.
    3. Keep responses concise and formatted for a terminal interface (use bullet points or short paragraphs).
    4. If the user asks something unrelated to Rajeet or AI/Tech, politely redirect them to Rajeet's skills.
    5. Maintain the "terminal" aesthetic in your tone (e.g., "Accessing database...", "Query resolved.").
  `;
  return context;
};

/**
 * Chat with the portfolio bot
 */
export const createChatSession = () => {
  return getClient().chats.create({
    model: 'gemini-3-flash-preview',
    config: {
      systemInstruction: getSystemContext(),
      temperature: 0.7,
    }
  });
};

/**
 * Analyze a Job Description against Rajeet's profile
 */
export const analyzeJobMatch = async (jobDescription: string) => {
  const profileContext = getSystemContext();
  
  const prompt = `
    ACT AS: A Senior Technical Recruiter and AI Specialist.
    
    TASK: Analyze the following JOB DESCRIPTION against the CANDIDATE PROFILE (provided in system context).
    
    JOB DESCRIPTION:
    "${jobDescription}"
    
    CANDIDATE PROFILE:
    (Use the system context provided)
    
    OUTPUT FORMAT (JSON):
    {
      "matchPercentage": number (0-100),
      "keyMatches": ["string", "string", "string"], (Top 3 matching skills/experiences)
      "missingSkills": ["string", "string"], (Top 2 missing or weak areas, if any)
      "summary": "string" (A 2-sentence professional verdict on the fit)
    }
    
    Provide ONLY the JSON object.
  `;

  try {
    const response = await getClient().models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: prompt,
      config: {
        responseMimeType: "application/json",
        systemInstruction: profileContext
      }
    });
    return JSON.parse(response.text || "{}");
  } catch (error) {
    console.error("Analysis failed", error);
    return {
      matchPercentage: 0,
      keyMatches: [],
      missingSkills: [],
      summary: "Error analyzing data. Please try again."
    };
  }
};

export const queryAIAgent = async (prompt: string): Promise<string> => {
  if (!isValidKey) {
    // High-quality deterministic local fallback
    if (/rag|retrieval/i.test(prompt)) {
      return "Rajeet architects hybrid RAG systems combining BM25 keyword matching with dense vector search (pgvector, Qdrant, Pinecone) using HNSW cosine indexing and cross-encoder reranking. Typical production query latency: <180ms.";
    }
    if (/blueprint|vision|ocr|rfq/i.test(prompt)) {
      return "The AI Vision Blueprint Analyzer ingests technical engineering PDFs (PyMuPDF at 300 DPI), extracting GD&T feature frames, ISO tolerance fits (8h8, 7h11), and surface roughness using Gemini/Mistral Vision with deterministic DIN rules validation.";
    }
    if (/n8n|automation/i.test(prompt)) {
      return "Rajeet is a Verified n8n Creator with 35+ published production workflows covering OCR document processing, PII masking, RAG caching, and ERP/CRM webhooks.";
    }
    return `Agent Query: "${prompt}" resolved. Rajeet specializes in Generative AI, production RAG, multimodal OCR, and enterprise automation with Python, FastAPI, LangChain, and vector databases.`;
  }

  try {
    const response = await getClient().models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: prompt,
      config: {
        systemInstruction: getSystemContext() + "\nBe direct, technical, concise, and structured with bullet points.",
        temperature: 0.7,
      }
    });
    return response.text || "Execution completed with 0 errors.";
  } catch (err) {
    console.error("AI Agent query error:", err);
    return `Agent Execution Notice: Connected to knowledge base. Rajeet Nair is an AI Software Developer specializing in GenAI, RAG systems, and enterprise workflow automation.`;
  }
};
