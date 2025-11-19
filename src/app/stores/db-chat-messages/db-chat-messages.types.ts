export interface DbChatMessageModel {
    id: string;
    chatId: string;
    question: string;
    answer: string;
    createdAt: Date;
}

interface DbChatMessagesState {
    messages: DbChatMessageModel[];
}

interface DbChatMessagesActions {
    /**
     * Save a message and return the updated (limited) messages list.
     * Returning the list lets callers react immediately without reading the store again.
     */
    saveMessage: (message: DbChatMessageModel) => DbChatMessageModel[];
    getAllByChatId: (chatId: string) => DbChatMessageModel[];
    /** Remove all messages that belong to a chat and return the remaining messages */
    removeByChatId: (chatId: string) => DbChatMessageModel[];
}

export type DbChatMessagesStore = DbChatMessagesState & DbChatMessagesActions;