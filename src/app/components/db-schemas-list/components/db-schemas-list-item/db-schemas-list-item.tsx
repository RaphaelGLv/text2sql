import styles from "./db-schemas-list-item.module.css";
import { AppButton } from "@/app/components/buttons/app-button";
import { SchemaScript } from "@/app/stores/schema-script/schema-script.types";

interface DbSchemasListItemProps {
    schema: SchemaScript
    onClickChat: (schema: SchemaScript) => void;
    onClickDelete: (schema: SchemaScript) => void;
}

export function DbSchemasListItem({
  schema,
  onClickChat,
  onClickDelete,
}: DbSchemasListItemProps) {
  return (
    <li className={styles.item}>
      <div className={styles.content}>
        <h4 className={styles.title}>{schema.name}</h4>
      </div>

      <div className={styles.actions}>
        <AppButton onClick={() => onClickChat(schema)}>
          Chat
        </AppButton>
        <AppButton onClick={() => onClickDelete(schema)}>
          Excluir
        </AppButton>
      </div>
    </li>
  );
}
