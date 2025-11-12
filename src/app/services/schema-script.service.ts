import { useCallback } from "react";
import { useSchemaScriptStore } from "../stores/schema-script/schema-script.store";
import { useToastStore } from "../stores/toast/toast.store";
import { SchemaScript } from "../stores/schema-script/schema-script.types";

interface SchemaScriptService {
  addSchemaScript: (schema: SchemaScript) => void;
  removeSchemaScript: (name: string) => void;
}

export function useSchemaScriptService(): SchemaScriptService {
  const { setToast } = useToastStore();
  const addSchemaScriptToStore = useSchemaScriptStore(
    (state) => state.addSchemaScript
  );
  const removeSchemaScriptToStore = useSchemaScriptStore(
    (state) => state.removeSchemaScript
  );

  const addSchemaScript = useCallback(({ name, script }: SchemaScript) => {
    try {
      addSchemaScriptToStore({ name, script });
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

  const removeSchemaScript = useCallback((name: string) => {
    try {
      removeSchemaScriptToStore(name);
      setToast({
        message: `Schema "${name}" removido com sucesso.`,
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
