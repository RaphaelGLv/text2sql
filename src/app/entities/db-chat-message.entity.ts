import { DbChatMessageModel } from "../stores/db-chat-messages/db-chat-messages.types";

export interface DbChatMessageEntity {
  id: string;
  chatId: string;
  question: string;
  answer: string;
  createdAt?: Date;
}

export class DbChatMessageFactory {
  static toEntity(model: DbChatMessageModel): DbChatMessageEntity {
    return {
      id: model.id,
      chatId: model.chatId,
      question: model.question,
      answer: model.answer,
      createdAt: model.createdAt,
    };
  }

  static toModel(entity: DbChatMessageEntity): DbChatMessageModel {
    return {
      id: entity.id,
      chatId: entity.chatId,
      question: entity.question,
      answer: entity.answer,
      createdAt: entity.createdAt || new Date(),
    };
  }
}
