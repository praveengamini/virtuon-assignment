import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { useState } from "react";
import JsonPretty from "../utils/JsonPretty";

export default function AnalysisOutput({ analysis, loading }) {

  const [view, setView] = useState("pretty"); // "pretty" | "json"

  if (loading) {
    return (
      <Card className="bg-black border border-white/20">
        <CardContent>
          <div className="text-center text-white py-6">Analyzing...</div>
        </CardContent>
      </Card>
    );
  }

  if (!analysis) return null;

  return (
    <Card className="bg-black border border-white/20">
      <CardHeader>
        <CardTitle className="text-white text-xl">Analysis Result</CardTitle>
      </CardHeader>

      <CardContent>

        {/* Toggle Buttons */}
        <div className="flex gap-3 mb-4">
          <button
            onClick={() => setView("pretty")}
            className={`px-4 py-1 border rounded ${view === "pretty" ? "bg-white text-black" : "text-white border-white/40"}`}
          >
            Pretty View
          </button>

          <button
            onClick={() => setView("json")}
            className={`px-4 py-1 border rounded ${view === "json" ? "bg-white text-black" : "text-white border-white/40"}`}
          >
            Raw JSON
          </button>
        </div>

        {/* Pretty JSON */}
        {view === "pretty" && <JsonPretty data={JSON.parse(analysis)} />}

        {/* Raw JSON */}
        {view === "json" && (
          <pre className="bg-black text-white border border-white/20 p-4 rounded-lg overflow-auto max-h-96 whitespace-pre-wrap">
            {analysis}
          </pre>
        )}

      </CardContent>
    </Card>
  );
}
