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

export const gemini = async (
  prompt: string,
  history: { sender: "user" | "bot"; text: string }[]
): Promise<string> => {
  const contents = history.map((msg) => ({
    role: msg.sender === "user" ? "user" : "model",
    parts: [{ text: msg.text }],
  }));

  // Adiciona a nova pergunta do usuário no fim
  contents.push(
    {
      role: "user",
      parts: [{ text: prompt }],
    },
    {
      role: "model",
      parts: [{ text: modelPrompt }],
    }
  );

  const response = await fetch(
    `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${apiKey}`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ contents }),
    }
  );

  const data: GeminiResponse = await response.json();
  return (
    data.candidates?.[0]?.content?.parts?.[0]?.text ?? "Sem resposta da IA."
  );
};
