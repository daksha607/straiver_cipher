import { useEffect, useState } from "react";
import { useAuth } from "@clerk/clerk-react";
import { Button } from "@/components/ui/button"; // shadcn/ui button
import { BASE_URL } from "@/lib/api"; // assumes you're using a central base URL config

interface ChatItem {
  id: number;
  message: string;
  reply: string;
  timestamp: string;
}

export default function ChatHistory() {
  const [history, setHistory] = useState<ChatItem[]>([]);
  const { getToken } = useAuth();

  // Fetch chat history
  const fetchHistory = async () => {
    try {
      const token = await getToken();
      const res = await fetch(`${BASE_URL}/history`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const data = await res.json();
      setHistory(data);
    } catch (err) {
      console.error("Failed to fetch history", err);
    }
  };

  // Delete individual item
  const handleDelete = async (id: number) => {
    try {
      const token = await getToken();
      const res = await fetch(`${BASE_URL}/history/${id}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (!res.ok) throw new Error("Failed to delete item");

      // Optimistically update UI
      setHistory((prev) => prev.filter((item) => item.id !== id));
    } catch (err) {
      console.error("Delete error", err);
      alert("Failed to delete item.");
    }
  };

  useEffect(() => {
    fetchHistory();
  }, []);

  return (
    <div className="p-4 space-y-4">
      <h2 className="text-xl font-semibold">💬 Chat History</h2>

      {history.length === 0 ? (
        <p className="text-gray-400">No history available.</p>
      ) : (
        history.map((chat) => (
          <div
            key={chat.id}
            className="border p-4 rounded-lg shadow-sm space-y-2 bg-white dark:bg-gray-900"
          >
            <p><strong>You:</strong> {chat.message}</p>
            <p><strong>AI:</strong> {chat.reply}</p>
            <p className="text-sm text-gray-500">
              {new Date(chat.timestamp).toLocaleString()}
            </p>
            <Button
              variant="destructive"
              className="text-sm"
              onClick={() => handleDelete(chat.id)}
            >
              🗑️ Delete
            </Button>
          </div>
        ))
      )}
    </div>
  );
}

