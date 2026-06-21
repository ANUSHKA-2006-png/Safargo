import { FormEvent, useState } from "react";
import { Send } from "lucide-react";
import { Button } from "../../components/common/Button";
import { aiService } from "../../services/aiService";

type Message = {
  role: "user" | "assistant";
  content: string;
};

export function Chatbot() {
  const [conversationId, setConversationId] = useState<string | undefined>();
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState<Message[]>([
    { role: "assistant", content: "Tell me your destination, dates, budget, or constraints and I will help shape the plan." }
  ]);
  const [loading, setLoading] = useState(false);

  const submit = async (event: FormEvent) => {
    event.preventDefault();
    const text = message.trim();
    if (!text) return;
    setMessages((current) => [...current, { role: "user", content: text }]);
    setMessage("");
    setLoading(true);
    try {
      const response = await aiService.chat({ conversationId, message: text });
      setConversationId(response.conversationId);
      setMessages((current) => [...current, { role: "assistant", content: response.message }]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="grid min-h-[calc(100vh-8rem)] grid-rows-[1fr_auto] rounded-lg border border-slate-200 bg-white shadow-sm">
      <div className="space-y-4 overflow-y-auto p-5">
        {messages.map((item, index) => (
          <div key={`${item.role}-${index}`} className={item.role === "user" ? "ml-auto max-w-2xl" : "mr-auto max-w-2xl"}>
            <div className={item.role === "user" ? "rounded-lg bg-ocean px-4 py-3 text-white" : "rounded-lg bg-slate-100 px-4 py-3 text-ink"}>
              <p className="whitespace-pre-wrap text-sm leading-6">{item.content}</p>
            </div>
          </div>
        ))}
      </div>
      <form onSubmit={submit} className="flex gap-3 border-t border-slate-200 p-4">
        <input
          className="focus-ring h-11 min-w-0 flex-1 rounded-md border border-slate-200 px-3 text-sm"
          value={message}
          onChange={(event) => setMessage(event.target.value)}
          placeholder="Ask about routes, budget, safety, food, packing, or schedule..."
        />
        <Button type="submit" loading={loading} icon={<Send className="h-4 w-4" />}>
          Send
        </Button>
      </form>
    </div>
  );
}
