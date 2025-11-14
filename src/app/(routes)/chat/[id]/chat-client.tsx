"use client";

import { TextInput } from "@/app/components/ui/inputs/text-input/text-input";
import { useDbChatHooks } from "./use-db-chat.hooks";
import { AppButton } from "@/app/components/ui/buttons/app-button";

export function ChatClient() {
  const { schema, chatInput, setChatInput, handleSendPrompt } = useDbChatHooks();
  
  if (!schema) return <div>Carregando...</div>;

  return (
    <main>
      <h1>Chat — {schema.name}</h1>
      <p>Script size: {schema.script.length} chars</p>

      <form action={handleSendPrompt}>
        <TextInput
          id="chat-user-input"
          label="O que deseja fazer no seu banco?"
          value={chatInput}
          onChange={setChatInput}
        />
        <AppButton buttonProps={{ type: "submit" }}>Enviar</AppButton>
      </form>
    </main>
  );
}
