import { SchemaScript } from "@/app/stores/schema-script/schema-script.types";
import { useCallback } from "react";
import { useNewSchemaFormModalHooks } from "./components/new-schema-form-modal/new-schema-form-modal.hooks";
import { useModal } from "../modal/modal.hooks";
import { useSchemaScriptService } from "@/app/services/schema-script.service";
import { useSchemaScriptStore } from "@/app/stores/schema-script/schema-script.store";

interface UseDbSchemasListHooks {
  isFormModalOpen: boolean;
  openFormModal: () => void;
  closeFormModal: () => void;
  schemaScripts: SchemaScript[];
  goToChat: (schema: SchemaScript) => void;
  deleteSchema: (schema: SchemaScript) => void;
  newSchemaValue: SchemaScript;
  setNewSchemaValue: (value: SchemaScript) => void;
  handleNewSchemaFileInputChange: (file: File | null) => void;
  saveNewSchema: () => void;
  clearNewSchemaForm: () => void;
}

export function useDbSchemasList(): UseDbSchemasListHooks {
  const schemaScripts = useSchemaScriptStore((state) => state.schemaScripts);
  const { removeSchemaScript } = useSchemaScriptService();
  const { value, setValue, handleFileInputChange, onSave, clearForm } =
    useNewSchemaFormModalHooks();
  const { isModalOpen, openModal, closeModal } = useModal();

  function openFormModal() {
    clearForm();
    openModal();
  }

  const handleChat = useCallback((schema: SchemaScript) => {
    console.log("go to chat", schema.name);
  }, []);

  const handleDelete = (schema: SchemaScript) => {
    removeSchemaScript(schema.name);
  };

  return {
    isFormModalOpen: isModalOpen,
    openFormModal,
    closeFormModal: closeModal,
    schemaScripts,
    goToChat: handleChat,
    deleteSchema: handleDelete,
    newSchemaValue: value,
    setNewSchemaValue: setValue,
    handleNewSchemaFileInputChange: handleFileInputChange,
    saveNewSchema: onSave,
    clearNewSchemaForm: clearForm,
  };
}
