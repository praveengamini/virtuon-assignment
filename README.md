# ⚖️ Legal Email Assistant

AI-powered tool to analyze client emails and generate legally-compliant reply drafts using Gemini + LangChain.

This project contains:
- **FastAPI Backend** (Gemini, LangChain, Pydantic)
- **React Frontend** (Vite, Tailwind, shadcn/ui)
- **Modular architecture**
- **Black & White Gmail-style UI**
- **Loading states, JSON pretty view, reply generator**

---

## 🚀 Features

### ✔ Email Analysis
Extracts:
- Intent
- Primary legal topic
- Parties involved
- Agreement reference
- Questions raised
- Due date & urgency level

### ✔ Draft Reply Generator
Creates:
- Professional legal email
- Contains clause references
- No liability wording
- Formal lawyer tone

### ✔ Modern UI
- Gmail-style input form
- Pretty JSON formatting
- Loading indicators
- Clean black & white theme
- shadcn components

---

## 📂 Project Structure

```
.
├── backend/
│   ├── agents/
│   ├── chains/
│   ├── tools/
│   ├── api/
│   │   └── server.py
│   ├── .env
│   ├── requirements.txt
│   └── pyproject.toml
│
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   ├── hooks/
│   │   ├── pages/
│   │   ├── services/
│   │   ├── utils/
│   │   ├── styles/
│   │   ├── App.jsx
│   │   └── main.jsx
│   ├── .env
│   └── package.json
│
└── README.md
```

---

## 🛠 Backend Setup (FastAPI + uv)

### ✔ **1. Install uv**
`uv` is used for dependency management instead of pip.

```bash
pip install uv
```

### ✔ **2. Install backend dependencies**
Inside `backend/`:

```bash
uv venv
uv pip install -r requirements.txt
```

OR if using `pyproject.toml`:

```bash
uv sync
```

### ✔ **3. Create `.env` file**
Inside `backend/.env`:

```env
GOOGLE_API_KEY=your_gemini_api_key
FRONTEND_URL=http://localhost:5173
```

### ✔ **4. Start backend**

```bash
uvicorn api.server:app --reload
```

Backend will run on: `http://127.0.0.1:8000`

---

## 🎨 Frontend Setup (React + Vite + Tailwind + shadcn)

### ✔ **1. Install dependencies**
Inside `frontend/`:

```bash
npm install
```

### ✔ **2. Add frontend `.env`**
Inside `frontend/.env`:

```env
VITE_BACKEND_URL=http://127.0.0.1:8000
```

### ✔ **3. Start frontend**

```bash
npm run dev
```

Frontend will run on: `http://localhost:5173`

---

## 🔗 API Endpoints

### **POST /analyze**
Analyzes the client email.

**Request:**
```json
{
  "email_text": "Subject: Contract Termination Notice\n\nDear Attorney..."
}
```

**Response:**
```json
{
  "analysis": {
    "intent": "Request for legal advice on contract termination",
    "primary_topic": "Contract Law",
    "parties": {
      "sender": "Client Name",
      "recipient": "Law Firm"
    },
    "agreement_reference": "Service Agreement dated 01/01/2024",
    "questions_raised": ["Can we terminate early?", "What are penalties?"],
    "due_date": "2024-12-31",
    "urgency": "high"
  }
}
```

### **POST /draft**
Generates the legal reply draft.

**Request:**
```json
{
  "email_text": "Subject: Contract Termination Notice...",
  "analysis": {
    "intent": "...",
    "primary_topic": "..."
  },
  "contract_text": "Clause 12: Termination..."
}
```

**Response:**
```json
{
  "reply": {
    "content": "Dear [Client Name],\n\nThank you for your inquiry regarding..."
  }
}
```

---

## 🧪 Testing

### Using Postman or Thunder Client:

**Example for `/analyze`:**
```json
POST http://127.0.0.1:8000/analyze
Content-Type: application/json

{
  "email_text": "Subject: Termination Notice\n\nWe need to discuss early termination of our contract..."
}
```

**Example for `/draft`:**
```json
POST http://127.0.0.1:8000/draft
Content-Type: application/json

{
  "email_text": "Subject: Contract Question...",
  "analysis": {
    "intent": "Request termination advice",
    "primary_topic": "Contract Law"
  },
  "contract_text": "Clause 15: Either party may terminate..."
}
```

---

## ⚙ Technologies Used

### Backend
* **FastAPI** - Modern web framework
* **LangChain** - LLM orchestration
* **Gemini 2.0 Flash** - Google's AI model
* **Pydantic** - Data validation
* **uv** - Fast dependency manager

### Frontend
* **React + Vite** - Fast development
* **Tailwind CSS** - Utility-first styling
* **shadcn/ui** - Component library
* **Axios** - HTTP client
* **react-json-pretty** - JSON visualization

---

## 📌 Notes

* CORS is dynamically read from `.env` (`FRONTEND_URL`)
* Frontend also loads backend URL from `.env` (`VITE_BACKEND_URL`)
* No hardcoded URLs (safe for production)
* All responses follow legal best practices
* No actual legal advice is provided (disclaimer included)

---

## 🔒 Security Considerations

* Never commit `.env` files
* Keep API keys secure
* Use environment variables for all sensitive data
* Validate all user inputs
* Implement rate limiting in production

