import React, { useEffect, useState } from "react";
import { ChatWindow } from "./ChatWindow";
import { MessageInput } from "./MessageInput";
import { gemini } from "../services/gemini";
import { Toaster } from "react-hot-toast";
import { getAllMessages, saveMessage } from "../services/db";
import { Moon, Sun } from "lucide-react";

type Message = {
  id: number;
  text: string;
  sender: "user" | "bot";
};

export const Chat: React.FC = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [darkMode, setDarkMode] = useState(false);

  // Carrega histórico ao montar
  useEffect(() => {
    (async () => {
      const history = await getAllMessages();
      setMessages(history);
      
      // Carrega preferência de tema do localStorage
      const savedTheme = localStorage.getItem("theme");
      if (savedTheme === "dark") {
        setDarkMode(true);
        document.documentElement.classList.add("dark");
      }
    })();
  }, []);

  // Atualiza o tema quando darkMode mudar
  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }
  }, [darkMode]);

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
    <div className={`flex flex-col h-screen ${darkMode ? 'bg-gray-900' : 'bg-gray-100'} transition-colors duration-200`}>
      <Toaster position="top-right" toastOptions={{
        className: darkMode ? '!bg-gray-800 !text-white' : ''
      }} />
      <header className={`p-4 bg-blue-600 text-white text-xl font-semibold shadow flex justify-between items-center`}>
        <span>Petra IA</span>
        <button 
          onClick={() => setDarkMode(!darkMode)}
          className="p-2 rounded-full hover:bg-blue-700 transition-colors"
          aria-label={darkMode ? "Mudar para modo claro" : "Mudar para modo escuro"}
        >
          {darkMode ? <Sun size={20} /> : <Moon size={20} />}
        </button>
      </header>

      <div className="flex-1 overflow-y-auto p-4">
        <ChatWindow isLoading={isLoading} messages={messages} darkMode={darkMode} />
      </div>

      <div className={`p-4 border-t ${darkMode ? 'bg-gray-800 border-gray-700' : 'bg-white'}`}>
        <MessageInput isLoading={isLoading} onSend={handleSendMessage} darkMode={darkMode} />
      </div>
    </div>
  );
};
