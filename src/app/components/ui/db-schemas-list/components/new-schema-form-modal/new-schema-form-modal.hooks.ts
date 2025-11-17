import { useSchemaScriptService } from "@/app/services/schema-script.service";
import { SchemaScriptEntity } from "@/app/entities/schema-script.entity";
import { useToastStore } from "@/app/stores/toast/toast.store";
import { useState } from "react";
import { extractSchemaFromSqlScript } from "@/app/utils/extract-schema-from-sql-script";

export interface UseNewSchemaFormModalHooks {
  value: SchemaScriptEntity;
  setValue: (value: SchemaScriptEntity) => void;
  handleFileInputChange: (file: File | null) => void;
  onSave: () => void;
  clearForm: () => void;
}

export function useNewSchemaFormModalHooks(): UseNewSchemaFormModalHooks {
  const { setToast } = useToastStore();
  const [value, setValue] = useState<SchemaScriptEntity>({ name: "", script: "" });
  const { addSchemaScript } = useSchemaScriptService();

  function handleFileInputChange(file: File | null) {
    if (!file) {
      setToast({
        message: "Arquivo invalido ou não selecionado.",
        type: "error",
      });
      return;
    }

    const reader = new FileReader();

    reader.onload = (event) => {
      const text = event.target?.result;
      if (typeof text === "string") {
        const cleanedScript = extractSchemaFromSqlScript(text);

        if (!cleanedScript) {
          setToast({
            message: "Nenhum comando CREATE TABLE ou ALTER TABLE encontrado no arquivo.",
            type: "error",
          });
          return;
        }

        setValue({ ...value, script: cleanedScript });
      }
    };

    reader.readAsText(file);
  }

  function onSave() {
    addSchemaScript({ id: value.id, name: value.name, script: value.script });
  }

  function clearForm() {
    setValue({ name: "", script: "" });
  }

  return {
    value,
    setValue,
    handleFileInputChange,
    onSave,
    clearForm,
  };
}
