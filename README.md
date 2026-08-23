# Portfolio & AI Engineering Backend Service

FastAPI backend & React portfolio showcase for AI Engineering projects, CAD/RFQ Vision APIs, and Sub-1B LLM edge inference.

## FastAPI Cloud Deployment

This repository includes a root `main.py` entrypoint ready for **FastAPI Cloud** deployment (`fastapi run`).

### Endpoints
- `GET /` - Interactive API docs or frontend
- `GET /health` - System health check
- `GET /api/profile` - AI Engineer profile metadata

### Run Locally
```bash
uvicorn main:app --reload --port 8000
```
