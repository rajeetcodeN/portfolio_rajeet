# Portfolio Edge-LLM Service

A sub-1GB quantized LLM (Qwen2.5-0.5B-Instruct Q4_K_M, ~400MB) served via
`node-llama-cpp` — sized for Render's **free tier** (0.1 vCPU / 512 MB).

## Deploy on Render

1. Push this folder to its own GitHub repo (or use monorepo root dir = `ai-service`)
2. On Render: **New → Blueprint** and point at the repo (uses `render.yaml`), or create manually:
   - Runtime: Node · Build: `npm install` · Start: `npm start`
   - Health check: `/health`
3. First boot downloads the model from HuggingFace (~400MB, one time; re-downloads after scale-to-zero restart)

## Endpoints

- `GET /health` → `{ ok, model_loaded }`
- `POST /chat { "message": "what projects has Rajeet built?" }`
  → `{ "reply": "...", "engine": "edge-qwen05b" }`

## Notes

- Inference is serialized (single queue) — mandatory on 0.1 vCPU
- Expect ~3–6 tokens/sec; responses capped at 220 tokens
- Scale-to-zero means ~30–60s cold start on first request after idle
- Swap models via `MODEL_URL` env var (any GGUF ≤ ~450MB)
