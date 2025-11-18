import axios from "axios";

const API = axios.create({
  baseURL: import.meta.env.VITE_BACKEND_URL,   
  headers: { "Content-Type": "application/json" }
});

export const analyzeEmail = (emailText) =>
  API.post("/analyze", { email_text: emailText });

export const draftReply = (emailText, analysis, contractText) =>
  API.post("/draft", {
    email_text: emailText,
    analysis,
    contract_text: contractText
  });
