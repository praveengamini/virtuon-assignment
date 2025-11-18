import { useState } from "react";
import EmailFormCard from "../components/EmailFormCard";
import ContractFormCard from "../components/ContractFormCard";
import AnalysisOutput from "../components/AnalysisOutput";
import DraftReplyOutput from "../components/DraftReplyOutput";
import useEmailAssistant from "../hooks/useEmailAssistant";

export default function Home() {
  const [from, setFrom] = useState("");
  const [to, setTo] = useState("");
  const [subject, setSubject] = useState("");
  const [body, setBody] = useState("");
  const [contract, setContract] = useState("");

  const { analysis, reply, runAnalysis, runDraft, loadingAnalyze, loadingDraft } =
    useEmailAssistant();

  const onAnalyze = () => runAnalysis(subject, body);
  const onDraft = () => runDraft(subject, body, contract);

  return (
    <div className="max-w-6xl mx-auto py-8 space-y-8">
      <EmailFormCard
        from={from}
        to={to}
        subject={subject}
        body={body}
        setFrom={setFrom}
        setTo={setTo}
        setSubject={setSubject}
        setBody={setBody}
        onAnalyze={onAnalyze}
      />

    <AnalysisOutput analysis={analysis} loading={loadingAnalyze} />

    <ContractFormCard
      snippet={contract}
      setSnippet={setContract}
      onDraft={onDraft}
    />

    <DraftReplyOutput reply={reply} loading={loadingDraft} />

    </div>
  );
}
