"use client";

import styles from "./chat-client.module.css";
import { TextInput } from "@/app/components/ui/inputs/text-input/text-input";
import { useDbChatHooks } from "./use-db-chat.hooks";
import { AppButton } from "@/app/components/ui/buttons/app-button";
import { ChatMessageList } from "./components/chat-message-list/chat-message-list";

export function ChatClient() {
  const {
    schema,
    messages,
    chatInput,
    setChatInput,
    handleSendPrompt,
    copyTextToClipboard,
  } = useDbChatHooks();

  if (!schema) return <div>Carregando...</div>;

  return (
    <main className={styles.main}>
      <h1 className={styles.title}>Chat — {schema.name}</h1>

      <form className={styles.form} action={handleSendPrompt}>
        <TextInput
          id="chat-user-input"
          label="O que deseja fazer no seu banco?"
          value={chatInput}
          onChange={setChatInput}
        />
        <AppButton buttonProps={{ type: "submit" }}>Enviar</AppButton>
      </form>

      <ChatMessageList
        messages={messages}
        copyTextToClipboard={copyTextToClipboard}
      />
    </main>
  );
}
