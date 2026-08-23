from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from fastapi.staticfiles import StaticFiles
import os

app = FastAPI(
    title="Rajeet Nair - AI Engineer Portfolio API",
    description="FastAPI Backend & AI Inference Service",
    version="1.0.0"
)

# Enable CORS for frontend clients
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/health")
def health_check():
    return {"status": "healthy", "service": "FastAPI Cloud Portfolio API"}

@app.get("/api/profile")
def get_profile():
    return {
        "name": "Rajeet Nair",
        "role": "AI Engineer",
        "focus": ["Vision Models", "Sub-1B LLM Fine-Tuning", "FastAPI Backend Architecture", "CAD/RFQ Automation"],
        "status": "Available for AI Engineering roles"
    }

# Serve React static assets if built
if os.path.exists("dist"):
    app.mount("/", StaticFiles(directory="dist", html=True), name="static")
