import { useState } from "react";
import { Loader2 } from "lucide-react";

function Chat() {
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);

  const handleSend = async () => {
    if (!input.trim()) return;

    const userMessage = input;
    setMessages((prev) => [...prev, `🧑: ${userMessage}`]);
    setInput("");
    setLoading(true);

    try {
    const response = await fetch("http://localhost:8000/chat", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        // If you're using Clerk for authentication:
        // Authorization: `Bearer ${userToken}`,
      },
      body: JSON.stringify({ message: userMessage }),
    });

    const data = await response.json();
    setMessages((prev) => [...prev, `🤖: ${data.reply}`]);
  } catch (err) {
    setMessages((prev) => [...prev, `🤖: Error talking to backend 😢`]);
  }

    setLoading(false);
  };

  return (
    <div className="p-6 max-w-3xl mx-auto text-white min-h-screen">
      <h2 className="text-3xl font-bold mb-4">Chat with str-ai-ver 🤖</h2>

      <div className="bg-gray-800 p-4 rounded-lg h-96 overflow-y-auto mb-4 space-y-2 text-sm sm:text-base">
        {messages.map((msg, idx) => (
          <div key={idx} className="whitespace-pre-line">
            {msg}
          </div>
        ))}
        {loading && (
          <div className="flex items-center gap-2">
            <Loader2 className="animate-spin h-4 w-4" /> Thinking...
          </div>
        )}
      </div>

      <div className="flex gap-2">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Ask me DSA doubts..."
          className="flex-grow p-2 rounded bg-gray-700 text-white outline-none"
          onKeyDown={(e) => e.key === "Enter" && handleSend()}
        />
        <button
          onClick={handleSend}
          className="bg-purple-600 px-4 py-2 rounded hover:bg-purple-700 transition"
        >
          Send
        </button>
      </div>
    </div>
  );
}

export default Chat;



