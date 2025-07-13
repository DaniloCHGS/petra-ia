import React, { useState } from "react";
import { ChatWindow } from "./ChatWindow";
import { MessageInput } from "./MessageInput";

type Message = {
  id: number;
  text: string;
  sender: "user" | "bot";
};

const Chat: React.FC = () => {
  const [messages, setMessages] = useState<Message[]>([]);

  const handleSendMessage = (text: string) => {
    if (!text.trim()) return;
    const newMessage: Message = {
      id: Date.now(),
      text,
      sender: "user",
    };
    setMessages((prev) => [...prev, newMessage]);

    // Simulação de resposta automática (bot)
    setTimeout(() => {
      setMessages((prev) => [
        ...prev,
        {
          id: Date.now() + 1,
          text: "Resposta simulada da IA.",
          sender: "bot",
        },
      ]);
    }, 500);
  };

  return (
    <div className="flex flex-col h-screen bg-gray-100">
      <header className="p-4 bg-blue-600 text-white text-xl font-semibold shadow">
        Chat
      </header>

      <div className="flex-1 overflow-y-auto p-4">
        <ChatWindow messages={messages} />
      </div>

      <div className="p-4 border-t bg-white">
        <MessageInput onSend={handleSendMessage} />
      </div>
    </div>
  );
};

export default Chat;
