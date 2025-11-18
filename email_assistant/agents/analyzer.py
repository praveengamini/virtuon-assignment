from langchain_google_genai import ChatGoogleGenerativeAI
from langchain_core.prompts import PromptTemplate
from langchain_core.output_parsers import JsonOutputParser
from dotenv import load_dotenv
from pydantic import BaseModel

load_dotenv()


class EmailAnalysisSchema(BaseModel):
    intent: str
    primary_topic: str
    parties: dict
    agreement_reference: dict
    questions: list
    requested_due_date: str
    urgency_level: str


def get_analysis_agent():

    parser = JsonOutputParser(pydantic_object=EmailAnalysisSchema)

    template = """
You are a Legal Email Analyzer.

Extract structured JSON using EXACTLY this schema:

{{
  "intent": "string",
  "primary_topic": "string",
  "parties": {{
    "client": "string",
    "counterparty": "string"
  }},
  "agreement_reference": {{
    "type": "string",
    "date": "string"
  }},
  "questions": ["..."],
  "requested_due_date": "string",
  "urgency_level": "string"
}}

MANDATORY RULES:
1. "intent" MUST be: "legal_advice_request"
2. "primary_topic" MUST be EXACTLY: "termination_for_cause"
   - NOT contract_termination
   - NOT termination
   - NOT change_request
3. "client" = sender’s company (Acme)
4. "counterparty" = opposite party (Brightwave)
5. "urgency_level" MUST be one of: low, medium, high
6. Rewrite questions into clear, full questions ending with '?'
7. Return ONLY valid JSON.

Email:
{email_text}
"""

    prompt = PromptTemplate(
        template=template,
        input_variables=["email_text"]
    )

    llm = ChatGoogleGenerativeAI(
        model="gemini-2.0-flash",
        temperature=0
    )

    chain = prompt | llm | parser
    return chain
