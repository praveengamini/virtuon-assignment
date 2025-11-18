import axios from "axios";

const API = axios.create({
  baseURL: "http://127.0.0.1:8000",
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
