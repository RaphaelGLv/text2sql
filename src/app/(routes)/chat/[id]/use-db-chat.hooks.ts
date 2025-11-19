import { turnTextToSqlAction } from "@/actions/turn-text-to-sql/turn-text-to-sql.action";
import {
  DbChatMessageEntity,
  DbChatMessageFactory,
} from "@/app/entities/db-chat-message.entity";
import { useDbChatMessagesStore } from "@/app/stores/db-chat-messages/db-chat-messages.store";
import { useSchemaScriptStore } from "@/app/stores/schema-script/schema-script.store";
import { SchemaScriptModel } from "@/app/stores/schema-script/schema-script.types";
import { useToastStore } from "@/app/stores/toast/toast.store";
import { useParams, useRouter } from "next/navigation";
import { useCallback, useEffect, useState } from "react";

interface UseDbChatHooks {
  schema?: SchemaScriptModel;
  messages: DbChatMessageEntity[];
  chatInput: string;
  setChatInput: (value: string) => void;
  handleSendPrompt: () => void;
  copyTextToClipboard: (text: string) => void;
}

export function useDbChatHooks(): UseDbChatHooks {
  const router = useRouter();
  const params = useParams<{ id: string }>();
  const chatId = decodeURIComponent(params.id);

  const setToast = useToastStore((state) => state.setToast);
  const saveMessageOnStorage = useDbChatMessagesStore(
    (state) => state.saveMessage
  );
  const getMessagesByChatId = useDbChatMessagesStore(
    (state) => state.getAllByChatId
  );

  const [chatInput, setChatInput] = useState("");

  const initializeChatMessages = useCallback(() => {
    if (!chatId) return [];
    const loadedMessages = getMessagesByChatId(chatId);

    return loadedMessages.map((message) =>
      DbChatMessageFactory.toEntity(message)
    );
  }, [chatId, getMessagesByChatId]);

  const [messages, setMessages] = useState<DbChatMessageEntity[]>(
    initializeChatMessages
  );

  const schema = useSchemaScriptStore((state) =>
    state.schemaScripts.find((schema) => schema.id === chatId)
  );

  useEffect(() => {
    if (!schema) {
      router.replace("/");
    }
  }, [schema, router]);

  async function handleSendPrompt() {
    try {
      const response = await turnTextToSqlAction({
        question: chatInput,
        sqlSchemaScript: schema?.script || "",
      });

      if (!response.success) {
        setToast({
          message: response.message,
          type: "error",
        });
        return;
      }

      const messageData = response.data!;

      const messageEntity = {
        id: messageData?.id,
        chatId: chatId,
        question: messageData?.question,
        answer: messageData?.answer,
      };

      saveMessage(messageEntity);

      setToast({
        message: response.message,
        type: "success",
      });

      setChatInput("");
    } catch (error) {
      const typedError = error as Error;
      setToast({
        message: typedError.message || "Erro ao enviar o prompt.",
        type: "error",
      });
    }
  }

  function saveMessage(message: DbChatMessageEntity) {
    const messageModel = DbChatMessageFactory.toModel(message);
    const updated = saveMessageOnStorage(messageModel);

    const updatedEntities = updated
      .map((model) => DbChatMessageFactory.toEntity(model))
      .filter((entity) => {
        return entity.chatId === chatId;
      });
    setMessages(updatedEntities);
  }

  const copyTextToClipboard = useCallback(
    async (text: string) => {
      try {
        await navigator.clipboard.writeText(text);
        setToast({
          type: "success",
          message: "Query copiada para a área de transferência.",
        });
      } catch (error) {
        const typedError = error as Error;

        setToast({
          type: "error",
          message:
            "Falha ao copiar query para a área de transferência." +
            `\nErro: ${typedError.message}`,
        });
      }
    },
    [setToast]
  );

  return {
    schema,
    messages,
    chatInput,
    setChatInput,
    handleSendPrompt,
    copyTextToClipboard,
  };
}
