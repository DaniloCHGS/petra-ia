import React, { useEffect, useState } from "react";
import { ChatWindow } from "./ChatWindow";
import { MessageInput } from "./MessageInput";
import { gemini } from "../services/gemini";
import { Toaster } from "react-hot-toast";
import { getAllMessages, saveMessage } from "../services/db";

type Message = {
  id: number;
  text: string;
  sender: "user" | "bot";
};

export const Chat: React.FC = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  // Carrega histórico ao montar
  useEffect(() => {
    (async () => {
      const history = await getAllMessages();
      setMessages(history);
    })();
  }, []);

  const handleSendMessage = async (text: string) => {
    if (!text.trim()) return;

    setIsLoading(true);

    const newMessage: Message = {
      id: Date.now(),
      text,
      sender: "user",
    };

    const updatedMessages = [...messages, newMessage];
    setMessages(updatedMessages);

    await saveMessage(newMessage);

    try {
      const botResponse = await gemini(text, updatedMessages);

      const botMessage: Message = {
        id: Date.now() + 1,
        text: botResponse,
        sender: "bot",
      };

      setMessages((prev) => [...prev, botMessage]);
      await saveMessage(botMessage);
    } catch (error) {
      setMessages((prev) => [
        ...prev,
        {
          id: Date.now() + 1,
          text: "Erro ao consultar a IA. Tente novamente mais tarde.",
          sender: "bot",
        },
      ]);
      console.error("Erro ao chamar Gemini:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-col h-screen bg-gray-100">
      <Toaster position="top-right" />
      <header className="p-4 bg-blue-600 text-white text-xl font-semibold shadow">
        Petra IA
      </header>

      <div className="flex-1 overflow-y-auto p-4">
        <ChatWindow isLoading={isLoading} messages={messages} />
      </div>

      <div className="p-4 border-t bg-white">
        <MessageInput isLoading={isLoading} onSend={handleSendMessage} />
      </div>
    </div>
  );
};
