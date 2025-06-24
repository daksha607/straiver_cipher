import { MessageCircle } from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function FloatingChatButton() {
  const navigate = useNavigate();

  return (
    <div className="fixed bottom-6 right-6 z-50">
      <button
        onClick={() => navigate("/chat")}
        className="bg-purple-600 text-white p-4 rounded-full shadow-lg hover:bg-purple-700 transition duration-300"
        aria-label="Open Chat"
      >
        <MessageCircle className="w-6 h-6" />
      </button>
    </div>
  );
}