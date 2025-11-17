import styles from "./db-schemas-list-item.module.css";
import { AppButton } from "@/app/components/ui/buttons/app-button";
import { SchemaScriptModel } from "@/app/stores/schema-script/schema-script.types";
import { AppButtonVariants } from "../../../buttons/app-button.types";

interface DbSchemasListItemProps {
  schema: SchemaScriptModel;
  onClickChat: (schema: SchemaScriptModel) => void;
  onClickDelete: (schema: SchemaScriptModel) => void;
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
        <AppButton onClick={() => onClickChat(schema)}>Chat</AppButton>
        <AppButton
          onClick={() => onClickDelete(schema)}
          variant={AppButtonVariants.DANGER}
        >
          Excluir
        </AppButton>
      </div>
    </li>
  );
}
