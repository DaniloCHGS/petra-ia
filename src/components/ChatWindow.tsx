import React from "react";

type Message = {
  id: number;
  text: string;
  sender: "user" | "bot";
};

type Props = {
  messages: Message[];
};

export const ChatWindow: React.FC<Props> = ({ messages }) => {
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
    </div>
  );
};
