export const BASE_URL = "https://straivercipher-production.up.railway.app";

export const sendMessage = async (message: string, token: string) => {
  const res = await fetch(`${BASE_URL}/chat`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`, // Clerk token if required
    },
    body: JSON.stringify({ message }), // This must match the backend's expected format
  });

  if (!res.ok) throw new Error("Failed to send message");

  return await res.json(); // Should return { response: "...", ... }
};






