import React, { useState } from "react";

type Props = {
  onSend: (text: string) => void;
};

export const MessageInput: React.FC<Props> = ({ onSend }) => {
  const [text, setText] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSend(text);
    setText("");
  };

  return (
    <form onSubmit={handleSubmit} className="flex gap-2">
      <input
        type="text"
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="Digite sua mensagem..."
        className="flex-1 border rounded-full px-4 py-2 shadow-sm focus:outline-none focus:ring focus:ring-blue-300"
      />
      <button
        type="submit"
        className="bg-blue-600 text-white px-4 py-2 rounded-full shadow hover:bg-blue-700 transition"
      >
        Enviar
      </button>
    </form>
  );
};
