import { modelPrompt } from "./modelPrompt";

const apiKey = import.meta.env.VITE_GEMINI_API_KEY;

type GeminiResponse = {
  candidates: {
    content: {
      parts: {
        text: string;
      }[];
    };
  }[];
};

export const gemini = async (text: string) => {
  const response = await fetch(
    `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${apiKey}`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        contents: [
          {
            role: "model",
            parts: [
              {
                text: modelPrompt,
              },
            ],
          },
          {
            role: "user",
            parts: [{ text }],
          },
        ],
      }),
    }
  );
  const data: GeminiResponse = await response.json();
  return data.candidates[0].content.parts[0].text;
};
