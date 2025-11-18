import JSONPretty from 'react-json-pretty';
import 'react-json-pretty/themes/monikai.css';

export default function JsonPretty({ data }) {
  return (
    <div className="bg-black border border-white/20 rounded-lg p-4 text-sm overflow-auto max-h-96">
      <JSONPretty data={data}></JSONPretty>
    </div>
  );
}
