import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import Loader from "./common/Loader";

export default function DraftReplyOutput({ reply, loading }) {

  if (loading) {
    return (
      <Card className="bg-black border border-white/20">
        <CardHeader>
          <CardTitle className="text-white text-xl">Drafted Reply</CardTitle>
        </CardHeader>
        <CardContent>
          <Loader />   {/* spinner */}
          <div className="text-center text-white/70 mt-2">
            Drafting reply...
          </div>
        </CardContent>
      </Card>
    );
  }

  if (!reply) return null;

  return (
    <Card className="bg-black border border-white/20">
      <CardHeader>
        <CardTitle className="text-white text-xl">Drafted Reply</CardTitle>
      </CardHeader>
      <CardContent>
        <pre className="bg-black text-white border border-white/20 p-4 rounded-lg overflow-auto whitespace-pre-wrap max-h-96">
          {reply}
        </pre>
      </CardContent>
    </Card>
  );
}
