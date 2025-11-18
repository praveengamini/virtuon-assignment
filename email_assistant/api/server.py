# api/server.py

from fastapi import FastAPI
from pydantic import BaseModel
from agents.analyzer import get_analysis_agent
from agents.drafter import get_drafting_agent
from dotenv import load_dotenv
from fastapi.middleware.cors import CORSMiddleware

load_dotenv()

app = FastAPI(title="Legal Email Assistant API")




app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],        # Allow all frontends (React)
    allow_credentials=True,
    allow_methods=["*"],        # Allow POST, GET, OPTIONS, DELETE, etc.
    allow_headers=["*"],        # Allow content-type, authorization, etc.
)

# Request Models
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
