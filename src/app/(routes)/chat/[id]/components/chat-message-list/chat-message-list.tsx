import { DbChatMessageEntity } from "@/app/entities/db-chat-message.entity";
import styles from "./chat-message-list.module.css";
import { AppButton } from "@/app/components/ui/buttons/app-button";
import { AppButtonTypes } from "@/app/components/ui/buttons/app-button.types";
import { AppIcons } from "@/app/icons/_index";

interface ChatMessageListProps {
  messages: DbChatMessageEntity[];
  copyTextToClipboard: (text: string) => void;
}

export function ChatMessageList({
  messages,
  copyTextToClipboard,
}: ChatMessageListProps) {
  return (
    <ul className={styles.list}>
      {messages.map((message) => (
        <li key={message.id} className={styles.item}>
          <span className={styles.question}>
            <strong>Prompt:</strong> {message.question}
          </span>
          <div className={styles.answer}>
            <strong>Resposta SQL:</strong>
            <span className={styles.sqlQuery}>
              <AppButton
                className={styles.copyButton}
                type={AppButtonTypes.TRANSPARENT}
                onClick={() => copyTextToClipboard(message.answer)}
                buttonProps={{
                  "aria-label": "Copiar para a área de transferência",
                  title: "Copiar para a área de transferência",
                }}
              >
                <AppIcons.COPY aria-label="" aria-hidden />
              </AppButton>
              {message.answer}
            </span>
          </div>
        </li>
      ))}
    </ul>
  );
}
