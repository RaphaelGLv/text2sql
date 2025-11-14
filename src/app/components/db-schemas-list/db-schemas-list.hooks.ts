import { SchemaScriptModel } from "@/app/stores/schema-script/schema-script.types";
import { SchemaScriptEntity } from "@/app/entities/schema-script.entity";
import { useCallback } from "react";
import { useRouter } from "next/navigation";
import { useNewSchemaFormModalHooks } from "./components/new-schema-form-modal/new-schema-form-modal.hooks";
import { useModal } from "../modal/modal.hooks";
import { useSchemaScriptService } from "@/app/services/schema-script.service";
import { useSchemaScriptStore } from "@/app/stores/schema-script/schema-script.store";

interface UseDbSchemasListHooks {
  isFormModalOpen: boolean;
  openFormModal: () => void;
  closeFormModal: () => void;
  schemaScripts: SchemaScriptModel[];
  goToChat: (schema: SchemaScriptModel) => void;
  deleteSchema: (schema: SchemaScriptModel) => void;
  newSchemaValue: SchemaScriptEntity;
  setNewSchemaValue: (value: SchemaScriptEntity) => void;
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
  const router = useRouter();

  function openFormModal() {
    clearForm();
    openModal();
  }

  const handleChat = useCallback(
    (schema: SchemaScriptModel) => {
      // navigate to chat page for this schema id
      router.push(`/chat/${encodeURIComponent(schema.id)}`);
    },
    [router]
  );

  const handleDelete = (schema: SchemaScriptModel) => {
    removeSchemaScript(schema.id);
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
