import { create } from "zustand";
import { DbChatMessagesStore, DbChatMessageModel } from "./db-chat-messages.types";
import { createJSONStorage, persist } from "zustand/middleware";
import { idbStorage } from "@/app/lib/idb-storage";

export const useDbChatMessagesStore = create<DbChatMessagesStore>()(
  persist(
    (set, get) => ({
      messages: [],
      saveMessage: (message: DbChatMessageModel) => {
        const LENGTH_LIMIT = 10;

        const newMessages = [...get().messages, message];

        const limitedMessages =
          newMessages.length > LENGTH_LIMIT
            ? newMessages.slice(-LENGTH_LIMIT)
            : newMessages;

        set(() => ({ messages: limitedMessages }));
        return limitedMessages;
      },
        getAllByChatId: (chatId) => {
            const messages = get().messages;
            return messages.filter((msg) => msg.chatId === chatId);
        }
        ,
        removeByChatId: (chatId) => {
          const remaining = get().messages.filter((m) => m.chatId !== chatId);
          set(() => ({ messages: remaining }));
          return remaining;
        }
    }),
    {
      name: "db-chat-messages-storage",
      storage: createJSONStorage(() => idbStorage),
    }
  )
);
