import { Loader } from "lucide-react";
import React from "react";

type Message = {
  id: number;
  text: string;
  sender: "user" | "bot";
};

type Props = {
  messages: Message[];
  isLoading: boolean;
};

export const ChatWindow: React.FC<Props> = ({ messages, isLoading }) => {
  return (
    <div className="space-y-2">
      {messages.map((msg) => (
        <div
          key={msg.id}
          className={`max-w-[70%] px-4 py-2 rounded-lg shadow ${
            msg.sender === "user"
              ? "bg-blue-500 text-white ml-auto"
              : "bg-gray-200 text-gray-900"
          }`}
        >
          {msg.text}
        </div>
      ))}
      {isLoading && (
        <div className="max-w-[70%] px-4 py-2 rounded-lg shadow bg-gray-200 text-gray-900">
          <Loader className="animate-spin text-blue-500" />
        </div>
      )}
    </div>
  );
};
