import { useState } from "react";
import { analyzeEmail, draftReply } from "../services/api";

export default function useEmailAssistant() {
  const [analysis, setAnalysis] = useState("");
  const [reply, setReply] = useState("");

  const [loadingAnalyze, setLoadingAnalyze] = useState(false);
  const [loadingDraft, setLoadingDraft] = useState(false);

  const runAnalysis = async (subject, body) => {
    setLoadingAnalyze(true);
    setReply("");
    try {
      const emailText = `Subject: ${subject}\n\n${body}`;
      const res = await analyzeEmail(emailText);
      setAnalysis(JSON.stringify(res.data.analysis, null, 2));
    } finally {
      setLoadingAnalyze(false);
    }
  };

  const runDraft = async (subject, body, contract) => {
    setLoadingDraft(true);
    try {
      const parsed = JSON.parse(analysis);
      const emailText = `Subject: ${subject}\n\n${body}`;
      const res = await draftReply(emailText, parsed, contract);
      setReply(res.data.reply.content);
    } finally {
      setLoadingDraft(false);
    }
  };

  return {
    analysis,
    reply,
    runAnalysis,
    runDraft,
    loadingAnalyze,
    loadingDraft, 
  };
}
