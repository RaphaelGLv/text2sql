import { useCallback } from "react";
import { useSchemaScriptStore } from "../stores/schema-script/schema-script.store";
import { useToastStore } from "../stores/toast/toast.store";
import { SchemaScriptEntity } from "../entities/schema-script.entity";

interface SchemaScriptService {
  addSchemaScript: (payload: SchemaScriptEntity) => void;
  removeSchemaScript: (id: string) => void;
}

export function useSchemaScriptService(): SchemaScriptService {
  const { setToast } = useToastStore();
  const addSchemaScriptToStore = useSchemaScriptStore(
    (state) => state.addSchemaScript
  );
  const removeSchemaScriptToStore = useSchemaScriptStore(
    (state) => state.removeSchemaScript
  );

  const addSchemaScript = useCallback(({ id, name, script }: SchemaScriptEntity) => {
    try {
      addSchemaScriptToStore({ id, name, script });
      setToast({
        message: `Schema "${name}" criado com sucesso.`,
        type: "success",
      });
    } catch (error) {
      const errorMessage =
        error instanceof Error
          ? error.message
          : "Não foi possível adicionar o schema.";

      setToast({ message: errorMessage, type: "error" });
    }
  }, [addSchemaScriptToStore, setToast]);

  const removeSchemaScript = useCallback((id: string) => {
    try {
      removeSchemaScriptToStore(id);
      setToast({
        message: `Schema removido com sucesso.`,
        type: "success",
      });
    } catch (error) {
      const errorMessage =
        error instanceof Error
          ? error.message
          : "Não foi possível remover o schema.";

      setToast({ message: errorMessage, type: "error" });
    }
  }, [removeSchemaScriptToStore, setToast]);

  return {
    addSchemaScript,
    removeSchemaScript,
  };
}
