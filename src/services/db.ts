// db.ts
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

let dbPromise: ReturnType<typeof openDB<ChatDB>>;

export function getDB() {
  if (!dbPromise) {
    dbPromise = openDB<ChatDB>("chat-db", 1, {
      upgrade(database) {
        database.createObjectStore("messages", {
          keyPath: "id",
        });
      },
    });
  }
  return dbPromise;
}

export async function saveMessage(message: Message) {
  const db = await getDB();
  await db.add("messages", message);
}

export async function getAllMessages(): Promise<Message[]> {
  const db = await getDB();
  return await db.getAll("messages");
}

export async function clearMessages() {
  const db = await getDB();
  await db.clear("messages");
}
