# agents/drafter.py

from langchain_google_genai import ChatGoogleGenerativeAI
from langchain_core.prompts import PromptTemplate
from dotenv import load_dotenv

load_dotenv()


def get_drafting_agent():

    template = """
You are a senior legal associate.

Using:
1. Original Email
2. JSON Analysis
3. Contract Snippet

Draft a professional legal reply:
- Address Priya Sharma
- Answer both questions clearly
- Cite Clauses 9.1, 9.2, and 10.2
- Do NOT create liability or commitments
- Use a formal, law-firm style tone
- Keep it concise and advisory

Original Email:
{email_text}

JSON Analysis:
{analysis}

Contract:
{contract_text}

Write the final reply email below:
"""

    prompt = PromptTemplate(
        template=template,
        input_variables=["email_text", "analysis", "contract_text"]
    )

    llm = ChatGoogleGenerativeAI(
        model="gemini-2.0-flash",
        temperature=0.2
    )

    chain = prompt | llm
    return chain
