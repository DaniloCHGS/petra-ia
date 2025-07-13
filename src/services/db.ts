// src/db.ts
import { openDB } from "idb";
import type { DBSchema } from "idb";

export interface Message {
  id: number;
  text: string;
  sender: "user" | "bot";
}

interface ChatDB extends DBSchema {
  messages: {
    key: number;
    value: Message;
  };
}

export const db = await openDB<ChatDB>("chat-db", 1, {
  upgrade(database) {
    database.createObjectStore("messages", {
      keyPath: "id",
    });
  },
});

// Função para adicionar uma mensagem
export async function saveMessage(message: Message) {
  await db.add("messages", message);
}

// Função para buscar todas as mensagens
export async function getAllMessages(): Promise<Message[]> {
  return await db.getAll("messages");
}

// Função para limpar o histórico
export async function clearMessages() {
  await db.clear("messages");
}
