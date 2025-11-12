"use client";

import styles from "./new-schema-form-modal.module.css";
import { TextInput } from "@/app/components/inputs/text-input/text-input";
import Modal from "@/app/components/modal/modal";
import { AppButton } from "@/app/components/buttons/app-button";
import { FileInput } from "@/app/components/inputs/file-input/file-input";
import { UseNewSchemaFormModalHooks } from "./new-schema-form-modal.hooks";
import { UseModalHooks } from "@/app/components/modal/modal.hooks";

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
