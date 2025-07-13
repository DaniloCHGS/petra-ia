import { Loader, Copy, Check } from "lucide-react";
import React, { useState } from "react";
import ReactMarkdown from "react-markdown";
import toast from "react-hot-toast";

type Message = {
  id: number;
  text: string;
  sender: "user" | "bot";
};

type Props = {
  messages: Message[];
  isLoading: boolean;
  darkMode: boolean;
};

export const ChatWindow: React.FC<Props> = ({
  messages,
  isLoading,
  darkMode,
}) => {
  const [copiedId, setCopiedId] = useState<number | null>(null);

  const handleCopy = (text: string, id: number) => {
    navigator.clipboard
      .writeText(text)
      .then(() => {
        toast.success("Texto copiado para a área de transferência!");
        setCopiedId(id);
        setTimeout(() => setCopiedId(null), 2000);
      })
      .catch(() => {
        toast.error("Erro ao copiar texto");
      });
  };

  return (
    <div className="space-y-2">
      {messages.map((msg) => (
        <div
          key={msg.id}
          className={`px-4 py-2 rounded-lg shadow relative group ${
            msg.sender === "user"
              ? "bg-blue-500 text-white ml-auto"
              : darkMode
              ? "bg-gray-700 text-gray-100"
              : "bg-gray-200 text-gray-900"
          }`}
        >
          {msg.sender === "bot" ? (
            <>
              <ReactMarkdown>{msg.text}</ReactMarkdown>
              <button
                onClick={() => handleCopy(msg.text, msg.id)}
                className={`absolute top-2 right-2 p-1 rounded-md opacity-0 group-hover:opacity-100 transition-opacity ${
                  darkMode
                    ? "bg-gray-600 text-gray-200 hover:bg-gray-500"
                    : "bg-gray-300 text-gray-700 hover:bg-gray-400"
                }`}
                title="Copiar texto"
              >
                {copiedId === msg.id ? <Check size={16} /> : <Copy size={16} />}
              </button>
            </>
          ) : (
            <>
              {msg.text}
              <button
                onClick={() => handleCopy(msg.text, msg.id)}
                className="absolute top-2 right-2 p-1 rounded-md bg-blue-600 text-white opacity-0 group-hover:opacity-100 transition-opacity hover:bg-blue-700"
                title="Copiar texto"
              >
                {copiedId === msg.id ? <Check size={16} /> : <Copy size={16} />}
              </button>
            </>
          )}
        </div>
      ))}
      {isLoading && (
        <div
          className={`px-4 py-2 rounded-lg shadow ${
            darkMode ? "bg-gray-700 text-gray-100" : "bg-gray-200 text-gray-900"
          }`}
        >
          <Loader className="animate-spin text-blue-500" />
        </div>
      )}
    </div>
  );
};
