from fastapi import FastAPI
from pydantic import BaseModel
from agents.analyzer import get_analysis_agent
from agents.drafter import get_drafting_agent
from dotenv import load_dotenv
from fastapi.middleware.cors import CORSMiddleware
import os

load_dotenv()

app = FastAPI(title="Legal Email Assistant API")

FRONTEND_URL = os.getenv("FRONTEND_URL")

if not FRONTEND_URL:
    FRONTEND_URL = "http://localhost:5173"

print("Allowed Frontend:", FRONTEND_URL)

app.add_middleware(
    CORSMiddleware,
    allow_origins=[FRONTEND_URL],        
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

class AnalyzeRequest(BaseModel):
    email_text: str

class DraftRequest(BaseModel):
    email_text: str
    analysis: dict
    contract_text: str

@app.post("/analyze")
def analyze(req: AnalyzeRequest):
    chain = get_analysis_agent()
    result = chain.invoke({"email_text": req.email_text})
    return {"analysis": result}

@app.post("/draft")
def draft(req: DraftRequest):
    chain = get_drafting_agent()
    reply = chain.invoke({
        "email_text": req.email_text,
        "analysis": req.analysis,
        "contract_text": req.contract_text
    })
    return {"reply": reply}
