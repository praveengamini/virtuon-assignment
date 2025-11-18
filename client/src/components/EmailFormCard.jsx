import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";

export default function EmailFormCard({
  from,
  to,
  subject,
  body,
  setFrom,
  setTo,
  setSubject,
  setBody,
  onAnalyze
}) {
  return (
    <Card className="bg-black border border-white/20">
      <CardHeader>
        <CardTitle className="text-white text-xl">Email</CardTitle>
      </CardHeader>

      <CardContent className="space-y-4">

        <div>
          <label className="text-sm text-white/70">From</label>
          <Input
            value={from}
            onChange={(e) => setFrom(e.target.value)}
            className="bg-black text-white border-white/20"
            placeholder="priya.sharma@acme.com"
          />
        </div>

        <div>
          <label className="text-sm text-white/70">To</label>
          <Input
            value={to}
            onChange={(e) => setTo(e.target.value)}
            className="bg-black text-white border-white/20"
            placeholder="legal.counsel@lawfirm.com"
          />
        </div>

        <div>
          <label className="text-sm text-white/70">Subject</label>
          <Input
            value={subject}
            onChange={(e) => setSubject(e.target.value)}
            className="bg-black text-white border-white/20"
            placeholder="Termination of Services under MSA"
          />
        </div>

        <div>
          <label className="text-sm text-white/70">Email Body</label>
          <Textarea
            value={body}
            onChange={(e) => setBody(e.target.value)}
            className="bg-black text-white border-white/20 min-h-40"
            placeholder="Write the email here..."
          />
        </div>

        <Button
          onClick={onAnalyze}
          className="w-full bg-white text-black hover:bg-white/80"
        >
          Analyze Email
        </Button>
      </CardContent>
    </Card>
  );
}
