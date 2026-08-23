from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from fastapi.staticfiles import StaticFiles
from fastapi.responses import FileResponse
import os

app = FastAPI(
    title="Rajeet Nair - AI Engineer Portfolio",
    description="FastAPI Cloud hosted Portfolio & AI Inference Service",
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

@app.get("/health")
def health_check():
    return {"status": "healthy", "service": "FastAPI Cloud Portfolio Service"}

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

# Mount static assets if dist exists
if os.path.exists("dist"):
    if os.path.exists("dist/assets"):
        app.mount("/assets", StaticFiles(directory="dist/assets"), name="assets")

    @app.get("/{full_path:path}")
    def serve_react_app(full_path: str):
        # Ignore API endpoints
        if full_path.startswith("api/") or full_path.startswith("health") or full_path.startswith("docs") or full_path.startswith("openapi.json"):
            return None
        
        file_path = os.path.join("dist", full_path)
        if full_path and os.path.exists(file_path) and os.path.isfile(file_path):
            return FileResponse(file_path)
        
        return FileResponse("dist/index.html")
