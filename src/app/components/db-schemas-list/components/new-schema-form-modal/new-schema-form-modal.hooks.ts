import { useSchemaScriptService } from "@/app/services/schema-script.service";
import { SchemaScript } from "@/app/stores/schema-script/schema-script.types";
import { useToastStore } from "@/app/stores/toast/toast.store";
import { useState } from "react";

export interface UseNewSchemaFormModalHooks {
  value: SchemaScript;
  setValue: (value: SchemaScript) => void;
  handleFileInputChange: (file: File | null) => void;
  onSave: () => void;
  clearForm: () => void;
}

export function useNewSchemaFormModalHooks(): UseNewSchemaFormModalHooks {
  const { setToast } = useToastStore();
  const [value, setValue] = useState<SchemaScript>({ name: "", script: "" });
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
        setValue({ ...value, script: text });
      }
    };

    reader.readAsText(file);
  }

  function onSave() {
    addSchemaScript({
      name: value.name,
      script: value.script,
    });
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
