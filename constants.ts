import { Project, Job, SkillGroup, CodeSnippet, AutomationWorkflow } from './types';

export const HERO_DATA = {
  headline: "AI Engineer building production-grade AI systems.",
  subheadline: "RAG applications · Document intelligence · Multimodal vision · AI automation",
  proof: "Currently building manufacturing AI systems at Digital Biz Tech.",
};

export const CAPABILITY_ROWS = [
  { domain: "AI Engineering", items: "RAG · LLMs · Agents · Multimodal AI" },
  { domain: "Automation", items: "n8n · APIs · Salesforce · Workflow Systems" },
  { domain: "Infrastructure", items: "Python · FastAPI · Supabase · pgvector · Vercel" },
];

export const CURRENTLY_EXPLORING = [
  "AI Evaluation",
  "Multimodal RAG",
  "Agentic Systems",
  "LLMOps",
  "AI Observability",
];

export const STATS = [
  { label: 'AI Systems Shipped', value: '6+' },
  { label: 'Production Workflows', value: '16+' },
  { label: 'LLMs Integrated', value: '10+' },
];

export const SKILL_GROUPS: SkillGroup[] = [
  {
    category: "AI & GenAI",
    skills: ["Agentic Systems", "RAG Pipelines", "LangChain", "LangGraph", "AI Agents", "OpenAI / Mistral / Google", "Local LLMs (Phi/Gemma)", "LoRA / PEFT Fine-tuning"]
  },
  {
    category: "Backend & Cloud",
    skills: ["Python", "FastAPI", "Supabase", "PostgreSQL", "AWS S3", "Vercel", "Cloud & Edge Functions"]
  },
  {
    category: "Vector & Data",
    skills: ["Qdrant", "pgvector", "Pinecone", "Chroma", "Oracle Vector DB", "Apache Airflow"]
  },
  {
    category: "Automation",
    skills: ["n8n (Verified Creator)", "Make", "Webhooks", "Workflow Orchestration", "OCR Pipelines"]
  },
  {
    category: "Frontend & Vision",
    skills: ["React", "TypeScript", "Vite", "TanStack Start", "Computer Vision", "Gemini Vision OCR", "Dashboards"]
  }
];

export const PROJECTS: Project[] = [
  {
    id: "industrial-rfq-cost-api",
    title: "Industrial RFQ Cost Calculation API",
    problem: "Pricing custom mechanical components requires translating physical constraints — machining allowances, material removal depth, alloy density, DIN standards — into exact costs. Manual estimation is slow, inconsistent, and error-prone across international teams.",
    solution: "A domain-driven FastAPI estimation engine combining exact algorithmic manufacturing rules with AI-driven hybrid search: regex base-key matching fused with pgvector embeddings (stella_en_400M_v5, HNSW cosine index) maps loose customer drawing specs to standardized DIN keys (DIN 6885, DIN 508, DIN 6888).",
    result: "Production-grade pricing engine scoring 9.3/10 on technical evaluation — automated milling, grinding, sawing, vibratory finishing and raw-stock sizing with tiered volume pricing and dual-language audit warnings.",
    stack: ["Python 3.9", "FastAPI", "Uvicorn", "Supabase PostgreSQL", "pgvector HNSW", "FastEmbed / stella_en_400M_v5", "httpx AsyncClient", "Docker", "Render"],
    longDescription: "Industrial Manufacturing RFQ Cost Calculation API — an enterprise REST backend automating end-to-end pricing of custom mechanical components from raw RFQ dimensional parameters. Domain physics modeling includes raw stock oversize margins, material density (g/cm³) pricing, and a modular rules-engine that auto-triggers precision grinding when material removal ≤ 0.3mm. Hybrid Search Engine fuses exact regex base-key matching with vector similarity over a 1536-dim embedding space (HNSW cosine index) plus key ingestion caching. Tiered volume pricing via lot-size/date-validity matrices across isolated machining-kit price tables (milling v2, sawing, vibratory finishing, washing). Enterprise compliance: custom GDPR PII-scrubbing logging middleware, X-API-KEY header validation, restricted CORS origin management, async connection pooling. Includes an embedded in-memory RAG chatbot letting cost estimators query company calculation directives, and a synchronized German/English operational warning system for shop floor + client quotes.",
    architecture: ["Client / REST / UI", "FastAPI Gateway + PII Middleware", "Hybrid Search (Regex + pgvector HNSW)", "Manufacturing Rules Calculator", "Tiered Pricing Kits", "Dual-Language Warning Pipeline", "Embedded RAG Chatbot"]
  },
  {
    id: "rfq-vision-analyzer",
    title: "AI Vision Blueprint Analyzer",
    problem: "Manual quoting in precision manufacturing requires engineers to visually parse complex 2D blueprints — GD&T symbols, ISO tolerance bands (8h8, 7h11), surface roughness (Ra/Rz), material grades (C45+C, 1.6587), and heat treatments — before any price can exist.",
    solution: "A FastAPI microservice that ingests blueprint PDFs/images, renders them at 300 DPI via PyMuPDF, and orchestrates multi-modal AI (Gemini Flash primary, Mistral Vision fallback) with structured engineering prompts — validated by deterministic DIN normalizers to prevent hallucinated specs.",
    result: "95%+ extraction accuracy with confidence scoring, automatic DIN 6885/508/6888 part-name synthesis (e.g. PF AB 75h6x73,5x340 1.6587 geh.58-60HRC), GDPR-safe IP redaction, and server-side balloon-annotated drawings returned as base64 in under 2 seconds.",
    stack: ["Python", "FastAPI", "Gemini Vision", "Mistral Vision", "OpenCV", "PyMuPDF", "Pillow", "SlowAPI", "Docker", "Render"],
    longDescription: "AI-Driven Manufacturing RFQ Vision Analyzer — the vision microservice of a decoupled manufacturing platform. Document ingestion converts PDF vector pages to high-res bitmaps (150–300 DPI) via OpenCV + PyMuPDF. Multi-modal extraction prompts Gemini Flash / Mistral Vision with zero-shot & few-shot templates tuned for engineering drawing conventions, extracting GD&T feature frames, ISO fit tolerances, chamfers, radii, thread specs and heat treatment callouts with confidence scores. A deterministic post-processing layer normalizes tolerance bands into standardized German comma notation and validates dimensions against ISO tables — complementing generative AI with rule-based validation to block hallucinated specs. Dual-layer PII/IP redaction combines OpenCV contour detection with AI bounding-box rules to strip CAGE codes, logos, engineer names and title blocks before cloud processing. A Pillow-based annotation engine burns semi-transparent numbered callout badges (#1, #2…) onto exact percentage coordinates, returning both annotated base64 URIs and raw JSON balloon arrays for interactive frontends. Enterprise hardening includes SlowAPI rate limiting, correlation-ID distributed tracing, payload caps, API-key auth and provider failover for 99.9% uptime.",
    architecture: ["PDF/Image Ingest (PyMuPDF · 300 DPI)", "Multi-Modal Extraction (Gemini → Mistral Fallback)", "Deterministic DIN Validation & Synthesis", "GDPR/IP Redaction (OpenCV + AI Vision)", "Balloon Annotation Renderer (Pillow)", "Structured JSON + Confidence Output"]
  },
  {
    id: "blueprint-vision-ai",
    title: "Multimodal Blueprint Vision AI",
    problem: "Manual technical drawing analysis, symbol extraction, and quality verification was slow and error-prone for precision manufacturing workflows.",
    solution: "A Multimodal CV & AI system leveraging Gemini Vision and Mistral Vision/OCR to extract granular engineering specs — GD&T feature frames, ISO 1302 surface roughness (Ra/Rz), chamfers, radii, thread specs, and heat treatment callouts.",
    result: "Automated engineering drawing analysis with indexed balloon badges linking structured metadata directly to spatial coordinates on drawings.",
    stack: ["Gemini Vision", "Mistral OCR", "OpenCV", "Python", "FastAPI"],
    longDescription: "Specialized multimodal computer vision system that automates technical engineering drawing analysis. Includes a dual-stage privacy pipeline (OpenCV + AI Vision) to detect and redact sensitive zones (CAGE codes, logos, signatures) before model processing. A deterministic rules engine maps decimal tolerances to ISO fit classes (h6, H7), executes ISO 18265 hardness conversions, and validates features against DIN standards (e.g., DIN 6885 keyways). Interactive balloon trace overlays ([1], [2]) link extracted metadata to coordinates. PO table cross-validation prevents manufacturing discrepancies.",
    architecture: ["PDF Ingest", "Privacy Redaction", "Vision/OCR Extract", "DIN/ISO Rules Engine", "Balloon Overlay", "PO Cross-Validation"]
  },
  {
    id: "rfq-quote-platform",
    title: "AI RFQ & Quote Estimation Platform",
    problem: "RFQ (Request for Quote) processing and technical drawing cost estimation was manual, slow, and inconsistent for precision manufacturing teams.",
    solution: "Enterprise-grade AI platform that processes engineering blueprints via AI Vision/OCR — extracting dimensions, tolerances, material specs, surface finishes, and quantities into structured line items.",
    result: "Real-time cost estimation engine with dynamic pricing rules, instant high-fidelity PDF quote exports, and full EN/DE dual-language localization.",
    stack: ["React 19", "TypeScript", "FastAPI", "Vision AI", "Supabase", "jsPDF"],
    longDescription: "Enterprise RFQ automation and technical drawing cost estimation platform for precision manufacturing. Embeds dynamic reference tools for international standards: DIN ISO 2768 tolerances, surface roughness (Ra/Rz), hardness scales (HRC), bore specs, and metric-imperial conversions. Features real-time feedback logs, quote revision history, manual data adjustments, re-extraction tracking, and fully localized English/German UI for international operations.",
    architecture: ["Blueprint Upload", "Vision Extraction", "Standards Engine", "Pricing Rules", "Quote Builder", "PDF Export"]
  },
  {
    id: "capacity-planning-saas",
    title: "Manufacturing Capacity Planning SaaS",
    problem: "Shop-floor machine bottlenecks, work order sequencing, and shift visibility were managed manually across SAP ecosystems in discrete manufacturing.",
    solution: "Multi-tenant production scheduling and capacity planning SaaS with an interactive drag-and-drop Gantt engine (React 19 + TanStack Start + Zustand), machine load heatmaps, and bottleneck alerts.",
    result: "Constraint-based finite capacity scheduling respecting setup matrices, operator skills, tool changeovers, and material availability — with real-time WebSocket sync.",
    stack: ["React 19", "TanStack Start", "Zustand", "Hono", "Supabase", "PostgreSQL"],
    longDescription: "Multi-tenant production scheduling SaaS for discrete manufacturing and SAP ecosystems. Implements constraint-based finite capacity heuristics factoring setup matrices, machine availability, operator skill constraints, tool changeover times, and raw materials. Enterprise backend features row-level security (RLS) tenant isolation on Supabase, automated migrations, composite index optimization, real-time WebSocket syncing, plus a modular Hono REST API with sliding-window rate limiting, API key auth, and webhook dispatchers for ERP/SAP sync.",
    architecture: ["Gantt Engine", "Constraint Solver", "RLS Multi-Tenant DB", "WebSocket Sync", "REST API Layer", "ERP/SAP Webhooks"]
  },
  {
    id: "athletix-platform",
    title: "Athletix: AI Performance Engine",
    problem: "Bridging the gap between raw athletic data collection and actionable physiological intelligence for elite coaches.",
    solution: "A decoupled, event-driven ecosystem using a Hybrid AI Architecture (Gemini Pro/Ultra for planning & recovery modeling, Mistral for low-latency in-session queries) for dynamic periodization.",
    result: "Enterprise-grade performance management with weekly training-load analysis, adaptive recovery plans, injury-risk patterns, and PostgreSQL RLS multi-user data isolation.",
    stack: ["React", "TypeScript", "Supabase", "Gemini Pro", "Mistral", "PostgreSQL"],
    repoUrl: "https://github.com/rajeetcodeN/Athletix",
    longDescription: "Athletix is an enterprise-grade performance management ecosystem designed for elite athletes and strength coaches. AI workflows review current-week training load, fatigue, and recovery signals to generate adaptive plans. Converts structured workout data (sets, reps, RPE, TUT) into physiological insights and risk indicators. Features double-layered authentication with scoped DB sessions, event-driven backend with scoped transactions, and real-time athlete Q&A using low-latency inference.",
    architecture: ["Auth (RLS)", "Event Stream", "Mistral (Live)", "Gemini (Macro)", "Vector Store", "Postgres DB", "Client Sync"]
  },
  {
    id: "social-ai-agent",
    title: "Enterprise Social AI Agent",
    problem: "Manual social media content creation and scheduling was inefficient for enterprise scale.",
    solution: "Autonomous agent blending RSS monitoring, LLM content gen, and image synthesis.",
    result: "Fully automated posting schedule with brand-consistent voice and visuals.",
    stack: ["n8n", "Python", "OpenAI", "AWS S3", "Supabase"],
    longDescription: "A fully autonomous agent that monitors industry RSS feeds and blogs. It selects relevant topics, generates engaging captions using GPT-4/Mistral, creates visual assets via image generation models, and schedules posts via social media APIs. The system handles error recovery and maintains a consistent brand voice.",
    architecture: ["RSS Ingest", "Topic Filter", "LLM Content Gen", "Image Synthesis", "Approval Queue", "API Dispatch"]
  },
  {
    id: "enterprise-rag-ocr",
    title: "Enterprise Multi-RAG + OCR",
    problem: "Enterprise documents were siloed, making information retrieval slow and manual.",
    solution: "Developed an OCR + Vector RAG platform with semantic search capabilities and a self-improving learning loop.",
    result: "Unlocked enterprise intelligence with instant, accurate document querying.",
    stack: ["LangChain", "Qdrant", "OCR", "React", "FastAPI"],
    longDescription: "An enterprise-grade document intelligence platform. It ingests PDFs, Images, and Word docs, runs them through a specialized OCR layer, chunks the text, creates vector embeddings (OpenAI/Cohere), and stores them in Qdrant/Supabase/pgvector/Oracle Vector. A React frontend provides a chat interface for semantic queries with document viewers for contextual retrieval.",
    architecture: ["Doc Upload", "OCR Extract", "Chunking", "Vector Embedding", "Qdrant Store", "Semantic Query", "RAG Synthesis"]
  },
  {
    id: "invoice-ocr-system",
    title: "Invoice OCR & Cost Agent",
    problem: "Manual invoice processing and cost estimation was error-prone and labor-intensive.",
    solution: "Automated pipeline for extraction, parsing, and complex cost computation from multi-format invoices.",
    result: "Streamlined financial operations with high-accuracy extraction, integrated with an AI chatbot.",
    stack: ["Python", "OCR", "LLM Parsing", "Financial Logic", "API"],
    longDescription: "A specialized bot for the finance sector that parses complex invoice PDFs. It identifies tabular data, cross-references internal price lists, applies real-time currency conversion, and computes total costs. The system integrates directly with accounting software APIs.",
    architecture: ["PDF Ingest", "OCR/Vision", "Table Parsing", "Cost Logic", "Validation", "ERP Sync"]
  },
  {
    id: "ml-warehouse-ops",
    title: "ML Warehouse & Batch Optimization",
    problem: "Warehouse inventory analysis, batching processes, and travel reimbursement workflows were unoptimized.",
    solution: "Implemented ML-based workflows for batching, inventory analysis, warehouse optimization, and automated travel reimbursement extraction.",
    result: "Optimized operational efficiency and reduced manual oversight.",
    stack: ["Python", "Machine Learning", "Data Analysis", "Automation"],
    longDescription: "Operational optimization systems using Machine Learning to analyze warehouse inventory levels. Predicts stock requirements, optimizes batching for orders, and triggers replenishment workflows automatically based on predictive models. Also includes batch optimization systems and OCR-based travel reimbursement automation.",
    architecture: ["Data Ingest", "ML Model", "Inventory Pred", "Batch Logic", "Alert System"]
  }
];

export const N8N_PROFILE_URL = "https://n8n.io/creators/rnair1996/";

const wf = (id: number, slug: string) => `https://n8n.io/workflows/${id}-${slug}/`;

export const AUTOMATIONS: AutomationWorkflow[] = [
    {
        id: "seo-geo-opt",
        title: "Google form, AI, SEO, GEO optimization, human approval",
        stack: ["Google Sheets", "Switch", "Gmail", "OpenAI"],
        link: wf(8768, "google-form-ai-seo-geo-optimization-human-approval"),
        views: 2025
    },
    {
        id: "invoice-conversion",
        title: "Process email invoices with OCR, GPT-4, Slack, QuickBooks and Google Sheets",
        stack: ["OCR", "GPT-4", "QuickBooks", "Slack", "Sheets"],
        link: wf(14272, "process-email-invoices-with-ocr-gpt-4-slack-quickbooks-and-google-sheets"),
        views: 1681
    },
    {
        id: "email-classification",
        title: "Automated email classification & response system with Groq AI and Pinecone",
        stack: ["IMAP Trigger", "Groq AI", "Pinecone", "Send Email"],
        link: wf(6202, "automated-email-classification-and-response-system-with-groq-ai-and-pinecone"),
        views: 1132
    },
    {
        id: "hashtag-gen",
        title: "Generate social media hashtags from Twitter & YouTube trends with Mistral AI",
        stack: ["Sheets", "Merge", "Loop Over Items", "Mistral AI"],
        link: wf(6203, "generate-social-media-hashtags-from-twitter-and-youtube-trends-with-mistral-ai"),
        views: 972
    },
    {
        id: "hitl-post-designer",
        title: "Human-in-the-loop post designer with Mistral AI, ImageKit, and LinkedIn publishing",
        stack: ["HTTP Request", "ImageKit", "Mistral AI", "LinkedIn"],
        link: wf(6204, "human-in-the-loop-post-designer-with-mistral-ai-imagekit-and-linkedin-publishing"),
        views: 851
    },
    {
        id: "openai-rag-caching",
        title: "Build an OpenAI RAG system with document upload, semantic search and caching",
        stack: ["Postgres", "Webhook", "OpenAI", "Semantic Search"],
        link: wf(14827, "build-an-openai-rag-system-with-document-upload-semantic-search-and-caching"),
        views: 710
    },
    {
        id: "appointments",
        title: "Book and manage appointments with Google Calendar and Gmail",
        stack: ["Webhook", "If", "Google Calendar", "Gmail"],
        link: wf(14824, "book-and-manage-appointments-with-google-calendar-and-gmail"),
        views: 584
    },
    {
        id: "campaign-images",
        title: "Generate social media campaign images with Mistral AI & Pollinations.ai",
        stack: ["HTTP Request", "Merge", "Pollinations.ai", "Mistral AI"],
        link: wf(8770, "generate-social-media-campaign-images-with-mistral-ai-and-pollinationsai"),
        views: 548
    },
    {
        id: "rag-chatbot-analytics",
        title: "Build a document-upload RAG chatbot with OpenAI, Pinecone and daily analytics",
        stack: ["Set", "Gmail", "Pinecone", "OpenAI"],
        link: wf(14041, "build-a-document-upload-rag-chatbot-with-openai-pinecone-and-daily-analytics"),
        views: 434
    },
    {
        id: "timesheet-ocr",
        title: "Extract timesheet data with Mistral OCR & Gmail human verification",
        stack: ["HTTP Request", "Loop Over Items", "Edit Fields (Set)", "Mistral AI"],
        link: wf(8767, "extract-timesheet-data-with-mistral-ocr-and-gmail-human-verification"),
        views: 389
    },
    {
        id: "bulk-email-safe",
        title: "Send bulk email campaigns with Gmail/SMTP and Postgres reputation-safe timing",
        stack: ["HTTP Request", "Postgres", "Gmail/SMTP"],
        link: wf(14275, "send-bulk-email-campaigns-with-gmailsmtp-and-postgres-reputation-safe-timing"),
        views: 365
    },
    {
        id: "crm-ticket-triage",
        title: "Route and triage support tickets with Claude Sonnet and your CRM",
        stack: ["IMAP Trigger", "HTTP Request", "Claude Sonnet", "CRM"],
        link: wf(14826, "route-and-triage-support-tickets-with-claude-sonnet-and-your-crm"),
        views: 207
    },
    {
        id: "rag-drift-rollback",
        title: "Maintain RAG embeddings with OpenAI, Postgres and auto drift rollback",
        stack: ["HTTP Request", "Postgres", "OpenAI", "Drift Rollback"],
        link: wf(14036, "maintain-rag-embeddings-with-openai-postgres-and-auto-drift-rollback"),
        views: 203
    },
    {
        id: "agent-fallback-routing",
        title: "Route AI tasks between OpenAI agents with confidence-based email fallback",
        stack: ["Send Email", "If", "Edit Fields (Set)", "OpenAI Agents"],
        link: wf(13965, "route-ai-tasks-between-openai-agents-with-confidence-based-email-fallback"),
        views: 181
    },
    {
        id: "fuzzy-matching",
        title: "AI-powered fuzzy matching that assigns confidence scores",
        stack: ["Sheets", "If", "Merge", "Confidence Scoring"],
        link: wf(14276, "ai-powered-fuzzy-matching-and-assigns-confidence-scores"),
        views: 175
    },
    {
        id: "multilingual-tickets",
        title: "Triage and reply to multilingual support tickets with Anthropic Claude",
        stack: ["IMAP Trigger", "HTTP Request", "Claude", "Auto-reply"],
        link: wf(13940, "triage-and-reply-to-multilingual-support-tickets-with-anthropic-claude"),
        views: 165
    },
    {
        id: "log-incident-analysis",
        title: "Analyze logs and correlate incidents with OpenAI and Slack",
        stack: ["HTTP Request", "Slack", "OpenAI", "Incident Correlation"],
        link: wf(14044, "analyze-logs-and-correlate-incidents-with-openai-and-slack"),
        views: 129
    },
    {
        id: "pii-mask-claude",
        title: "Mask PII in documents for GDPR-safe AI processing with Postgres and Claude",
        stack: ["HTTP Request", "PII Masking", "Postgres", "Claude"],
        link: wf(13941, "mask-pii-in-documents-for-gdpr-safe-ai-processing-with-postgres-and-claude"),
        views: 113
    },
    {
        id: "contract-risk",
        title: "Analyze contract PDFs and score risk with Claude 3.5, Postgres, email and Slack alerts",
        stack: ["PDF Parsing", "Merge", "Postgres", "Claude 3.5", "Slack"],
        link: wf(14823, "analyze-contract-pdfs-and-score-risk-with-claude-35-postgres-email-and-slack-alerts"),
        views: 107
    },
    {
        id: "csv-normalize",
        title: "Normalize and validate CSV data with Anthropic/OpenAI, Postgres, Slack and Sheets",
        stack: ["Sheets", "If", "Postgres", "Anthropic/OpenAI"],
        link: wf(14273, "normalize-and-validate-csv-data-with-anthropicopenai-postgres-slack-and-sheets"),
        views: 105
    },
    {
        id: "ticket-insights-jira",
        title: "Turn support tickets into developer insights with OpenAI, Postgres, Slack and Jira",
        stack: ["Email Trigger", "If", "Postgres", "Jira", "Slack"],
        link: wf(14684, "turn-support-tickets-into-developer-insights-with-openai-postgres-slack-and-jira"),
        views: 99
    },
    {
        id: "csv-to-sql",
        title: "Convert CSV/XLSX files into a normalized SQL schema with GPT-4",
        stack: ["Webhook", "If", "Edit Fields (Set)", "GPT-4"],
        link: wf(14319, "convert-csvxlsx-files-into-a-normalized-sql-schema-with-gpt-4"),
        views: 95
    },
    {
        id: "db-schema-gen",
        title: "Generate production database schemas from Excel and CSV with OpenAI and LangChain",
        stack: ["Merge", "LangChain", "OpenAI", "Schema Generation"],
        link: wf(14317, "generate-production-database-schemas-from-excel-and-csv-with-openai-and-langchain"),
        views: 92
    },
    {
        id: "invoice-weekly-reports",
        title: "Process invoices and send weekly AI reports with OpenAI and Gmail",
        stack: ["If", "Edit Fields (Set)", "Gmail", "OpenAI"],
        link: wf(14269, "process-invoices-and-send-weekly-ai-reports-with-openai-and-gmail"),
        views: 68
    },
    {
        id: "doc-upload-validation",
        title: "Upload documents with validation, deduplication and Postgres storage",
        stack: ["If", "Postgres", "Deduplication", "Validation"],
        link: wf(14274, "upload-documents-with-validation-deduplication-and-postgres-storage"),
        views: 68
    },
    {
        id: "lead-enrichment",
        title: "Capture and enrich leads with GPT-4o, Postgres, Slack, Gmail and your CRM",
        stack: ["HTTP Request", "If", "Postgres", "GPT-4o", "CRM"],
        link: wf(14687, "capture-and-enrich-leads-with-gpt-4o-postgres-slack-gmail-and-your-crm"),
        views: 67
    },
    {
        id: "pii-gdpr-analysis",
        title: "Detect and mask PII for GDPR-safe AI document analysis with Anthropic and PostgreSQL",
        stack: ["HTTP Request", "If", "Merge", "PII Masking", "PostgreSQL"],
        link: wf(14320, "detect-and-mask-pii-for-gdpr-safe-ai-document-analysis-with-anthropic-and-postgresql"),
        views: 64
    },
    {
        id: "pg-data-quality",
        title: "Monitor PostgreSQL data quality and generate remediation alerts with Slack",
        stack: ["Schedule", "Postgres", "Data Quality Checks", "Slack"],
        link: wf(14035, "monitor-postgresql-data-quality-and-generate-remediation-alerts-with-slack"),
        views: 63
    },
    {
        id: "claude-model-routing",
        title: "Route AI tasks between Anthropic Claude models with Postgres policies and SLA",
        stack: ["Webhook", "Postgres", "Policy Routing", "SLA", "Claude"],
        link: wf(14039, "route-ai-tasks-between-anthropic-claude-models-with-postgres-policies-and-sla"),
        views: 58
    },
    {
        id: "resume-screening",
        title: "Screen resumes with OpenAI GPT-4.1 and route candidates via Gmail, Slack and Sheets",
        stack: ["Sheets", "If", "Resume Parsing", "GPT-4.1", "Slack"],
        link: wf(14686, "screen-resumes-with-openai-gpt41-and-route-candidates-via-gmail-slack-and-sheets"),
        views: 36
    },
    {
        id: "cost-efficient-routing",
        title: "Route AI queries cost-efficiently with GPT-4o-mini, GPT-4o and confidence scoring",
        stack: ["Webhook", "If", "Model Fallback", "Confidence Scoring"],
        link: wf(13966, "route-ai-queries-costefficiently-with-gpt4omini-gpt4o-and-confidence-scoring"),
        views: 30
    },
    {
        id: "deal-risk-monitor",
        title: "Monitor deal risk from HubSpot and Gmail with GPT-4.1 mini and Slack alerts",
        stack: ["HubSpot", "Gmail", "GPT-4.1 mini", "Slack Alerts"],
        link: wf(14271, "monitor-deal-risk-from-hubspot-and-gmail-with-gpt-41-mini-and-slack-alerts"),
        views: 11
    },
    {
        id: "gpt-task-fallback",
        title: "Route AI tasks with OpenAI GPT-4.1-mini and confidence-based email fallback",
        stack: ["Email Trigger", "If", "Edit Fields (Set)", "GPT-4.1-mini"],
        link: wf(14683, "route-ai-tasks-with-openai-gpt41mini-and-confidencebased-email-fallback"),
        views: 9
    }
];

export const CODE_SNIPPETS: CodeSnippet[] = [
    {
        id: "rag-pipeline",
        filename: "rag_service.py",
        language: "python",
        description: "Core logic for processing documents and generating embeddings using LangChain.",
        code: `from langchain.embeddings import OpenAIEmbeddings
from langchain.vectorstores import SupabaseVectorStore
from supabase import create_client

def process_document(text_chunks, metadata):
    """
    Takes text chunks, creates embeddings, and upserts to Supabase/Qdrant.
    """
    embeddings = OpenAIEmbeddings()
    
    # Initialize Vector Store
    vector_store = SupabaseVectorStore(
        client=supabase_client,
        embedding=embeddings,
        table_name="documents",
        query_name="match_documents"
    )
    
    # Batch processing for efficiency
    try:
        vector_store.add_texts(
            texts=text_chunks,
            metadatas=[metadata for _ in text_chunks]
        )
        return {"status": "success", "chunks_processed": len(text_chunks)}
    except Exception as e:
        logger.error(f"Vector upsert failed: {str(e)}")
        raise e`
    },
    {
        id: "n8n-workflow",
        filename: "n8n_webhook.json",
        language: "json",
        description: "Snippet of an n8n workflow configuration for event-driven automation.",
        code: `{
  "nodes": [
    {
      "parameters": {
        "httpMethod": "POST",
        "path": "webhook-trigger",
        "responseMode": "lastNode"
      },
      "name": "Webhook",
      "type": "n8n-nodes-base.webhook",
      "typeVersion": 1,
      "position": [100, 300]
    },
    {
      "parameters": {
        "model": "gpt-4",
        "prompt": "Analyze the incoming JSON payload for sentiment."
      },
      "name": "OpenAI",
      "type": "n8n-nodes-base.openAi",
      "typeVersion": 1,
      "position": [300, 300]
    }
  ],
  "connections": {
    "Webhook": {
      "main": [
        [
          {
            "node": "OpenAI",
            "type": "main",
            "index": 0
          }
        ]
      ]
    }
  }
}`
    },
    {
        id: "ocr-router",
        filename: "ocr_router.py",
        language: "python",
        description: "FastAPI router that handles image uploads and dispatches to OCR engine.",
        code: `@router.post("/extract")
async def extract_text(file: UploadFile = File(...)):
    start_time = time.time()
    
    # Validate mime type
    if file.content_type not in ["image/jpeg", "image/png", "application/pdf"]:
        raise HTTPException(status_code=400, detail="Invalid file type")

    content = await file.read()
    
    # Dispatch to OCR Service
    try:
        raw_text, confidence = ocr_service.process(content)
        
        structured_data = await llm_parser.parse(raw_text)
        
        return {
            "status": "completed",
            "data": structured_data,
            "confidence": confidence,
            "processing_time": time.time() - start_time
        }
    except OCRError as e:
        raise HTTPException(status_code=500, detail=str(e))`
    }
];

export const CERTIFICATIONS = [
    {
        name: "Certified LLM Security Professional (CLLMSP)",
        issuer: "RedTeam Hacker Academy",
        year: "2026",
        id: ""
    },
    {
        name: "Apache Airflow 3 Fundamentals",
        issuer: "Astronomer",
        year: "2026",
        id: ""
    },
    {
        name: "AI Engineer for Developer Associate",
        issuer: "DataCamp",
        year: "2026",
        id: "DC-AI-2026"
    },
    {
        name: "Dataiku Generative AI Practitioner",
        issuer: "Dataiku",
        year: "2026",
        id: ""
    },
    {
        name: "Dataiku Core Designer",
        issuer: "Dataiku",
        year: "2026",
        id: "DK-CORE-2026"
    },
    {
        name: "Salesforce Certified Agentforce Specialist",
        issuer: "Salesforce",
        year: "2025",
        id: "7283255"
    },
    {
        name: "OCI 2025 Certified Multicloud Architect Professional",
        issuer: "Oracle",
        year: "2025",
        id: "OCI-MULTI-25"
    },
    {
        name: "OCI 2025 Certified Generative AI Professional",
        issuer: "Oracle",
        year: "2025",
        id: "OCI-GENAI-25"
    },
    {
        name: "AI Vector Search Certified Professional",
        issuer: "Oracle",
        year: "2025",
        id: "OCI-VECT-25"
    },
    {
        name: "OCI 2025 Certified AI Foundations Associate",
        issuer: "Oracle",
        year: "2025",
        id: "OCI-AI-FOUND-25"
    },
    {
        name: "n8n Level 1 Certification",
        issuer: "n8n",
        year: "2025",
        id: "N8N-L1-25"
    },
    {
        name: "CUDA Programming in C++",
        issuer: "NVIDIA",
        year: "2025",
        id: "NV-CUDA-25"
    },
    {
        name: "OCI 2024 Generative AI Certified Professional",
        issuer: "Oracle",
        year: "2024",
        id: "OCI-GENAI-24"
    },
    {
        name: "Web Development Certification",
        issuer: "freeCodeCamp",
        year: "",
        id: ""
    },
    {
        name: "Generative AI Mastermind",
        issuer: "Outskill",
        year: "",
        id: ""
    },
    {
        name: "Blockchain Developer Certification",
        issuer: "IBM",
        year: "",
        id: ""
    },
    {
        name: "Investor Certification (Stock Market Analysis)",
        issuer: "SEBI",
        year: "",
        id: ""
    }
];

export const JOBS: Job[] = [
  {
    role: "AI Software Developer | Generative AI, Automation & RAG Systems",
    company: "Digital Biz Tech (Remote)",
    period: "Apr 2025 - Present",
    description: "Building production-grade Generative AI systems, RAG pipelines, and automation workflows focused on APIs, GDPR compliance, cloud functions, and ML-driven optimization. Designed RAG-based interfaces, dynamic document-matching systems, and document viewers for contextual retrieval. Built document/news/article dashboards with live multi-source ingestion and AI-driven semantic search. Developed a social media automation platform with AI content creation, image generation, S3 storage, and auto-scheduling. Created an OCR-based invoice processing system with an integrated AI chatbot. Built Python APIs for web scraping and OCR, ML-based warehouse workflows (batching, inventory analysis), and automated end-to-end workflows in n8n and Make. Integrated LLMs (OpenAI, Google, Mistral) via API-based and local embeddings (Phi, Gemma) ensuring GDPR-compliant data handling. Deployed on Vercel with cloud/edge functions.",
    tools: ["Python", "LangChain", "n8n", "Make", "Supabase", "React (Vite)", "PostgreSQL", "Qdrant/pgvector/Pinecone", "OCR", "OpenAI/Google/Mistral", "Local LLMs (Phi, Gemma)", "AWS S3", "Vercel"],
    type: "Production"
  },
  {
    role: "Freelance Developer · Trader & Business Operations",
    company: "Self-Employed",
    period: "Jul 2019 - Oct 2024",
    description: "Built web applications, Python automation scripts, and internal tools for small businesses — including an invoicing/document system for an accounting firm. Published 35+ n8n workflow templates used by thousands globally, achieving ranked creator status among 200,000+ n8n users. SEBI Certified Investor managing an equity portfolio using fundamental analysis, with Python tools for stock performance tracking and portfolio reports.",
    tools: ["Python", "Web Dev", "Automation", "n8n Creator", "Financial Analysis"],
    type: "Client"
  },
  {
    role: "Bachelor of Engineering - Computer Engineering",
    company: "Mumbai University",
    period: "Completed · First Class · Rank 3rd in College",
    description: "Final Year: 8.8/10.0, ranked 3rd in college. Coursework: Machine Learning, Object Oriented Programming, Data Structures, Database Management Systems, Information Security, Distributed Databases, Software Engineering, Artificial Intelligence, Distributed & Parallel Systems, Cloud Computing.",
    tools: ["ML", "AI", "DBMS", "Cloud Computing", "Distributed Systems"],
    type: "Education"
  }
];