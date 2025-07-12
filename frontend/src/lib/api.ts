export const BASE_URL = import.meta.env.VITE_BACKEND_URL;

export const sendMessage = async (message: string, token: string) => {
  const res = await fetch(`${BASE_URL}/questions`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({ content: message }),
  });

  if (!res.ok) throw new Error("Failed to send message");
  return await res.json();
};





