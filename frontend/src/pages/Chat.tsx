import { useState } from "react";
import { sendMessageToOpenAI } from "@/lib/openai"; // helper file created earlier

function Chat() {
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState<string[]>([]);

  const handleSend = async () => {
    if (!input.trim()) return;

    const userMessage = input;
    setMessages((prev) => [...prev, `🧑: ${userMessage}`]);
    setInput("");

    const aiResponse = await sendMessageToOpenAI(userMessage);
    setMessages((prev) => [...prev, `🤖: ${aiResponse}`]);
  };

  return (
    <div className="p-6 max-w-3xl mx-auto text-white">
      <h2 className="text-3xl font-bold mb-4">Chat with str-ai-ver 🤖</h2>

      <div className="bg-gray-800 p-4 rounded-lg h-96 overflow-y-auto mb-4 space-y-2">
        {messages.map((msg, idx) => (
          <div key={idx} className="whitespace-pre-line">
            {msg}
          </div>
        ))}
      </div>

      <div className="flex gap-2">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Ask me DSA doubts..."
          className="flex-grow p-2 rounded bg-gray-700 text-white"
        />
        <button
          onClick={handleSend}
          className="bg-purple-600 px-4 py-2 rounded hover:bg-purple-700"
        >
          Send
        </button>
      </div>
    </div>
  );
}

export default Chat;



