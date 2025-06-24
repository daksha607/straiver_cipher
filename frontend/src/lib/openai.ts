import axios from "axios";

const API_KEY = import.meta.env.VITE_OPENAI_API_KEY;

export const sendMessageToOpenAI = async (message: string) => {
  try {
    console.log("Sending to OpenAI:", message);

    const response = await axios.post(
      "https://api.openai.com/v1/chat/completions",
      {
        model: "gpt-3.5-turbo",
        messages: [{ role: "user", content: message }],
      },
      {
        headers: {
          Authorization: `Bearer ${API_KEY}`,
          "Content-Type": "application/json",
        },
      }
    );

    console.log("OpenAI Response:", response.data);
    return response.data.choices?.[0]?.message?.content?.trim() || "No response.";
  } catch (error: any) {
    console.error("OpenAI Error:", error.response?.data || error.message);
    return "🤖: Something went wrong. Please try again.";
  }
};


