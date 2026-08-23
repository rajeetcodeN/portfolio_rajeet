from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from fastapi.staticfiles import StaticFiles
from fastapi.responses import JSONResponse
import os

app = FastAPI(
    title="Rajeet Nair - AI Engineer Portfolio API",
    description="FastAPI Backend & Sub-1B LLM Inference Service",
    version="1.0.0"
)

# Enable CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/")
def read_root():
    return {
        "message": "Welcome to Rajeet Nair's AI Engineering Portfolio API",
        "status": "online",
        "documentation": "/docs",
        "endpoints": {
            "health": "/health",
            "profile": "/api/profile"
        }
    }

@app.get("/health")
def health_check():
    return {"status": "healthy", "service": "FastAPI Cloud Portfolio API"}

@app.get("/api/profile")
def get_profile():
    return {
        "name": "Rajeet Nair",
        "role": "Generative AI Engineer",
        "focus": [
            "Vision Models (YOLOv8, LayoutLM)",
            "Sub-1B LLM Fine-Tuning & Quantization",
            "FastAPI Microservices Architecture",
            "Automated Manufacturing RFQ & CAD Pricing Engine"
        ],
        "github": "https://github.com/rajeetcodeN",
        "status": "Available for AI Engineering Opportunities"
    }

# Serve React static assets if built
if os.path.exists("dist"):
    app.mount("/app", StaticFiles(directory="dist", html=True), name="static")
