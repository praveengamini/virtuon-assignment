import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";

export default function ContractFormCard({ snippet, setSnippet, onDraft }) {
  return (
    <Card className="bg-black border border-white/20">
      <CardHeader>
        <CardTitle className="text-white text-xl">Contract Snippet</CardTitle>
      </CardHeader>

      <CardContent>
        <Textarea
          value={snippet}
          onChange={(e) => setSnippet(e.target.value)}
          className="bg-black text-white border-white/20 min-h-40"
          placeholder="Paste contract clauses..."
        />

        <Button
          onClick={onDraft}
          className="w-full mt-4 bg-white text-black hover:bg-white/80"
        >
          Draft Reply
        </Button>
      </CardContent>
    </Card>
  );
}
