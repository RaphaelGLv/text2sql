"use client";

import styles from "./new-schema-form-modal.module.css";
import Modal from "@/app/components/layout/modal/modal";
import { AppButton } from "@/app/components/ui/buttons/app-button";
import { UseNewSchemaFormModalHooks } from "./new-schema-form-modal.hooks";
import { UseModalHooks } from "@/app/components/layout/modal/modal.hooks";
import { TextInput } from "../../../inputs/text-input/text-input";
import { FileInput } from "../../../inputs/file-input/file-input";

interface NewSchemaFormModalProps extends Omit<UseModalHooks, "openModal">, UseNewSchemaFormModalHooks {}

export function NewSchemaFormModal({
  isModalOpen,
  closeModal,
  value,
  setValue,
  handleFileInputChange,
  onSave,
  clearForm,
}: NewSchemaFormModalProps) {
  function handleSubmit(e?: React.FormEvent) {
    e?.preventDefault();
    onSave();
    clearForm();
    closeModal();
  }

  return (
    <Modal title="Adicionar Banco de Dados" isOpen={isModalOpen} onClose={closeModal}>
      <form onSubmit={handleSubmit}>
        <TextInput
          id="schema-name-input"
          label="Nome do novo Schema"
          required
          value={value.name}
          onChange={(newValue) => setValue({ ...value, name: newValue })}
        />

        <FileInput
          id="schema-script-input"
          label="Importar script de Schema (.sql)"
          required
          onChange={handleFileInputChange}
          accept=".sql"
        />

        <footer className={styles.footer}>
          <AppButton onClick={closeModal}>Cancelar</AppButton>
          <AppButton buttonProps={{ type: "submit" }}>Salvar</AppButton>
        </footer>
      </form>
    </Modal>
  );
}
